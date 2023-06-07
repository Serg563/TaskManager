

namespace TaskManagerApi.Entities
{
    public class DevTask
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int Duration { get; set; }

        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
    }
}
