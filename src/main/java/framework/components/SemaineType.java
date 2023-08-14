package framework.components;

import framework.components.api.EventListener;
import framework.components.api.Renderable;
import jsweet.dom.Event;
import jsweet.lang.Array;
import jsweet.lang.Function;
import jsweet.lang.Object;

public class SemaineType extends JSContainer{
	
	
	public Object cmp;
	public Object evt;
	public jsweet.lang.Object helper;

	private SemaineTypeTable table = new SemaineTypeTable();
	
	public SemaineType() {
		super("semainetype", "div");
		
		addChild(table);

		addClass("myapp");
	
	}
	
	
	public void callHelper(String method, Object...parsm) {
		Function fn = (Function)helper.$get(method);
		
		Object[] params = new Object[parsm.length + 1];
		params[0] = cmp;
		for(int i = 0; i < parsm.length; i++) {
			params[i+1] = parsm[i];
		}
		fn.call(fn, params);
	}
	
	
	public void setSemaineType(Object semaineType) {
		super.clearChildren();
		addChild(table);
		setRendered(false);
		
		Object config = (Object)semaineType.$get("config");
		for(String day : Object.keys(config)) {
			Object plannings = (Object)config.$get(day);
			for(String type : Object.keys(plannings)) {
				Array<Object> plans = (Array<Object>)plannings.$get(type);
				for(Object plan : plans) {
					String from = (String)plan.$get("from");
					String to = (String)plan.$get("to");
					Integer quantity = (Integer)plan.$get("quantity");
					if(quantity == null) {
						quantity = 1;
					}
					addItem(from,to,type,day, quantity);
				}
			}
			
		}
		
		
		
		addEventListener(new EventListener() {
			
			@Override
			public void performAction(Renderable source, Event evt) {
				// TODO Auto-generated method stub
				
			}
		}, "click");
	}
	
	
	public void addItem(String from, String to, String type, String day, Integer quantity) {
		Token token = new Token(from,to,day,type, quantity);
		token.processWith(table);
		addChild(token);
	}
	
	
	
}
