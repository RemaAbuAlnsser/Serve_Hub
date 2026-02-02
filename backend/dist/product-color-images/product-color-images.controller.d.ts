import { ProductColorImagesService } from './product-color-images.service';
export declare class ProductColorImagesController {
    private productColorImagesService;
    constructor(productColorImagesService: ProductColorImagesService);
    getColorImages(colorId: string): Promise<import("mysql2").QueryResult>;
    create(imageData: any): Promise<{
        success: boolean;
        id: any;
        message: string;
    }>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
