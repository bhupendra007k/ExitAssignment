using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using DataAccessLayer.Data;
using DataAccessLayer.Models;
using System;
using System.Collections.Generic;using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;

namespace DataAccessLayer.Repository
{
    public class AccountRepository :IAccountRepository
    {
        private readonly DataContext _context;

        /*private readonly ILogger<UserController> _logger;*/

        private readonly IConfiguration _configuration;

        public AccountRepository(DataContext context, IConfiguration cofiguration)
        {
            _context = context;
            _configuration = cofiguration;
        }

        public async Task<UserModel> register(SignUpModel request)
        {

            if (_context.Users.Any(u => u.Email == request.Email))
            {
                return null;
            }

            CreatePasswordHash(request.Password,
                out byte[] passwordHash,
                out byte[] passwordSalt);

            var user = new UserModel
            {
                Email = request.Email,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt,
                FullName = request.FullName,
                PAN = request.PAN,
                Bank = request.Bank,
                BankAccountNo = request.BankAccountNo,

            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return user;


        }

        public async Task<Jwt> login(SignInModel request)
        {
            /*CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);*/
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
            if (user == null || !VerifyPasswordFromHash(request.Password,user.PasswordHash,user.PasswordSalt))
            {
                return null;
            }

            var authClaims = new List<Claim>
            {
                new Claim(ClaimTypes.Name,request.Email),

                new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString()),

                new Claim("UserId",user.UserModelId.ToString()),
           
                
            };
            if (request.Email.Contains("admin", StringComparison.InvariantCultureIgnoreCase))
            {
                authClaims.Add(new Claim("Role", "admin"));

            }
            else
            {
                authClaims.Add(new Claim("Role", "User"));
            }
            var authSigninKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_configuration["JWT:Secret"]));

            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:ValidIssuer"],
                audience: _configuration["JWT:ValidAudience"],
                expires: DateTime.Now.AddDays(1),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigninKey, SecurityAlgorithms.HmacSha256Signature)


                );
            var JWT = new JwtSecurityTokenHandler().WriteToken(token);

            var jwttoken = new Jwt
            {
                jwtToken = JWT,
            };

            return jwttoken;





        }

        public UserModel GetUserByEmail(string email)
        {
            return _context.Users.Where(u => email.Equals(u.Email)).FirstOrDefault();
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }

        }

        private bool VerifyPasswordFromHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            byte[] newPasswordHash;
            using (var hmac = new HMACSHA512())
            {
                hmac.Key = passwordSalt;
                newPasswordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));

            };
            return newPasswordHash.SequenceEqual(passwordHash);
        }
    }
}
