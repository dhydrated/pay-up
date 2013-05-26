package controllers;

import java.util.List;

import models.Payment;
import play.data.Form;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.Security;
import views.html.payments.createForm;
import views.html.payments.editForm;
import views.html.payments.list;
import static play.data.Form.*;

/**
 * Manage a database of payments
 */
@Security.Authenticated(Secured.class)
public class Application extends Controller {
    
    /**
     * This result directly redirect to application home.
     */
    public static Result GO_HOME = redirect(
        routes.Application.list(0, "paid_date", "desc", "")
    );
    
    /**
     * Handle default path requests, redirect to payments list
     */
    public static Result index() {
        return GO_HOME;
    }

    /**
     * Display the paginated list of payments.
     *
     * @param page Current page number (starts from 0)
     * @param sortBy Column to be sorted
     * @param order Sort order (either asc or desc)
     * @param filter Filter applied on payment names
     */
    public static Result list(int page, String sortBy, String order, String filter) {
        return ok(
            list.render(
                Payment.page(page, 10, sortBy, order, filter),
                sortBy, order, filter
            )
        );
    }

    public static Result apiList(){
    	List<Payment> payments = Payment.find.findList();
    	return ok(Json.toJson(payments));
    }
    
    /**
     * Display the 'edit form' of a existing Payment.
     *
     * @param id Id of the payment to edit
     */
    public static Result edit(Long id) {
        Form<Payment> paymentForm = form(Payment.class).fill(
            Payment.find.byId(id)
        );
        return ok(
            editForm.render(id, paymentForm)
        );
    }
    
    /**
     * Handle the 'edit form' submission 
     *
     * @param id Id of the payment to edit
     */
    public static Result update(Long id) {
        Form<Payment> paymentForm = form(Payment.class).bindFromRequest();
        if(paymentForm.hasErrors()) {
            return badRequest(editForm.render(id, paymentForm));
        }
        paymentForm.get().update(id);
        flash("success", "Payment " + paymentForm.get().name + " has been updated");
        return GO_HOME;
    }
    
    /**
     * Display the 'new payment form'.
     */
    public static Result create() {
    	
    	Payment payment = new Payment();
    	
        Form<Payment> paymentForm = form(Payment.class).fill(
                payment
        );
        return ok(
            createForm.render(paymentForm)
        );
    }
    
    /**
     * Handle the 'new payment form' submission 
     */
    public static Result save() {
        Form<Payment> paymentForm = form(Payment.class).bindFromRequest();
        if(paymentForm.hasErrors()) {
            return badRequest(createForm.render(paymentForm));
        }
        paymentForm.get().save();
        flash("success", "Payment " + paymentForm.get().name + " has been created");
        return GO_HOME;
    }
    
    /**
     * Handle payment deletion
     */
    public static Result delete(Long id) {
        Payment.find.ref(id).delete();
        flash("success", "Payment has been deleted");
        return GO_HOME;
    }
    

}
            
