using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using u16073861_INF354_HW1.Models;
using System.Web.Http.Cors;
using System.Dynamic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Web.Http.Description;

namespace u16073861_INF354_HW1.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class SystemController : ApiController
    {
        Tuks_Athletics_SystemEntities db = new Tuks_Athletics_SystemEntities();

        //ADD ---> Users --------------------------------------------------------------------------Needed for REGISTRATION?
        [System.Web.Http.Route("api/System/addUsers")]
        [System.Web.Mvc.HttpPost]
        public List<dynamic> addUsers([FromBody] Coach coach)
        {
            db.Configuration.ProxyCreationEnabled = false;
            db.Coaches.Add(coach);
            db.SaveChanges();
            return getUsersReturnList(db.Coaches.ToList());
        }
        //////////

        [System.Web.Http.Route("api/System/getAllUsers")]
        [System.Web.Mvc.HttpPost]
        public List<dynamic> getAllUsers()
        {
            db.Configuration.ProxyCreationEnabled = false;
            return getUsersReturnList(db.Coaches.ToList());
        }

        private List<dynamic> getUsersReturnList(List<Coach> forSystem)
        {
            List<dynamic> dynamicUsers = new List<dynamic>();
            foreach (Coach user in forSystem)
            {
                dynamic dynamicUser = new ExpandoObject();


                dynamicUser.Name = user.Name;
                dynamicUser.Surname = user.Surname;
                dynamicUser.Email = user.Email;
                dynamicUser.Description = user.Description;
                dynamicUser.Coach_ID = user.Coach_ID;


                dynamicUsers.Add(dynamicUser);
            }
            return dynamicUsers;
        }
        ////////////////////////////////////////////////////////////////////////////////////
        //UPDATE ---> Owners

        [System.Web.Http.Route("api/System/UpdateOwner{id}")]
        [System.Web.Mvc.HttpPut]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCoach(int id, CRUDviewmodel coach)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != coach.Coach_ID)
            {
                return BadRequest();
            }

            // db.Entry(coach).State = EntityState.Modified;
            using (var ctx = new Tuks_Athletics_SystemEntities())
            {
                var curCoach = ctx.Coaches.Where(s => s.Coach_ID == coach.Coach_ID).FirstOrDefault();

                if (curCoach != null)
                {
                    curCoach.Name = coach.Name;
                    curCoach.Surname = coach.Surname;
                    curCoach.Email = coach.Email;
                    curCoach.Description = coach.Description;
                }
                try

                {
                    ctx.SaveChanges();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!CoachExists(id))
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

        [System.Web.Http.Route("api/System/DeleteCoach")]
        [System.Web.Mvc.HttpDelete]
        // DELETE: api/Coaches/5
        [ResponseType(typeof(Coach))]
        public IHttpActionResult DeleteCoach(int id)
        {
            Coach coach = db.Coaches.Find(id);
            if (coach == null)
            {
                return NotFound();
            }

            db.Coaches.Remove(coach);
            db.SaveChanges();

            return Ok(coach);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CoachExists(int id)
        {
            return db.Coaches.Count(e => e.Coach_ID == id) > 0;
        }
        [System.Web.Http.Route("api/System/UpdateUser{id}")]
        [System.Web.Mvc.HttpPut]
        // PUT: api/UsersScaffold/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutUser(int id, UserVM user)

        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != user.User_ID)
            {
                return BadRequest();
            }

            // db.Entry(coach).State = EntityState.Modified;
            using (var ctx = new Tuks_Athletics_SystemEntities())
            {

                var curCoach = ctx.Users.Where(zz => zz.Type_ID == user.Type_ID).FirstOrDefault();
                if (curCoach != null)
                {
                    curCoach.Name = user.Name;
                    curCoach.Surname = user.Surname;
                    curCoach.Email = user.Email;
                    curCoach.Role.Name = ctx.Roles.Include(x => x.Users).Where(zz => db.Users.Any(xx => xx.Type_ID == zz.ID)).FirstOrDefault().Name;
                    curCoach.Type_ID = user.Type_ID;

                }
                try

                {
                    ctx.SaveChanges();
                }

                catch (DbUpdateConcurrencyException)
                {
                    if (!UserExists(id))
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
        [System.Web.Http.Route("api/System/DeleteUser")]
        [System.Web.Mvc.HttpDelete]

        // DELETE: api/UsersScaffold/5
        [ResponseType(typeof(User))]
        public IHttpActionResult DeleteUser(int id)
        {
            User user = db.Users.Find(id);
            if (user == null)
            {
                return NotFound();
            }

            db.Users.Remove(user);
            db.SaveChanges();

            return Ok(user);
        }


        private bool UserExists(int id)
        {
            return db.Users.Count(e => e.User_ID == id) > 0;
        }


        [System.Web.Http.Route("api/System/getUser")]
        [System.Web.Mvc.HttpPost]
        public List<dynamic> getUsers()
        {
            db.Configuration.ProxyCreationEnabled = false;
            return getUsersList(db.Users.ToList());
        }

        private List<dynamic> getUsersList(List<User> forSystem)
        {
            List<dynamic> dynamicUsers = new List<dynamic>();
            foreach (User user in forSystem)
            {
                dynamic dynamicUser = new ExpandoObject();

                dynamicUser.User_ID = user.User_ID;
                dynamicUser.Name = user.Name;
                dynamicUser.Surname = user.Surname;
                dynamicUser.Email = user.Email;
                dynamicUser.Type_ID = user.Type_ID;
                //              dynamicUser.Role.Name = db.Roles.Include(x => x.Users).Where(zz => db.Users.Any(xx => xx.Type_ID == zz.ID)).FirstOrDefault().Name; 


                dynamicUsers.Add(dynamicUser);
            }
            return dynamicUsers;
        }
        ////////////////////////////////////////////////////////////////////////////////////
        //UPDATE ---> Owners
    }
}
