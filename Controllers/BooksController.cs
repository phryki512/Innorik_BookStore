using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using BookStoreAPI.Models;
using BookStoreAPI.Services;   
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BookStoreAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class BooksController : ControllerBase
    {
        private readonly IBookService _bookService;

        public BooksController(IBookService bookService)
        {
            _bookService = bookService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Book>>> GetBooks()
        {
            var books = await _bookService.GetAllBooksAsync();
            return Ok(books);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Book>> GetBook(int id)
        {
            var book = await _bookService.GetBookByIdAsync(id);
            if (book == null) return NotFound();
            return Ok(book);
        }

        [HttpPost]
        public async Task<ActionResult<Book>> CreateBook(Book book)
        {
            var created = await _bookService.AddBookAsync(book);
            return CreatedAtAction(nameof(GetBook), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBook(int id, Book book)
        {
            if (id != book.Id) return BadRequest();

            var success = await _bookService.UpdateBookAsync(book);
            if (!success) return NotFound();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            var success = await _bookService.DeleteBookAsync(id);
            if (!success) return NotFound();

            return NoContent();
        }
    }
}

