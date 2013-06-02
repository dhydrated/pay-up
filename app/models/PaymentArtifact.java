package models;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import play.data.validation.Constraints;
import play.db.ebean.Model;

@Entity 
@Table(name="payment_artifacts")
public class PaymentArtifact extends Model{

	private static final long serialVersionUID = 1L;

	@Id
    public Long id;
    
    @Constraints.Required
    public String name;
    
    public String type;
    
	@Constraints.Required
	@ManyToOne
	public Payment payment;
    
    @Lob
    public byte[] data;

    
    /**
     * Generic query helper for entity Artifact with id Long
     */
    public static Model.Finder<Long,PaymentArtifact> find = new Model.Finder<Long,PaymentArtifact>(Long.class, PaymentArtifact.class);
    
    
    public static List<PaymentArtifact> findByPaymentId(Long paymentId) {
		return find.where().eq("payment.id", paymentId).findList();
	}
    
    
	@Override
	public String toString() {
		return this.name;
	}
}
