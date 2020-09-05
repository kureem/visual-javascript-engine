package framework.components.table;

import framework.components.api.Renderable;

public interface TableCellRenderer {
	
	
	public void renderComponent(Table table, Renderable container, Object value,
                                            boolean isSelected, boolean hasFocus,
                                            int row, int column);

}
