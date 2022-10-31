using AutoMapper;
using Business.DTOs;
using DataAccessLayer.Models;
using DataAccessLayer.Repository;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Business.Services
{
    public class ReimbursementService : IReimbursementService
    {
        private readonly IReimbursementRepository _reimbursementRepository;
        private readonly IMapper _mapper;


        public ReimbursementService(IReimbursementRepository reimbursementRepository, IMapper mapper)
        {

            _reimbursementRepository = reimbursementRepository;
            _mapper = mapper;
        }
        public async Task<List<ReimbursementModel>> GetReimbursementsById(Guid id)
        {
            return await _reimbursementRepository.GetReimbursementsById(id);
        }

        public async Task<ReimbursementModel> AddReimbursements( Reimbursement reimbursement, User user)
        {
            var reimbursementModel = _mapper.Map<Reimbursement, ReimbursementModel>(reimbursement);
            var userModel = _mapper.Map<User, UserModel>(user);

            return await _reimbursementRepository.AddReimbursements(reimbursementModel, userModel);
            }

        public bool DeclineReimbursements(Guid id)
        {
           return _reimbursementRepository.DeclineReimbursements(id);
        }
         public string DeleteReimbursements(Guid id)
        {
            return _reimbursementRepository.DeleteReimbursement(id);
        }
    }
}
