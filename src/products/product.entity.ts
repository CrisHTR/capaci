import { Entity, Column, PrimaryGeneratedColumn, ManyToOne ,Unique} from 'typeorm';
import { Category } from '../categories/category.entity';

@Entity()
@Unique(['name'])
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @Column()
  stock: number;

  @ManyToOne(() => Category, category => category.products)
  category: Category;
}
