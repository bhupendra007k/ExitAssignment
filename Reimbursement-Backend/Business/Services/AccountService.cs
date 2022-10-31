using DataAccessLayer.Repository;
using System.Threading.Tasks;
using DataAccessLayer.Models;
using Business.DTOs;
using AutoMapper;

namespace Business.Services
{
    public class AccountService : IAccountService
    {
        private readonly IAccountRepository _accountRepository;
        private readonly IMapper _mapper;

        public AccountService(IAccountRepository accountRepository,IMapper mapper)
        {
            _accountRepository = accountRepository;
            _mapper = mapper;
        }



        public async Task<UserModel> Signup(SignUpModel user)
        {

            return await _accountRepository.register(user);
        }

        public async Task<Jwt> Login(SignIn request)
        {
            var result = _mapper.Map<SignIn, SignInModel>(request);
            return await _accountRepository.login(result);
        }

        public User GetUserByEmail(string email)
        {
            var result = _accountRepository.GetUserByEmail(email);
            return _mapper.Map<UserModel, User>(result);
        }
    }
}
