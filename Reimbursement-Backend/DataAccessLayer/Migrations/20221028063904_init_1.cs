using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DataAccessLayer.Migrations
{
    public partial class init_1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserModelId = table.Column<Guid>(nullable: false),
                    Email = table.Column<string>(nullable: false),
                    PasswordHash = table.Column<byte[]>(nullable: true),
                    PasswordSalt = table.Column<byte[]>(nullable: true),
                    FullName = table.Column<string>(nullable: false),
                    PAN = table.Column<string>(nullable: false),
                    Bank = table.Column<string>(nullable: false),
                    BankAccountNo = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserModelId);
                });

            migrationBuilder.CreateTable(
                name: "Reimbursements",
                columns: table => new
                {
                    ReimbursementId = table.Column<Guid>(nullable: false),
                    Date = table.Column<DateTime>(nullable: false),
                    ReimbursementType = table.Column<string>(nullable: true),
                    RequestedValue = table.Column<int>(nullable: false),
                    ApprovedValue = table.Column<int>(nullable: true),
                    Currency = table.Column<string>(nullable: true),
                    RequestPhase = table.Column<string>(nullable: true),
                    ReceiptUrl = table.Column<string>(nullable: true),
                    UserModelId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reimbursements", x => x.ReimbursementId);
                    table.ForeignKey(
                        name: "FK_Reimbursements_Users_UserModelId",
                        column: x => x.UserModelId,
                        principalTable: "Users",
                        principalColumn: "UserModelId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Reimbursements_UserModelId",
                table: "Reimbursements",
                column: "UserModelId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Reimbursements");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
