package controllers;

import java.util.List;

import models.Payment;
import models.Report;
import play.data.Form;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.Security;
import views.html.reports.createForm;
import views.html.reports.editForm;
import views.html.reports.list;

/**
 * Manage a database of reports
 */
@Security.Authenticated(Secured.class)
public class ReportApplication extends Controller {
    
    /**
     * This result directly redirect to application home.
     */
    public static Result GO_HOME = redirect(
        routes.ReportApplication.list(0, "name", "asc", "")
    );
    
    /**
     * Handle default path requests, redirect to reports list
     */
    public static Result index() {
        return GO_HOME;
    }

    /**
     * Display the paginated list of reports.
     *
     * @param page Current page number (starts from 0)
     * @param sortBy Column to be sorted
     * @param order Sort order (either asc or desc)
     * @param filter Filter applied on report names
     */
    public static Result list(int page, String sortBy, String order, String filter) {
        return ok(
            list.render(
                Report.page(page, 10, sortBy, order, filter),
                sortBy, order, filter
            )
        );
    }
    
    /**
     * Display the 'edit form' of a existing Report.
     *
     * @param id Id of the report to edit
     */
    public static Result edit(Long id) {
        Form<Report> reportForm = form(Report.class).fill(
            Report.find.byId(id)
        );
        return ok(
            editForm.render(id, reportForm)
        );
    }
    
    /**
     * Handle the 'edit form' submission 
     *
     * @param id Id of the report to edit
     */
    public static Result update(Long id) {
        Form<Report> reportForm = form(Report.class).bindFromRequest();
        if(reportForm.hasErrors()) {
            return badRequest(editForm.render(id, reportForm));
        }
        reportForm.get().update(id);
//        flash("success", "Report " + reportForm.get().name + " has been updated");
        
        return edit(reportForm.get().id);
//        return GO_HOME;
    }
    
    /**
     * Display the 'new report form'.
     */
    public static Result create() {
        Form<Report> reportForm = form(Report.class);
        return ok(
            createForm.render(reportForm)
        );
    }
    
    /**
     * Handle the 'new report form' submission 
     */
    public static Result save() {
        Form<Report> reportForm = form(Report.class).bindFromRequest();
        if(reportForm.hasErrors()) {
            return badRequest(createForm.render(reportForm));
        }
        reportForm.get().save();
//        flash("success", "Report " + reportForm.get().name + " has been created");
        
        return edit(reportForm.get().id);
        
//        return GO_HOME;
    }
    
    /**
     * Handle report deletion
     */
    public static Result delete(Long id) {
        Report.find.ref(id).delete();
        flash("success", "Report has been deleted");
        return GO_HOME;
    }
    

    public static Result apiReportData(Long id){
    	Report report = Report.find.byId(id);
    	
    	return ok(Json.toJson(report.getData()));
    }
    

}
            
