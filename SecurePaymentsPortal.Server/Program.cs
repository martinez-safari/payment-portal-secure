using Microsoft.EntityFrameworkCore;
using SecurePaymentsPortal.Server.Data;
using SecurePaymentsPortal.Server.Models;
using Microsoft.AspNetCore.Identity;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"),
        new MySqlServerVersion(new Version(8, 0, 21)))); // Adjust MySQL version if needed

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ✅ Allow CORS for frontend calls
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// ✅ Swagger only in development
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// ✅ Enforce HTTPS
app.UseHttpsRedirection();

// ✅ Security headers middleware
app.Use(async (ctx, next) =>
{
    ctx.Response.Headers.Add("X-Frame-Options", "DENY");
    ctx.Response.Headers.Add("X-XSS-Protection", "1; mode=block");
    ctx.Response.Headers.Add("X-Content-Type-Options", "nosniff");
    await next();
});

// ✅ Enable CORS
app.UseCors("AllowAll");

// ✅ Auth pipeline (optional if [Authorize] is used)
app.UseAuthorization();

// ✅ Map API
app.MapControllers();

// ✅ Fallback to React app
app.MapFallbackToFile("/index.html");

// ✅ SEED or UPDATE ADMIN EMPLOYEE
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();

    var existingEmployee = db.Employees.FirstOrDefault(e => e.Username == "Employee");

    var hasher = new PasswordHasher<Employee>();

    if (existingEmployee != null)
    {
        existingEmployee.Username = "Admin";
        existingEmployee.PasswordHash = hasher.HashPassword(existingEmployee, "Admin123");
        db.SaveChanges();
    }
    else
    {
        var employee = new Employee { Username = "Admin" };
        employee.PasswordHash = hasher.HashPassword(employee, "Admin123");
        db.Employees.Add(employee);
        db.SaveChanges();
    }
}

app.Run();
