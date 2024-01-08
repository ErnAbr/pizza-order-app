using backend.Entities;
using Microsoft.AspNetCore.Mvc;
using Xunit;

namespace backend.Tests.PizzaControllerTests
{
    public class PizzaController_deleteOrderTests : SharedContext
    {
        [Fact]
        public async Task DeleteOrder_Should_Return_NoContent_On_Successful_Delete()
        {
            string userName = "Test Name";
            AddMockOrderToContext(userName);

            var result = await _controller.DeleteOrder(userName, 1);

            Assert.IsType<NoContentResult>(result);
        }

        [Fact]
        public async Task DeleteOrder_Should_Return_NotFound_IfOrderDoesntExsist()
        {
            string userName = "Test Name";

            var result = await _controller.DeleteOrder(userName, -1);

            Assert.IsType<NotFoundObjectResult>(result);
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