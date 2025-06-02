namespace SecurePaymentsPortal.Server.Models
{
    public class Customer
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string IdNumber { get; set; }
        public string AccountNumber { get; set; }
        public string PasswordHash { get; set; }
    }

}
