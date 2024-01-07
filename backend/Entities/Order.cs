namespace backend.Entities
{
    public class Order
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public PizzaSize PizzaSize { get; set; }
        public ICollection<OrderTopping> OrderToppings { get; set; }
        public decimal TotalPrice { get; set; }
    }
}