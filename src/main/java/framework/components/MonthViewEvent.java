package framework.components;

import static jsweet.dom.Globals.setTimeout;
import static jsweet.util.Globals.function;

import framework.components.api.EventListener;
import framework.components.api.Renderable;
import jsweet.dom.DragEvent;
import jsweet.dom.Event;
import jsweet.dom.HTMLElement;
import jsweet.lang.Date;
import jsweet.lang.Object;

public class MonthViewEvent extends JSContainer implements ViewEvent	{

	private Object value;

	private JSContainer header = new JSContainer("header", "div");	
	private JSContainer close = new JSContainer("close", "div");
	private JSContainer title = new JSContainer("title", "p");
	
	

	

	public MonthViewEvent(String name) {
		super(name, "div");
		addClass("spn-month-view-event");
		addChild(header.addClass("spn-header"));
		
		header.addChild(title.addClass("spn-title")).addChild(close.addClass("spn-close"));
		
		header.setAttribute("draggable", "true");
		header.addEventListener(new EventListener() {

			@Override
			public void performAction(Renderable source, Event evt) {
				DragEvent de = (DragEvent) evt;
				de.dataTransfer.setData("text/plain", "move");
				HTMLElement el = (HTMLElement) evt.target;
				setTimeout(function(() -> {
					el.parentElement.classList.add("slds-hide");
				}), 0);

				WeekViewDndManager.dragging = (MonthViewEvent) source.getParent();
				WeekViewDndManager.resizing = null;
				//
			}
		}, "dragstart");

		header.addEventListener(new EventListener() {

			@Override
			public void performAction(Renderable source, Event evt) {
				DragEvent de = (DragEvent) evt;
				de.dataTransfer.setData("text/plain", "move");
				HTMLElement el = (HTMLElement) evt.target;
				setTimeout(function(() -> {
					el.parentElement.classList.remove("slds-hide");
				}), 0);

				WeekViewDndManager.dragging = null;
			}
		}, "dragend");

		
		
		close.addEventListener(new EventListener() {
			
			@Override
			public void performAction(Renderable source, Event evt) {
				MonthView wv = getAncestorWithClass("MonthView");
				MonthViewEvent ev = source.getAncestorWithClass("spn-month-view-event");
				wv.removeCalEvent(ev);
			}
		}, "click");

	}
	
	public void reset() {
		String title = (String) this.value.$get("title");
		Date startDate = (Date) this.value.$get("startDate");
		Date endDate = (Date) this.value.$get("endDate");
		this.title.setHtml(formatDate(startDate)+  " - " +  title);


	}
	
	protected String formatDate(Date dt) {
		return Util.formatDate(dt, "hh:mm");
	
	}
	
	
	
	public void setValue(Object value) {
		setName((String) value.$get("title"));
		this.value = value;
		reset();
	}
	
	public Date getStartDate() {
		return (Date) this.value.$get("startDate");
	}

	public Date getEndDate() {
		return (Date) this.value.$get("endDate");
	}

	@Override
	public Object getNewEvent(Date startDate) {
		Object evt = new Object();
		for (String key : Object.keys(this.value)) {
			evt.$set(key, value.$get(key));
			if (key == "startDate") {
				evt.$set("startDate", startDate);
			}
			if (key == "endDate") {
				Date ostartDate = (Date) value.$get("startDate");
				Date oendDate = (Date) value.$get("endDate");
				double diff = oendDate.getTime() - ostartDate.getTime();
				Date endDate = new Date(startDate.getTime() + diff);
				evt.$set("endDate", endDate);
			}
		}
		return evt;
	}

	
	
	



}
