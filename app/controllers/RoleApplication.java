package controllers;

import static play.data.Form.form;
import models.Role;
import play.Logger.ALogger;
import play.data.Form;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.Security;
import views.html.roles.createForm;
import views.html.roles.editForm;
import views.html.roles.list;

/**
 * Manage a database of roles
 */
@Security.Authenticated(Secured.class)
public class RoleApplication extends Controller {

	static ALogger logger = play.Logger.of(RoleApplication.class);
	
    /**
     * This result directly redirect to application home.
     */
    public static Result GO_HOME = redirect(
        routes.RoleApplication.list(0, "name", "asc", "")
    );
    
    /**
     * Handle default path requests, redirect to roles list
     */
    public static Result index() {
        return GO_HOME;
    }

    /**
     * Display the paginated list of roles.
     *
     * @param page Current page number (starts from 0)
     * @param sortBy Column to be sorted
     * @param order Sort order (either asc or desc)
     * @param filter Filter applied on role names
     */
    public static Result list(int page, String sortBy, String order, String filter) {
        return ok(
            list.render(
                Role.page(page, 10, sortBy, order, filter),
                sortBy, order, filter
            )
        );
    }
    
    /**
     * Display the 'edit form' of a existing Role.
     *
     * @param id Id of the role to edit
     */
    public static Result edit(Long id) {
    	
        Form<Role> roleForm = form(Role.class).fill(
            Role.find.byId(id)
        );
        return ok(
            editForm.render(id, roleForm)
        );
    }
    
    /**
     * Handle the 'edit form' submission 
     *
     * @param id Id of the role to edit
     */
    public static Result update(Long id) {
        Form<Role> roleForm = form(Role.class).bindFromRequest();
        if(roleForm.hasErrors()) {
            return badRequest(editForm.render(id, roleForm));
        }
        roleForm.get().update(id);
        flash("success", "Role " + roleForm.get().name + " has been updated");
        return GO_HOME;
    }
    
    /**
     * Display the 'new role form'.
     */
    public static Result create() {
        Form<Role> roleForm = form(Role.class);
        return ok(
            createForm.render(roleForm)
        );
    }
    
    /**
     * Handle the 'new role form' submission 
     */
    public static Result save() {
        Form<Role> roleForm = form(Role.class).bindFromRequest();
        if(roleForm.hasErrors()) {
            return badRequest(createForm.render(roleForm));
        }
        roleForm.get().save();
        flash("success", "Role " + roleForm.get().name + " has been created");
        return GO_HOME;
    }
    
    /**
     * Handle role deletion
     */
    public static Result delete(Long id) {
        Role.find.ref(id).delete();
        flash("success", "Role has been deleted");
        return GO_HOME;
    }
    

}
            
