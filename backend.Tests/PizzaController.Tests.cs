using backend.Controllers;
using backend.Data;
using backend.DTOs;
using backend.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace backend.Tests
{
    public class PizzaControllerTests
    {
        private readonly DbContextOptions<PizzaContext> _dbOptions;
        private readonly PizzaContext _context;
        private readonly PizzaController _controller;

        public PizzaControllerTests()
        {
            _dbOptions = new DbContextOptionsBuilder<PizzaContext>()
                .UseInMemoryDatabase("TestDatabase")
                .Options;

            _context = new PizzaContext(_dbOptions);

            SeedDataHelper.SeedDatabase(_context);

            _controller = new PizzaController(_context);
        }

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