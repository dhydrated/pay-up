package models;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import play.data.validation.Constraints;
import play.db.ebean.Model;


/**
 * User entity managed by Ebean
 */
@SuppressWarnings("serial")
@Entity 
@Table(name="addresses")
public class Address extends Model {

    @Id
    public Long id;
    
    @Constraints.Required
    public String address1;
    
    public String address2;
    
    @Constraints.MaxLength(value=5)
    public String postcode;
    
	@Constraints.Required
	@ManyToOne
	public State state;

}

