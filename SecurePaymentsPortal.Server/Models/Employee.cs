using System.ComponentModel.DataAnnotations;

namespace SecurePaymentsPortal.Server.Models
{
    public class Employee
    {
        public int Id { get; set; }

        [Required]
        public string Username { get; set; }

        [Required]
        public string PasswordHash { get; set; }
    }
}
