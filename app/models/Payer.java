package models;

import java.util.LinkedHashMap;
import java.util.Map;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import play.data.validation.Constraints;
import play.db.ebean.Model;

import com.avaje.ebean.Page;


/**
 * Payer entity managed by Ebean
 */
@Entity 
@Table(name="payers")
public class Payer extends Model {

    @Id
    public Long id;
    
    @Constraints.Required
    public String name;
    
    public String description;
    
    
    /**
     * Generic query helper for entity Payer with id Long
     */
    public static Model.Finder<Long,Payer> find = new Model.Finder<Long,Payer>(Long.class, Payer.class);

    public static Map<String,String> options() {
        LinkedHashMap<String,String> options = new LinkedHashMap<String,String>();
        for(Payer c: Payer.find.orderBy("name").findList()) {
        	
            options.put(c.id.toString(), c.name);
        }
        return options;
    }
    

    /**
     * Return a page of payer
     *
     * @param page Page to display
     * @param pageSize Number of payers per page
     * @param sortBy Payer property used for sorting
     * @param order Sort order (either or asc or desc)
     * @param filter Filter applied on the name column
     */
    public static Page<Payer> page(int page, int pageSize, String sortBy, String order, String filter) {
        return 
            find.where()
                .ilike("name", "%" + filter + "%")
                .orderBy(sortBy + " " + order)
                .findPagingList(pageSize)
                .getPage(page);
    }


	@Override
	public String toString() {
		return this.name;
	}
    
    

}

