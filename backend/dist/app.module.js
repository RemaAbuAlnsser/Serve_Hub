"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const cache_manager_1 = require("@nestjs/cache-manager");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const database_module_1 = require("./database/database.module");
const auth_module_1 = require("./auth/auth.module");
const products_module_1 = require("./products/products.module");
const categories_module_1 = require("./categories/categories.module");
const orders_module_1 = require("./orders/orders.module");
const upload_module_1 = require("./upload/upload.module");
const companies_module_1 = require("./companies/companies.module");
const subcategories_module_1 = require("./subcategories/subcategories.module");
const settings_module_1 = require("./settings/settings.module");
const product_colors_module_1 = require("./product-colors/product-colors.module");
const product_images_module_1 = require("./product-images/product-images.module");
const product_color_images_module_1 = require("./product-color-images/product-color-images.module");
const export_module_1 = require("./export/export.module");
const delivery_module_1 = require("./delivery/delivery.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            cache_manager_1.CacheModule.register({
                isGlobal: true,
                ttl: 300000,
                max: 100,
            }),
            database_module_1.DatabaseModule,
            auth_module_1.AuthModule,
            products_module_1.ProductsModule,
            categories_module_1.CategoriesModule,
            orders_module_1.OrdersModule,
            upload_module_1.UploadModule,
            companies_module_1.CompaniesModule,
            subcategories_module_1.SubcategoriesModule,
            settings_module_1.SettingsModule,
            product_colors_module_1.ProductColorsModule,
            product_images_module_1.ProductImagesModule,
            product_color_images_module_1.ProductColorImagesModule,
            export_module_1.ExportModule,
            delivery_module_1.DeliveryModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map