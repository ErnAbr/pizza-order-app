using backend.DTOs;
using Microsoft.AspNetCore.Mvc;
using Xunit;

namespace backend.Tests.PizzaControllerTests
{
    public class PizzaController_pizzaDataTests : SharedContext
    {
        [Fact]  
        public async Task Should_Return_Pizza_DataAsync()
        {    
            var actionResult = await _controller.GetPizzaData();

            var okResult = Assert.IsType<OkObjectResult>(actionResult);
            var resultObject = Assert.IsType<PizzaDataDto>(okResult.Value);

            Assert.NotNull(resultObject.Toppings);
            Assert.NotNull(resultObject.Sizes);
        }
    }
}