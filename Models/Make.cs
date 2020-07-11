using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Vega.Models
{
    public class Make
    {
        public int Id { get; set; }
        [Required]
        [StringLength(255)]
        public string Name { get; set; }
        public ICollection<Model> Models { get; set; }

        //bets practice whenever you have colection property, you should initialize that property in a class constructor
        // because then we no need to write make.Model = new Collection<Models>();

        public Make()
        {
            Models = new Collection<Model>();
        }
    }
}
