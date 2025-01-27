import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';
import { OrderItem } from './order-item.entity';

@Entity()
export class ActiveOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.activeOrders)
  user: User;

  @OneToMany(() => OrderItem, orderItem => orderItem.activeOrder, { cascade: true })
  items: OrderItem[];

  @Column()
  total: number;

  @Column({ default: 'active' })
  status: string;
}
@Entity()
export class CompletedOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.completedOrders)
  user: User;

  @OneToMany(() => OrderItem, orderItem => orderItem.completedOrder, { cascade: true })
  items: OrderItem[];

  @Column()
  total: number;

  @Column()
  status: string;

  @Column()
  completedAt: Date;
}