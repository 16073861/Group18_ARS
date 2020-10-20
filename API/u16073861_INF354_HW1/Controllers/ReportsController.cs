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


namespace u16073861_INF354_HW1.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ReportsController : ApiController
    {
        Tuks_Athletics_SystemEntities db = new Tuks_Athletics_SystemEntities();
        ////Competitions Report
        [System.Web.Http.Route("api/Report/CompetitionReport")]
        [System.Web.Mvc.HttpGet]

        public List<dynamic> GetAllCompetitions(DateTime StartDate, DateTime EndDate)
        {

            db.Configuration.ProxyCreationEnabled = false;

            List<Competition> Dates = new List<Competition>();
            Dates = db.Competitions.Where(z => z.Date >= StartDate && z.Date <= EndDate).ToList();

            return GetCompList(db.Competitions.ToList());
        }

        private List<dynamic> GetCompList(List<Competition> ForClent)
        {
            List<dynamic> DynamicUsers = new List<dynamic>();

            dynamic toReturn = new ExpandoObject();
            foreach (Competition competition in ForClent)
            {

                dynamic Comp = new ExpandoObject();
                Comp.Competition_ID = competition.Competition_ID;
                Comp.Name = competition.Name;
                Comp.CompetitionType = db.CompetitionTypes.Where(zz => zz.CompetitionType_ID == competition.CompetitionType_ID).FirstOrDefault().CompType;
                Comp.District = db.Districts.Where(zz => zz.District_ID == competition.District_ID).FirstOrDefault().Name;
                Comp.Venue = db.Venues.Where(zz => zz.Venue_ID == competition.Venue_ID).FirstOrDefault().Name;
                Comp.Date = competition.Date;
                // Comp.Event = db.Performances.Where(zz => zz.Competition_ID == competition.Competition_ID).FirstOrDefault().Event.Description;





                DynamicUsers.Add(Comp);
            }
            toReturn.DynamicUsers = DynamicUsers;
            return DynamicUsers;
        }

        //get All performances for a competition

        [System.Web.Http.Route("api/Report/AllPerformancesPerComp")]
        [System.Web.Http.HttpGet]
        public object AllPerformancesPerComp(string CompName, string Event, string Heat)
        {


            var CompPer = db.Performances.Where(zz => zz.Competition.Name == CompName && zz.Event.Description == Event && zz.Heat.Heat1 == Heat).ToList();
            dynamic ToReturn = new ExpandoObject();
            if (CompPer.Count == 0)
            {
                //string error;
                ToReturn.error = "This Item does not exist";
                return ToReturn /* as List<dynamic> */ ;
            }
            else
            {
                return Per(CompPer.OrderBy(zz => zz.Result).ToList());

            }




        }

        public List<dynamic> Per(List<Performance> ForClent)
        {


            List<dynamic> DynamicUsers = new List<dynamic>();
            //{
            dynamic toReturn = new ExpandoObject();
            foreach (Performance competition in ForClent)
            {
                //dynamic Comp = new ExpandoObject();
                dynamic Comp = new ExpandoObject();
                //Comp = db.Performances.Where(xx => xx.Athlete.Name == name).OrderBy(x => x.Result).FirstOrDefault();

                Comp.Athlete = db.Athletes.Where(zz => zz.Athlete_ID == competition.Athlete_ID).FirstOrDefault().Name;
                Comp.Surname = db.Athletes.Where(zz => zz.Athlete_ID == competition.Athlete_ID).FirstOrDefault().Surname;
                Comp.ID_Number = db.Athletes.Where(zz => zz.Athlete_ID == competition.Athlete_ID).FirstOrDefault().ID_Number;
                Comp.Club = db.Clubs.Where(zz => zz.Club_ID == competition.Athlete.Club_ID).FirstOrDefault().Name;
                Comp.Heat = db.Heats.Where(zz => zz.Heat_ID == competition.Heat_ID).FirstOrDefault().Heat1;
                Comp.Event = db.Events.Where(zz => zz.Event_ID == competition.Event_ID).FirstOrDefault().Description;
                // Comp.Date = competition.Date;
                Comp.Performance = competition.Result;



                DynamicUsers.Add(Comp);

                //}


                //}


            }
            toReturn = DynamicUsers;
            return DynamicUsers;
        }


        //get all events

        [System.Web.Http.Route("api/Report/AllEvents")]
        [System.Web.Http.HttpGet]
        public List<dynamic> AllEvents()

        {
            db.Configuration.ProxyCreationEnabled = false;
            return Events(db.Events.ToList());

        }
        public List<dynamic> Events(List<Event> ForClent)
        {
            List<dynamic> DynamicUsers = new List<dynamic>();

            foreach (Event competition in ForClent)
            {
                dynamic Comp = new ExpandoObject();
                Comp.Description = competition.Description;
                DynamicUsers.Add(Comp);
            }
            return DynamicUsers;

        }
        //ALL HEATS
        [System.Web.Http.Route("api/Report/AllHeats")]
        [System.Web.Http.HttpGet]
        public List<dynamic> AllHeats()

        {
            db.Configuration.ProxyCreationEnabled = false;
            return Heats(db.Heats.ToList());

        }
        public List<dynamic> Heats(List<Heat> ForClent)
        {
            List<dynamic> DynamicUsers = new List<dynamic>();

            foreach (Heat competition in ForClent)
            {
                dynamic Comp = new ExpandoObject();
                Comp.Heat = competition.Heat1;
                DynamicUsers.Add(Comp);
            }
            return DynamicUsers;

        }

        //
        [System.Web.Http.Route("api/Report/AthletePerformances")]
        [System.Web.Http.HttpGet]
        public object AthletePerformances(DateTime StartDate, DateTime EndDate, string id, string Event)

        {
            db.Configuration.ProxyCreationEnabled = false;
            //List<Performance> Dates = new List<Performance>();


            var Dates = db.Performances.Where(z => z.Athlete.ID_Number == id && z.Date >= StartDate && z.Date <= EndDate && z.Event.Description == Event).OrderBy(z => z.Result).ThenBy(n => n.Date).ToList();
            dynamic ToReturn = new ExpandoObject();
            if (Dates.Count == 0)
            {
                //string error;
                ToReturn.error = "This Item does not exist";
                return ToReturn /* as List<dynamic> */ ;
            }
            else
            {
                return Performaance(Dates.ToList()).ToList();

            }

        }


        public List<dynamic> Performaance(List<Performance> ForClent)
        {


            List<dynamic> DynamicUsers = new List<dynamic>();
            //{

            foreach (Performance competition in ForClent)
            {
                dynamic Comp = new ExpandoObject();
                //dynamic Comp = new ExpandoObject();
                // Comp = db.Performances.Where(xx => xx.Athlete.Name == name).OrderBy(x => x.Result).FirstOrDefault();

                Comp.Athlete = db.Athletes.Where(zz => zz.Athlete_ID == competition.Athlete_ID).FirstOrDefault().Name;
                Comp.Competition = db.Competitions.Where(zz => zz.Competition_ID == competition.Competition_ID).FirstOrDefault().Name;
                Comp.Event = db.Events.Where(zz => zz.Event_ID == competition.Event_ID).FirstOrDefault().Description;
                Comp.Date = competition.Date;
                Comp.Performance = competition.Result;
                Comp.Heat = db.Heats.Where(zz => zz.Heat_ID == competition.Heat_ID).FirstOrDefault().Heat1;
                Comp.Surname = db.Athletes.Where(zz => zz.Athlete_ID == competition.Athlete_ID).FirstOrDefault().Surname;


                DynamicUsers.Add(Comp);

            }
            return DynamicUsers;

            //}


        }

        ////Competitions Report
        [System.Web.Http.Route("api/Report/Competition")]
        [System.Web.Mvc.HttpGet]

        public List<dynamic> GetCompetitions()
        {

            db.Configuration.ProxyCreationEnabled = false;

            return CompList(db.Competitions.ToList());
        }

        private List<dynamic> CompList(List<Competition> ForClent)
        {
            List<dynamic> DynamicUsers = new List<dynamic>();

            dynamic toReturn = new ExpandoObject();
            foreach (Competition competition in ForClent)
            {

                dynamic Comp = new ExpandoObject();
                Comp.Competition_ID = competition.Competition_ID;
                Comp.Name = competition.Name;
                Comp.CompetitionType = db.CompetitionTypes.Where(zz => zz.CompetitionType_ID == competition.CompetitionType_ID).FirstOrDefault().CompType;
                Comp.District = db.Districts.Where(zz => zz.District_ID == competition.District_ID).FirstOrDefault().Name;
                Comp.Venue = db.Venues.Where(zz => zz.Venue_ID == competition.Venue_ID).FirstOrDefault().Name;
                Comp.Date = competition.Date;
                // Comp.Event = db.Performances.Where(zz => zz.Competition_ID == competition.Competition_ID).FirstOrDefault().Event.Description;





                DynamicUsers.Add(Comp);
            }
            toReturn.DynamicUsers = DynamicUsers;
            return DynamicUsers;
        }
        [System.Web.Http.Route("api/Report/Athlete")]
        [System.Web.Mvc.HttpGet]

        public List<dynamic> getAthletes()
        {

            db.Configuration.ProxyCreationEnabled = false;

            return getAth(db.Athletes.OrderBy(z => z.Name).ToList());
        }

        private List<dynamic> getAth(List<Athlete> ForClent)
        {
            List<dynamic> DynamicUsers = new List<dynamic>();

            dynamic toReturn = new ExpandoObject();
            foreach (Athlete competition in ForClent)
            {

                dynamic Comp = new ExpandoObject();
                Comp.Athlete_ID = competition.Athlete_ID;
                Comp.Name = competition.Name;
                Comp.Points = competition.Points;
                Comp.Surname = competition.Surname;
                Comp.ID_Number = competition.ID_Number;
                Comp.Status_ID = competition.Status_ID;
                Comp.Description = competition.Description;
                Comp.Club_ID = competition.Club_ID;
                Comp.Gender_ID = competition.Gender_ID;
                Comp.User_ID = competition.User_ID;

                DynamicUsers.Add(Comp);
            }
            toReturn.DynamicUsers = DynamicUsers;
            return DynamicUsers;
        }
        [System.Web.Http.Route("api/Report/gettop10AllTime")]
        [System.Web.Mvc.HttpGet]
        public object gettop10(string Event)
        {
            List<dynamic> dyno = new List<dynamic>();
            //for (int i=0;i<=5;i++)
            //{
            var xx = Perfo(db.Performances.Where(z => z.Event.Description == Event).OrderBy(z => z.Result).Take(10).ToList());


            dynamic ToReturn = new ExpandoObject();
            if (xx.Count == 0)
            {
                //string error;
                ToReturn.error = "This Item does not exist";
                return ToReturn /* as List<dynamic> */ ;
            }
            else
            {
                dyno.Add(xx);
                return xx;

            }

        }
        public List<dynamic> Perfo(List<Performance> ForClent)
        {


            List<dynamic> DynamicUsers = new List<dynamic>();
            //{

            foreach (Performance competition in ForClent)
            {
                dynamic Comp = new ExpandoObject();
                //dynamic Comp = new ExpandoObject();
                // Comp = db.Performances.Where(xx => xx.Athlete.Name == name).OrderBy(x => x.Result).FirstOrDefault();

                Comp.Athlete = db.Athletes.Where(zz => zz.Athlete_ID == competition.Athlete_ID).FirstOrDefault().Name;
                Comp.Competition = db.Competitions.Where(zz => zz.Competition_ID == competition.Competition_ID).FirstOrDefault().Name;
                Comp.Event = db.Events.Where(zz => zz.Event_ID == competition.Event_ID).FirstOrDefault().Description;
                Comp.Date = competition.Date;
                Comp.Performance = competition.Result;
                Comp.Heat = db.Heats.Where(zz => zz.Heat_ID == competition.Heat_ID).FirstOrDefault().Heat1;
                Comp.Surname = db.Athletes.Where(zz => zz.Athlete_ID == competition.Athlete_ID).FirstOrDefault().Surname;


                DynamicUsers.Add(Comp);

            }
            return DynamicUsers;

            //}


        }

        // All Records
        [System.Web.Http.Route("api/Report/Records")]
        [System.Web.Http.HttpGet]
        public List<dynamic> Records()

        {
            db.Configuration.ProxyCreationEnabled = false;
            return Record(db.Events.OrderBy(z => z.Description).ToList());

        }
        public List<dynamic> Record(List<Event> ForClent)
        {
            List<dynamic> DynamicUsers = new List<dynamic>();

            foreach (Event competition in ForClent)
            {
                dynamic Comp = new ExpandoObject();
                Comp.Event = competition.Description;
                var Result = db.Performances.OrderBy(z => z.Result).Where(z => z.Event.Description == competition.Description).FirstOrDefault();
                Comp.Result = Result.Result;
                // Comp.Competition = Result.Competition.Name;
                //Comp.Surname = db.Performances.Where(z => z.Result == Result.Result.ToString()).FirstOrDefault().Athlete.Surname;
                Comp.Date = Result.Date;
                DynamicUsers.Add(Comp);
            }
            return DynamicUsers;

        }
        //Rank According to Points
        [System.Web.Http.Route("api/Report/Ranking")]
        [System.Web.Mvc.HttpGet]

        public object getRanking(string Seasons)
        {

            db.Configuration.ProxyCreationEnabled = false;
            var Season = db.Athlete_Season_Event.Where(zz => zz.Season.Description == Seasons).OrderBy(zz => zz.Athlete.Points).Take(10).ToList();

            dynamic ToReturn = new ExpandoObject();
            if (Season.Count == 0)
            {
                //string error;
                ToReturn.error = "This Item does not exist";
                return ToReturn /* as List<dynamic> */ ;
            }
            else
            {
                return Ranking(Season.ToList());

            }
        }

        private List<dynamic> Ranking(List<Athlete_Season_Event> ForClent)
        {
            List<dynamic> DynamicUsers = new List<dynamic>();

            dynamic toReturn = new ExpandoObject();
            foreach (Athlete_Season_Event competition in ForClent)
            {

                dynamic Comp = new ExpandoObject();
                Comp.Athlete_ID = db.Athletes.Where(zz => zz.Athlete_ID == competition.Athlete_ID).FirstOrDefault().Name;
                Comp.Points = db.Athletes.Where(zz => zz.Athlete_ID == competition.Athlete_ID).FirstOrDefault().Points;
                Comp.Records = db.Seasons.Where(zz => zz.Season_ID == competition.Season_ID).FirstOrDefault().Description;
                Comp.Surname = db.Athletes.Where(zz => zz.Athlete_ID == competition.Athlete_ID).FirstOrDefault().Surname;
                //Comp.ID_Number = competition.ID_Number;
                //Comp.Status = competition.Status;

                DynamicUsers.Add(Comp);
            }
            toReturn.DynamicUsers = DynamicUsers;
            return DynamicUsers;
        }
        [System.Web.Http.Route("api/Report/AllSeasons")]
        [System.Web.Http.HttpGet]
        public List<dynamic> AllSeasons()

        {
            db.Configuration.ProxyCreationEnabled = false;
            return Season(db.Seasons.ToList());

        }
        public List<dynamic> Season(List<Season> ForClent)
        {
            List<dynamic> DynamicUsers = new List<dynamic>();

            foreach (Season competition in ForClent)
            {
                dynamic Comp = new ExpandoObject();
                Comp.Season = competition.Description;
                DynamicUsers.Add(Comp);
            }
            return DynamicUsers;

        }
        [System.Web.Http.Route("api/Report/getProfile")]
        [System.Web.Http.HttpGet]

        public List<dynamic> getProfile(string Email)
        {

            db.Configuration.ProxyCreationEnabled = false;

            return getAth(db.Users.Where(z => z.Email == Email).ToList());
        }

        private List<dynamic> getAth(List<User> ForClent)
        {
            List<dynamic> DynamicUsers = new List<dynamic>();

            dynamic toReturn = new ExpandoObject();
            foreach (User competition in ForClent)
            {

                dynamic Comp = new ExpandoObject();

                Comp.Name = competition.Name;
                //Comp.Records = competition.Records;
                Comp.Surname = competition.Surname;
                Comp.Role = db.Roles.Where(z => z.ID == competition.Type_ID).FirstOrDefault().Name;
                Comp.Email = competition.Email;
                //Comp.Phone_Number = competition.Phone_Number;

                DynamicUsers.Add(Comp);
            }
            toReturn.DynamicUsers = DynamicUsers;
            return DynamicUsers;
        }
    }
}

