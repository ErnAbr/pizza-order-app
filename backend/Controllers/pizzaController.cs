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
                                    .Include(order => order.PizzaSize) // Include PizzaSize
                                    .Include(order => order.Toppings)  // Include Toppings
                                    .ToListAsync();

            if (orders == null || orders.Count == 0)
            {
                return NotFound("No orders found for the specified user.");
            }

            return Ok(orders);
        }

        [HttpPost("place-order")]
        public async Task<ActionResult<Order>> PlaceOrder(PizzaOrderDto orderDto)
{
            var pizzaSize = await _context.PizzaSizes.FirstOrDefaultAsync(ps => ps.SizePrice == orderDto.PizzaPrice);
            var toppings = new List<Topping>();
            foreach (var id in orderDto.ToppingIds)
            {
                var topping = await _context.Toppings.FindAsync(id);
                if (topping != null)
                {
                    toppings.Add(topping);
                }
            }

            float totalPrice = CalculatePrice(toppings.Count, pizzaSize.SizePrice);

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

     [HttpPost("calculate-price")]
        public async Task<float> ReturnPrice(PriceCalculationDto priceCalculationDto)
        {
            var calculatedPrice = CalculatePrice(priceCalculationDto.ToppingIds.Count, priceCalculationDto.PizzaPrice);
            return await Task.FromResult(calculatedPrice);
        }

        private static float CalculatePrice(int toppingsCount, int pizzaSize)
        {
            float basePrice = pizzaSize; 
            float toppingPrice = toppingsCount * 1f; 
            float totalPrice = basePrice + toppingPrice;
              if (toppingsCount > 3) 
            {
                totalPrice -= totalPrice / 100 * 10;
            }

            return totalPrice;
        }
    }
}