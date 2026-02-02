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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const database_service_1 = require("../database/database.service");
const bcrypt = __importStar(require("bcrypt"));
let AuthService = class AuthService {
    databaseService;
    jwtService;
    constructor(databaseService, jwtService) {
        this.databaseService = databaseService;
        this.jwtService = jwtService;
    }
    async adminLogin(email, password) {
        const query = 'SELECT * FROM users WHERE email = ?';
        const users = await this.databaseService.query(query, [email]);
        if (users.length === 0) {
            throw new common_1.UnauthorizedException('المستخدم غير موجود');
        }
        const user = users[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('كلمة المرور غير صحيحة');
        }
        if (user.role !== 'admin') {
            throw new common_1.UnauthorizedException('ليس لديك صلاحية للوصول إلى لوحة التحكم');
        }
        const payload = { email: user.email, sub: user.id, role: user.role };
        const token = this.jwtService.sign(payload);
        return {
            success: true,
            access_token: token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
        };
    }
    async registerAdmin(data) {
        const checkQuery = 'SELECT id FROM users WHERE email = ?';
        const existingUsers = await this.databaseService.query(checkQuery, [data.email]);
        if (existingUsers.length > 0) {
            throw new common_1.UnauthorizedException('البريد الإلكتروني مستخدم بالفعل');
        }
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const insertQuery = 'INSERT INTO users (email, password, name, role) VALUES (?, ?, ?, ?)';
        try {
            const result = await this.databaseService.query(insertQuery, [
                data.email,
                hashedPassword,
                data.name,
                'admin',
            ]);
            const payload = { email: data.email, sub: result.insertId, role: 'admin' };
            const token = this.jwtService.sign(payload);
            return {
                success: true,
                message: 'تم التسجيل بنجاح',
                access_token: token,
                user: {
                    id: result.insertId,
                    email: data.email,
                    name: data.name,
                    role: 'customer',
                },
            };
        }
        catch (error) {
            throw new common_1.UnauthorizedException('فشل في إنشاء الحساب');
        }
    }
    async validateUser(userId) {
        const query = 'SELECT id, email, name, role FROM users WHERE id = ?';
        const users = await this.databaseService.query(query, [userId]);
        if (users.length === 0) {
            return null;
        }
        return users[0];
    }
    async updateUserRole(userId, role) {
        const query = 'UPDATE users SET role = ? WHERE id = ?';
        await this.databaseService.query(query, [role, userId]);
        return {
            success: true,
            message: 'تم تحديث دور المستخدم بنجاح',
        };
    }
    async makeUserAdmin(email) {
        const query = 'UPDATE users SET role = ? WHERE email = ?';
        await this.databaseService.query(query, ['admin', email]);
        return {
            success: true,
            message: 'تم تحديث المستخدم إلى مدير بنجاح',
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map