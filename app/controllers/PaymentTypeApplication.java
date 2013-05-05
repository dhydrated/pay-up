package controllers;

import java.util.List;

import models.PaymentType;
import play.data.Form;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.Security;
import views.html.payment_types.createForm;
import views.html.payment_types.editForm;
import views.html.payment_types.list;
import static play.data.Form.*;

/**
 * Manage a database of paymentTypes
 */
@Security.Authenticated(Secured.class)
public class PaymentTypeApplication extends Controller {
    
    /**
     * This result directly redirect to application home.
     */
    public static Result GO_HOME = redirect(
        routes.PaymentTypeApplication.list(0, "name", "asc", "")
    );
    
    /**
     * Handle default path requests, redirect to paymentTypes list
     */
    public static Result index() {
        return GO_HOME;
    }

    /**
     * Display the paginated list of paymentTypes.
     *
     * @param page Current page number (starts from 0)
     * @param sortBy Column to be sorted
     * @param order Sort order (either asc or desc)
     * @param filter Filter applied on paymentType names
     */
    public static Result list(int page, String sortBy, String order, String filter) {
        return ok(
            list.render(
                PaymentType.page(page, 10, sortBy, order, filter),
                sortBy, order, filter
            )
        );
    }
    
    public static Result apiList(){
    	
    	List<PaymentType> paymentTypes = PaymentType.find.findList();
    	return ok(Json.toJson(paymentTypes));
    }
    
    /**
     * Display the 'edit form' of a existing PaymentType.
     *
     * @param id Id of the paymentType to edit
     */
    public static Result edit(Long id) {
        Form<PaymentType> paymentTypeForm = form(PaymentType.class).fill(
            PaymentType.find.byId(id)
        );
        return ok(
            editForm.render(id, paymentTypeForm)
        );
    }
    
    /**
     * Handle the 'edit form' submission 
     *
     * @param id Id of the paymentType to edit
     */
    public static Result update(Long id) {
        Form<PaymentType> paymentTypeForm = form(PaymentType.class).bindFromRequest();
        if(paymentTypeForm.hasErrors()) {
            return badRequest(editForm.render(id, paymentTypeForm));
        }
        paymentTypeForm.get().update(id);
        flash("success", "Payment Type " + paymentTypeForm.get().name + " has been updated");
        return GO_HOME;
    }
    
    /**
     * Display the 'new paymentType form'.
     */
    public static Result create() {
        Form<PaymentType> paymentTypeForm = form(PaymentType.class);
        return ok(
            createForm.render(paymentTypeForm)
        );
    }
    
    /**
     * Handle the 'new paymentType form' submission 
     */
    public static Result save() {
        Form<PaymentType> paymentTypeForm = form(PaymentType.class).bindFromRequest();
        if(paymentTypeForm.hasErrors()) {
            return badRequest(createForm.render(paymentTypeForm));
        }
        paymentTypeForm.get().save();
        flash("success", "Payment Type " + paymentTypeForm.get().name + " has been created");
        return GO_HOME;
    }
    
    /**
     * Handle paymentType deletion
     */
    public static Result delete(Long id) {
        PaymentType.find.ref(id).delete();
        flash("success", "Payment Type has been deleted");
        return GO_HOME;
    }
    

}
            
