using System.ComponentModel.DataAnnotations;

namespace PatientRecordMangementSystem.DataContract.Models;

public class AppointmentDto
{
    public int AppointmentId { get; set; }
    public int PatientId { get; set; }
    public int? DoctorId { get; set; }
    public DateTime ScheduledDate { get; set; }
    public string Status { get; set; } = string.Empty;
    public string? Notes { get; set; }
    public DateTime? CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    
    // Navigation properties
    public string? DoctorName { get; set; }
    public string PatientName { get; set; } = string.Empty;
}

public class CreateAppointmentDto
{
    [Required]
    public int PatientId { get; set; }
    
    public int? DoctorId { get; set; }
    
    [Required]
    public DateTime ScheduledDate { get; set; }
    
    [Required]
    [StringLength(50)]
    public string Status { get; set; } = "Scheduled";
    
    [StringLength(500)]
    public string? Notes { get; set; }
}

public class UpdateAppointmentDto
{
    public int? DoctorId { get; set; }
    public DateTime? ScheduledDate { get; set; }
    public string? Status { get; set; }
    public string? Notes { get; set; }
} 