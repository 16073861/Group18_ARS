using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace u16073861_INF354_HW1.Models
{
    public class ClubViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int DistrictId { get; set; }
        public int FederationId { get; set; }
    }
}