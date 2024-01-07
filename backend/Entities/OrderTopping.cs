namespace backend.Entities
{
    public class OrderTopping
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public Order Order { get; set; }
        public int ToppingId { get; set; }
        public Topping Topping { get; set; }
    }
}