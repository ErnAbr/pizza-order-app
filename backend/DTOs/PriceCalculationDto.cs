namespace backend.DTOs
{
    public class PriceCalculationDto
    {
        public int PizzaSizeId  { get; set; }
        public List<int> ToppingIds { get; set; }
    }
}