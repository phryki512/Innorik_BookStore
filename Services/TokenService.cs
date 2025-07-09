// using System.IdentityModel.Tokens.Jwt;
// using System.Security.Claims;
// using System.Text;
// using BookStoreAPI.Settings;
// using Microsoft.Extensions.Options;
// using Microsoft.IdentityModel.Tokens;

// namespace BookStoreAPI.Services
// {
//     public class TokenService
//     {
//         private readonly JwtSettings _jwtSettings;

//         public TokenService(IOptions<JwtSettings> jwtOptions)
//         {
//             _jwtSettings = jwtOptions.Value;
//         }

//         public string CreateToken(string username)
//         {
//             var claims = new[]
//             {
//                 new Claim(JwtRegisteredClaimNames.Sub, username),
//                 new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
//                 new Claim(ClaimTypes.Name, username)
//             };

//             var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.Key));
//             var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

//             var token = new JwtSecurityToken(
//                 issuer: _jwtSettings.Issuer,
//                 audience: _jwtSettings.Audience,
//                 claims: claims,
//                 expires: DateTime.UtcNow.AddMinutes(_jwtSettings.ExpiresInMinutes),
//                 signingCredentials: creds);

//             return new JwtSecurityTokenHandler().WriteToken(token);
//         }
//     }
// }
using BookStoreAPI.Settings;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BookStoreAPI.Services
{
public class TokenService
{
    private readonly JwtSettings _jwtSettings;

    public TokenService(IOptions<JwtSettings> jwtOptions)
    {
        _jwtSettings = jwtOptions.Value;
    }

    public string CreateToken(string username)
    {
        var claims = new[]
        {
            new Claim(ClaimTypes.Name, username),
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.Key));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _jwtSettings.Issuer,
            audience: _jwtSettings.Audience,
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(_jwtSettings.DurationInMinutes),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
}