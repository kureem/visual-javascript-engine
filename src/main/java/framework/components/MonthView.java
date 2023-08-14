package framework.components;

import jsweet.lang.Date;
import jsweet.lang.Object;

public class MonthView extends JSContainer {

	private Date startDate = new Date();

	public static int CELL_HEIGHT = 100;

	private int days = 7;

	private Box header = new Box("header", 12, 12);

	private MonthViewBody body = new MonthViewBody("body");
	
	private final static String[] DAYS = new String[] {"Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"};

	public MonthView(String name) {
		super(name, "div");
		addClass("MonthView");
		addClass("spn-month-view");
		addChild(header);
		header.addClass("spn-month-view-header");
		addChild(body);
		
		addClass("brd-left");
		addClass("brd-top");
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public void reset() {
		fillHeader();
		fillBody();
	}

	private void fillHeader() {
		header.clearChildren();
		header.setRendered(false);
		for (int i = 0; i < days; i++) {
			Box cell = new Box(DAYS[i], 1, days);
			cell.addClass("spn-month-view-header-cell");
			cell.setHtml(DAYS[i]);
			header.addChild(cell);
			cell.addClass("brd-btm");
			
			cell.addClass("brd-right");
			
		}
		
		
	}

	private void fillBody() {
		Date firstDate = new Date(startDate.getFullYear(), startDate.getMonth(), 1, 0, 0);
		double firstDay = startDate.getDay();
		if (firstDay == 0) {
			firstDay = 7;
		}

		firstDate = Util.addDays(firstDate, 1 - firstDay);
		Date endDate = Util.getLastDateOfMonth(startDate);

		Date lastDate = endDate;
		double lastDay = endDate.getDay();
		if (lastDay == 1) {
			lastDate = Util.addDays(endDate, 6);
		} else if (lastDay == 2) {
			lastDate = Util.addDays(endDate, 5);
		}
		if (lastDay > 0)
			lastDate = Util.addDays(endDate, days - lastDay);

		Date tmp = firstDate;
		int counter = 0;
		while (true) {
			MonthViewCell c = new MonthViewCell("", days);
			c.setStyle("height", CELL_HEIGHT + "px");
			c.setDate(tmp);
			body.addChild(c);
			if (tmp.getTime() >= lastDate.getTime()) {
				break;
			} else {
				tmp = Util.addDays(tmp, 1);
			}
			counter++;
		}
		
		double rows = (counter/days)+1;
		
		body.setStyle("height", (CELL_HEIGHT*rows) + "px");
	}
	
	public void addCalEvent(Object evt) {
		
		MonthViewEvent wk = new MonthViewEvent("");
		wk.setValue(evt);
		
		Date startDate = wk.getStartDate();
		
		MonthViewCell cell = getCell(startDate);
		cell.addCalEvent(wk);
	}
	
	public void removeCalEvent(ViewEvent uiCalEvt) {
		for(MonthViewCell r : body.getCells()) {
			r.removeCalEvent(uiCalEvt);
		}
		
	}
	
	public void moveCalEvent(ViewEvent uiCalEvent, Object newEvent) {
		removeCalEvent(uiCalEvent);
		addCalEvent(newEvent);
	}
	
	public MonthViewCell getCell(Date dt) {
		for(MonthViewCell cell : body.getCells()) {
			if(cell.isSameDate(dt)) {
				return cell;
			}
		}
		return null;
	}
}
