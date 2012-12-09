package controllers;

import models.Payee;
import play.data.Form;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.Security;
import views.html.payeeCreateForm;
import views.html.payeeEditForm;
import views.html.payeeList;

/**
 * Manage a database of payees
 */
@Security.Authenticated(Secured.class)
public class PayeeApplication extends Controller {
    
    /**
     * This result directly redirect to application home.
     */
    public static Result GO_HOME = redirect(
        routes.PayeeApplication.list(0, "name", "asc", "")
    );
    
    /**
     * Handle default path requests, redirect to payees list
     */
    public static Result index() {
        return GO_HOME;
    }

    /**
     * Display the paginated list of payees.
     *
     * @param page Current page number (starts from 0)
     * @param sortBy Column to be sorted
     * @param order Sort order (either asc or desc)
     * @param filter Filter applied on payee names
     */
    public static Result list(int page, String sortBy, String order, String filter) {
        return ok(
            payeeList.render(
                Payee.page(page, 10, sortBy, order, filter),
                sortBy, order, filter
            )
        );
    }
    
    /**
     * Display the 'edit form' of a existing Payee.
     *
     * @param id Id of the payee to edit
     */
    public static Result edit(Long id) {
        Form<Payee> payeeForm = form(Payee.class).fill(
            Payee.find.byId(id)
        );
        return ok(
            payeeEditForm.render(id, payeeForm)
        );
    }
    
    /**
     * Handle the 'edit form' submission 
     *
     * @param id Id of the payee to edit
     */
    public static Result update(Long id) {
        Form<Payee> payeeForm = form(Payee.class).bindFromRequest();
        if(payeeForm.hasErrors()) {
            return badRequest(payeeEditForm.render(id, payeeForm));
        }
        payeeForm.get().update(id);
        flash("success", "Payee " + payeeForm.get().name + " has been updated");
        return GO_HOME;
    }
    
    /**
     * Display the 'new payee form'.
     */
    public static Result create() {
        Form<Payee> payeeForm = form(Payee.class);
        return ok(
            payeeCreateForm.render(payeeForm)
        );
    }
    
    /**
     * Handle the 'new payee form' submission 
     */
    public static Result save() {
        Form<Payee> payeeForm = form(Payee.class).bindFromRequest();
        if(payeeForm.hasErrors()) {
            return badRequest(payeeCreateForm.render(payeeForm));
        }
        payeeForm.get().save();
        flash("success", "Payee " + payeeForm.get().name + " has been created");
        return GO_HOME;
    }
    
    /**
     * Handle payee deletion
     */
    public static Result delete(Long id) {
        Payee.find.ref(id).delete();
        flash("success", "Payee has been deleted");
        return GO_HOME;
    }
    

}
            
