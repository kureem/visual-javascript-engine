package framework.components.table;


public class TableModelEvent 
{
    /** Identifies the addition of new rows or columns. */
    public static final int INSERT =  1;
    /** Identifies a change to existing data. */
    public static final int UPDATE =  0;
    /** Identifies the removal of rows or columns. */
    public static final int DELETE = -1;

    /** Identifies the header row. */
    public static final int HEADER_ROW = -1;

    /** Specifies all columns in a row or rows. */
    public static final int ALL_COLUMNS = -1;


    protected int       type;
    protected int       firstRow;
    protected int       lastRow;
    protected int       column;
    
    
    protected TableModel source;

   /**
 	*   All row data in the table has changed, listeners should discard any state
     *  that was based on the rows and requery the <code>TableModel</code>
     *  to get the new row count and all the appropriate values.
     *  The <code>JTable</code> will repaint the entire visible region on
     *  receiving this event, querying the model for the cell values that are visible.
     *  The structure of the table ie, the column names, types and order
     *  have not changed.

    * 	@param source - <code>TableModel</code> used by the <code>Table</code>
    */
    public TableModelEvent(TableModel source) {
        // Use Integer.MAX_VALUE instead of getRowCount() in case rows were deleted.
        this(source, 0, Integer.MAX_VALUE, ALL_COLUMNS, UPDATE);
    }

    /**
     *  This row of data has been updated.
     *  To denote the arrival of a completely new table with a different structure
     *  use <code>HEADER_ROW</code> as the value for the <code>row</code>.
     *  When the <code>JTable</code> receives this event and its
     *  <code>autoCreateColumnsFromModel</code>
     *  flag is set it discards any TableColumns that it had and reallocates
     *  default ones in the order they appear in the model. This is the
     *  same as calling <code>setModel(TableModel)</code> on the <code>Table</code>.
     * @param source - The <code>TableModel</code> on which the event has occurred
     * @param row - The row of the <code>Table</code> on which the event has occurred
     */
    public TableModelEvent(TableModel source, int row) {
        this(source, row, row, ALL_COLUMNS, UPDATE);
    }

    /**
     * The data in rows [<I>firstRow</I>, <I>lastRow</I>] have been updated.
     * @param source - The <code>TableModel</code> on which the event has occurred 
     * @param firstRow - The first row in the range of rows affected
     * @param lastRow - The last row in the range of rows affected
     */
    public TableModelEvent(TableModel source, int firstRow, int lastRow) {
        this(source, firstRow, lastRow, ALL_COLUMNS, UPDATE);
    }

    /**
     *  The cells in column <I>column</I> in the range
     *  [<I>firstRow</I>, <I>lastRow</I>] have been updated.
     * @param source - The <code>TableModel</code> on which the event has occurred 
     * @param firstRow - The first row in the range of rows affected
     * @param lastRow - The last row in the range of rows affected
     * @param column - The column index in which the event occurred
     */
    public TableModelEvent(TableModel source, int firstRow, int lastRow, int column) {
        this(source, firstRow, lastRow, column, UPDATE);
    }


    /**
     *  The cells from (firstRow, column) to (lastRow, column) have been changed.
     *  The <I>column</I> refers to the column index of the cell in the model's
     *  co-ordinate system. When <I>column</I> is ALL_COLUMNS, all cells in the
     *  specified range of rows are considered changed.
     *  <p>
     *  The <I>type</I> should be one of: INSERT, UPDATE and DELETE.
     * @param source - The <code>TableModel</code> on which the event has occurred 
     * @param firstRow - The first row in the range of rows affected
     * @param lastRow - The last row in the range of rows affected
     * @param column - The column index in which the event occurred
     * @param type - The type of event occurred
     */
    public TableModelEvent(TableModel source, int firstRow, int lastRow, int column, int type) {
    	this.source = source;
        this.firstRow = firstRow;
        this.lastRow = lastRow;
        this.column = column;
        this.type = type;
    }

//
// Querying Methods
//

   /** Returns the first row that changed.  HEADER_ROW means the meta data,
     * ie. names, types and order of the columns.
     * 
     * @return The first row affected
     */
    public int getFirstRow() { return firstRow; };

    /** 
     * Returns the last row that changed. 
     * 
     * @return - The last row affected
     */
    
    public int getLastRow() { return lastRow; };

    /**
     *  Returns the column for the event.  If the return
     *  value is ALL_COLUMNS; it means every column in the specified
     *  rows changed. 
     * @return - The column index affected
     */
    public int getColumn() { return column; };

    /**
     *  Returns the type of event - one of: INSERT, UPDATE and DELETE.
     * 
     * @return - The type of event
     */
    public int getType() { return type; }
}
