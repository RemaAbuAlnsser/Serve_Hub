import type { Cache } from 'cache-manager';
import { ProductsService } from './products.service';
export declare class ProductsController {
    private productsService;
    private cacheManager;
    constructor(productsService: ProductsService, cacheManager: Cache);
    findAll(): Promise<import("mysql2").QueryResult>;
    search(query: string, category: string, minPrice: string, maxPrice: string, sort: string): Promise<{
        products: any;
        total: number;
    }>;
    searchSuggestions(query: string): Promise<{
        suggestions: any[];
    }>;
    getPopular(): Promise<{
        popular_categories: {
            name: any;
            handle: any;
        }[];
    }>;
    findDeals(): Promise<import("mysql2").QueryResult>;
    findByCategory(categoryId: string): Promise<import("mysql2").QueryResult>;
    findBySubcategory(subcategoryId: string): Promise<import("mysql2").QueryResult>;
    findBySku(sku: string): Promise<any>;
    getProductImages(id: string): Promise<import("mysql2").QueryResult>;
    findOne(id: string): Promise<any>;
    create(productData: any): Promise<{
        success: boolean;
        message: string;
        id?: undefined;
    } | {
        success: boolean;
        id: any;
        message: string;
    }>;
    update(id: string, productData: any): Promise<{
        success: boolean;
        message: string;
    }>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
