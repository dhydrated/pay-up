package controllers;

import static play.data.Form.form;
import models.Group;
import play.Logger.ALogger;
import play.data.Form;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.Security;
import views.html.groups.createForm;
import views.html.groups.editForm;
import views.html.groups.list;

/**
 * Manage a database of groups
 */
@Security.Authenticated(Secured.class)
public class GroupApplication extends Controller {

	static ALogger logger = play.Logger.of(GroupApplication.class);
	
    /**
     * This result directly redirect to application home.
     */
    public static Result GO_HOME = redirect(
        routes.GroupApplication.list(0, "name", "asc", "")
    );
    
    /**
     * Handle default path requests, redirect to groups list
     */
    public static Result index() {
        return GO_HOME;
    }

    /**
     * Display the paginated list of groups.
     *
     * @param page Current page number (starts from 0)
     * @param sortBy Column to be sorted
     * @param order Sort order (either asc or desc)
     * @param filter Filter applied on group names
     */
    public static Result list(int page, String sortBy, String order, String filter) {
        return ok(
            list.render(
                Group.page(page, 10, sortBy, order, filter),
                sortBy, order, filter
            )
        );
    }
    
    /**
     * Display the 'edit form' of a existing Group.
     *
     * @param id Id of the group to edit
     */
    public static Result edit(Long id) {
    	
        Form<Group> groupForm = form(Group.class).fill(
            Group.find.byId(id)
        );
        return ok(
            editForm.render(id, groupForm)
        );
    }
    
    /**
     * Handle the 'edit form' submission 
     *
     * @param id Id of the group to edit
     */
    public static Result update(Long id) {
        Form<Group> groupForm = form(Group.class).bindFromRequest();
        if(groupForm.hasErrors()) {
            return badRequest(editForm.render(id, groupForm));
        }
        groupForm.get().update(id);
        flash("success", "Group " + groupForm.get().name + " has been updated");
        return GO_HOME;
    }
    
    /**
     * Display the 'new group form'.
     */
    public static Result create() {
        Form<Group> groupForm = form(Group.class);
        return ok(
            createForm.render(groupForm)
        );
    }
    
    /**
     * Handle the 'new group form' submission 
     */
    public static Result save() {
        Form<Group> groupForm = form(Group.class).bindFromRequest();
        if(groupForm.hasErrors()) {
            return badRequest(createForm.render(groupForm));
        }
        groupForm.get().save();
        flash("success", "Group " + groupForm.get().name + " has been created");
        return GO_HOME;
    }
    
    /**
     * Handle group deletion
     */
    public static Result delete(Long id) {
        Group.find.ref(id).delete();
        flash("success", "Group has been deleted");
        return GO_HOME;
    }
    

}
            
