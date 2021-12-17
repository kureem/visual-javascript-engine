declare namespace api {
    class ContainerRenderer implements api.Renderer<api.Renderable> {
        static timeSpent: number;
        static getElementById(id: string): HTMLElement;
        decorate(renderable: api.Renderable): void;
        doRender(c: api.Renderable, root: HTMLElement): void;
        doNothing(r: api.Renderable): void;
        execCommands(njq: Element, container: api.Renderable): void;
        renderEvents(njq: Element, c: api.Renderable): void;
        renderAttributes(njq: Element, c: api.Renderable, changed: boolean): void;
        clearAttributes(elem: Element): void;
        clearStyles(jq: Element): void;
        renderStyles(njq: Element, c: api.Renderable, changed: boolean): void;
        static setAttribute(element: Element, attribute: string, value: string): void;
        static processCSSRules(renderable: api.Renderable, nativeNode: Element): void;
        constructor();
    }
}
declare namespace api {
    /**
     * Interface to implement when adding events on components.
     * @author Rossaye Abdool Kureem
     * Jul 11, 2018
     * @class
     */
    interface EventListener {
        performAction(source: api.Renderable, evt: Event): any;
    }
}
declare namespace api {
    /**
     * All components which allows a user to input a value implements this interface.<br>
     * This interface defines methods that allows setting and retrieving values
     * @author Kureem Rossaye
     *
     * @param <T> - The type of value store by this field
     * @class
     */
    interface InputField<T> extends api.Renderable {
        /**
         * Returns the value entered
         * @return {*} The value entered
         */
        getValue(): T;
        /**
         * Sets the value to the component
         * @param {*} val The value to set
         */
        setValue(val: T): any;
        /**
         * Validates the value entered
         * @throws ValidationException Exception throws if the value is not valid
         */
        validate(): any;
        /**
         * This returns a key to which the value can be bound.
         * @return {string} The binding key
         */
        getBinding(): string;
        /**
         * Sets the binding key to which the value can be bound
         * @param {string} binding The binding key
         * @return {*} The new state of this component
         */
        setBinding(binding: string): InputField<T>;
        /**
         * Makes the field required or not
         * @param {boolean} b required or not
         * @return {*} The new state of this component
         */
        setRequired(b: boolean): InputField<T>;
    }
}
declare namespace api {
    enum InputType {
        BUTTON = 0,
        CHECKBOX = 1,
        DATE = 2,
        DATETIME_LOCAL = 3,
        FILE = 4,
        HIDDEN = 5,
        IMAGE = 6,
        MONTH = 7,
        NUMBER = 8,
        RADIO = 9,
        RANGE = 10,
        RESET = 11,
        SUBMIT = 12,
        TIME = 13,
        WEEK = 14,
        TEXT = 15,
        PASSWORD = 16,
        EMAIL = 17,
        URL = 18,
        SEARCH = 19,
        TEL = 20,
        COLOR = 21
    }
    /** @ignore */
    class InputType_$WRAPPER {
        protected _$ordinal: number;
        protected _$name: string;
        value: any;
        group: any;
        constructor(_$ordinal: number, _$name: string, value?: any, group?: any);
        getValue(): string;
        getGroup(): string;
        name(): string;
        ordinal(): number;
        compareTo(other: any): number;
    }
}
declare namespace api {
    /**
     * Base interface that defines contract methods available on any component that
     * can be rendered on a web page.
     *
     * @author Rossaye Abdool Kureem Apr 10, 2018
     * @class
     */
    interface Renderable {
        /**
         * Checks if it is a valid parent. i.e This renderable can be added to the specified parent
         * @param {*} parent The parent to check if it can be added to
         * @return {boolean} is valid or not
         */
        isValidParent(parent: Renderable): boolean;
        /**
         * return Array of attributes changed during any action<br>
         * This is used internally by the default rendering engine for optimization
         * purposes.
         *
         * @return {string[]} Array of attributes changed during any action<br>
         *
         */
        getChangedAttributes(): Array<string>;
        /**
         * return Array of styles changed or removed during any action<br>
         * This is used internally by the default rendering engine for optimization
         * purposes
         *
         * @return {string[]} Array of styles changed or removed during any action<br>
         *
         */
        getChangedStyles(): Array<string>;
        /**
         * return The native Html Node managed by this component.<br>
         * can return null of component has never been rendered before.
         *
         * @return {HTMLElement} The native Html Node managed by this component.<br>
         *
         */
        getNative(): HTMLElement;
        /**
         * return First child with the specified name
         *
         * @param {string} name
         * Name of the Renderable to find
         * @return {*} First child with the specified name
         */
        getChild(name: string): Renderable;
        /**
         * return The Renderable to remove
         *
         * @param {*} r
         * renderable to remove
         * @return {*} The Renderable to remove
         */
        removeChild(r: Renderable): Renderable;
        /**
         * Removes all children from this Rendereable<br>
         * This will not be reflected on the page yet.<br>
         * Need to call the method setRendered(false) to allow changes to appear on web
         * page
         *
         * @return {*} The current renderable with all children removed
         */
        clearChildren(): Renderable;
        /**
         * return List of Renders used to render this component
         *
         * @return {*[]} List of Renders used to render this component
         */
        getRenderers(): Array<api.Renderer<any>>;
        /**
         * Adds a rendered to the list of {@link Renderer} used to render this
         * component.
         *
         * @param {*} renderer
         * {@link Renderer} to add to this component
         * @return {*} This current {@link Renderable}
         */
        addRenderer(renderer: api.Renderer<any>): Renderable;
        /**
         * return The id of the Renderable.<br>
         * Although it is possible to override this method and manage the id of this
         * component, it is recommended that you allow the engine to manage it for you
         * to ensure uniqueness of the id.
         *
         * @return {string} The id of the Renderable.
         *
         */
        getId(): string;
        /**
         * Adds a style class to the {@link Renderable}
         *
         * @param {string} styleClass
         * The style class to add
         * @return {*} The current {@link Renderable}
         */
        addClass(styleClass: string): Renderable;
        /**
         * Checks if the specified style class is present on this component.<br>
         * Can only check single class. Will throw an error if trying to check multiple classes at once<br>
         * E.g.<br>
         * <b><u>Correct:</u></b><br>
         * <code>
         * r.hasClass("myclass")
         * </code>
         * <br><br>
         * <b><u>Error:</u></b><br>
         * <code>
         * r.hasClass("myclass1 myclass2")<br>
         * </code>
         * @param {string} styleClass The class to check if present
         * @return {boolean} Whether the specified styleclass is present or not
         */
        hasClass(styleClass: string): boolean;
        /**
         * Will toggle the specified class on the component. i.e. If the specified styleclass is present, it will remove it, and if it is not present, it will add it<br>
         * Note that this method internally uses {@link #hasClass(String)} to check if styleclass is present. This means that is works only on single class. Cannot toggle multiple classes at once.
         * @param {string} styleClass The style class
         * @return {*} The update state of the current component
         */
        toggleClass(styleClass: string): Renderable;
        /**
         * Removes the specified class from the component
         *
         * @param {string} cls
         * The style class to remove
         * @return {*} The current {@link Renderable}
         */
        removeClass(cls: string): Renderable;
        /**
         * Adds a child to this {@link Renderable}
         *
         * @param {*} container
         * The {@link Renderable} to add
         * @return {*} The current {@link Renderable}
         */
        addChild(container: Renderable): Renderable;
        /**
         * Adds a child {@link Renderable} at the specified position in the child list
         *
         * @param {number} index
         * Position in the child list
         * @param {*} child
         * the child to add
         * @return {*} The current {@link Renderable}
         */
        addChildAt(index: number, child: Renderable): Renderable;
        /**
         * Show / hide the component
         *
         * @param {boolean} b
         * to show or hide the component
         * @return {*} The current {@link Renderable}
         */
        setVisible(b: boolean): Renderable;
        /**
         * Adds an {@link EventListener} to this component
         *
         * @param {*} listener
         * Implementation of the event listner
         * @param {string} type
         * Type of event. e.g click, dblclick, keyup, keydown etc etc.
         * @return {*} The current {@link Renderable}
         */
        addEventListener(listener: api.EventListener, type: string): Renderable;
        /**
         *
         * @return {string} The html tag of the renderable
         */
        getTag(): string;
        /**
         * Sets the html tag of the {@link Renderable}
         *
         * @param {string} tag
         * Sets the html tag of the {@link Renderable}
         * @return {*} The current {@link Renderable}
         */
        setTag(tag: string): Renderable;
        /**
         * Sets a style to the {@link Renderable}
         *
         * @param {string} name
         * name of style
         * @param {string} value
         * value of style
         * @return {*} The current {@link Renderable}
         */
        setStyle(name: string, value: string): Renderable;
        /**
         * return The style for the specified name
         *
         * @param {string} name
         * the style name
         * @return {string} The style for the specified name
         */
        getStyle(name: string): string;
        /**
         * Sets an attribute to the {@link Renderable}
         *
         * @param {string} name
         * name of attribute
         * @param {string} value
         * value of attribute
         * @return {*} The current {@link Renderable}
         */
        setAttribute(name: string, value: string): Renderable;
        /**
         * return The attribute value for the specified name
         *
         * @param {string} name
         * Name of the attribute
         * @return {string} The attribute value for the specified name
         */
        getAttribute(name: string): string;
        /**
         * return Name of {@link Renderable}
         *
         * @return {string} Name of {@link Renderable}
         */
        getName(): string;
        /**
         * Sets the name of the {@link Renderable}
         *
         * @param {string} name
         * Name of {@link Renderable}
         */
        setName(name: string): any;
        /**
         * return Parent of {@link Renderable}
         *
         * @return {*} Parent of {@link Renderable} Will return null of has not been added
         * in any {@link Renderable}. <br>
         * e.g Will certainly return null of this method is called in the
         * constructor
         */
        getParent(): Renderable;
        /**
         * return Array of Children added to this {@link Renderable}
         *
         * @return {*[]} Array of Children added to this {@link Renderable}
         */
        getChildren(): Array<Renderable>;
        /**
         * return Array of style names set to this {@link Renderable}
         *
         * @return {java.lang.String[]} Array of style names set to this {@link Renderable}
         */
        getStyleNames(): string[];
        /**
         * return Array of attributes set to this {@link Renderable}
         *
         * @return {java.lang.String[]} Array of attributes set to this {@link Renderable}
         */
        getAttributeNames(): string[];
        /**
         * return Html set to this {@link Renderable}
         *
         * @return {string} Html set to this {@link Renderable}
         */
        getHtml(): string;
        /**
         * Sets the html for this {@link Renderable}
         *
         * @param {string} html
         * Html to set to this {@link Renderable}
         * @return {*} The current {@link Renderable}
         */
        setHtml(html: string): Renderable;
        /**
         * return Whether this {@link Renderable} has been rendered or not
         *
         * @return {boolean} Whether this {@link Renderable} has been rendered or not
         */
        isRendered(): boolean;
        /**
         * Mark this {@link Renderable} as rendered
         *
         * @param {boolean} b
         * Boolean to specify if is rendered or not
         * @return {*} The current {@link Renderable}
         */
        setRendered(b: boolean): Renderable;
        /**
         *
         * @return {Object} {@link EventListener} added to this component
         */
        getListeners(): Object;
        /**
         * Render this component by appending it to the specified html element
         *
         * @param {HTMLElement} root
         * The html element to append the current {@link Renderable}
         */
        render(root?: any): any;
        /**
         * return User arbitrary data set to this {@link Renderable}
         *
         * @return {*} User arbitrary data set to this {@link Renderable}
         */
        getCustomProperties(): any;
        /**
         * Sets an arbitrary attributes to this {@link Renderable}
         *
         * @param {*} data
         * The arbitrary data to set to this {@link Renderable}
         */
        setCustomProperties(data: any): any;
        /**
         * Sets an arbitrary attributes to this {@link Renderable}
         *
         * @param {*} data
         * The arbitrary data to set to this {@link Renderable}
         * @return {*} The current instance of {@link Renderable}
         */
        setUserData(data: any): Renderable;
        /**
         *
         * @return {*} The userdata of this component
         */
        getUserData(): any;
        /**
         * Search first ancestor with the specified class name
         * @param <T> The first ancestor with the specified class name
         * @param {string} cls The specified class name
         * @return {*} The first ancestor with the specified class name
         */
        getAncestorWithClass<T extends Renderable>(cls: string): T;
        /**
         * Search for an ancestor {@link Renderable} with the specified id
         *
         * @param {string} id
         * the id to search
         * @return {*} Ancestor {@link Renderable} with the specified Id
         */
        getAncestorById(id: string): Renderable;
        /**
         * return Ancestor {@link Renderable} with the specified name
         *
         * @param {string} name
         * The name of the ancestor to search for.
         * @return {*} Ancestor {@link Renderable} with the specified name
         */
        getAncestorByName(name: string): Renderable;
        /**
         * return The root {@link Renderable} for this application
         *
         * @return {*} The root {@link Renderable} for this application
         */
        getRoot(): Renderable;
        /**
         * Checks if this {@link Renderable} has a listener of the specified type
         *
         * @param {string} type
         * The type of listener to check
         * @return {boolean} whether or not has listener of this type
         */
        hasListenerOfType(type: string): boolean;
        flush(secret: string): any;
        /**
         * Add a stylesheet rule to be used with this component
         * @param {string} rule - the css rule to add
         * @return {*} The current renderable
         */
        addCSSRule(rule: string): Renderable;
        /**
         * returns all stylesheet rules associated with this component
         * @return {string[]} All stylesheet rules
         */
        getCSSRules(): Array<string>;
        /**
         * Sets the {@link HTMLElement} created for this container on the browser when this {@link Renderable} is rendered
         * @param {HTMLElement} elem - The {@link HTMLElement} that this container represents on the browser
         */
        setElement(elem: HTMLElement): any;
        /**
         * returns the {@link HTMLElement} that is created for this container on the browser when this {@link Renderable} is rendered
         * @return {HTMLElement} - The {@link HTMLElement} that this container represents on the browser
         */
        getElement(): HTMLElement;
    }
}
declare namespace api {
    /**
     * Interface to implemented by renderer of components
     * @author Kureem Rossaye
     *
     * @param <T> - The type of {@link Renderable} that this renderer is compatible with
     * @class
     */
    interface Renderer<T extends api.Renderable> {
        /**
         * Render the specified component and attach it to the specified parent
         * @param {*} renderable The component to render
         * @param {HTMLElement} parent The parent to which the component is attached
         */
        doRender(renderable: T, parent: HTMLElement): any;
    }
}
declare namespace api {
    /**
     * More specific component that is rendered based on a specified template instead of a simple tag
     * @author Kureem Rossaye
     * @class
     */
    interface TemplateRenderable extends api.Renderable {
        /**
         * Returns the html template of the component
         * @return {string} The html template of the component
         */
        getTemplate(): string;
        /**
         * Sets the template for this component
         * @param {string} template The template for the component
         */
        setTemplate(template: string): any;
        /**
         * data injected to the component that can be used by the compiler to compile the template
         * @return {Object} Data injected to the component
         */
        getContext(): Object;
        /**
         * Render the component and attach it to the specified parent
         * @param {HTMLElement} parent
         */
        render(parent?: any): any;
    }
}
declare namespace api {
    enum Units {
        PIXEL = 0,
        CENTIMETER = 1,
        MILLIMETER = 2,
        INCH = 3,
        POINT = 4,
        PICA = 5,
        EM = 6,
        EX = 7,
        CH = 8,
        REM = 9,
        VIEWPORT_WIDTH = 10,
        VIEWPORT_HEIGHT = 11,
        VIEWPORT_MIN = 12,
        VIEWPORT_MAX = 13,
        PERCENT = 14
    }
    /** @ignore */
    class Units_$WRAPPER {
        protected _$ordinal: number;
        protected _$name: string;
        constructor(_$ordinal: number, _$name: string, name: any, display: any, type: any);
        __name: any;
        display: any;
        type: any;
        getName(): string;
        getDisplay(): string;
        getType(): string;
        name(): string;
        ordinal(): number;
        compareTo(other: any): number;
    }
}
declare namespace api {
    /**
     * Constructs an new {@link ValidationException} with the specified message
     * and code
     *
     * @param {string} message
     * The error message to add
     * @param {number} errorCode
     * The error code to add in the context
     * @class
     * @extends Error
     * @author Rossaye Abdool Kureem Apr 15, 2018
     */
    class ValidationException extends Error {
        code: number;
        /**
         * Is a <code>Numeric</code> indicating the user has provided input that the
         * browser is unable to convert.
         */
        static badInput: number;
        /**
         * Is a <code>Numeric</code> indicating the element's custom validity
         * message has been set to a non-empty string by calling the element's
         * <code>addValidator()</code> method.
         */
        static customError: number;
        /**
         * Is a <code>Numeric</code> indicating the value does not match the
         * specified <code>pattern</code>.
         */
        static patternMismatch: number;
        /**
         * Is a <code>Numeric</code> indicating the value is greater than the
         * maximum specified by the <code>max</code> attribute.
         */
        static rangeOverflow: number;
        /**
         * Is a <code>Numeric</code> indicating the value is less than the minimum
         * specified by the <code>min</code> attribute.
         */
        static rangeUnderflow: number;
        /**
         * Is a <code>Numeric</code> indicating the value does not fit the rules
         * determined by the <code>step</code> attribute (that is, it's not evenly
         * divisible by the step value).
         */
        static stepMismatch: number;
        /**
         * Is a <code>Numeric</code> indicating the value exceeds the specified
         * <code>maxlength</code> for {@link JSTextInput}
         * component.
         * <em><strong>Note:</strong> This will never be <code>true</code> in Gecko,
         * because elements' values are prevented from being longer than
         * <code>maxlength</code>.</em>
         */
        static tooLong: number;
        /**
         * Is a <code>Numeric</code> indicating the value is not in the required
         * syntax (when <code>type</code> is <code>email</code> or <code>url</code>
         * ).
         */
        static typeMismatch: number;
        /**
         * Is a <code>Numeric</code> indicating the element has a
         * <code>required</code> attribute, but no value.
         */
        static valueMissing: number;
        /**
         * Is a <code>Numeric</code> indicating the value less than the specified
         * <code>minlength</code> for {@link JSTextInput}
         * component.
         * <em><strong>Note:</strong> This will never be <code>true</code> in Gecko,
         * because elements' values are prevented from being shorter than
         * <code>minlength</code>.</em>
         */
        static tooShort: number;
        /**
         *
         */
        static serialVersionUID: number;
        errors: Array<Object>;
        constructor(message?: any, errorCode?: any);
        static throwError$java_lang_String$int(msg: string, code: number): void;
        static throwError$java_lang_String$jsweet_dom_ValidityState(msg: string, state: ValidityState): void;
        static throwError(msg?: any, state?: any): any;
        getCode(): number;
    }
}
declare namespace table {
    class DefaulTableModel implements table.TableModel {
        data: Array<Object>;
        /**
         *
         * @return {number}
         */
        getRowCount(): number;
        /**
         *
         * @return {number}
         */
        getColumnCount(): number;
        /**
         *
         * @param {number} columnIndex
         * @return {string}
         */
        getColumnName(columnIndex: number): string;
        /**
         *
         * @param {number} rowIndex
         * @param {number} columnIndex
         * @return {boolean}
         */
        isCellEditable(rowIndex: number, columnIndex: number): boolean;
        /**
         *
         * @param {number} rowIndex
         * @param {number} columnIndex
         * @return {*}
         */
        getValueAt(rowIndex: number, columnIndex: number): any;
        /**
         *
         * @param {*} aValue
         * @param {number} rowIndex
         * @param {number} columnIndex
         */
        setValueAt(aValue: any, rowIndex: number, columnIndex: number): void;
        /**
         *
         * @param {*} l
         */
        addTableModelListener(l: table.TableModelEventListener): void;
        /**
         *
         * @param {*} l
         */
        removeTableModelListener(l: table.TableModelEventListener): void;
        constructor();
    }
}
declare namespace table {
    class DefaultTableColumnModel implements table.TableColumnModel {
        columns: Array<table.TableColumn>;
        pointer: number;
        addColumn$framework_components_table_TableColumn(aColumn: table.TableColumn): void;
        /**
         *
         * @param {table.TableColumn} aColumn
         */
        addColumn(aColumn?: any): any;
        reset(): void;
        /**
         *
         * @param {table.TableColumn} column
         */
        removeColumn(column: table.TableColumn): void;
        /**
         *
         * @return {number}
         */
        getColumnCount(): number;
        /**
         *
         * @return {*}
         */
        getColumns(): any;
        /**
         *
         * @param {*} columnIdentifier
         * @return {number}
         */
        getColumnIndex(columnIdentifier: any): number;
        addColumn$framework_components_table_TableColumn_A(...col: table.TableColumn[]): DefaultTableColumnModel;
        addColumnAt(col: table.TableColumn, index: number): DefaultTableColumnModel;
        /**
         *
         * @param {number} columnIndex
         * @return {table.TableColumn}
         */
        getColumn(columnIndex: number): table.TableColumn;
        /**
         *
         * @return {boolean}
         */
        hasMoreElements(): boolean;
        /**
         *
         * @return {table.TableColumn}
         */
        nextElement(): table.TableColumn;
        constructor();
    }
}
declare namespace table {
    interface TableCellRenderer {
        renderComponent(table: table.Table, container: api.Renderable, value: any, isSelected: boolean, hasFocus: boolean, row: number, column: number): any;
    }
}
declare namespace table {
    /**
     * Contract Interface used by Table to render a <code>TableColumn</code>
     * @author Kureem Rossaye
     * @class
     */
    interface TableColumnModel {
        /**
         * Appends <code>aColumn</code> to the end of the
         * <code>tableColumns</code> array.
         * This method posts a <code>columnAdded</code>
         * event to its listeners.
         *
         * @param   {table.TableColumn} aColumn         the <code>TableColumn</code> to be added
         * @see     #removeColumn
         */
        addColumn(aColumn: table.TableColumn): any;
        /**
         * Deletes the <code>TableColumn</code> <code>column</code> from the
         * <code>tableColumns</code> array.  This method will do nothing if
         * <code>column</code> is not in the table's column list.
         * This method posts a <code>columnRemoved</code>
         * event to its listeners.
         *
         * @param   {table.TableColumn} column          the <code>TableColumn</code> to be removed
         * @see     #addColumn
         */
        removeColumn(column: table.TableColumn): any;
        /**
         * Returns the number of columns in the model.
         * @return {number} the number of columns in the model
         */
        getColumnCount(): number;
        /**
         * Returns an <code>Enumeration</code> of all the columns in the model.
         * @return {*} an <code>Enumeration</code> of all the columns in the model
         */
        getColumns(): any;
        /**
         * Returns the index of the first column in the table
         * whose identifier is equal to <code>identifier</code>,
         * when compared using <code>equals</code>.
         *
         * @param           {*} columnIdentifier        the identifier object
         * @return          {number} the index of the first table column
         * whose identifier is equal to <code>identifier</code>
         * @exception IllegalArgumentException      if <code>identifier</code>
         * is <code>null</code>, or no
         * <code>TableColumn</code> has this
         * <code>identifier</code>
         * @see             #getColumn
         */
        getColumnIndex(columnIdentifier: any): number;
        /**
         * Returns the <code>TableColumn</code> object for the column at
         * <code>columnIndex</code>.
         *
         * @param   {number} columnIndex     the index of the desired column
         * @return  {table.TableColumn} the <code>TableColumn</code> object for
         * the column at <code>columnIndex</code>
         */
        getColumn(columnIndex: number): table.TableColumn;
    }
}
declare namespace table {
    interface TableModel {
        /**
         * Returns the number of rows in the model. A
         * <code>Table</code> uses this method to determine how many rows it
         * should display.  This method should be quick, as it
         * is called frequently during rendering.
         *
         * @return {number} the number of rows in the model
         * @see #getColumnCount
         */
        getRowCount(): number;
        /**
         * Returns the number of columns in the model. A
         * <code>Table</code> uses this method to determine how many columns it
         * should create and display by default.
         *
         * @return {number} the number of columns in the model
         * @see #getRowCount
         */
        getColumnCount(): number;
        /**
         * Returns the name of the column at <code>columnIndex</code>.  This is used
         * to initialize the table's column header name.  Note: this name does
         * not need to be unique; two columns in a table can have the same name.
         *
         * @param   {number} columnIndex     the index of the column
         * @return  {string} the name of the column
         */
        getColumnName(columnIndex: number): string;
        /**
         * Returns true if the cell at <code>rowIndex</code> and
         * <code>columnIndex</code>
         * is editable.  Otherwise, <code>setValueAt</code> on the cell will not
         * change the value of that cell.
         *
         * @param   {number} rowIndex        the row whose value to be queried
         * @param   {number} columnIndex     the column whose value to be queried
         * @return  {boolean} true if the cell is editable
         * @see #setValueAt
         */
        isCellEditable(rowIndex: number, columnIndex: number): boolean;
        /**
         * Returns the value for the cell at <code>columnIndex</code> and
         * <code>rowIndex</code>.
         *
         * @param   {number} rowIndex        the row whose value is to be queried
         * @param   {number} columnIndex     the column whose value is to be queried
         * @return  {*} the value Object at the specified cell
         */
        getValueAt(rowIndex: number, columnIndex: number): any;
        /**
         * Sets the value in the cell at <code>columnIndex</code> and
         * <code>rowIndex</code> to <code>aValue</code>.
         *
         * @param   {*} aValue           the new value
         * @param   {number} rowIndex         the row whose value is to be changed
         * @param   {number} columnIndex      the column whose value is to be changed
         * @see #getValueAt
         * @see #isCellEditable
         */
        setValueAt(aValue: any, rowIndex: number, columnIndex: number): any;
        /**
         * Adds a listener to the list that is notified each time a change
         * to the data model occurs.
         *
         * @param   {*} l               the TableModelListener
         */
        addTableModelListener(l: table.TableModelEventListener): any;
        /**
         * Removes a listener from the list that is notified each time a
         * change to the data model occurs.
         *
         * @param   {*} l               the TableModelListener
         */
        removeTableModelListener(l: table.TableModelEventListener): any;
    }
}
declare namespace table {
    /**
     * The cells from (firstRow, column) to (lastRow, column) have been changed.
     * The <I>column</I> refers to the column index of the cell in the model's
     * co-ordinate system. When <I>column</I> is ALL_COLUMNS, all cells in the
     * specified range of rows are considered changed.
     * <p>
     * The <I>type</I> should be one of: INSERT, UPDATE and DELETE.
     * @param {*} source - The <code>TableModel</code> on which the event has occurred
     * @param {number} firstRow - The first row in the range of rows affected
     * @param {number} lastRow - The last row in the range of rows affected
     * @param {number} column - The column index in which the event occurred
     * @param {number} type - The type of event occurred
     * @class
     */
    class TableModelEvent {
        /**
         * Identifies the addition of new rows or columns.
         */
        static INSERT: number;
        /**
         * Identifies a change to existing data.
         */
        static UPDATE: number;
        /**
         * Identifies the removal of rows or columns.
         */
        static DELETE: number;
        /**
         * Identifies the header row.
         */
        static HEADER_ROW: number;
        /**
         * Specifies all columns in a row or rows.
         */
        static ALL_COLUMNS: number;
        type: number;
        firstRow: number;
        lastRow: number;
        column: number;
        source: table.TableModel;
        constructor(source?: any, firstRow?: any, lastRow?: any, column?: any, type?: any);
        /**
         * Returns the first row that changed.  HEADER_ROW means the meta data,
         * ie. names, types and order of the columns.
         *
         * @return {number} The first row affected
         */
        getFirstRow(): number;
        /**
         *
         * Returns the last row that changed.
         *
         * @return {number} - The last row affected
         */
        getLastRow(): number;
        /**
         * Returns the column for the event.  If the return
         * value is ALL_COLUMNS; it means every column in the specified
         * rows changed.
         * @return {number} - The column index affected
         */
        getColumn(): number;
        /**
         * Returns the type of event - one of: INSERT, UPDATE and DELETE.
         *
         * @return {number} - The type of event
         */
        getType(): number;
    }
}
declare namespace table {
    interface TableModelEventListener {
        tableChanged(e: table.TableModelEvent): any;
    }
}
declare namespace util {
    class ComponentUtil {
        static visit(designable: api.Renderable, visitor: ComponentUtil.ComponentVisitor): void;
        static getTags(type: string): Array<Object>;
    }
    namespace ComponentUtil {
        interface ComponentVisitor {
            doVisit(designable: api.Renderable): any;
        }
    }
}
declare namespace util {
    class PropertyUtil {
        static DOCUMENT_STRCTURE_HIDE_CONTEXT_MENU_ADDED: boolean;
        static REMOTESERVER: string;
        static getValue(obj: Object, property: string): Object;
        static hasOwnProperty(obj: Object, property: string): boolean;
        static setValue(obj: Object, value: Object, property: string): void;
        /**
         * Parse a hash string building an object of parameters<br>
         * e.g. #customer?username=foo&amp;password=bar&amp;name=alice<br>
         * will return a map
         * <pre>
         * {
         * "username":"foo",
         * "password":"bar",
         * "name":"alice"
         * }
         * </pre>
         * @param {string} hash The query string to parse
         * @return {Object} The object created based on query string
         */
        static getQuery(hash: string): Object;
    }
}
/**
 * Constructs a new instance of this component
 *
 * @param {string} name
 * The name of the component
 * @param {string} tag
 * The html tag of the component
 * @class
 * @author Rossaye Abdool Kureem Apr 10, 2018
 */
