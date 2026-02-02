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
exports.ExportController = void 0;
const common_1 = require("@nestjs/common");
const export_service_1 = require("./export.service");
const admin_auth_guard_1 = require("../auth/admin-auth.guard");
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
let ExportController = class ExportController {
    exportService;
    constructor(exportService) {
        this.exportService = exportService;
    }
    async exportAllTables() {
        return await this.exportService.exportAllTables();
    }
    async exportTable(tableName) {
        return await this.exportService.exportTable(tableName);
    }
    async getTableStats() {
        return await this.exportService.getTableStats();
    }
    async createSQLDump() {
        return await this.exportService.createSQLDump();
    }
    async downloadFile(fileName, res) {
        try {
            const filePath = path.join(process.cwd(), 'exports', fileName);
            if (!fs.existsSync(filePath)) {
                return res.status(404).json({
                    success: false,
                    message: 'الملف غير موجود'
                });
            }
            res.setHeader('Content-Type', 'application/octet-stream');
            res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
            const fileStream = fs.createReadStream(filePath);
            fileStream.pipe(res);
        }
        catch (error) {
            console.error('Download error:', error);
            return res.status(500).json({
                success: false,
                message: 'حدث خطأ أثناء تحميل الملف'
            });
        }
    }
    async exportAllTablesAsJSON(res) {
        try {
            const result = await this.exportService.exportAllTables();
            if (result.success) {
                const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
                const fileName = `sprint_db_export_${timestamp}.json`;
                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
                return res.json({
                    exportDate: new Date().toISOString(),
                    database: 'SprintDB',
                    tables: result.data
                });
            }
            else {
                return res.status(500).json(result);
            }
        }
        catch (error) {
            console.error('JSON export error:', error);
            return res.status(500).json({
                success: false,
                message: 'حدث خطأ أثناء تصدير البيانات'
            });
        }
    }
    async exportTableAsJSON(tableName, res) {
        try {
            const result = await this.exportService.exportTable(tableName);
            if (result.success) {
                const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
                const fileName = `${tableName}_export_${timestamp}.json`;
                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
                return res.json({
                    exportDate: new Date().toISOString(),
                    database: 'SprintDB',
                    table: tableName,
                    data: result.data[tableName]
                });
            }
            else {
                return res.status(500).json(result);
            }
        }
        catch (error) {
            console.error('Table JSON export error:', error);
            return res.status(500).json({
                success: false,
                message: 'حدث خطأ أثناء تصدير الجدول'
            });
        }
    }
};
exports.ExportController = ExportController;
__decorate([
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ExportController.prototype, "exportAllTables", null);
__decorate([
    (0, common_1.Get)('table/:tableName'),
    __param(0, (0, common_1.Param)('tableName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ExportController.prototype, "exportTable", null);
__decorate([
    (0, common_1.Get)('stats'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ExportController.prototype, "getTableStats", null);
__decorate([
    (0, common_1.Post)('sql-dump'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ExportController.prototype, "createSQLDump", null);
__decorate([
    (0, common_1.Get)('download/:fileName'),
    __param(0, (0, common_1.Param)('fileName')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ExportController.prototype, "downloadFile", null);
__decorate([
    (0, common_1.Get)('json/all'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ExportController.prototype, "exportAllTablesAsJSON", null);
__decorate([
    (0, common_1.Get)('json/table/:tableName'),
    __param(0, (0, common_1.Param)('tableName')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ExportController.prototype, "exportTableAsJSON", null);
exports.ExportController = ExportController = __decorate([
    (0, common_1.Controller)('export'),
    (0, common_1.UseGuards)(admin_auth_guard_1.AdminAuthGuard),
    __metadata("design:paramtypes", [export_service_1.ExportService])
], ExportController);
//# sourceMappingURL=export.controller.js.map