import {describe, expect, test} from '@jest/globals';
import { Test } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

//generate unit test for create method in category controller
describe('CategoryController', () => {
  let categoryController: CategoryController;
  let categoryService: CategoryService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [CategoryService],
    }).compile();

    categoryService = moduleRef.get<CategoryService>(CategoryService);
    categoryController = moduleRef.get<CategoryController>(CategoryController);
  });

  describe('create', () => {
    it('should create a category', async () => {
      const category = {id: 1, name: 'literatura', books: []};
      jest.spyOn(categoryService, 'create').mockImplementation(async () => category);

      expect(await categoryController.create(category)).toBe(category);
    });
  });
});
