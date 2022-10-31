using DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DataAccessLayer.Repository
{
    public interface IReimbursementRepository
    {
        Task<ReimbursementModel> AddReimbursements(ReimbursementModel newReimbursement, UserModel user);
        bool DeclineReimbursements(Guid id);
        Task<List<ReimbursementModel>> GetReimbursementsById(Guid id);
        string DeleteReimbursement(Guid id);
    }
}