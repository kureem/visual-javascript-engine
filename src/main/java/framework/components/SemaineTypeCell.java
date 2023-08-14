package framework.components;

import framework.components.api.EventListener;
import framework.components.api.Renderable;
import jsweet.dom.Event;

public class SemaineTypeCell extends JSContainer {

	private int hour;

	private int minute;

	private String day;

	public SemaineTypeCell(String day, int hour, int minute) {
		super(day, "td");
		this.hour = hour;
		this.minute = minute;
		this.day = day;
		addClass("cell");
		setStyle("cursor", "pointer");
		setStyle("padding", "0");
		
		addEventListener(new EventListener() {
			
			@Override
			public void performAction(Renderable source, Event evt) {
				SemaineType sm = source.getAncestorWithClass("myapp");
				jsweet.lang.Object params = new jsweet.lang.Object();
				String time = Util.getTime(hour, minute);
				params.$set("time", time);
				params.$set("day", day);
				sm.callHelper("handleCreate", params);
				
			}
		}, "click");

	}

	public int getHour() {
		return hour;
	}

	public int getMinute() {
		return minute;
	}

	public String getDay() {
		return day;
	}

}
