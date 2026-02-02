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
exports.SettingsService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
let SettingsService = class SettingsService {
    databaseService;
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    async getSettings() {
        const query = 'SELECT * FROM settings ORDER BY id DESC LIMIT 1';
        const result = await this.databaseService.query(query);
        if (result.length === 0) {
            const insertQuery = `
        INSERT INTO settings (
          site_logo, site_image, site_name, site_description,
          contact_email, contact_phone, address,
          facebook_url, instagram_url, whatsapp_url
        ) VALUES (NULL, NULL, 'Sprint Store', 'متجر إلكتروني متكامل', NULL, NULL, NULL, NULL, NULL, NULL)
      `;
            await this.databaseService.query(insertQuery);
            return {
                site_logo: null,
                site_image: null,
                site_images: [],
                site_name: 'Sprint Store',
                site_description: 'متجر إلكتروني متكامل',
                contact_email: null,
                contact_phone: null,
                address: null,
                facebook_url: null,
                instagram_url: null,
                whatsapp_url: null
            };
        }
        const imagesQuery = 'SELECT * FROM site_images ORDER BY display_order ASC, id ASC';
        const siteImages = await this.databaseService.query(imagesQuery);
        return {
            ...result[0],
            site_images: siteImages,
        };
    }
    async updateSettings(data) {
        const current = await this.getSettings();
        const updateFields = [];
        const updateValues = [];
        if (data.site_logo !== undefined) {
            updateFields.push('site_logo = ?');
            updateValues.push(data.site_logo);
        }
        if (data.site_image !== undefined) {
            updateFields.push('site_image = ?');
            updateValues.push(data.site_image);
        }
        if (data.site_name !== undefined) {
            updateFields.push('site_name = ?');
            updateValues.push(data.site_name);
        }
        if (data.site_description !== undefined) {
            updateFields.push('site_description = ?');
            updateValues.push(data.site_description);
        }
        if (data.contact_email !== undefined) {
            updateFields.push('contact_email = ?');
            updateValues.push(data.contact_email);
        }
        if (data.contact_phone !== undefined) {
            updateFields.push('contact_phone = ?');
            updateValues.push(data.contact_phone);
        }
        if (data.address !== undefined) {
            updateFields.push('address = ?');
            updateValues.push(data.address);
        }
        if (data.facebook_url !== undefined) {
            updateFields.push('facebook_url = ?');
            updateValues.push(data.facebook_url);
        }
        if (data.instagram_url !== undefined) {
            updateFields.push('instagram_url = ?');
            updateValues.push(data.instagram_url);
        }
        if (data.whatsapp_url !== undefined) {
            updateFields.push('whatsapp_url = ?');
            updateValues.push(data.whatsapp_url);
        }
        if (updateFields.length > 0) {
            updateValues.push(current.id);
            const query = `UPDATE settings SET ${updateFields.join(', ')} WHERE id = ?`;
            await this.databaseService.query(query, updateValues);
        }
        if (data.site_images && data.site_images.length > 0) {
            await this.databaseService.query('DELETE FROM site_images');
            for (let i = 0; i < data.site_images.length; i++) {
                const insertQuery = `
          INSERT INTO site_images (image_url, display_order)
          VALUES (?, ?)
        `;
                await this.databaseService.query(insertQuery, [
                    data.site_images[i],
                    i,
                ]);
            }
        }
        return { success: true, message: 'تم تحديث الإعدادات بنجاح' };
    }
};
exports.SettingsService = SettingsService;
exports.SettingsService = SettingsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], SettingsService);
//# sourceMappingURL=settings.service.js.map