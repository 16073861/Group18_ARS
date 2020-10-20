using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace u16073861_INF354_HW1.Models
{
    public class AthleteViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Surname{ get; set; }
        public int ClubId { get; set; }
        public int GenderId { get; set; }
        public int StatusId { get; set; }
        public int UserId { get; set; }
    }
}