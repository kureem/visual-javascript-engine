package framework.components.table;

import jsweet.lang.Array;

public class DefaulTableModel implements TableModel{
	
	private Array<jsweet.lang.Object> data = new Array<jsweet.lang.Object>();

	@Override
	public int getRowCount() {
		return (int)data.length;
	}

	@Override
	public int getColumnCount() {
		return 0;
	}

	@Override
	public String getColumnName(int columnIndex) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean isCellEditable(int rowIndex, int columnIndex) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public Object getValueAt(int rowIndex, int columnIndex) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setValueAt(Object aValue, int rowIndex, int columnIndex) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void addTableModelListener(TableModelEventListener l) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void removeTableModelListener(TableModelEventListener l) {
		// TODO Auto-generated method stub
		
	}

}
