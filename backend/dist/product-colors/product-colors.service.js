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
exports.ProductColorsService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
let ProductColorsService = class ProductColorsService {
    databaseService;
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    async findByProduct(productId) {
        const query = 'SELECT * FROM product_colors WHERE product_id = ?';
        return this.databaseService.query(query, [productId]);
    }
    async findAllUniqueColors() {
        const query = 'SELECT DISTINCT color_name FROM product_colors ORDER BY color_name';
        return this.databaseService.query(query, []);
    }
    async create(colorData) {
        const query = `
      INSERT INTO product_colors (product_id, color_name, stock, image_url)
      VALUES (?, ?, ?, ?)
    `;
        const values = [
            colorData.product_id,
            colorData.color_name,
            colorData.stock || 0,
            colorData.image_url || null,
        ];
        const result = await this.databaseService.query(query, values);
        await this.updateProductTotalStock(colorData.product_id);
        return {
            success: true,
            id: result.insertId,
            message: 'تم إضافة اللون بنجاح',
        };
    }
    async update(id, colorData) {
        const query = `
      UPDATE product_colors 
      SET color_name = ?, stock = ?, image_url = ?
      WHERE id = ?
    `;
        const values = [
            colorData.color_name,
            colorData.stock || 0,
            colorData.image_url || null,
            id,
        ];
        await this.databaseService.query(query, values);
        const colorQuery = 'SELECT product_id FROM product_colors WHERE id = ?';
        const colorResult = await this.databaseService.query(colorQuery, [id]);
        if (colorResult.length > 0) {
            await this.updateProductTotalStock(colorResult[0].product_id);
        }
        return { success: true, message: 'تم تحديث اللون بنجاح' };
    }
    async remove(id) {
        const colorQuery = 'SELECT product_id FROM product_colors WHERE id = ?';
        const colorResult = await this.databaseService.query(colorQuery, [id]);
        const query = 'DELETE FROM product_colors WHERE id = ?';
        await this.databaseService.query(query, [id]);
        if (colorResult.length > 0) {
            await this.updateProductTotalStock(colorResult[0].product_id);
        }
        return { success: true, message: 'تم حذف اللون بنجاح' };
    }
    async updateProductTotalStock(productId) {
        const query = 'SELECT SUM(stock) as total_stock FROM product_colors WHERE product_id = ?';
        const result = await this.databaseService.query(query, [productId]);
        const totalStock = result[0]?.total_stock || 0;
        const updateQuery = 'UPDATE products SET stock = ? WHERE id = ?';
        await this.databaseService.query(updateQuery, [totalStock, productId]);
    }
    async decreaseStock(productId, colorId, quantity) {
        const query = 'UPDATE product_colors SET stock = stock - ? WHERE id = ? AND product_id = ?';
        await this.databaseService.query(query, [quantity, colorId, productId]);
        await this.updateProductTotalStock(productId);
        return { success: true, message: 'تم تحديث المخزون' };
    }
};
exports.ProductColorsService = ProductColorsService;
exports.ProductColorsService = ProductColorsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], ProductColorsService);
//# sourceMappingURL=product-colors.service.js.map