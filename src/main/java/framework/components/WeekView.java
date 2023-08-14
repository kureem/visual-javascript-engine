package framework.components;

import framework.components.api.Renderable;
import jsweet.lang.Array;
import jsweet.lang.Date;
import jsweet.lang.Object;
import static jsweet.lang.Globals.parseFloat;

public class WeekView extends JSContainer{

	
	private Date startDate = new Date();
	
	
	private int days = 1;
	//private Date endDate;
	
	private double startHour = 0;
	
	private double endHour = 23;
	
	public static int CELL_HEIGHT = 22;
	
	
	private Box header = new Box("header", 12,12);
	
	private Box headerLeftGutter = new Box("headerLeftGutter", 1, 12);
	private Box headerRightBody = new Box("headerRightBody", 11,12);
	
	private Box body = new Box("body", 12,12);
	
	private Box bodyLeftGutter = new Box("bodyLeftGutter", 1,12);
	private WeekViewBody bodyRightBody = new WeekViewBody("bodyRightBody");
	
	
	public WeekView(String name) {
		super(name, "div");
		addClass("slds-grid slds-wrap spn-week-view brd-top brd-left WeekView");
		header.addClass("spn-header brd-btm");
		body.addClass("spn-body");
		
		addChild(header);
		addChild(body);
		
		headerLeftGutter.addClass( "spn-header-left-gutter");
		header.addChild(headerLeftGutter);
		headerRightBody.addClass("spn-header-right-body");
		header.addChild(headerRightBody);
		
		bodyLeftGutter.addClass( "spn-body-left-gutter brd-right");
		body.addChild(bodyLeftGutter);
		body.addChild(bodyRightBody);
		
		
		body.setStyle("height", "729px");
		body.setStyle("overflow", "auto");
		
	}
	
	public void reset() {
		fillAll();
	}
	
	protected void fillAll() {
		fillLeftGutter();
		fillRightBody();
	}
	
	
	private String formatDate(Date date) {
		
		String[] days = new String[] {"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"};
		
		double day = date.getDay();
		
		double iDate = date.getDate();
		
		double month = date.getMonth() + 1;
		
		String sDate = iDate < 10? "0"+ iDate : iDate + "";
		String sMonth = month < 10? "0" + month : month + "";
		return days[(int)day] + " " + sDate + "/" + sMonth;
	}
	
	protected void fillLeftGutter() {
		headerLeftGutter.clearChildren();
		headerLeftGutter.setRendered(false);
		JSContainer hgut = new JSContainer("div");
		hgut.addClass("slds-col slds-size_1-of-1");
		hgut.addClass("spn-header-left-gutter-cell");
		//headerLeftGutter.addChild(hgut.setStyle("height", CELL_HEIGHT + "px"));
		
		
		bodyLeftGutter.clearChildren();
		bodyLeftGutter.setRendered(false);
		for(double i = startHour; i<= endHour; i++) {
			Box gut = new Box("gut",1,1);
			gut.addClass("spn-body-left-gutter-cell");
			bodyLeftGutter.addChild(gut);
			
			Col fullHr = new Col("fullHr",1,1);
			fullHr.addClass("brd-btm");
			fullHr.setStyle("height", CELL_HEIGHT + "px");
			fullHr.setHtml(i + ":00");
			gut.addChild(fullHr);
			Col halfHr = new Col("halfHr",1,1);
			halfHr.addClass("brd-btm");
			halfHr.setStyle("height", CELL_HEIGHT + "px");
			gut.addChild(halfHr);
			
		}
	}
	
	protected void fillRightBody() {
		
		startDate.setHours(0, 0, 0, 0);
		double day = startDate.getDay();
		if(day > 0) {
			double toRemove = 1000*60*60*24*(day-1);
			startDate = new Date(startDate.getTime() - toRemove);
		}else {
			double toRemove = 1000*60*60*24*6;
			startDate = new Date(startDate.getTime() - toRemove);
		}
		headerRightBody.clearChildren();
		headerRightBody.setRendered(false);
		bodyRightBody.clearChildren();
		bodyRightBody.setRendered(false);
		for(double d = 0; d < days; d++) {
			double aDay = 1000*60*60*24*d;
			Date dt = new Date(startDate.getTime() + aDay);
			
			Col headerRightBodyCell = new Col("div",1,days);
			headerRightBodyCell.addClass("spn-header-right-body-cell brd-right");
			headerRightBodyCell.setHtml(formatDate(dt));
			headerRightBody.addChild(headerRightBodyCell.setStyle("height", CELL_HEIGHT + "px"));
		}
		
		
			
		for(double h = startHour; h<=endHour;h++) {
			
			for(double d = 0; d < days; d++) {
				double aDay = 1000*60*60*24*d;
				Date dt = new Date(startDate.getTime() + aDay);
				WeekViewDateCell bodyRightBodyCell = new WeekViewDateCell(dt,h,days);
				bodyRightBody.addChild(bodyRightBodyCell);
				
			}
			
			
		}
		
	}
	
