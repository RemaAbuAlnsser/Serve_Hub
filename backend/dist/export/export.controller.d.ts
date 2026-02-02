import type { Response } from 'express';
import { ExportService } from './export.service';
export declare class ExportController {
    private readonly exportService;
    constructor(exportService: ExportService);
    exportAllTables(): Promise<{
        success: boolean;
        data: any;
        message: string;
    }>;
    exportTable(tableName: string): Promise<{
        success: boolean;
        data: any;
        message: string;
    }>;
    getTableStats(): Promise<{
        success: boolean;
        stats: any;
        message: string;
    }>;
    createSQLDump(): Promise<{
        success: boolean;
        filePath?: string;
        message: string;
    }>;
    downloadFile(fileName: string, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    exportAllTablesAsJSON(res: Response): Promise<Response<any, Record<string, any>>>;
    exportTableAsJSON(tableName: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
