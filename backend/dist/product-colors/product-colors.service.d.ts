import { DatabaseService } from '../database/database.service';
export declare class ProductColorsService {
    private databaseService;
    constructor(databaseService: DatabaseService);
    findByProduct(productId: number): Promise<import("mysql2").QueryResult>;
    findAllUniqueColors(): Promise<import("mysql2").QueryResult>;
    create(colorData: any): Promise<{
        success: boolean;
        id: any;
        message: string;
    }>;
    update(id: number, colorData: any): Promise<{
        success: boolean;
        message: string;
    }>;
    remove(id: number): Promise<{
        success: boolean;
        message: string;
    }>;
    updateProductTotalStock(productId: number): Promise<void>;
    decreaseStock(productId: number, colorId: number, quantity: number): Promise<{
        success: boolean;
        message: string;
    }>;
}
