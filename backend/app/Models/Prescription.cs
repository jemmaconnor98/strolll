public class Prescription
{
    public int Id { get; set; }
    public string PatientFirstName { get; set; }
    public string PatientLastName { get; set; }
    public List<string> Exercises { get; set; }
    public DateTime DatePrescribed { get; set; }
}