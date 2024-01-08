using backend.DTOs;
using Microsoft.AspNetCore.Mvc;
using Xunit;

namespace backend.Tests.PizzaControllerTests 
{
    public class PizzaController_calculatPriceTests : SharedContext
    {
        [Theory]
        [InlineData(new int[] { 1, 1, 2, 2 }, 1, 10.8)]
        [InlineData(new int[] { 1, 1, 2, 2, 2 }, 3, 15.3)]
        public async void CalculatePrice_Should_Calculate_Correctly(int[] toppingIdsArray, int pizzaSize, decimal expectedPrice)
        {
            var dto = new PriceCalculationDto
                {
                    PizzaSizeId = pizzaSize,
                    ToppingIds = toppingIdsArray.ToList(),
                };

            var result = await _controller.ReturnPrice(dto);

            var okResult = Assert.IsType<OkObjectResult>(result);
            var actualPrice = Assert.IsType<decimal>(okResult.Value);

            Assert.Equal(expectedPrice, actualPrice);
        }

        [Fact]
        public async Task ReturnPrice_Should_Return_BadRequest_For_Invalid_PriceCalculationDto()
        {
            var dto = new PriceCalculationDto
            {
                PizzaSizeId = 0,
                ToppingIds = new List<int> { 1, 2 }
            };

            var result = await _controller.ReturnPrice(null);

            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async Task ReturnPrice_Should_Return_BadRequest_For_Invalid_PizzaSizeId()
        {
            var dto = new PriceCalculationDto
            {
                PizzaSizeId = 5,
                ToppingIds = new List<int> {1, 1, 1, 2, 2, 3},
            };

            var result = await _controller.ReturnPrice(dto);

            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async Task ReturnPrice_Should_Return_BadRequest_For_Invalid_ToppingId()
        {
            var dto = new PriceCalculationDto
            {
                PizzaSizeId = 1,
                ToppingIds = new List<int> {1, 1, 1, 2, 2, 9},
            };

            var result = await _controller.ReturnPrice(dto);

            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async Task ReturnPrice_Should_Return_BadRequest_If_MoreThanSix_Toppings()
        {
            var dto = new PriceCalculationDto
            {
                PizzaSizeId = 1,
                ToppingIds = new List<int> {1, 1, 1, 2, 2, 2, 7},
            };

            var result = await _controller.ReturnPrice(dto);

            Assert.IsType<BadRequestObjectResult>(result);
        }
    }
}