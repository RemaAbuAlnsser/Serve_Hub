import { DatabaseService } from '../database/database.service';
export declare class ProductImagesService {
    private databaseService;
    constructor(databaseService: DatabaseService);
    findByProduct(productId: number): Promise<import("mysql2").QueryResult>;
    create(imageData: any): Promise<{
        success: boolean;
        id: any;
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        id?: undefined;
    }>;
    remove(id: number): Promise<{
        success: boolean;
        message: string;
    }>;
}
