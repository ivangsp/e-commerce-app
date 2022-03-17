export interface RootState {
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
  homePage?: HomePageState;
  shoppingCart?: ShoppingCartState;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  image?: string | null;
  description?: string | null;
}

export interface ShoppingItem extends Product {
  quantity: number;
}

export interface HomePageState {
  products: Product[];
  loading: boolean;
  error: string;
}

export interface ShoppingCartState {
  shoppingItems: ShoppingItem[];
}
