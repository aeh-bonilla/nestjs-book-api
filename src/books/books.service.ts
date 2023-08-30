import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {}

  // get all users
  async findall(): Promise<Book[]> {
    return await this.booksRepository.find();
  }

  // get one user
  async findOne(id: number): Promise<Book> {
    return await this.booksRepository.findOne({ where : { id } });
  }

  //create user
  async create(book: Book): Promise<Book> {
    const newBook = this.booksRepository.create(book);
    return await this.booksRepository.save(newBook);
  }

  // update book
  async update(id: number, book: Book): Promise<Book> {
    await this.booksRepository.update(id, book);
    return await this.booksRepository.findOne( { where : { id } } );
  }

  // delete user
  async delete(id: number): Promise<void> {
    await this.booksRepository.delete(id);
  }
}
