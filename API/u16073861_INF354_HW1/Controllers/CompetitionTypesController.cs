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
    public class CompetitionTypesController : ApiController
    {
        private Tuks_Athletics_SystemEntities db = new Tuks_Athletics_SystemEntities();

        // GET: api/CompetitionTypes
        public IQueryable<CompetitionType> GetCompetitionTypes()
        {
            db.Configuration.ProxyCreationEnabled = false;
            return db.CompetitionTypes;
        }

        // GET: api/CompetitionTypes/5
        [ResponseType(typeof(CompetitionType))]
        public IHttpActionResult GetCompetitionType(int id)
        {
            CompetitionType competitionType = db.CompetitionTypes.Find(id);
            if (competitionType == null)
            {
                return NotFound();
            }

            return Ok(competitionType);
        }

        // PUT: api/CompetitionTypes/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCompetitionType(int id, CompetitionType competitionType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != competitionType.CompetitionType_ID)
            {
                return BadRequest();
            }

            db.Entry(competitionType).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CompetitionTypeExists(id))
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

        // POST: api/CompetitionTypes
        [ResponseType(typeof(CompetitionType))]
        public IHttpActionResult PostCompetitionType(CompetitionType competitionType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.CompetitionTypes.Add(competitionType);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = competitionType.CompetitionType_ID }, competitionType);
        }

        // DELETE: api/CompetitionTypes/5
        [ResponseType(typeof(CompetitionType))]
        public IHttpActionResult DeleteCompetitionType(int id)
        {
            CompetitionType competitionType = db.CompetitionTypes.Find(id);
            if (competitionType == null)
            {
                return NotFound();
            }

            db.CompetitionTypes.Remove(competitionType);
            db.SaveChanges();

            return Ok(competitionType);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CompetitionTypeExists(int id)
        {
            return db.CompetitionTypes.Count(e => e.CompetitionType_ID == id) > 0;
        }
    }
}