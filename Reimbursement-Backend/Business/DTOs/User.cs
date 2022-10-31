using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Business.DTOs
{
    public class User
    {
        [Required]
        public Guid UserModelId { get; set; }
        [Required]
        public string Email { get; set; }

        public byte[] PasswordHash { get; set; } = new byte[32];

        public byte[] PasswordSalt { get; set; } = new byte[32];

        [Required]
        public string FullName { get; set; }

        [Required]
        public string PAN { get; set; }

        [Required]
        public string Bank { get; set; }

        [Required]
        public int BankAccountNo { get; set; }



        /*public ICollection<Reimbursement> Reimbursements { get; set; }*/
    }
}
