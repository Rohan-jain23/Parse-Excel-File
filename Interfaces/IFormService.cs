using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication16.Models;

namespace WebApplication16
{
    public interface IFormService
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="agentInformation"></param>
        /// <param name="chartName"></param>
        /// <param name="file"></param>
        /// <returns></returns>
        Task<IActionResult> ProcessFile(string agentInformation, string chartName, IFormFile file,string timeStamp,string timeZone);

    }
}
