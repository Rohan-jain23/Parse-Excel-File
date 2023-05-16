using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication16.Interfaces
{
    public interface IFetchDataService
    {
        Task<IActionResult> GetAll();

    }
}
