using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;
using u16073861_INF354_HW1.Models;
using System.Web.Http.Cors;
using System.Dynamic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;

using System.Web.Http.Description;

namespace u16073861_INF354_HW1.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ExcerciseController : ApiController
    {

        Tuks_Athletics_SystemEntities db = new Tuks_Athletics_SystemEntities();

        //ADD ---> Users --------------------------------------------------------------------------Needed for REGISTRATION?
        [System.Web.Http.Route("api/Excercise/addExcercise")]
        [System.Web.Mvc.HttpPost]
        public List<dynamic> addExcercises([FromBody] Exercise excercise)
        {
            db.Configuration.ProxyCreationEnabled = false;
            db.Exercises.Add(excercise);
            db.SaveChanges();
            return getExcercisesReturnList(db.Exercises.ToList());
        }
        //////////

        [System.Web.Http.Route("api/Excercise/getAllExcercises")]
        [System.Web.Mvc.HttpPost]
        public List<dynamic> getAllExcercises()
        {
            db.Configuration.ProxyCreationEnabled = false;
            return getExcercisesReturnList(db.Exercises.ToList());
        }

        private List<dynamic> getExcercisesReturnList(List<Exercise> forExercise)
        {
            List<dynamic> dynamicExcercises = new List<dynamic>();
            foreach (Exercise exer in forExercise)
            {
                dynamic dynamicExcercise = new ExpandoObject();


                dynamicExcercise.Exercise_ID = exer.Exercise_ID;
                dynamicExcercise.Description = exer.Description;
                dynamicExcercise.Sets = exer.Sets;
                dynamicExcercise.Reps = exer.Reps;
                dynamicExcercise.Cardio = exer.Cardio;
                dynamicExcercise.Strength = exer.Strength;
                dynamicExcercise.Name = exer.Name;
                dynamicExcercises.Add(dynamicExcercises);
            }
            return dynamicExcercises;
        }
        ////////////////////////////////////////////////////////////////////////////////////
        //UPDATE ---> Owners

        [System.Web.Http.Route("api/Excercise/UpdateExcercise{id}")]
        [System.Web.Mvc.HttpPut]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCoach(int id, Exercise excercise)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != excercise.Exercise_ID)
            {
                return BadRequest();
            }

            // db.Entry(coach).State = EntityState.Modified;
            using (var ctx = new Tuks_Athletics_SystemEntities())
            {
                var curExcercise = ctx.Exercises.Where(s => s.Exercise_ID == excercise.Exercise_ID).FirstOrDefault();

                if (curExcercise != null)
                {
                    curExcercise.Exercise_ID = excercise.Exercise_ID;
                    curExcercise.Description = excercise.Description;
                    curExcercise.Sets = excercise.Sets;
                    curExcercise.Reps = excercise.Reps;
                    curExcercise.Cardio = excercise.Cardio;
                    curExcercise.Strength = excercise.Strength;
                    curExcercise.Name = excercise.Name;

                }
                try

                {
                    ctx.SaveChanges();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ExerciseExists(id))
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

        [System.Web.Http.Route("api/Excercise/DeleteExcercise")]
        [System.Web.Mvc.HttpDelete]
        // DELETE: api/Coaches/5
        [ResponseType(typeof(Exercise))]
        public bool DeleteExercise(int id)
        {
            db.Configuration.ProxyCreationEnabled = false;
            Exercise excercise = db.Exercises.Where(u => u.Exercise_ID == id).FirstOrDefault();


            db.Exercises.Remove(excercise);
            db.SaveChanges();

            return true;
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ExerciseExists(int id)
        {
            return db.Exercises.Count(e => e.Exercise_ID == id) > 0;
        }

    }
}
