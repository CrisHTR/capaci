import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Unique } from 'typeorm';
import { ActiveOrder } from 'src/orders/order.entity';
import { CompletedOrder } from 'src/orders/order.entity';

@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @OneToMany(() => ActiveOrder, activeOrder => activeOrder.user)
  activeOrders: ActiveOrder[];

  @OneToMany(() => CompletedOrder, completedOrder => completedOrder.user)
  completedOrders: CompletedOrder[];
}