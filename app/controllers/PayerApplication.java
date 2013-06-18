package controllers;

import java.util.List;

import models.Payer;
import play.data.Form;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.Security;
import views.html.payers.createForm;
import views.html.payers.editForm;
import views.html.payers.list;
import static play.data.Form.*;

/**
 * Manage a database of payers
 */
@Security.Authenticated(Secured.class)
public class PayerApplication extends Controller {
    
    /**
     * This result directly redirect to application home.
     */
    public static Result GO_HOME = redirect(
        routes.PayerApplication.list(0, "name", "asc", "")
    );
    
    /**
     * Handle default path requests, redirect to payers list
     */
    public static Result index() {
        return GO_HOME;
    }

    /**
     * Display the paginated list of payers.
     *
     * @param page Current page number (starts from 0)
     * @param sortBy Column to be sorted
     * @param order Sort order (either asc or desc)
     * @param filter Filter applied on payer names
     */
    public static Result list(int page, String sortBy, String order, String filter) {
        return ok(
            list.render(
                Payer.page(page, 10, sortBy, order, filter),
                sortBy, order, filter
            )
        );
    }
    
    public static Result apiList(){
    	
    	List<Payer> payers = Payer.find.findList();
    	return ok(Json.toJson(payers));
    }
    
    /**
     * Display the 'edit form' of a existing Payer.
     *
     * @param id Id of the payer to edit
     */
    public static Result edit(Long id) {
        Form<Payer> payerForm = form(Payer.class).fill(
            Payer.find.byId(id)
        );
        return ok(
            editForm.render(id, payerForm)
        );
    }
    
    /**
     * Handle the 'edit form' submission 
     *
     * @param id Id of the payer to edit
     */
    public static Result update(Long id) {
        Form<Payer> payerForm = form(Payer.class).bindFromRequest();
        if(payerForm.hasErrors()) {
            return badRequest(editForm.render(id, payerForm));
        }
        payerForm.get().update(id);
        flash("success", "Payer " + payerForm.get().name + " has been updated");
        return GO_HOME;
    }
    
    /**
     * Display the 'new payer form'.
     */
    public static Result create() {
        Form<Payer> payerForm = form(Payer.class);
        return ok(
            createForm.render(payerForm)
        );
    }
    
    /**
     * Handle the 'new payer form' submission 
     */
    public static Result save() {
        Form<Payer> payerForm = form(Payer.class).bindFromRequest();
        if(payerForm.hasErrors()) {
            return badRequest(createForm.render(payerForm));
        }
        payerForm.get().save();
        flash("success", "Payer " + payerForm.get().name + " has been created");
        return GO_HOME;
    }
    
    /**
     * Handle payer deletion
     */
    public static Result delete(Long id) {
        Payer.find.ref(id).delete();
        flash("success", "Payer has been deleted");
        return GO_HOME;
    }
    

}
            
