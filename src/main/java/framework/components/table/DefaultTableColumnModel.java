package framework.components.table;

import java.util.Enumeration;

import jsweet.lang.Array;

public class DefaultTableColumnModel implements TableColumnModel, Enumeration<TableColumn>{

	private Array<TableColumn> columns = new Array<TableColumn>();
	
private double pointer = -1;	
	
	@Override
	public void addColumn(TableColumn aColumn) {
		columns.push(aColumn);
		reset();
	}
	
	private void reset() {
		this.pointer = -1;
	}

	@Override
	public void removeColumn(TableColumn column) {
		columns.splice(columns.indexOf(column));
		reset();
	}

	@Override
	public int getColumnCount() {
		return (int)columns.length;
	}

	@Override
	public Enumeration<TableColumn> getColumns() {

		return this;
	}

	@Override
	public int getColumnIndex(Object columnIdentifier) {
		for(TableColumn col : this.columns) {
			if(col.identifier == columnIdentifier) {
				return (int)this.columns.indexOf(col);
			}
		}
		return -1;
	}
	
	public DefaultTableColumnModel addColumn(TableColumn...col) {
		this.columns.push(col);
		reset();
		return this;
	}
	 
	
	public DefaultTableColumnModel addColumnAt(TableColumn col, int index) {
		Array<TableColumn> tmp = new Array<TableColumn>();
		for(double i = 0; i < columns.length;i++) {
			tmp.push(columns.$get(i));
			if(i == index) {
				tmp.push(col);
			}
		}
		this.columns = tmp;
		reset();
		return this;
	}

	@Override
	public TableColumn getColumn(int columnIndex) {
		return this.columns.$get(columnIndex);
	}

	@Override
	public boolean hasMoreElements() {
		return ((this.pointer+1) < this.columns.length);
	}

	@Override
	public TableColumn nextElement() {
		this.pointer = this.pointer+1;
		return this.columns.$get(this.pointer);
	}

}
