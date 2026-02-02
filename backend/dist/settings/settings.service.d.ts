import { DatabaseService } from '../database/database.service';
export declare class SettingsService {
    private databaseService;
    constructor(databaseService: DatabaseService);
    getSettings(): Promise<any>;
    updateSettings(data: {
        site_logo?: string;
        site_image?: string;
        site_images?: string[];
        current_site_images?: any[];
        site_name?: string;
        site_description?: string;
        contact_email?: string;
        contact_phone?: string;
        address?: string;
        facebook_url?: string;
        instagram_url?: string;
        whatsapp_url?: string;
    }): Promise<{
        success: boolean;
        message: string;
    }>;
}
