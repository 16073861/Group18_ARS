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
    public class Age_GroupController : ApiController
    {
        private Tuks_Athletics_SystemEntities db = new Tuks_Athletics_SystemEntities();

        // GET: api/Age_Group
        public IQueryable<Age_Group> GetAge_Group()
        {
            db.Configuration.ProxyCreationEnabled = false;
            return db.Age_Group;
        }

        // GET: api/Age_Group/5
        [ResponseType(typeof(Age_Group))]
        public IHttpActionResult GetAge_Group(int id)
        {
            Age_Group age_Group = db.Age_Group.Find(id);
            if (age_Group == null)
            {
                return NotFound();
            }

            return Ok(age_Group);
        }

        // PUT: api/Age_Group/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutAge_Group(int id, Age_Group age_Group)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != age_Group.Age_ID)
            {
                return BadRequest();
            }

            db.Entry(age_Group).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Age_GroupExists(id))
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

        // POST: api/Age_Group
        [ResponseType(typeof(Age_Group))]
        public IHttpActionResult PostAge_Group(Age_Group age_Group)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Age_Group.Add(age_Group);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = age_Group.Age_ID }, age_Group);
        }

        // DELETE: api/Age_Group/5
        [ResponseType(typeof(Age_Group))]
        public IHttpActionResult DeleteAge_Group(int id)
        {
            Age_Group age_Group = db.Age_Group.Find(id);
            if (age_Group == null)
            {
                return NotFound();
            }

            db.Age_Group.Remove(age_Group);
            db.SaveChanges();

            return Ok(age_Group);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool Age_GroupExists(int id)
        {
            return db.Age_Group.Count(e => e.Age_ID == id) > 0;
        }
    }
}