declare class JSContainer implements api.Renderable {
    static idCount: number;
    d: Object;
    static defaultRenderer: api.ContainerRenderer;
    static defaultRenderer_$LI$(): api.ContainerRenderer;
    elem_: HTMLElement;
    constructor(name?: any, tag?: any);
    /**
     * Adds an event on the component
     *
     * @param {string} evt
     * The name of the event (click, dblclick, keyup etc)
     * @param {*} listener
     * The javascript function to be called back
     */
    on(evt: string, listener: (p1: api.Renderable, p2: Event) => void): void;
    /**
     *
     * @return {java.lang.String[]} An array of custom events supported by the component<br>
     * This method is overridden by more complex components to provide
     * more advanced events mechanisms.
     */
    advancedEventTypes(): string[];
    /**
     * Fires the {@link EventListener}s for the specified key passing the
     * specified payload
     *
     * @param {string} key
     * The event to execute
     * @param {Event} evt
     * The payload to transmit when executing the event.
     */
    fireListener(key: string, evt: Event): void;
    hasListenerOfType(type: string): boolean;
    /**
     *
     * @return {Object} An {@link jsweet.lang.Object} to provide a scope for this
     * environement
     */
    getScope(): Object;
    getChild(name: string): api.Renderable;
    removeChild(r: api.Renderable): api.Renderable;
    addCSSRule(rule: string): api.Renderable;
    /**
     *
     * @return {string[]}
     */
    getCSSRules(): Array<string>;
    clearChildren(): api.Renderable;
    /**
     *
     * @return {string[]}
     */
    getChangedAttributes(): Array<string>;
    getNative(): HTMLElement;
    /**
     *
     * @return {string[]}
     */
    getChangedStyles(): Array<string>;
    /**
     * Flushes any data cleaning this component after it has been rendered on
     * the browser. This method is used internally by the engine
     *
     * @param {string} s
     * A secret value know by the implementor of the framework. This
     * is to prevent any end user from invoking this method since it
     * is a public exposed method
     */
    flush(s: string): void;
    /**
     *
     * @return {*[]}
     */
    getRenderers(): Array<api.Renderer<any>>;
    /**
     *
     * @param {*} renderer
     * @return {JSContainer}
     */
    addRenderer(renderer: api.Renderer<any>): JSContainer;
    /**
     *
     * @return {string}
     */
    getId(): string;
    /**
     * Generates a unique id for this component
     *
     * @return {string} A unique id
     */
    uid(): string;
    addOrRemoveClass(cls: string, b: boolean): void;
    /**
     *
     * @param {string} styleClass
     * @return {JSContainer}
     */
    addClass(styleClass: string): JSContainer;
    hasClass(cls: string): boolean;
    toggleClass(cls: string): api.Renderable;
    /**
     *
     * @param {string} cls
     * @return {JSContainer}
     */
    removeClass(cls: string): JSContainer;
    removeSingleClass(cls: string): JSContainer;
    addChild$framework_components_api_Renderable(container: api.Renderable): api.Renderable;
    addChild$java_lang_String$java_lang_String(name: string, tag: string): JSContainer;
    addChild$java_lang_String$java_lang_String$java_lang_String(name: string, tag: string, cls: string): JSContainer;
    addChild(name?: any, tag?: any, cls?: any): any;
    isValidParent(parent: api.Renderable): boolean;
    /**
     *
     * @param {number} index
     * @param {*} child
     * @return {*}
     */
    addChildAt(index: number, child: api.Renderable): api.Renderable;
    /**
     *
     * @param {boolean} b
     * @return {JSContainer}
     */
    setVisible(b: boolean): JSContainer;
    /**
     *
     * @param {*} listener
     * @param {string} type
     * @return {JSContainer}
     */
    addEventListener(listener: api.EventListener, type: string): JSContainer;
    /**
     *
     * @return {string}
     */
    getTag(): string;
    /**
     *
     * @param {string} tag
     * @return {JSContainer}
     */
    setTag(tag: string): JSContainer;
    /**
     *
     * @param {string} key
     * @param {string} value
     * @return {JSContainer}
     */
    setStyle(key: string, value: string): JSContainer;
    /**
     *
     * @param {string} key
     * @return {string}
     */
    getStyle(key: string): string;
    /**
     *
     * @param {string} key
     * @param {string} value
     * @return {JSContainer}
     */
    setAttribute(key: string, value: string): JSContainer;
    /**
     *
     * @param {string} key
     * @return {string}
     */
    getAttribute(key: string): string;
    /**
     *
     * @return {string}
     */
    getName(): string;
    /**
     *
     * @param {string} name
     */
    setName(name: string): void;
    /**
     *
     * @return {JSContainer}
     */
    getParent(): JSContainer;
    /**
     *
     * @return {*[]}
     */
    getChildren(): Array<api.Renderable>;
    /**
     *
     * @return {java.lang.String[]}
     */
    getStyleNames(): string[];
    /**
     *
     * @return {java.lang.String[]}
     */
    getAttributeNames(): string[];
    /**
     *
     * @return {string}
     */
    getHtml(): string;
    /**
     *
     * @param {string} h
     * @return {JSContainer}
     */
    setHtml(h: string): JSContainer;
    /**
     *
     * @return {boolean}
     */
    isRendered(): boolean;
    /**
     *
     * @param {boolean} b
     * @return {*}
     */
    setRendered(b: boolean): api.Renderable;
    /**
     *
     * @return {Object}
     */
    getListeners(): Object;
    render$(): void;
    /**
     * This method is invoked by the {@link Renderer} after the component is
     * rendered on the browser. <br>
     * This provides a hook for further processing after the component has been
     * rendered
     *
     * @param {HTMLElement} root
     * The actual {@link HTMLElement} of the root of the application
     * in which this component is found
     */
    postRender(root: HTMLElement): void;
    /**
     * Unitility method to check if the specified object is present in the
     * specified array
     *
     * @param {Array} lst
     * The array to check if object is present
     * @param {*} o
     * The object to check if present
     * @return {boolean} Whether is present or not
     */
    contains(lst: Array<any>, o: any): boolean;
    render$jsweet_dom_HTMLElement(parent: HTMLElement): void;
    /**
     *
     * @param {HTMLElement} parent
     */
    render(parent?: any): any;
    /**
     *
     * @return {*}
     */
    getCustomProperties(): any;
    /**
     *
     * @param {*} data
     */
    setCustomProperties(data: any): void;
    /**
     * Finds an ancestor that contains the specified class
     *
     * @param {string} cls
     * The class to check
     * @return {*} The ancestor that contains the specified class
     */
    getAncestorWithClass<T extends api.Renderable>(cls: string): T;
    /**
     *
     * @param {string} id
     * @return {JSContainer}
     */
    getAncestorById(id: string): JSContainer;
    /**
     *
     * @param {string} name
     * @return {JSContainer}
     */
    getAncestorByName(name: string): JSContainer;
    /**
     *
     * @return {JSContainer}
     */
    getRoot(): JSContainer;
    setString(key: string, value: string): void;
    getString(key: string): string;
    /**
     *
     * @param {*} data
     * @return {*}
     */
    setUserData(data: any): api.Renderable;
    /**
     *
     * @return {*}
     */
    getUserData(): any;
    /**
     *
     * @param {HTMLElement} elem
     */
    setElement(elem: HTMLElement): void;
    /**
     *
     * @return {HTMLElement}
     */
    getElement(): HTMLElement;
}
declare namespace JSContainer {
    class JSContainer$0 implements api.EventListener {
        private listener;
        __parent: any;
        /**
         *
         * @param {*} source
         * @param {Event} evt
         */
        performAction(source: api.Renderable, evt: Event): void;
        constructor(__parent: any, listener: any);
    }
}
/**
 * Creates a new card layout container
 * @param {string} name - The name of the container.
 * @param {string} tag - The tag of the container
 * @class
 * @extends JSContainer
 * @author Kureem Rossaye
 */
