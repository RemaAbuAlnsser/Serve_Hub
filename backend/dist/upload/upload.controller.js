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
exports.UploadController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
let UploadController = class UploadController {
    uploadCategoryImage(file) {
        if (!file) {
            return { success: false, message: 'No file uploaded' };
        }
        const imageUrl = `/uploads/categories/${file.filename}`;
        return {
            success: true,
            imageUrl,
            message: 'Image uploaded successfully',
        };
    }
    uploadCompanyLogo(file) {
        if (!file) {
            return { success: false, message: 'No file uploaded' };
        }
        const imageUrl = `/uploads/companies/${file.filename}`;
        return {
            success: true,
            imageUrl,
            message: 'Logo uploaded successfully',
        };
    }
    uploadSubcategoryImage(file) {
        if (!file) {
            return { success: false, message: 'No file uploaded' };
        }
        const imageUrl = `/uploads/subcategories/${file.filename}`;
        return {
            success: true,
            imageUrl,
            message: 'Image uploaded successfully',
        };
    }
    uploadProductImage(file) {
        if (!file) {
            return { success: false, message: 'No file uploaded' };
        }
        const imageUrl = `/uploads/products/${file.filename}`;
        return {
            success: true,
            imageUrl,
            message: 'Image uploaded successfully',
        };
    }
    uploadProductHoverImage(file) {
        if (!file) {
            return { success: false, message: 'No file uploaded' };
        }
        const imageUrl = `/uploads/products/${file.filename}`;
        return {
            success: true,
            imageUrl,
            message: 'Hover image uploaded successfully',
        };
    }
    uploadProductColorImage(file) {
        if (!file) {
            return { success: false, message: 'No file uploaded' };
        }
        const imageUrl = `/uploads/products/colors/${file.filename}`;
        return {
            success: true,
            imageUrl,
            message: 'Color image uploaded successfully',
        };
    }
    uploadProductGalleryImage(file) {
        if (!file) {
            return { success: false, message: 'No file uploaded' };
        }
        const imageUrl = `/uploads/products/gallery/${file.filename}`;
        return {
            success: true,
            imageUrl,
            message: 'Gallery image uploaded successfully',
        };
    }
};
exports.UploadController = UploadController;
__decorate([
    (0, common_1.Post)('category-image'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/categories',
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = (0, path_1.extname)(file.originalname);
                const filename = `category-${uniqueSuffix}${ext}`;
                callback(null, filename);
            },
        }),
        fileFilter: (req, file, callback) => {
            if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
                return callback(new Error('Only image files are allowed!'), false);
            }
            callback(null, true);
        },
        limits: {
            fileSize: 5 * 1024 * 1024,
        },
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UploadController.prototype, "uploadCategoryImage", null);
__decorate([
    (0, common_1.Post)('company-logo'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/companies',
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = (0, path_1.extname)(file.originalname);
                const filename = `company-${uniqueSuffix}${ext}`;
                callback(null, filename);
            },
        }),
        fileFilter: (req, file, callback) => {
            if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
                return callback(new Error('Only image files are allowed!'), false);
            }
            callback(null, true);
        },
        limits: {
            fileSize: 5 * 1024 * 1024,
        },
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UploadController.prototype, "uploadCompanyLogo", null);
__decorate([
    (0, common_1.Post)('subcategory-image'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/subcategories',
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = (0, path_1.extname)(file.originalname);
                const filename = `subcategory-${uniqueSuffix}${ext}`;
                callback(null, filename);
            },
        }),
        fileFilter: (req, file, callback) => {
            if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
                return callback(new Error('Only image files are allowed!'), false);
            }
            callback(null, true);
        },
        limits: {
            fileSize: 5 * 1024 * 1024,
        },
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UploadController.prototype, "uploadSubcategoryImage", null);
__decorate([
    (0, common_1.Post)('product-image'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/products',
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = (0, path_1.extname)(file.originalname);
                const filename = `product-${uniqueSuffix}${ext}`;
                callback(null, filename);
            },
        }),
        fileFilter: (req, file, callback) => {
            if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
                return callback(new Error('Only image files are allowed!'), false);
            }
            callback(null, true);
        },
        limits: {
            fileSize: 5 * 1024 * 1024,
        },
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UploadController.prototype, "uploadProductImage", null);
__decorate([
    (0, common_1.Post)('product-hover-image'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/products',
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = (0, path_1.extname)(file.originalname);
                const filename = `product-hover-${uniqueSuffix}${ext}`;
                callback(null, filename);
            },
        }),
        fileFilter: (req, file, callback) => {
            if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
                return callback(new Error('Only image files are allowed!'), false);
            }
            callback(null, true);
        },
        limits: {
            fileSize: 5 * 1024 * 1024,
        },
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UploadController.prototype, "uploadProductHoverImage", null);
__decorate([
    (0, common_1.Post)('product-color-image'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/products/colors',
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = (0, path_1.extname)(file.originalname);
                const filename = `color-${uniqueSuffix}${ext}`;
                callback(null, filename);
            },
        }),
        fileFilter: (req, file, callback) => {
            if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
                return callback(new Error('Only image files are allowed!'), false);
            }
            callback(null, true);
        },
        limits: {
            fileSize: 5 * 1024 * 1024,
        },
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UploadController.prototype, "uploadProductColorImage", null);
__decorate([
    (0, common_1.Post)('product-gallery-image'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/products/gallery',
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = (0, path_1.extname)(file.originalname);
                const filename = `gallery-${uniqueSuffix}${ext}`;
                callback(null, filename);
            },
        }),
        fileFilter: (req, file, callback) => {
            if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
                return callback(new Error('Only image files are allowed!'), false);
            }
            callback(null, true);
        },
        limits: {
            fileSize: 5 * 1024 * 1024,
        },
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UploadController.prototype, "uploadProductGalleryImage", null);
exports.UploadController = UploadController = __decorate([
    (0, common_1.Controller)('upload')
], UploadController);
//# sourceMappingURL=upload.controller.js.map