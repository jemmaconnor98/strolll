public class Prescription
{
    public int Id { get; set; }
    public string PatientName { get; set; }
    public List<string> Exercises { get; set; }
    public DateTime DatePrescribed { get; set; }
}