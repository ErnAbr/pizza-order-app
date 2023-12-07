using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.DTOs
{
    public class PizzaSizeDto
    {
        public int Id { get; set; }
        public string SizeName { get; set; }
        public int SizePrice { get; set; }
    }
}