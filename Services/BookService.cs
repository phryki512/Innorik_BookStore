using BookStoreAPI.Models;
using BookStoreAPI.Repositories;

namespace BookStoreAPI.Services
{
    public class BookService : IBookService
    {
        private readonly IBookRepository _repository;

        public BookService(IBookRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Book>> GetAllBooksAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<Book?> GetBookByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task<Book> AddBookAsync(Book book)
        {
            return await _repository.AddAsync(book);
        }

        public async Task<bool> UpdateBookAsync(Book book)
        {
            return await _repository.UpdateAsync(book);
        }

        public async Task<bool> DeleteBookAsync(int id)
        {
            return await _repository.DeleteAsync(id);
        }
    }
}
