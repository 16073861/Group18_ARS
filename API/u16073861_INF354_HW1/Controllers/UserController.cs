using System.Web.Http.Cors;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Dynamic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using u16073861_INF354_HW1.Models;
using System.Globalization;
using System.Data.Entity.Infrastructure;
using System.Data.Sql;
using System.Data.SqlClient;
using System.Configuration;
using System.Threading.Tasks;
using System.Security.Claims;
using System.Net.Mail;
using System.Net;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

namespace User_API.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class UserController : ApiController
    {
        Tuks_Athletics_SystemEntities db = new Tuks_Athletics_SystemEntities();


        [System.Web.Http.Route("api/User/GetAllUsers")]
        [System.Web.Mvc.HttpPost]
        public List<dynamic> GetAllUsers()
        {
            //var Token = Request.Headers.FirstOrDefault(k => k.Key.Equals("Authorization")).Value;

            //var identity = (ClaimsIdentity)User.Identity;
            //IEnumerable<Claim> claims = identity.Claims;

            db.Configuration.ProxyCreationEnabled = false;


            return GetUserReturnList(db.Users.ToList());
        }

        private List<dynamic> GetUserReturnList(List<User> ForClent)
        {
            List<dynamic> DynamicUsers = new List<dynamic>();

            foreach (User user in ForClent)
            {
                dynamic dynamicUser = new ExpandoObject();

                dynamicUser.User_ID = user.User_ID;
                dynamicUser.Name = user.Name;
                dynamicUser.Surname = user.Surname;
                dynamicUser.Email = user.Email;
                dynamicUser.Type_ID = user.Type_ID;
                dynamicUser.Phone_Number = user.Phone_Number;


                DynamicUsers.Add(dynamicUser);
            }

            return DynamicUsers;
        }

        //
        //LOGIN

        //----------------------------- User LogIn ------------------------//
        [System.Web.Http.Route("api/User/getProfile{id}")]
        [System.Web.Mvc.HttpGet]
        public dynamic getProfile(UserVM usr, int id)
        {
            //dynamic thisObject = new ExpandoObject();
            var currentUser = db.Users.Where(zz => zz.User_ID == id).FirstOrDefault();
            currentUser.Email = usr.Email;
            currentUser.Name = usr.Name;
            currentUser.Surname = usr.Surname;
            var user = db.Users.ToList();
            return user;
        }

        [System.Web.Http.Route("api/Values/GetUserRole")]
        [System.Web.Mvc.HttpGet]
        public string GetUserRole(string UserEmail)
        {

            Tuks_Athletics_SystemEntities db = new Tuks_Athletics_SystemEntities();
            db.Configuration.ProxyCreationEnabled = false;

            string UserRole = db.Users.Where(usr => usr.Email == UserEmail).FirstOrDefault().Type_ID.ToString();


            // var thisRole = db.Roles.Where(XX => XX.ID == zz.Type_ID).FirstOrDefault();
            //userdata.Type_ID = userdata.Type_ID;
            return UserRole;


        }
        ////----------------------------- Add User ------------------------//

        [System.Web.Http.Route("api/User/ForgotPassword")]
        [System.Web.Mvc.HttpPost]
        public async Task<string> ForgotPassword(string email)
        {

            var user = await db.Users.Include(u => u.Role).Where(u => u.Email.ToLower() == email.ToLower()).FirstOrDefaultAsync();
            string toReturn = "";
            if (user != null)
            {

                var emails = new List<string>
                {
                    user.Email
                };


                using (var message = new MailMessage("TuksAthleticsSystem@gmail.com", user.Email))
                {
                    message.Subject = "Test";
                    message.Body = GetForgotPasswordBody(user);
                    message.IsBodyHtml = true;
                    using (SmtpClient client = new SmtpClient
                    {
                        EnableSsl = true,
                        Host = "smtp.gmail.com",
                        Port = 587,
                        Credentials = new NetworkCredential("TuksAthleticsSystem@gmail.com", "tuks@tuks")

                    })
                    {
                        client.Send(message);
                    }
                }// using

                return toReturn = "Found";


            }
            else
            {
                return toReturn = "NotFound";
            }
        }

        public string GetForgotPasswordBody(User user)
        {
            string Domain = "http://localhost:4200/";

            //string url = Domain + "api/User/ConfirmEmail?id=" + user.UserID;
            //string token = GetToken(user);
            string url = Domain + "passwordreset;EMAIL=" + user.Email;

            return string.Format(@"<div style='text-align:center;'>
                                    <h1>Hi {1}, So you forgot your password? That's Okay :),</h1>
                                    <h1>WE GOT YOU! </h1>
                                    <h3>Click below</h3>
                                      <a href='{0}' style=' display: block;
                                                                    text-align: center;
                                                                    font-weight: bold;
                                                                    background-color: #008CBA;
                                                                    font-size: 16px;
                                                                    border-radius: 10px;
                                                                    color:#ffffff;
                                                                    cursor:pointer;
                                                                    width:100%;
                                                                    padding:10px;'>
                                        Reset Password
                                      </a>
                                    </form>
                                </div>", url, user.Name);
        }

        [System.Web.Http.Route("api/User/ResetPassword")]
        [System.Web.Mvc.HttpPost]
        public bool ChangePassword(string email, User user)
        {
            db.Configuration.ProxyCreationEnabled = false;

            User usr = db.Users.Where(z => z.Email == email).FirstOrDefault();

            var hash = ComputeSha256Hash(user.Password);

            usr.User_ID = usr.User_ID;
            usr.Type_ID = usr.Type_ID;

            usr.Password = hash;
            usr.Name = usr.Name;
            usr.Surname = usr.Surname;
            usr.Email = usr.Email;
            usr.Phone_Number = usr.Phone_Number;
            //  Guid g = Guid.NewGuid();

            // db.Entry(usr).State = EntityState.Modified;
            //await db.SaveChangesAsync();
            db.SaveChanges();

            return true;

        }

        /*[System.Web.Http.AllowAnonymous]
        [System.Web.Http.Route("api/User/LogIn")]
        [System.Web.Mvc.HttpPost]
        public string LogIn([FromBody] User LogIn)
        {

            Tuks_Athletics_SystemEntities db = new Tuks_Athletics_SystemEntities();
            db.Configuration.ProxyCreationEnabled = false;

            string UserName = LogIn.Email.ToLower().Trim('"');
            string Password = LogIn.Password.Trim('"');
            //var UserRole = 
            Password = ComputeSha256Hash(Password);

            var userdata = db.Users.Where(u => u.Email.ToLower() == UserName && u.Password == Password).FirstOrDefault();

            // dynamic toReturn = new ExpandoObject();
            //var thisRole = db.Roles.Where(XX => XX.ID == CurrentUser.Type_ID).FirstOrDefault();
            //userdata.Type_ID = userdata.Type_ID;

            if (userdata != null)
            {
                return "Not Found";
            }
            else
            {
                //  CurrentUser.Type_ID.ToString();// = thisRole.Name;
                return "Found";
            }


        }*/
        ///

        [System.Web.Http.AllowAnonymous]
        [System.Web.Http.Route("api/User/AddUser")]
        [System.Web.Mvc.HttpPost]
        public bool AddUser([FromBody] User user, int selection)
        {

            if (user != null)
            {

                user.Type_ID = selection;
                db.Configuration.ProxyCreationEnabled = false;
                // user.Email = EmailExists(user.Email.ToString());
                user.Name = user.Name;
                var HashedPassword = ComputeSha256Hash(user.Password);
                user.Password = HashedPassword;
                user.Surname = user.Surname;
                user.Role = user.Role;
                user.Email = user.Email;
                ////user.User_role = user.User_role;
                db.Users.Add(user);
                db.SaveChanges();

                return (true);
                //}
            }


            return false;
        }


        private bool CoachExists(int id)
        {
            return db.Users.Count(e => e.Type_ID == id) > 0;
        }

        string ComputeSha256Hash(string RawData) // I prefer my data RAW, no salt for me please
        {
            using (SHA256 Sha256Hash = SHA256.Create())
            {
                byte[] pBytes = Sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(RawData));

                StringBuilder MyPassword = new StringBuilder();
                for (int i = 0; i < RawData.Length; i++)
                {
                    MyPassword.Append(pBytes[i].ToString("x2"));
                }
                return MyPassword.ToString();
            }
        }


        [System.Web.Http.Route("api/Values/UpdateUser")]
        [System.Web.Mvc.HttpPost]
        [System.Web.Http.Authorize(Roles = "Admin")]
        public bool UpdateUser([FromBody] User user)
        {
            db.Configuration.ProxyCreationEnabled = false;
            db.Entry(user).State = System.Data.Entity.EntityState.Modified;
            db.SaveChanges();

            return true;
        }

        //------ Delet User ----------------- //

        [System.Web.Http.Route("api/Values/DeleteUser")]
        [System.Web.Mvc.HttpDelete]
        [System.Web.Http.Authorize(Roles = "Admin")]
        public bool DeleteUser(int Id)
        {
            db.Configuration.ProxyCreationEnabled = false;

            User UserToDelete = db.Users.Where(u => u.User_ID == Id).FirstOrDefault();

            db.Users.Remove(UserToDelete);
            db.SaveChanges();

            return true;
        }



        //Hashing
        public static string Spice(string input)
        {
            return input + "we678etyui7723drthml";
        }

        public static string GenerateHash(string input)
        {
            SHA256 sHA = SHA256Managed.Create();
            byte[] bytes = Encoding.UTF8.GetBytes(input);
            byte[] hash = sHA.ComputeHash(bytes);
            return GetFromHash(hash);
        }
        private static string GetFromHash(byte[] hash)
        {
            StringBuilder result = new StringBuilder();
            for (int i = 0; i < hash.Length; i++)
            {
                result.Append(hash[i].ToString("X2"));
            }
            return result.ToString();
        }
        public static string RandomString(int length)
        {
            Random myRandom = new Random();
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length).Select(s => s[myRandom.Next(s.Length)]).ToArray());
        }
        //---------------------------------------------- Anime Section -------------------------------------//

        //----------Get all Anime--------------- //


        [System.Web.Http.Route("api/User/GetAllAnime")]
        [System.Web.Mvc.HttpPost]
        public List<dynamic> GetAllAnime()
        {
            //var Token = Request.Headers.FirstOrDefault(k => k.Key.Equals("Authorization")).Value;

            //var identity = (ClaimsIdentity)User.Identity;
            //IEnumerable<Claim> claims = identity.Claims;

            db.Configuration.ProxyCreationEnabled = false;


            return GetAnimeReturnList(db.Admins.ToList());
        }

        private List<dynamic> GetAnimeReturnList(List<Admin> ForClent)
        {
            List<dynamic> DynamicAnime = new List<dynamic>();

            foreach (Admin anime in ForClent)
            {
                dynamic dynamicAnime = new ExpandoObject();

                dynamicAnime.Admin_ID = anime.Admin_ID;
                dynamicAnime.Name = anime.Name;
                dynamicAnime.Surname = anime.Surname;
                dynamicAnime.Email = anime.Email;
                dynamicAnime.ID_Number = anime.ID_Number;
                DynamicAnime.Add(dynamicAnime);
            }

            return DynamicAnime;
        }

        //--------------Add Anime--------------- //

        [System.Web.Http.Route("api/User/AddAnime")]
        [System.Web.Mvc.HttpPost]
        public bool AddAnime([FromBody] Admin anime)
        {
            if (anime != null)
            {
                db.Configuration.ProxyCreationEnabled = false;

                db.Admins.Add(anime);
                db.SaveChanges();

                return true;
            }
            return false;
        }

        //---------------Update Anime --------------

        [System.Web.Http.Route("api/User/UpdateAnime")]
        [System.Web.Mvc.HttpPost]
        public bool UpdateAnime([FromBody] Admin anime)
        {
            db.Configuration.ProxyCreationEnabled = false;
            db.Entry(anime).State = System.Data.Entity.EntityState.Modified;
            db.SaveChanges();

            return true;
        }

        //------ DeleteAnime ----------------- //

        [System.Web.Http.Route("api/User/DeleteAnime")]
        [System.Web.Mvc.HttpDelete]
        public bool DeleteAnime(int Id)
        {
            db.Configuration.ProxyCreationEnabled = false;

            Admin AnimeToDelete = db.Admins.Where(a => a.Admin_ID == Id).FirstOrDefault();

            db.Admins.Remove(AnimeToDelete);
            db.SaveChanges();

            return true;
        }

        // New Login
        [System.Web.Http.Route("api/User/LogIn")]
        [System.Web.Mvc.HttpPost]
        public object LogIn(User user)
        {


            db.Configuration.ProxyCreationEnabled = false;

            var Password = ComputeSha256Hash(user.Password);

            User userdata = db.Users.Where(u => u.Email.ToLower() == user.Email && u.Password == Password).FirstOrDefault();

            // dynamic toReturn = new ExpandoObject();
            //var thisRole = db.Roles.Where(XX => XX.ID == CurrentUser.Type_ID).FirstOrDefault();
            //userdata.Type_ID = userdata.Type_ID;
            dynamic toReturn = new ExpandoObject();
            if (userdata != null)
            {
                Guid g = Guid.NewGuid();
                db.Entry(userdata).State = EntityState.Modified;
                //db.SaveChanges();
                toReturn.Enter = "Welcome";
                toReturn.Token = GetToken(userdata);
                return toReturn;
            }
            else
            {
                toReturn.Denied = "Incorrect Password and User Name";
                return toReturn;
            }


        }
        ///
        public string GetToken([FromBody] User user)
        {
            db.Configuration.ProxyCreationEnabled = false;
            string key = "qwertyuioplkjhgf";
            var issuer = "http://mysite.com";

            var SecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
            var credentials = new SigningCredentials(SecurityKey, SecurityAlgorithms.HmacSha256);

            var perClaims = new List<Claim>();
            perClaims.Add(new Claim("User_ID", user.User_ID.ToString()));
            perClaims.Add(new Claim("Type_ID", user.Type_ID.ToString()));
            perClaims.Add(new Claim("Role", db.Roles.Where(z => z.ID == user.Type_ID).FirstOrDefault().Name.ToString()));

            var token = new JwtSecurityToken(issuer, issuer, perClaims, signingCredentials: credentials);
            var jwtToken = new JwtSecurityTokenHandler().WriteToken(token);
            return jwtToken;
        }

    }
}