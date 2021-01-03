using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ExerciseAPI.Services;
using ExerciseAPI.Utils;
using Microsoft.EntityFrameworkCore;

namespace ExerciseAPI
{
    public class Startup
    {
        private string _connectionString = null;

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy",
                    c => c.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
            });

            _connectionString = Configuration["secretConnectionString"];

            services.AddControllers();

            services.AddMvc(opt => opt.EnableEndpointRouting = false);

            services.AddEntityFrameworkNpgsql()
                .AddDbContext<DataContext>(
                    opt => opt.UseNpgsql(_connectionString));

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "ExerciseAPI", Version = "v1" });
            });

            services.AddScoped<IExerciseService, ExerciseService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "ExerciseAPI v1"));
                app.UseCors("CorsPolicy");
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseMvc(routes => routes.MapRoute(
                "default", "api/{controller}/{action}/{id?}"
            ));
        }
    }
}
