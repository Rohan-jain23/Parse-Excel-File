using Microsoft.AspNetCore.Http;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication16.Models
{
    public class FormData
    {
        public string Timestamp { get; set; }
        public string Timezone { get; set; }
        public string UserAgent { get; set; }
        public string ChartName { get; set; }
        public IFormFile FileData { get; set; }
    }
}
