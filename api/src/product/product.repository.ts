import {PostgresDsDataSource} from './../common/datasources/postgres.datasource';
import {ProductRelations, Product} from './product.model';
import {DefaultCrudRepository} from '@loopback/repository';
import {inject} from '@loopback/core';

export class ProductRepoistory extends DefaultCrudRepository<Product, typeof Product.prototype.id, ProductRelations> {
  constructor(
    @inject('datasources.postgresDs')
    dataSource: PostgresDsDataSource,
  ) {
    super(Product, dataSource);
  }
}
