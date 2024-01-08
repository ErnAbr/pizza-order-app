using backend.DTOs;
using backend.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace backend.Tests.PizzaControllerTests
{
    public class PizzaController_getOrderDetailsTests : SharedContext
    {
        [Fact]
        public async Task GetOrderDetails_Should_Return_BadRequest_Without_Username()
        {
            string? userName = null;

            var result = await _controller.GetOrderDetails(userName);

            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async Task GetOrderDetails_Should_Return_NotFound_IfUsername_NotFound()
        {
            string userName = "Test Name";

            var result = await _controller.GetOrderDetails(userName);

            Assert.IsType<NotFoundObjectResult>(result);
        }

        [Fact]
        public async Task GetOrderDetails_Should_Return_Ok_For_Valid_Username()
        {
            string userName = "Test";
            AddMockOrderToContext(userName);

            var result = await _controller.GetOrderDetails(userName);

            Assert.IsType<OkObjectResult>(result);
        }

        private void AddMockOrderToContext(string userName)
        {

            var pizzaSize = _context.PizzaSizes.Find(3);

            var order = new Order
            {
                UserName = userName,
                PizzaSize = pizzaSize,
                OrderToppings = new List<OrderTopping>
                {
                    new() { ToppingId = 1 },
                    new() { ToppingId = 1 },
                    new() { ToppingId = 1 }
                },
                TotalPrice = 15
            };

            _context.Orders.Add(order);
            _context.SaveChanges();
        }
    }
}