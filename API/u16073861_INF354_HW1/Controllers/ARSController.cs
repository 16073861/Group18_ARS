using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using u16073861_INF354_HW1.Models;
using System.Web.Http.Cors;
using System.Dynamic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Net;
using System.Net.Http;
using System.Web.Http.Description;
//using Deliverable.ViewModels;

namespace u16073861_INF354_HW1.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ARSController : ApiController
    {
        Tuks_Athletics_SystemEntities db = new Tuks_Athletics_SystemEntities();

        //ADD ---> Users --------------------------------------------------------------------------Needed for REGISTRATION?
        [System.Web.Http.Route("api/Program/addProgram")]
        [System.Web.Mvc.HttpPost]
        public List<dynamic> addPrograms([FromBody] Program program)
        {
            db.Configuration.ProxyCreationEnabled = false;
            db.Programs.Add(program);
            db.SaveChanges();
            return getProgramsReturnList(db.Programs.ToList());
        }
        //////////

        [System.Web.Http.Route("api/Program/getAllPrograms")]
        [System.Web.Mvc.HttpPost]
        public List<dynamic> getAllPrograms()
        {
            db.Configuration.ProxyCreationEnabled = false;
            return getProgramsReturnList(db.Programs.ToList());
        }

        private List<dynamic> getProgramsReturnList(List<Program> forProgram)
        {
            List<dynamic> dynamicPrograms = new List<dynamic>();
            foreach (Program prog in forProgram)
            {
                dynamic dynamicProgram = new ExpandoObject();


                dynamicProgram.Coach_ID = prog.Coach_ID;
                dynamicProgram.Name = prog.Name;
                dynamicProgram.Description = prog.Description;
                dynamicProgram.Program_ID = prog.Program_ID;

                dynamicPrograms.Add(dynamicProgram);
            }
            return dynamicPrograms;
        }
        ////////////////////////////////////////////////////////////////////////////////////
        //UPDATE ---> Owners

        [System.Web.Http.Route("api/Program/UpdateProgram{id}")]
        [System.Web.Mvc.HttpPut]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCoach(int id, Program program)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != program.Program_ID)
            {
                return BadRequest();
            }

            // db.Entry(coach).State = EntityState.Modified;
            using (var ctx = new Tuks_Athletics_SystemEntities())
            {
                var curProgram = ctx.Programs.Where(s => s.Program_ID == program.Program_ID).FirstOrDefault();

                if (curProgram != null)
                {
                    curProgram.Program_ID = program.Program_ID;
                    curProgram.Coach_ID = program.Coach_ID;
                    curProgram.Name = program.Name;
                    curProgram.Description = program.Description;

                }
                try

                {
                    ctx.SaveChanges();
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
            }
            return StatusCode(HttpStatusCode.NoContent);
        }

        [System.Web.Http.Route("api/Program/DeleteProgram")]
        [System.Web.Mvc.HttpDelete]
        // DELETE: api/Coaches/5

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
        //}
        //[ResponseType(typeof(Program))]
        //public bool DeleteProgram(int id)
        //{
        //    db.Configuration.ProxyCreationEnabled = false;
        //    Program program = db.Programs.Where(u=>u.Program_ID == id).FirstOrDefault();


        //    db.Programs.Remove(program);
        //    db.SaveChanges();

        //    return true;
        //}

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





        //[System.Web.Http.Route("api/Program/UpdateProgram{id}")]
        //[System.Web.Mvc.HttpPut]
        //// PUT: api/UsersScaffold/5
        //[ResponseType(typeof(void))]
        //public IHttpActionResult PutProgram(int id, UserVM user)

        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    if (id != user.User_ID)
        //    {
        //        return BadRequest();
        //    }

        //    // db.Entry(coach).State = EntityState.Modified;
        //    using (var ctx = new Tuks_Athletics_SystemEntities2())
        //    {

        //        var curCoach = ctx.Users.Where(zz => zz.Type_ID == user.Type_ID).FirstOrDefault();
        //        if (curCoach != null)
        //        {
        //            curCoach.Name = user.Name;
        //            curCoach.Surname = user.Surname;
        //            curCoach.Email = user.Email;
        //            curCoach.Role.Name = ctx.Roles.Include(x => x.Users).Where(zz => db.Users.Any(xx => xx.Type_ID == zz.ID)).FirstOrDefault().Name;
        //            curCoach.Type_ID = user.Type_ID;

        //        }
        //        try

        //        {
        //            ctx.SaveChanges();
        //        }

        //        catch (DbUpdateConcurrencyException)
        //        {
        //            if (!UserExists(id))
        //            {
        //                return NotFound();
        //            }
        //            else
        //            {
        //                throw;
        //            }
        //        }
        //    }
        //    return StatusCode(HttpStatusCode.NoContent);
        //}
        //[System.Web.Http.Route("api/System/DeleteUser")]
        //[System.Web.Mvc.HttpDelete]

        //// DELETE: api/UsersScaffold/5
        //[ResponseType(typeof(User))]
        //public IHttpActionResult DeleteUser(int id)
        //{
        //    User user = db.Users.Find(id);
        //    if (user == null)
        //    {
        //        return NotFound();
        //    }

        //    db.Users.Remove(user);
        //    db.SaveChanges();

        //    return Ok(user);
        //}


        //private bool UserExists(int id)
        //{
        //    return db.Users.Count(e => e.User_ID == id) > 0;
        //}


        //[System.Web.Http.Route("api/System/getUser")]
        //[System.Web.Mvc.HttpPost]
        //public List<dynamic> getUsers()
        //{
        //    db.Configuration.ProxyCreationEnabled = false;
        //    return getUsersList(db.Users.ToList());
        //}

        //private List<dynamic> getUsersList(List<User> forSystem)
        //{
        //    List<dynamic> dynamicUsers = new List<dynamic>();
        //    foreach (User user in forSystem)
        //    {
        //        dynamic dynamicUser = new ExpandoObject();

        //        dynamicUser.User_ID = user.User_ID;
        //        dynamicUser.Name = user.Name;
        //        dynamicUser.Surname = user.Surname;
        //        dynamicUser.Email = user.Email;
        //        dynamicUser.Type_ID = user.Type_ID;
        //        //              dynamicUser.Role.Name = db.Roles.Include(x => x.Users).Where(zz => db.Users.Any(xx => xx.Type_ID == zz.ID)).FirstOrDefault().Name;


        //        dynamicUsers.Add(dynamicUser);
        //    }
        //    return dynamicUsers;
        //}
        //////////////////////////////////////////////////////////////////////////////////////
        ////UPDATE ---> Owners
    }
}
