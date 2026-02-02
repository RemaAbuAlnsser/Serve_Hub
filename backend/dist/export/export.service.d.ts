import { DatabaseService } from '../database/database.service';
export declare class ExportService {
    private readonly databaseService;
    constructor(databaseService: DatabaseService);
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
    createSQLDump(): Promise<{
        success: boolean;
        filePath?: string;
        message: string;
    }>;
    getTableStats(): Promise<{
        success: boolean;
        stats: any;
        message: string;
    }>;
}
