import { Controller, Get, Post, Body, Param, Delete, Put, Request, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './book.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiBearerAuth('JWT-auth')
@ApiTags('Books')
@Controller('books')
@UseGuards(JwtAuthGuard)
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  //get all books
  @Get()
  async findAll(): Promise<Book[]> {
    return await this.booksService.findall();
  }

  //get one book
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Book> {
    const book = await this.booksService.findOne(id);
    if (!book) {
      throw new Error('Book not found');
    } else {
      return book;
    }
  }

  //create book
  @Post()
  async create(@Body() book: Book): Promise<Book> {
    return await this.booksService.create(book);
  }

  //update book
  @Put(':id')
  async update(@Param('id') id: number, @Body() book: Book): Promise<Book> {
    return this.booksService.update(id, book);
  }

  //delete book
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    //handle the error if book not found
    const book = await this.booksService.findOne(id);
    if (!book) {
      throw new Error('Book not found');
    }
    return this.booksService.delete(id);
  }
}