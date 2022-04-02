import {Model, model, property} from '@loopback/repository';
import {ShoppingCartLineItemWithRelations} from '../shopping-cart-line-item/shopping-cart-line-item.model';

@model({settings: {strict: false}})
export class ShoppingCart extends Model {
  @property({
    type: 'number',
    required: true,
  })
  id: number;


  constructor(data?: Partial<ShoppingCart>) {
    super(data);
  }
}

export interface ShoppingCartRelations {
  shoppingCartLineItems: ShoppingCartLineItemWithRelations[];
}

export type ShoppingCartItemWithRelations = ShoppingCart &
  ShoppingCartRelations;
