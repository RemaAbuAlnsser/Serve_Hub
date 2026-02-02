import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(loginDto: {
        email: string;
        password: string;
    }): Promise<{
        success: boolean;
        access_token: string;
        user: {
            id: any;
            email: any;
            name: any;
            role: any;
        };
    }>;
    register(registerDto: {
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
    getProfile(req: any): Promise<{
        success: boolean;
        user: any;
    }>;
    updateUserRole(id: string, updateRoleDto: {
        role: string;
    }): Promise<{
        success: boolean;
        message: string;
    }>;
    setupAdmin(setupDto: {
        email: string;
    }): Promise<{
        success: boolean;
        message: string;
    }>;
}
