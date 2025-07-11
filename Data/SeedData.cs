using BookStoreAPI.Models;

namespace BookStoreAPI.Data
{
    public static class SeedData
    {
        public static void Initialize(BookStoreDbContext context)
        {
            if (!context.Books.Any())
            {
                context.Books.AddRange(
                    new Book { Name = "Clean Code", Category = "Programming", Price = 49.99M, Description = "A Handbook of Agile Software Craftsmanship" },
                    new Book { Name = "Atomic Habits", Category = "Self-help", Price = 29.99M, Description = "An Easy & Proven Way to Build Good Habits" }
                );
                context.SaveChanges();
            }

            if (!context.Users.Any())
            {
                context.Users.Add(new User { Username = "admin", Password = "admin123" }); // hash passwords in real apps!
                context.SaveChanges();
            }
        }
    }
}
