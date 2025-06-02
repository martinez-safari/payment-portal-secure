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

// ✅ Allow CORS for frontend calls (optional for API testing)
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

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// ✅ Enable CORS
app.UseCors("AllowAll");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

// ✅ Route unmatched paths to React SPA
app.MapFallbackToFile("/index.html");

// ✅ SEED OR UPDATE EMPLOYEE (update username + password if needed)
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();

    // Find the existing employee (by old username)
    var existingEmployee = db.Employees.FirstOrDefault(e => e.Username == "Employee");

    var hasher = new PasswordHasher<Employee>();

    if (existingEmployee != null)
    {
        // 🛠 Update username and password
        existingEmployee.Username = "Admin";
        existingEmployee.PasswordHash = hasher.HashPassword(existingEmployee, "Admin123");

        db.SaveChanges();
    }
    else
    {
        // Create if none exists
        var employee = new Employee
        {
            Username = "Admin"
        };
        employee.PasswordHash = hasher.HashPassword(employee, "Admin123");

        db.Employees.Add(employee);
        db.SaveChanges();
    }
}

app.Run();
