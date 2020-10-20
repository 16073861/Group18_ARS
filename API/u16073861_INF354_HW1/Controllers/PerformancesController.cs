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
    public class PerformancesController : ApiController
    {
        private Tuks_Athletics_SystemEntities db = new Tuks_Athletics_SystemEntities();

        // GET: api/Performances
        public IQueryable<Performance> GetPerformances()
        {
            db.Configuration.ProxyCreationEnabled = false;
            return db.Performances;
        }

        // GET: api/Performances/5
        [ResponseType(typeof(Performance))]
        public IHttpActionResult GetPerformance(int id)
        {
            Performance performance = db.Performances.Find(id);
            if (performance == null)
            {
                return NotFound();
            }

            return Ok(performance);
        }

        // PUT: api/Performances/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutPerformance(int id, PerformanceViewModel performance)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != performance.Id)
            {
                return BadRequest();
            }

            //db.Entry(performance).State = EntityState.Modified;
            using (var ctx = new Tuks_Athletics_SystemEntities())
            {
                var existingPerformance = ctx.Performances.Where(s => s.Performance_ID == performance.Id).FirstOrDefault<Performance>();

                if (existingPerformance != null)
                {
                    existingPerformance.Result = performance.Result;
                    existingPerformance.Date = performance.Date;
                    existingPerformance.Athlete_ID = performance.AthleteId;
                    existingPerformance.Heat_ID = performance.HeatId;
                    existingPerformance.Event_ID = performance.EventId;
                    existingPerformance.Medal_ID = performance.MedalId;
                    existingPerformance.Age_ID = performance.AgeId;
                    existingPerformance.Competition_ID = performance.CompetitionId;

                }

                try
                {
                    ctx.SaveChanges();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!PerformanceExists(id))
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

        // POST: api/Performances
        [ResponseType(typeof(Performance))]
        public IHttpActionResult PostPerformance(Performance performance)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Performances.Add(performance);
            //Update the Athlete Points
            var point = performance.Point;
            var aID = performance.Athlete_ID;
            db.Database.ExecuteSqlCommand("update Athlete set Points += " + point + " where Athlete_ID = " + aID);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = performance.Performance_ID }, performance);
        }

        // DELETE: api/Performances/5
        [ResponseType(typeof(Performance))]
        public IHttpActionResult DeletePerformance(int id)
        {
            Performance performance = db.Performances.Find(id);
            if (performance == null)
            {
                return NotFound();
            }

            db.Performances.Remove(performance);
            //Update the Athlete Points
            var point = performance.Point;
            var aID = performance.Athlete_ID;
            db.Database.ExecuteSqlCommand("update Athlete set Points -= " + point + " where Athlete_ID = " + aID);
            db.SaveChanges();

            return Ok(performance);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PerformanceExists(int id)
        {
            return db.Performances.Count(e => e.Performance_ID == id) > 0;
        }
    }
}