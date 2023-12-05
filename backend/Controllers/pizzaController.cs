using Microsoft.AspNetCore.Mvc;
using backend.Data;
using backend.Entities;
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
    }
}