﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Vega.Models;

namespace Vega.Core
{
    public interface IPhotoRepository
    {
        Task<IEnumerable<Photo>> GetPhotos(int vehicleId);
    }
}
