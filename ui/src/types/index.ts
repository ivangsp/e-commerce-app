export interface RootState {
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
  homePage?: HomePageState;
}

export interface Product {
  id: number;
  name: string | null;
  price?: number | null;
  image?: string | null;
  description?: string | null;
}

export interface HomePageState {
  products: Product[];
  loading: boolean;
  error: string;
}
