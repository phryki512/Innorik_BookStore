using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;

public class PasswordHasher
{
    public string Hash(string password)
    {
        byte[] salt = RandomNumberGenerator.GetBytes(128 / 8);
        string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
            password, salt, KeyDerivationPrf.HMACSHA256, 10000, 256 / 8));
        return $"{Convert.ToBase64String(salt)}:{hashed}";
    }

    public bool Verify(string password, string stored)
    {
        var parts = stored.Split(':');
        var salt = Convert.FromBase64String(parts[0]);
        var hash = parts[1];

        var attempt = Convert.ToBase64String(KeyDerivation.Pbkdf2(
            password, salt, KeyDerivationPrf.HMACSHA256, 10000, 256 / 8));
        return attempt == hash;
    }
}
