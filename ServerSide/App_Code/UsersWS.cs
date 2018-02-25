using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;
using PushSharp;
using PushSharp.Android;
//using PushSharp.Apple;
using PushSharp.Core;
using Newtonsoft.Json;

/// <summary>
/// Summary description for UsersWS
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class UsersWS : System.Web.Services.WebService
{
    string strCon = "Data Source=DESKTOP-GU2Q2UP\\SQLEXPRESS;Initial Catalog=TrialsDB;Integrated Security=True";

    SqlConnection con;
    [WebMethod]
    public string getCustomersProducts()
    {
        
        con = new SqlConnection(strCon);
        string query = "SELECT dbo.CustomersTB.CustomerID AS Expr3, dbo.CustomersTB.CustomerName, dbo.ProductsTB.ProductID AS Expr2, dbo.ProductsTB.ProductName, dbo.CustProd.*" +
                       " FROM dbo.CustomersTB INNER JOIN " +
                       " dbo.CustProd ON dbo.CustomersTB.CustomerID = dbo.CustProd.CustomerID INNER JOIN " +
                       " dbo.ProductsTB ON dbo.CustProd.ProductID = dbo.ProductsTB.ProductID "; 

                     
        try
        {
            SqlDataAdapter adptr = new SqlDataAdapter(query, con);
            DataSet ds = new DataSet();
            adptr.Fill(ds, "cusomers products");
            DataTable dt = ds.Tables["cusomers products"];
            string json = JsonConvert.SerializeObject(dt);
            con.Close();
            return json;
        }
        catch (Exception e)
        {
            con.Close();
            return e.Message;
        }
    }
    [WebMethod]
    public void changeStatus(int custID,int ProductID)
    {
        string query = " UPDATE[dbo].[CustProd] SET[Status] = 'Expired' WHERE [CustomerID] ="+custID+ "AND[ProductID] ="+ProductID ;
        con = new SqlConnection(strCon);
        try
        {
            con.Open();
            SqlCommand com = new SqlCommand(query, con);
            if (com.ExecuteNonQuery() > 0)
            {
                com.Connection.Close();
                
            }
            else
            {
                com.Connection.Close();
                
            }

        }
        catch (Exception e)
        {
            con.Close();
            
        }

    }

    [WebMethod]
    public string AddNewCustomer(string customerName, string productID,string startDate , string endDate)
    {
        string query = "INSERT INTO [dbo].[CustomersTB] ([CustomerName])" + "VALUES ( '" + customerName + "')";
        con = new SqlConnection(strCon);
        try
        {
            con.Open();
            SqlCommand com = new SqlCommand(query, con);
            if (com.ExecuteNonQuery() > 0)
            {
                com.Connection.Close();
                
            }
            else
            {
                com.Connection.Close();
                return "try again";
            }

        }
        catch (Exception e)
        {
            con.Close();
            return e.Message;
        }
        

        SqlCommand comm = new SqlCommand("select [CustomerID] from [dbo].[CustomersTB] where CustomerName ='" + customerName+"'", con);
        con.Open();
        string cusID = comm.ExecuteScalar().ToString();
        return ConnectToProduct(cusID, productID,startDate,endDate,"Active");
    }
    [WebMethod]
    public string deleteUser(string cusID, string productID)
    {
        con = new SqlConnection(strCon);
        
       
        string query = "DELETE FROM [dbo].[CustProd] WHERE CustomerID = ' " + cusID + " ' and ProductID = '" + productID + "'";
        con.Close();
        try
        {
            con.Open();
            SqlCommand com = new SqlCommand(query, con);
            if (com.ExecuteNonQuery() > 0)
            {
                com.Connection.Close();
                return "DELETED succefully";
            }
            else
            {
                com.Connection.Close();
                return "try again";
            }

        }
        catch (Exception e)
        {
            con.Close();
            return e.Message;
        }
    }
    public string ConnectToProduct(string customerID, string productID, string startDate, string endDate, string status)
    {
        string query = "INSERT INTO [dbo].[CustProd] ([CustomerID],[ProductID],[StartDate],[EndDate],[Status])" + "VALUES ( " + customerID + ","+productID+",'"+ startDate+"' , '"+ endDate+"' , '"+ status+"')";
        con = new SqlConnection(strCon);
        try
        {
            con.Open();
            SqlCommand com = new SqlCommand(query, con);
            if (com.ExecuteNonQuery() > 0)
            {
                com.Connection.Close();
                return "added succefully";
            }
            else
            {
                com.Connection.Close();
                return "try again";
            }

        }
        catch (Exception e)
        {
            con.Close();
            return e.Message;
        }

    }
    

}


