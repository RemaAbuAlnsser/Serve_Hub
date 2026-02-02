import { Controller, Get, Post, Put, Delete, Body, Param, UseInterceptors, Inject } from '@nestjs/common';
import { CacheInterceptor, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CompaniesService } from './companies.service';

@Controller('companies')
export class CompaniesController {
  constructor(
    private companiesService: CompaniesService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  @Get()
  @UseInterceptors(CacheInterceptor)
  async findAll() {
    return this.companiesService.findAll();
  }

  @Get(':id')
  @UseInterceptors(CacheInterceptor)
  async findOne(@Param('id') id: string) {
    return this.companiesService.findOne(+id);
  }

  @Post()
  async create(@Body() companyData: any) {
    const result = await this.companiesService.create(companyData);
    await this.cacheManager.reset();
    return result;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() companyData: any) {
    const result = await this.companiesService.update(+id, companyData);
    await this.cacheManager.reset();
    return result;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.companiesService.remove(+id);
    await this.cacheManager.reset();
    return result;
  }
}
