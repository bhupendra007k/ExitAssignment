
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace DataAccessLayer.Models
{
    public class ReimbursementModel
    {
        [Key]
        public Guid ReimbursementId { get; set; }
        public DateTime Date{ get; set; }

        public string ReimbursementType { get; set; }

        public int RequestedValue { get; set; }

        public int ApprovedValue { get; set; }

        public string Currency { get; set; }

        public string RequestPhase { get; set; }
        public string ReceiptUrl { get; set; }

        public Guid UserModelId { get; set; }
        public virtual UserModel User { get; set; }
    }
}
