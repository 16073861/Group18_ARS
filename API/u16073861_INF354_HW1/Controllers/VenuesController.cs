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
    public class VenuesController : ApiController
    {
        private Tuks_Athletics_SystemEntities db = new Tuks_Athletics_SystemEntities();

        // GET: api/Venues
        public IQueryable<Venue> GetVenues()
        {
            db.Configuration.ProxyCreationEnabled = false;
            return db.Venues;
        }

        // GET: api/Venues/5
        [ResponseType(typeof(Venue))]
        public IHttpActionResult GetVenue(int id)
        {
            Venue venue = db.Venues.Find(id);
            if (venue == null)
            {
                return NotFound();
            }

            return Ok(venue);
        }

        // PUT: api/Venues/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutVenue(int id, VenueViewModel venue)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != venue.Id)
            {
                return BadRequest();
            }

            //db.Entry(venue).State = EntityState.Modified;
            using (var ctx = new Tuks_Athletics_SystemEntities())
            {
                var existingVenue = ctx.Venues.Where(s => s.Venue_ID == venue.Id).FirstOrDefault<Venue>();

                if (existingVenue != null)
                {
                    existingVenue.Name = venue.Name;
                    existingVenue.Capacity = venue.Capacity;
                    existingVenue.District_ID = venue.District;

                }

                try
                {
                    ctx.SaveChanges();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!VenueExists(id))
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

        // POST: api/Venues
        [ResponseType(typeof(Venue))]
        public IHttpActionResult PostVenue(Venue venue)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Venues.Add(venue);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (VenueExists(venue.Venue_ID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = venue.Venue_ID }, venue);
        }

        // DELETE: api/Venues/5
        [ResponseType(typeof(Venue))]
        public IHttpActionResult DeleteVenue(int id)
        {
            Venue venue = db.Venues.Find(id);
            if (venue == null)
            {
                return NotFound();
            }

            db.Venues.Remove(venue);
            db.SaveChanges();

            return Ok(venue);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool VenueExists(int id)
        {
            return db.Venues.Count(e => e.Venue_ID == id) > 0;
        }
    }
}