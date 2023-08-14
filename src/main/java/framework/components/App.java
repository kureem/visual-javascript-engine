package framework.components;

import framework.components.api.EventListener;
import framework.components.api.Renderable;
import jsweet.dom.Event;
import jsweet.lang.Function;

import static jsweet.dom.Globals.alert;

public class App extends JSContainer {
	
	
	public Object cmp;
	public Object evt;
	public jsweet.lang.Object helper;

	public App() {
		super("div");

		JSContainer table = new JSContainer("table");
		for(Integer i = 0; i < 10; i++) {
			JSContainer row = new JSContainer("tr");
			for(Integer j = 0; j < 10; j++) {
				JSContainer td = new JSContainer("td");
				row.addChild(td);
			}
			table.addChild(row);
			
		}
		addChild(table);
		addEventListener(new EventListener() {
			
			@Override
			public void performAction(Renderable source, Event evt) {
				
				Function fn = (Function)helper.$get("openPopup");
				fn.call(fn, cmp,evt,helper);
				//alert(getUserData());
			}
		}, "click");
	}
	
	

}
