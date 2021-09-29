package framework.components.table;

import framework.components.JSContainer;
import jsweet.lang.Array;

public class TableHead extends JSContainer{

	private JSContainer tableRow = new JSContainer("headerRow", "tr");
	private Table table;
	private TableColumnModel model_;
	public TableHead(String name, Table table) {
		super(name, "thead");
		addChild(tableRow);
		this.table = table;
	}
	
	
	
	public TableHead addColumn(TableColumn column) {
		tableRow.addChild(column);
		TableCellRenderer renderer = column.getHeaderRenderer();
		if(renderer != null) {
			renderer.renderComponent(table, column, column, false, false, -1, (int)tableRow.getChildren().indexOf(column));
		}
		return this;
	}
	public void refresh() {
		tableRow.clearChildren();
		tableRow.setRendered(false);
		if (model_ != null) {
			for (int i = 0; i < model_.getColumnCount(); i++) {
				TableColumn column = model_.getColumn(i);
				addColumn(column);
			}
		}
	}
	
	public TableColumnModel getModel() {
		return this.model_;
	}
	
	public void setModel(TableColumnModel model) {
		this.model_ = model;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public Array<TableColumn> getColumns(){
		Array result = tableRow.getChildren();
		return result;
	}
	
	

}
