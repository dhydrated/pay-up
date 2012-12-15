import static org.fest.assertions.Assertions.assertThat;
import static play.test.Helpers.fakeApplication;
import static play.test.Helpers.inMemoryDatabase;
import static play.test.Helpers.running;

import java.util.Date;

import models.Payment;

import org.junit.Test;

import com.avaje.ebean.Page;

public class ModelTest {
    
    private String formatted(Date date) {
        return new java.text.SimpleDateFormat("yyyy-MM-dd").format(date);
    }

    @Test
    public void findById() {
        running(fakeApplication(), new Runnable() {
           public void run() {
               Payment macintosh = Payment.find.byId(21l);
               assertThat(macintosh.name).isEqualTo("Macintosh");
               assertThat(formatted(macintosh.paidDate)).isEqualTo("1984-01-24");
           }
        });
    }
    
    @Test
    public void pagination() {
        running(fakeApplication(inMemoryDatabase()), new Runnable() {
           public void run() {
               Page<Payment> computers = Payment.page(1, 20, "name", "ASC", "");
               assertThat(computers.getTotalRowCount()).isEqualTo(574);
               assertThat(computers.getList().size()).isEqualTo(20);
           }
        });
    }
    
}
