using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using DataAccessLayer.Models;
using System.Threading.Tasks;
using DataAccessLayer.Repository;
using System.Linq;
using System.Security.Claims;
using Business.Services;
using Business.DTOs;
using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Hosting;
using System.IO;

namespace PresentationLayer.Controllers
{
    [Authorize]
    [Route("")]
    public class ReimbursementController : Controller
    {
        /*private readonly IReimbursementRepository _reimbursementRepository;*/
        private readonly IReimbursementService _reimbursementService;
        private readonly IAccountService _accountService;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public ReimbursementController(IReimbursementService reimbursementService, IAccountService accountService,IWebHostEnvironment webHostEnvironment)
        {
            _reimbursementService = reimbursementService;
            _accountService = accountService;
            _webHostEnvironment = webHostEnvironment;
        }
     /*   [Route(" getuserbyemail/{email}")]
        [HttpGet]
        public async Task<UserModel> GetAll(string email)
        {
            var userEmail = User.Claims.First(x => x.Type == ClaimTypes.Email).Value;
            return await _reimbursementService.GetReimbursementsByEmail(email);
        }*/
     
        [HttpPost("add")]
        public async Task<IActionResult> AddReimbursement([FromBody] Reimbursement reimbursement)
        {
            var userEmail = User.Claims.First(x => x.Type == ClaimTypes.Name).Value;
            var user =_accountService.GetUserByEmail(userEmail);
            //reimbursement.User = user;
            var result = await _reimbursementService.AddReimbursements(reimbursement, user);
            return Ok(result);
                
        }
        [HttpGet("/{id}")]
        public async Task<List<ReimbursementModel>> GetReimbursementsById(Guid id)
        {
            var result = await _reimbursementService.GetReimbursementsById(id);
            return result;

        }

        /*  [HttpGet]
          [Route("getreimbursements/{email}")]
          public async Task<UserModel> GetUserReimbursements([FromRoute] string email)
          {
              var userEmail = User.Claims.First(x => x.Type == ClaimTypes.Email).Value;
              return await _reimbursementService.GetReimbursementsByEmail(email);
          }
  */
        [HttpGet]
        [Route("declinereimbursement/{id}")]
        public bool DeclineReimbursements([FromRoute] Guid id)
        {
            var userEmail = User.Claims.First(x => x.Type == ClaimTypes.Email).Value;
            return _reimbursementService.DeclineReimbursements(id);
        }



        [HttpDelete]
        [Route("delete/{id}")]
        public string DeleteReimbursement(Guid id)
        {
            return _reimbursementService.DeleteReimbursements(id);
        }

        



    }
}
