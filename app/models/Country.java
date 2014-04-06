package models;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import play.data.validation.Constraints;
import play.db.ebean.Model;


/**
 * User entity managed by Ebean
 */
@SuppressWarnings("serial")
@Entity 
@Table(name="countries")
public class Country extends Model {

    @Id
    public Long id;
    
    @Constraints.Required
    public String name;

}

