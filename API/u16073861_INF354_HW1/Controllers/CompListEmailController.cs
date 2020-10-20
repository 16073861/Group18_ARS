using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using u16073861_INF354_HW1.Models;
using System.Net.Mail;
using System.Threading.Tasks;

namespace u16073861_INF354_HW1.Controllers
{
    public class CompListEmailController : ApiController
    {
        [System.Web.Mvc.Route("api/CompListEmail")]
        [System.Web.Http.HttpPost]
        public async Task<string> CompListEmail(EmailClass ec)
        {
            string To = ec.To;
            string subject = ec.Subject;
            string body = ec.Body;
            MailMessage mm = new MailMessage();
            mm.From = new MailAddress("TuksAthleticsSystem@gmail.com");
            mm.Subject = subject;
            mm.Body = body;
            mm.To.Add(To);
            mm.IsBodyHtml = false;

            SmtpClient smtp = new SmtpClient("smtp.gmail.com");
            smtp.Port = 587;
            smtp.UseDefaultCredentials = true;
            smtp.EnableSsl = true;
            smtp.Credentials = new System.Net.NetworkCredential("TuksAthleticsSystem@gmail.com", "tuks@tuks");
            smtp.Send(mm);

            return "The Mail has been sent to " + ec.To.ToString();
        }
    }
}
