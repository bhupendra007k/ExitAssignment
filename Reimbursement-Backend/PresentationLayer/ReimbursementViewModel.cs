using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PresentationLayer
{
    public class ReimbursementViewModel
    {
        public DateTime Date { get; set; }

        public string ReimbursementType { get; set; }

        public int RequestedValue { get; set; }

        public int ApprovedValue { get; set; }

        public string Currency { get; set; }

        public string RequestPhase { get; set; }


        public string ReceiptUrl { get; set; }
    }
}
