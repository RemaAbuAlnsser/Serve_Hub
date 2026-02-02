import { SettingsService } from './settings.service';
export declare class SiteInfoController {
    private readonly settingsService;
    constructor(settingsService: SettingsService);
    getSiteInfo(): Promise<{
        success: boolean;
        data: {
            site_name: any;
            site_logo: any;
            site_description: any;
            favicon_url: string | null;
        };
        message?: undefined;
    } | {
        success: boolean;
        message: string;
        data?: undefined;
    }>;
}
