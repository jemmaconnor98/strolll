using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

[ApiController]
[Route("api/[controller]")]
public class PrescriptionController : ControllerBase
{
    private static List<Prescription> prescriptions = new();

    // GET: api/prescription
    // Retrieves all prescriptions.
    [HttpGet]
    public IActionResult GetAll() => Ok(prescriptions);

    // POST: api/prescription
    // Adds a new prescription to the in-memory storage.
    [HttpPost]
    public IActionResult Create([FromBody] Prescription prescription)
    {
        prescription.Id = prescriptions.Count + 1;
        prescription.DatePrescribed = DateTime.Now;
        prescriptions.Add(prescription);
        return Ok(prescription);
    }
}