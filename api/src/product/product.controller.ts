import { Product } from './product.model';
import {ProductRepoistory} from './product.repository';
import {repository} from '@loopback/repository';
import { getModelSchemaRef, post, requestBody } from '@loopback/rest';
import { create } from 'domain';

export class ProductController {
  constructor(
    @repository(ProductRepoistory)
    public productRepository: ProductRepoistory,
  ) {}
  @post('/', {
    responses: {
      '200': {
        description: 'Created product successfully',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Product, {exclude: ['id']}),
          },
        },
      },
    },
  })
  async create(
    @requestBody({
      description: 'Data to create Product instance',
      content: {
        'application/json': {
          schema: getModelSchemaRef(Product),
        },
      },
    })
    
    product: Product,
  ): Promise<Product> {
    return this.productRepository.create(product);
  }
}
