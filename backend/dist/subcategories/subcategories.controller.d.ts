import type { Cache } from 'cache-manager';
import { SubcategoriesService } from './subcategories.service';
export declare class SubcategoriesController {
    private subcategoriesService;
    private cacheManager;
    constructor(subcategoriesService: SubcategoriesService, cacheManager: Cache);
    findAll(): Promise<import("mysql2").QueryResult>;
    findByCategory(categoryId: string): Promise<import("mysql2").QueryResult>;
    findOne(id: string): Promise<any>;
    create(subcategoryData: any): Promise<{
        success: boolean;
        id: any;
        message: string;
    }>;
    update(id: string, subcategoryData: any): Promise<{
        success: boolean;
        message: string;
    }>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
