using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Swashbuckle.AspNetCore.SwaggerGen;
using System.Text;
using TweetApp.MessegeSender;
using TweetApp.SwaggerConfigurations;
using TweetApp.TweetAppRepository.Contexts;
using TweetApp.TweetAppRepository.Interfaces;
using TweetApp.TweetAppRepository.Repositories;
using TweetApp.TweetAppService;
using TweetApp.TweetAppService.Mapper;
using TweetApp.TweetAppService.Services;
using TweetApp.TweetAppService.Services.Interfaces;

namespace TweetApp
{
    public class Program
    {
#nullable disable
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
            builder.Services.AddScoped<IServices, Services>();
            builder.Services.AddScoped<IKafkaSender, KafkaSender>();    
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddDbContext<ApplicationDbContext>
                (options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
            builder.Services.AddEndpointsApiExplorer();

            builder.Services.AddTransient<IConfigureOptions<SwaggerGenOptions>, ConfigureSwaggerOptions>();
            builder.Services.AddSwaggerGen();
            builder.Services.AddAutoMapper(typeof(Mappings));
            builder.Services.AddApiVersioning(options =>
            {
                options.AssumeDefaultVersionWhenUnspecified = true;
                options.DefaultApiVersion = new ApiVersion(1, 0);
                options.ReportApiVersions = true;
            });

            builder.Services.AddVersionedApiExplorer(options => options.GroupNameFormat = "'v'VVV");

            builder.Services.AddCors();

            builder.Services.AddDistributedMemoryCache();

            builder.Services.Configure<CloudinarySettings>(builder.Configuration.GetSection("Cloudinary"));

            var appSettingsSection = builder.Configuration.GetSection("AppSettings");
            builder.Services.Configure<AppSettings>(appSettingsSection);
            var appSettings = appSettingsSection.Get<AppSettings>();
            var key = Encoding.ASCII.GetBytes(appSettings.Secret);

            builder.Services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
                .AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });

            var app = builder.Build();

            //var service = (IServiceScopeFactory)app.Services.GetService(typeof(IServiceScopeFactory));

            //using (var db = service.CreateScope().ServiceProvider.GetService<ApplicationDbContext>())
            //{
            //    db.Database.Migrate();
            //}

                // Configure the HTTP request pipeline.
                if (app.Environment.IsDevelopment())
                {
                    app.UseSwagger();

                    var descriptionProvider = app.Services.GetRequiredService<IApiVersionDescriptionProvider>();
                    app.UseSwaggerUI(options =>
                    {
                    // Build a swagger endpoint for each discovered API version
                        foreach (var description in descriptionProvider.ApiVersionDescriptions)
                        {
                            options.SwaggerEndpoint($"/swagger/{description.GroupName}/swagger.json", description.GroupName.ToUpperInvariant());
                        }
                    //options.RoutePrefix = String.Empty;
                    });

                }

            app.UseHttpsRedirection();

            app.UseCors(x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

            app.UseAuthentication();
            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}