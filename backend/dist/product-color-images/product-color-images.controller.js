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
exports.ProductColorImagesController = void 0;
const common_1 = require("@nestjs/common");
const product_color_images_service_1 = require("./product-color-images.service");
let ProductColorImagesController = class ProductColorImagesController {
    productColorImagesService;
    constructor(productColorImagesService) {
        this.productColorImagesService = productColorImagesService;
    }
    async getColorImages(colorId) {
        return this.productColorImagesService.getColorImages(+colorId);
    }
    async create(imageData) {
        return this.productColorImagesService.create(imageData);
    }
    async remove(id) {
        return this.productColorImagesService.remove(+id);
    }
};
exports.ProductColorImagesController = ProductColorImagesController;
__decorate([
    (0, common_1.Get)('color/:colorId'),
    __param(0, (0, common_1.Param)('colorId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductColorImagesController.prototype, "getColorImages", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductColorImagesController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductColorImagesController.prototype, "remove", null);
exports.ProductColorImagesController = ProductColorImagesController = __decorate([
    (0, common_1.Controller)('product-color-images'),
    __metadata("design:paramtypes", [product_color_images_service_1.ProductColorImagesService])
], ProductColorImagesController);
//# sourceMappingURL=product-color-images.controller.js.map