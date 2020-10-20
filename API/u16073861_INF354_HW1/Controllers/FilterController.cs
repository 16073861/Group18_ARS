using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using u16073861_INF354_HW1.Models;
using System.Web.Http.Cors;

namespace u16073861_INF354_HW1.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class FilterController : ApiController
    {
        private Tuks_Athletics_SystemEntities db = new Tuks_Athletics_SystemEntities();

        [System.Web.Mvc.Route("api/Filter")]
        [System.Web.Http.HttpGet]
        public List<Performance> GetFilter(int id)
        {
            var perfs = db.Performances.Where(s => s.Event_ID == id).ToList();
            return perfs;
        }
    }
}
