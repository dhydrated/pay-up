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
 * Payemnt Type entity managed by Ebean
 */
@Entity 
@Table(name="payment_types")
public class PaymentType extends Model {

    @Id
    public Long id;
    
    @Constraints.Required
    public String name;

    /**
     * Generic query helper for entity Payee with id Long
     */
    public static Model.Finder<Long,PaymentType> find = new Model.Finder<Long,PaymentType>(Long.class, PaymentType.class);

    public static Map<String,String> options() {
        LinkedHashMap<String,String> options = new LinkedHashMap<String,String>();
        for(PaymentType c: PaymentType.find.orderBy("name").findList()) {
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
    public static Page<PaymentType> page(int page, int pageSize, String sortBy, String order, String filter) {
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