	public void setStartDate(Date date) {
		this.startDate = date;
	}
	
	
	public void setTimeRange(double startHour, double endHour) {
		this.startHour = startHour;
		this.endHour = endHour;
	}
	
	public void removeCalEvent(ViewEvent uiCalEvt) {
		for(WeekViewDateCell r : bodyRightBody.getCells()) {
			r.removeCalEvent(uiCalEvt);
		}
		
		adjustEventWidth();
	}
	
	public void adjustEventWidth() {
		Array<WeekViewCell> multiHold = new Array<WeekViewCell>();
		for(WeekViewDateCell dcell : bodyRightBody.getCells()) {
			
			for(WeekViewCell cell : dcell.getCells()) {
				Array<ViewEvent> holding = cell.getHolding();
				double size = holding.length;
				if(size > 0) {
					multiHold.push(cell);
				}
			}
			
		}
		
		WeekViewCell[] sorted = multiHold.sort((a,b)->{
			return (b.getHolding().length - a.getHolding().length);
		});
		
		Object done = new Object();
		//1: 0
		//2: 0, 40
		//3: 0,30,60
		for(WeekViewCell cell : sorted) {
			Array<ViewEvent> hds = cell.getHolding();
			double size = hds.length;
			System.out.println("size::" + size);
			for(ViewEvent ev : hds) {
				if(!done.hasOwnProperty(ev.getId())) {
					done.$set(ev.getId(), ev);
					if(size ==1) {
						ev.setStyle("width",  "90%");
					}else {
						ev.setStyle("width", (100/size) + "%");
					}
					ev.setStyle("left",(90/size) *hds.indexOf(ev) + "%");
				}
				
				
			}
			
		}
	}
	
	public void addCalEvent(Object evt) {
	
		WeekViewEvent wk = new WeekViewEvent("");
		wk.setValue(evt);
		
		Date startDate = wk.getStartDate();
		Date endDate = wk.getEndDate();
		
		WeekViewDateCell cell = getDateCell(startDate);
		cell.addCalEvent(wk);
		
		double startHr = startDate.getHours();
		double startMin = startDate.getMinutes();
		double endHr = endDate.getHours();
		double endMin = endDate.getMinutes();
		double counter = 0;
		
		// 4 - 7
		// 4,5,6 - i
		// 1,2,3 - counter
		// 5,6,7 - hr
		for(double i = startHr; i < endHr;i++) {
			counter++;
			Date tmpDate = Util.addHour(startDate, counter);
			
			WeekViewDateCell hcell = getDateCell(tmpDate);
			hcell.holdHr(wk);
			if(i < endHr-1) {
				hcell.holdHalfHr(wk);
			}else {
				if(endMin > 0) {
					hcell.holdHalfHr(wk);
				}
			}
			
		}
		
		adjustEventWidth();
		
	}
	
	public void unHoldEvent(WeekViewEvent uiCalEvt) {
		bodyRightBody.unholdEvent(uiCalEvt);
	}
	
	public void adjustHolding(WeekViewEvent uiCalEvt) {
		unHoldEvent(uiCalEvt);
		Array<WeekViewCell> cells = getCellsForDateRange(uiCalEvt.getStartDate(), uiCalEvt.getEndDate());
		for(WeekViewCell cell : cells) {
			cell.hold(uiCalEvt);
		}
	}
	
	public void moveCalEvent(ViewEvent uiCalEvt, Object newEvt) {
		removeCalEvent(uiCalEvt);
		addCalEvent(newEvt);
	}
	
	public Array<WeekViewCell> getCellsForDateRange(Date startDate, Date endDate){
		Array<WeekViewCell> result = new Array<WeekViewCell>();
		double startHr = startDate.getHours();
		double startMins = startDate.getMinutes();
		double endHr = endDate.getHours();
		double endMins = endDate.getMinutes();
		for(double i = startHr; i <= endHr; i++) {
			Date tmp = new Date(startDate.getFullYear(),startDate.getMonth(), startDate.getDate(),i,0);
			WeekViewDateCell cell = getDateCell(tmp);
			if(i == startHr && startMins == 0) {
				result.push(cell.getCellHr());
				result.push(cell.getCellHalfHr());
			}else if(i == startHr && startMins > 0) {
				result.push(cell.getCellHalfHr());
			}
			else if(i == endHr && endMins > 0) {
				result.push(cell.getCellHr());
				result.push(cell.getCellHalfHr());
			}else if(i == endHr && endMins == 0){
				result.push(cell.getCellHr());
			}else {
				result.push(cell.getCellHr());
				result.push(cell.getCellHalfHr());
			}
		}
		return result;
		
	}
	
	
	public WeekViewDateCell getDateCell(Date date) {
		double hr = date.getHours();
		for(WeekViewDateCell cell : bodyRightBody.getCells()) {
			if(Util.isSameDate(cell.getDate(), date)) {
				if(cell.getHour() == hr)
					return cell;
			}
		}
		return null;
	}
	
	
	
	
	

}
