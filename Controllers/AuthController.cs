using Microsoft.AspNetCore.Mvc;
using BookStoreAPI.Services;
using System.Text.Json.Serialization;

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
    private readonly TokenService _tokenService;

    public AuthController(TokenService tokenService)
    {
        _tokenService = tokenService;
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginRequest request)
    {
        Console.WriteLine($"Attempted login with Username: {request.Username}, Password: {request.Password}");

        if (request.Username == "admin" && request.Password == "password")
        {
            var token = _tokenService.CreateToken(request.Username);
            return Ok(new { token });
        }

        return Unauthorized("Invalid credentials");
    }
    [HttpGet("ping")]
    public IActionResult Ping() => Ok("AuthController is working");

}
