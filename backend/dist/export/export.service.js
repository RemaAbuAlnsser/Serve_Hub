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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
let ExportService = class ExportService {
    databaseService;
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    async exportAllTables() {
        try {
            const tables = [
                'users', 'categories', 'subcategories', 'companies', 'products',
                'product_colors', 'product_images', 'product_color_images',
                'orders', 'order_items', 'settings', 'site_images'
            ];
            const exportData = {};
            for (const table of tables) {
                const query = `SELECT * FROM ${table}`;
                const data = await this.databaseService.query(query);
                exportData[table] = data;
            }
            return {
                success: true,
                data: exportData,
                message: 'تم تصدير جميع البيانات بنجاح'
            };
        }
        catch (error) {
            console.error('Export error:', error);
            return {
                success: false,
                data: null,
                message: 'حدث خطأ أثناء تصدير البيانات'
            };
        }
    }
    async exportTable(tableName) {
        try {
            const allowedTables = [
                'users', 'categories', 'subcategories', 'companies', 'products',
                'product_colors', 'product_images', 'product_color_images',
                'orders', 'order_items', 'settings', 'site_images'
            ];
            if (!allowedTables.includes(tableName)) {
                return {
                    success: false,
                    data: null,
                    message: 'اسم الجدول غير صحيح'
                };
            }
            const query = `SELECT * FROM ${tableName}`;
            const data = await this.databaseService.query(query);
            return {
                success: true,
                data: { [tableName]: data },
                message: `تم تصدير جدول ${tableName} بنجاح`
            };
        }
        catch (error) {
            console.error('Export table error:', error);
            return {
                success: false,
                data: null,
                message: 'حدث خطأ أثناء تصدير الجدول'
            };
        }
    }
    async createSQLDump() {
        try {
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const fileName = `sprint_db_backup_${timestamp}.sql`;
            const filePath = path.join(process.cwd(), 'exports', fileName);
            const exportsDir = path.join(process.cwd(), 'exports');
            if (!fs.existsSync(exportsDir)) {
                fs.mkdirSync(exportsDir, { recursive: true });
            }
            const tables = [
                'users', 'categories', 'subcategories', 'companies', 'products',
                'product_colors', 'product_images', 'product_color_images',
                'orders', 'order_items', 'settings', 'site_images'
            ];
            let sqlDump = `-- Sprint E-Commerce Database Backup\n`;
            sqlDump += `-- Generated on: ${new Date().toISOString()}\n`;
            sqlDump += `-- Database: SprintDB\n\n`;
            sqlDump += `SET FOREIGN_KEY_CHECKS = 0;\n\n`;
            for (const table of tables) {
                const createTableQuery = `SHOW CREATE TABLE ${table}`;
                const createTableResult = await this.databaseService.query(createTableQuery);
                sqlDump += `-- Table structure for ${table}\n`;
                sqlDump += `DROP TABLE IF EXISTS \`${table}\`;\n`;
                sqlDump += `${createTableResult[0]['Create Table']};\n\n`;
                const selectQuery = `SELECT * FROM ${table}`;
                const tableData = await this.databaseService.query(selectQuery);
                if (tableData.length > 0) {
                    sqlDump += `-- Data for table ${table}\n`;
                    sqlDump += `INSERT INTO \`${table}\` VALUES\n`;
                    const values = tableData.map((row) => {
                        const rowValues = Object.values(row).map(value => {
                            if (value === null)
                                return 'NULL';
                            if (typeof value === 'string')
                                return `'${value.replace(/'/g, "''")}'`;
                            if (value instanceof Date)
                                return `'${value.toISOString().slice(0, 19).replace('T', ' ')}'`;
                            return value;
                        });
                        return `(${rowValues.join(', ')})`;
                    });
                    sqlDump += values.join(',\n') + ';\n\n';
                }
            }
            sqlDump += `SET FOREIGN_KEY_CHECKS = 1;\n`;
            fs.writeFileSync(filePath, sqlDump, 'utf8');
            return {
                success: true,
                filePath: fileName,
                message: 'تم إنشاء ملف SQL بنجاح'
            };
        }
        catch (error) {
            console.error('SQL dump error:', error);
            return {
                success: false,
                message: 'حدث خطأ أثناء إنشاء ملف SQL'
            };
        }
    }
    async getTableStats() {
        try {
            const tables = [
                'users', 'categories', 'subcategories', 'companies', 'products',
                'product_colors', 'product_images', 'product_color_images',
                'orders', 'order_items', 'settings', 'site_images'
            ];
            const stats = {};
            for (const table of tables) {
                const countQuery = `SELECT COUNT(*) as count FROM ${table}`;
                const result = await this.databaseService.query(countQuery);
                stats[table] = result[0].count;
            }
            return {
                success: true,
                stats,
                message: 'تم جلب إحصائيات الجداول بنجاح'
            };
        }
        catch (error) {
            console.error('Stats error:', error);
            return {
                success: false,
                stats: null,
                message: 'حدث خطأ أثناء جلب الإحصائيات'
            };
        }
    }
};
exports.ExportService = ExportService;
exports.ExportService = ExportService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], ExportService);
//# sourceMappingURL=export.service.js.map