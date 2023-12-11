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

        [HttpGet("get-order-details/{userName}")]
        public async Task<IActionResult> GetOrderDetails(string userName)
        {
            var orders = await _context.Orders
                                        .Where(order => order.UserName == userName)
                                        .Include(order => order.PizzaSize)
                                        .Include(order => order.OrderToppings)
                                            .ThenInclude(ot => ot.Topping)
                                        .ToListAsync();

            var orderDtos = orders.Select(o => new OrderDto
            {
                Id = o.Id,
                UserName = o.UserName,
                PizzaSize = new PizzaSizeDto
                {
                    SizeName = o.PizzaSize.SizeName,
                },
                TotalPrice = o.TotalPrice,
                Toppings = o.OrderToppings
                            .SelectMany(ot => Enumerable.Repeat(new ToppingDto
                            {
                                Id = ot.Topping.Id,
                                ToppingName = ot.Topping.ToppingName
                            }, ot.Quantity))
                            .ToList()
            }).ToList();

            return Ok(orderDtos);
        }

        [HttpPost("place-order")]
        public async Task<ActionResult<Order>> PlaceOrder(PizzaOrderDto orderDto)
        {
            var pizzaSize = await _context.PizzaSizes.FirstOrDefaultAsync(ps => ps.SizePrice == orderDto.PizzaPrice);

            var order = new Order
            {
                UserName = orderDto.UserName,
                PizzaSize = pizzaSize,
                OrderToppings = new List<OrderTopping>(),
            };

            
            var allToppingIds = new List<int>();

            foreach (var toppingId in orderDto.ToppingIds.Distinct())
            {
                var toppingCount = orderDto.ToppingIds.Count(id => id == toppingId);
                var topping = await _context.Toppings.FindAsync(toppingId);
                if (topping != null)
                {
                    order.OrderToppings.Add(new OrderTopping { ToppingId = toppingId, Order = order, Quantity = toppingCount });
                    
                    allToppingIds.AddRange(Enumerable.Repeat(toppingId, toppingCount));
                }
            }

            float totalPrice = CalculatePrice(allToppingIds, pizzaSize.SizePrice);
            order.TotalPrice = totalPrice;

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPost("calculate-price")]
        public async Task<float> ReturnPrice(PriceCalculationDto priceCalculationDto)
        {
            var calculatedPrice = CalculatePrice(priceCalculationDto.ToppingIds, priceCalculationDto.PizzaPrice);
            return await Task.FromResult(calculatedPrice);
        }

        [HttpDelete("delete-order")]
        public async Task<IActionResult> DeleteOrder([FromQuery] string userName, int id)
        {
            var order = await _context.Orders.FirstOrDefaultAsync(o => o.UserName == userName && o.Id == id);

            if (order == null)
            {
            return NotFound();
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private static float CalculatePrice(List<int> toppingIds, int pizzaSize)
        {
            float basePrice = pizzaSize; 
           
            float toppingPrice = toppingIds.Count * 1f; 
            float totalPrice = basePrice + toppingPrice;

            if (toppingIds.Count > 3) 
            {
                totalPrice -= totalPrice / 100 * 10;
            }

            return totalPrice;
        }
    }
}