import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseInterceptors, Inject } from '@nestjs/common';
import { CacheInterceptor, CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { ProductsService } from './products.service';

@Controller('products')
@UseInterceptors(CacheInterceptor)
export class ProductsController {
  constructor(
    private productsService: ProductsService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  @Get()
  async findAll() {
    return this.productsService.findAll();
  }

  @Get('search')
  async search(
    @Query('q') query: string,
    @Query('category') category: string,
    @Query('min_price') minPrice: string,
    @Query('max_price') maxPrice: string,
    @Query('sort') sort: string,
  ) {
    return this.productsService.search({
      query,
      category,
      minPrice: minPrice ? parseFloat(minPrice) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
      sort: sort || 'relevance',
    });
  }

  @Get('search/suggestions')
  async searchSuggestions(@Query('q') query: string) {
    return this.productsService.getSearchSuggestions(query);
  }

  @Get('search/popular')
  async getPopular() {
    return this.productsService.getPopularSearches();
  }

  @Get('deals')
  async findDeals() {
    return this.productsService.findDeals();
  }

  @Get('category/:categoryId')
  async findByCategory(@Param('categoryId') categoryId: string) {
    return this.productsService.findByCategory(+categoryId);
  }

  @Get('subcategory/:subcategoryId')
  async findBySubcategory(@Param('subcategoryId') subcategoryId: string) {
    return this.productsService.findBySubcategory(+subcategoryId);
  }

  @Get('sku/:sku')
  async findBySku(@Param('sku') sku: string) {
    return this.productsService.findBySku(sku);
  }

  @Get(':id/images')
  async getProductImages(@Param('id') id: string) {
    return this.productsService.getProductImages(+id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Post()
  async create(@Body() productData: any) {
    const result = await this.productsService.create(productData);
    await this.cacheManager.clear();
    return result;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() productData: any) {
    const result = await this.productsService.update(+id, productData);
    await this.cacheManager.clear();
    return result;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.productsService.remove(+id);
    await this.cacheManager.clear();
    return result;
  }
}
