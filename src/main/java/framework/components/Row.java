package framework.components;

public class Row extends JSContainer{

	public Row(String name) {
		super(name, "div");
		addClass("row");
		
		addCSSRule(".row{display:table;padding:10px;width:100%;}");
		
	}
	

}
