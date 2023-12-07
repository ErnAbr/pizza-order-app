using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Entities
{
    public class Order
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public PizzaSize PizzaSize { get; set; }
        public float TotalPrice { get; set; }
        public ICollection<OrderTopping> OrderToppings { get; set; }
    }
}