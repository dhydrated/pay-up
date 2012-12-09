package models;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.validation.constraints.DecimalMax;

import play.data.format.Formats;
import play.data.validation.Constraints;
import play.db.ebean.Model;

import com.avaje.ebean.Page;

/**
 * Payment entity managed by Ebean
 */
@Entity 
public class Payment extends Model {

    @Id
    public Long id;
    
    @Constraints.Required
    public String name;

    @Constraints.Required
    public BigDecimal amount;

    @Formats.DateTime(pattern="yyyy-MM-dd")
    @Column(name="paid_date")
    public Date paidDate = new Date();
    
    @ManyToOne
    public Payee payee;
    
    /**
     * Generic query helper for entity Payment with id Long
     */
    public static Finder<Long,Payment> find = new Finder<Long,Payment>(Long.class, Payment.class); 
    
    /**
     * Return a page of payment
     *
     * @param page Page to display
     * @param pageSize Number of payments per page
     * @param sortBy Payment property used for sorting
     * @param order Sort order (either or asc or desc)
     * @param filter Filter applied on the name column
     */
    public static Page<Payment> page(int page, int pageSize, String sortBy, String order, String filter) {
        return 
            find.where()
                .ilike("name", "%" + filter + "%")
                .orderBy(sortBy + " " + order)
                .fetch("payee")
                .findPagingList(pageSize)
                .getPage(page);
    }
    
}

