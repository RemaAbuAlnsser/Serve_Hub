import { OnModuleInit } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
export declare class DeliveryController implements OnModuleInit {
    private deliveryService;
    constructor(deliveryService: DeliveryService);
    onModuleInit(): Promise<void>;
    findAll(): Promise<import("mysql2").QueryResult>;
    findOne(id: string): Promise<any>;
    findByCity(cityName: string): Promise<any>;
    create(deliveryData: any): Promise<{
        success: boolean;
        id: any;
        message: string;
    } | {
        success: boolean;
        message: string;
        id?: undefined;
    }>;
    update(id: string, deliveryData: any): Promise<{
        success: boolean;
        message: string;
    }>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
