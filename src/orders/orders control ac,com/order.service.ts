import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActiveOrder } from '../order.entity';
import { CompletedOrder } from '../order.entity';

@Injectable()
export class Orders1Service {
  constructor(
    @InjectRepository(ActiveOrder)
    private activeOrdersRepository: Repository<ActiveOrder>,
    @InjectRepository(CompletedOrder)
    private completedOrdersRepository: Repository<CompletedOrder>,
  ) {}

  async completeOrder(id: number): Promise<void> {
    const activeOrder = await this.activeOrdersRepository.findOne({ where: { id }, relations: ['items'] });
    if (!activeOrder) {
      throw new NotFoundException('Order not found');
    }

    const completedOrder = this.completedOrdersRepository.create({
      user: activeOrder.user,
      items: activeOrder.items,
      total: activeOrder.total,
      status: 'completed',
      completedAt: new Date(),
    });

    await this.completedOrdersRepository.save(completedOrder);
    await this.activeOrdersRepository.remove(activeOrder);
  }
}