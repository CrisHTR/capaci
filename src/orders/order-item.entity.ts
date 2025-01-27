import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ActiveOrder } from './order.entity';
import { CompletedOrder } from './order.entity';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ActiveOrder, activeOrder => activeOrder.items)
  activeOrder: ActiveOrder;

  @ManyToOne(() => CompletedOrder, completedOrder => completedOrder.items)
  completedOrder: CompletedOrder;

  @Column()
  productId: number;

  @Column()
  quantity: number;

  @Column()
  price: number;
}