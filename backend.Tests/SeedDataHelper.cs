using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Entities;

namespace backend.Tests
{
    public class SeedDataHelper
    {
        public static void SeedDatabase(PizzaContext context)
        {
            context.Toppings.AddRange(
                new List<Topping>
                {
                    new() { ToppingName = "Pepperoni" },
                    new() { ToppingName = "Mushrooms" },
                    new() { ToppingName = "Onions" },
                    new() { ToppingName = "Sausage" },
                    new() { ToppingName = "Bell Peppers" },
                    new() { ToppingName = "Black Olives" },
                    new() { ToppingName = "Pineapple" },
                    new() { ToppingName = "Bacon" },
                }
            );
            context.PizzaSizes.AddRange(
                    new List<PizzaSize>
                {
                    new() { SizeName= "small", SizePrice = 8 },
                    new() { SizeName= "medium", SizePrice = 10 },
                    new() { SizeName= "large", SizePrice = 12 },
                }
            );
            context.SaveChanges();
        }
    }
}