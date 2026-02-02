import { DatabaseService } from '../database/database.service';
export declare class SubcategoriesService {
    private databaseService;
    constructor(databaseService: DatabaseService);
    findAll(): Promise<import("mysql2").QueryResult>;
    findByCategory(categoryId: number): Promise<import("mysql2").QueryResult>;
    findOne(id: number): Promise<any>;
    create(data: any): Promise<{
        success: boolean;
        id: any;
        message: string;
    }>;
    update(id: number, data: any): Promise<{
        success: boolean;
        message: string;
    }>;
    remove(id: number): Promise<{
        success: boolean;
        message: string;
    }>;
}
