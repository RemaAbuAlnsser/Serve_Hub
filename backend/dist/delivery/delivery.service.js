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
exports.DeliveryService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
let DeliveryService = class DeliveryService {
    databaseService;
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    async onModuleInit() {
        await this.createDeliveryTable();
    }
    async createDeliveryTable() {
        const createTableQuery = `
      CREATE TABLE IF NOT EXISTS delivery_cities (
        id INT AUTO_INCREMENT PRIMARY KEY,
        city_name VARCHAR(255) NOT NULL UNIQUE,
        delivery_price DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `;
        try {
            await this.databaseService.query(createTableQuery);
            console.log('Delivery cities table created/verified successfully');
        }
        catch (error) {
            console.error('Error creating delivery cities table:', error);
        }
    }
    async findAll() {
        const query = 'SELECT * FROM delivery_cities ORDER BY city_name ASC';
        return this.databaseService.query(query);
    }
    async findOne(id) {
        const query = 'SELECT * FROM delivery_cities WHERE id = ?';
        const cities = await this.databaseService.query(query, [id]);
        return cities[0] || null;
    }
    async create(data) {
        try {
            const query = 'INSERT INTO delivery_cities (city_name, city_name_en, delivery_price) VALUES (?, ?, ?)';
            const result = await this.databaseService.query(query, [
                data.city_name,
                data.city_name_en || null,
                data.delivery_price,
            ]);
            return { success: true, id: result.insertId, message: 'تم إضافة المدينة بنجاح' };
        }
        catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                return { success: false, message: 'هذه المدينة موجودة مسبقاً' };
            }
            console.error('Error creating delivery city:', error);
            return { success: false, message: 'فشل إضافة المدينة' };
        }
    }
    async update(id, data) {
        try {
            const query = 'UPDATE delivery_cities SET city_name = ?, city_name_en = ?, delivery_price = ? WHERE id = ?';
            await this.databaseService.query(query, [
                data.city_name,
                data.city_name_en || null,
                data.delivery_price,
                id,
            ]);
            return { success: true, message: 'تم تحديث المدينة بنجاح' };
        }
        catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                return { success: false, message: 'هذه المدينة موجودة مسبقاً' };
            }
            console.error('Error updating delivery city:', error);
            return { success: false, message: 'فشل تحديث المدينة' };
        }
    }
    async remove(id) {
        try {
            const query = 'DELETE FROM delivery_cities WHERE id = ?';
            await this.databaseService.query(query, [id]);
            return { success: true, message: 'تم حذف المدينة بنجاح' };
        }
        catch (error) {
            console.error('Error deleting delivery city:', error);
            return { success: false, message: 'فشل حذف المدينة' };
        }
    }
    async findByCity(cityName) {
        const query = 'SELECT * FROM delivery_cities WHERE city_name = ?';
        const cities = await this.databaseService.query(query, [cityName]);
        return cities[0] || null;
    }
};
exports.DeliveryService = DeliveryService;
exports.DeliveryService = DeliveryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], DeliveryService);
//# sourceMappingURL=delivery.service.js.map