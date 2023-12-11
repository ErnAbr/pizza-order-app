using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Entities
{
    public class OrderTopping
    {
        public int OrderId { get; set; }
        public int ToppingId { get; set; }
        public int Quantity { get; set; } 

        public Order Order { get; set; }
        public Topping Topping { get; set; }
    }
}