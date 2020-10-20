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
    public class EventTypesController : ApiController
    {
        private Tuks_Athletics_SystemEntities db = new Tuks_Athletics_SystemEntities();

        // GET: api/EventTypes
        public IQueryable<EventType> GetEventTypes()
        {
            db.Configuration.ProxyCreationEnabled = false;
            return db.EventTypes;
        }

        // GET: api/EventTypes/5
        [ResponseType(typeof(EventType))]
        public IHttpActionResult GetEventType(int id)
        {
            EventType eventType = db.EventTypes.Find(id);
            if (eventType == null)
            {
                return NotFound();
            }

            return Ok(eventType);
        }

        // PUT: api/EventTypes/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutEventType(int id, EventType eventType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != eventType.EventType_ID)
            {
                return BadRequest();
            }

            db.Entry(eventType).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EventTypeExists(id))
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

        // POST: api/EventTypes
        [ResponseType(typeof(EventType))]
        public IHttpActionResult PostEventType(EventType eventType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.EventTypes.Add(eventType);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = eventType.EventType_ID }, eventType);
        }

        // DELETE: api/EventTypes/5
        [ResponseType(typeof(EventType))]
        public IHttpActionResult DeleteEventType(int id)
        {
            EventType eventType = db.EventTypes.Find(id);
            if (eventType == null)
            {
                return NotFound();
            }

            db.EventTypes.Remove(eventType);
            db.SaveChanges();

            return Ok(eventType);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool EventTypeExists(int id)
        {
            return db.EventTypes.Count(e => e.EventType_ID == id) > 0;
        }
    }
}