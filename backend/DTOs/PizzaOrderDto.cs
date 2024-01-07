namespace backend.DTOs
{
    public class PizzaOrderDto
    {
        public string UserName { get; set; }
        public int PizzaSizeId  { get; set; }
        public List<int> ToppingIds { get; set; }
    }
}