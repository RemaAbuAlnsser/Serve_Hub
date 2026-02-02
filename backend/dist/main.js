"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const path_1 = require("path");
const compression_1 = __importDefault(require("compression"));
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((0, compression_1.default)());
    app.enableCors({
        origin: [
            'http://localhost:3001',
            'http://localhost:3000',
            'http://localhost:3002',
            'http://104.234.26.192:3000',
            'http://104.234.26.192:3001',
            'http://104.234.26.192:3002',
            'http://104.234.26.192',
        ],
        credentials: true,
    });
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'uploads'), {
        prefix: '/uploads/',
    });
    await app.listen(process.env.PORT ?? 3000);
    console.log(`Application is running on: http://localhost:${process.env.PORT ?? 3000}`);
}
bootstrap();
//# sourceMappingURL=main.js.map