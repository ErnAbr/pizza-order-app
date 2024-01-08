using backend.Data;
using backend.DTOs;
using backend.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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

            var result = new PizzaDataDto
            {
                Toppings = toppings,
                Sizes = sizes
            };

            return Ok(result);
        }

        [HttpPost("place-order")]
        public async Task<ActionResult> PlaceOrder(PizzaOrderDto orderDto)
        {
            if (orderDto?.UserName == null || orderDto?.PizzaSizeId == null || orderDto?.ToppingIds == null)
            {
                return BadRequest("Order information is incomplete.");
            }

            var pizzaSize = await _context.PizzaSizes.FindAsync(orderDto.PizzaSizeId);

            if (pizzaSize == null)
            {
                return NotFound($"Pizza with ID {orderDto.PizzaSizeId} not found.");
            }

            var selectedToppings = new List<OrderTopping>();
            
            foreach (var toppingId in orderDto.ToppingIds)
            {
                var topping = await _context.Toppings.FindAsync(toppingId);
                if (topping != null)
                {
                    selectedToppings.Add(new OrderTopping { Topping = topping });
                }
                else
                {
                    return NotFound($"Topping with ID {toppingId} not found.");
                }
            }

            if (selectedToppings.Count > 6)
            {
                return BadRequest("Too Many Toppings Selected");
            }

            decimal totalPrice = CalculatePrice(orderDto.ToppingIds, pizzaSize.SizePrice);

            var order = new Order
            {
                UserName = orderDto.UserName,
                PizzaSize = pizzaSize,
                OrderToppings = selectedToppings,
                TotalPrice = totalPrice
            };

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpGet("get-order-details/{userName}")]
        public async Task<IActionResult> GetOrderDetails(string userName)
        {
            if (userName == null)
            {
                return BadRequest("No Username Provided");
            }

            var orders = await _context.Orders
                                    .Where(order => order.UserName == userName)
                                    .Select(order => new OrderDto
                                    {
                                        Id = order.Id,
                                        UserName = order.UserName,
                                        SizeName = order.PizzaSize.SizeName,
                                        TotalPrice = order.TotalPrice,
                                        Toppings = order.OrderToppings.Select(t => t.Topping.ToppingName).ToList()
                                    })
                                    .ToListAsync();

            if (orders.Count == 0)
            {
                return NotFound("Orders not Found");
            }

            return Ok(orders);  
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

        [HttpPost("calculate-price")]
        public async Task<IActionResult> ReturnPrice(PriceCalculationDto priceCalculationDto)
        {
            if (priceCalculationDto?.ToppingIds == null || priceCalculationDto?.PizzaSizeId == null)
            {
                return BadRequest("No Calculation Data Provided");
            }

            if (priceCalculationDto.PizzaSizeId <= 0 || priceCalculationDto.PizzaSizeId > 3)
            {
                return BadRequest("Pizza Size Does Not Exist.");
            }

            if (priceCalculationDto.ToppingIds != null && priceCalculationDto.ToppingIds.Any(id => id < 1 || id > 8))
            {
                return BadRequest("Topping Does Not Exist");
            }

            if (priceCalculationDto.ToppingIds != null && priceCalculationDto.ToppingIds.Count > 6)
            {
                return BadRequest("Too Many Toppings Selected");
            }

            var pizzaSize = await _context.PizzaSizes.FindAsync(priceCalculationDto.PizzaSizeId);

            var toppings = priceCalculationDto.ToppingIds ?? new List<int>();

            var calculatedPrice = CalculatePrice(toppings, pizzaSize.SizePrice);
            return Ok(calculatedPrice);
        }

        private static decimal CalculatePrice(List<int> toppingIds, int pizzaSize)
        {
            decimal basePrice = pizzaSize; 
           
            decimal toppingPrice = toppingIds.Count * 1m; 
            decimal totalPrice = basePrice + toppingPrice;

            if (toppingIds.Count > 3) 
            {
                totalPrice -= totalPrice / 100 * 10;
            }

            return totalPrice;
        }

    }
}