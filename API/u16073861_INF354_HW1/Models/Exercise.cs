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
    
    public partial class Exercise
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Exercise()
        {
            this.Coach_Event_Program_Exercise = new HashSet<Coach_Event_Program_Exercise>();
        }
    
        public int Exercise_ID { get; set; }
        public string Description { get; set; }
        public string Sets { get; set; }
        public string Reps { get; set; }
        public Nullable<float> Cardio { get; set; }
        public Nullable<float> Strength { get; set; }
        public string Name { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Coach_Event_Program_Exercise> Coach_Event_Program_Exercise { get; set; }
    }
}