declare class CardLayout extends JSContainer {
    currentActive: string;
    currentIndex: number;
    constructor(name: string, tag: string);
    /**
     * Adds a {@link CardLayoutItem} to this container.
     * @param {CardLayoutItem} item - The item to add
     * @return {CardLayout} - this
     */
    addItem(item: CardLayoutItem): CardLayout;
    /**
     * Adds  {@link CardLayoutItem}s to this container.
     * @param {framework.components.CardLayoutItem[]} items - The items to add
     * @return {CardLayout} - this
     */
    addItems(...items: CardLayoutItem[]): CardLayout;
    /**
     *
     * @return {number} - The index of the currently active (visible) {@link CardLayoutItem} of this container
     */
    getCurrentIndex(): number;
    /**
     * Search and return the {@link CardLayoutItem} having the specified index
     * @param {number} index - The index of the {@link CardLayoutItem} searching for
     * @return {CardLayoutItem} - The {@link CardLayoutItem} item having specified index
     */
    getItem(index: number): CardLayoutItem;
    /**
     * Searches for the {@link CardLayoutItem} having specified name, and returns its index.
     * @param {string} name - The name of {@link CardLayoutItem} searching for
     * @return {number} - The index of the {@link CardLayoutItem} having name specified
     *
     */
    getIndex(name: string): number;
    /**
     * Activates the next {@link CardLayoutItem} of this container, and setting the specified object as payload<br>
     * The previous Event will be activated<br>
     *
     * will return null and do nothing if currently the last item is active.
     * @param {jsweet.lang.Object[]} params - The payload to set to the next {@link CardLayoutItem} being activated
     * @return {CardLayoutItem} - The {@link CardLayoutItem} being activated.
     */
    next(...params: Object[]): CardLayoutItem;
    /**
     * Activates the previous {@link CardLayoutItem} of this container, and setting the specified object as payload<br>
     * will return null and do nothing if currently the first item is active.
     * @param {jsweet.lang.Object[]} params - The payload to set to the next {@link CardLayoutItem} being activated
     * @return {CardLayoutItem} - The {@link CardLayoutItem} being activated.
     */
    previous(...params: Object[]): CardLayoutItem;
    /**
     * Activates the previous {@link CardLayoutItem} of this container, and setting the specified object as payload<br>
     * will return null and do nothing if currently the first item is active.
     * @param {jsweet.lang.Object[]} params - The payload to set to the next {@link CardLayoutItem} being activated
     * @return {CardLayoutItem} - The {@link CardLayoutItem} being activated.
     */
    back(...params: Object[]): CardLayoutItem;
    first(...params: Object[]): CardLayoutItem;
    last(...params: Object[]): CardLayoutItem;
    getDefault(): string;
    activate(name: string, ...params: Object[]): void;
    /**
     *
     * @return {java.lang.String[]}
     */
    advancedEventTypes(): string[];
    refresh(): void;
}
/**
 * Instantiate a {@link CardLayoutItem} with specified name and tag
 * @param {string} name - name of item
 * @param {string} tag - tag of item
 * @class
 * @extends JSContainer
 * @author Kureem Rossaye
 */
