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
    public class LeaguesController : ApiController
    {
        private Tuks_Athletics_SystemEntities db = new Tuks_Athletics_SystemEntities();

        // GET: api/Leagues
        public IQueryable<League> GetLeagues()
        {
            return db.Leagues;
        }

        // GET: api/Leagues/5
        [ResponseType(typeof(League))]
        public IHttpActionResult GetLeague(int id)
        {
            League league = db.Leagues.Find(id);
            if (league == null)
            {
                return NotFound();
            }

            return Ok(league);
        }

        // PUT: api/Leagues/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutLeague(int id, LeagueViewModel league)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != league.Id)
            {
                return BadRequest();
            }

            //db.Entry(league).State = EntityState.Modified;
            using (var ctx = new Tuks_Athletics_SystemEntities())
            {
                var existingLeague = ctx.Leagues.Where(s => s.League_ID == league.Id).FirstOrDefault<League>();

                if (existingLeague != null)
                {
                    existingLeague.Name = league.Name;
                    existingLeague.Tier = league.Tier;

                }

                try
                {
                    ctx.SaveChanges();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!LeagueExists(id))
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

        // POST: api/Leagues
        [ResponseType(typeof(League))]
        public IHttpActionResult PostLeague(League league)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Leagues.Add(league);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (LeagueExists(league.League_ID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = league.League_ID }, league);
        }

        // DELETE: api/Leagues/5
        [ResponseType(typeof(League))]
        public IHttpActionResult DeleteLeague(int id)
        {
            League league = db.Leagues.Find(id);
            if (league == null)
            {
                return NotFound();
            }

            db.Leagues.Remove(league);
            db.SaveChanges();

            return Ok(league);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool LeagueExists(int id)
        {
            return db.Leagues.Count(e => e.League_ID == id) > 0;
        }
    }
}