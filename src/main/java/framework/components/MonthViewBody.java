package framework.components;

import jsweet.lang.Array;

public class MonthViewBody extends Box{

	public MonthViewBody(String name) {
		super(name, 1, 1);
		addClass("spn-month-view-body");
	}
	
	
	public Array<MonthViewCell> getCells(){
		Array result = getChildren();
		return result;
	}

}
