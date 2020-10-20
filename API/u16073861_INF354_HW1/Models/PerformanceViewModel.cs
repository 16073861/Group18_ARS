using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace u16073861_INF354_HW1.Models
{
    public class PerformanceViewModel
    {
        public int Id { get; set; }
        public string Result { get; set; }
        public DateTime Date { get; set; }
        public int Point { get; set; }
        public int AthleteId { get; set; }
        public int HeatId { get; set; }
        public int EventId { get; set; }
        public int MedalId { get; set; }
        public int AgeId { get; set; }
        public int CompetitionId { get; set; }
    }
}