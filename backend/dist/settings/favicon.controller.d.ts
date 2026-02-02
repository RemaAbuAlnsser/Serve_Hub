import type { Response } from 'express';
import { SettingsService } from './settings.service';
export declare class FaviconController {
    private readonly settingsService;
    constructor(settingsService: SettingsService);
    getFavicon(res: Response): Promise<void>;
    getAppleTouchIcon(res: Response): Promise<void>;
}
