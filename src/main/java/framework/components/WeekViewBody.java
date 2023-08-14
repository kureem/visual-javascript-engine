package framework.components;

import jsweet.lang.Array;

public class WeekViewBody extends Box {

	public WeekViewBody(String name) {
		super(name, 11, 12);
		addClass("spn-body-right-body");
	}
	
	
	public Array<WeekViewDateCell> getCells(){
		Array result = getChildren();
		return result;
	}
	
	public void unholdEvent(WeekViewEvent uiCalEvt) {
		for(WeekViewDateCell dc : getCells()) {
			for(WeekViewCell c : dc.getCells()) {
				c.unhold(uiCalEvt);
			}
		}
	}

}
