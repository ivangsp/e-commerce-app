import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDsDataSource} from '../common/datasources';
import {ProductCategory} from './product-category.model';

export class ProductCategoryRepository extends DefaultCrudRepository<
  ProductCategory,
  typeof ProductCategory.prototype.id,
  {}
> {
  constructor(@inject('datasources.postgresDs') dataSource: PostgresDsDataSource) {
    super(ProductCategory, dataSource);
  }
}
