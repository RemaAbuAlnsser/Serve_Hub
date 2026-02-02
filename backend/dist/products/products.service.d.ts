import { DatabaseService } from '../database/database.service';
export declare class ProductsService {
    private databaseService;
    constructor(databaseService: DatabaseService);
    findAll(): Promise<import("mysql2").QueryResult>;
    findByCategory(categoryId: number): Promise<import("mysql2").QueryResult>;
    findBySubcategory(subcategoryId: number): Promise<import("mysql2").QueryResult>;
    findDeals(): Promise<import("mysql2").QueryResult>;
    findOne(id: number): Promise<any>;
    findBySku(sku: string): Promise<any>;
    create(productData: any): Promise<{
        success: boolean;
        message: string;
        id?: undefined;
    } | {
        success: boolean;
        id: any;
        message: string;
    }>;
    update(id: number, productData: any): Promise<{
        success: boolean;
        message: string;
    }>;
    remove(id: number): Promise<{
        success: boolean;
        message: string;
    }>;
    getProductImages(productId: number): Promise<import("mysql2").QueryResult>;
    search(params: {
        query?: string;
        category?: string;
        minPrice?: number;
        maxPrice?: number;
        sort?: string;
    }): Promise<{
        products: any;
        total: number;
    }>;
    getSearchSuggestions(query: string): Promise<{
        suggestions: any[];
    }>;
    getPopularSearches(): Promise<{
        popular_categories: {
            name: any;
            handle: any;
        }[];
    }>;
}
