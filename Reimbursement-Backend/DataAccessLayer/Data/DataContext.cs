using Microsoft.EntityFrameworkCore;
using DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DataAccessLayer.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options):base(options)
        {

        }
        public DbSet<UserModel> Users { get; set; }
        public DbSet<ReimbursementModel> Reimbursements { get; set; }

      
    }
}
