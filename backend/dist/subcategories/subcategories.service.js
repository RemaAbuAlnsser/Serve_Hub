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
exports.SubcategoriesService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
let SubcategoriesService = class SubcategoriesService {
    databaseService;
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    async findAll() {
        const query = `
      SELECT s.*, c.name as category_name 
      FROM subcategories s 
      LEFT JOIN categories c ON s.category_id = c.id
      ORDER BY s.created_at DESC
    `;
        return this.databaseService.query(query);
    }
    async findByCategory(categoryId) {
        const query = 'SELECT * FROM subcategories WHERE category_id = ? ORDER BY name';
        return this.databaseService.query(query, [categoryId]);
    }
    async findOne(id) {
        const query = `
      SELECT s.*, c.name as category_name 
      FROM subcategories s 
      LEFT JOIN categories c ON s.category_id = c.id
      WHERE s.id = ?
    `;
        const subcategories = await this.databaseService.query(query, [id]);
        return subcategories[0] || null;
    }
    async create(data) {
        const query = 'INSERT INTO subcategories (category_id, name, name_en, description, description_en, image_url) VALUES (?, ?, ?, ?, ?, ?)';
        const result = await this.databaseService.query(query, [
            data.category_id,
            data.name,
            data.name_en || null,
            data.description || null,
            data.description_en || null,
            data.image_url || null,
        ]);
        return { success: true, id: result.insertId, message: 'تم إضافة الفئة الفرعية بنجاح' };
    }
    async update(id, data) {
        const query = 'UPDATE subcategories SET category_id = ?, name = ?, name_en = ?, description = ?, description_en = ?, image_url = ? WHERE id = ?';
        await this.databaseService.query(query, [
            data.category_id,
            data.name,
            data.name_en || null,
            data.description,
            data.description_en || null,
            data.image_url,
            id,
        ]);
        return { success: true, message: 'تم تحديث الفئة الفرعية بنجاح' };
    }
    async remove(id) {
        const query = 'DELETE FROM subcategories WHERE id = ?';
        await this.databaseService.query(query, [id]);
        return { success: true, message: 'تم حذف الفئة الفرعية بنجاح' };
    }
};
exports.SubcategoriesService = SubcategoriesService;
exports.SubcategoriesService = SubcategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], SubcategoriesService);
//# sourceMappingURL=subcategories.service.js.map