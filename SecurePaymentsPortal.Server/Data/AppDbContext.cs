using SecurePaymentsPortal.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace SecurePaymentsPortal.Server.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Customer> Customers { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<Employee> Employees { get; set; } 
    }
}
