import { Controller, Patch, Param } from '@nestjs/common';
import { Orders1Service } from './order.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: Orders1Service) {}

  @Patch('complete/:id')
  completeOrder(@Param('id') id: number) {
    return this.ordersService.completeOrder(id);
  }
}