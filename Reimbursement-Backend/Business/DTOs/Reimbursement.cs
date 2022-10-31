using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using System.Text.Json.Serialization;

namespace Business.DTOs
{
    public class Reimbursement
    {
      /*  [Key]*/
       /* [JsonPropertyName("reimbursementId")]*/
        public Guid ReimbursementId { get; set; }

        /*[Required]*/
        /*[JsonPropertyName("date")]*/
        public DateTime Date { get; set; }
        
        /*[Required]*/
        /*[JsonPropertyName("reimbursementType")]*/
        public string ReimbursementType { get; set; }

        /*[Required]
        [JsonPropertyName("requestedValue")]*/

        public int RequestedValue { get; set; }

       
        public int ApprovedValue { get; set; }

        /*[Required]*/
        //[JsonPropertyName("currency")]
        public string Currency { get; set; }

        
        public string RequestPhase { get; set; }

        public Guid UserModelId { get; set; }

        
        public string ReceiptUrl { get; set; }
        public virtual User User { get; set; }
    }
}
