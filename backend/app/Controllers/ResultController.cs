using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

[ApiController]
[Route("api/[controller]")]
public class ResultController : ControllerBase
{
    [HttpGet]
    public IActionResult GetResults()
    {
        var results = new List<Result>
        {
            new Result { Id = 1, PatientName = "John Doe", Exercise = "Squats", Score = 85, Date = DateTime.Now },
            new Result { Id = 2, PatientName = "Jane Smith", Exercise = "Lunges", Score = 90, Date = DateTime.Now }
        };
        return Ok(results);
    }
}