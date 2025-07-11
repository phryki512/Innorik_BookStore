using Microsoft.AspNetCore.Mvc;
using BookStoreAPI.Services;
using System.Text.Json.Serialization;
using BookStoreAPI.Data;

public class LoginRequest
{
    [JsonPropertyName("username")]
    public string Username { get; set; } = string.Empty;

    [JsonPropertyName("password")]
    public string Password { get; set; } = string.Empty;
}

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{   
    private readonly BookStoreDbContext _context;
    private readonly TokenService _tokenService;
    private readonly PasswordHasher _hasher;

    public AuthController(TokenService tokenService,BookStoreDbContext context,PasswordHasher hasher)
    {
        _tokenService = tokenService;
        _context = context;
        _hasher = hasher;
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginRequest request)
    {
    var user = _context.Users.SingleOrDefault(u => u.Username == request.Username);
    if (user == null || !_hasher.Verify(request.Password, user.Password))
    {
        return Unauthorized();
    }

    var token = _tokenService.CreateToken(user.Username);
    return Ok(new { Token = token });
    }

    //[HttpGet("ping")]
    //public IActionResult Ping() => Ok("AuthController is working");

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] LoginRequest request)
    {
    if (_context.Users.Any(u => u.Username == request.Username))
        return BadRequest("User already exists.");

    var user = new User
    {
        Username = request.Username,
        Password = _hasher.Hash(request.Password)
    };

    _context.Users.Add(user);
    await _context.SaveChangesAsync();
    return Ok("User registered successfully.");
}

}
