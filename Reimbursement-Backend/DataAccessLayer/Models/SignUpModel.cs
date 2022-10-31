using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DataAccessLayer.Models
{
    public class SignUpModel
    {
        [Required,EmailAddress]
        public string Email { get; set; }

        [Required,MinLength(6)]
        
        public string Password { get; set; }

        [Required,Compare("Password")]
        public string ConfirmPassword { get; set; }

        [Required]
        public string FullName { get; set; }

        [Required]
        public string PAN { get; set; }

        [Required]
        public string Bank { get; set; }

        [Required]
        public int BankAccountNo { get; set; }
    }
}
