using Business.DTOs;
using DataAccessLayer.Models;
using System.Threading.Tasks;

namespace Business.Services
{
    public interface IAccountService
    {
        Task<Jwt> Login(SignIn request);
        Task<UserModel> Signup(SignUpModel user);
        User GetUserByEmail(string email);
    }
}