using Microsoft.EntityFrameworkCore;
using DataAccessLayer.Data;
using DataAccessLayer.Models;
using System.Threading.Tasks;
using System;
using System.Linq;
using System.Collections.Generic;

namespace DataAccessLayer.Repository
{
    public class ReimbursementRepository :IReimbursementRepository
    {
        private readonly DataContext _context;
        public ReimbursementRepository(DataContext context)
        {
            _context = context;

        }


        public async Task<List<ReimbursementModel>> GetReimbursementsById(Guid id)
        {
            var result = await _context.Reimbursements.Where(x=>x.UserModelId==id).ToListAsync();
            return result;
        }

        public async Task<ReimbursementModel> AddReimbursements(ReimbursementModel newReimbursement, UserModel user)
        {
            newReimbursement.UserModelId = user.UserModelId;
            if (newReimbursement.ReimbursementId == null || newReimbursement.ReimbursementId == Guid.Empty)
            {
                _context.Reimbursements.Add(newReimbursement);
            }
            else
            {
                _context.Reimbursements.Update(newReimbursement);
            }

            _context.SaveChanges();

            return newReimbursement;
        }

        public bool DeclineReimbursements(Guid id)
        {
            _context.Reimbursements.Where(r => r.ReimbursementId == id).FirstOrDefault().RequestPhase = "Declined";
            var response = _context.SaveChanges();
            return response > 0;
        }

        public  string DeleteReimbursement(Guid id)
        {
            var result = _context.Reimbursements.Where(x => x.ReimbursementId == id).FirstOrDefault();
             _context.Reimbursements.Remove(result);
             _context.SaveChanges();
            return ("reimbursemnt deleted");
        }
    }
}
