package models;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;


public class MonthlyPayment extends Payment{

    public List<Integer> months = new ArrayList<Integer>();
    public List<String> references = new ArrayList<String>();
    
    public Integer year = Calendar.getInstance().get(Calendar.YEAR);
}
