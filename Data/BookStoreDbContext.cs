using Microsoft.EntityFrameworkCore;
using BookStoreAPI.Models;

namespace BookStoreAPI.Data
{
public class BookStoreDbContext : DbContext
{
    public BookStoreDbContext(DbContextOptions<BookStoreDbContext> options) : base(options) { }

    // public DbSet<Book> Books => Set<Book>();
    // public DbSet<User> Users => Set<User>();
    public DbSet<Book> Books { get; set; }
    public DbSet<User> Users { get; set; }
}
}