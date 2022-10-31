using DataAccessLayer.Models;
using System.Threading.Tasks;

namespace DataAccessLayer.Repository
{
    public interface IAccountRepository
    {
        Task<Jwt> login(SignInModel request);
        Task<UserModel> register(SignUpModel request);
        UserModel GetUserByEmail(string email);
    }
}