declare class CardLayoutItem extends JSContainer {
    constructor(name: string, tag: string);
    /**
     * returns array of specific supported events
     * @return {java.lang.String[]}
     */
    advancedEventTypes(): string[];
}
/**
 * Instantiate this container with the specified name
 * @param {string} name - name of container
 * @class
 * @extends JSContainer
 * @author Kureem Rossaye
 */
declare class ExternalJavascript extends JSContainer {
    constructor(name: string);
    /**
     * Sets the source of the external javascript
     * @param {string} src - source of file
     * @return {ExternalJavascript} - this
     */
    setSource(src: string): ExternalJavascript;
}
/**
 * External this external stylesheet container with the specified name
 * @param {string} name - the name of the container
 * @class
 * @extends JSContainer
 * @author Kureem Rossaye
 */
declare class ExternalStylesheet extends JSContainer implements api.Renderer<ExternalStylesheet> {
    static ORIGIN_ANONYMOUS: string;
    static ORIGIN_USE_CREDENTIALS: string;
    static MEDIA_DEFAULT: string;
    static MEDIA_ALL: string;
    static MEDIA_SCREEN: string;
    static MEDIA_PRINT: string;
    static MEDIA_SPEECH: string;
    constructor(name: string);
    /**
     * Sets the source of the external css file and returns the updated instance
     * @param {string} src - source of external css file
     * @return {ExternalStylesheet} - updated instance of this
     */
    setSource(src: string): ExternalStylesheet;
    /**
     * Sets the cross origin value of the css file
     * @param {string} origin - cross origin value
     * @return {ExternalStylesheet} - updated instance of this
     */
    setCrossOrigin(origin: string): ExternalStylesheet;
    /**
     * Sets the media of the css file
     * @param {string} media - the media of the css file
     * @return {ExternalStylesheet} - updated instance of this
     */
    setMedia(media: string): ExternalStylesheet;
    doRender$framework_components_ExternalStylesheet$jsweet_dom_HTMLElement(c: ExternalStylesheet, root: HTMLElement): void;
    /**
     * Rendered used internally which avoids rendering of the css file when the tag is used in our buider.
     * @param {ExternalStylesheet} c
     * @param {HTMLElement} root
     */
    doRender(c?: any, root?: any): any;
}
/**
 * Constructs an instance of this component
 *
 * @param {string} name     The name of the component
 * @param {string} template The html template of this component
 * @class
 * @extends JSContainer
 * @author Rossaye Abdool Kureem
 */
