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
    public class SeasonsController : ApiController
    {
        private Tuks_Athletics_SystemEntities db = new Tuks_Athletics_SystemEntities();

        // GET: api/Seasons
        public IQueryable<Season> GetSeasons()
        {
            return db.Seasons;
        }

        // GET: api/Seasons/5
        [ResponseType(typeof(Season))]
        public IHttpActionResult GetSeason(int id)
        {
            Season season = db.Seasons.Find(id);
            if (season == null)
            {
                return NotFound();
            }

            return Ok(season);
        }

        // PUT: api/Seasons/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutSeason(int id, SeasonViewModel season)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != season.Id)
            {
                return BadRequest();
            }

            //db.Entry(season).State = EntityState.Modified;
            using (var ctx = new Tuks_Athletics_SystemEntities())
            {
                var existingSeason = ctx.Seasons.Where(s => s.Season_ID == season.Id).FirstOrDefault<Season>();

                if (existingSeason != null)
                {
                    existingSeason.Description = season.Description;
                    existingSeason.StartDate = season.StartDate;
                    existingSeason.EndDate = season.EndDate;

                }
                try
                {
                    ctx.SaveChanges();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!SeasonExists(id))
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

        // POST: api/Seasons
        [ResponseType(typeof(Season))]
        public IHttpActionResult PostSeason(Season season)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Seasons.Add(season);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = season.Season_ID }, season);
        }

        // DELETE: api/Seasons/5
        [ResponseType(typeof(Season))]
        public IHttpActionResult DeleteSeason(int id)
        {
            Season season = db.Seasons.Find(id);
            if (season == null)
            {
                return NotFound();
            }

            db.Seasons.Remove(season);
            db.SaveChanges();

            return Ok(season);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool SeasonExists(int id)
        {
            return db.Seasons.Count(e => e.Season_ID == id) > 0;
        }
    }
}