package controllers;

import static play.data.Form.form;

import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import models.DataManagementForm;

import org.apache.commons.io.FileUtils;

import play.Logger.ALogger;
import play.data.Form;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.Security;
import views.html.data_management.mainForm;

import com.avaje.ebean.Ebean;
import com.avaje.ebean.SqlQuery;
import com.avaje.ebean.SqlRow;


@Security.Authenticated(Secured.class)
public class DataManagementApplication extends Controller {

	static ALogger logger = play.Logger.of(DataManagementApplication.class);
	
	/**
	 * Display page
	 */
	public static Result display() {

		DataManagementForm dataManagement = new DataManagementForm();

		Form<DataManagementForm> dataManagementForm = form(DataManagementForm.class).fill(dataManagement);
		return ok(mainForm.render(dataManagementForm));
	}
	
	public static Result exportToCsv() {

		Form<DataManagementForm> dataManagementForm = form(DataManagementForm.class).bindFromRequest();
		if (dataManagementForm.hasErrors()) {
			logger.debug("error");
			return badRequest(mainForm.render(dataManagementForm));
		}
		//TODO: export data
		Date startDate = dataManagementForm.get().startDate;
		Date endDate = dataManagementForm.get().endDate;

		DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		
		logger.debug(df.format(startDate));
		logger.debug(df.format(endDate));
		
		StringBuffer queryBuffer = new StringBuffer();
		queryBuffer.append("SELECT ");
		queryBuffer.append("pay.id, ");
		queryBuffer.append("amount, "); 
		queryBuffer.append("remarks, "); 
		queryBuffer.append("reference, "); 
		queryBuffer.append("paid_date::date, "); 
		queryBuffer.append("payee.name as payee, "); 
		queryBuffer.append("type.name as payment_type, "); 
		queryBuffer.append("start_period::date, "); 
		queryBuffer.append("end_period::date, "); 
		queryBuffer.append("payer.name as payer, "); 
		queryBuffer.append("payee_account_number ");
		queryBuffer.append("from "); 
		queryBuffer.append("payments pay ");
		queryBuffer.append("join users payee on pay.payee_id = payee.id ");
		queryBuffer.append("join users payer on pay.payer_id = payer.id ");
		queryBuffer.append("join payment_types type on pay.payment_type_id = type.id ");
		queryBuffer.append("WHERE pay.start_period BETWEEN '%s' AND '%s'");
		
		String query = String.format(queryBuffer.toString(), df.format(startDate), df.format(endDate));

    	SqlQuery q = Ebean.createSqlQuery(query);
    	
    	List<SqlRow> rows = q.findList();
    	
    	StringBuffer content = new StringBuffer();
    	int rowIndex = 0;
    	int columnIndex = 0;
    	if(rows != null){
    		for(SqlRow row : rows){
				if(rowIndex==0){
					columnIndex = 0;
					for(String key : row.keySet()){
						if(columnIndex > 0){
	    					content.append(",");
	    				}
						if(key != null){
	    					content.append(key.toString());
	    				}
						columnIndex++;
					}
					content.append("\n");
				}
				
				columnIndex = 0;
    			for(Object value : row.values()){
    				if(columnIndex > 0){
    					content.append(",");
    				}
    				if(value != null){
    					content.append(value.toString());
    				}
					columnIndex++;
    			}
				content.append("\n");
    			rowIndex++;
    		}
    	}
		
    	File file = null;
		try {
			file = new java.io.File("/tmp/"+ java.net.URLEncoder.encode("export.csv", "UTF-8"));
			FileUtils.writeStringToFile(file, content.toString());
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return ok(file);
	}
}
