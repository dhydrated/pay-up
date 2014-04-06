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
@Table(name="states")
public class State extends Model {

    @Id
    public Long id;
    
    @Constraints.Required
    public String name;
    
	@Constraints.Required
	@ManyToOne
	public Country country;

}

