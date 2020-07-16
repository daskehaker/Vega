using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Vega.Models
{
    public class VehicleQuery
    {
        public int? MakeId { get; set; }

        public string SortBy { get; set; }

        public bool IsSortAscending { get; set; }
    }
}
