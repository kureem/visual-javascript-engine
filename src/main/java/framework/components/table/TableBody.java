package framework.components.table;

import framework.components.JSContainer;
import framework.components.api.EventListener;
import framework.components.api.Renderable;
import jsweet.dom.Event;
import jsweet.dom.MouseEvent;

public class TableBody extends JSContainer implements EventListener{

	private Table table;
	private TableModel model;
	public TableBody(String name, Table table) {
		super(name, "tbody");
		this.table = table;
	}
	public TableModel getModel() {
		return model;
	}
	public void setModel(TableModel model) {
		this.model = model;
	}
	public Table getTable() {
		return table;
	}
	
	
	public void refresh() {
		clearChildren();
		setRendered(false);
		TableColumnModel columnModel = table.getHead().getModel();
		if (model != null) {
			for (int row = 0; row < model.getRowCount(); row++) {
				JSContainer r = new JSContainer("", "tr");
				r.addEventListener(new EventListener() {
					
					@Override
					public void performAction(Renderable source, Event evt) {
						// TODO Auto-generated method stub
						
					}
				}, "click");
				addChild(r);
				for (int col = 0; col < model.getColumnCount(); col++) {
					JSContainer cell = new JSContainer("", "td");
					r.addChild(cell);
					Object val = model.getValueAt(row, col);
					if (columnModel != null) {
						TableColumn column = columnModel.getColumn(col);
						column.getCellRenderer().renderComponent(table, cell, val, false, false, row, col);
					} else {
						cell.setHtml(val != null ? val.toString() : "");
					}
				}
			}
		}
	}
	@Override
	public void performAction(Renderable source, Event evt) {
		int index = (int)getChildren().indexOf(source);
		
		MouseEvent me = (MouseEvent)evt;
		String type = me.type;
		if(type == "click") {
			table.fireOnClickRow(source, index);
		}else {
			table.fireOnDblClickRow(source, index);
		}
		
		
	}

}
