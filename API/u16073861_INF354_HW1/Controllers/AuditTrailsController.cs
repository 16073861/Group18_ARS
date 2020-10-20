using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using u16073861_INF354_HW1.Models;
using System.Web.Http.Cors;
using System.Dynamic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Threading.Tasks;
using System.Net;
using System.Net.Http;
using System.Web.Http.Description;

namespace u16073861_INF354_HW1.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class AuditTrailsController : ApiController
    {
        private Tuks_Athletics_SystemEntities db = new Tuks_Athletics_SystemEntities();

        [System.Web.Http.Route("api/AuditTrails/GetAuditTrail")]
        [System.Web.Mvc.HttpGet]
        // GET: api/Students
        public List<dynamic> GetAuditTrail()
        {
            //return db.Users;
            Tuks_Athletics_SystemEntities db = new Tuks_Athletics_SystemEntities();
            db.Configuration.ProxyCreationEnabled = false;
            return getGetAuditTrailReturnList(db.AuditTrails.Include(xx => xx.User).ToList());

        }

        private List<dynamic> getGetAuditTrailReturnList(List<AuditTrail> forClient)
        {
            List<dynamic> dynamicAudits = new List<dynamic>();
            foreach (AuditTrail auditTrail in forClient)
            {
                dynamic dynamicauditTrail = new ExpandoObject();
                dynamicauditTrail.AuditTrailID = auditTrail.AuditTrailID;
                dynamicauditTrail.Username = db.Users.Where(xx => xx.User_ID == auditTrail.User_ID).Select(xx => xx.Email).FirstOrDefault();
                dynamicauditTrail.TransactionType = auditTrail.TransactionType;
                dynamicauditTrail.DateTime = auditTrail.DateTime.Value.ToString("yyyy-MM-dd HH:mm");
                dynamicauditTrail.TransactionDescription = auditTrail.TransactionDescription;


                dynamicAudits.Add(dynamicauditTrail);
            }

            return dynamicAudits;
        }

        [System.Web.Http.Route("api/AuditTrails/AuditTrails")]
        [System.Web.Mvc.HttpPost]
        // POST: api/AuditTrails
        //// [ResponseType(typeof(AuditTrail))]
        public dynamic PostAuditTrail([FromBody] AuditTrail auditTrail)
        {

            //var USER_ID = getUserID();

            auditTrail.User = db.Users.Where(x => x.User_ID == auditTrail.User_ID).FirstOrDefault();

            //if (!ModelState.IsValid)
            //{
            //    return BadRequest(ModelState);
            //}
            //auditTrail.DateTime = auditTrail.DateTime;
            //auditTrail.TransactionDescription = auditTrail.TransactionDescription;
            //auditTrail.TransactionType = auditTrail.TransactionType;
            //auditTrail.User_ID = auditTrail.User.User_ID;
            // db.AuditTrails.Add(auditTrail);
            // db.SaveChanges();

            //return CreatedAtRoute("DefaultApi", new { id = auditTrail.AuditTrailID }, auditTrail);
            //if (!ModelState.IsValid)
            //{
            //    return BadRequest(ModelState);
            //}

            db.AuditTrails.Add(auditTrail);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = auditTrail.AuditTrailID }, auditTrail);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AuditTrailExists(int id)
        {
            return db.AuditTrails.Count(e => e.AuditTrailID == id) > 0;
        }
    }
}