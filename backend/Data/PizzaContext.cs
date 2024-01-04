using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class PizzaContext : DbContext
    {
        public PizzaContext(DbContextOptions options) : base(options)
        {

        }

    public DbSet<Order> Orders { get; set; }
    public DbSet<PizzaSize> PizzaSizes { get; set; }
    public DbSet<Topping> Toppings { get; set; }
    }
}