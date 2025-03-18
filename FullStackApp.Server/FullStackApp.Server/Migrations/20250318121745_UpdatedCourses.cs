using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FullStackApp.Server.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedCourses : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_QuizResponses_Quizzes_QuizId",
                table: "QuizResponses");

            migrationBuilder.DropIndex(
                name: "IX_QuizResponses_QuizId",
                table: "QuizResponses");

            migrationBuilder.AlterColumn<string>(
                name: "SelectedAnswer",
                table: "QuizResponses",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(200)",
                oldMaxLength: 200);

            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "Courses",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "Courses");

            migrationBuilder.AlterColumn<string>(
                name: "SelectedAnswer",
                table: "QuizResponses",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateIndex(
                name: "IX_QuizResponses_QuizId",
                table: "QuizResponses",
                column: "QuizId");

            migrationBuilder.AddForeignKey(
                name: "FK_QuizResponses_Quizzes_QuizId",
                table: "QuizResponses",
                column: "QuizId",
                principalTable: "Quizzes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
