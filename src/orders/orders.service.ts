import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActiveOrder } from './order.entity';
import { CompletedOrder } from './order.entity';
import { OrderItem } from './order-item.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { User } from '../users/user.entity';
import { Product } from '../products/product.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(ActiveOrder)
    private activeOrdersRepository: Repository<ActiveOrder>,
    @InjectRepository(CompletedOrder)
    private completedOrdersRepository: Repository<CompletedOrder>,
    @InjectRepository(OrderItem)
    private orderItemsRepository: Repository<OrderItem>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<ActiveOrder> {
    const user = await this.usersRepository.findOneBy({ id: createOrderDto.userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const items = [];
    let total = 0;

    for (const item of createOrderDto.items) {
      const product = await this.productsRepository.findOneBy({ id: item.productId });
      if (!product) {
        throw new NotFoundException('Product not found');
      }
      if (product.stock < item.quantity) {
        throw new BadRequestException('Insufficient stock for product: ' + product.name);
      }
      product.stock -= item.quantity;
      await this.productsRepository.save(product);

      const orderItem = new OrderItem();
      orderItem.productId = product.id;
      orderItem.quantity = item.quantity;
      orderItem.price = product.price * item.quantity;
      items.push(orderItem);
      total += orderItem.price;
    }

    const order = new ActiveOrder();
    order.user = user;
    order.items = items;
    order.total = total;

    return this.activeOrdersRepository.save(order);
  }

  async completeOrder(id: number): Promise<void> {
    const activeOrder = await this.activeOrdersRepository.findOneBy({ id });
    if (!activeOrder) {
      throw new NotFoundException('Order not found');
    }

    const completedOrder = this.completedOrdersRepository.create({
      ...activeOrder,
      status: 'completed',
      completedAt: new Date(),
    });
    await this.completedOrdersRepository.save(completedOrder);
    await this.activeOrdersRepository.remove(activeOrder);
  }

  async cancelOrder(id: number): Promise<void> {
    const activeOrder = await this.activeOrdersRepository.findOneBy({ id });
    if (!activeOrder) {
      throw new NotFoundException('Order not found');
    }

    const completedOrder = this.completedOrdersRepository.create({
      ...activeOrder,
      status: 'cancelled',
      completedAt: new Date(),
    });
    await this.completedOrdersRepository.save(completedOrder);
    await this.activeOrdersRepository.remove(activeOrder);
  }

  async findAllActive(): Promise<ActiveOrder[]> {
    return this.activeOrdersRepository.find({ relations: ['user', 'items', 'items.product'] });
  }

  async findAllCompleted(): Promise<CompletedOrder[]> {
    return this.completedOrdersRepository.find({ relations: ['user', 'items', 'items.product'] });
  }

  async findOneActive(id: number): Promise<ActiveOrder> {
    const order = await this.activeOrdersRepository.findOneBy({ id });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  async findOneCompleted(id: number): Promise<CompletedOrder> {
    const order = await this.completedOrdersRepository.findOneBy({ id });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }
}