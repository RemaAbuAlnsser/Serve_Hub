import { DatabaseService } from '../database/database.service';
export declare class ProductColorImagesService {
    private databaseService;
    constructor(databaseService: DatabaseService);
    getColorImages(colorId: number): Promise<import("mysql2").QueryResult>;
    create(imageData: any): Promise<{
        success: boolean;
        id: any;
        message: string;
    }>;
    remove(id: number): Promise<{
        success: boolean;
        message: string;
    }>;
}
