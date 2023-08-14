package framework.components;

import framework.components.api.EventListener;
import framework.components.api.Renderable;
import jsweet.dom.Event;
import jsweet.lang.Math;
import jsweet.lang.Object;

public class Token extends JSContainer{

	private String from;
	
	private String to;
	
	private String day;
	
	private String type;
	
	private Integer quantity;
	
	
	public Token(String from, String to, String day, String type, Integer quantity) {
		super("div");
		this.from = from;
		this.to = to;
		this.day = day;
		this.type = type;
		this.quantity = quantity;
		addClass("token");
		
		addEventListener(new EventListener() {
			
			@Override
			public void performAction(Renderable source, Event evt) {
				
				SemaineType sm=  source.getAncestorWithClass("myapp");
				Object params = new Object();
				params.$set("from", from);
				params.$set("to", to);
				params.$set("day", day);
				params.$set("type", type);
				params.$set("quantity", quantity);
				sm.callHelper("handleEdit", params);
				
			}
		}, "click");
		
		String html = type == "abs"? "Absence": "Disponibilité";
		html = html + " de " + from + " à" + to;
		setHtml(html);
		setStyle("text-align", "center");
        setAttribute("title", html);
	     if(type == "abs"){
	     	setStyle("color", "white");
	     }
         setStyle("padding-top", "8px");
	} 


	public String getFrom() {
		return from;
	}


	public String getTo() {
		return to;
	}


	public String getDay() {
		return day;
	}


	public String getType() {
		return type;
	}
	
	
	public void processWith(SemaineTypeTable table) {
		
		double colWidth = table.getColWidth();
		
		double steps = Math.floor((colWidth -80)/16);
		double offset = Math.ceil(Math.random()*steps) * 16;
		
		int rows = Util.countRows(from, to);
		setStyle("width", "80px");
		int height = rows*Util.ROW_HEIGHT_PX;
		setStyle("height", height + "px");
		addClass("type_" + type);
		
		int top = Util.countStartRowPosition(from);
		setStyle("top", top + "px");
		
		double left = Util.countStartColPosition(day, table.getGutterWitdh(), table.getColWidth());
		setStyle("left", (left + offset) + "px");
		
		
	}
	
	

}
