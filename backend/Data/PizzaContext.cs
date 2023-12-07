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
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<OrderTopping>()
                .HasKey(ot => new { ot.OrderId, ot.ToppingId });

            modelBuilder.Entity<OrderTopping>()
                .HasOne(ot => ot.Order)
                .WithMany(o => o.OrderToppings)
                .HasForeignKey(ot => ot.OrderId);

            modelBuilder.Entity<OrderTopping>()
                .HasOne(ot => ot.Topping)
                .WithMany(t => t.OrderToppings)
                .HasForeignKey(ot => ot.ToppingId);
        }
        public DbSet<Order> Orders { get; set; }
        public DbSet<PizzaSize> PizzaSizes { get; set; }
        public DbSet<Topping> Toppings { get; set; }
    }
}