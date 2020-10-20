using Microsoft.Owin.Security.OAuth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Threading.Tasks;
using u16073861_INF354_HW1.Models;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Dynamic;

namespace u16073861_INF354_HW1
{
    public class ApplicationOAuthProvider : OAuthAuthorizationServerProvider
    {
        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {

            context.Validated();
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)

        {
            var identity = new ClaimsIdentity(context.Options.AuthenticationType);


            Tuks_Athletics_SystemEntities db = new Tuks_Athletics_SystemEntities();
            string UserName = context.UserName.ToLower().Trim('"');
            string Password = context.Password.Trim('"'); ;
            //var UserRole = 
            Password = ComputeSha256Hash(Password);

            var userdata = db.Users.Where(u => u.Email.ToLower() == UserName && u.Password == Password).FirstOrDefault();

            if (userdata != null)
            {
                //dynamic toReturn = new ExpandoObject();
                //Role thisRole = db.Roles.Where(XX => XX.ID == userdata.Type_ID).FirstOrDefault();
                identity.AddClaim(new Claim(ClaimTypes.Role, userdata.Role.Name));
                identity.AddClaim(new System.Security.Claims.Claim(ClaimTypes.Email, userdata.Email));

                if (userdata.Role.Name == "Admin")
                {
                    identity.AddClaim(new System.Security.Claims.Claim(ClaimTypes.Role, "Admin"));
                }
                else
                {
                    identity.AddClaim(new System.Security.Claims.Claim(ClaimTypes.Role, "General"));
                }
                context.Validated(identity);
                //if(thisRole != null)
                //{
                //    toReturn.RoleName = thisRole.Name;
                //    returnFront( toReturn);
                //}
            }
            else
            {
                context.SetError("invalid_grant", "Provided username and password is incorrect");
                context.Rejected();
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
        }

        private dynamic returnFront(dynamic roleData)
        {
            return roleData;
        }
    }

}