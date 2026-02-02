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
exports.ProductImagesService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
let ProductImagesService = class ProductImagesService {
    databaseService;
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    async findByProduct(productId) {
        const query = `
      SELECT * FROM product_images 
      WHERE product_id = ? 
      ORDER BY display_order ASC, id ASC
    `;
        return this.databaseService.query(query, [productId]);
    }
    async create(imageData) {
        console.log('ProductImagesService.create called with:', imageData);
        const query = `
      INSERT INTO product_images (product_id, image_url, display_order)
      VALUES (?, ?, ?)
    `;
        const values = [
            imageData.product_id,
            imageData.image_url,
            imageData.display_order || 0,
        ];
        console.log('Executing query:', query);
        console.log('With values:', values);
        try {
            const result = await this.databaseService.query(query, values);
            console.log('Insert result:', result);
            return {
                success: true,
                id: result.insertId,
                message: 'Product image added successfully',
            };
        }
        catch (error) {
            console.error('Error inserting product image:', error);
            return {
                success: false,
                message: 'Failed to add product image',
                error: error.message,
            };
        }
    }
    async remove(id) {
        const query = 'DELETE FROM product_images WHERE id = ?';
        await this.databaseService.query(query, [id]);
        return {
            success: true,
            message: 'Product image deleted successfully',
        };
    }
};
exports.ProductImagesService = ProductImagesService;
exports.ProductImagesService = ProductImagesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], ProductImagesService);
//# sourceMappingURL=product-images.service.js.map