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
    public class Chart
    {
        [BsonId]
        public Guid Id { get; set; }


        public string ChartName { get; set; }
        public string TimeStamp { get; set; }
        public string Timezone { get; set; }

        public string AgentINformation { get; set; }

        public string FileColumns { get; set; }
    }
}
