using System.ComponentModel.DataAnnotations;

namespace SecurePaymentsPortal.Server.Models
{
    public class PaymentRequest
    {
        [Required]
        [Range(1, 1000000, ErrorMessage = "Amount must be between 1 and 1,000,000.")]
        public decimal Amount { get; set; }

        [Required]
        [RegularExpression(@"^[A-Z]{3}$", ErrorMessage = "Currency must be a 3-letter ISO code, e.g., USD.")]
        public string Currency { get; set; }

        [Required]
        [RegularExpression(@"^\d{6,20}$", ErrorMessage = "Recipient Account must be 6–20 digits.")]
        public string RecipientAccount { get; set; }

        [Required]
        [RegularExpression(@"^[a-zA-Z\s]{2,50}$", ErrorMessage = "Bank name must only contain letters.")]
        public string BankName { get; set; }
    }
}

