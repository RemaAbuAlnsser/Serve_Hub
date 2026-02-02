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
exports.ProductColorImagesService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
let ProductColorImagesService = class ProductColorImagesService {
    databaseService;
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    async getColorImages(colorId) {
        const query = `
      SELECT * FROM product_color_images 
      WHERE product_color_id = ? 
      ORDER BY display_order ASC, id ASC
    `;
        return this.databaseService.query(query, [colorId]);
    }
    async create(imageData) {
        const query = `
      INSERT INTO product_color_images (product_color_id, image_url, display_order)
      VALUES (?, ?, ?)
    `;
        const values = [
            imageData.product_color_id,
            imageData.image_url,
            imageData.display_order || 0,
        ];
        const result = await this.databaseService.query(query, values);
        return {
            success: true,
            id: result.insertId,
            message: 'تم إضافة الصورة بنجاح',
        };
    }
    async remove(id) {
        const query = 'DELETE FROM product_color_images WHERE id = ?';
        await this.databaseService.query(query, [id]);
        return {
            success: true,
            message: 'تم حذف الصورة بنجاح',
        };
    }
};
exports.ProductColorImagesService = ProductColorImagesService;
exports.ProductColorImagesService = ProductColorImagesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], ProductColorImagesService);
//# sourceMappingURL=product-color-images.service.js.map