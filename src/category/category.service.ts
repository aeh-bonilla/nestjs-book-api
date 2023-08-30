import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  // get all categorys
  async findall(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  // get one category
  async findOne(id: number): Promise<Category> {
    return await this.categoryRepository.findOne({ where : { id } });
  }

  //create category
  async create(book: Category): Promise<Category> {
    const newCategory = this.categoryRepository.create(book);
    return await this.categoryRepository.save(newCategory);
  }

  // update category
  async update(id: number, category: Category): Promise<Category> {
    await this.categoryRepository.update(id, category);
    return await this.categoryRepository.findOne( { where : { id } } );
  }

  // delete category
  async delete(id: number): Promise<void> {
    await this.categoryRepository.delete(id);
  }
}
