package framework.components.table;

public class TableColumn {

	/**
	 * The index of the column in the model which is to be displayed by this
	 * <code>TableColumn</code>. As columns are moved around in the view
	 * <code>modelIndex</code> remains constant.
	 */
	protected int modelIndex;

	/**
	 * @author Kureem Rossaye<br>
	 * This object is not used internally by the drawing machinery of the
	 * <code>Table</code>; identifiers may be set in the <code>TableColumn</code>
	 * as as an optional way to tag and locate table columns. The table package does
	 * not modify or invoke any methods in these identifier objects other than the
	 * <code>equals</code> method which is used in the <code>getColumnIndex()</code>
	 * method in the <code>DefaultTableColumnModel</code>.
	 */
	protected Object identifier;

	/** The width of the column. */
	protected int width;

	/** The minimum width of the column. */
	protected int minWidth;

	/** The maximum width of the column. */
	protected int maxWidth;

	/** The renderer used to draw the header of the column. */
	protected TableCellRenderer headerRenderer;

	/** The header value of the column. */
	protected Object headerValue;

	/** The renderer used to draw the data cells of the column. */
	protected TableCellRenderer cellRenderer;

	/** The editor used to edit the data cells of the column. */
	//protected TableCellEditor cellEditor;

	/** If true, the user is allowed to resize the column; the default is true. */
	protected boolean resizable;

	public int getModelIndex() {
		return modelIndex;
	}

	public void setModelIndex(int modelIndex) {
		this.modelIndex = modelIndex;
	}

	public Object getIdentifier() {
		return identifier;
	}

	public void setIdentifier(Object identifier) {
		this.identifier = identifier;
	}

	public int getWidth() {
		return width;
	}

	public void setWidth(int width) {
		this.width = width;
	}

	public int getMinWidth() {
		return minWidth;
	}

	public void setMinWidth(int minWidth) {
		this.minWidth = minWidth;
	}

	public int getMaxWidth() {
		return maxWidth;
	}

	public void setMaxWidth(int maxWidth) {
		this.maxWidth = maxWidth;
	}

	public TableCellRenderer getHeaderRenderer() {
		return headerRenderer;
	}

	public void setHeaderRenderer(TableCellRenderer headerRenderer) {
		this.headerRenderer = headerRenderer;
	}

	public Object getHeaderValue() {
		return headerValue;
	}

	public void setHeaderValue(Object headerValue) {
		this.headerValue = headerValue;
	}

	public TableCellRenderer getCellRenderer() {
		return cellRenderer;
	}

	public void setCellRenderer(TableCellRenderer cellRenderer) {
		this.cellRenderer = cellRenderer;
	}

	/*
	 * public TableCellEditor getCellEditor() { return cellEditor; }
	 * 
	 * public void setCellEditor(TableCellEditor cellEditor) { this.cellEditor =
	 * cellEditor; }
	 */
	public boolean isResizable() {
		return resizable;
	}

	public void setResizable(boolean resizable) {
		this.resizable = resizable;
	}

}
