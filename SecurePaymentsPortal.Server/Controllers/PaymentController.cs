using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SecurePaymentsPortal.Server.Data;
using SecurePaymentsPortal.Server.Models;

namespace SecurePaymentsPortal.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PaymentController(AppDbContext context)
        {
            _context = context;
        }

        // Create payment (for customers)
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Payment payment)
        {
            _context.Payments.Add(payment);
            await _context.SaveChangesAsync();
            return Ok("Payment submitted.");
        }

        // Get all payments (for employees)
        [HttpGet]
        public async Task<ActionResult<List<Payment>>> GetPayments()
        {
            var payments = await _context.Payments.ToListAsync();
            return Ok(payments);
        }

        // Verify a payment (employee clicks Verify button)
        [HttpPut("verify/{id}")]
        public async Task<IActionResult> VerifyPayment(int id)
        {
            var payment = await _context.Payments.FindAsync(id);
            if (payment == null)
                return NotFound("Payment not found.");

            if (payment.Status != "PENDING")
                return BadRequest("Payment is not pending.");

            payment.Status = "VERIFIED";
            await _context.SaveChangesAsync();
            return Ok("Payment verified.");
        }

        // Submit verified payments to SWIFT
        [HttpPost("submitToSwift")]
        public async Task<IActionResult> SubmitToSwift()
        {
            var verifiedPayments = await _context.Payments
                .Where(p => p.Status == "VERIFIED")
                .ToListAsync();

            if (!verifiedPayments.Any())
                return BadRequest("No verified payments to submit.");

            foreach (var payment in verifiedPayments)
            {
                payment.Status = "SUBMITTED";
            }

            await _context.SaveChangesAsync();
            return Ok("Payments submitted to SWIFT.");
        }
    }
}
