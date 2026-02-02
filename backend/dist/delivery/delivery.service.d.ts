import { DatabaseService } from '../database/database.service';
export declare class DeliveryService {
    private databaseService;
    constructor(databaseService: DatabaseService);
    onModuleInit(): Promise<void>;
    private createDeliveryTable;
    findAll(): Promise<import("mysql2").QueryResult>;
    findOne(id: number): Promise<any>;
    create(data: any): Promise<{
        success: boolean;
        id: any;
        message: string;
    } | {
        success: boolean;
        message: string;
        id?: undefined;
    }>;
    update(id: number, data: any): Promise<{
        success: boolean;
        message: string;
    }>;
    remove(id: number): Promise<{
        success: boolean;
        message: string;
    }>;
    findByCity(cityName: string): Promise<any>;
}