declare class HTMLTemplateContainer extends JSContainer implements api.TemplateRenderable {
    /**
     * A context that contains variables exposed to the html template. This can be
     * used by javascript to transmit data from the framework to the template
     */
    context: Object;
    template: string;
    constructor(name: string, template: string);
    /**
     *
     * @return {string} The template of the component
     */
    getTemplate(): string;
    /**
     * Sets the template of this component
     *
     * @param {string} template The template of this component
     */
    setTemplate(template: string): void;
    /**
     *
     * @return {Object} The variable context of this component
     */
    getContext(): Object;
    render$jsweet_dom_HTMLElement(parent: HTMLElement): void;
    /**
     *
     * @param {HTMLElement} parent
     */
    render(parent?: any): any;
    compile(html: string, ctx: Object): string;
    static invokeFunction(target: Object, _function: string, ...args: any[]): any;
}
declare namespace input {
    /**
     * Creates a new instance of the button with specified name and text
     * @param {string} name - name of the button
     * @param {string} text - text inside the button
     * @class
     * @extends JSContainer
     * @author Kureem Rossaye
     */
    class JSButton extends JSContainer {
        constructor(name: string, text: string);
        /**
         * Sets the type of the button
         * @param {api.InputType} type - type of the button. Valid values are: InputType.RESET | InputType.BUTTON | InputType.SUBMIT
         * @return {input.JSButton} - updated instance of this Button
         */
        setType(type: api.InputType): JSButton;
    }
}
declare namespace input {
    /**
     * Creates a new instance of form with the specified name
     * @param {string} name - The name of the form
     * @class
     * @extends JSContainer
     * @author Kureem Rossaye
     */
    class JSForm extends JSContainer {
        validationerrors: Object;
        constructor(name: string);
        /**
         * returns an array of advanced specific supported event listener<br>
         * <ul>
         * <li>beforeValidate - Fired before validating the form</li>
         * <li>afterValidate  - Fired after the form is validated </li>
         * <li>beforeSetData  - Fired before setting data into the input fields of the form</li>
         * <li>afterSetData   - Fired after setting data  into the input fields of the form</li>
         * <li>beforeGetData  - Fired before retrieving data from the input fields of the form</li>
         * <li>afterGetData   - Fired after  retrieving data from the input fields of the form</li>
         * <li>onError        - Fired if there is one or more errors after validating the form</li>
         * <li>beforeSubmit   - Fired before submitting the form</li>
         * <li>afterSubmit    - Fired after submitting the form even if the form is not valid</li>
         * <li>onSubmit         - Fired on submitting the form and if there is no error after validation</li>
         * <li>onReset          - Fired when the form is reset</li>
         * </ul>
         * @return {java.lang.String[]}
         */
        advancedEventTypes(): string[];
        /**
         * Return whether the form is valid of not after validating it.<br> If the form has not been validated yet,
         * this method will return true
         * @return {boolean} - Whether the form is valid or not
         */
        isValid(): boolean;
        /**
         * Returns whether this form has errors or not after validating it<br> If the form has not been validated yet,
         * this method will return false
         * @return {boolean} - Whether this form has errors or not
         */
        hasErrors(): boolean;
        /**
         *
         * @param {string} binding - The name or binding of the input element in the form
         * @return {api.ValidationException} - The validation exception if any for the specified binding of the form element
         */
        getError(binding: string): api.ValidationException;
        /**
         *
         * @return {Object} - All errors found after validating this form
         */
        getErrors(): Object;
        /**
         *
         * @param {string} binding - The binding or name of the input field to search for
         * @return {*} - The input field having specified name or binding
         */
        getField(binding: string): api.InputField<any>;
        /**
         * Validates all fields in this form and returns whether there is any error in the form<br>
         * The following chain of event will be fired when this method is called:<br>
         * <ul>
         * <li>beforeValidate</li>
         * <li>onError - only if there is any error in the form</li>
         * <li>afterValidate</li>
         * </ul>
         * @return {boolean} - Whether there is any error in the form
         */
        validate(): boolean;
        /**
         * Injects data into the fields of the form.<br>
         * each property of the form should be the binding of the input field<br>
         * If for a field in the form, corresponding property is not found in the specified data,
         * the field will be cleared and its value set to null<br>
         * The following chain of event is fired when this method is called:<br>
         * <ul>
         * <li>beforeSetData</li>
         * <li>afterSetData</li>
         * </ul>
         *
         * @param {Object} data - The data to inject into the form
         */
        setData(data: Object): void;
        /**
         * Retrieves data from all the fields in this form<br>
         * The following chain of event is fired when this method is called:<br>
         * <ul>
         * <li>beforeGetData</li>
         * <li>afterGetData</li>
         * </ul>
         * @return {Object} - The data from all the fields in the form
         */
        getData(): Object;
        /**
         * Resets the form by clearing all the fields in the form<br>
         * This method is called automatically when the form is reset for example by clicking an input of type reset present in the form<br>
         * or by resetting it using javascript means.<br>
         * The onReset event is fired when this method is called
         *
         */
        reset(): void;
        /**
         * Submits the form.<br>
         * This method is called automatically when the form is submitted for example by clicking an input of type submit present
         * in the form or by submitting the form using javascript.<br>
         * When this method is called, the form is validated, then the getData method is called.<br>
         * The following chain of event is fired when this method is called
         * <ul>
         * <li>beforeSubmit event is fired</li>
         * <li>
         * validate method is called
         * <ul>
         * <li>beforeValidate event is fired</li>
         * <li>onError event is fired only if there is any error in the form</li>
         * <li>afterValidate event is fired</li>
         * </ul>
         * </li>
         * <li>
         * if form is valid, getData method is called
         * <ul>
         * <li>beforeGetData event is fired</li>
         * <li>afterGetData event is fired</li>
         * </ul>
         * </li>
         * <li>if form is valid onSubmit event is fired</li>
         * <li>Whether or not form is valid, afterSubmit event is fired</li>
         * </ul>
         *
         */
        submit(): void;
    }
    namespace JSForm {
        class JSForm$0 implements api.EventListener {
            __parent: any;
            /**
             *
             * @param {*} source
             * @param {Event} evt
             */
            performAction(source: api.Renderable, evt: Event): void;
            constructor(__parent: any);
        }
        class JSForm$1 implements api.EventListener {
            __parent: any;
            /**
             *
             * @param {*} source
             * @param {Event} evt
             */
            performAction(source: api.Renderable, evt: Event): void;
            constructor(__parent: any);
        }
        class JSForm$2 implements util.ComponentUtil.ComponentVisitor {
            private binding;
            private result;
            __parent: any;
            /**
             *
             * @param {*} designable
             */
            doVisit(designable: api.Renderable): void;
            constructor(__parent: any, binding: any, result: any);
        }
        class JSForm$3 implements util.ComponentUtil.ComponentVisitor {
            __parent: any;
            /**
             *
             * @param {*} designable
             */
            doVisit(designable: api.Renderable): void;
            constructor(__parent: any);
        }
        class JSForm$4 implements util.ComponentUtil.ComponentVisitor {
            private data;
            __parent: any;
            /**
             *
             * @param {*} designable
             */
            doVisit(designable: api.Renderable): void;
            constructor(__parent: any, data: any);
        }
        class JSForm$5 implements util.ComponentUtil.ComponentVisitor {
            private data;
            __parent: any;
            /**
             *
             * @param {*} designable
             */
            doVisit(designable: api.Renderable): void;
            constructor(__parent: any, data: any);
        }
    }
}
declare namespace input {
    class JSInput<T> extends JSContainer implements api.InputField<T> {
        constructor(name: string);
        setSize(size: number): void;
        setPattern(pattern: string): void;
        setRequired(b: boolean): JSInput<T>;
        setDisabled(b: boolean): JSInput<T>;
        setReadOnly(b: boolean): JSInput<T>;
        toHtmlDateString(date: Date): string;
        getDoubleValue(): number;
        getStringValue(): string;
        getDateValue(): Date;
        getNativeInput(): HTMLInputElement;
        setDoubleValue(val: number): void;
        setStringValue(s: string): void;
        setDateValue(date: Date): void;
        getBinding(): string;
        setPlaceHolder(placeholder: string): JSInput<T>;
        /**
         *
         */
        validate(): void;
        /**
         *
         * @return {java.lang.String[]}
         */
        advancedEventTypes(): string[];
        setBinding(binding: string): JSInput<T>;
        /**
         *
         * @return {*}
         */
        getValue(): T;
        /**
         *
         * @param {*} val
         */
        setValue(val: T): void;
    }
}
declare namespace input {
    /**
     * Creates a new instance of {@link JSOption} with the specified text and value
     * @param {string} text - The text to display for the option
     * @param {string} value - the value of the option
     * @class
     * @extends JSContainer
     * @author Kureem Rossaye
     */
    class JSOption extends JSContainer {
        constructor(text: string, value: string);
        /**
         * The value of the option
         * @return {string} - The value of the option
         */
        getValue(): string;
        /**
         * Sets the value of the option
         * @param {string} value - The value of the option
         */
        setValue(value: string): void;
        /**
         *
         * @return {string} - The text of the option
         */
        getText(): string;
        /**
         * Sets the text or label of the option
         * @param {string} text - The text of the option
         */
        setText(text: string): void;
        /**
         * Mark or unmark this option as selected
         * @param {boolean} b - Whether to select or not select this option
         */
        setSelected(b: boolean): void;
        /**
         *
         * @return {boolean} - Whether this option is selected or not
         */
        isSelected(): boolean;
    }
}
declare namespace input {
    class JSSelect extends JSContainer implements api.InputField<any> {
        previousValue: string;
        data: Array<Object>;
        constructor(name: string);
        setOptions$java_lang_String(options: string): JSSelect;
        setOptions(options?: any): any;
        addOption$framework_components_input_JSOption(option: input.JSOption): JSSelect;
        addOption$java_lang_String$java_lang_String(text: string, value: string): JSSelect;
        addOption(text?: any, value?: any): any;
        addOption$jsweet_lang_Object(opt: Object): JSSelect;
        /**
         *
         * @return {*}
         */
        clearChildren(): api.Renderable;
        clearOptions(): api.Renderable;
        setMultiple(b: boolean): void;
        setSize(size: number): void;
        setPattern(pattern: string): void;
        setRequired(b: boolean): JSSelect;
        setDisabled(b: boolean): JSSelect;
        setReadOnly(b: boolean): JSSelect;
        isMultiple(): boolean;
        /**
         *
         * @return {*}
         */
        getValue(): any;
        /**
         *
         * @param {*} values
         */
        setValue(values: any): void;
        getPreviousValue(): string;
        /**
         *
         */
        validate(): void;
        /**
         *
         * @return {java.lang.String[]}
         */
        advancedEventTypes(): string[];
        getBinding(): string;
        setData(data_: Array<Object>): void;
        setOptions$jsweet_lang_Array(data_: Array<Object>): void;
        getSelectedItems(): Array<Object>;
        getData(): Array<Object>;
        findItem(value: string): Object;
        /**
         *
         * @param {string} binding
         * @return {*}
         */
        setBinding(binding: string): api.InputField<any>;
    }
}
declare namespace input {
    class JSTextArea extends JSContainer implements api.InputField<string> {
        constructor(name: string);
        setRequired(b: boolean): JSTextArea;
        setDisabled(b: boolean): JSTextArea;
        /**
         *
         * @return {string}
         */
        getValue(): string;
        setValue$java_lang_String(val: string): void;
        /**
         *
         * @param {string} val
         */
        setValue(val?: any): any;
        /**
         *
         */
        validate(): void;
        /**
         *
         * @return {java.lang.String[]}
         */
        advancedEventTypes(): string[];
        setReadOnly(b: boolean): JSTextArea;
        getBinding(): string;
        /**
         *
         * @param {string} binding
         * @return {*}
         */
        setBinding(binding: string): api.InputField<string>;
    }
}
declare namespace table {
    /**
     * Renders a table
     *
     * @author Kureem Rossaye
     * @param {string} name
     * @class
     * @extends JSContainer
     */
    class Table extends JSContainer {
        head: table.TableHead;
        body: table.TableBody;
        constructor(name: string);
        fireOnClickRow(row: api.Renderable, rowIndex: number): void;
        fireOnDblClickRow(row: api.Renderable, rowIndex: number): void;
        getHead(): table.TableHead;
        getBody(): api.Renderable;
        getDataModel(): table.TableModel;
        setDataModel(dataModel: table.TableModel): void;
        getColumnModel(): table.TableColumnModel;
        setColumnModel(columnModel: table.TableColumnModel): void;
        refresh(): void;
    }
}
declare namespace table {
    class TableBody extends JSContainer implements api.EventListener {
        table: table.Table;
        model: table.TableModel;
        constructor(name: string, table: table.Table);
        getModel(): table.TableModel;
        setModel(model: table.TableModel): void;
        getTable(): table.Table;
        refresh(): void;
        /**
         *
         * @param {*} source
         * @param {Event} evt
         */
        performAction(source: api.Renderable, evt: Event): void;
    }
    namespace TableBody {
        class TableBody$0 implements api.EventListener {
            __parent: any;
            /**
             *
             * @param {*} source
             * @param {Event} evt
             */
            performAction(source: api.Renderable, evt: Event): void;
            constructor(__parent: any);
        }
    }
}
declare namespace table {
    /**
     * Hold all the information for the definition of a column in a <code>Table</code>
     * @author Kureem Rossaye
     * @param {string} name
     * @class
     * @extends JSContainer
     */
    class TableColumn extends JSContainer {
        constructor(name: string);
        /**
         * The index of the column in the model which is to be displayed by this
         * <code>TableColumn</code>. As columns are moved around in the view
         * <code>modelIndex</code> remains constant.
         */
        modelIndex: number;
        /**
         * @author Kureem Rossaye<br>
         * This object is not used internally by the drawing machinery of the
         * <code>Table</code>; identifiers may be set in the <code>TableColumn</code>
         * as as an optional way to tag and locate table columns. The table package does
         * not modify or invoke any methods in these identifier objects other than the
         * <code>equals</code> method which is used in the <code>getColumnIndex()</code>
         * method in the <code>DefaultTableColumnModel</code>.
         */
        identifier: any;
        /**
         * The renderer used to draw the header of the column.
         */
        headerRenderer: table.TableCellRenderer;
        /**
         * The header value of the column.
         */
        headerValue: any;
        /**
         * The renderer used to draw the data cells of the column.
         */
        cellRenderer: table.TableCellRenderer;
        /**
         * If true, the user is allowed to resize the column; the default is true.
         */
        resizable: boolean;
        getModelIndex(): number;
        setModelIndex(modelIndex: number): void;
        getIdentifier(): any;
        setIdentifier(identifier: any): void;
        getWidth(): number;
        setDimensionStyle(name: string, value: number): void;
        getDimensionStyle(name: string): number;
        setWidth(width: number): void;
        getMinWidth(): number;
        setMinWidth(minWidth: number): void;
        getMaxWidth(): number;
        setMaxWidth(maxWidth: number): void;
        getHeaderRenderer(): table.TableCellRenderer;
        setHeaderRenderer(headerRenderer: table.TableCellRenderer): void;
        getHeaderValue(): any;
        setHeaderValue(headerValue: any): void;
        getCellRenderer(): table.TableCellRenderer;
        setCellRenderer(cellRenderer: table.TableCellRenderer): void;
        isResizable(): boolean;
        setResizable(resizable: boolean): void;
    }
}
declare namespace table {
    class TableHead extends JSContainer {
        tableRow: JSContainer;
        table: table.Table;
        model_: table.TableColumnModel;
        constructor(name: string, table: table.Table);
        addColumn(column: table.TableColumn): TableHead;
        refresh(): void;
        getModel(): table.TableColumnModel;
        setModel(model: table.TableColumnModel): void;
        getColumns(): Array<table.TableColumn>;
    }
}
declare namespace input {
    /**
     * Creates a new instance of reset button with specified name and text
     * @param {string} name - name of the reset button
     * @param {string} text - text inside the reset button
     * @class
     * @extends input.JSButton
     * @author Kureem Rossaye
     */
    class JSReset extends input.JSButton {
        constructor(name: string, text: string);
    }
}
declare namespace input {
    /**
     * Instantiate a submit button with specified name and text
     * @param {string} name - name of button
     * @param {string} text - text of the button
     * @class
     * @extends input.JSButton
     * @author Kureem Rossaye
     */
    class JSSubmit extends input.JSButton {
        constructor(name: string, text: string);
    }
}
declare namespace input {
    class JSCheckBox extends input.JSInput<boolean> {
        constructor(name: string);
        /**
         *
         * @return {boolean}
         */
        getValue(): boolean;
        setValue$java_lang_Boolean(b: boolean): void;
        /**
         *
         * @param {boolean} b
         */
        setValue(b?: any): any;
        isChecked(): boolean;
        setChecked(b: boolean): void;
    }
}
declare namespace input {
    class JSDateInput extends input.JSInput<Date> {
        constructor(name: string);
        setType(type: api.InputType): JSDateInput;
        /**
         *
         * @return {Date}
         */
        getValue(): Date;
        setValue$jsweet_lang_Date(val: Date): void;
        /**
         *
         * @param {Date} val
         */
        setValue(val?: any): any;
        setMin(min: Date): void;
        setMax(max: Date): void;
    }
    namespace JSDateInput {
        class JSDateInput$0 implements api.EventListener {
            __parent: any;
            /**
             *
             * @param {*} source
             * @param {Event} evt
             */
            performAction(source: api.Renderable, evt: Event): void;
            constructor(__parent: any);
        }
    }
}
declare namespace input {
    class JSNumberInput extends input.JSInput<number> {
        constructor(name: string);
        setType(type: api.InputType): JSNumberInput;
        setStep(step: number): void;
        getStep(): number;
        /**
         *
         * @return {number}
         */
        getValue(): number;
        setValue$java_lang_Double(val: number): void;
        /**
         *
         * @param {number} val
         */
        setValue(val?: any): any;
        setMin(min: number): void;
        setMax(max: number): void;
    }
}
declare namespace input {
    class JSTextInput extends input.JSInput<string> {
        constructor(name: string);
        setMaxLength(length: number): void;
        setType(type: api.InputType): JSTextInput;
        /**
         *
         * @return {string}
         */
        getValue(): string;
        setValue$java_lang_String(val: string): void;
        /**
         *
         * @param {string} val
         */
        setValue(val?: any): any;
        getMask(): string;
        setMask(mask: string): void;
    }
}
declare namespace input {
    class JSTimeInput extends input.JSInput<Date> {
        savedDate: Date;
        constructor(name: string);
        /**
         *
         * @return {Date}
         */
        getValue(): Date;
        setValue$jsweet_lang_Date(val: Date): void;
        /**
         *
         * @param {Date} val
         */
        setValue(val?: any): any;
    }
}
declare namespace input {
    class JSRadio extends input.JSCheckBox {
        constructor(name: string);
    }
}
