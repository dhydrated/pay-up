package controllers;

import static play.data.Form.form;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.util.List;

import models.Payment;
import models.PaymentArtifact;

import org.apache.commons.io.IOUtils;

import play.Logger.ALogger;
import play.data.Form;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Http.MultipartFormData;
import play.mvc.Http.MultipartFormData.FilePart;
import play.mvc.Result;
import play.mvc.Security;
import views.html.payments.createForm;
import views.html.payments.editForm;
import views.html.payments.list;

/**
 * Manage a database of payments
 */
@Security.Authenticated(Secured.class)
public class Application extends Controller {

	static ALogger logger = play.Logger.of(Application.class);

	/**
	 * This result directly redirect to application home.
	 */
	public static Result GO_HOME = redirect(routes.Application.list(0,
			"paid_date", "desc", ""));

	/**
	 * Handle default path requests, redirect to payments list
	 */
	public static Result index() {
		return GO_HOME;
	}

	/**
	 * Display the paginated list of payments.
	 * 
	 * @param page
	 *            Current page number (starts from 0)
	 * @param sortBy
	 *            Column to be sorted
	 * @param order
	 *            Sort order (either asc or desc)
	 * @param filter
	 *            Filter applied on payment names
	 */
	public static Result list(int page, String sortBy, String order,
			String filter) {
		return ok(list.render(Payment.page(page, 10, sortBy, order, filter),
				sortBy, order, filter));
	}

	public static Result apiList() {
		List<Payment> payments = Payment.find.findList();
		return ok(Json.toJson(payments));
	}

	/**
	 * Display the 'edit form' of a existing Payment.
	 * 
	 * @param id
	 *            Id of the payment to edit
	 */
	public static Result edit(Long id) {

		logger.debug("hello");
		Form<Payment> paymentForm = form(Payment.class).fill(
				Payment.find.byId(id));

		return ok(editForm.render(id, paymentForm, getPaymentArtifacts(id)));
	}

	private static List<PaymentArtifact> getPaymentArtifacts(Long paymentId) {

		return PaymentArtifact.findByPaymentId(paymentId);
	}

	/**
	 * Handle the 'edit form' submission
	 * 
	 * @param id
	 *            Id of the payment to edit
	 */
	public static Result update(Long id) {
		Form<Payment> paymentForm = form(Payment.class).bindFromRequest();
		if (paymentForm.hasErrors()) {
			return badRequest(editForm.render(id, paymentForm,
					getPaymentArtifacts(id)));
		}
		paymentForm.get().update(id);
		flash("success", "Payment " + paymentForm.get().name
				+ " has been updated");
		return GO_HOME;
	}

	/**
	 * Display the 'new payment form'.
	 */
	public static Result create() {

		Payment payment = new Payment();

		Form<Payment> paymentForm = form(Payment.class).fill(payment);
		return ok(createForm.render(paymentForm));
	}

	/**
	 * Handle the 'new payment form' submission
	 */
	public static Result save() {
		Form<Payment> paymentForm = form(Payment.class).bindFromRequest();
		if (paymentForm.hasErrors()) {
			return badRequest(createForm.render(paymentForm));
		}
		paymentForm.get().save();
		flash("success", "Payment " + paymentForm.get().name
				+ " has been created");
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

	public static Result uploadFile(Long paymentId) throws Exception {
		logger.debug("in upload()");
		MultipartFormData body = request().body().asMultipartFormData();
		FilePart filePart = body.getFile("picture");
		if (filePart != null) {
			String fileName = filePart.getFilename();
			String contentType = filePart.getContentType();
			File file = filePart.getFile();

			Payment payment = Payment.find.byId(paymentId);

			PaymentArtifact artifact = new PaymentArtifact();
			artifact.name = fileName;
			artifact.type = contentType;
			FileInputStream fis = new FileInputStream(file);
			artifact.data = IOUtils.toByteArray(fis);
			artifact.payment = payment;
			artifact.save();

			logger.debug(artifact.id.toString());
			logger.debug(fileName);
			return ok("File uploaded");
		} else {
			flash("error", "Missing file");
			return redirect(routes.Application.index());
		}
	}

	public static Result getPaymentArtifact(Long id) throws Exception {

		PaymentArtifact artifact = PaymentArtifact.find.byId(id);
		
		/*File file = new java.io.File("/tmp/"+artifact.id + "_" + artifact.name);
		FileUtils.writeByteArrayToFile(file, artifact.data);*/

		FileOutputStream fos = new FileOutputStream("/tmp/"+artifact.id + "_" + artifact.name); 
		fos.write(artifact.data);
		fos.close();
		
		File file = new java.io.File("/tmp/"+artifact.id + "_" + artifact.name);
		
		return ok(file);
	}

}
