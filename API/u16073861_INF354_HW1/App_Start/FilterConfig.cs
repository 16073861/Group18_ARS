﻿using System.Web;
using System.Web.Mvc;

namespace u16073861_INF354_HW1
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
