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
    public class FederationsController : ApiController
    {
        private Tuks_Athletics_SystemEntities db = new Tuks_Athletics_SystemEntities();

        // GET: api/Federations
        public IQueryable<Federation> GetFederations()
        {
            db.Configuration.ProxyCreationEnabled = false;
            return db.Federations;
        }

        // GET: api/Federations/5
        [ResponseType(typeof(Federation))]
        public IHttpActionResult GetFederation(int id)
        {
            Federation federation = db.Federations.Find(id);
            if (federation == null)
            {
                return NotFound();
            }

            return Ok(federation);
        }

        // PUT: api/Federations/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutFederation(int id, FederationViewModel federation)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != federation.Id)
            {
                return BadRequest();
            }

            //db.Entry(federation).State = EntityState.Modified;
            using (var ctx = new Tuks_Athletics_SystemEntities())
            {
                var existingFederation = ctx.Federations.Where(s => s.Federation_ID == federation.Id).FirstOrDefault<Federation>();

                if (existingFederation != null)
                {
                    existingFederation.Name = federation.Name;
                    existingFederation.Descrption = federation.Description;

                }

                try
                {
                    ctx.SaveChanges();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!FederationExists(id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Federations
        [ResponseType(typeof(Federation))]
        public IHttpActionResult PostFederation(Federation federation)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Federations.Add(federation);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = federation.Federation_ID }, federation);
        }

        // DELETE: api/Federations/5
        [ResponseType(typeof(Federation))]
        public IHttpActionResult DeleteFederation(int id)
        {
            Federation federation = db.Federations.Find(id);
            if (federation == null)
            {
                return NotFound();
            }

            db.Federations.Remove(federation);
            db.SaveChanges();

            return Ok(federation);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool FederationExists(int id)
        {
            return db.Federations.Count(e => e.Federation_ID == id) > 0;
        }
    }
}