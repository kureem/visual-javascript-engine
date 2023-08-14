package framework.components;

import jsweet.dom.HTMLElement;
import jsweet.lang.Array;
import jsweet.lang.Object;

public class SemaineTypeTable extends JSContainer{

	
	
	private JSContainer thead = new JSContainer("head", "thead");
	private JSContainer tbody = new JSContainer("tbody", "tbody");
	
	public SemaineTypeTable() {
		super("table");
		addClass("slds-table slds-table_cell-buffer slds-table_bordered slds-table_striped slds-table_col-bordered");
		initHeader();
		initBody();
	}
	
	
	public double getColWidth() {
		HTMLElement elem = tbody.getChildren().$get(0).getChildren().$get(1).getNative();
		return elem.offsetWidth;
	}
	
	public double getGutterWitdh() {
		HTMLElement elem = tbody.getChildren().$get(0).getChildren().$get(0).getNative();
		return elem.offsetWidth;
	}
	
	
	
	private void initHeader() {
		JSContainer tr = new JSContainer("tr", "tr");
		JSContainer root = new JSContainer("td").setStyle("width", "4%");
		tr.addChild(root);
		thead.addChild(tr);
		addChild(thead);
		for(String day : Util.DAYS) {
			JSContainer td = new JSContainer(day, "td").setStyle("width", "16%");
			tr.addChild(td);
			td.setHtml(day);
		}
		
	}
	
	private void initBody() {
		addChild(tbody);
		for(int i = Util.MIN_HOUR; i <=Util.MAX_HOUR; i++) {
			SemaineTypeRow row0 = new SemaineTypeRow(i, 0);
			SemaineTypeRow row30 = new SemaineTypeRow(i, 30);
			tbody.addChild(row0);
			tbody.addChild(row30);
		}
	}
	
	

}
