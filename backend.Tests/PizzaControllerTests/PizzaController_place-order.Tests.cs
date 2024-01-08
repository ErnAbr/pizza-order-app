using backend.DTOs;
using Microsoft.AspNetCore.Mvc;
using Xunit;

namespace backend.Tests.PizzaControllerTests 
{
    public class PizzaController_placeOrderTests : SharedContext
    { 
        [Fact]
        public async Task PlaceOrder_Should_Return_Ok_If_Valid_Data()
        {
            var orderDto = new PizzaOrderDto
            {
                UserName = "Test",
                PizzaSizeId = 2,
                ToppingIds = new List<int> { 1, 1, 1 },
            };

            var result = await _controller.PlaceOrder(orderDto);

            Assert.IsType<OkResult>(result);
        }

        [Fact]
        public async Task PlaceOrder_Should_Return_NotFound_If_Invalid_PizzaSizeId()
        {
            var orderDto = new PizzaOrderDto
            {
                UserName = "Test",
                PizzaSizeId = 4,
                ToppingIds = new List<int> { 1, 1, 1 },
            };

            var result = await _controller.PlaceOrder(orderDto);

            Assert.IsType<NotFoundObjectResult>(result);
        }

        [Fact]
        public async Task PlaceOrder_Should_Return_NotFound_If_Invalid_ToppingId()
        {
            var orderDto = new PizzaOrderDto
            {
                UserName = "Test",
                PizzaSizeId = 3,
                ToppingIds = new List<int> { 1, 1, 9 },
            };

            var result = await _controller.PlaceOrder(orderDto);

            Assert.IsType<NotFoundObjectResult>(result);
        }

        [Fact]
        public async Task PlaceOrder_Should_Return_BadRequest_If_MoreThanSix_Toppings()
        {
            var orderDto = new PizzaOrderDto
            {
                UserName = "Test",
                PizzaSizeId = 3,
                ToppingIds = new List<int> { 1, 1, 1, 1, 1, 1, 1 },
            };

            var result = await _controller.PlaceOrder(orderDto);

            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async Task PlaceOrder_Should_Return_BadRequest_If_PizzaOrderDto_Is_Invalid()
        {
            var orderDto = new PizzaOrderDto
            {
                UserName = "Test",
                PizzaSizeId = 3,
                ToppingIds = null,
            };

            var result = await _controller.PlaceOrder(null);
            Assert.IsType<BadRequestObjectResult>(result);
        }
    }
}