import { Controller, Get, Post, Body, Param, Delete, Put, Request,UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category.entity';
import { CategoryDto } from '../dto/category.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiBearerAuth('JWT-auth')
@ApiTags('Category')
@Controller('category')
@UseGuards(JwtAuthGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  //get all category
  @Get()
  async findAll(): Promise<Category[]> {
    return await this.categoryService.findall();
  }

  //get one category
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Category> {
    const category = await this.categoryService.findOne(id);
    if (!category) {
      throw new Error('Category not found');
    } else {
      return category;
    }
  }

  //create category
  @Post()
  @ApiOperation({ summary: 'Create Book\'s category' })
  @ApiBody({
    type: Category,
    description: "The Description for the Post Body. Please look into the DTO. You will see the @ApiOptionalProperty used to define the Schema.",
    examples: {
        a: {
           summary: "New category entry",
           description: "economy is used as a category value",
           value: {name: "economy"} as Category
        }
    }
})
  async create(@Body() category: Category): Promise<Category> {
    return await this.categoryService.create(category);
  }

  //update category
  @Put(':id')
  async update(@Param('id') id: number, @Body() category: Category): Promise<Category> {
    return this.categoryService.update(id, category);
  }

  //delete category
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    //handle the error if category not found
    const category = await this.categoryService.findOne(id);
    if (!category) {
      throw new Error('Category not found');
    }
    return this.categoryService.delete(id);
  }
}