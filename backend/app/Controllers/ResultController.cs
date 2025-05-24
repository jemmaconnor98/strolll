using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

[ApiController]
[Route("api/[controller]")]
public class ResultController : ControllerBase
{
    // GET: api/result
    // This endpoint retrieves a list of mock exercise results.
    [HttpGet]
    public IActionResult GetResults()
    {
        var results = new List<Result>
        {
            new Result { Id = 1, PatientName = "John Doe", Exercise = "Squats", Score = 85, Date = DateTime.Now },
            new Result { Id = 2, PatientName = "Jane Smith", Exercise = "Lunges", Score = 90, Date = DateTime.Now },
            new Result { Id = 3, PatientName = "Sarah Green", Exercise = "Shoulder Press", Score = 65, Date = DateTime.Now }
        };
        return Ok(results);
    }
}