import {Filter, FilterExcludingWhere, repository} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
  api,
} from '@loopback/rest';
import {ProductCategory} from './product-category.model';
import {ProductCategoryRepository} from './product-category.repository';

@api({basePath: '/product-categories'})
export class ProductCategoryController {
  constructor(
    @repository(ProductCategoryRepository)
    public productCategoryRepository: ProductCategoryRepository,
  ) {}

  @post('/')
  @response(200, {
    description: 'ProductCategory category created successfully',
    content: {
      'application/json': {schema: getModelSchemaRef(ProductCategory)},
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductCategory, {
            title: 'New Product Category',
            exclude: ['id'],
          }),
        },
      },
    })
    productCategory: Omit<ProductCategory, 'id'>,
  ): Promise<ProductCategory> {
    return this.productCategoryRepository.create(productCategory);
  }

  @get('/')
  @response(200, {
    description: 'Array of ProductCategory model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ProductCategory, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ProductCategory) filter?: Filter<ProductCategory>,
  ): Promise<ProductCategory[]> {
    return this.productCategoryRepository.find(filter);
  }

  @get('/{id}')
  @response(200, {
    description: 'ProductCategory model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ProductCategory, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ProductCategory, {exclude: 'where'})
    filter?: FilterExcludingWhere<ProductCategory>,
  ): Promise<ProductCategory> {
    return this.productCategoryRepository.findById(id, filter);
  }

  @patch('/{id}')
  @response(204, {
    description: 'ProductCategory PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductCategory, {partial: true}),
        },
      },
    })
    ProductCategory: ProductCategory,
  ): Promise<void> {
    await this.productCategoryRepository.updateById(id, ProductCategory);
  }

  @del('/{id}')
  @response(204, {
    description: 'ProductCategory DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.productCategoryRepository.deleteById(id);
  }
}
