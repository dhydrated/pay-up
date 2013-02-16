package models;

import java.math.BigDecimal;
import java.util.LinkedHashMap;
import java.util.Map;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import play.data.validation.Constraints;
import play.db.ebean.Model;

import com.avaje.ebean.Page;


/**
 * Payee entity managed by Ebean
 */
@Entity 
@Table(name="payees")
public class Payee extends Model {

    @Id
    public Long id;
    
    @Constraints.Required
    public String name;

    public String accountNumber;
    
    public String description;
    
    
    /**
     * Generic query helper for entity Payee with id Long
     */
    public static Model.Finder<Long,Payee> find = new Model.Finder<Long,Payee>(Long.class, Payee.class);

    public static Map<String,String> options() {
        LinkedHashMap<String,String> options = new LinkedHashMap<String,String>();
        for(Payee c: Payee.find.orderBy("name").findList()) {
        	
        	String account = c.accountNumber.equals("") ?  "" : "(" + c.accountNumber +")";
        	
            options.put(c.id.toString(), c.name + account);
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
    public static Page<Payee> page(int page, int pageSize, String sortBy, String order, String filter) {
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

