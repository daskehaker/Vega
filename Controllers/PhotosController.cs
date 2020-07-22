using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Vega.Controllers.Resources;
using Vega.Core;
using Vega.Models;
using Vega.Persistence;

namespace Vega.Controllers
{
    [Route("/api/vehicles/{vehicleId}/photos")]
    public class PhotosController : Controller
    {
        private readonly IHostingEnvironment host;
        private readonly IVehicleRepository vehicleRepository;
        private readonly IPhotoRepository photoRepository;
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;
        private readonly PhotoSettings photoSettings;

        public PhotosController(IHostingEnvironment host, IVehicleRepository vehicleRepository, IPhotoRepository photoRepository, IUnitOfWork unitOfWork, IMapper mapper, IOptionsSnapshot<PhotoSettings> options)
        {
            this.host = host;
            this.vehicleRepository = vehicleRepository;
            this.photoRepository = photoRepository;
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
            this.photoSettings = options.Value;
        }

        [HttpGet]
        public async Task<IEnumerable<PhotoResource>> GetPhoto(int vehicleId)
        {
            var photos = await photoRepository.GetPhotos(vehicleId);
            return mapper.Map<IEnumerable<Photo>, IEnumerable<PhotoResource>>(photos);
        }

        [HttpPost]
        public async Task<IActionResult> Upload(int vehicleId, IList<IFormFile> file)
        {
            var vehicle = await vehicleRepository.GetVehicle(vehicleId, includeRelated: false);
            if (vehicle == null) return NotFound();
            var uploadsFolderPath = Path.Combine(host.WebRootPath, "uploads");
            
            if (!Directory.Exists(uploadsFolderPath))
                Directory.CreateDirectory(uploadsFolderPath);

            if (file[0] == null) return BadRequest("Null file");
            if (file[0].Length == 0) return BadRequest("Empty File");
            if (file[0].Length > photoSettings.MaxBytes) return BadRequest("The file can not be bigger than 10MB");
            if (!photoSettings.IsSupported(file[0].FileName)) return BadRequest("Bad file type");

            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file[0].FileName);
            var filePath = Path.Combine(uploadsFolderPath, fileName);

            using(var stream = new FileStream(filePath, FileMode.Create))
            {
                await file[0].CopyToAsync(stream);
            }

            var photo = new Photo { FileName = fileName };
            vehicle.Photos.Add(photo);
            await unitOfWork.CompleteAsync();

            return Ok(mapper.Map<Photo, PhotoResource>(photo));
        }
    }
}
