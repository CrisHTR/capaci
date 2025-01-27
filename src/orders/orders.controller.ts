import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get('active')
  findAllActive() {
    return this.ordersService.findAllActive();
  }

  @Get('completed')
  findAllCompleted() {
    return this.ordersService.findAllCompleted();
  }

  @Get('active/:id')
  findOneActive(@Param('id') id: number) {
    return this.ordersService.findOneActive(id);
  }

  @Get('completed/:id')
  findOneCompleted(@Param('id') id: number) {
    return this.ordersService.findOneCompleted(id);
  }

  @Patch('complete/:id')
  completeOrder(@Param('id') id: number) {
    return this.ordersService.completeOrder(id);
  }

  @Patch('cancel/:id')
  cancelOrder(@Param('id') id: number) {
    return this.ordersService.cancelOrder(id);
  }
}