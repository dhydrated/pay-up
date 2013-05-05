package controllers;

import java.util.List;

import play.Logger;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.Security;
import views.html.queries.console;

import com.avaje.ebean.Ebean;
import com.avaje.ebean.SqlQuery;
import com.avaje.ebean.SqlRow;
import static play.data.Form.*;

@Security.Authenticated(Secured.class)
public class QueryApplication extends Controller{


    public static Result index() {
        return ok(console.render(null,""));
    }
    
    public static Result query(){
    	
    	String query = request().body().asFormUrlEncoded().get("query")[0];
    	
    	Logger.debug(query);
    	
    	SqlQuery q = Ebean.createSqlQuery(query);
    	
    	List<SqlRow> rows = q.findList();
    	
    	Logger.debug(rows.toString());
    	
    	return ok(console.render(rows, query));
    }
}
