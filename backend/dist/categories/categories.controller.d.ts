import type { Cache } from 'cache-manager';
import { CategoriesService } from './categories.service';
export declare class CategoriesController {
    private categoriesService;
    private cacheManager;
    constructor(categoriesService: CategoriesService, cacheManager: Cache);
    findAllWithSubcategories(): Promise<any>;
    findAll(): Promise<import("mysql2").QueryResult>;
    findOne(id: string): Promise<any>;
    create(categoryData: any): Promise<{
        success: boolean;
        id: any;
        message: string;
    }>;
    update(id: string, categoryData: any): Promise<{
        success: boolean;
        message: string;
    }>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
