export interface PizzaSize {
  id: number;
  sizeName: string;
  sizePrice: number;
}

export interface PizzaTopping {
  id: number;
  toppingName: string;
}

export interface PizzaData {
  sizes: PizzaSize[];
  toppings: PizzaTopping[];
}
