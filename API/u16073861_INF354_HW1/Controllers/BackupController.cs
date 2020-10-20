using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data.SqlClient;
using Microsoft.SqlServer.Management.Smo;
using Microsoft.SqlServer.Management.Common;
using u16073861_INF354_HW1.Models;
using System.Data.Entity;

namespace u16073861_INF354_HW1.Controllers
{
    public class BackupController : ApiController
    {
        private Tuks_Athletics_SystemEntities db = new Tuks_Athletics_SystemEntities();

        [System.Web.Mvc.Route("api/CreateBackup")]
        [System.Web.Http.HttpPost]
        public void createBackup(/*String databaseName*/)
        {
            db.Database.ExecuteSqlCommand(TransactionalBehavior.DoNotEnsureTransaction, "backup database Tuks_Athletics_System to disk = 'C:\\backup.bak'");

            /*Backup sqlBackup = new Backup();

            sqlBackup.Action = BackupActionType.Database;
            sqlBackup.BackupSetDescription = "ArchiveDataBase:" +
                                             DateTime.Now.ToShortDateString();
            sqlBackup.BackupSetName = "Archive";

            sqlBackup.Database = databaseName;

            BackupDeviceItem deviceItem = new BackupDeviceItem("C:\\", DeviceType.File);
            ServerConnection connection = new ServerConnection("SUKIR-PC\\SQLEXPRESS", "SukiR-PC\\SukiR", "1234");
            Server sqlServer = new Server(connection);

            Database db = sqlServer.Databases[databaseName];

            sqlBackup.Initialize = true;
            sqlBackup.Checksum = true;
            sqlBackup.ContinueAfterError = true;

            sqlBackup.Devices.Add(deviceItem);
            sqlBackup.Incremental = false;

            sqlBackup.ExpirationDate = DateTime.Now.AddDays(3);
            sqlBackup.LogTruncation = BackupTruncateLogType.Truncate;

            sqlBackup.FormatMedia = false;

            sqlBackup.SqlBackup(sqlServer);*/
        }

        [System.Web.Mvc.Route("api/RestoreBackup")]
        [System.Web.Http.HttpGet]
        public bool restoreBackup()
        {
            try
            {
                db.Database.ExecuteSqlCommand(TransactionalBehavior.DoNotEnsureTransaction, "use master restore database Tuks_Athletics_System from disk = 'C:\\backup.bak'");
                return true;
            }
            catch
            {
                return false;
            }
            
        }
    }
}
