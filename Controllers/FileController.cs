using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using System.IO;
using MongoDB.Driver;
using WebApplication16.Models;
using MongoDB.Bson.Serialization;
using MediatR;
using System.Threading;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using WebApplication16.Services;
using WebApplication16.Interfaces;

namespace WebApplication16.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FileController : ControllerBase
    {
        private readonly IFormService _fileProcessingService;
        private readonly IFetchDataService _fetchDataService;

        public FileController(IFormService fileProcessingService, IFetchDataService fetchDataService)
        {
            _fileProcessingService = fileProcessingService;
            _fetchDataService = fetchDataService;
        }

        [HttpPost]
        public async Task<IActionResult> File([FromForm] FormData form)
        {
            var response = await _fileProcessingService.ProcessFile(form.UserAgent, form.ChartName, form.FileData, form.Timestamp, form.Timezone);
            return Ok("ok");
        }

        [HttpGet("Data")]
        public ActionResult<List<Chart>> GetAll()
        {
            var items = _fetchDataService.GetAll();
            return new  OkObjectResult(items.Result);
        }
    }
}
