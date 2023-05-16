using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using WebApplication16.Models;

namespace WebApplication16.Services
{
    public class FormService : IFormService
    {
        private IHostingEnvironment _Environment;

        private readonly IMongoCollection<Chart> _formcollection;

        public FormService(IOptions<ConfigurationPathSetting> context, IHostingEnvironment Environment)
        {
            _Environment = Environment;
            var client = new MongoClient(context.Value.ConnectionString);
            var database = client.GetDatabase(context.Value.Database);
            _formcollection = database.GetCollection<Chart>(context.Value.Collection);
        }

        public async Task<IActionResult> ProcessFile(string agentInformation, string chartName, IFormFile file, string timeStamp, string timeZone)
        {
            byte[] buffer = null;
            DataTable dtExcelData;
            using (var openContentStream = file.OpenReadStream())
            {
                buffer = new byte[openContentStream.Length];
                openContentStream.Seek(0, SeekOrigin.Begin);
                openContentStream.Read(buffer, 0, Convert.ToInt32(openContentStream.Length));
                var stream = new MemoryStream(buffer);
                string[] supportFields = new string[] { "TimeStamp", "ProcessedDataMemory", "HeapDataMemory" };
                dtExcelData = ExcelHelper.ExportData(stream, supportFields.ToList());
            }

            var processedData = new List<FileColumn>();
            if (dtExcelData.Rows.Count > 0)
            {
                foreach (DataRow item in dtExcelData.Rows)
                {
                    processedData.Add(new FileColumn()
                    {
                        TimeStamp = item.ItemArray[0].ToString(),
                        ProcessedDataMemory = item.ItemArray[1].ToString(),
                        HeapDataMemory = item.ItemArray[2].ToString()
                    });
                }
            }
            string JSONString = JsonConvert.SerializeObject(processedData);
            var TimeStamp = timeStamp.Replace(':', '_');
            string excelFile = $"./MyExcelFiles/Original{chartName}_{TimeStamp}.xlsx"; 
            using (Stream fileStream = new FileStream(excelFile, FileMode.Create, FileAccess.Write))
            { 
                file.CopyTo(fileStream);
            }

            Chart chartProcessedData = new Chart()
            {
                FileColumns = JSONString,
                ChartName = chartName,
                AgentINformation = agentInformation,
                TimeStamp= timeStamp,
                Timezone=timeZone,
            };

            _formcollection.InsertOne(chartProcessedData);
            return new OkObjectResult("ok");
        }
    }
}