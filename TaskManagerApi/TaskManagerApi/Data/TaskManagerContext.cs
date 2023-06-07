using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using TaskManagerApi.Entities;

namespace TaskManagerApi.Data
{
    public class TaskManagerContext : IdentityDbContext<ApplicationUser>
    {
        public TaskManagerContext(DbContextOptions options):base(options)
        {

        }
       

        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public DbSet<DevTask> DevTasks { get; set; }
    }
}
