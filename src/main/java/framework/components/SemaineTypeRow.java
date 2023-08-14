package framework.components;

public class SemaineTypeRow extends JSContainer {

	private int hour;

	private int minute;

	public SemaineTypeRow( int hour, int minute) {
		super(Util.getTime(hour, minute), "tr");
		this.hour = hour;
		this.minute = minute;
		
		JSContainer head = new JSContainer("td");
		head.setHtml(minute == 0?Util.getTime(hour, minute):"");
		addChild(head);
		
		for(String day : Util.DAYS) {
			SemaineTypeCell cell = new SemaineTypeCell(day, hour, minute);
			addChild(cell);
			
		}

	}

	public int getHour() {
		return hour;
	}

	public int getMinute() {
		return minute;
	}

}
