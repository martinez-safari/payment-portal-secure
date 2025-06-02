namespace SecurePaymentsPortal.Server.Models
{
    public class Payment
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public decimal Amount { get; set; }
        public string Currency { get; set; }
        public string RecipientAccount { get; set; }
        public string BankName { get; set; }
        public string Status { get; set; } = "PENDING";
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }

}
