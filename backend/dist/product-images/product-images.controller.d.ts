import { ProductImagesService } from './product-images.service';
export declare class ProductImagesController {
    private productImagesService;
    constructor(productImagesService: ProductImagesService);
    findByProduct(productId: string): Promise<import("mysql2").QueryResult>;
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
    remove(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
