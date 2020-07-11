using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Vega.Models;
using Vega.Persistence;

namespace Vega.Controllers
{
    public class FeaturesController : Controller
    {
        private readonly VegaDbContext context;

        public FeaturesController(VegaDbContext context)
        {
            this.context = context;
        }

        [HttpGet("/api/features")]
        public async Task<IEnumerable<Feature>> GetFeatures()
        {
            return await context.Features.ToListAsync();
        }
    }
}
