using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TweetApp.Migrations
{
    public partial class tweetappDb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    LoginId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ContactNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.LoginId);
                });

            migrationBuilder.CreateTable(
                name: "Photos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PublicId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Url = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsMain = table.Column<bool>(type: "bit", nullable: false),
                    UserLoginId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Photos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Photos_Users_UserLoginId",
                        column: x => x.UserLoginId,
                        principalTable: "Users",
                        principalColumn: "LoginId");
                });

            migrationBuilder.CreateTable(
                name: "Tweets",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Tag = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Subject = table.Column<string>(type: "nvarchar(144)", maxLength: 144, nullable: true),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    DatePosted = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tweets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Tweets_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "LoginId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Reactions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TweetId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    Reactions = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reactions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Reactions_Tweets_TweetId",
                        column: x => x.TweetId,
                        principalTable: "Tweets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Reactions_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "LoginId",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "ReplyTweets",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    TweetId = table.Column<int>(type: "int", nullable: false),
                    Message = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DatePosted = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReplyTweets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ReplyTweets_Tweets_TweetId",
                        column: x => x.TweetId,
                        principalTable: "Tweets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ReplyTweets_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "LoginId",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Photos_UserLoginId",
                table: "Photos",
                column: "UserLoginId");

            migrationBuilder.CreateIndex(
                name: "IX_Reactions_TweetId",
                table: "Reactions",
                column: "TweetId");

            migrationBuilder.CreateIndex(
                name: "IX_Reactions_UserId",
                table: "Reactions",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_ReplyTweets_TweetId",
                table: "ReplyTweets",
                column: "TweetId");

            migrationBuilder.CreateIndex(
                name: "IX_ReplyTweets_UserId",
                table: "ReplyTweets",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Tweets_UserId",
                table: "Tweets",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Photos");

            migrationBuilder.DropTable(
                name: "Reactions");

            migrationBuilder.DropTable(
                name: "ReplyTweets");

            migrationBuilder.DropTable(
                name: "Tweets");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
