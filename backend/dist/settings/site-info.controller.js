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
exports.SiteInfoController = void 0;
const common_1 = require("@nestjs/common");
const settings_service_1 = require("./settings.service");
let SiteInfoController = class SiteInfoController {
    settingsService;
    constructor(settingsService) {
        this.settingsService = settingsService;
    }
    async getSiteInfo() {
        try {
            const settings = await this.settingsService.getSettings();
            if (settings) {
                return {
                    success: true,
                    data: {
                        site_name: settings.site_name,
                        site_logo: settings.site_logo,
                        site_description: settings.site_description,
                        favicon_url: settings.site_logo ? `${process.env.BASE_URL || 'http://localhost:3000'}/favicon.ico` : null
                    }
                };
            }
            return {
                success: false,
                message: 'لم يتم العثور على إعدادات الموقع'
            };
        }
        catch (error) {
            console.error('Site info error:', error);
            return {
                success: false,
                message: 'حدث خطأ أثناء جلب معلومات الموقع'
            };
        }
    }
};
exports.SiteInfoController = SiteInfoController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SiteInfoController.prototype, "getSiteInfo", null);
exports.SiteInfoController = SiteInfoController = __decorate([
    (0, common_1.Controller)('site-info'),
    __metadata("design:paramtypes", [settings_service_1.SettingsService])
], SiteInfoController);
//# sourceMappingURL=site-info.controller.js.map