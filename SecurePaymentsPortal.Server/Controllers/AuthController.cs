using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SecurePaymentsPortal.Server.Models;
using SecurePaymentsPortal.Server.Data;
using Microsoft.Extensions.Logging;

namespace SecurePaymentsPortal.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<AuthController> _logger;
        private readonly PasswordHasher<Customer> _hasher = new();
        private readonly PasswordHasher<Employee> _employeeHasher = new();

        public AuthController(AppDbContext context, ILogger<AuthController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            if (await _context.Customers.AnyAsync(c => c.AccountNumber == request.AccountNumber))
            {
                _logger.LogWarning("❌ Registration failed: Account number already exists.");
                return BadRequest("Account number already exists.");
            }

            var customer = new Customer
            {
                FullName = request.FullName,
                IdNumber = request.IdNumber,
                AccountNumber = request.AccountNumber
            };

            customer.PasswordHash = _hasher.HashPassword(customer, request.Password);

            _logger.LogInformation($"✅ Registering customer: {customer.AccountNumber}");

            _context.Customers.Add(customer);
            await _context.SaveChangesAsync();

            _logger.LogInformation("✅ Registration successful.");
            return Ok("User registered.");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest req)
        {
            _logger.LogInformation("=== LOGIN METHOD HIT ===");
            _logger.LogInformation($"Account/Username: {req.AccountNumber}, Password: {(string.IsNullOrEmpty(req.Password) ? "NULL or empty" : "provided")}");

            // Try Customer login first
            var customer = await _context.Customers.FirstOrDefaultAsync(c => c.AccountNumber == req.AccountNumber);
            if (customer != null)
            {
                _logger.LogInformation("👤 Trying customer login...");
                var result = _hasher.VerifyHashedPassword(customer, customer.PasswordHash, req.Password);

                if (result == PasswordVerificationResult.Success)
                {
                    _logger.LogInformation("✅ Customer login successful.");
                    return Ok(new { role = "customer", id = customer.Id });
                }
            }

            // Try Employee login if customer login failed
            var employee = await _context.Employees.FirstOrDefaultAsync(e => e.Username == req.AccountNumber);
            if (employee != null)
            {
                _logger.LogInformation("🧑‍💼 Trying employee login...");
                var result = _employeeHasher.VerifyHashedPassword(employee, employee.PasswordHash, req.Password);

                if (result == PasswordVerificationResult.Success)
                {
                    _logger.LogInformation("✅ Employee login successful.");
                    return Ok(new { role = "employee", id = employee.Id });
                }
            }

            _logger.LogWarning("❌ Login failed: Invalid credentials.");
            return Unauthorized("Invalid account number/username or password.");
        }

        public class LoginRequest
        {
            public string AccountNumber { get; set; }
            public string Password { get; set; }
        }
    }
}
