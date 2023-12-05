using Microsoft.AspNetCore.Mvc;
using backend.Data;
using backend.Entities;
using Microsoft.EntityFrameworkCore;
using backend.DTOs;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PizzaController : ControllerBase
    {
        private readonly PizzaContext _context;

        public PizzaController(PizzaContext context)
        {
            _context = context;
        }

        [HttpGet("pizza-data")]
        public async Task<IActionResult> GetPizzaData()
        {
            var toppings = await _context.Toppings.ToListAsync();
            var sizes = await _context.PizzaSizes.ToListAsync();

            var result = new
            {
                Toppings = toppings,
                Sizes = sizes
            };

            return Ok(result);
        }

        [HttpPost("place-order")]
        public async Task<ActionResult<Order>> PlaceOrder(PizzaOrderDto orderDto)
        {
             if (orderDto.ToppingIds.Count > 6)
            {
                return BadRequest("Incorrect topping amount");
            }

            var pizzaSize = await _context.PizzaSizes.FindAsync(orderDto.PizzaSizeId);
            if (pizzaSize == null)
            {
                return NotFound("Pizza size not found.");
            }

            var toppings = new List<Topping>();
            foreach (var id in orderDto.ToppingIds)
            {
                var topping = await _context.Toppings.FindAsync(id);
                if (topping != null)
                {
                    toppings.Add(topping);
                }
            }

            float basePrice = pizzaSize.SizePrice; 
            float toppingPrice = toppings.Count * 1f; 
            float totalPrice = basePrice + toppingPrice;
              if (toppings.Count > 3) 
            {
                totalPrice -= totalPrice / 100 * 10;
            }

            var order = new Order
            {
                UserName = orderDto.UserName,
                PizzaSize = pizzaSize,
                Toppings = toppings,
                TotalPrice = totalPrice
            };

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return Ok(order);
        }
    }
}