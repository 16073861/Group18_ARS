﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace u16073861_INF354_HW1.Models
{
    public class UserVM
    {
        public int User_ID { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string User_role { get; set; }
        public int Type_ID { get; set; }
        public string Password { get; internal set; }
    }
}