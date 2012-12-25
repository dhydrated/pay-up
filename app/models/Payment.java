package models;

import java.math.BigDecimal;
import java.util.Date;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.Map;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import play.Logger;
import play.data.format.Formats;
import play.data.validation.Constraints;
import play.db.ebean.Model;

import com.avaje.ebean.Page;

/**
 * Payment entity managed by Ebean
 */
@Entity
@Table(name = "payments")
public class Payment extends Model {

	@Id
	public Long id;

	public String name;

	@Constraints.Required
	public BigDecimal amount;

	@Constraints.Max(value = 9999)
	@Constraints.Required
	public Integer year;

	@Constraints.Max(value = 12)
	@Constraints.Required
	public Integer month;

	@Constraints.MaxLength(value = 500)
	public String remarks;

	public String reference;

	@Formats.DateTime(pattern = "yyyy-MM-dd")
	@Column(name = "paid_date")
	public Date paidDate = new Date();

	@Constraints.Required
	@ManyToOne
	public Payee payee;

	@Constraints.Required
	@ManyToOne
	public PaymentType paymentType;

	@Transient
	private String monthName;

	@Transient
	public static Map<String, String> months;

	/**
	 * Generic query helper for entity Payment with id Long
	 */
	public static Finder<Long, Payment> find = new Finder<Long, Payment>(
			Long.class, Payment.class);

	/**
	 * Return a page of payment
	 * 
	 * @param page
	 *            Page to display
	 * @param pageSize
	 *            Number of payments per page
	 * @param sortBy
	 *            Payment property used for sorting
	 * @param order
	 *            Sort order (either or asc or desc)
	 * @param filter
	 *            Filter applied on the name column
	 */
	public static Page<Payment> page(int page, int pageSize, String sortBy,
			String order, String filter) {
		return find.where().ilike("payee.name", "%" + filter + "%")
				.orderBy(sortBy + " " + order).fetch("payee")
				.findPagingList(pageSize).getPage(page);
	}

	public static Map<String, String> yearOptions() {
		LinkedHashMap<String, String> options = new LinkedHashMap<String, String>();

		options.put("2013", "2013");
		options.put("2012", "2012");

		return options;
	}

	public static Map<String, String> monthOptions() {

		return getMonths();
	}

	public static Map<String, String> getMonths() {

		if (months == null) {
			months = new LinkedHashMap<String, String>();
			months.put("1", "January");
			months.put("2", "February");
			months.put("3", "March");
			months.put("4", "April");
			months.put("5", "May");
			months.put("6", "June");
			months.put("7", "July");
			months.put("8", "August");
			months.put("9", "September");
			months.put("10", "October");
			months.put("11", "November");
			months.put("12", "December");
		}

		return months;
	}

	public String getMonthName(){
		
		if(this.monthName == null){
			this.monthName = getMonths().get(this.month.toString());
		}
		return this.monthName;
	}

}
