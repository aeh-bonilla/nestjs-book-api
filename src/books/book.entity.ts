
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Author } from '../author/author.entity';
import { Category } from '../category/category.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  isbn: string;

  @Column()
  publicationYear: number;

  @ManyToOne(() => Author, author => author.books)
  author: Author;

  @ManyToOne(() => Category, category => category.books)
  category: Category;

  @Column({ default: true })
  isAvailable: boolean;
}