package models;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.apache.commons.lang3.builder.EqualsBuilder;

import play.db.ebean.Model;

@Entity
@Table(name = "users_addresses")
public class UserAddressMap extends Model {

	@Id
	public Long id;

	@ManyToOne
	@JoinColumn(name = "user_id", referencedColumnName = "id")
	public User user;

	@ManyToOne
	@JoinColumn(name = "address_id", referencedColumnName = "id")
	public Address address;
	
	public Boolean main = false;

	/**
	 * Generic query helper for entity GroupUserMap with id Long
	 */
	public static Model.Finder<Long, UserAddressMap> find = new Model.Finder<Long, UserAddressMap>(
			Long.class, UserAddressMap.class);

    @Override
	public boolean equals(Object object) {
    	if (!(object instanceof UserAddressMap)) {
    		return false;
    	}
    	UserAddressMap rhs = (UserAddressMap) object;
    	return new EqualsBuilder()
    		.append(id, rhs.id)
    		.isEquals();
	}
}
