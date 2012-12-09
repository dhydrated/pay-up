package controllers;

import models.User;
import play.data.Form;
import play.mvc.Controller;
import play.mvc.Result;
import views.html.userCreateForm;
import views.html.userEditForm;
import views.html.userList;

/**
 * Manage a database of users
 */
public class UserApplication extends Controller {
    
    /**
     * This result directly redirect to application home.
     */
    public static Result GO_HOME = redirect(
        routes.UserApplication.list(0, "name", "asc", "")
    );
    
    /**
     * Handle default path requests, redirect to users list
     */
    public static Result index() {
        return GO_HOME;
    }

    /**
     * Display the paginated list of users.
     *
     * @param page Current page number (starts from 0)
     * @param sortBy Column to be sorted
     * @param order Sort order (either asc or desc)
     * @param filter Filter applied on user names
     */
    public static Result list(int page, String sortBy, String order, String filter) {
        return ok(
            userList.render(
                User.page(page, 10, sortBy, order, filter),
                sortBy, order, filter
            )
        );
    }
    
    /**
     * Display the 'edit form' of a existing User.
     *
     * @param id Id of the user to edit
     */
    public static Result edit(Long id) {
        Form<User> userForm = form(User.class).fill(
            User.find.byId(id)
        );
        return ok(
            userEditForm.render(id, userForm)
        );
    }
    
    /**
     * Handle the 'edit form' submission 
     *
     * @param id Id of the user to edit
     */
    public static Result update(Long id) {
        Form<User> userForm = form(User.class).bindFromRequest();
        if(userForm.hasErrors()) {
            return badRequest(userEditForm.render(id, userForm));
        }
        userForm.get().update(id);
        flash("success", "User " + userForm.get().name + " has been updated");
        return GO_HOME;
    }
    
    /**
     * Display the 'new user form'.
     */
    public static Result create() {
        Form<User> userForm = form(User.class);
        return ok(
            userCreateForm.render(userForm)
        );
    }
    
    /**
     * Handle the 'new user form' submission 
     */
    public static Result save() {
        Form<User> userForm = form(User.class).bindFromRequest();
        if(userForm.hasErrors()) {
            return badRequest(userCreateForm.render(userForm));
        }
        userForm.get().save();
        flash("success", "User " + userForm.get().name + " has been created");
        return GO_HOME;
    }
    
    /**
     * Handle user deletion
     */
    public static Result delete(Long id) {
        User.find.ref(id).delete();
        flash("success", "User has been deleted");
        return GO_HOME;
    }
    

}
            
