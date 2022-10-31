using Business.DTOs;
using Business.Services;
using DataAccessLayer.Data;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace PresentationLayer.Controllers
{
    
    [Route("")]
    public class AccountController : ControllerBase
    {
        
        private readonly IAccountService _accountService;
        private readonly DataContext _context;

        public AccountController(IAccountService accountService, DataContext context)
        {
            _accountService = accountService;
            _context = context;
        }
        
        [HttpPost("signup")]

        public async Task<IActionResult> SignUp([FromBody] SignUpModel request)
        {
            var result = await _accountService.Signup(request);
            

            if (result != null)
            {
                return Ok(result);
            }
            return Ok(result);
            

        }
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> SignIn([FromBody] SignIn request)
        {
            var result = await _accountService.Login(request);

            if (result == null)
            {
                return Ok("User not found");
            }
            return Ok(result);

        }


        [HttpGet("test/{id}")]
        
        public async Task<IActionResult>  Test(Guid id)
        {
            var Test = await _context.Users.FindAsync(id);
            return Ok(Test);
        }

       
    }
} 
