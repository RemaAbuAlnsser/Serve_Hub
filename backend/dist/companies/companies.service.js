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
exports.CompaniesService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
let CompaniesService = class CompaniesService {
    databaseService;
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    async findAll() {
        const query = 'SELECT * FROM companies ORDER BY created_at DESC';
        return this.databaseService.query(query);
    }
    async findOne(id) {
        const query = 'SELECT * FROM companies WHERE id = ?';
        const companies = await this.databaseService.query(query, [id]);
        return companies[0] || null;
    }
    async create(data) {
        const query = 'INSERT INTO companies (name, name_en, logo_url) VALUES (?, ?, ?)';
        const result = await this.databaseService.query(query, [
            data.name,
            data.name_en || null,
            data.logo_url || null,
        ]);
        return { success: true, id: result.insertId, message: 'تم إضافة الشركة بنجاح' };
    }
    async update(id, data) {
        const query = 'UPDATE companies SET name = ?, name_en = ?, logo_url = ? WHERE id = ?';
        await this.databaseService.query(query, [
            data.name,
            data.name_en || null,
            data.logo_url,
            id,
        ]);
        return { success: true, message: 'تم تحديث الشركة بنجاح' };
    }
    async remove(id) {
        const query = 'DELETE FROM companies WHERE id = ?';
        await this.databaseService.query(query, [id]);
        return { success: true, message: 'تم حذف الشركة بنجاح' };
    }
};
exports.CompaniesService = CompaniesService;
exports.CompaniesService = CompaniesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], CompaniesService);
//# sourceMappingURL=companies.service.js.map