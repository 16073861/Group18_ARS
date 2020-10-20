﻿using System;
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
    public class ProgramsController : ApiController
    {
        private Tuks_Athletics_SystemEntities db = new Tuks_Athletics_SystemEntities();

        // GET: api/Programs
        public IQueryable<Program> GetPrograms()
        {
            return db.Programs;
        }

        // GET: api/Programs/5
        [ResponseType(typeof(Program))]
        public IHttpActionResult GetProgram(int id)
        {
            Program program = db.Programs.Find(id);
            if (program == null)
            {
                return NotFound();
            }

            return Ok(program);
        }

        // PUT: api/Programs/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutProgram(int id, Program program)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != program.Program_ID)
            {
                return BadRequest();
            }

            db.Entry(program).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProgramExists(id))
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

        // POST: api/Programs
        [ResponseType(typeof(Program))]
        public IHttpActionResult PostProgram(Program program)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Programs.Add(program);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = program.Program_ID }, program);
        }

        // DELETE: api/Programs/5
        [ResponseType(typeof(Program))]
        public IHttpActionResult DeleteProgram(int id)
        {
            Program program = db.Programs.Find(id);
            if (program == null)
            {
                return NotFound();
            }

            db.Programs.Remove(program);
            db.SaveChanges();

            return Ok(program);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ProgramExists(int id)
        {
            return db.Programs.Count(e => e.Program_ID == id) > 0;
        }
    }
}