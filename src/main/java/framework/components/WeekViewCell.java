package framework.components;

import static jsweet.dom.Globals.console;
import static jsweet.dom.Globals.prompt;
import static jsweet.lang.Globals.parseFloat;

import framework.components.api.EventListener;
import framework.components.api.Renderable;
import jsweet.dom.DragEvent;
import jsweet.dom.Event;
import jsweet.dom.HTMLElement;
import jsweet.lang.Array;
import jsweet.lang.Date;
import jsweet.lang.Object;

public class WeekViewCell extends Col {

	private double hour;
	private double min;

	private Date date;

	private Array<ViewEvent> holding = new Array<ViewEvent>();

	public WeekViewCell(double hour, double min, Date date) {
		super(hour + "-" + min, 1, 1);
		this.hour = hour;
		this.min = min;
		this.date = date;
		addClass("spn-week-view-cell");
		setStyle("height", WeekView.CELL_HEIGHT + "px");
		addEventListener(new EventListener() {

			@Override
			public void performAction(Renderable source, Event evt) {
				double top = source.getNative().offsetTop;
				double left = source.getNative().offsetLeft;

				console.log("{" + left + "," + top + "}");

				String shrs = prompt("Number of hours:");

				if (shrs != null) {
					Object ce = new Object();
					ce.$set("title", "New Event");
					ce.$set("description", "Arbitrary event added");

					double time = (hour * 60 * 60 * 1000) + (min * 60 * 1000);

					ce.$set("startDate", new Date(date.getTime() + time));
					double ms = parseFloat(shrs) * 60 * 60 * 1000 + time;

					Date endDate = new Date(date.getTime() + ms);
					ce.$set("endDate", endDate);

					WeekViewEvent wds = new WeekViewEvent("");
					wds.setValue(ce);

					WeekView wj = source.getAncestorWithClass("spn-week-view");
					wj.addCalEvent(ce);
				}

			}
		}, "dblclick");

		addEventListener(new EventListener() {

			@Override
			public void performAction(Renderable source, Event evt) {
				if (WeekViewDndManager.dragging != null) {
					evt.preventDefault();
					((HTMLElement) evt.target).classList.add("drag-over");
				}
			}
		}, "dragenter");

		addEventListener(new EventListener() {

			@Override
			public void performAction(Renderable source, Event evt) {
				if (WeekViewDndManager.dragging != null) {
					evt.preventDefault();
					((HTMLElement) evt.target).classList.add("drag-over");
				}
			}
		}, "dragover");

		addEventListener(new EventListener() {

			@Override
			public void performAction(Renderable source, Event evt) {
				if (WeekViewDndManager.dragging != null) {
					evt.preventDefault();
					((HTMLElement) evt.target).classList.remove("drag-over");
				}
			}
		}, "dragleave");

		addEventListener(new EventListener() {

			@Override
			public void performAction(Renderable source, Event evt) {

				if (WeekViewDndManager.dragging != null) {

					evt.preventDefault();

					((HTMLElement) evt.target).classList.remove("drag-over");

					ViewEvent dragging = WeekViewDndManager.dragging;
					if (dragging != null) {
						Date startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, min);
						Object newEvt = dragging.getNewEvent(startDate);
						WeekView wek = source.getAncestorWithClass("spn-week-view");
						wek.moveCalEvent(dragging, newEvt);
						WeekViewDndManager.dragging = null;
					}
				}
			}
		}, "drop");

	}

	public void addCalEvent(WeekViewEvent uiCalEvt) {
		addChild(uiCalEvt);
		hold(uiCalEvt);
	}

	public void removeCalEvent(ViewEvent uiCalEvt) {
		removeChild(uiCalEvt);
		unhold(uiCalEvt);
		//setRendered(false);
	}

	public double getHour() {
		return hour;
	}

	public double getMin() {
		return min;
	}

	public Date getDate() {
		return date;
	}

	public void hold(WeekViewEvent uiCalEvt) {
		if (!isHolding(uiCalEvt)) {
			holding.push(uiCalEvt);
		}

		uiCalEvt.addHeldBy(this);
	}

	public void unhold(ViewEvent uiCalEvt) {
		Array<ViewEvent> tmp = new Array<ViewEvent>();
		for (ViewEvent ev : holding) {
			if (ev.getId() != uiCalEvt.getId()) {
				tmp.push(ev);
			}
		}
		this.holding = tmp;
	}

	public Boolean isHolding(ViewEvent uiCalEvt) {
		for (ViewEvent ev : holding) {
			if (ev.getId() == uiCalEvt.getId()) {
				return true;
			}
		}

		return false;
	}

	public Array<ViewEvent> getHolding() {
		return holding;
	}
	
	

}
