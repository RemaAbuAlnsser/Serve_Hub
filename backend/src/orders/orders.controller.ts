import { Controller, Get, Post, Put, Delete, Body, Param, OnModuleInit } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController implements OnModuleInit {
  constructor(private ordersService: OrdersService) {}

  async onModuleInit() {
    await this.ordersService.onModuleInit();
  }

  @Get()
  async findAll() {
    return this.ordersService.findAll();
  }

  @Get('unread/count')
  async getUnreadCount() {
    return this.ordersService.getUnreadCount();
  }

  @Put('mark-read')
  async markAsRead() {
    return this.ordersService.markAsRead();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Post()
  async create(@Body() orderData: any) {
    return this.ordersService.create(orderData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.ordersService.delete(+id);
  }

  @Put(':id/status')
  async updateStatus(@Param('id') id: string, @Body() statusData: { status: string }) {
    return this.ordersService.updateStatus(+id, statusData.status);
  }
}
