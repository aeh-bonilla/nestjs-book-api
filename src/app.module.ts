import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { AuthorModule } from './author/author.module';
import { CategoryModule } from './category/category.module';
import { AuthModule} from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    BooksModule,
    AuthorModule,
    CategoryModule,
    UsersModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "127.0.0.1",
      port: 3306,
      username: "usr_dev",
      password: "9T_YFpHh?R9M",
      database: "books_db",
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
