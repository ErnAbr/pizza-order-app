namespace backend.DTOs
{
    public class OrderDto
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string SizeName { get; set; }
        public decimal TotalPrice { get; set; }
        public List<string> Toppings { get; set; }
    }
}