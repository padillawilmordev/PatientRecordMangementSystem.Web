using System.ComponentModel.DataAnnotations;

namespace PatientRecordMangementSystem.DataContract.Models;

public class MedicalRecordDto
{
    public int RecordId { get; set; }
    public int PatientId { get; set; }
    public int? DoctorId { get; set; }
    public DateTime VisitDate { get; set; }
    public string? Diagnosis { get; set; }
    public string? Treatment { get; set; }
    public string? Prescription { get; set; }
    public DateTime? FollowUpDate { get; set; }
    public DateTime? CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    
    // Navigation properties
    public string? DoctorName { get; set; }
    public string PatientName { get; set; } = string.Empty;
}

public class CreateMedicalRecordDto
{
    [Required]
    public int PatientId { get; set; }
    
    public int? DoctorId { get; set; }
    
    [Required]
    public DateTime VisitDate { get; set; }
    
    [StringLength(1000)]
    public string? Diagnosis { get; set; }
    
    [StringLength(1000)]
    public string? Treatment { get; set; }
    
    [StringLength(1000)]
    public string? Prescription { get; set; }
    
    public DateTime? FollowUpDate { get; set; }
}

public class UpdateMedicalRecordDto
{
    public int? DoctorId { get; set; }
    public DateTime? VisitDate { get; set; }
    public string? Diagnosis { get; set; }
    public string? Treatment { get; set; }
    public string? Prescription { get; set; }
    public DateTime? FollowUpDate { get; set; }
} 