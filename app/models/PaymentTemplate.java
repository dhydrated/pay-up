package models;

import java.math.BigDecimal;
import java.util.LinkedHashMap;
import java.util.Map;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import play.data.validation.Constraints;
import play.db.ebean.Model;

import com.avaje.ebean.Page;


/**
 * Payemnt Type entity managed by Ebean
 */
@SuppressWarnings("serial")
@Entity 
@Table(name="payment_templates")
public class PaymentTemplate extends Model {

    @Id
    public Long id;

	@Constraints.Required
	@ManyToOne
	public PaymentType paymentType;

	@Constraints.Required
	@ManyToOne
	public Payee payee;

	@Constraints.Required
	public BigDecimal amount;

    /**
     * Generic query helper for entity Payee with id Long
     */
    public static Model.Finder<Long,PaymentTemplate> find = new Model.Finder<Long,PaymentTemplate>(Long.class, PaymentTemplate.class);

    public static Map<String,String> options() {
        LinkedHashMap<String,String> options = new LinkedHashMap<String,String>();
        for(PaymentTemplate e: PaymentTemplate.find.orderBy("payee.name").findList()) {
            options.put(e.id.toString(), e.payee.name);
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
    public static Page<PaymentTemplate> page(int page, int pageSize, String sortBy, String order, String filter) {
        return 
            find.where()
                .ilike("payee.name", "%" + filter + "%")
                .orderBy(sortBy + " " + order)
                .findPagingList(pageSize)
                .getPage(page);
    }


	@Override
	public String toString() {
		return this.payee.name;
	}
    
    

}

