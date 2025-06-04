namespace SecurePaymentsPortal.Server.Controllers
{
    using global::SecurePaymentsPortal.Server.Data;
    using global::SecurePaymentsPortal.Server.Models;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;

    namespace SecurePaymentsPortal.Server.Controllers
    {
        [ApiController]
        [Route("api/[controller]")]
        public class CustomerController : ControllerBase
        {
            private readonly AppDbContext _context;
            private readonly PasswordHasher<Customer> _passwordHasher;

            public CustomerController(AppDbContext context)
            {
                _context = context;
                _passwordHasher = new PasswordHasher<Customer>();
            }

            // POST: api/customer/login
            [HttpPost("login")]
            public IActionResult Login([FromBody] CustomerLoginRequest request)
            {
                // Always return the first customer in the database (no password check)
                var customer = _context.Customers.FirstOrDefault();

                if (customer == null)
                    return NotFound("No customer account exists.");

                return Ok(new
                {
                    customer.Id,
                    customer.FullName,
                    customer.AccountNumber
                });
            

            }
        }

        // DTO class for login
        public class CustomerLoginRequest
        {
            public string IdNumber { get; set; }
            public string Password { get; set; }
        }
    }

}
