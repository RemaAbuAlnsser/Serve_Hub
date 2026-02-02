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
exports.ProductColorsController = void 0;
const common_1 = require("@nestjs/common");
const product_colors_service_1 = require("./product-colors.service");
let ProductColorsController = class ProductColorsController {
    productColorsService;
    constructor(productColorsService) {
        this.productColorsService = productColorsService;
    }
    async getAvailableColors() {
        return this.productColorsService.findAllUniqueColors();
    }
    async getProductColors(productId) {
        return this.productColorsService.findByProduct(parseInt(productId));
    }
    async create(colorData) {
        return this.productColorsService.create(colorData);
    }
    async update(id, colorData) {
        return this.productColorsService.update(parseInt(id), colorData);
    }
    async remove(id) {
        return this.productColorsService.remove(parseInt(id));
    }
    async decreaseStock(data) {
        return this.productColorsService.decreaseStock(data.product_id, data.color_id, data.quantity);
    }
};
exports.ProductColorsController = ProductColorsController;
__decorate([
    (0, common_1.Get)('available-colors'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductColorsController.prototype, "getAvailableColors", null);
__decorate([
    (0, common_1.Get)('product/:productId'),
    __param(0, (0, common_1.Param)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductColorsController.prototype, "getProductColors", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductColorsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProductColorsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductColorsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('decrease-stock'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductColorsController.prototype, "decreaseStock", null);
exports.ProductColorsController = ProductColorsController = __decorate([
    (0, common_1.Controller)('product-colors'),
    __metadata("design:paramtypes", [product_colors_service_1.ProductColorsService])
], ProductColorsController);
//# sourceMappingURL=product-colors.controller.js.map