import { ProductColorsService } from './product-colors.service';
export declare class ProductColorsController {
    private readonly productColorsService;
    constructor(productColorsService: ProductColorsService);
    getAvailableColors(): Promise<import("mysql2").QueryResult>;
    getProductColors(productId: string): Promise<import("mysql2").QueryResult>;
    create(colorData: any): Promise<{
        success: boolean;
        id: any;
        message: string;
    }>;
    update(id: string, colorData: any): Promise<{
        success: boolean;
        message: string;
    }>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
    decreaseStock(data: {
        product_id: number;
        color_id: number;
        quantity: number;
    }): Promise<{
        success: boolean;
        message: string;
    }>;
}
