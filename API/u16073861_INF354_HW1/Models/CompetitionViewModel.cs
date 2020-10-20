using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace u16073861_INF354_HW1.Models
{
    public class CompetitionViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int VenueId { get; set; }
        public int DistrictId { get; set; }
        public int ClubId { get; set; }
        public int CompetitionTypeId { get; set; }
        public DateTime Date { get; set; }
    }
}