package framework.components.table;

import framework.components.JSContainer;
import framework.components.api.Renderable;
import jsweet.dom.CustomEvent;

/**
 * Renders a table
 * 
 * @author Kureem Rossaye
 *
 */
public class Table extends JSContainer {

	private TableHead head = new TableHead("head", this);

	private TableBody body = new TableBody("body", this);
	
	//rowclick
	//rowdblclick
	//tablesort

	public Table(String name) {
		super(name, "table");
		addChild(head);
		addChild(body);
	}
	
	public void fireOnClickRow(Renderable row, int rowIndex) {
		CustomEvent clickRow = new CustomEvent("clickRow");
		clickRow.$set("source", row);
		clickRow.$set("table", this);
		clickRow.$set("rowIndex", rowIndex);
		clickRow.$set("index", rowIndex);
		fireListener("clickRow", clickRow);
	}

	public void fireOnDblClickRow(Renderable row, int rowIndex) {
		CustomEvent clickRow = new CustomEvent("dblClickRow");
		clickRow.$set("source", row);
		clickRow.$set("table", this);
		clickRow.$set("rowIndex", rowIndex);
		clickRow.$set("index", rowIndex);
		fireListener("dblClickRow", clickRow);
	}

	public TableHead getHead() {
		return head;
	}

	public Renderable getBody() {
		return body;
	}

	public TableModel getDataModel() {
		return body.getModel();
	}

	public void setDataModel(TableModel dataModel) {
		this.body.setModel(dataModel);
	}

	public TableColumnModel getColumnModel() {
		return head.getModel();
	}

	public void setColumnModel(TableColumnModel columnModel) {
		this.head.setModel(columnModel);
	}

	public void refresh() {
		
		this.head.refresh();

		this.body.refresh();
		
	}

}
