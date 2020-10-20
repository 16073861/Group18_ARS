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
    public class AthletesController : ApiController
    {
        private Tuks_Athletics_SystemEntities db = new Tuks_Athletics_SystemEntities();

        // GET: api/Athletes
        public IQueryable<Athlete> GetAthletes()
        {
            db.Configuration.ProxyCreationEnabled = false;
            return db.Athletes;
        }

        // GET: api/Athletes/5
        [ResponseType(typeof(Athlete))]
        public IHttpActionResult GetAthlete(int id)
        {
            Athlete athlete = db.Athletes.Find(id);
            if (athlete == null)
            {
                return NotFound();
            }

            return Ok(athlete);
        }

        // PUT: api/Athletes/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutAthlete(int id, AthleteViewModel athlete)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != athlete.Id)
            {
                return BadRequest();
            }

            //db.Entry(athlete).State = EntityState.Modified;
            using (var ctx = new Tuks_Athletics_SystemEntities())
            {
                var existingAthlete = ctx.Athletes.Where(s => s.Athlete_ID == athlete.Id).FirstOrDefault<Athlete>();

                if (existingAthlete != null)
                {
                    existingAthlete.Name = athlete.Name;
                    existingAthlete.Surname = athlete.Surname;
                    existingAthlete.Description = athlete.Description;
                    existingAthlete.Club_ID = athlete.ClubId;
                    existingAthlete.Gender_ID = athlete.GenderId;
                    existingAthlete.Status_ID = athlete.StatusId;
                    existingAthlete.User_ID = athlete.UserId;

                }

                try
                {
                    ctx.SaveChanges();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!AthleteExists(id))
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

        // POST: api/Athletes
        [ResponseType(typeof(Athlete))]
        public IHttpActionResult PostAthlete(Athlete athlete)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Athletes.Add(athlete);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = athlete.Athlete_ID }, athlete);
        }

        // DELETE: api/Athletes/5
        [ResponseType(typeof(Athlete))]
        public IHttpActionResult DeleteAthlete(int id)
        {
            Athlete athlete = db.Athletes.Find(id);
            if (athlete == null)
            {
                return NotFound();
            }

            db.Athletes.Remove(athlete);
            db.SaveChanges();

            return Ok(athlete);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AthleteExists(int id)
        {
            return db.Athletes.Count(e => e.Athlete_ID == id) > 0;
        }
    }
}