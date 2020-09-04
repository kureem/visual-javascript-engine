package framework.components.input;

import static jsweet.lang.Globals.parseInt;

import jsweet.lang.Date;

public class JSTimeInput extends AbstractJSInput<Date>{
	
	private Date savedDate = new Date();

	public JSTimeInput(String name) {
		super(name);
		setAttribute("type", "time");
		setAttribute("identifier", "html:time-input");
	}

	@Override
	public Date getValue() {
		String time = getStringValue();
		Date d = savedDate;
		if(time != null && time.contains(":")){
			String[] htmn = time.split(":");
			d.setHours(parseInt(htmn[0]), parseInt(htmn[1]));
		}
		return d;
	}

	@Override
	public void setValue(Date val) {
		if(val != null){
			savedDate = val;
			String mins = val.getMinutes() + "";
			if(mins.length() ==1){
				mins = "0" + mins;
			}
			String hrs = val.getHours() + "";
			if(hrs.length() == 1){
				hrs = "0" + hrs;
			}
			setStringValue(hrs + ":" + mins);
		}
	}

}
