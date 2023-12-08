export interface MyOrder {
  id: number;
  userName: string;
  pizzaSize: PizzaSize;
  totalPrice: number;
  toppings: Topping[];
}

export interface Topping {
  id: number;
  toppingName: string;
}

export interface PizzaSize {
  id: number;
  sizeName: string;
  sizePrice: number;
}
