package framework.components.table;

import framework.components.JSContainer;
import framework.components.api.Units;

/**
 * Hold all the information for the definition of a column in a <code>Table</code>
 * @author Kureem Rossaye
 *
 */
public class TableColumn extends JSContainer{

	public TableColumn(String name) {
		super(name, "th");
		this.identifier = name;
		setAttribute("scope", "col");
	}

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

	public Integer getWidth() {
		return getDimensionStyle("width");
	}
	
	private void setDimensionStyle(String name, int value) {
		setStyle(name, value + Units.PIXEL.getDisplay());
	}

	private Integer getDimensionStyle(String name) {
		String stWidth = getStyle(name);
		if(stWidth != null && stWidth.length() > 0) {
			for(Units u : Units.values()) {
				stWidth = stWidth.replace(u.getDisplay(), "");
			}
			return Integer.parseInt(stWidth);
		}
		return null;
	}
	
	public void setWidth(int width) {

		setDimensionStyle("width", width);
	}
	
	

	public int getMinWidth() {
		return getDimensionStyle("min-width");
	}

	public void setMinWidth(int minWidth) {
		setDimensionStyle("min-width", minWidth);
	}

	public int getMaxWidth() {
		return getDimensionStyle("max-width");
	}

	public void setMaxWidth(int maxWidth) {
		setDimensionStyle("max-width", maxWidth);
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
		String html = "";
		if(headerValue != null) {
			html = headerValue.toString();
		}
		setHtml(html);
	}

	public TableCellRenderer getCellRenderer() {
		return cellRenderer;
	}

	public void setCellRenderer(TableCellRenderer cellRenderer) {
		this.cellRenderer = cellRenderer;
	}

	public boolean isResizable() {
		return resizable;
	}

	public void setResizable(boolean resizable) {
		this.resizable = resizable;
	}

}
