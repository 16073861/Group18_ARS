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
    public class Banned_SubstanceController : ApiController
    {
        private Tuks_Athletics_SystemEntities db = new Tuks_Athletics_SystemEntities();

        // GET: api/Banned_Substance
        public IQueryable<Banned_Substance> GetBanned_Substance()
        {
            return db.Banned_Substance;
        }

        // GET: api/Banned_Substance/5
        [ResponseType(typeof(Banned_Substance))]
        public IHttpActionResult GetBanned_Substance(int id)
        {
            Banned_Substance banned_Substance = db.Banned_Substance.Find(id);
            if (banned_Substance == null)
            {
                return NotFound();
            }

            return Ok(banned_Substance);
        }

        // PUT: api/Banned_Substance/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutBanned_Substance(int id, Banned_Substance banned_Substance)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != banned_Substance.Substance_ID)
            {
                return BadRequest();
            }

            db.Entry(banned_Substance).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Banned_SubstanceExists(id))
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

        // POST: api/Banned_Substance
        [ResponseType(typeof(Banned_Substance))]
        public IHttpActionResult PostBanned_Substance(Banned_Substance banned_Substance)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Banned_Substance.Add(banned_Substance);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = banned_Substance.Substance_ID }, banned_Substance);
        }

        // DELETE: api/Banned_Substance/5
        [ResponseType(typeof(Banned_Substance))]
        public IHttpActionResult DeleteBanned_Substance(int id)
        {
            Banned_Substance banned_Substance = db.Banned_Substance.Find(id);
            if (banned_Substance == null)
            {
                return NotFound();
            }

            db.Banned_Substance.Remove(banned_Substance);
            db.SaveChanges();

            return Ok(banned_Substance);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool Banned_SubstanceExists(int id)
        {
            return db.Banned_Substance.Count(e => e.Substance_ID == id) > 0;
        }
    }
}