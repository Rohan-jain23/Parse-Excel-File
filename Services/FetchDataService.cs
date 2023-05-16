using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication16.Interfaces;
using WebApplication16.Models;

namespace WebApplication16.Services
{
    public class FetchDataService: IFetchDataService
    {
        private IHostingEnvironment _Environment;
        private readonly IMongoCollection<Chart> _fetchdatacollection;
        public FetchDataService(IOptions<ConfigurationPathSetting> context, IHostingEnvironment Environment)
        {
            _Environment = Environment;
            var client = new MongoClient(context.Value.ConnectionString);
            var database = client.GetDatabase(context.Value.Database);
            _fetchdatacollection = database.GetCollection<Chart>(context.Value.Collection);
        }

        public async Task<IActionResult> GetAll()
        {
            var response = _fetchdatacollection.Find(i => true).ToList();
            return new OkObjectResult(response);
        }
    }
}
