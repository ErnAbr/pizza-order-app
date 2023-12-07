using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.DTOs
{
    public class PizzaOrderDto
    {
        public string UserName { get; set; }
        public int PizzaPrice { get; set; }
        public List<int> ToppingIds { get; set; }
    }
}