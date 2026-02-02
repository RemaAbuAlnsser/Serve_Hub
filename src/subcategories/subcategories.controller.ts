import { Controller, Get, Post, Put, Delete, Body, Param, UseInterceptors, Inject } from '@nestjs/common';
import { CacheInterceptor, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { SubcategoriesService } from './subcategories.service';

@Controller('subcategories')
export class SubcategoriesController {
  constructor(
    private subcategoriesService: SubcategoriesService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  @Get()
  @UseInterceptors(CacheInterceptor)
  async findAll() {
    return this.subcategoriesService.findAll();
  }

  @Get('category/:categoryId')
  @UseInterceptors(CacheInterceptor)
  async findByCategory(@Param('categoryId') categoryId: string) {
    return this.subcategoriesService.findByCategory(+categoryId);
  }

  @Get(':id')
  @UseInterceptors(CacheInterceptor)
  async findOne(@Param('id') id: string) {
    return this.subcategoriesService.findOne(+id);
  }

  @Post()
  async create(@Body() subcategoryData: any) {
    const result = await this.subcategoriesService.create(subcategoryData);
    await this.cacheManager.reset();
    return result;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() subcategoryData: any) {
    const result = await this.subcategoriesService.update(+id, subcategoryData);
    await this.cacheManager.reset();
    return result;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.subcategoriesService.remove(+id);
    await this.cacheManager.reset();
    return result;
  }
}
