using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.App_Code.DAL
{
    public class customer
    {
        public int CustomerID { get; set; }

        public string CustomerName { get; set; }

        public customer(int userID, string customerName)
        {
            this.CustomerID = userID;
            this.CustomerName = customerName;
        }
    }
}