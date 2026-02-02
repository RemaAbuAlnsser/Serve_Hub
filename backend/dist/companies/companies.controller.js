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
exports.CompaniesController = void 0;
const common_1 = require("@nestjs/common");
const cache_manager_1 = require("@nestjs/cache-manager");
const companies_service_1 = require("./companies.service");
let CompaniesController = class CompaniesController {
    companiesService;
    cacheManager;
    constructor(companiesService, cacheManager) {
        this.companiesService = companiesService;
        this.cacheManager = cacheManager;
    }
    async findAll() {
        return this.companiesService.findAll();
    }
    async findOne(id) {
        return this.companiesService.findOne(+id);
    }
    async create(companyData) {
        const result = await this.companiesService.create(companyData);
        await this.cacheManager.clear();
        return result;
    }
    async update(id, companyData) {
        const result = await this.companiesService.update(+id, companyData);
        await this.cacheManager.clear();
        return result;
    }
    async remove(id) {
        const result = await this.companiesService.remove(+id);
        await this.cacheManager.clear();
        return result;
    }
};
exports.CompaniesController = CompaniesController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CompaniesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CompaniesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CompaniesController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CompaniesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CompaniesController.prototype, "remove", null);
exports.CompaniesController = CompaniesController = __decorate([
    (0, common_1.Controller)('companies'),
    (0, common_1.UseInterceptors)(cache_manager_1.CacheInterceptor),
    __param(1, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [companies_service_1.CompaniesService, Object])
], CompaniesController);
//# sourceMappingURL=companies.controller.js.map