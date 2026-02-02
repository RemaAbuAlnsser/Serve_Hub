import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from '../database/database.service';
export declare class AuthService {
    private databaseService;
    private jwtService;
    constructor(databaseService: DatabaseService, jwtService: JwtService);
    adminLogin(email: string, password: string): Promise<{
        success: boolean;
        access_token: string;
        user: {
            id: any;
            email: any;
            name: any;
            role: any;
        };
    }>;
    registerAdmin(data: {
        email: string;
        password: string;
        name: string;
    }): Promise<{
        success: boolean;
        message: string;
        access_token: string;
        user: {
            id: any;
            email: string;
            name: string;
            role: string;
        };
    }>;
    validateUser(userId: number): Promise<any>;
    updateUserRole(userId: number, role: string): Promise<{
        success: boolean;
        message: string;
    }>;
    makeUserAdmin(email: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
