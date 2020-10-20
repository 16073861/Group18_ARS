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

namespace u16073861_INF354_HW1.Controllers
{
    public class MedalsController : ApiController
    {
        private Tuks_Athletics_SystemEntities db = new Tuks_Athletics_SystemEntities();

        // GET: api/Medals
        public IQueryable<Medal> GetMedals()
        {
            db.Configuration.ProxyCreationEnabled = false;
            return db.Medals;
        }

        // GET: api/Medals/5
        [ResponseType(typeof(Medal))]
        public IHttpActionResult GetMedal(int id)
        {
            Medal medal = db.Medals.Find(id);
            if (medal == null)
            {
                return NotFound();
            }

            return Ok(medal);
        }

        // PUT: api/Medals/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutMedal(int id, Medal medal)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != medal.Medal_ID)
            {
                return BadRequest();
            }

            db.Entry(medal).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MedalExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Medals
        [ResponseType(typeof(Medal))]
        public IHttpActionResult PostMedal(Medal medal)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Medals.Add(medal);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = medal.Medal_ID }, medal);
        }

        // DELETE: api/Medals/5
        [ResponseType(typeof(Medal))]
        public IHttpActionResult DeleteMedal(int id)
        {
            Medal medal = db.Medals.Find(id);
            if (medal == null)
            {
                return NotFound();
            }

            db.Medals.Remove(medal);
            db.SaveChanges();

            return Ok(medal);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool MedalExists(int id)
        {
            return db.Medals.Count(e => e.Medal_ID == id) > 0;
        }
    }
}