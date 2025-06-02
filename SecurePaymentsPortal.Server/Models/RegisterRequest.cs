using System.ComponentModel.DataAnnotations;

namespace SecurePaymentsPortal.Server.Models
{
    public class RegisterRequest
    {
        [Required]
        [RegularExpression(@"^[a-zA-Z\s]{2,50}$", ErrorMessage = "Full name must only contain letters.")]
        public string FullName { get; set; }

        [Required]
        [RegularExpression(@"^\d{8,15}$", ErrorMessage = "ID Number must be 8 to 15 digits.")]
        public string IdNumber { get; set; }

        [Required]
        [RegularExpression(@"^\d{6,12}$", ErrorMessage = "Account Number must be 6 to 12 digits.")]
        public string AccountNumber { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 6)]
        public string Password { get; set; }
    }

}
