using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SecurePaymentsPortal.Server.Migrations
{
    /// <inheritdoc />
    public partial class RenameSwiftCodeToBankName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "SwiftCode",
                table: "Payments",
                newName: "BankName");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "BankName",
                table: "Payments",
                newName: "SwiftCode");
        }
    }
}
