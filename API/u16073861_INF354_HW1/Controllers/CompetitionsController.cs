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
    public class CompetitionsController : ApiController
    {
        private Tuks_Athletics_SystemEntities db = new Tuks_Athletics_SystemEntities();
                
        // GET: api/Competitions
        public IQueryable<Competition> GetCompetitions()
        {
            db.Configuration.ProxyCreationEnabled = false;
            return db.Competitions;
        }

        // GET: api/Competitions/5
        [ResponseType(typeof(Competition))]
        public IHttpActionResult GetCompetition(int id)
        {
            Competition competition = db.Competitions.Find(id);
            if (competition == null)
            {
                return NotFound();
            }

            return Ok(competition);
        }

        // PUT: api/Competitions/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCompetition(int id, CompetitionViewModel competition)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != competition.Id)
            {
                return BadRequest();
            }

            //db.Entry(competition).State = EntityState.Modified;
            using (var ctx = new Tuks_Athletics_SystemEntities())
            {
                var existingCompetition = ctx.Competitions.Where(s => s.Competition_ID == competition.Id).FirstOrDefault<Competition>();

                if (existingCompetition != null)
                {
                    existingCompetition.Name = competition.Name;
                    existingCompetition.Venue_ID = competition.VenueId;
                    existingCompetition.District_ID = competition.DistrictId;
                    existingCompetition.Club_ID = competition.ClubId;
                    existingCompetition.CompetitionType_ID = competition.CompetitionTypeId;
                    existingCompetition.Date = competition.Date;

                }

                try
                {
                    ctx.SaveChanges();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!CompetitionExists(id))
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

        // POST: api/Competitions
        [ResponseType(typeof(Competition))]
        public IHttpActionResult PostCompetition(Competition competition)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Competitions.Add(competition);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = competition.Competition_ID }, competition);
        }

        // DELETE: api/Competitions/5
        [ResponseType(typeof(Competition))]
        public IHttpActionResult DeleteCompetition(int id)
        {
            Competition competition = db.Competitions.Find(id);
            if (competition == null)
            {
                return NotFound();
            }

            db.Competitions.Remove(competition);
            db.SaveChanges();

            return Ok(competition);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CompetitionExists(int id)
        {
            return db.Competitions.Count(e => e.Competition_ID == id) > 0;
        }
    }
}