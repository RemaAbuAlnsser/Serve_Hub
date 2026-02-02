import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseInterceptors, Inject } from '@nestjs/common';
import { CacheInterceptor, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(
    private productsService: ProductsService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  @Get()
  @UseInterceptors(CacheInterceptor)
  async findAll() {
    return this.productsService.findAll();
  }

  @Get('search')
  @UseInterceptors(CacheInterceptor)
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
  @UseInterceptors(CacheInterceptor)
  async searchSuggestions(@Query('q') query: string) {
    return this.productsService.getSearchSuggestions(query);
  }

  @Get('search/popular')
  @UseInterceptors(CacheInterceptor)
  async getPopular() {
    return this.productsService.getPopularSearches();
  }

  @Get('deals')
  @UseInterceptors(CacheInterceptor)
  async findDeals() {
    return this.productsService.findDeals();
  }

  @Get('category/:categoryId')
  @UseInterceptors(CacheInterceptor)
  async findByCategory(@Param('categoryId') categoryId: string) {
    return this.productsService.findByCategory(+categoryId);
  }

  @Get('subcategory/:subcategoryId')
  @UseInterceptors(CacheInterceptor)
  async findBySubcategory(@Param('subcategoryId') subcategoryId: string) {
    return this.productsService.findBySubcategory(+subcategoryId);
  }

  @Get('sku/:sku')
  @UseInterceptors(CacheInterceptor)
  async findBySku(@Param('sku') sku: string) {
    return this.productsService.findBySku(sku);
  }

  @Get(':id/images')
  @UseInterceptors(CacheInterceptor)
  async getProductImages(@Param('id') id: string) {
    return this.productsService.getProductImages(+id);
  }

  @Get(':id')
  @UseInterceptors(CacheInterceptor)
  async findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Post()
  async create(@Body() productData: any) {
    const result = await this.productsService.create(productData);
    await this.cacheManager.reset();
    return result;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() productData: any) {
    const result = await this.productsService.update(+id, productData);
    await this.cacheManager.reset();
    return result;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.productsService.remove(+id);
    await this.cacheManager.reset();
    return result;
  }
}
