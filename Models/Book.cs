namespace BookStoreAPI.Models
{
public class Book
{
    public int? Id { get; set; }
    public string? Name { get; set; } = string.Empty;
    public string? Category { get; set; } = string.Empty;
    public decimal? Price { get; set; } = 0;
    public string? Description { get; set; } = string.Empty;
}
}