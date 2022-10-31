using Business.DTOs;
using DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Business.Services
{
    public interface IReimbursementService
    {
        Task<ReimbursementModel> AddReimbursements(Reimbursement reimbursement, User user);
        Task<List<ReimbursementModel>> GetReimbursementsById(Guid id);
        bool DeclineReimbursements(Guid id);
        string DeleteReimbursements(Guid id);
    }
}