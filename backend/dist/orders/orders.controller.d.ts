import { OnModuleInit } from '@nestjs/common';
import { OrdersService } from './orders.service';
export declare class OrdersController implements OnModuleInit {
    private ordersService;
    constructor(ordersService: OrdersService);
    onModuleInit(): Promise<void>;
    findAll(): Promise<import("mysql2").QueryResult>;
    getUnreadCount(): Promise<{
        unread_count: any;
    }>;
    markAsRead(): Promise<{
        success: boolean;
        message: string;
    }>;
    findOne(id: string): Promise<any>;
    create(orderData: any): Promise<{
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
    remove(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
    updateStatus(id: string, statusData: {
        status: string;
    }): Promise<{
        success: boolean;
        message: string;
    }>;
}
