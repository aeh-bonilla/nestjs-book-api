import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './author.entity';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private authorRepository: Repository<Author>,
  ) {}

  // get all authors
  async findall(): Promise<Author[]> {
    return await this.authorRepository.find();
  }

  // get one author
  async findOne(id: number): Promise<Author> {
    return await this.authorRepository.findOne({ where : { id } });
  }

  //create author
  async create(author: Author): Promise<Author> {
    const newAuthor = this.authorRepository.create(author);
    return await this.authorRepository.save(newAuthor);
  }

  // update author
  async update(id: number, author: Author): Promise<Author> {
    await this.authorRepository.update(id, author);
    return await this.authorRepository.findOne( { where : { id } } );
  }

  // delete author
  async delete(id: number): Promise<void> {
    await this.authorRepository.delete(id);
  }
}
