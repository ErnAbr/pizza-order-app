using backend.Entities;

namespace backend.DTOs
{
    public class PizzaDataDto
    {
        public List<Topping> Toppings { get; set; }
        public List<PizzaSize> Sizes { get; set; }
    }
}