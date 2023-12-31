import { Controller, Get, Post, Body, Param, Delete, Put, Request, UseGuards } from '@nestjs/common';
import { AuthorService } from './author.service';
import { Author } from './author.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiBearerAuth('JWT-auth')
@ApiTags('Author')
@Controller('author')
@UseGuards(JwtAuthGuard)
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  //get all author
  @Get()
  async findAll(): Promise<Author[]> {
    return await this.authorService.findall();
  }

  //get one author
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Author> {
    const author = await this.authorService.findOne(id);
    if (!author) {
      throw new Error('Author not found');
    } else {
      return author;
    }
  }

  //create author  
  @Post()
  @ApiOperation({ summary: 'Create Book\'s author' })
  async create(@Body() author: Author): Promise<Author> {
    return await this.authorService.create(author);
  }

  //update author
  @Put(':id')
  async update(@Param('id') id: number, @Body() author: Author): Promise<Author> {
    return this.authorService.update(id, author);
  }

  //delete author
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    //handle the error if author not found
    const author = await this.authorService.findOne(id);
    if (!author) {
      throw new Error('Author not found');
    }
    return this.authorService.delete(id);
  }
}


