using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Entities;

namespace backend.Data
{
    public static class DbInitializer
    {
        public static void Initialize(PizzaContext context)
        {
            // Ensure the database is created
            context.Database.EnsureCreated();

            // Check if the Toppings table is empty
            if (!context.Toppings.Any())
            {
                var toppings = new List<Topping>
                {
                    new() { ToppingName = "Pepperoni" },
                    new() { ToppingName = "Mushrooms" },
                    new() { ToppingName = "Onions" },
                    new() { ToppingName = "Sausage" },
                    new() { ToppingName = "Bell Peppers" },
                    new() { ToppingName = "Black Olives" },
                    new() { ToppingName = "Pineapple" },
                    new() { ToppingName = "Bacon" },
                };

                context.Toppings.AddRange(toppings);
            }

            // Check if the PizzaSizes table is empty
            if (!context.PizzaSizes.Any())
            {
                var pizzaSizes = new List<PizzaSize>
                {
                    new() { SizeName= "small", SizePrice = 8 },
                    new() { SizeName= "medium", SizePrice = 10 },
                    new() { SizeName= "large", SizePrice = 12 },
                };

                context.PizzaSizes.AddRange(pizzaSizes);
            }

            // Save changes to the database
            context.SaveChanges();
        }
    }
}