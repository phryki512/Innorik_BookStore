using BookStoreAPI.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BookStoreAPI.Repositories
{
    public interface IBookRepository
    {
        Task<IEnumerable<Book>> GetAllAsync();
        Task<Book> GetByIdAsync(int id);
        Task<Book> AddAsync(Book book);
        Task<bool> UpdateAsync(Book book);
        Task<bool> DeleteAsync(int id);
    }
}
