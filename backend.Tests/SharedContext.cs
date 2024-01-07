using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Controllers;
using backend.Data;
using Microsoft.EntityFrameworkCore;

namespace backend.Tests
{
    public class SharedContext : IDisposable
    {
        protected readonly DbContextOptions<PizzaContext> _dbOptions;
        protected readonly PizzaContext _context;
        protected readonly PizzaController _controller;

        public SharedContext()
        {
            _dbOptions = new DbContextOptionsBuilder<PizzaContext>()
                .UseInMemoryDatabase("TestDatabase")
                .Options;

            _context = new PizzaContext(_dbOptions);

            SeedDataHelper.SeedDatabase(_context);

            _controller = new PizzaController(_context);
        }

        public void Dispose()
        {
            _context.Database.EnsureDeleted();
            _context.Dispose();
        }
    }
}