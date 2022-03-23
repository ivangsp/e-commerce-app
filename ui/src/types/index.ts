export interface RootState {
  homePage?: HomePageState;
  shoppingCart?: ShoppingCartState;
  errorDialog: ErrorDialog;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  image?: string | null;
  description?: string | null;
}

export interface ShoppingItem {
  gridId: number;
  product: Product;
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

export type ErrorDialog = {
  open: boolean;
  errorMessage: string | null;
};
