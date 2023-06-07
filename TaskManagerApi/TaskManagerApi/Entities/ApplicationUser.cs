using Microsoft.AspNetCore.Identity;

namespace TaskManagerApi.Entities
{
    public class ApplicationUser : IdentityUser
    {
        public string? Name { get; set; }
    }
}
