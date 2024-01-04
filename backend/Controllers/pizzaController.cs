using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

            var result = new
            {
                Toppings = toppings,
                Sizes = sizes
            };

            return Ok(result);
        }

        [HttpPost("place-order")]
        public async Task<ActionResult> PlaceOrder(PizzaOrderDto orderDto)
        {
            var pizzaSize = await _context.PizzaSizes.FindAsync(orderDto.PizzaSizeId);

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
        public async Task<decimal> ReturnPrice(PriceCalculationDto priceCalculationDto)
        {
            var pizzaSize = await _context.PizzaSizes.FindAsync(priceCalculationDto.PizzaSizeId);
            var calculatedPrice = CalculatePrice(priceCalculationDto.ToppingIds, pizzaSize.SizePrice);
            return await Task.FromResult(calculatedPrice);
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