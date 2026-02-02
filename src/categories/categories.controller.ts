import { Controller, Get, Post, Put, Delete, Body, Param, UseInterceptors, Inject } from '@nestjs/common';
import { CacheInterceptor, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(
    private categoriesService: CategoriesService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  @Get('with-subcategories')
  @UseInterceptors(CacheInterceptor)
  async findAllWithSubcategories() {
    return this.categoriesService.findAllWithSubcategories();
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  async findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  @UseInterceptors(CacheInterceptor)
  async findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }

  @Post()
  async create(@Body() categoryData: any) {
    const result = await this.categoriesService.create(categoryData);
    await this.cacheManager.reset();
    return result;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() categoryData: any) {
    const result = await this.categoriesService.update(+id, categoryData);
    await this.cacheManager.reset();
    return result;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.categoriesService.remove(+id);
    await this.cacheManager.reset();
    return result;
  }
}
