using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.DTOs
{
    public class OrderDto
    {
    public int Id { get; set; }
    public string UserName { get; set; }
    public PizzaSizeDto PizzaSize { get; set; }
    public float TotalPrice { get; set; }
    public List<ToppingDto> Toppings { get; set; }
    }
}