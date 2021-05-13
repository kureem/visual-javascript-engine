package framework.components.table;


import framework.components.JSContainer;
import framework.components.api.Renderable;

public class Table extends JSContainer{

	private JSContainer head = new JSContainer("head", "thead");
	
	private JSContainer body = new JSContainer("body", "tbody");
	
    protected TableModel        dataModel;

    protected TableColumnModel  columnModel;
	
	public Table(String name) {
		super(name, "table");
		addChild(head);
		addChild(body);
	}

	public Renderable getHead() {
		
		return head;
		
	}

	public Renderable getBody() {
		return body;
	}

	public TableModel getDataModel() {
		return dataModel;
	}

	public void setDataModel(TableModel dataModel) {
		this.dataModel = dataModel;
	}

	public TableColumnModel getColumnModel() {
		return columnModel;
	}

	public void setColumnModel(TableColumnModel columnModel) {
		this.columnModel = columnModel;
	}
	
	
	
	public void refresh() {
		this.head.clearChildren();
		this.body.clearChildren();
		if(columnModel != null) {
			JSContainer hrow = new JSContainer("headerRow", "tr");
			head.addChild(hrow);
			for(int i = 0; i < columnModel.getColumnCount();i++) {
			  	TableColumn column = columnModel.getColumn(i);
			  	TableCellRenderer headerRenderer = column.getHeaderRenderer();
			  	JSContainer th = new JSContainer("", "th").setAttribute("scope", "col");
			  	th.setStyle("width", column.getWidth() + "px");
			  	th.setStyle("max-width", column.getMaxWidth() + "px");
			  	th.setStyle("min-width", column.getMinWidth() + "px");
			  	hrow.addChild(th);
			  	
			  	headerRenderer.renderComponent(this, th, column.getHeaderValue(), false, false, 0, i);
			}
		}
		
		if(dataModel != null) {
			for(int row = 0; row < dataModel.getRowCount(); row++) {
				JSContainer r = new JSContainer("", "tr");
				body.addChild(r);
				for(int col = 0; col < dataModel.getColumnCount(); col++) {
					JSContainer cell = new JSContainer("", "td");
					r.addChild(cell);
					Object val = dataModel.getValueAt(row, col);
					if(columnModel != null) {
						TableColumn column = columnModel.getColumn(col);
						column.getCellRenderer().renderComponent(this, cell, val, false, false, row, col);
					}else {
						cell.setHtml(val != null? val.toString() : "");
					}
				}
			}
		}
	}
	

}
