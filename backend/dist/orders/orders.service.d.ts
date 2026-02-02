import { DatabaseService } from '../database/database.service';
export declare class OrdersService {
    private databaseService;
    constructor(databaseService: DatabaseService);
    onModuleInit(): Promise<void>;
    private addIsReadColumn;
    findAll(): Promise<import("mysql2").QueryResult>;
    getUnreadCount(): Promise<{
        unread_count: any;
    }>;
    markAsRead(): Promise<{
        success: boolean;
        message: string;
    }>;
    findOne(id: number): Promise<any>;
    create(data: any): Promise<{
        success: boolean;
        message: string;
        unavailableProducts: any[];
        orderId?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        orderId: any;
        message: string;
        unavailableProducts?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        unavailableProducts?: undefined;
        orderId?: undefined;
    }>;
    updateStatus(id: number, status: string): Promise<{
        success: boolean;
        message: string;
    }>;
    delete(id: number): Promise<{
        success: boolean;
        message: string;
    }>;
}
