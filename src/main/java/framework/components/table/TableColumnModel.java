package framework.components.table;

import java.util.Enumeration;


/**
 * Contract Interface used by Table to render a <code>TableColumn</code>
 * @author Kureem Rossaye
 *
 */
public interface TableColumnModel
{
//
// Modifying the model
//

    /**
     *  Appends <code>aColumn</code> to the end of the
     *  <code>tableColumns</code> array.
     *  This method posts a <code>columnAdded</code>
     *  event to its listeners.
     *
     * @param   aColumn         the <code>TableColumn</code> to be added
     * @see     #removeColumn
     */
    public void addColumn(TableColumn aColumn);

    /**
     *  Deletes the <code>TableColumn</code> <code>column</code> from the
     *  <code>tableColumns</code> array.  This method will do nothing if
     *  <code>column</code> is not in the table's column list.
     *  This method posts a <code>columnRemoved</code>
     *  event to its listeners.
     *
     * @param   column          the <code>TableColumn</code> to be removed
     * @see     #addColumn
     */
    public void removeColumn(TableColumn column);





//
// Querying the model
//

    /**
     * Returns the number of columns in the model.
     * @return the number of columns in the model
     */
    public int getColumnCount();

    /**
     * Returns an <code>Enumeration</code> of all the columns in the model.
     * @return an <code>Enumeration</code> of all the columns in the model
     */
    public Enumeration<TableColumn> getColumns();

    /**
     * Returns the index of the first column in the table
     * whose identifier is equal to <code>identifier</code>,
     * when compared using <code>equals</code>.
     *
     * @param           columnIdentifier        the identifier object
     * @return          the index of the first table column
     *                  whose identifier is equal to <code>identifier</code>
     * @exception IllegalArgumentException      if <code>identifier</code>
     *                          is <code>null</code>, or no
     *                          <code>TableColumn</code> has this
     *                          <code>identifier</code>
     * @see             #getColumn
     */
    public int getColumnIndex(Object columnIdentifier);

    /**
     * Returns the <code>TableColumn</code> object for the column at
     * <code>columnIndex</code>.
     *
     * @param   columnIndex     the index of the desired column
     * @return  the <code>TableColumn</code> object for
     *                          the column at <code>columnIndex</code>
     */
    public TableColumn getColumn(int columnIndex);


}
