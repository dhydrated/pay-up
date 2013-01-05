package models;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import play.Logger;
import play.data.validation.Constraints;
import play.db.ebean.Model;
import play.mvc.Result;
import views.html.queries.console;

import com.avaje.ebean.Ebean;
import com.avaje.ebean.Page;
import com.avaje.ebean.SqlQuery;
import com.avaje.ebean.SqlRow;


/**
 * Report entity managed by Ebean
 */
@SuppressWarnings("serial")
@Entity 
@Table(name="reports")
public class Report extends Model {

    @Id
    public Long id;
    
    @Constraints.Required
    public String name;

    @Constraints.Required
    public String query;
    
    
    /**
     * Generic query helper for entity Payee with id Long
     */
    public static Model.Finder<Long,Report> find = new Model.Finder<Long,Report>(Long.class, Report.class);

    public static Map<String,String> options() {
        LinkedHashMap<String,String> options = new LinkedHashMap<String,String>();
        for(Report c: Report.find.orderBy("name").findList()) {

        	options.put(c.id.toString(), c.name);
        }
        return options;
    }
    

    /**
     * Return a page of payee
     *
     * @param page Page to display
     * @param pageSize Number of payees per page
     * @param sortBy Payee property used for sorting
     * @param order Sort order (either or asc or desc)
     * @param filter Filter applied on the name column
     */
    public static Page<Report> page(int page, int pageSize, String sortBy, String order, String filter) {
        return 
            find.where()
                .ilike("name", "%" + filter + "%")
                .orderBy(sortBy + " " + order)
                .findPagingList(pageSize)
                .getPage(page);
    }
    
    public List<SqlRow> getData(){
    	SqlQuery q = Ebean.createSqlQuery(this.query);
    	
    	List<SqlRow> rows = null;
    	try {
			rows = q.findList();
		} catch (Exception e) {
			Logger.error("Error", e);
		}
    	return rows;
    }

}

