import {Model, model, property} from '@loopback/repository';
import {Product} from '../product/product.model';

@model({settings: {strict: false}})
export class ShoppingCartLineItem extends Model {
  @property({
    type: 'number',
    required: true,
    generated: true,
  })
  id: number;

  @property({
    type: 'number',
    id: true,
    required: true,
  })
  quantity: number;

  @property({
    type: 'number',
    required: true,
  })
  productId: number;

  @property({
    type: 'number',
    id: true,
    required: true,
  })
  shoppingCartId: number;

  constructor(data?: Partial<ShoppingCartLineItem>) {
    super(data);
  }
}

export interface ShoppingCartLineItemRelations {
  product: Product;
}

export type ShoppingCartLineItemWithRelations = ShoppingCartLineItem &
  ShoppingCartLineItemRelations;
