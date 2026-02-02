import { OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as mysql from 'mysql2/promise';
export declare class DatabaseService implements OnModuleInit {
    private configService;
    private connection;
    constructor(configService: ConfigService);
    onModuleInit(): Promise<void>;
    connect(): Promise<void>;
    getConnection(): mysql.Connection;
    query(sql: string, params?: any[]): Promise<mysql.QueryResult>;
}
