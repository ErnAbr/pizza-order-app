namespace backend.Entities
{
    public class Topping
    {
        public int Id { get; set; }
        public string ToppingName { get; set; }
        public ICollection<OrderTopping> OrderTopping { get; set; }
    }
}