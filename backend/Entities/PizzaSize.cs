namespace backend.Entities
{
    public class PizzaSize
    {
        public int Id { get; set; }
        public string SizeName { get; set; }
        public int SizePrice { get; set; }
        public ICollection<Order> Orders { get; set; }
    }
}