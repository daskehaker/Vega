﻿using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Vega.Models;

namespace Vega.Persistence
{
    public class VegaDbContext: DbContext
    {   
        public DbSet<Vehicle> Vehicles { get; set; }
        public DbSet<Make> Makes { get; set; }
        public DbSet<Model> Models { get; set; }
        public DbSet<Feature> Features { get; set; }

        public VegaDbContext(DbContextOptions<VegaDbContext> options): base(options) {}

        //lentelei neduoda naujo primary key. Nereikia nes turi du id is kitu lenteliu
        //Taip pat galima daryt ir webe su workoutu ir pratimu
        protected override void OnModelCreating(ModelBuilder modelbuilder)
        {
            modelbuilder.Entity<VehicleFeature>().HasKey(vf => new { vf.VehicleId, vf.FeatureId });
        }
    }
}