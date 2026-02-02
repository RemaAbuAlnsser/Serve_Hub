import { Controller, Get, Post, Put, Delete, Body, Param, OnModuleInit } from '@nestjs/common';
import { DeliveryService } from './delivery.service';

@Controller('delivery')
export class DeliveryController implements OnModuleInit {
  constructor(private deliveryService: DeliveryService) {}

  async onModuleInit() {
    await this.deliveryService.onModuleInit();
  }

  @Get()
  async findAll() {
    return this.deliveryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.deliveryService.findOne(+id);
  }

  @Get('city/:cityName')
  async findByCity(@Param('cityName') cityName: string) {
    return this.deliveryService.findByCity(cityName);
  }

  @Post()
  async create(@Body() deliveryData: any) {
    return this.deliveryService.create(deliveryData);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() deliveryData: any) {
    return this.deliveryService.update(+id, deliveryData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.deliveryService.remove(+id);
  }
}
