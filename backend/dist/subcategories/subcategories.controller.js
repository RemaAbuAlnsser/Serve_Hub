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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubcategoriesController = void 0;
const common_1 = require("@nestjs/common");
const cache_manager_1 = require("@nestjs/cache-manager");
const subcategories_service_1 = require("./subcategories.service");
let SubcategoriesController = class SubcategoriesController {
    subcategoriesService;
    cacheManager;
    constructor(subcategoriesService, cacheManager) {
        this.subcategoriesService = subcategoriesService;
        this.cacheManager = cacheManager;
    }
    async findAll() {
        return this.subcategoriesService.findAll();
    }
    async findByCategory(categoryId) {
        return this.subcategoriesService.findByCategory(+categoryId);
    }
    async findOne(id) {
        return this.subcategoriesService.findOne(+id);
    }
    async create(subcategoryData) {
        const result = await this.subcategoriesService.create(subcategoryData);
        await this.cacheManager.clear();
        return result;
    }
    async update(id, subcategoryData) {
        const result = await this.subcategoriesService.update(+id, subcategoryData);
        await this.cacheManager.clear();
        return result;
    }
    async remove(id) {
        const result = await this.subcategoriesService.remove(+id);
        await this.cacheManager.clear();
        return result;
    }
};
exports.SubcategoriesController = SubcategoriesController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SubcategoriesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('category/:categoryId'),
    __param(0, (0, common_1.Param)('categoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SubcategoriesController.prototype, "findByCategory", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SubcategoriesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SubcategoriesController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SubcategoriesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SubcategoriesController.prototype, "remove", null);
exports.SubcategoriesController = SubcategoriesController = __decorate([
    (0, common_1.Controller)('subcategories'),
    (0, common_1.UseInterceptors)(cache_manager_1.CacheInterceptor),
    __param(1, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [subcategories_service_1.SubcategoriesService, Object])
], SubcategoriesController);
//# sourceMappingURL=subcategories.controller.js.map