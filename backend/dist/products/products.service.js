"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
let ProductsService = class ProductsService {
    databaseService;
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    async findAll() {
        const query = `
      SELECT p.*, c.name as category_name 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id
      ORDER BY p.created_at DESC
    `;
        return this.databaseService.query(query);
    }
    async findByCategory(categoryId) {
        const query = `
      SELECT p.*, c.name as category_name 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.category_id = ? AND p.status = 'published'
      ORDER BY p.created_at DESC
    `;
        return this.databaseService.query(query, [categoryId]);
    }
    async findBySubcategory(subcategoryId) {
        const query = `
      SELECT p.*, c.name as category_name, s.name as subcategory_name
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN subcategories s ON p.subcategory_id = s.id
      WHERE p.subcategory_id = ? AND p.status = 'published'
      ORDER BY p.created_at DESC
    `;
        return this.databaseService.query(query, [subcategoryId]);
    }
    async findDeals() {
        const query = `
      SELECT p.*, c.name as category_name 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.old_price IS NOT NULL AND p.old_price > p.price AND p.status = 'published'
      ORDER BY ((p.old_price - p.price) / p.old_price) DESC
    `;
        return this.databaseService.query(query);
    }
    async findOne(id) {
        const query = `
      SELECT p.*, c.name as category_name 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.id = ?
    `;
        const products = await this.databaseService.query(query, [id]);
        const product = products[0] || null;
        if (product) {
            const imagesQuery = `
        SELECT id, image_url, display_order 
        FROM product_images 
        WHERE product_id = ? 
        ORDER BY display_order ASC, id ASC
      `;
            const images = await this.databaseService.query(imagesQuery, [id]);
            console.log(`Product ID ${id}: Found ${images.length} images in product_images table`);
            console.log('Images data:', images);
            product.images = images || [];
        }
        return product;
    }
    async findBySku(sku) {
        const query = `
      SELECT p.*, c.name as category_name 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.sku = ?
    `;
        const products = await this.databaseService.query(query, [sku]);
        const product = products[0] || null;
        if (product) {
            const imagesQuery = `
        SELECT id, image_url, display_order 
        FROM product_images 
        WHERE product_id = ? 
        ORDER BY display_order ASC, id ASC
      `;
            const images = await this.databaseService.query(imagesQuery, [product.id]);
            product.images = images || [];
        }
        return product;
    }
    async create(productData) {
        if (productData.sku) {
            const checkSkuQuery = 'SELECT id, name FROM products WHERE sku = ?';
            const existingProducts = await this.databaseService.query(checkSkuQuery, [productData.sku]);
            if (existingProducts.length > 0) {
                return {
                    success: false,
                    message: `المعرف (SKU) "${productData.sku}" مستخدم مسبقاً في المنتج: ${existingProducts[0].name}`,
                };
            }
        }
        const query = `
      INSERT INTO products (name, name_en, sku, description, description_en, price, old_price, stock, category_id, subcategory_id, company_id, image_url, hover_image_url, status, is_featured, is_exclusive)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
        const values = [
            productData.name,
            productData.name_en || null,
            productData.sku || null,
            productData.description || null,
            productData.description_en || null,
            productData.price,
            productData.old_price || null,
            productData.stock || 0,
            productData.category_id,
            productData.subcategory_id || null,
            productData.company_id || null,
            productData.image_url || null,
            productData.hover_image_url || null,
            productData.status || 'published',
            productData.is_featured || false,
            productData.is_exclusive || false,
        ];
        const result = await this.databaseService.query(query, values);
        return {
            success: true,
            id: result.insertId,
            message: 'تم إضافة المنتج بنجاح',
        };
    }
    async update(id, productData) {
        const query = `
      UPDATE products 
      SET name = ?, name_en = ?, sku = ?, description = ?, description_en = ?, price = ?, old_price = ?, stock = ?, category_id = ?, subcategory_id = ?, company_id = ?, image_url = ?, hover_image_url = ?, status = ?, is_featured = ?, is_exclusive = ?
      WHERE id = ?
    `;
        const values = [
            productData.name,
            productData.name_en || null,
            productData.sku || null,
            productData.description || null,
            productData.description_en || null,
            productData.price,
            productData.old_price || null,
            productData.stock || 0,
            productData.category_id,
            productData.subcategory_id || null,
            productData.company_id || null,
            productData.image_url || null,
            productData.hover_image_url || null,
            productData.status || 'published',
            productData.is_featured || false,
            productData.is_exclusive || false,
            id,
        ];
        await this.databaseService.query(query, values);
        return { success: true, message: 'Product updated successfully' };
    }
    async remove(id) {
        const query = 'DELETE FROM products WHERE id = ?';
        await this.databaseService.query(query, [id]);
        return { success: true, message: 'تم حذف المنتج بنجاح' };
    }
    async getProductImages(productId) {
        const query = `
      SELECT id, image_url, display_order 
      FROM product_images 
      WHERE product_id = ? 
      ORDER BY display_order ASC, id ASC
    `;
        return this.databaseService.query(query, [productId]);
    }
    async search(params) {
        let sql = `
      SELECT p.*, c.name as category_name, s.name as subcategory_name
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN subcategories s ON p.subcategory_id = s.id
      WHERE p.status = 'published'
    `;
        const values = [];
        if (params.query) {
            sql += ` AND (p.name LIKE ? OR p.description LIKE ? OR p.sku LIKE ?)`;
            const searchTerm = `%${params.query}%`;
            values.push(searchTerm, searchTerm, searchTerm);
        }
        if (params.category) {
            sql += ` AND c.id = ?`;
            values.push(params.category);
        }
        if (params.minPrice !== undefined) {
            sql += ` AND p.price >= ?`;
            values.push(params.minPrice);
        }
        if (params.maxPrice !== undefined) {
            sql += ` AND p.price <= ?`;
            values.push(params.maxPrice);
        }
        switch (params.sort) {
            case 'newest':
                sql += ` ORDER BY p.created_at DESC`;
                break;
            case 'price_asc':
                sql += ` ORDER BY p.price ASC`;
                break;
            case 'price_desc':
                sql += ` ORDER BY p.price DESC`;
                break;
            case 'relevance':
            default:
                if (params.query) {
                    sql += ` ORDER BY 
            CASE 
              WHEN p.name LIKE ? THEN 1
              WHEN p.name LIKE ? THEN 2
              WHEN p.description LIKE ? THEN 3
              ELSE 4
            END, p.created_at DESC`;
                    values.push(`${params.query}%`, `%${params.query}%`, `%${params.query}%`);
                }
                else {
                    sql += ` ORDER BY p.created_at DESC`;
                }
                break;
        }
        const products = await this.databaseService.query(sql, values);
        return {
            products,
            total: Array.isArray(products) ? products.length : 0,
        };
    }
    async getSearchSuggestions(query) {
        if (!query || query.length < 2) {
            return { suggestions: [] };
        }
        const searchTerm = `%${query}%`;
        const suggestions = [];
        const productQuery = `
      SELECT DISTINCT name as text, 'product' as type
      FROM products
      WHERE name LIKE ? AND status = 'published'
      LIMIT 5
    `;
        const products = await this.databaseService.query(productQuery, [searchTerm]);
        if (Array.isArray(products)) {
            suggestions.push(...products);
        }
        const categoryQuery = `
      SELECT DISTINCT name as text, 'category' as type
      FROM categories
      WHERE name LIKE ?
      LIMIT 3
    `;
        const categories = await this.databaseService.query(categoryQuery, [searchTerm]);
        if (Array.isArray(categories)) {
            suggestions.push(...categories);
        }
        return { suggestions };
    }
    async getPopularSearches() {
        const categoriesQuery = `
      SELECT c.id, c.name, COUNT(p.id) as product_count
      FROM categories c
      LEFT JOIN products p ON c.id = p.category_id AND p.status = 'published'
      GROUP BY c.id, c.name
      HAVING product_count > 0
      ORDER BY product_count DESC
      LIMIT 5
    `;
        const popularCategories = await this.databaseService.query(categoriesQuery);
        return {
            popular_categories: Array.isArray(popularCategories)
                ? popularCategories.map((cat) => ({
                    name: cat.name,
                    handle: cat.id.toString(),
                }))
                : [],
        };
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], ProductsService);
//# sourceMappingURL=products.service.js.map