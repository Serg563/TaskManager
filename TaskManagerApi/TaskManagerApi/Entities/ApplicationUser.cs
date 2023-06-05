using Microsoft.AspNetCore.Identity;

namespace TaskManagerApi.Data
{
    public class ApplicationUser : IdentityUser
    {
        public string? Name { get; set; }
    }
}
