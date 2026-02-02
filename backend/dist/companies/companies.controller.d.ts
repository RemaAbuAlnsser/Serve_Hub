import type { Cache } from 'cache-manager';
import { CompaniesService } from './companies.service';
export declare class CompaniesController {
    private companiesService;
    private cacheManager;
    constructor(companiesService: CompaniesService, cacheManager: Cache);
    findAll(): Promise<import("mysql2").QueryResult>;
    findOne(id: string): Promise<any>;
    create(companyData: any): Promise<{
        success: boolean;
        id: any;
        message: string;
    }>;
    update(id: string, companyData: any): Promise<{
        success: boolean;
        message: string;
    }>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
