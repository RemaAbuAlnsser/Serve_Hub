"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaviconController = void 0;
const common_1 = require("@nestjs/common");
const settings_service_1 = require("./settings.service");
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
let FaviconController = class FaviconController {
    settingsService;
    constructor(settingsService) {
        this.settingsService = settingsService;
    }
    async getFavicon(res) {
        try {
            const settings = await this.settingsService.getSettings();
            if (settings && settings.site_logo) {
                const logoPath = settings.site_logo.startsWith('/')
                    ? settings.site_logo.substring(1)
                    : settings.site_logo;
                const fullPath = path.join(process.cwd(), logoPath);
                if (fs.existsSync(fullPath)) {
                    res.setHeader('Content-Type', 'image/x-icon');
                    res.setHeader('Cache-Control', 'public, max-age=86400');
                    const fileStream = fs.createReadStream(fullPath);
                    fileStream.pipe(res);
                    return;
                }
            }
            const defaultFaviconPath = path.join(process.cwd(), 'public', 'favicon.ico');
            if (fs.existsSync(defaultFaviconPath)) {
                res.setHeader('Content-Type', 'image/x-icon');
                res.setHeader('Cache-Control', 'public, max-age=86400');
                const fileStream = fs.createReadStream(defaultFaviconPath);
                fileStream.pipe(res);
            }
            else {
                res.status(404).send('Favicon not found');
            }
        }
        catch (error) {
            console.error('Favicon error:', error);
            res.status(500).send('Internal server error');
        }
    }
    async getAppleTouchIcon(res) {
        try {
            const settings = await this.settingsService.getSettings();
            if (settings && settings.site_logo) {
                const logoPath = settings.site_logo.startsWith('/')
                    ? settings.site_logo.substring(1)
                    : settings.site_logo;
                const fullPath = path.join(process.cwd(), logoPath);
                if (fs.existsSync(fullPath)) {
                    res.setHeader('Content-Type', 'image/png');
                    res.setHeader('Cache-Control', 'public, max-age=86400');
                    const fileStream = fs.createReadStream(fullPath);
                    fileStream.pipe(res);
                    return;
                }
            }
            const defaultIconPath = path.join(process.cwd(), 'public', 'apple-touch-icon.png');
            if (fs.existsSync(defaultIconPath)) {
                res.setHeader('Content-Type', 'image/png');
                res.setHeader('Cache-Control', 'public, max-age=86400');
                const fileStream = fs.createReadStream(defaultIconPath);
                fileStream.pipe(res);
            }
            else {
                res.status(404).send('Apple touch icon not found');
            }
        }
        catch (error) {
            console.error('Apple touch icon error:', error);
            res.status(500).send('Internal server error');
        }
    }
};
exports.FaviconController = FaviconController;
__decorate([
    (0, common_1.Get)('favicon.ico'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FaviconController.prototype, "getFavicon", null);
__decorate([
    (0, common_1.Get)('apple-touch-icon.png'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FaviconController.prototype, "getAppleTouchIcon", null);
exports.FaviconController = FaviconController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [settings_service_1.SettingsService])
], FaviconController);
//# sourceMappingURL=favicon.controller.js.map