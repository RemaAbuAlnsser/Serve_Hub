import type { Cache } from 'cache-manager';
import { SettingsService } from './settings.service';
export declare class SettingsController {
    private readonly settingsService;
    private cacheManager;
    constructor(settingsService: SettingsService, cacheManager: Cache);
    getSettings(): Promise<any>;
    updateSettings(data: {
        site_logo?: string;
        site_image?: string;
        site_images?: string[];
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
