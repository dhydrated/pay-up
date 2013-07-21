package models;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;

@Embeddable
public class UserGroupPK implements Serializable{
    private static final long serialVersionUID = 1L;

    @Column(name="user_id")
    public Long userId;
    

    @Column(name="group_id")
    public Long groupId;

    public UserGroupPK(Long userId, Long groupId) {
        this.userId = userId;
        this.groupId = groupId;
    }

    @Override
    public boolean equals(Object object) {
       /* if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final UserGroupPK other = (UserGroupPK) obj;
        if ((this.userId == null) ? (other.userId != null) : !this.userId.equals(other.userId)) {
                return false;
            }
        if ((this.groupId == null) ? (other.groupId != null) : !this.groupId.equals(other.groupId)) {
            return false;
        }
        return true;*/
    	if (!(object instanceof UserGroupPK)) {
    		return false;
    	}
    	UserGroupPK rhs = (UserGroupPK) object;
    	return new EqualsBuilder()
    		.append(userId, rhs.userId)
    		.append(groupId, rhs.groupId)
    		.isEquals();
    }

    @Override
    public int hashCode() {
        /*int hash = 3;
        hash = 89 * hash + (this.userId != null ? this.userId.hashCode() : 0);
        hash = 89 * hash + (this.groupId != null ? this.groupId.hashCode() : 0);
        return hash;*/
    	return new HashCodeBuilder()
        .append(userId)
        .append(groupId)
        .toHashCode();
    }
}
