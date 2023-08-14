package framework.components;

import jsweet.lang.Array;
import jsweet.lang.Date;

public class WeekViewDateCell extends Box {

	private Date date;

	private Double hour;

	private WeekViewCell cellHr;

	private WeekViewCell cellHalfHr;

	public WeekViewDateCell(Date date, double hr,int days ) {
		super(Util.formatDate(date, "dd"), 1, days);
		this.date = date;
		this.hour = hr;
		addClass("spn-body-right-body-cell");
		cellHr = new WeekViewCell(hr, 0, date);
		cellHalfHr = new WeekViewCell(hr, 30, date);
		addChild(cellHr.addClass("brd-btm brd-right")).addChild(cellHalfHr.addClass("brd-btm brd-right"));
	}
	
	public void addCalEvent(WeekViewEvent uiCalEvt) {
		Date dt = uiCalEvt.getStartDate();
		double mins = dt.getMinutes();
		if(mins > 0) {
			cellHalfHr.addCalEvent(uiCalEvt);
		}else {
			cellHr.addCalEvent(uiCalEvt);
		}
	}
	
	public Array<WeekViewCell> getCells(){
		Array result = getChildren();
		return result;
	}
	
	public void removeCalEvent(ViewEvent uiCalEvt) {
		cellHalfHr.removeCalEvent(uiCalEvt);
		cellHr.removeCalEvent(uiCalEvt);
	}

	public Date getDate() {
		return date;
	}

	public Double getHour() {
		return hour;
	}
	
	public void holdHr(WeekViewEvent uiCalEvt) {
		cellHr.hold(uiCalEvt);
	}
	
	public void holdHalfHr(WeekViewEvent uiCalEvt) {
		cellHalfHr.hold(uiCalEvt);
	}
	
	public void unhold(WeekViewEvent uiCalEvt) {
		cellHr.unhold(uiCalEvt);
		cellHalfHr.unhold(uiCalEvt);
	}

	public WeekViewCell getCellHr() {
		return cellHr;
	}

	public WeekViewCell getCellHalfHr() {
		return cellHalfHr;
	}
	

}
