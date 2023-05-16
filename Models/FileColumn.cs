using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Microsoft.Azure.Documents;
using Microsoft.AspNetCore.Http;

namespace WebApplication16.Models
{
    public class FileColumn
    {
        public string TimeStamp { get; set; }

        public string ProcessedDataMemory { get; set; }
        
        public string HeapDataMemory { get; set; }
    }
}
