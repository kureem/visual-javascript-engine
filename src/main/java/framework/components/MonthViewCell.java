package framework.components;

import static jsweet.dom.Globals.console;
import static jsweet.dom.Globals.prompt;
import static jsweet.lang.Globals.parseFloat;

import framework.components.api.EventListener;
import framework.components.api.Renderable;
import jsweet.dom.Event;
import jsweet.dom.HTMLElement;
import jsweet.lang.Date;
import jsweet.lang.Object;

public class MonthViewCell extends Box{

	private Date date;
	
	private Box header = new Box("header", 1,1);
	
	private Box body = new Box("body", 1,1);
	
	public MonthViewCell(String name,  int of) {
		super(name, 1, of);
		addClass("spn-month-view-cell");
		
		addChild(header);
		addChild(body);
		
		header.setStyle("height", (MonthView.CELL_HEIGHT/6) + "px");
		body.setStyle("height", (MonthView.CELL_HEIGHT*5/6) + "px");
		body.setStyle("overflow-y", "auto");
		
		addClass("brd-btm");
		addClass("brd-right");
		
		addEventListener(new EventListener() {

			@Override
			public void performAction(Renderable source, Event evt) {
				double top = source.getNative().offsetTop;
				double left = source.getNative().offsetLeft;
				
				double hour = 17;
				double min = 30;

				console.log("{" + left + "," + top + "}");

				String shrs = prompt("Number of hours:");

				if (shrs != null) {
					Object ce = new Object();
					ce.$set("title", "New Event");
					ce.$set("description", "Arbitrary event added");

					Date startDate = new Date(date.getFullYear(),date.getMonth(),date.getDate(),parseFloat(shrs), 30);
					Date endDate = Util.addHour(startDate, 4);
					ce.$set("startDate", startDate);
					ce.$set("endDate", endDate);

					MonthView wj = source.getAncestorWithClass("spn-month-view");
					wj.addCalEvent(ce);
				}

			}
		}, "dblclick");

		addEventListener(new EventListener() {

			@Override
			public void performAction(Renderable source, Event evt) {
				if (WeekViewDndManager.dragging != null) {
					evt.preventDefault();
					source.addClass("drag-over");
					//((HTMLElement) evt.target).classList.add("drag-over");
				}
			}
		}, "dragenter");

		addEventListener(new EventListener() {

			@Override
			public void performAction(Renderable source, Event evt) {
				if (WeekViewDndManager.dragging != null) {
					evt.preventDefault();
					source.addClass("drag-over");
					//((HTMLElement) evt.target).classList.add("drag-over");
				}
			}
		}, "dragover");

		addEventListener(new EventListener() {

			@Override
			public void performAction(Renderable source, Event evt) {
				if (WeekViewDndManager.dragging != null) {
					evt.preventDefault();
					source.removeClass("drag-over");
					//((HTMLElement) evt.target).classList.remove("drag-over");
				}
			}
		}, "dragleave");

		addEventListener(new EventListener() {

			@Override
			public void performAction(Renderable source, Event evt) {

				if (WeekViewDndManager.dragging != null) {

					evt.preventDefault();
					source.removeClass("drag-over");
					((HTMLElement) evt.target).classList.remove("drag-over");

					ViewEvent dragging = WeekViewDndManager.dragging;
					if (dragging != null) {
						Date srcStartDate = dragging.getStartDate();
						Date startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), srcStartDate.getHours(), srcStartDate.getMinutes());
						Object newEvt = dragging.getNewEvent(startDate);
						MonthView wek = source.getAncestorWithClass("spn-month-view");
						wek.moveCalEvent(dragging, newEvt);
						WeekViewDndManager.dragging = null;
					}
				}
			}
		}, "drop");
		
	}
	
	
	public void setDate(Date date) {
		this.date= date;
		header.setHtml(date.getDate() + "");
	}
	
	
	public boolean isSameDate(Date dt) {
		if(dt.getFullYear() == date.getFullYear()) {
			if(dt.getMonth() == date.getMonth()) {
				if(dt.getDate() == date.getDate()) {
					return true;
				}
			}
		}
		return false;
	}
	
	public void addCalEvent(ViewEvent uiCalEvent) {
		body.addChild(uiCalEvent);
	}
	
	public Date getDate() {
		return date;
	}
	
	
	public void removeCalEvent(ViewEvent uiCalEvent) {
		body.removeChild(uiCalEvent);
	}
	

}
