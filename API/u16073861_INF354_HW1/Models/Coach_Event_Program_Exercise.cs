//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace u16073861_INF354_HW1.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Coach_Event_Program_Exercise
    {
        public int Exercise_ID { get; set; }
        public int Event_ID { get; set; }
        public int Program_ID { get; set; }
        public int Coach_ID { get; set; }
    
        public virtual Coach Coach { get; set; }
        public virtual Event Event { get; set; }
        public virtual Exercise Exercise { get; set; }
        public virtual Program Program { get; set; }
    }
}
