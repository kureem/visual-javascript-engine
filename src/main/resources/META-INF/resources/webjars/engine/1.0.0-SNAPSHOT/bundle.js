/* Generated from Java with JSweet 3.0.0 - http://www.jsweet.org */
var framework;
(function (framework) {
    var components;
    (function (components) {
        var api;
        (function (api) {
            class ContainerRenderer {
                constructor() {
                }
                static getElementById(id) {
                    return document.getElementById(id);
                }
                doRender(c, root) {
                    const jq = ContainerRenderer.getElementById(c.getId());
                    const tag = c.getTag();
                    const rendered = c.isRendered();
                    const name = c.getName();
                    const html = c.getHtml();
                    const parent = c.getParent();
                    if (!rendered) {
                        if (jq != null)
                            jq.remove();
                        const njq = document.createElement(tag);
                        if (name != null && name.length > 0)
                            njq.setAttribute("name", name);
                        njq.setAttribute("id", c.getId());
                        njq.innerHTML = html;
                        this.renderAttributes(njq, c, false);
                        this.renderStyles(njq, c, false);
                        if (parent == null) {
                            if (root == null) {
                                const body = document.getElementsByTagName("body")[0];
                                body.appendChild(njq);
                            }
                            else {
                                root.appendChild(njq);
                            }
                        }
                        else {
                            if (parent != null && (parent.constructor != null && parent.constructor["__interfaces"] != null && parent.constructor["__interfaces"].indexOf("framework.components.api.TemplateRenderable") >= 0)) {
                                const elem = ContainerRenderer.getElementById(parent.getId()).querySelector("[name=" + name + "]");
                                elem.parentElement.replaceChild(njq, elem);
                            }
                            else {
                                const index = parent.getChildren().indexOf(c);
                                let nextSib = null;
                                if (index < parent.getChildren().length - 1) {
                                    nextSib = parent.getChildren()[index + 1];
                                    if (!nextSib.isRendered()) {
                                        nextSib = null;
                                    }
                                }
                                if (nextSib != null) {
                                    const p = ContainerRenderer.getElementById(parent.getId());
                                    p.insertBefore(njq, ContainerRenderer.getElementById(nextSib.getId()));
                                }
                                else {
                                    try {
                                        ContainerRenderer.getElementById(parent.getId()).appendChild(njq);
                                    }
                                    catch (e) {
                                        console.error(e.message, e);
                                    }
                                }
                            }
                        }
                        const me = c;
                        const component = me;
                        this.doNothing(component);
                        this.renderEvents(njq, c);
                        ContainerRenderer.processCSSRules(c, njq);
                        this.execCommands(njq, c);
                        c.flush("a28n12l10");
                    }
                    else {
                        if (jq != null) {
                            this.renderAttributes(jq, c, true);
                            this.renderStyles(jq, c, true);
                            this.execCommands(jq, c);
                            c.flush("a28n12l10");
                        }
                    }
                }
                /*private*/ doNothing(r) {
                }
                execCommands(njq, container) {
                }
                renderEvents(njq, c) {
                    const keys = Object.keys(c.getListeners());
                    for (let index33032 = 0; index33032 < keys.length; index33032++) {
                        let key = keys[index33032];
                        {
                            const listeners = c.getListeners()[key];
                            njq.addEventListener(key, ((listeners) => {
                                return (evt) => {
                                    for (let index33033 = 0; index33033 < listeners.length; index33033++) {
                                        let l = listeners[index33033];
                                        {
                                            l.performAction(c, evt);
                                        }
                                    }
                                    c.getRoot()['render$']();
                                };
                            })(listeners));
                        }
                    }
                }
                renderAttributes(njq, c, changed) {
                    if (changed) {
                        {
                            let array33035 = c.getChangedAttributes();
                            for (let index33034 = 0; index33034 < array33035.length; index33034++) {
                                let key = array33035[index33034];
                                {
                                    const attr = c.getAttribute(key);
                                    if (attr == null) {
                                        njq.removeAttribute(key);
                                    }
                                    else {
                                        ContainerRenderer.setAttribute(njq, key, attr);
                                    }
                                }
                            }
                        }
                    }
                    else {
                        {
                            let array33037 = c.getAttributeNames();
                            for (let index33036 = 0; index33036 < array33037.length; index33036++) {
                                let key = array33037[index33036];
                                {
                                    const attr = c.getAttribute(key);
                                    if (attr != null)
                                        ContainerRenderer.setAttribute(njq, key, attr);
                                }
                            }
                        }
                    }
                    if (!njq.classList.contains(c.getId())) {
                        njq.classList.add(c.getId());
                    }
                }
                clearAttributes(elem) {
                    const attrs = elem.attributes;
                    for (let i = 0; i < attrs.length; i++) {
                        {
                            if (!(attrs[i].name === ("id")))
                                elem.removeAttribute(attrs[i].name);
                        }
                        ;
                    }
                }
                clearStyles(jq) {
                    jq.removeAttribute("style");
                }
                renderStyles(njq, c, changed) {
                    if (changed) {
                        {
                            let array33039 = c.getChangedStyles();
                            for (let index33038 = 0; index33038 < array33039.length; index33038++) {
                                let key = array33039[index33038];
                                {
                                    njq.style.setProperty(key, c.getStyle(key));
                                }
                            }
                        }
                    }
                    else {
                        {
                            let array33041 = c.getStyleNames();
                            for (let index33040 = 0; index33040 < array33041.length; index33040++) {
                                let key = array33041[index33040];
                                {
                                    njq.style.setProperty(key, c.getStyle(key));
                                }
                            }
                        }
                    }
                }
                static setAttribute(element, attribute, value) {
                    try {
                        element.setAttribute(attribute, value);
                    }
                    catch (e) {
                        console.warn("Invalid attribute :" + attribute + " set to:" + element.toString());
                    }
                }
                static processCSSRules(renderable, nativeNode) {
                    const rules = renderable.getCSSRules();
                    if (rules.length > 0) {
                        const styleelem = document.createElement("style");
                        styleelem.type = "text/css";
                        nativeNode.appendChild(styleelem);
                        const sheet = styleelem.sheet;
                        for (let index33042 = 0; index33042 < rules.length; index33042++) {
                            let rule = rules[index33042];
                            sheet.insertRule(rule);
                        }
                    }
                }
            }
            ContainerRenderer.timeSpent = 0;
            api.ContainerRenderer = ContainerRenderer;
            ContainerRenderer["__class"] = "framework.components.api.ContainerRenderer";
            ContainerRenderer["__interfaces"] = ["framework.components.api.Renderer"];
        })(api = components.api || (components.api = {}));
    })(components = framework.components || (framework.components = {}));
})(framework || (framework = {}));
(function (framework) {
    var components;
    (function (components) {
        var api;
        (function (api) {
            class StringInputTypes {
                static types_$LI$() { if (StringInputTypes.types == null) {
                    StringInputTypes.types = [StringInputTypes.text, StringInputTypes.password, StringInputTypes.email, StringInputTypes.url, StringInputTypes.search, StringInputTypes.tel, StringInputTypes.color];
                } return StringInputTypes.types; }
            }
            StringInputTypes.text = "text";
            StringInputTypes.password = "password";
            StringInputTypes.email = "email";
            StringInputTypes.url = "url";
            StringInputTypes.search = "search";
            StringInputTypes.tel = "tel";
            StringInputTypes.color = "color";
            api.StringInputTypes = StringInputTypes;
            StringInputTypes["__class"] = "framework.components.api.StringInputTypes";
        })(api = components.api || (components.api = {}));
    })(components = framework.components || (framework.components = {}));
})(framework || (framework = {}));
(function (framework) {
    var components;
    (function (components) {
        var api;
        (function (api) {
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
                constructor(message, errorCode) {
                    if (((typeof message === 'string') || message === null) && ((typeof errorCode === 'number') || errorCode === null)) {
                        let __args = arguments;
                        super("Validation Error");
                        this.errors = (new Array());
                        ValidationException.addError(message, errorCode, this);
                    }
                    else if (((typeof message === 'number') || message === null) && errorCode === undefined) {
                        let __args = arguments;
                        let errorCode = __args[0];
                        super();
                        this.errors = (new Array());
                        ValidationException.addError("", errorCode, this);
                    }
                    else if (message === undefined && errorCode === undefined) {
                        let __args = arguments;
                        super();
                        this.errors = (new Array());
                    }
                    else
                        throw new Error('invalid overload');
                }
                static addError(msg, code, e) {
                    eval("if(!e[\'errors\']){e[\'errors\'] = [];}e[\'errors\'].push({\'msg\':msg, \'code\':code});");
                }
            }
            /**
             * Is a <code>Numeric</code> indicating the user has provided input that the
             * browser is unable to convert.
             */
            ValidationException.badInput = 0;
            /**
             * Is a <code>Numeric</code> indicating the element's custom validity
             * message has been set to a non-empty string by calling the element's
             * <code>addValidator()</code> method.
             */
            ValidationException.customError = 1;
            /**
             * Is a <code>Numeric</code> indicating the value does not match the
             * specified <code>pattern</code>.
             */
            ValidationException.patternMismatch = 2;
            /**
             * Is a <code>Numeric</code> indicating the value is greater than the
             * maximum specified by the <code>max</code> attribute.
             */
            ValidationException.rangeOverflow = 3;
            /**
             * Is a <code>Numeric</code> indicating the value is less than the minimum
             * specified by the <code>min</code> attribute.
             */
            ValidationException.rangeUnderflow = 4;
            /**
             * Is a <code>Numeric</code> indicating the value does not fit the rules
             * determined by the <code>step</code> attribute (that is, it's not evenly
             * divisible by the step value).
             */
            ValidationException.stepMismatch = 5;
            /**
             * Is a <code>Numeric</code> indicating the value exceeds the specified
             * <code>maxlength</code> for {@link JSTextInput}
             * component.
             * <em><strong>Note:</strong> This will never be <code>true</code> in Gecko,
             * because elements' values are prevented from being longer than
             * <code>maxlength</code>.</em>
             */
            ValidationException.tooLong = 6;
            /**
             * Is a <code>Numeric</code> indicating the value is not in the required
             * syntax (when <code>type</code> is <code>email</code> or <code>url</code>
             * ).
             */
            ValidationException.typeMismatch = 7;
            /**
             * Is a <code>Numeric</code> indicating the element has a
             * <code>required</code> attribute, but no value.
             */
            ValidationException.valueMissing = 8;
            /**
             *
             */
            ValidationException.serialVersionUID = 1;
            api.ValidationException = ValidationException;
            ValidationException["__class"] = "framework.components.api.ValidationException";
            ValidationException["__interfaces"] = ["java.io.Serializable"];
        })(api = components.api || (components.api = {}));
    })(components = framework.components || (framework.components = {}));
})(framework || (framework = {}));
(function (framework) {
    var components;
    (function (components) {
        class Boot {
            static main(args) {
                const table = new framework.components.MonthView("wv");
                table.reset();
                setTimeout((((table) => {
                    return (e) => {
                        table.render$jsweet_dom_HTMLElement(framework.components.api.ContainerRenderer.getElementById("semainetype"));
                        table.render$jsweet_dom_HTMLElement(framework.components.api.ContainerRenderer.getElementById("semainetype"));
                    };
                })(table)), 1000);
            }
        }
        components.Boot = Boot;
        Boot["__class"] = "framework.components.Boot";
    })(components = framework.components || (framework.components = {}));
})(framework || (framework = {}));
(function (framework) {
    var components;
    (function (components) {
        class FileUploader {
        }
        components.FileUploader = FileUploader;
        FileUploader["__class"] = "framework.components.FileUploader";
    })(components = framework.components || (framework.components = {}));
})(framework || (framework = {}));
(function (framework) {
    var components;
    (function (components) {
        var input;
        (function (input) {
            class DateInputTypes {
                static types_$LI$() { if (DateInputTypes.types == null) {
                    DateInputTypes.types = [DateInputTypes.date, DateInputTypes.month, DateInputTypes.week];
                } return DateInputTypes.types; }
            }
            DateInputTypes.date = "date";
            DateInputTypes.month = "month";
            DateInputTypes.week = "week";
            input.DateInputTypes = DateInputTypes;
            DateInputTypes["__class"] = "framework.components.input.DateInputTypes";
        })(input = components.input || (components.input = {}));
    })(components = framework.components || (framework.components = {}));
})(framework || (framework = {}));
(function (framework) {
    var components;
    (function (components) {
        var input;
        (function (input) {
            class NumericInputTypes {
                static types_$LI$() { if (NumericInputTypes.types == null) {
                    NumericInputTypes.types = [NumericInputTypes.number, NumericInputTypes.range];
                } return NumericInputTypes.types; }
            }
            NumericInputTypes.number = "number";
            NumericInputTypes.range = "range";
            input.NumericInputTypes = NumericInputTypes;
            NumericInputTypes["__class"] = "framework.components.input.NumericInputTypes";
        })(input = components.input || (components.input = {}));
    })(components = framework.components || (framework.components = {}));
})(framework || (framework = {}));
(function (framework) {
    var components;
    (function (components) {
        var table;
        (function (table) {
            class TableColumn {
                constructor() {
                    if (this.modelIndex === undefined) {
                        this.modelIndex = 0;
                    }
                    if (this.identifier === undefined) {
                        this.identifier = null;
                    }
                    if (this.width === undefined) {
                        this.width = 0;
                    }
                    if (this.minWidth === undefined) {
                        this.minWidth = 0;
                    }
                    if (this.maxWidth === undefined) {
                        this.maxWidth = 0;
                    }
                    if (this.headerRenderer === undefined) {
                        this.headerRenderer = null;
                    }
                    if (this.headerValue === undefined) {
                        this.headerValue = null;
                    }
                    if (this.cellRenderer === undefined) {
                        this.cellRenderer = null;
                    }
                    if (this.resizable === undefined) {
                        this.resizable = false;
                    }
                }
                getModelIndex() {
                    return this.modelIndex;
                }
                setModelIndex(modelIndex) {
                    this.modelIndex = modelIndex;
                }
                getIdentifier() {
                    return this.identifier;
                }
                setIdentifier(identifier) {
                    this.identifier = identifier;
                }
                getWidth() {
                    return this.width;
                }
                setWidth(width) {
                    this.width = width;
                }
                getMinWidth() {
                    return this.minWidth;
                }
                setMinWidth(minWidth) {
                    this.minWidth = minWidth;
                }
                getMaxWidth() {
                    return this.maxWidth;
                }
                setMaxWidth(maxWidth) {
                    this.maxWidth = maxWidth;
                }
                getHeaderRenderer() {
                    return this.headerRenderer;
                }
                setHeaderRenderer(headerRenderer) {
                    this.headerRenderer = headerRenderer;
                }
                getHeaderValue() {
                    return this.headerValue;
                }
                setHeaderValue(headerValue) {
                    this.headerValue = headerValue;
                }
                getCellRenderer() {
                    return this.cellRenderer;
                }
                setCellRenderer(cellRenderer) {
                    this.cellRenderer = cellRenderer;
                }
                isResizable() {
                    return this.resizable;
                }
                setResizable(resizable) {
                    this.resizable = resizable;
                }
            }
            table.TableColumn = TableColumn;
            TableColumn["__class"] = "framework.components.table.TableColumn";
        })(table = components.table || (components.table = {}));
    })(components = framework.components || (framework.components = {}));
})(framework || (framework = {}));
(function (framework) {
    var components;
    (function (components) {
        var table;
        (function (table) {
            /**
             * The cells from (firstRow, column) to (lastRow, column) have been changed.
             * The <I>column</I> refers to the column index of the cell in the model's
             * co-ordinate system. When <I>column</I> is ALL_COLUMNS, all cells in the
             * specified range of rows are considered changed.
             * <p>
             * The <I>type</I> should be one of: INSERT, UPDATE and DELETE.
             * @param {*} source
             * @param {number} firstRow
             * @param {number} lastRow
             * @param {number} column
             * @param {number} type
             * @class
             */
            class TableModelEvent {
                constructor(source, firstRow, lastRow, column, type) {
                    if (((source != null && (source.constructor != null && source.constructor["__interfaces"] != null && source.constructor["__interfaces"].indexOf("framework.components.table.TableModel") >= 0)) || source === null) && ((typeof firstRow === 'number') || firstRow === null) && ((typeof lastRow === 'number') || lastRow === null) && ((typeof column === 'number') || column === null) && ((typeof type === 'number') || type === null)) {
                        let __args = arguments;
                        if (this.type === undefined) {
                            this.type = 0;
                        }
                        if (this.firstRow === undefined) {
                            this.firstRow = 0;
                        }
                        if (this.lastRow === undefined) {
                            this.lastRow = 0;
                        }
                        if (this.column === undefined) {
                            this.column = 0;
                        }
                        if (this.source === undefined) {
                            this.source = null;
                        }
                        this.source = source;
                        this.firstRow = firstRow;
                        this.lastRow = lastRow;
                        this.column = column;
                        this.type = type;
                    }
                    else if (((source != null && (source.constructor != null && source.constructor["__interfaces"] != null && source.constructor["__interfaces"].indexOf("framework.components.table.TableModel") >= 0)) || source === null) && ((typeof firstRow === 'number') || firstRow === null) && ((typeof lastRow === 'number') || lastRow === null) && ((typeof column === 'number') || column === null) && type === undefined) {
                        let __args = arguments;
                        {
                            let __args = arguments;
                            let type = TableModelEvent.UPDATE;
                            if (this.type === undefined) {
                                this.type = 0;
                            }
                            if (this.firstRow === undefined) {
                                this.firstRow = 0;
                            }
                            if (this.lastRow === undefined) {
                                this.lastRow = 0;
                            }
                            if (this.column === undefined) {
                                this.column = 0;
                            }
                            if (this.source === undefined) {
                                this.source = null;
                            }
                            this.source = source;
                            this.firstRow = firstRow;
                            this.lastRow = lastRow;
                            this.column = column;
                            this.type = type;
                        }
                        if (this.type === undefined) {
                            this.type = 0;
                        }
                        if (this.firstRow === undefined) {
                            this.firstRow = 0;
                        }
                        if (this.lastRow === undefined) {
                            this.lastRow = 0;
                        }
                        if (this.column === undefined) {
                            this.column = 0;
                        }
                        if (this.source === undefined) {
                            this.source = null;
                        }
                    }
                    else if (((source != null && (source.constructor != null && source.constructor["__interfaces"] != null && source.constructor["__interfaces"].indexOf("framework.components.table.TableModel") >= 0)) || source === null) && ((typeof firstRow === 'number') || firstRow === null) && ((typeof lastRow === 'number') || lastRow === null) && column === undefined && type === undefined) {
                        let __args = arguments;
                        {
                            let __args = arguments;
                            let column = TableModelEvent.ALL_COLUMNS;
                            let type = TableModelEvent.UPDATE;
                            if (this.type === undefined) {
                                this.type = 0;
                            }
                            if (this.firstRow === undefined) {
                                this.firstRow = 0;
                            }
                            if (this.lastRow === undefined) {
                                this.lastRow = 0;
                            }
                            if (this.column === undefined) {
                                this.column = 0;
                            }
                            if (this.source === undefined) {
                                this.source = null;
                            }
                            this.source = source;
                            this.firstRow = firstRow;
                            this.lastRow = lastRow;
                            this.column = column;
                            this.type = type;
                        }
                        if (this.type === undefined) {
                            this.type = 0;
                        }
                        if (this.firstRow === undefined) {
                            this.firstRow = 0;
                        }
                        if (this.lastRow === undefined) {
                            this.lastRow = 0;
                        }
                        if (this.column === undefined) {
                            this.column = 0;
                        }
                        if (this.source === undefined) {
                            this.source = null;
                        }
                    }
                    else if (((source != null && (source.constructor != null && source.constructor["__interfaces"] != null && source.constructor["__interfaces"].indexOf("framework.components.table.TableModel") >= 0)) || source === null) && ((typeof firstRow === 'number') || firstRow === null) && lastRow === undefined && column === undefined && type === undefined) {
                        let __args = arguments;
                        let row = __args[1];
                        {
                            let __args = arguments;
                            let firstRow = row;
                            let lastRow = row;
                            let column = TableModelEvent.ALL_COLUMNS;
                            let type = TableModelEvent.UPDATE;
                            if (this.type === undefined) {
                                this.type = 0;
                            }
                            if (this.firstRow === undefined) {
                                this.firstRow = 0;
                            }
                            if (this.lastRow === undefined) {
                                this.lastRow = 0;
                            }
                            if (this.column === undefined) {
                                this.column = 0;
                            }
                            if (this.source === undefined) {
                                this.source = null;
                            }
                            this.source = source;
                            this.firstRow = firstRow;
                            this.lastRow = lastRow;
                            this.column = column;
                            this.type = type;
                        }
                        if (this.type === undefined) {
                            this.type = 0;
                        }
                        if (this.firstRow === undefined) {
                            this.firstRow = 0;
                        }
                        if (this.lastRow === undefined) {
                            this.lastRow = 0;
                        }
                        if (this.column === undefined) {
                            this.column = 0;
                        }
                        if (this.source === undefined) {
                            this.source = null;
                        }
                    }
                    else if (((source != null && (source.constructor != null && source.constructor["__interfaces"] != null && source.constructor["__interfaces"].indexOf("framework.components.table.TableModel") >= 0)) || source === null) && firstRow === undefined && lastRow === undefined && column === undefined && type === undefined) {
                        let __args = arguments;
                        {
                            let __args = arguments;
                            let firstRow = 0;
                            let lastRow = 2147483647;
                            let column = TableModelEvent.ALL_COLUMNS;
                            let type = TableModelEvent.UPDATE;
                            if (this.type === undefined) {
                                this.type = 0;
                            }
                            if (this.firstRow === undefined) {
                                this.firstRow = 0;
                            }
                            if (this.lastRow === undefined) {
                                this.lastRow = 0;
                            }
                            if (this.column === undefined) {
                                this.column = 0;
                            }
                            if (this.source === undefined) {
                                this.source = null;
                            }
                            this.source = source;
                            this.firstRow = firstRow;
                            this.lastRow = lastRow;
                            this.column = column;
                            this.type = type;
                        }
                        if (this.type === undefined) {
                            this.type = 0;
                        }
                        if (this.firstRow === undefined) {
                            this.firstRow = 0;
                        }
                        if (this.lastRow === undefined) {
                            this.lastRow = 0;
                        }
                        if (this.column === undefined) {
                            this.column = 0;
                        }
                        if (this.source === undefined) {
                            this.source = null;
                        }
                    }
                    else
                        throw new Error('invalid overload');
                }
                /**
                 * Returns the first row that changed.  HEADER_ROW means the meta data,
                 * ie. names, types and order of the columns.
                 * @return {number}
                 */
                getFirstRow() {
                    return this.firstRow;
                }
                /**
                 * Returns the last row that changed.
                 * @return {number}
                 */
                getLastRow() {
                    return this.lastRow;
                }
                /**
                 * Returns the column for the event.  If the return
                 * value is ALL_COLUMNS; it means every column in the specified
                 * rows changed.
                 * @return {number}
                 */
                getColumn() {
                    return this.column;
                }
                /**
                 * Returns the type of event - one of: INSERT, UPDATE and DELETE.
                 * @return {number}
                 */
                getType() {
                    return this.type;
                }
            }
            /**
             * Identifies the addition of new rows or columns.
             */
            TableModelEvent.INSERT = 1;
            /**
             * Identifies a change to existing data.
             */
            TableModelEvent.UPDATE = 0;
            /**
             * Identifies the removal of rows or columns.
             */
            TableModelEvent.DELETE = -1;
            /**
             * Identifies the header row.
             */
            TableModelEvent.HEADER_ROW = -1;
            /**
             * Specifies all columns in a row or rows.
             */
            TableModelEvent.ALL_COLUMNS = -1;
            table.TableModelEvent = TableModelEvent;
            TableModelEvent["__class"] = "framework.components.table.TableModelEvent";
        })(table = components.table || (components.table = {}));
    })(components = framework.components || (framework.components = {}));
})(framework || (framework = {}));
(function (framework) {
    var components;
    (function (components) {
        var util;
        (function (util) {
            class ComponentUtil {
                static visit(designable, visitor) {
                    visitor.doVisit(designable);
                    {
                        let array33044 = designable.getChildren();
                        for (let index33043 = 0; index33043 < array33044.length; index33043++) {
                            let child = array33044[index33043];
                            {
                                ComponentUtil.visit(child, visitor);
                            }
                        }
                    }
                }
                static getTags(type) {
                    const html5tags = (window["html5tags"]);
                    const result = (new Array());
                    for (let index33045 = 0; index33045 < html5tags.length; index33045++) {
                        let html5tag = html5tags[index33045];
                        {
                            const stype = html5tag["type"];
                            if (stype === type || type === "*") {
                                result.push(html5tag);
                            }
                        }
                    }
                    return result;
                }
            }
            util.ComponentUtil = ComponentUtil;
            ComponentUtil["__class"] = "framework.components.util.ComponentUtil";
        })(util = components.util || (components.util = {}));
    })(components = framework.components || (framework.components = {}));
})(framework || (framework = {}));
(function (framework) {
    var components;
    (function (components) {
        var util;
        (function (util) {
            class PropertyUtil {
                static getValue(obj, property) {
                    if (obj == null) {
                        return null;
                    }
                    if ( /* contains */(property.indexOf(".") != -1)) {
                        const parts = property.split(".");
                        let tmp = obj;
                        for (let index33046 = 0; index33046 < parts.length; index33046++) {
                            let part = parts[index33046];
                            {
                                tmp = PropertyUtil.getValue(tmp, part);
                            }
                        }
                        return tmp;
                    }
                    else {
                        return obj[property];
                    }
                }
                static hasOwnProperty(obj, property) {
                    if ( /* contains */(property.indexOf(".") != -1)) {
                        const keys = property.split(".");
                        let tmp = obj;
                        for (let i = 0; i < keys.length - 1; i++) {
                            {
                                if (!tmp.hasOwnProperty(keys[i])) {
                                    return false;
                                }
                                tmp = tmp[keys[i]];
                            }
                            ;
                        }
                        return tmp.hasOwnProperty(keys[keys.length - 1]);
                    }
                    else {
                        return obj.hasOwnProperty(property);
                    }
                }
                static setValue(obj, value, property) {
                    if (obj == null) {
                        throw Object.defineProperty(new Error("cannot set  property " + property + " to undefined"), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Error', 'java.lang.Object'] });
                    }
                    if ( /* contains */(property.indexOf(".") != -1)) {
                        const keys = property.split(".");
                        let tmp = obj;
                        for (let i = 0; i < keys.length - 1; i++) {
                            {
                                if (!tmp.hasOwnProperty(keys[i])) {
                                    tmp[keys[i]] = new Object();
                                }
                                tmp = PropertyUtil.getValue(tmp, keys[i]);
                            }
                            ;
                        }
                        PropertyUtil.setValue(tmp, value, keys[keys.length - 1]);
                    }
                    else {
                        obj[property] = value;
                    }
                }
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
                static getQuery(hash) {
                    const result = new Object();
                    if ( /* contains */(hash.indexOf("?") != -1)) {
                        const kvs = hash.split("?")[1].split("&");
                        for (let index33047 = 0; index33047 < kvs.length; index33047++) {
                            let kv = kvs[index33047];
                            {
                                const akv = kv.split("=");
                                result[akv[0]] = akv[1];
                            }
                        }
                    }
                    return result;
                }
            }
            PropertyUtil.DOCUMENT_STRCTURE_HIDE_CONTEXT_MENU_ADDED = false;
            PropertyUtil.REMOTESERVER = "";
            util.PropertyUtil = PropertyUtil;
            PropertyUtil["__class"] = "framework.components.util.PropertyUtil";
        })(util = components.util || (components.util = {}));
    })(components = framework.components || (framework.components = {}));
})(framework || (framework = {}));
(function (framework) {
    var components;
    (function (components) {
        class Util {
            static DAYS_$LI$() { if (Util.DAYS == null) {
                Util.DAYS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
            } return Util.DAYS; }
            static SHORT_DAYS_$LI$() { if (Util.SHORT_DAYS == null) {
                Util.SHORT_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            } return Util.SHORT_DAYS; }
            static LONG_DAYS_$LI$() { if (Util.LONG_DAYS == null) {
                Util.LONG_DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            } return Util.LONG_DAYS; }
            static MONTHS_$LI$() { if (Util.MONTHS == null) {
                Util.MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            } return Util.MONTHS; }
            static DAYS_IN_MONTH_$LI$() { if (Util.DAYS_IN_MONTH == null) {
                Util.DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            } return Util.DAYS_IN_MONTH; }
            static getSemaineType() {
                const s = "{\r\n  \"config\": {\r\n    \"Lundi\": {\r\n      \"dispo\": [\r\n        {\r\n          \"from\": \"12:00\",\r\n          \"to\": \"14:00\"\r\n        }\r\n      ],\r\n      \"abs\": []\r\n    },\r\n    \"Mardi\": {\r\n      \"dispo\": [\r\n        {\r\n          \"from\": \"11:30\",\r\n          \"to\": \"12:30\",\r\n          \"quantity\": \"4\"\r\n        }\r\n      ],\r\n      \"abs\": []\r\n    },\r\n    \"Mercredi\": {\r\n      \"dispo\": [\r\n        {\r\n          \"from\": \"09:00\",\r\n          \"to\": \"10:00\",\r\n          \"quantity\": \"4\"\r\n        },\r\n        {\r\n          \"from\": \"12:00\",\r\n          \"to\": \"14:30\",\r\n          \"quantity\": \"3\"\r\n        },\r\n        {\r\n          \"from\": \"12:30\",\r\n          \"to\": \"13:30\",\r\n          \"quantity\": \"3\"\r\n        }\r\n      ],\r\n      \"abs\": []\r\n    },\r\n    \"Jeudi\": {\r\n      \"dispo\": [],\r\n      \"abs\": [\r\n        {\r\n          \"from\": \"10:00\",\r\n          \"to\": \"11:00\",\r\n          \"quantity\": 1\r\n        }\r\n      ]\r\n    },\r\n    \"Vendredi\": {\r\n      \"dispo\": [\r\n        {\r\n          \"from\": \"15:30\",\r\n          \"to\": \"17:00\",\r\n          \"quantity\": \"4\"\r\n        },\r\n        {\r\n          \"from\": \"10:30\",\r\n          \"to\": \"14:00\"\r\n        }\r\n      ],\r\n      \"abs\": []\r\n    },\r\n    \"Samedi\": {\r\n      \"dispo\": [],\r\n      \"abs\": []\r\n    }\r\n  },\r\n  \"until\": \"2020-12-27T00:00:00.000Z\"\r\n}";
                const obj = JSON.parse(s);
                return obj;
            }
            static getDaysInMonth(date) {
                if (date.getMonth() === 11) {
                    return 31;
                }
                else {
                    const tmp = Util.addDays(new Date(date.getFullYear(), date.getMonth() + 1, date.getDate(), 0, 0, 0, 0), -1);
                    return tmp.getDate();
                }
            }
            static getFirstDateOfMonth(date) {
                return new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0, 0);
            }
            static getLastDateOfMonth(date) {
                if (date.getMonth() === 11) {
                    return new Date(date.getFullYear(), date.getMonth(), 31, 0, 0, 0, 0);
                }
                else {
                    const tmp = new Date(date.getFullYear(), date.getMonth() + 1, 1, 0, 0, 0, 0);
                    return Util.addDays(tmp, -1);
                }
            }
            static to2num(val) {
                if (val < 10) {
                    return "0" + val;
                }
                else {
                    return val + "";
                }
            }
            static getTime(hour, minute) {
                return Util.to2num(hour) + ":" + Util.to2num(minute);
            }
            static getHour(time) {
                return /* parseInt */ parseInt(time.split(":")[0]);
            }
            static getMinute(time) {
                return /* parseInt */ parseInt(time.split(":")[1]);
            }
            static countRows(startTime, endTime) {
                const fromHr = Util.getHour(startTime);
                const toHr = Util.getHour(endTime);
                const fromMin = Util.getMinute(startTime);
                const toMin = Util.getMinute(endTime);
                let whole = ((toHr - fromHr) * 2) + 1;
                if (fromMin === 30) {
                    whole = whole - 1;
                }
                if (toMin === 30) {
                    whole = whole + 1;
                }
                return whole;
            }
            static countStartRowPosition(startTime) {
                const hr = Util.getHour(startTime);
                const minute = Util.getMinute(startTime);
                let startRow = (hr - Util.MIN_HOUR) * 2 + 1;
                if (minute === 30) {
                    startRow = startRow + 1;
                }
                const top = (startRow * Util.ROW_HEIGHT_PX) + 1;
                return top;
            }
            static formatDate(dt, format) {
                const dd = Util.formatNum(dt.getDate());
                const MM = Util.formatNum(dt.getMonth());
                const hh = Util.formatNum(dt.getHours());
                const mm = Util.formatNum(dt.getMinutes());
                const ss = Util.formatNum(dt.getSeconds());
                const EE = Util.SHORT_DAYS_$LI$()[(dt.getDay() | 0)];
                const EEEE = Util.LONG_DAYS_$LI$()[(dt.getDay() | 0)];
                const yyyy = dt.getFullYear() + "";
                format = Util.replace(format, "dd", dd);
                format = Util.replace(format, "MM", MM);
                format = Util.replace(format, "hh", hh);
                format = Util.replace(format, "mm", mm);
                format = Util.replace(format, "ss", ss);
                format = Util.replace(format, "EE", EE);
                format = Util.replace(format, "EEEE", EEEE);
                format = Util.replace(format, "yyyy", yyyy);
                return format;
            }
            static replace(text, s, __with) {
                return /* replace */ text.split(s).join(__with);
            }
            static formatNum(d) {
                return d < 10 ? "0" + d : d + "";
            }
            static countStartColPosition(day, gutter, colWidth) {
                let index = 0;
                for (let index33048 = 0; index33048 < Util.DAYS_$LI$().length; index33048++) {
                    let s = Util.DAYS_$LI$()[index33048];
                    {
                        if (s === day) {
                            break;
                        }
                        index++;
                    }
                }
                return (colWidth * index) + gutter;
            }
            static addWeeks(dt, weeks) {
                return Util.addDays(dt, weeks * 7);
            }
            static addDays(dt, days) {
                return Util.addHour(dt, days * 24);
            }
            static addHour(dt, hrs) {
                return Util.addMinutes(dt, hrs * 60);
            }
            static addMinutes(dt, minutes) {
                return Util.addSeconds(dt, minutes * 60);
            }
            static addSeconds(dt, secs) {
                return Util.addMiliseconds(dt, secs * 1000);
            }
            static addMiliseconds(dt, ms) {
                return new Date(dt.getTime() + ms);
            }
            static isSameDate(dt1, dt2) {
                return (dt1.getDate() === dt2.getDate()) && (dt1.getMonth() === dt2.getMonth()) && (dt1.getFullYear() === dt2.getFullYear());
            }
        }
        Util.MIN_HOUR = 6;
        Util.MAX_HOUR = 21;
        Util.ROW_HEIGHT_PX = 28;
        Util.COLOR_DISPO = "#cfebfe";
        Util.COLOR_ABS = "#425c5a";
        components.Util = Util;
        Util["__class"] = "framework.components.Util";
    })(components = framework.components || (framework.components = {}));
})(framework || (framework = {}));
(function (framework) {
    var components;
    (function (components) {
        class WeekViewDndManager {
        }
        WeekViewDndManager.dragging = null;
        WeekViewDndManager.resizing = null;
        components.WeekViewDndManager = WeekViewDndManager;
        WeekViewDndManager["__class"] = "framework.components.WeekViewDndManager";
    })(components = framework.components || (framework.components = {}));
})(framework || (framework = {}));
(function (framework) {
    var components;
    (function (components) {
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
        class JSContainer {
            constructor(name, tag) {
                if (((typeof name === 'string') || name === null) && ((typeof tag === 'string') || tag === null)) {
                    let __args = arguments;
                    this.d = new Object();
                    this.setTag(tag);
                    this.setName(name);
                }
                else if (((typeof name === 'string') || name === null) && tag === undefined) {
                    let __args = arguments;
                    let tag = __args[0];
                    this.d = new Object();
                    this.setTag(tag);
                }
                else
                    throw new Error('invalid overload');
            }
            static defaultRenderer_$LI$() { if (JSContainer.defaultRenderer == null) {
                JSContainer.defaultRenderer = new framework.components.api.ContainerRenderer();
            } return JSContainer.defaultRenderer; }
            /**
             * Adds an event on the component
             *
             * @param {string} evt
             * The name of the event (click, dblclick, keyup etc)
             * @param {*} listener
             * The javascript function to be called back
             */
            on(evt, listener) {
                this.addEventListener(new JSContainer.JSContainer$0(this, listener), evt);
            }
            /**
             *
             * @return {java.lang.String[]} An array of custom events supported by the component<br>
             * This method is overridden by more complex components to provide
             * more advanced events mechanisms.
             */
            advancedEventTypes() {
                return [];
            }
            /**
             * Fires the {@link EventListener}s for the specified key passing the
             * specified payload
             *
             * @param {string} key
             * The event to execute
             * @param {Event} evt
             * The payload to transmit when executing the event.
             */
            fireListener(key, evt) {
                console.log("firing:" + key + " on " + this.getName());
                const listeners = this.getListeners()[key];
                if (listeners != null && listeners.length > 0) {
                    for (let index33049 = 0; index33049 < listeners.length; index33049++) {
                        let l = listeners[index33049];
                        {
                            l.performAction(this, evt);
                        }
                    }
                }
            }
            hasListenerOfType(type) {
                const listeners = this.getListeners()[type];
                if (listeners != null && listeners.length > 0) {
                    return true;
                }
                else {
                    return false;
                }
            }
            /**
             *
             * @return {Object} An {@link jsweet.lang.Object} to provide a scope for this
             * environement
             */
            getScope() {
                return null;
            }
            getChild(name) {
                {
                    let array33051 = this.getChildren();
                    for (let index33050 = 0; index33050 < array33051.length; index33050++) {
                        let child = array33051[index33050];
                        {
                            if (child.getName() === name) {
                                return child;
                            }
                        }
                    }
                }
                return null;
            }
            removeChild(r) {
                const children = this.getChildren();
                const tmp = children.filter((ctn, inde, lst) => {
                    return !((o1, o2) => { if (o1 && o1.equals) {
                        return o1.equals(o2);
                    }
                    else {
                        return o1 === o2;
                    } })(ctn, r);
                });
                if (children.length !== tmp.length) {
                    this.d["children"] = tmp;
                    this.setRendered(false);
                }
                return this;
            }
            addCSSRule(rule) {
                let rules = this.d["rules"];
                if (rules == null) {
                    rules = (new Array());
                    this.d["rules"] = rules;
                }
                if (rules.indexOf(rule) < 0) {
                    rules.push(rule);
                    this.d["rules"] = rules;
                }
                return this;
            }
            /**
             *
             * @return {string[]}
             */
            getCSSRules() {
                if (this.d.hasOwnProperty("rules")) {
                    return this.d["rules"];
                }
                else {
                    this.d["rules"] = new Array();
                    return this.getCSSRules();
                }
            }
            clearChildren() {
                this.d["children"] = new Array();
                return this;
            }
            /**
             *
             * @return {string[]}
             */
            getChangedAttributes() {
                if (this.d["changedAttributes"] != null) {
                    const changed = this.d["changedAttributes"];
                    return changed;
                }
                else {
                    this.d["changedAttributes"] = new Array();
                    return this.getChangedAttributes();
                }
            }
            getNative() {
                const elem = framework.components.api.ContainerRenderer.getElementById(this.getId());
                if (elem != null) {
                    return elem;
                }
                else {
                    return null;
                }
            }
            /**
             *
             * @return {string[]}
             */
            getChangedStyles() {
                if (this.d["changedStyles"] != null) {
                    const changed = this.d["changedStyles"];
                    return changed;
                }
                else {
                    this.d["changedStyles"] = new Array();
                    return this.getChangedStyles();
                }
            }
            /**
             * Flushes any data cleaning this component after it has been rendered on
             * the browser. This method is used internally by the engine
             *
             * @param {string} s
             * A secret value know by the implementor of the framework. This
             * is to prevent any end user from invoking this method since it
             * is a public exposed method
             */
            flush(s) {
                if (s === ("a28n12l10")) {
                    delete this.d["changedAttributes"];
                    delete this.d["changedStyles"];
                }
            }
            /**
             *
             * @return {*[]}
             */
            getRenderers() {
                const arr = this.d["renderers"];
                if (arr != null) {
                    return arr;
                }
                else {
                    return (new Array());
                }
            }
            /**
             *
             * @param {*} renderer
             * @return {framework.components.JSContainer}
             */
            addRenderer(renderer) {
                let arr = this.d["renderers"];
                if (arr == null) {
                    arr = (new Array());
                    this.d["renderers"] = arr;
                }
                arr.push(renderer);
                this.d["renderers"] = arr;
                return this;
            }
            /**
             *
             * @return {string}
             */
            getId() {
                const custom = this.getCustomProperties();
                if (custom != null) {
                    if (custom.hasOwnProperty("id")) {
                        return custom["id"];
                    }
                }
                let id = this.d["id"];
                if (id == null) {
                    id = this.uid();
                    this.d["id"] = id;
                }
                return id;
            }
            /**
             * Generates a unique id for this component
             *
             * @return {string} A unique id
             */
            uid() {
                JSContainer.idCount++;
                return JSContainer.idCount + "";
            }
            addOrRemoveClass(cls, b) {
                if (b && !this.hasClass(cls)) {
                    this.addClass(cls);
                }
                else if (!b && this.hasClass(cls)) {
                    this.removeClass(cls);
                }
            }
            /**
             *
             * @param {string} styleClass
             * @return {framework.components.JSContainer}
             */
            addClass(styleClass) {
                let styles = this.getAttribute("class");
                if (styles == null) {
                    styles = "";
                }
                const aStyles = styles.split(" ");
                const toAdds = styleClass.split(" ");
                let res = "";
                for (let index33052 = 0; index33052 < toAdds.length; index33052++) {
                    let toAdd = toAdds[index33052];
                    {
                        toAdd = toAdd.trim();
                        if (toAdd.length > 0) {
                            let add = true;
                            for (let index33053 = 0; index33053 < aStyles.length; index33053++) {
                                let style = aStyles[index33053];
                                {
                                    style = style.trim();
                                    if (style.length > 0) {
                                        if (style.trim() === toAdd) {
                                            add = false;
                                        }
                                    }
                                }
                            }
                            if (add) {
                                res = res + " " + toAdd;
                            }
                        }
                    }
                }
                res = res.trim();
                this.setAttribute("class", (styles.trim() + " " + res).trim());
                return this;
            }
            hasClass(cls) {
                if (cls == null) {
                    return false;
                }
                cls = cls.trim();
                if (cls === "") {
                    return false;
                }
                if (cls.indexOf(" ") >= 0) {
                    throw new Error("Cannot check with multiple classes. You should probably check with each class one by one");
                }
                const styles = this.getAttribute("class");
                if (styles == null) {
                    return false;
                }
                const aStyles = styles.split(" ");
                for (let index33054 = 0; index33054 < aStyles.length; index33054++) {
                    let style = aStyles[index33054];
                    {
                        style = style.trim();
                        if (style !== "") {
                            if (style === cls) {
                                return true;
                            }
                        }
                    }
                }
                return false;
            }
            toggleClass(cls) {
                if (this.hasClass(cls)) {
                    this.removeClass(cls);
                }
                else {
                    this.addClass(cls);
                }
                return this;
            }
            /**
             *
             * @param {string} cls
             * @return {framework.components.JSContainer}
             */
            removeClass(cls) {
                if (cls != null && cls.trim() !== "") {
                    const toremove = cls.split(" ");
                    for (let index33055 = 0; index33055 < toremove.length; index33055++) {
                        let s = toremove[index33055];
                        {
                            this.removeSingleClass(s);
                        }
                    }
                }
                return this;
            }
            removeSingleClass(cls) {
                const cl = this.getAttribute("class");
                if (cl != null && cl.length > 0) {
                    const classes = cl.split(" ");
                    let result = "";
                    for (let index33056 = 0; index33056 < classes.length; index33056++) {
                        let scl = classes[index33056];
                        {
                            if (scl !== cls) {
                                if (result === "") {
                                    result = scl;
                                }
                                else {
                                    result = result + " " + scl;
                                }
                            }
                        }
                    }
                    this.setAttribute("class", result);
                }
                return this;
            }
            addChild$framework_components_api_Renderable(container) {
                if (container == null) {
                    throw new Error("addChild(null): Child component cannot be null.");
                }
                if (container.isValidParent(this)) {
                    container.d["parent"] = this;
                    this.getChildren().push(container);
                }
                else {
                    throw new Error("Cannot add this container here because this is not a valid a parent");
                }
                return this;
            }
            addChild$java_lang_String$java_lang_String(name, tag) {
                const child = new JSContainer(name, tag);
                this.addChild$framework_components_api_Renderable(child);
                return child;
            }
            addChild$java_lang_String$java_lang_String$java_lang_String(name, tag, cls) {
                const child = new JSContainer(name, tag);
                child.addClass(cls);
                this.addChild$framework_components_api_Renderable(child);
                return child;
            }
            addChild(name, tag, cls) {
                if (((typeof name === 'string') || name === null) && ((typeof tag === 'string') || tag === null) && ((typeof cls === 'string') || cls === null)) {
                    return this.addChild$java_lang_String$java_lang_String$java_lang_String(name, tag, cls);
                }
                else if (((typeof name === 'string') || name === null) && ((typeof tag === 'string') || tag === null) && cls === undefined) {
                    return this.addChild$java_lang_String$java_lang_String(name, tag);
                }
                else if (((name != null && (name.constructor != null && name.constructor["__interfaces"] != null && name.constructor["__interfaces"].indexOf("framework.components.api.Renderable") >= 0)) || name === null) && tag === undefined && cls === undefined) {
                    return this.addChild$framework_components_api_Renderable(name);
                }
                else
                    throw new Error('invalid overload');
            }
            isValidParent(parent) {
                return true;
            }
            /**
             *
             * @param {number} index
             * @param {*} child
             * @return {*}
             */
            addChildAt(index, child) {
                child.d["parent"] = this;
                const children = (new Array());
                let i = 0;
                let added = false;
                {
                    let array33058 = this.getChildren();
                    for (let index33057 = 0; index33057 < array33058.length; index33057++) {
                        let c = array33058[index33057];
                        {
                            if (i === index) {
                                children.push(child);
                                added = true;
                            }
                            children.push(c);
                            i++;
                        }
                    }
                }
                if (!added) {
                    children.push(child);
                }
                child.d["parent"] = this;
                this.d["children"] = children;
                return this;
            }
            /**
             *
             * @param {boolean} b
             * @return {framework.components.JSContainer}
             */
            setVisible(b) {
                if (!b) {
                    this.setStyle("display", "none");
                    this.addClass("slds-hidden");
                }
                else {
                    this.removeClass("slds-hidden");
                    this.setStyle("display", null);
                }
                return this;
            }
            /**
             *
             * @param {*} listener
             * @param {string} type
             * @return {framework.components.JSContainer}
             */
            addEventListener(listener, type) {
                let listeners = this.getListeners();
                if (listeners == null) {
                    listeners = new Object();
                    this.d["listeners"] = listeners;
                }
                if (!listeners.hasOwnProperty(type)) {
                    listeners[type] = new Array();
                }
                const current = listeners[type];
                if (current.lastIndexOf(listener) < 0) {
                    listeners[type].push(listener);
                }
                else {
                    console.log("trap  coq");
                }
                return this;
            }
            /**
             *
             * @return {string}
             */
            getTag() {
                return this.getString("tag");
            }
            /**
             *
             * @param {string} tag
             * @return {framework.components.JSContainer}
             */
            setTag(tag) {
                this.setString("tag", tag);
                this.setRendered(false);
                return this;
            }
            /**
             *
             * @param {string} key
             * @param {string} value
             * @return {framework.components.JSContainer}
             */
            setStyle(key, value) {
                this.getChangedStyles().push(key);
                if (value != null) {
                    if (this.d["styles"] == null) {
                        this.d["styles"] = new Object();
                    }
                    this.d["styles"][key] = value;
                }
                else {
                    if (this.d["styles"] != null) {
                        delete this.d["styles"][key];
                        this.setRendered(false);
                    }
                }
                return this;
            }
            /**
             *
             * @param {string} key
             * @return {string}
             */
            getStyle(key) {
                if (this.d["styles"] != null) {
                    return this.d["styles"][key];
                }
                return null;
            }
            /**
             *
             * @param {string} key
             * @param {string} value
             * @return {framework.components.JSContainer}
             */
            setAttribute(key, value) {
                this.getChangedAttributes().push(key);
                if (value != null) {
                    if (this.d["attributes"] == null) {
                        this.d["attributes"] = new Object();
                    }
                    this.d["attributes"][key] = value;
                }
                else {
                    if (this.d["attributes"] != null)
                        delete this.d["attributes"][key];
                }
                return this;
            }
            /**
             *
             * @param {string} key
             * @return {string}
             */
            getAttribute(key) {
                if (this.d["attributes"] != null) {
                    return this.d["attributes"][key];
                }
                return null;
            }
            /**
             *
             * @return {string}
             */
            getName() {
                const name = this.getAttribute("name");
                if (name == null) {
                    return "";
                }
                return name;
            }
            /**
             *
             * @param {string} name
             */
            setName(name) {
                this.setAttribute("name", name);
            }
            /**
             *
             * @return {framework.components.JSContainer}
             */
            getParent() {
                return this.d["parent"];
            }
            /**
             *
             * @return {*[]}
             */
            getChildren() {
                const children = this.d["children"];
                if (children != null) {
                    return children;
                }
                else {
                    this.d["children"] = new Array();
                    return this.getChildren();
                }
            }
            /**
             *
             * @return {java.lang.String[]}
             */
            getStyleNames() {
                const styles = this.d["styles"];
                if (styles != null) {
                    return Object.keys(styles);
                }
                return [];
            }
            /**
             *
             * @return {java.lang.String[]}
             */
            getAttributeNames() {
                const styles = this.d["attributes"];
                if (styles != null) {
                    return Object.keys(styles);
                }
                return [];
            }
            /**
             *
             * @return {string}
             */
            getHtml() {
                const html = this.getString("html");
                if (html == null) {
                    return "";
                }
                return html;
            }
            /**
             *
             * @param {string} h
             * @return {framework.components.JSContainer}
             */
            setHtml(h) {
                this.setString("html", h);
                this.setRendered(false);
                return this;
            }
            /**
             *
             * @return {boolean}
             */
            isRendered() {
                return this.d["rendered"];
            }
            /**
             *
             * @param {boolean} b
             * @return {*}
             */
            setRendered(b) {
                this.d["rendered"] = b;
                if (!b) {
                    {
                        let array33060 = this.getChildren();
                        for (let index33059 = 0; index33059 < array33060.length; index33059++) {
                            let child = array33060[index33059];
                            {
                                child.setRendered(b);
                            }
                        }
                    }
                }
                return this;
            }
            /**
             *
             * @return {Object}
             */
            getListeners() {
                const l = this.d["listeners"];
                if (l == null) {
                    this.d["listeners"] = new Object();
                    return this.getListeners();
                }
                return l;
            }
            render$() {
                if (this.getParent() == null)
                    this.render$jsweet_dom_HTMLElement(null);
                else
                    this.render$jsweet_dom_HTMLElement(framework.components.api.ContainerRenderer.getElementById(this.getParent().getId()));
            }
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
            postRender(root) {
            }
            /**
             * Unitility method to check if the specified object is present in the
             * specified array
             *
             * @param {?[]} lst
             * The array to check if object is present
             * @param {*} o
             * The object to check if present
             * @return {boolean} Whether is present or not
             */
            contains(lst, o) {
                for (let index33061 = 0; index33061 < lst.length; index33061++) {
                    let oo = lst[index33061];
                    {
                        if ( /* equals */((o1, o2) => o1 && o1.equals ? o1.equals(o2) : o1 === o2)(oo, o)) {
                            return true;
                        }
                    }
                }
                return false;
            }
            render$jsweet_dom_HTMLElement(parent) {
                let renderers = this.getRenderers();
                if (renderers.length === 0) {
                    renderers.push(JSContainer.defaultRenderer_$LI$());
                }
                if (!this.contains(renderers, JSContainer.defaultRenderer_$LI$())) {
                    const tmp = (new Array());
                    tmp.push(JSContainer.defaultRenderer_$LI$());
                    for (let index33062 = 0; index33062 < renderers.length; index33062++) {
                        let r = renderers[index33062];
                        {
                            tmp.push(r);
                        }
                    }
                    renderers = tmp;
                }
                for (let index33063 = 0; index33063 < renderers.length; index33063++) {
                    let renderer = renderers[index33063];
                    renderer.doRender(this, parent);
                }
                {
                    let array33065 = this.getChildren();
                    for (let index33064 = 0; index33064 < array33065.length; index33064++) {
                        let child = array33065[index33064];
                        {
                            child['render$']();
                        }
                    }
                }
                this.setRendered(true);
            }
            /**
             *
             * @param {HTMLElement} parent
             */
            render(parent) {
                if (((parent != null && parent instanceof HTMLElement) || parent === null)) {
                    return this.render$jsweet_dom_HTMLElement(parent);
                }
                else if (parent === undefined) {
                    return this.render$();
                }
                else
                    throw new Error('invalid overload');
            }
            /**
             *
             * @return {*}
             */
            getCustomProperties() {
                return this.d["data"];
            }
            /**
             *
             * @param {*} data
             */
            setCustomProperties(data) {
                const previous = this.d["data"];
                if (previous != null && previous instanceof Array) {
                    const arData = previous;
                    for (let index33066 = 0; index33066 < arData.length; index33066++) {
                        let line = arData[index33066];
                        {
                            const value = line["value"];
                            this.setAttribute(value, null);
                        }
                    }
                }
                else {
                    if (previous != null) {
                        {
                            let array33068 = Object.keys(previous);
                            for (let index33067 = 0; index33067 < array33068.length; index33067++) {
                                let key = array33068[index33067];
                                {
                                    this.setAttribute(key, null);
                                }
                            }
                        }
                    }
                }
                this.d["data"] = data;
                if (data != null) {
                    if (data != null && data instanceof Array) {
                        const arData = data;
                        for (let index33069 = 0; index33069 < arData.length; index33069++) {
                            let line = arData[index33069];
                            {
                                const text = line["text"];
                                const value = line["value"];
                                this.setAttribute(value, text);
                            }
                        }
                    }
                    else {
                        {
                            let array33071 = Object.keys(data);
                            for (let index33070 = 0; index33070 < array33071.length; index33070++) {
                                let key = array33071[index33070];
                                {
                                    this.setAttribute(key, data[key]);
                                }
                            }
                        }
                    }
                }
            }
            /**
             * Finds an ancestor that contains the specified class
             *
             * @param {string} cls
             * The class to check
             * @return {*} The ancestor that contains the specified class
             */
            getAncestorWithClass(cls) {
                const parent = this.getParent();
                if (parent == null) {
                    return null;
                }
                const clsss = parent.getAttribute("class");
                if (clsss != null) {
                    {
                        let array33073 = parent.getAttribute("class").split(" ");
                        for (let index33072 = 0; index33072 < array33073.length; index33072++) {
                            let s = array33073[index33072];
                            {
                                if (s.trim() === cls)
                                    return parent;
                            }
                        }
                    }
                }
                return (parent.getAncestorWithClass(cls));
            }
            /**
             *
             * @param {string} id
             * @return {framework.components.JSContainer}
             */
            getAncestorById(id) {
                const parent = this.getParent();
                if (this.getId() === id)
                    return this;
                if (parent == null) {
                    return null;
                }
                return parent.getAncestorById(id);
            }
            /**
             *
             * @param {string} name
             * @return {framework.components.JSContainer}
             */
            getAncestorByName(name) {
                if (this.getName() === name)
                    return this;
                const parent = this.getParent();
                if (parent == null) {
                    return null;
                }
                return parent.getAncestorByName(name);
            }
            /**
             *
             * @return {framework.components.JSContainer}
             */
            getRoot() {
                const parent = this.getParent();
                if (parent == null) {
                    return this;
                }
                else {
                    return parent.getRoot();
                }
            }
            /*private*/ setString(key, value) {
                this.d[key] = value;
            }
            /*private*/ getString(key) {
                return this.d[key];
            }
            /**
             *
             * @param {*} data
             * @return {*}
             */
            setUserData(data) {
                this.d["userData"] = data;
                return this;
            }
            /**
             *
             * @return {*}
             */
            getUserData() {
                return this.d["userData"];
            }
        }
        JSContainer.idCount = 0;
        components.JSContainer = JSContainer;
        JSContainer["__class"] = "framework.components.JSContainer";
        JSContainer["__interfaces"] = ["framework.components.api.Renderable"];
        (function (JSContainer) {
            class JSContainer$0 {
                constructor(__parent, listener) {
                    this.listener = listener;
                    this.__parent = __parent;
                }
                /**
                 *
                 * @param {*} source
                 * @param {Event} evt
                 */
                performAction(source, evt) {
                    evt["source"] = source;
                    this.listener(evt);
                }
            }
            JSContainer.JSContainer$0 = JSContainer$0;
            JSContainer$0["__interfaces"] = ["framework.components.api.EventListener"];
        })(JSContainer = components.JSContainer || (components.JSContainer = {}));
    })(components = framework.components || (framework.components = {}));
})(framework || (framework = {}));
(function (framework) {
    var components;
    (function (components) {
        class App extends framework.components.JSContainer {
            constructor() {
                super("div");
                if (this.cmp === undefined) {
                    this.cmp = null;
                }
                if (this.evt === undefined) {
                    this.evt = null;
                }
                if (this.helper === undefined) {
                    this.helper = null;
                }
                const table = new framework.components.JSContainer("table");
                for (let i = 0; i < 10; i++) {
                    {
                        const row = new framework.components.JSContainer("tr");
                        for (let j = 0; j < 10; j++) {
                            {
                                const td = new framework.components.JSContainer("td");
                                row.addChild$framework_components_api_Renderable(td);
                            }
                            ;
                        }
                        table.addChild$framework_components_api_Renderable(row);
                    }
                    ;
                }
                this.addChild$framework_components_api_Renderable(table);
                this.addEventListener(new App.App$0(this), "click");
            }
        }
        components.App = App;
        App["__class"] = "framework.components.App";
        App["__interfaces"] = ["framework.components.api.Renderable"];
        (function (App) {
            class App$0 {
                constructor(__parent) {
                    this.__parent = __parent;
                }
                /**
                 *
                 * @param {*} source
                 * @param {Event} evt
                 */
                performAction(source, evt) {
                    const fn = this.__parent.helper["openPopup"];
                    fn.call(fn, this.__parent.cmp, evt, this.__parent.helper);
                }
            }
            App.App$0 = App$0;
            App$0["__interfaces"] = ["framework.components.api.EventListener"];
        })(App = components.App || (components.App = {}));
    })(components = framework.components || (framework.components = {}));
})(framework || (framework = {}));
(function (framework) {
    var components;
    (function (components) {
        class Box extends framework.components.JSContainer {
            constructor(name, size, of) {
                super(name, "div");
                this.addClass("slds-grid slds-wrap slds-col slds-size_" + size + "-of-" + of);
            }
        }
        components.Box = Box;
        Box["__class"] = "framework.components.Box";
        Box["__interfaces"] = ["framework.components.api.Renderable"];
    })(components = framework.components || (framework.components = {}));
})(framework || (framework = {}));
(function (framework) {
    var components;
    (function (components) {
        class CardLayout extends framework.components.JSContainer {
            constructor(name, tag) {
                super(name, tag);
                this.currentActive = "";
                this.currentIndex = 0;
            }
            addItem(item) {
                this.addChild$framework_components_api_Renderable(item);
                return this;
            }
            getCurrentIndex() {
                return this.currentIndex;
            }
            getItem(index) {
                if (index < this.getChildren().length) {
                    return this.getChildren()[index];
                }
                else {
                    return null;
                }
            }
            getIndex(name) {
                let index = 0;
                {
                    let array33075 = this.getChildren();
                    for (let index33074 = 0; index33074 < array33075.length; index33074++) {
                        let child = array33075[index33074];
                        {
                            if (child.getName() === name) {
                                return index;
                            }
                            index++;
                        }
                    }
                }
                return -1;
            }
            next(...params) {
                if (this.currentIndex < (this.getChildren().length - 1)) {
                    const current = this.getItem(this.currentIndex);
                    const validateEvent = new CustomEvent("validate");
                    validateEvent["source"] = current;
                    validateEvent["valid"] = true;
                    current.fireListener("validate", validateEvent);
                    const isValid = validateEvent["valid"];
                    if (isValid) {
                        this.currentIndex++;
                        const item = this.getItem(this.currentIndex);
                        this.activate.apply(this, [item.getName()].concat(params));
                        const nextEvent = new CustomEvent("next");
                        nextEvent["from"] = current;
                        nextEvent["to"] = item;
                        nextEvent["source"] = current;
                        nextEvent["dest"] = item;
                        this.fireListener("next", nextEvent);
                        return item;
                    }
                    else {
                        return null;
                    }
                }
                else {
                    return null;
                }
            }
            previous(...params) {
                if (this.currentIndex > 0) {
                    const current = this.getItem(this.currentIndex);
                    this.currentIndex--;
                    const item = this.getItem(this.currentIndex);
                    this.activate.apply(this, [item.getName()].concat(params));
                    const previousEvent = new CustomEvent("previous");
                    previousEvent["from"] = current;
                    previousEvent["to"] = item;
                    previousEvent["source"] = current;
                    previousEvent["dest"] = item;
                    this.fireListener("previous", previousEvent);
                    return item;
                }
                else {
                    return null;
                }
            }
            back(...params) {
                return this.previous.apply(this, params);
            }
            first(...params) {
                if (this.currentIndex > 0) {
                    const current = this.getItem(this.currentIndex);
                    this.currentIndex = 0;
                    const item = this.getItem(this.currentIndex);
                    this.activate.apply(this, [item.getName()].concat(params));
                    this.activate.apply(this, [item.getName()].concat(params));
                    const firstEvent = new CustomEvent("first");
                    firstEvent["from"] = current;
                    firstEvent["to"] = item;
                    firstEvent["source"] = current;
                    firstEvent["dest"] = item;
                    this.fireListener("first", firstEvent);
                    return item;
                }
                else {
                    this.currentIndex = 0;
                    const item = this.getItem(this.currentIndex);
                    return item;
                }
            }
            last(...params) {
                if (this.currentIndex < (this.getChildren().length - 1)) {
                    const current = this.getItem(this.currentIndex);
                    this.currentIndex = this.getChildren().length - 1;
                    const item = this.getItem(this.currentIndex);
                    this.activate.apply(this, [item.getName()].concat(params));
                    const lastEvent = new CustomEvent("last");
                    lastEvent["from"] = current;
                    lastEvent["to"] = item;
                    lastEvent["source"] = current;
                    lastEvent["dest"] = item;
                    this.fireListener("last", lastEvent);
                    return item;
                }
                else {
                    this.currentIndex = this.getChildren().length - 1;
                    const item = this.getItem(this.currentIndex);
                    return item;
                }
            }
            getDefault() {
                return this.getAttribute("default");
            }
            activate(name, ...params) {
                if (name === this.currentActive && this.currentIndex >= 0) {
                    return;
                }
                {
                    let array33077 = this.getChildren();
                    for (let index33076 = 0; index33076 < array33077.length; index33076++) {
                        let child = array33077[index33076];
                        {
                            if (child.getName() === name) {
                                const evt = new CustomEvent("activate");
                                evt["data"] = child;
                                evt["source"] = this;
                                if (params != null) {
                                    if (params.length > 1) {
                                        evt["params"] = params;
                                    }
                                    else if (params.length === 1) {
                                        evt["params"] = params;
                                        evt["param"] = params[0];
                                    }
                                }
                                child.fireListener("activate", evt);
                                child.setStyle("display", "block");
                            }
                            else if (child.getName() === this.currentActive) {
                                const evt = new CustomEvent("deactivate");
                                evt["data"] = child;
                                child.fireListener("deactivate", evt);
                                child.setStyle("display", "none");
                            }
                            else {
                                child.setStyle("display", "none");
                            }
                        }
                    }
                }
                this.currentActive = name;
                this.currentIndex = this.getIndex(this.currentActive);
            }
            /**
             *
             * @return {java.lang.String[]}
             */
            advancedEventTypes() {
                return ["first", "previous", "next", "last"];
            }
        }
        components.CardLayout = CardLayout;
        CardLayout["__class"] = "framework.components.CardLayout";
        CardLayout["__interfaces"] = ["framework.components.api.Renderable"];
    })(components = framework.components || (framework.components = {}));
})(framework || (framework = {}));
(function (framework) {
    var components;
    (function (components) {
        class CardLayoutItem extends framework.components.JSContainer {
            constructor(name, tag) {
                super(name, tag);
            }
            /**
             *
             * @return {java.lang.String[]}
             */
            advancedEventTypes() {
                return ["activate", "deactivate", "validate"];
            }
        }
        components.CardLayoutItem = CardLayoutItem;
        CardLayoutItem["__class"] = "framework.components.CardLayoutItem";
        CardLayoutItem["__interfaces"] = ["framework.components.api.Renderable"];
    })(components = framework.components || (framework.components = {}));
})(framework || (framework = {}));
(function (framework) {
    var components;
    (function (components) {
        class Col extends framework.components.JSContainer {
            constructor(name, size, of) {
                super(name, "div");
                this.addClass("slds-col slds-size_" + size + "-of-" + of);
            }
        }
        components.Col = Col;
        Col["__class"] = "framework.components.Col";
        Col["__interfaces"] = ["framework.components.api.Renderable"];
    })(components = framework.components || (framework.components = {}));
})(framework || (framework = {}));
(function (framework) {
    var components;
    (function (components) {
        class ExternalJavascript extends framework.components.JSContainer {
            constructor(name) {
                super(name, "script");
                this.setAttribute("type", "text/javascript");
                this.setAttribute("identifier", "html:javascript");
            }
            setSource(src) {
                this.setAttribute("src", src);
                return this;
            }
        }
        components.ExternalJavascript = ExternalJavascript;
        ExternalJavascript["__class"] = "framework.components.ExternalJavascript";
        ExternalJavascript["__interfaces"] = ["framework.components.api.Renderable"];
    })(components = framework.components || (framework.components = {}));
})(framework || (framework = {}));
(function (framework) {
    var components;
    (function (components) {
        class ExternalStylesheet extends framework.components.JSContainer {
            constructor(name) {
                super(name, "link");
                this.setAttribute("type", "text/css");
                this.setAttribute("rel", "stylesheet");
                this.setAttribute("identifier", "html:stylesheet");
                this.addRenderer(this);
            }
            setSource(src) {
                this.setAttribute("source", src);
                return this;
            }
            setCrossOrigin(origin) {
                this.setAttribute("crossorigin", origin);
                return this;
            }
            setMedia(media) {
                this.setAttribute("media", media);
                return this;
            }
            doRender$framework_components_ExternalStylesheet$jsweet_dom_HTMLElement(c, root) {
                if (c.getAncestorWithClass("builder") != null) {
                    const nati = c.getNative();
                    if (nati != null) {
                        nati.remove();
                    }
                }
            }
            /**
             *
             * @param {framework.components.ExternalStylesheet} c
             * @param {HTMLElement} root
             */
            doRender(c, root) {
                if (((c != null && c instanceof framework.components.ExternalStylesheet) || c === null) && ((root != null && root instanceof HTMLElement) || root === null)) {
                    return this.doRender$framework_components_ExternalStylesheet$jsweet_dom_HTMLElement(c, root);
                }
                else
                    throw new Error('invalid overload');
            }
        }
        ExternalStylesheet.ORIGIN_ANONYMOUS = "anonymous";
        ExternalStylesheet.ORIGIN_USE_CREDENTIALS = "use-credentials";
        ExternalStylesheet.MEDIA_DEFAULT = null;
        ExternalStylesheet.MEDIA_ALL = "all";
        ExternalStylesheet.MEDIA_SCREEN = "screen";
        ExternalStylesheet.MEDIA_PRINT = "print";
        ExternalStylesheet.MEDIA_SPEECH = "speech";
        components.ExternalStylesheet = ExternalStylesheet;
        ExternalStylesheet["__class"] = "framework.components.ExternalStylesheet";
        ExternalStylesheet["__interfaces"] = ["framework.components.api.Renderable", "framework.components.api.Renderer"];
    })(components = framework.components || (framework.components = {}));
})(framework || (framework = {}));
(function (framework) {
    var components;
    (function (components) {
        /**
         * Constructs an instance of this component
         *
         * @param {string} name     The name of the component
         * @param {string} template The html template of this component
         * @class
         * @extends framework.components.JSContainer
         * @author Rossaye Abdool Kureem
         */
        class HTMLTemplateContainer extends framework.components.JSContainer {
            constructor(name, template) {
                super(name, "div");
                this.context = new Object();
                if (this.template === undefined) {
                    this.template = null;
                }
                this.setTemplate(template);
            }
            /**
             *
             * @return {string} The template of the component
             */
            getTemplate() {
                return this.template;
            }
            /**
             * Sets the template of this component
             *
             * @param {string} template The template of this component
             */
            setTemplate(template) {
                this.template = template;
                this.setRendered(false);
            }
            /**
             *
             * @return {Object} The variable context of this component
             */
            getContext() {
                return this.context;
            }
            render$jsweet_dom_HTMLElement(parent) {
                if (!this.isRendered()) {
                    const html = this.getTemplate();
                    if (html != null) {
                        let cxt = this.context;
                        if (cxt == null) {
                            cxt = new Object();
                        }
                        cxt["component"] = this;
                        cxt["me"] = this;
                        cxt["$this"] = this;
                        let rendered = this.compile(html, cxt);
                        const tmp = document.createElement("div");
                        tmp.innerHTML = rendered;
                        let tm = tmp.firstElementChild;
                        const children = tmp.childNodes;
                        if (children.length > 1 || tm == null) {
                            tm = tmp;
                        }
                        rendered = tm.innerHTML;
                        const tag = tm.tagName;
                        this.setTag(tag);
                        const attrs = tm.attributes;
                        for (let index33078 = 0; index33078 < attrs.length; index33078++) {
                            let att = attrs[index33078];
                            {
                                this.setAttribute(att.name, att.value);
                            }
                        }
                        this.setHtml(rendered);
                    }
                    else {
                        this.setHtml("Cannot load template:" + this.getTemplate());
                    }
                }
                super.render$jsweet_dom_HTMLElement(parent);
            }
            /**
             *
             * @param {HTMLElement} parent
             */
            render(parent) {
                if (((parent != null && parent instanceof HTMLElement) || parent === null)) {
                    return this.render$jsweet_dom_HTMLElement(parent);
                }
                else if (parent === undefined) {
                    return this.render$();
                }
                else
                    throw new Error('invalid overload');
            }
            compile(html, ctx) {
                return html;
            }
            static invokeFunction(target, __function, ...args) {
                if (target.hasOwnProperty(__function)) {
                    return (o => o.call.apply(o, [target].concat(args)))(target[__function]);
                }
                else {
                    throw new Error(target + " does not contain function:" + __function);
                }
            }
        }
        components.HTMLTemplateContainer = HTMLTemplateContainer;
        HTMLTemplateContainer["__class"] = "framework.components.HTMLTemplateContainer";
        HTMLTemplateContainer["__interfaces"] = ["framework.components.api.Renderable", "framework.components.api.TemplateRenderable"];
    })(components = framework.components || (framework.components = {}));
})(framework || (framework = {}));
(function (framework) {
    var components;
    (function (components) {
        var input;
        (function (input) {
            class AbstractJSInput extends framework.components.JSContainer {
                constructor(name) {
                    super(name, "input");
                    this.validators = (new Array());
                }
                addValidator(validator) {
                    this.validators.push(validator);
                }
                setSize(size) {
                    this.setAttribute("size", size + "");
                }
                setPattern(pattern) {
                    this.setAttribute("pattern", pattern);
                }
                setRequired(b) {
                    if (b) {
                        this.setAttribute("required", "true");
                    }
                    else
                        this.setAttribute("required", null);
                    return this;
                }
                setDisabled(b) {
                    if (b) {
                        this.setAttribute("disabled", "true");
                    }
                    else {
                        this.setAttribute("disabled", null);
                    }
                    return this;
                }
                setReadOnly(b) {
                    if (b) {
                        this.setAttribute("readonly", "true");
                    }
                    else {
                        this.setAttribute("readonly", null);
                    }
                    return this;
                }
                toHtmlDateString(date) {
                    let month = (date.getMonth() + 1) + "";
                    if (month.length === 1) {
                        month = "0" + month;
                    }
                    let sdate = (date.getDate()) + "";
                    if (sdate.length === 1) {
                        sdate = "0" + sdate;
                    }
                    return date.getFullYear() + "-" + month + "-" + sdate;
                }
                getDoubleValue() {
                    const nat = this.getNative();
                    if (nat != null) {
                        const el = nat;
                        return el.valueAsNumber;
                    }
                    return parseFloat(this.getAttribute("value"));
                }
                getStringValue() {
                    const nat = this.getNative();
                    if (nat != null) {
                        const el = nat;
                        return el.value;
                    }
                    return this.getAttribute("value");
                }
                getDateValue() {
                    const nat = this.getNative();
                    if (nat != null) {
                        const el = nat;
                        return el.valueAsDate;
                    }
                    return new Date(this.getAttribute("value"));
                }
                getNativeInput() {
                    const nat = this.getNative();
                    if (nat != null) {
                        const el = nat;
                        return el;
                    }
                    return null;
                }
                setDoubleValue(val) {
                    const el = this.getNativeInput();
                    if (el != null) {
                        el.valueAsNumber = val;
                    }
                    this.setAttribute("value", val + "");
                }
                setStringValue(s) {
                    const el = this.getNativeInput();
                    if (el != null) {
                        el.value = s;
                    }
                    this.setAttribute("value", s);
                }
                setDateValue(date) {
                    const el = this.getNativeInput();
                    if (el != null) {
                        el.valueAsDate = date;
                    }
                    if (date != null)
                        this.setAttribute("value", this.toHtmlDateString(date));
                    else
                        this.setAttribute("value", "");
                }
                getBinding() {
                    return this.getAttribute("binding");
                }
                setPlaceHolder(placeholder) {
                    this.setAttribute("placeholder", placeholder);
                    return this;
                }
                /**
                 *
                 * @param {string} msg
                 * The message to add in the validation context
                 * @param {ValidityState} state
                 * The ValidityState returned
                 * @param {framework.components.api.ValidationException} e
                 * The validation exception to add to error context
                 * @return {framework.components.api.ValidationException} The current instance of the {@link ValidationException}
                 */
                static addError(msg, state, e) {
                    if (!state.valid) {
                        if (state.badInput) {
                            framework.components.api.ValidationException.addError(msg, framework.components.api.ValidationException.badInput, e);
                        }
                        else if (state.customError) {
                            framework.components.api.ValidationException.addError(msg, framework.components.api.ValidationException.customError, e);
                        }
                        else if (state.patternMismatch) {
                            framework.components.api.ValidationException.addError(msg, framework.components.api.ValidationException.patternMismatch, e);
                        }
                        else if (state.rangeOverflow) {
                            framework.components.api.ValidationException.addError(msg, framework.components.api.ValidationException.rangeOverflow, e);
                        }
                        else if (state.rangeUnderflow) {
                            framework.components.api.ValidationException.addError(msg, framework.components.api.ValidationException.rangeUnderflow, e);
                        }
                        else if (state.stepMismatch) {
                            framework.components.api.ValidationException.addError(msg, framework.components.api.ValidationException.stepMismatch, e);
                        }
                        else if (state.tooLong) {
                            framework.components.api.ValidationException.addError(msg, framework.components.api.ValidationException.tooLong, e);
                        }
                        else if (state.typeMismatch) {
                            framework.components.api.ValidationException.addError(msg, framework.components.api.ValidationException.typeMismatch, e);
                        }
                        else if (state.valueMissing) {
                            framework.components.api.ValidationException.addError(msg, framework.components.api.ValidationException.valueMissing, e);
                        }
                    }
                    return e;
                }
                /**
                 *
                 */
                validate() {
                    let valid = true;
                    const e = new framework.components.api.ValidationException();
                    const nat = this.getNative();
                    if (nat != null) {
                        const el = nat;
                        valid = el.checkValidity();
                        if (!valid) {
                            AbstractJSInput.addError(el.validationMessage, el.validity, e);
                        }
                    }
                    for (let index33079 = 0; index33079 < this.validators.length; index33079++) {
                        let v = this.validators[index33079];
                        {
                            const b = v.validate(this);
                            if (!b) {
                                valid = false;
                                framework.components.api.ValidationException.addError(v.getErrorMessage(), framework.components.api.ValidationException.customError, e);
                            }
                        }
                    }
                    const validate = new CustomEvent("validate");
                    validate["errors"] = e.errors;
                    validate["valid"] = valid;
                    validate["source"] = this;
                    this.fireListener("validate", validate);
                    if (!valid) {
                        throw e;
                    }
                }
                /**
                 *
                 * @return {java.lang.String[]}
                 */
                advancedEventTypes() {
                    return ["validate"];
                }
                setBinding(binding) {
                    this.setAttribute("binding", binding);
                    return this;
                }
            }
            input.AbstractJSInput = AbstractJSInput;
            AbstractJSInput["__class"] = "framework.components.input.AbstractJSInput";
            AbstractJSInput["__interfaces"] = ["framework.components.api.InputField", "framework.components.api.Renderable"];
        })(input = components.input || (components.input = {}));
    })(components = framework.components || (framework.components = {}));
})(framework || (framework = {}));
(function (framework) {
    var components;
    (function (components) {
        var input;
        (function (input) {
            class Form extends framework.components.JSContainer {
                constructor(name) {
                    super(name, "form");
                    this.validationerrors = new Object();
                }
                /**
                 *
                 * @return {java.lang.String[]}
                 */
                advancedEventTypes() {
                    return ["beforeValidate", "afterValidate", "beforeSetData", "afterSetData", "beforeGetData", "onError", "afterSetData", "beforeSubmit", "afterSubmit", "submit"];
                }
                isValid() {
                    return Object.keys(this.validationerrors).length <= 0;
                }
                hasErrors() {
                    const keys = Object.keys(this.validationerrors);
                    if (keys != null && keys.length > 0) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                getError(binding) {
                    return this.validationerrors[binding];
                }
                getErrors() {
                    return this.validationerrors;
                }
                getField(binding) {
                    const result = (new Array());
                    framework.components.util.ComponentUtil.visit(this, new Form.Form$0(this, binding, result));
                    if (result.length > 0) {
                        return result[0];
                    }
                    return null;
                }
                validate() {
                    const evt = new CustomEvent("beforeValidate");
                    evt["source"] = this;
                    this.fireListener("beforeValidate", evt);
                    this.validationerrors = new Object();
                    framework.components.util.ComponentUtil.visit(this, new Form.Form$1(this));
                    const evtAfter = new CustomEvent("afterValidate");
                    evtAfter["source"] = this;
                    evtAfter["data"] = this.validationerrors;
                    evtAfter["errors"] = this.validationerrors;
                    evtAfter["hasError"] = Object.keys(this.validationerrors).length > 0;
                    this.fireListener("afterValidate", evtAfter);
                    if (Object.keys(this.validationerrors).length > 0) {
                        const onError = new CustomEvent("onError");
                        onError["source"] = this;
                        onError["data"] = this.validationerrors;
                        onError["errors"] = this.validationerrors;
                        onError["hasError"] = Object.keys(this.validationerrors).length > 0;
                        this.fireListener("onError", onError);
                    }
                    return Object.keys(this.validationerrors).length <= 0;
                }
                setData(data) {
                    const evt = new CustomEvent("beforeSetData");
                    evt["source"] = this;
                    evt["data"] = data;
                    this.fireListener("beforeSetData", evt);
                    framework.components.util.ComponentUtil.visit(this, new Form.Form$2(this, data));
                    const evtAfter = new CustomEvent("afterSetData");
                    evtAfter["source"] = this;
                    evtAfter["data"] = data;
                    this.fireListener("afterSetData", evtAfter);
                }
                getData() {
                    const evt = new CustomEvent("beforeGetData");
                    evt["source"] = this;
                    this.fireListener("beforeGetData", evt);
                    const data = new Object();
                    framework.components.util.ComponentUtil.visit(this, new Form.Form$3(this, data));
                    const evtAfter = new CustomEvent("afterGetData");
                    evtAfter["source"] = this;
                    evtAfter["data"] = data;
                    this.fireListener("afterGetData", evtAfter);
                    return data;
                }
                submit() {
                    const evt = new CustomEvent("beforeSubmit");
                    evt["source"] = this;
                    this.fireListener("beforeSubmit", evt);
                    if (this.validate()) {
                        const data = this.getData();
                        const on = new CustomEvent("submit");
                        on["source"] = this;
                        on["data"] = data;
                        this.fireListener("submit", on);
                    }
                    const evtAfter = new CustomEvent("afterSubmit");
                    evtAfter["source"] = this;
                    this.fireListener("afterSubmit", evtAfter);
                }
            }
            input.Form = Form;
            Form["__class"] = "framework.components.input.Form";
            Form["__interfaces"] = ["framework.components.api.Renderable"];
            (function (Form) {
                class Form$0 {
                    constructor(__parent, binding, result) {
                        this.binding = binding;
                        this.result = result;
                        this.__parent = __parent;
                    }
                    /**
                     *
                     * @param {*} designable
                     */
                    doVisit(designable) {
                        if (designable != null && (designable.constructor != null && designable.constructor["__interfaces"] != null && designable.constructor["__interfaces"].indexOf("framework.components.api.InputField") >= 0)) {
                            try {
                                const b = designable.getBinding();
                                if (b === this.binding) {
                                    this.result.push(designable);
                                }
                            }
                            catch (e) {
                                let binding = designable.getBinding();
                                if (binding == null || binding.trim() === "") {
                                    binding = designable.getName();
                                }
                                this.__parent.validationerrors[binding] = e;
                            }
                        }
                    }
                }
                Form.Form$0 = Form$0;
                Form$0["__interfaces"] = ["framework.components.util.ComponentUtil.ComponentVisitor"];
                class Form$1 {
                    constructor(__parent) {
                        this.__parent = __parent;
                    }
                    /**
                     *
                     * @param {*} designable
                     */
                    doVisit(designable) {
                        if (designable != null && (designable.constructor != null && designable.constructor["__interfaces"] != null && designable.constructor["__interfaces"].indexOf("framework.components.api.InputField") >= 0)) {
                            try {
                                designable.validate();
                            }
                            catch (e) {
                                let binding = designable.getBinding();
                                if (binding == null || binding.trim() === "") {
                                    binding = designable.getName();
                                }
                                this.__parent.validationerrors[binding] = e;
                            }
                        }
                    }
                }
                Form.Form$1 = Form$1;
                Form$1["__interfaces"] = ["framework.components.util.ComponentUtil.ComponentVisitor"];
                class Form$2 {
                    constructor(__parent, data) {
                        this.data = data;
                        this.__parent = __parent;
                    }
                    /**
                     *
                     * @param {*} designable
                     */
                    doVisit(designable) {
                        if (designable != null && (designable.constructor != null && designable.constructor["__interfaces"] != null && designable.constructor["__interfaces"].indexOf("framework.components.api.InputField") >= 0)) {
                            let binding = designable.getBinding();
                            if (binding == null || binding.trim() === "") {
                                binding = designable.getName();
                            }
                            if (framework.components.util.PropertyUtil.hasOwnProperty(this.data, binding)) {
                                const obj = framework.components.util.PropertyUtil.getValue(this.data, binding);
                                if (designable != null && designable instanceof framework.components.input.JSDateInput) {
                                    try {
                                        if (obj != null && obj instanceof Date) {
                                            designable.setValue(obj);
                                        }
                                        else {
                                            const date = new Date(/* parseLong */ parseInt(obj.toString()));
                                            designable.setValue(date);
                                        }
                                    }
                                    catch (e) {
                                        designable.setValue(obj);
                                    }
                                }
                                else {
                                    designable.setValue(obj);
                                }
                            }
                            else {
                                designable.setValue(null);
                            }
                        }
                    }
                }
                Form.Form$2 = Form$2;
                Form$2["__interfaces"] = ["framework.components.util.ComponentUtil.ComponentVisitor"];
                class Form$3 {
                    constructor(__parent, data) {
                        this.data = data;
                        this.__parent = __parent;
                    }
                    /**
                     *
                     * @param {*} designable
                     */
                    doVisit(designable) {
                        if (designable != null && (designable.constructor != null && designable.constructor["__interfaces"] != null && designable.constructor["__interfaces"].indexOf("framework.components.api.InputField") >= 0)) {
                            let binding = designable.getBinding();
                            if (binding == null || binding.trim() === "") {
                                binding = designable.getName();
                            }
                            const value = designable.getValue();
                            framework.components.util.PropertyUtil.setValue(this.data, value, binding);
                        }
                    }
                }
                Form.Form$3 = Form$3;
                Form$3["__interfaces"] = ["framework.components.util.ComponentUtil.ComponentVisitor"];
            })(Form = input.Form || (input.Form = {}));
        })(input = components.input || (components.input = {}));
    })(components = framework.components || (framework.components = {}));
})(framework || (framework = {}));
(function (framework) {
    var components;
    (function (components) {
        var input;
        (function (input) {
            class JSImageInput extends framework.components.JSContainer {
                constructor(name) {
                    super(name, "div");
                    this.image = new framework.components.JSContainer("image", "img");
                    this.upload = new framework.components.JSUpload("upload", framework.components.util.PropertyUtil.REMOTESERVER + "/resources/upload");
                    this.imageContainer = new framework.components.JSContainer("div");
                    this.validators = (new Array());
                    this.setAttribute("identifier", "lgt:image-input");
                    this.addClass("slds-image-input");
                    this.addChild$framework_components_api_Renderable(this.imageContainer);
                    this.imageContainer.addChild$framework_components_api_Renderable(this.image);
                    this.decorateImage();
                    this.addChild$framework_components_api_Renderable(this.upload);
                    this.upload.setVisible(false);
                    this.upload.setStyle("position", "absolute");
                    this.setStyle("position", "relative");
                    this.upload.addEventListener(new JSImageInput.JSImageInput$0(this), "success");
                    this.upload.addEventListener(new JSImageInput.JSImageInput$1(this), "error");
                }
                refreshUploadDir() {
                    let dir = this.getAttribute("uploadDir");
                    const name = this.getName();
                    if (dir == null) {
                        dir = "default";
                    }
                    this.upload.setUrl(framework.components.util.PropertyUtil.REMOTESERVER + "/resources/upload?dir=" + dir + "&name=" + name);
                }
                getImage() {
                    return this.image;
                }
                setRequired(b) {
                    if (b) {
                        this.setAttribute("required", "true");
                    }
                    else
                        this.setAttribute("required", null);
                    return this;
                }
                setDisabled(b) {
                    if (b) {
                        this.setAttribute("disabled", "true");
                    }
                    else {
                        this.setAttribute("disabled", null);
                    }
                    return this;
                }
                setReadOnly(b) {
                    if (b) {
                        this.setAttribute("readonly", "true");
                    }
                    else {
                        this.setAttribute("readonly", null);
                    }
                    return this;
                }
                decorateImage() {
                    this.image.addEventListener(new JSImageInput.JSImageInput$2(this), "click");
                }
                /**
                 *
                 * @return {string}
                 */
                getValue() {
                    return this.image.getAttribute("src");
                }
                setValue$java_lang_String(val) {
                    if (val == null) {
                        this.image.setAttribute("src", this.getAttribute("default"));
                    }
                    else {
                        this.image.setAttribute("src", val);
                    }
                }
                /**
                 *
                 * @param {string} val
                 */
                setValue(val) {
                    if (((typeof val === 'string') || val === null)) {
                        return this.setValue$java_lang_String(val);
                    }
                    else
                        throw new Error('invalid overload');
                }
                /**
                 *
                 */
                validate() {
                    let valid = true;
                    const e = new framework.components.api.ValidationException();
                    for (let index33080 = 0; index33080 < this.validators.length; index33080++) {
                        let v = this.validators[index33080];
                        {
                            const b = v.validate(this);
                            if (!b) {
                                valid = false;
                                framework.components.api.ValidationException.addError(v.getErrorMessage(), framework.components.api.ValidationException.customError, e);
                            }
                        }
                    }
                    const validate = new CustomEvent("validate");
                    validate["errors"] = e.errors;
                    validate["valid"] = valid;
                    validate["source"] = this;
                    this.fireListener("validate", validate);
                    if (!valid) {
                        throw e;
                    }
                }
                /**
                 *
                 * @return {string}
                 */
                getBinding() {
                    return this.getAttribute("binding");
                }
                /**
                 *
                 * @param {string} binding
                 * @return {*}
                 */
                setBinding(binding) {
                    this.setAttribute("binding", binding);
                    return this;
                }
                /**
                 *
                 * @return {java.lang.String[]}
                 */
                advancedEventTypes() {
                    return ["success", "error"];
                }
            }
            input.JSImageInput = JSImageInput;
            JSImageInput["__class"] = "framework.components.input.JSImageInput";
            JSImageInput["__interfaces"] = ["framework.components.api.InputField", "framework.components.api.Renderable"];
            (function (JSImageInput) {
                class JSImageInput$0 {
                    constructor(__parent) {
                        this.__parent = __parent;
                    }
                    /**
                     *
                     * @param {*} source
                     * @param {Event} evt
                     */
                    performAction(source, evt) {
                        if (this.__parent.hasListenerOfType("success")) {
                            this.__parent.fireListener("success", evt);
                        }
                        else {
                            const data = evt["data"];
                            if (data != null && data.hasOwnProperty("url")) {
                                const url = data["url"];
                                this.__parent.setValue(url);
                                this.__parent.render();
                            }
                            else {
                                console.warn("no action taken although upload of image was successfull. You may consider adding a success event to this component");
                            }
                        }
                    }
                }
                JSImageInput.JSImageInput$0 = JSImageInput$0;
                JSImageInput$0["__interfaces"] = ["framework.components.api.EventListener"];
                class JSImageInput$1 {
                    constructor(__parent) {
                        this.__parent = __parent;
                    }
                    /**
                     *
                     * @param {*} source
                     * @param {Event} evt
                     */
                    performAction(source, evt) {
                        this.__parent.fireListener("error", evt);
                    }
                }
                JSImageInput.JSImageInput$1 = JSImageInput$1;
                JSImageInput$1["__interfaces"] = ["framework.components.api.EventListener"];
                class JSImageInput$2 {
                    constructor(__parent) {
                        this.__parent = __parent;
                    }
                    /**
                     *
                     * @param {*} source
                     * @param {Event} evt
                     */
                    performAction(source, evt) {
                        this.__parent.upload.triggerUpload();
                    }
                }
                JSImageInput.JSImageInput$2 = JSImageInput$2;
                JSImageInput$2["__interfaces"] = ["framework.components.api.EventListener"];
            })(JSImageInput = input.JSImageInput || (input.JSImageInput = {}));
        })(input = components.input || (components.input = {}));
    })(components = framework.components || (framework.components = {}));
})(framework || (framework = {}));
(function (framework) {
    var components;
    (function (components) {
        var input;
        (function (input) {
            class JSOption extends framework.components.JSContainer {
                constructor(text, value) {
                    super("option");
                    this.setAttribute("value", value);
                    this.setHtml(text);
                }
                getValue() {
                    return this.getAttribute("value");
                }
                setValue(value) {
                    this.setAttribute("value", value);
                }
                getText() {
                    return this.getHtml();
                }
                setText(label) {
                    this.setHtml(label);
                }
                setSelected(b) {
                    if (b) {
                        this.setAttribute("selected", "true");
                    }
                    else {
                        this.setAttribute("selected", null);
                    }
                }
            }
            input.JSOption = JSOption;
            JSOption["__class"] = "framework.components.input.JSOption";
            JSOption["__interfaces"] = ["framework.components.api.Renderable"];
        })(input = components.input || (components.input = {}));
    })(components = framework.components || (framework.components = {}));
})(framework || (framework = {}));
(function (framework) {
    var components;
    (function (components) {
        var input;
        (function (input) {
            class JSSelect extends framework.components.JSContainer {
                constructor(name) {
                    super(name, "select");
                    if (this.previousValue === undefined) {
                        this.previousValue = null;
                    }
                    this.validators = (new Array());
                    if (this.data === undefined) {
                        this.data = null;
                    }
                    this.setAttribute("identifier", "html:select");
                }
                addValidator(validator) {
                    this.validators.push(validator);
                }
                setOptions$java_lang_String(options) {
                    const opts = options.split("\n");
                    for (let index33081 = 0; index33081 < opts.length; index33081++) {
                        let opt = opts[index33081];
                        {
                            this.addOption$java_lang_String$java_lang_String(opt, opt);
                        }
                    }
                    return this;
                }
                setOptions(options) {
                    if (((typeof options === 'string') || options === null)) {
                        return this.setOptions$java_lang_String(options);
                    }
                    else if (((options != null && options instanceof Array) || options === null)) {
                        return this.setOptions$jsweet_lang_Array(options);
                    }
                    else
                        throw new Error('invalid overload');
                }
                addOption$framework_components_input_JSOption(option) {
                    if (this.data == null) {
                        this.data = (new Array());
                    }
                    if (this.findItem(option.getValue()) == null) {
                        const opt = new Object();
                        opt["text"] = option.getText();
                        opt["value"] = option.getValue();
                        this.data.push(opt);
                        this.addChild$framework_components_api_Renderable(option);
                    }
                    return this;
                }
                addOption$java_lang_String$java_lang_String(text, value) {
                    return this.addOption$framework_components_input_JSOption(new framework.components.input.JSOption(text, value));
                }
                addOption(text, value) {
                    if (((typeof text === 'string') || text === null) && ((typeof value === 'string') || value === null)) {
                        return this.addOption$java_lang_String$java_lang_String(text, value);
                    }
                    else if (((text != null && text instanceof framework.components.input.JSOption) || text === null) && value === undefined) {
                        return this.addOption$framework_components_input_JSOption(text);
                    }
                    else if (((text != null && text instanceof Object) || text === null) && value === undefined) {
                        return this.addOption$jsweet_lang_Object(text);
                    }
                    else
                        throw new Error('invalid overload');
                }
                addOption$jsweet_lang_Object(opt) {
                    let text = opt["text"];
                    text = text + "";
                    let value = opt["value"];
                    value = value + "";
                    return this.addOption$java_lang_String$java_lang_String(text, value);
                }
                /**
                 *
                 * @return {*}
                 */
                clearChildren() {
                    this.data = null;
                    return super.clearChildren();
                }
                clearOptions() {
                    return this.clearChildren();
                }
                setMultiple(b) {
                    if (b) {
                        this.setAttribute("multiple", "true");
                    }
                    else {
                        this.setAttribute("multiple", null);
                    }
                }
                setSize(size) {
                    this.setAttribute("size", size + "");
                }
                setPattern(pattern) {
                    this.setAttribute("pattern", pattern);
                }
                setRequired(b) {
                    if (b) {
                        this.setAttribute("required", "true");
                    }
                    else
                        this.setAttribute("required", null);
                    return this;
                }
                setDisabled(b) {
                    if (b) {
                        this.setAttribute("disabled", "true");
                    }
                    else {
                        this.setAttribute("disabled", null);
                    }
                    return this;
                }
                setReadOnly(b) {
                    if (b) {
                        this.setAttribute("readonly", "true");
                    }
                    else {
                        this.setAttribute("readonly", null);
                    }
                    return this;
                }
                isMultiple() {
                    return "true" === this.getAttribute("multiple");
                }
                /**
                 *
                 * @return {*}
                 */
                getValue() {
                    const ele = this.getNative();
                    if (ele != null) {
                        if (ele.multiple) {
                            const result = (new Array());
                            for (let index33082 = 0; index33082 < ele.children.length; index33082++) {
                                let e = ele.children[index33082];
                                {
                                    const opt = e;
                                    if (opt.selected)
                                        result.push(opt.value);
                                }
                            }
                            return result;
                        }
                        else {
                            return ele.value;
                        }
                    }
                    else {
                        const val = this.getAttribute("value");
                        {
                            let array33084 = this.getChildren();
                            for (let index33083 = 0; index33083 < array33084.length; index33083++) {
                                let opt = array33084[index33083];
                                {
                                    if (opt.getAttribute("value") === val) {
                                        return opt.getValue();
                                    }
                                }
                            }
                        }
                    }
                    return null;
                }
                /**
                 *
                 * @param {*} values
                 */
                setValue(values) {
                    this.previousValue = this.getValue();
                    if (values != null) {
                        const ele = this.getNative();
                        let firstVal = values.toString();
                        let arrVal = (new Array());
                        if (values != null && values instanceof Array) {
                            arrVal = values;
                            if (arrVal.length > 0) {
                                firstVal = arrVal[0];
                            }
                            else {
                                firstVal = "";
                            }
                        }
                        else {
                            arrVal.push(values);
                        }
                        if (ele != null) {
                            ele.value = firstVal;
                        }
                        this.setAttribute("value", firstVal);
                        {
                            let array33086 = this.getChildren();
                            for (let index33085 = 0; index33085 < array33086.length; index33085++) {
                                let opt = array33086[index33085];
                                {
                                    opt.setSelected(false);
                                    for (let index33087 = 0; index33087 < arrVal.length; index33087++) {
                                        let val = arrVal[index33087];
                                        {
                                            if (opt.getAttribute("value") === val) {
                                                opt.setSelected(true);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    else {
                        {
                            let array33089 = this.getChildren();
                            for (let index33088 = 0; index33088 < array33089.length; index33088++) {
                                let opt = array33089[index33088];
                                {
                                    opt.setSelected(false);
                                }
                            }
                        }
                        const ele = this.getNative();
                        if (ele != null) {
                            ele.value = "";
                        }
                        this.setAttribute("value", "");
                    }
                }
                getPreviousValue() {
                    return this.previousValue;
                }
                /**
                 *
                 */
                validate() {
                    let valid = true;
                    const e = new framework.components.api.ValidationException();
                    const nat = this.getNative();
                    if (nat != null) {
                        const el = nat;
                        valid = el.checkValidity();
                        if (!valid) {
                            framework.components.input.AbstractJSInput.addError(el.validationMessage, el.validity, e);
                        }
                    }
                    for (let index33090 = 0; index33090 < this.validators.length; index33090++) {
                        let v = this.validators[index33090];
                        {
                            const b = v.validate(this);
                            if (!b) {
                                valid = false;
                                framework.components.api.ValidationException.addError(v.getErrorMessage(), framework.components.api.ValidationException.customError, e);
                            }
                        }
                    }
                    const validate = new CustomEvent("validate");
                    validate["errors"] = e.errors;
                    validate["valid"] = valid;
                    validate["source"] = this;
                    this.fireListener("validate", validate);
                    if (!valid) {
                        throw e;
                    }
                }
                /**
                 *
                 * @return {java.lang.String[]}
                 */
                advancedEventTypes() {
                    return ["validate"];
                }
                getBinding() {
                    return this.getAttribute("binding");
                }
                setData(data_) {
                    this.clearChildren();
                    this.setRendered(false);
                    for (let index33091 = 0; index33091 < data_.length; index33091++) {
                        let o = data_[index33091];
                        {
                            if (o.hasOwnProperty("value")) {
                                const value = o["value"];
                                const text = o["text"];
                                this.addOption$framework_components_input_JSOption(new framework.components.input.JSOption(text, value));
                            }
                            else {
                                const value = o.toString();
                                const text = o.toString();
                                this.addOption$framework_components_input_JSOption(new framework.components.input.JSOption(text, value));
                            }
                        }
                    }
                }
                setOptions$jsweet_lang_Array(data_) {
                    this.setData(data_);
                }
                getSelectedItems() {
                    const obj = this.getValue();
                    const result = (new Array());
                    if (this.isMultiple()) {
                        {
                            let array33093 = obj;
                            for (let index33092 = 0; index33092 < array33093.length; index33092++) {
                                let o = array33093[index33092];
                                {
                                    const item = this.findItem(o);
                                    if (item != null) {
                                        result.push(item);
                                    }
                                }
                            }
                        }
                    }
                    else {
                        if (obj != null) {
                            const item = this.findItem(obj.toString());
                            if (item != null) {
                                result.push(item);
                            }
                        }
                    }
                    return result;
                }
                getData() {
                    return this.data;
                }
                findItem(value) {
                    if (this.data != null) {
                        for (let index33094 = 0; index33094 < this.data.length; index33094++) {
                            let o = this.data[index33094];
                            {
                                let val = o["value"];
                                val = val + "";
                                const comp = value + "";
                                if (val != null && (val === comp)) {
                                    return o;
                                }
                            }
                        }
                    }
                    return null;
                }
                /**
                 *
                 * @param {string} binding
                 * @return {*}
                 */
                setBinding(binding) {
                    this.setAttribute("binding", binding);
                    return this;
                }
            }
            input.JSSelect = JSSelect;
            JSSelect["__class"] = "framework.components.input.JSSelect";
            JSSelect["__interfaces"] = ["framework.components.api.InputField", "framework.components.api.Renderable"];
        })(input = components.input || (components.input = {}));
    })(components = framework.components || (framework.components = {}));
})(framework || (framework = {}));
(function (framework) {
    var components;
    (function (components) {
        var input;
        (function (input) {
            class JSTextArea extends framework.components.JSContainer {
                constructor(name) {
                    super(name, "textarea");
                    this.validators = (new Array());
                    this.setAttribute("identifier", "html:textarea");
                }
                addValidator(validator) {
                    this.validators.push(validator);
                }
                setRequired(b) {
                    if (b) {
                        this.setAttribute("required", "true");
                    }
                    else
                        this.setAttribute("required", null);
                    return this;
                }
                setDisabled(b) {
                    if (b) {
                        this.setAttribute("disabled", "true");
                    }
                    else {
                        this.setAttribute("disabled", null);
                    }
                    return this;
                }
                /**
                 *
                 * @return {string}
                 */
                getValue() {
                    const elem = this.getNative();
                    if (elem != null) {
                        return elem.value;
                    }
                    return this.getHtml();
                }
                setValue$java_lang_String(val) {
                    const elem = this.getNative();
                    if (elem != null) {
                        elem.value = val;
                    }
                    this.setHtml(val);
                }
                /**
                 *
                 * @param {string} val
                 */
                setValue(val) {
                    if (((typeof val === 'string') || val === null)) {
                        return this.setValue$java_lang_String(val);
                    }
                    else
                        throw new Error('invalid overload');
                }
                /**
                 *
                 */
                validate() {
                    let valid = true;
                    const e = new framework.components.api.ValidationException();
                    const nat = this.getNative();
                    if (nat != null) {
                        const el = nat;
                        valid = el.checkValidity();
                        if (!valid) {
                            framework.components.input.AbstractJSInput.addError(el.validationMessage, el.validity, e);
                        }
                    }
                    for (let index33095 = 0; index33095 < this.validators.length; index33095++) {
                        let v = this.validators[index33095];
                        {
                            const b = v.validate(this);
                            if (!b) {
                                valid = false;
                                framework.components.api.ValidationException.addError(v.getErrorMessage(), framework.components.api.ValidationException.customError, e);
                            }
                        }
                    }
                    const validate = new CustomEvent("validate");
                    validate["errors"] = e.errors;
                    validate["valid"] = valid;
                    validate["source"] = this;
                    this.fireListener("validate", validate);
                    if (!valid) {
                        throw e;
                    }
                }
                /**
                 *
                 * @return {java.lang.String[]}
                 */
                advancedEventTypes() {
                    return ["validate"];
                }
                setReadOnly(b) {
                    if (b) {
                        this.setAttribute("readonly", "true");
                    }
                    else {
                        this.setAttribute("readonly", null);
                    }
                    return this;
                }
                getBinding() {
                    return this.getAttribute("binding");
                }
                /**
                 *
                 * @param {string} binding
                 * @return {*}
                 */
                setBinding(binding) {
                    this.setAttribute("binding", binding);
                    return this;
                }
            }
            input.JSTextArea = JSTextArea;
            JSTextArea["__class"] = "framework.components.input.JSTextArea";
            JSTextArea["__interfaces"] = ["framework.components.api.InputField", "framework.components.api.Renderable"];
        })(input = components.input || (components.input = {}));
    })(components = framework.components || (framework.components = {}));
})(framework || (framework = {}));
(function (framework) {
    var components;
    (function (components) {
        class MonthView extends framework.components.JSContainer {
            constructor(name) {
                super(name, "div");
                this.startDate = new Date();
                this.days = 7;
                this.header = new framework.components.Box("header", 12, 12);
                this.body = new framework.components.MonthViewBody("body");
                this.addClass("MonthView");
                this.addClass("spn-month-view");
                this.addChild$framework_components_api_Renderable(this.header);
                this.header.addClass("spn-month-view-header");
                this.addChild$framework_components_api_Renderable(this.body);
                this.addClass("brd-left");
                this.addClass("brd-top");
            }
            static DAYS_$LI$() { if (MonthView.DAYS == null) {
                MonthView.DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
            } return MonthView.DAYS; }
            getStartDate() {
                return this.startDate;
            }
            setStartDate(startDate) {
                this.startDate = startDate;
            }
            reset() {
                this.fillHeader();
                this.fillBody();
            }
            /*private*/ fillHeader() {
                this.header.clearChildren();
                this.header.setRendered(false);
                for (let i = 0; i < this.days; i++) {
                    {
                        const cell = new framework.components.Box(MonthView.DAYS_$LI$()[i], 1, this.days);
                        cell.addClass("spn-month-view-header-cell");
                        cell.setHtml(MonthView.DAYS_$LI$()[i]);
                        this.header.addChild$framework_components_api_Renderable(cell);
                        cell.addClass("brd-btm");
                        cell.addClass("brd-right");
                    }
                    ;
                }
            }
            /*private*/ fillBody() {
                let firstDate = new Date(this.startDate.getFullYear(), this.startDate.getMonth(), 1, 0, 0);
                let firstDay = this.startDate.getDay();
                if (firstDay === 0) {
                    firstDay = 7;
                }
                firstDate = framework.components.Util.addDays(firstDate, 1 - firstDay);
                const endDate = framework.components.Util.getLastDateOfMonth(this.startDate);
                let lastDate = endDate;
                const lastDay = endDate.getDay();
                if (lastDay === 1) {
                    lastDate = framework.components.Util.addDays(endDate, 6);
                }
                else if (lastDay === 2) {
                    lastDate = framework.components.Util.addDays(endDate, 5);
                }
                if (lastDay > 0)
                    lastDate = framework.components.Util.addDays(endDate, this.days - lastDay);
                let tmp = firstDate;
                let counter = 0;
                while ((true)) {
                    {
                        const c = new framework.components.MonthViewCell("", this.days);
                        c.setStyle("height", MonthView.CELL_HEIGHT + "px");
                        c.setDate(tmp);
                        this.body.addChild$framework_components_api_Renderable(c);
                        if (tmp.getTime() >= lastDate.getTime()) {
                            break;
                        }
                        else {
                            tmp = framework.components.Util.addDays(tmp, 1);
                        }
                        counter++;
                    }
                }
                ;
                const rows = ((counter / this.days | 0)) + 1;
                this.body.setStyle("height", (MonthView.CELL_HEIGHT * rows) + "px");
            }
            addCalEvent(evt) {
                const wk = new framework.components.MonthViewEvent("");
                wk.setValue(evt);
                const startDate = wk.getStartDate();
                const cell = this.getCell(startDate);
                cell.addCalEvent(wk);
            }
            removeCalEvent(uiCalEvt) {
                {
                    let array33097 = this.body.getCells();
                    for (let index33096 = 0; index33096 < array33097.length; index33096++) {
                        let r = array33097[index33096];
                        {
                            r.removeCalEvent(uiCalEvt);
                        }
                    }
                }
            }
            moveCalEvent(uiCalEvent, newEvent) {
                this.removeCalEvent(uiCalEvent);
                this.addCalEvent(newEvent);
            }
            getCell(dt) {
                {
                    let array33099 = this.body.getCells();
                    for (let index33098 = 0; index33098 < array33099.length; index33098++) {
                        let cell = array33099[index33098];
                        {
                            if (cell.isSameDate(dt)) {
                                return cell;
                            }
                        }
                    }
                }
                return null;
            }
        }
        MonthView.CELL_HEIGHT = 100;
        components.MonthView = MonthView;
        MonthView["__class"] = "framework.components.MonthView";
        MonthView["__interfaces"] = ["framework.components.api.Renderable"];
    })(components = framework.components || (framework.components = {}));
})(framework || (framework = {}));
(function (framework) {
    var components;
    (function (components) {
        class MonthViewEvent extends framework.components.JSContainer {
            constructor(name) {
                super(name, "div");
                if (this.value === undefined) {
                    this.value = null;
                }
                this.header = new framework.components.JSContainer("header", "div");
                this.close = new framework.components.JSContainer("close", "div");
                this.title = new framework.components.JSContainer("title", "p");
                this.addClass("spn-month-view-event");
                this.addChild$framework_components_api_Renderable(this.header.addClass("spn-header"));
                this.header.addChild$framework_components_api_Renderable(this.title.addClass("spn-title")).addChild(this.close.addClass("spn-close"));
                this.header.setAttribute("draggable", "true");
                this.header.addEventListener(new MonthViewEvent.MonthViewEvent$0(this), "dragstart");
                this.header.addEventListener(new MonthViewEvent.MonthViewEvent$1(this), "dragend");
                this.close.addEventListener(new MonthViewEvent.MonthViewEvent$2(this), "click");
            }
            reset() {
                const title = this.value["title"];
                const startDate = this.value["startDate"];
                const endDate = this.value["endDate"];
                this.title.setHtml(this.formatDate(startDate) + " - " + title);
            }
            formatDate(dt) {
                return framework.components.Util.formatDate(dt, "hh:mm");
            }
            setValue(value) {
                this.setName(value["title"]);
                this.value = value;
                this.reset();
            }
            getStartDate() {
                return this.value["startDate"];
            }
            getEndDate() {
                return this.value["endDate"];
            }
            /**
             *
             * @param {Date} startDate
             * @return {Object}
             */
            getNewEvent(startDate) {
                const evt = new Object();
                {
                    let array33101 = Object.keys(this.value);
                    for (let index33100 = 0; index33100 < array33101.length; index33100++) {
                        let key = array33101[index33100];
                        {
                            evt[key] = this.value[key];
                            if (key === "startDate") {
                                evt["startDate"] = startDate;
                            }
                            if (key === "endDate") {
                                const ostartDate = this.value["startDate"];
                                const oendDate = this.value["endDate"];
                                const diff = oendDate.getTime() - ostartDate.getTime();
                                const endDate = new Date(startDate.getTime() + diff);
                                evt["endDate"] = endDate;
                            }
                        }
                    }
                }
                return evt;
            }
        }
        components.MonthViewEvent = MonthViewEvent;
        MonthViewEvent["__class"] = "framework.components.MonthViewEvent";
        MonthViewEvent["__interfaces"] = ["framework.components.api.Renderable", "framework.components.ViewEvent"];
        (function (MonthViewEvent) {
            class MonthViewEvent$0 {
                constructor(__parent) {
                    this.__parent = __parent;
                }
                /**
                 *
                 * @param {*} source
                 * @param {Event} evt
                 */
                performAction(source, evt) {
                    const de = evt;
                    de.dataTransfer.setData("text/plain", "move");
                    const el = evt.target;
                    setTimeout((((el) => {
                        return () => {
                            el.parentElement.classList.add("slds-hide");
                        };
                    })(el)), 0);
                    framework.components.WeekViewDndManager.dragging = source.getParent();
                    framework.components.WeekViewDndManager.resizing = null;
                }
            }
            MonthViewEvent.MonthViewEvent$0 = MonthViewEvent$0;
            MonthViewEvent$0["__interfaces"] = ["framework.components.api.EventListener"];
            class MonthViewEvent$1 {
                constructor(__parent) {
                    this.__parent = __parent;
                }
                /**
                 *
                 * @param {*} source
                 * @param {Event} evt
                 */
                performAction(source, evt) {
                    const de = evt;
                    de.dataTransfer.setData("text/plain", "move");
                    const el = evt.target;
                    setTimeout((((el) => {
                        return () => {
                            el.parentElement.classList.remove("slds-hide");
                        };
                    })(el)), 0);
                    framework.components.WeekViewDndManager.dragging = null;
                }
            }
            MonthViewEvent.MonthViewEvent$1 = MonthViewEvent$1;
            MonthViewEvent$1["__interfaces"] = ["framework.components.api.EventListener"];
            class MonthViewEvent$2 {
                constructor(__parent) {
                    this.__parent = __parent;
                }
                /**
                 *
                 * @param {*} source
                 * @param {Event} evt
                 */
                performAction(source, evt) {
                    const wv = (this.__parent.getAncestorWithClass("MonthView"));
                    const ev = (source.getAncestorWithClass("spn-month-view-event"));
                    wv.removeCalEvent(ev);
                }
            }
            MonthViewEvent.MonthViewEvent$2 = MonthViewEvent$2;
            MonthViewEvent$2["__interfaces"] = ["framework.components.api.EventListener"];
        })(MonthViewEvent = components.MonthViewEvent || (components.MonthViewEvent = {}));
    })(components = framework.components || (framework.components = {}));
})(framework || (framework = {}));
(function (framework) {
    var components;
    (function (components) {
        class Row extends framework.components.JSContainer {
            constructor(name) {
                super(name, "div");
                this.addClass("row");
                this.addCSSRule(".row{display:table;padding:10px;width:100%;}");
            }
        }
        components.Row = Row;
        Row["__class"] = "framework.components.Row";
        Row["__interfaces"] = ["framework.components.api.Renderable"];
    })(components = framework.components || (framework.components = {}));
})(framework || (framework = {}));
(function (framework) {
    var components;
    (function (components) {
        class SemaineType extends framework.components.JSContainer {
            constructor() {
                super("semainetype", "div");
                if (this.cmp === undefined) {
                    this.cmp = null;
                }
                if (this.evt === undefined) {
                    this.evt = null;
                }
                if (this.helper === undefined) {
                    this.helper = null;
                }
                this.table = new framework.components.SemaineTypeTable();
                this.addChild$framework_components_api_Renderable(this.table);
                this.addClass("myapp");
            }
            callHelper(method, ...parsm) {
                const fn = this.helper[method];
                const params = (s => { let a = []; while (s-- > 0)
                    a.push(null); return a; })(parsm.length + 1);
                params[0] = this.cmp;
                for (let i = 0; i < parsm.length; i++) {
                    {
                        params[i + 1] = parsm[i];
                    }
                    ;
                }
                fn.call(fn, params);
            }
            setSemaineType(semaineType) {
                super.clearChildren();
                this.addChild$framework_components_api_Renderable(this.table);
                this.setRendered(false);
                const config = semaineType["config"];
                {
                    let array33103 = Object.keys(config);
                    for (let index33102 = 0; index33102 < array33103.length; index33102++) {
                        let day = array33103[index33102];
                        {
                            const plannings = config[day];
                            {
                                let array33105 = Object.keys(plannings);
                                for (let index33104 = 0; index33104 < array33105.length; index33104++) {
                                    let type = array33105[index33104];
                                    {
                                        const plans = plannings[type];
                                        for (let index33106 = 0; index33106 < plans.length; index33106++) {
                                            let plan = plans[index33106];
                                            {
                                                const from = plan["from"];
                                                const to = plan["to"];
                                                let quantity = plan["quantity"];
                                                if (quantity == null) {
                                                    quantity = 1;
                                                }
                                                this.addItem(from, to, type, day, quantity);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                this.addEventListener(new SemaineType.SemaineType$0(this), "click");
            }
            addItem(from, to, type, day, quantity) {
                const token = new framework.components.Token(from, to, day, type, quantity);
                token.processWith(this.table);
                this.addChild$framework_components_api_Renderable(token);
            }
        }
        components.SemaineType = SemaineType;
        SemaineType["__class"] = "framework.components.SemaineType";
        SemaineType["__interfaces"] = ["framework.components.api.Renderable"];
        (function (SemaineType) {
            class SemaineType$0 {
                constructor(__parent) {
                    this.__parent = __parent;
                }
                /**
                 *
                 * @param {*} source
                 * @param {Event} evt
                 */
                performAction(source, evt) {
                }
            }
            SemaineType.SemaineType$0 = SemaineType$0;
            SemaineType$0["__interfaces"] = ["framework.components.api.EventListener"];
        })(SemaineType = components.SemaineType || (components.SemaineType = {}));
    })(components = framework.components || (framework.components = {}));
})(framework || (framework = {}));
(function (framework) {
    var components;
    (function (components) {
        class SemaineTypeCell extends framework.components.JSContainer {
            constructor(day, hour, minute) {
                super(day, "td");
                if (this.hour === undefined) {
                    this.hour = 0;
                }
                if (this.minute === undefined) {
                    this.minute = 0;
                }
                if (this.day === undefined) {
                    this.day = null;
                }
                this.hour = hour;
                this.minute = minute;
                this.day = day;
                this.addClass("cell");
                this.setStyle("cursor", "pointer");
                this.setStyle("padding", "0");
                this.addEventListener(new SemaineTypeCell.SemaineTypeCell$0(this, hour, minute, day), "click");
            }
            getHour() {
                return this.hour;
            }
            getMinute() {
                return this.minute;
            }
            getDay() {
                return this.day;
            }
        }
        components.SemaineTypeCell = SemaineTypeCell;
        SemaineTypeCell["__class"] = "framework.components.SemaineTypeCell";
        SemaineTypeCell["__interfaces"] = ["framework.components.api.Renderable"];
        (function (SemaineTypeCell) {
            class SemaineTypeCell$0 {
                constructor(__parent, hour, minute, day) {
                    this.hour = hour;
                    this.minute = minute;
                    this.day = day;
                    this.__parent = __parent;
                }
                /**
                 *
                 * @param {*} source
                 * @param {Event} evt
                 */
                performAction(source, evt) {
                    const sm = (source.getAncestorWithClass("myapp"));
                    const params = new Object();
                    const time = framework.components.Util.getTime(this.hour, this.minute);
                    params["time"] = time;
                    params["day"] = this.day;
                    sm.callHelper("handleCreate", params);
                }
            }
            SemaineTypeCell.SemaineTypeCell$0 = SemaineTypeCell$0;
            SemaineTypeCell$0["__interfaces"] = ["framework.components.api.EventListener"];
        })(SemaineTypeCell = components.SemaineTypeCell || (components.SemaineTypeCell = {}));
    })(components = framework.components || (framework.components = {}));
})(framework || (framework = {}));
(function (framework) {
    var components;
    (function (components) {
        class SemaineTypeRow extends framework.components.JSContainer {
            constructor(hour, minute) {
                super(framework.components.Util.getTime(hour, minute), "tr");
                if (this.hour === undefined) {
                    this.hour = 0;
                }
                if (this.minute === undefined) {
                    this.minute = 0;
                }
                this.hour = hour;
                this.minute = minute;
                const head = new framework.components.JSContainer("td");
                head.setHtml(minute === 0 ? framework.components.Util.getTime(hour, minute) : "");
                this.addChild$framework_components_api_Renderable(head);
                for (let index33107 = 0; index33107 < framework.components.Util.DAYS_$LI$().length; index33107++) {
                    let day = framework.components.Util.DAYS_$LI$()[index33107];
                    {
                        const cell = new framework.components.SemaineTypeCell(day, hour, minute);
                        this.addChild$framework_components_api_Renderable(cell);
                    }
                }
            }
            getHour() {
                return this.hour;
            }
            getMinute() {
                return this.minute;
            }
        }
        components.SemaineTypeRow = SemaineTypeRow;
        SemaineTypeRow["__class"] = "framework.components.SemaineTypeRow";
        SemaineTypeRow["__interfaces"] = ["framework.components.api.Renderable"];
    })(components = framework.components || (framework.components = {}));
})(framework || (framework = {}));
(function (framework) {
    var components;
    (function (components) {
        class SemaineTypeTable extends framework.components.JSContainer {
            constructor() {
                super("table");
                this.thead = new framework.components.JSContainer("head", "thead");
                this.tbody = new framework.components.JSContainer("tbody", "tbody");
                this.addClass("slds-table slds-table_cell-buffer slds-table_bordered slds-table_striped slds-table_col-bordered");
                this.initHeader();
                this.initBody();
            }
            getColWidth() {
                const elem = this.tbody.getChildren()[0].getChildren()[1].getNative();
                return elem.offsetWidth;
            }
            getGutterWitdh() {
                const elem = this.tbody.getChildren()[0].getChildren()[0].getNative();
                return elem.offsetWidth;
            }
            /*private*/ initHeader() {
                const tr = new framework.components.JSContainer("tr", "tr");
                const root = new framework.components.JSContainer("td").setStyle("width", "4%");
                tr.addChild$framework_components_api_Renderable(root);
                this.thead.addChild$framework_components_api_Renderable(tr);
                this.addChild$framework_components_api_Renderable(this.thead);
                for (let index33108 = 0; index33108 < framework.components.Util.DAYS_$LI$().length; index33108++) {
                    let day = framework.components.Util.DAYS_$LI$()[index33108];
                    {
                        const td = new framework.components.JSContainer(day, "td").setStyle("width", "16%");
                        tr.addChild$framework_components_api_Renderable(td);
                        td.setHtml(day);
                    }
                }
            }
            /*private*/ initBody() {
                this.addChild$framework_components_api_Renderable(this.tbody);
                for (let i = framework.components.Util.MIN_HOUR; i <= framework.components.Util.MAX_HOUR; i++) {
                    {
                        const row0 = new framework.components.SemaineTypeRow(i, 0);
                        const row30 = new framework.components.SemaineTypeRow(i, 30);
                        this.tbody.addChild$framework_components_api_Renderable(row0);
                        this.tbody.addChild$framework_components_api_Renderable(row30);
                    }
                    ;
                }
            }
        }
        components.SemaineTypeTable = SemaineTypeTable;
        SemaineTypeTable["__class"] = "framework.components.SemaineTypeTable";
        SemaineTypeTable["__interfaces"] = ["framework.components.api.Renderable"];
    })(components = framework.components || (framework.components = {}));
})(framework || (framework = {}));
(function (framework) {
    var components;
    (function (components) {
        var table;
        (function (table) {
            class Table extends framework.components.JSContainer {
                constructor(name) {
                    super(name, "table");
                    this.head = new framework.components.JSContainer("head", "thead");
                    this.body = new framework.components.JSContainer("body", "tbody");
                    if (this.dataModel === undefined) {
                        this.dataModel = null;
                    }
                    if (this.columnModel === undefined) {
                        this.columnModel = null;
                    }
                    this.addChild$framework_components_api_Renderable(this.head);
                    this.addChild$framework_components_api_Renderable(this.body);
                }
                getHead() {
                    return this.head;
                }
                getBody() {
                    return this.body;
                }
                getDataModel() {
                    return this.dataModel;
                }
                setDataModel(dataModel) {
                    this.dataModel = dataModel;
                }
                getColumnModel() {
                    return this.columnModel;
                }
                setColumnModel(columnModel) {
                    this.columnModel = columnModel;
                }
                refresh() {
                    this.head.clearChildren();
                    this.body.clearChildren();
                    if (this.columnModel != null) {
                        const hrow = new framework.components.JSContainer("headerRow", "tr");
                        this.head.addChild$framework_components_api_Renderable(hrow);
                        for (let i = 0; i < this.columnModel.getColumnCount(); i++) {
                            {
                                const column = this.columnModel.getColumn(i);
                                const headerRenderer = column.getHeaderRenderer();
                                const th = new framework.components.JSContainer("", "th").setAttribute("scope", "col");
                                th.setStyle("width", column.getWidth() + "px");
                                th.setStyle("max-width", column.getMaxWidth() + "px");
                                th.setStyle("min-width", column.getMinWidth() + "px");
                                hrow.addChild$framework_components_api_Renderable(th);
                                headerRenderer.renderComponent(this, th, column.getHeaderValue(), false, false, 0, i);
                            }
                            ;
                        }
                    }
                    if (this.dataModel != null) {
                        for (let row = 0; row < this.dataModel.getRowCount(); row++) {
                            {
                                const r = new framework.components.JSContainer("", "tr");
                                this.body.addChild$framework_components_api_Renderable(r);
                                for (let col = 0; col < this.dataModel.getColumnCount(); col++) {
                                    {
                                        const cell = new framework.components.JSContainer("", "td");
                                        r.addChild$framework_components_api_Renderable(cell);
                                        const val = this.dataModel.getValueAt(row, col);
                                        if (this.columnModel != null) {
                                            const column = this.columnModel.getColumn(col);
                                            column.getCellRenderer().renderComponent(this, cell, val, false, false, row, col);
                                        }
                                        else {
                                            cell.setHtml(val != null ? val.toString() : "");
                                        }
                                    }
                                    ;
                                }
                            }
                            ;
                        }
                    }
                }
            }
            table.Table = Table;
            Table["__class"] = "framework.components.table.Table";
            Table["__interfaces"] = ["framework.components.api.Renderable"];
        })(table = components.table || (components.table = {}));
    })(components = framework.components || (framework.components = {}));
})(framework || (framework = {}));
(function (framework) {
    var components;
    (function (components) {
        class Token extends framework.components.JSContainer {
            constructor(from, to, day, type, quantity) {
                super("div");
                if (this.from === undefined) {
                    this.from = null;
                }
                if (this.to === undefined) {
                    this.to = null;
                }
                if (this.day === undefined) {
                    this.day = null;
                }
                if (this.type === undefined) {
                    this.type = null;
                }
                if (this.quantity === undefined) {
                    this.quantity = null;
                }
                this.from = from;
                this.to = to;
                this.day = day;
                this.type = type;
                this.quantity = quantity;
                this.addClass("token");
                this.addEventListener(new Token.Token$0(this, from, to, day, type, quantity), "click");
                let html = type === "abs" ? "Absence" : "Disponibilit\u00e9";
                html = html + " de " + from + " \u00e0" + to;
                this.setHtml(html);
                this.setStyle("text-align", "center");
                this.setAttribute("title", html);
                if (type === "abs") {
                    this.setStyle("color", "white");
                }
                this.setStyle("padding-top", "8px");
            }
            getFrom() {
                return this.from;
            }
            getTo() {
                return this.to;
            }
            getDay() {
                return this.day;
            }
            getType() {
                return this.type;
            }
            processWith(table) {
                const colWidth = table.getColWidth();
                const steps = Math.floor((colWidth - 80) / 16);
                const offset = Math.ceil(Math.random() * steps) * 16;
                const rows = framework.components.Util.countRows(this.from, this.to);
                this.setStyle("width", "80px");
                const height = rows * framework.components.Util.ROW_HEIGHT_PX;
                this.setStyle("height", height + "px");
                this.addClass("type_" + this.type);
                const top = framework.components.Util.countStartRowPosition(this.from);
                this.setStyle("top", top + "px");
                const left = framework.components.Util.countStartColPosition(this.day, table.getGutterWitdh(), table.getColWidth());
                this.setStyle("left", (left + offset) + "px");
            }
        }
        components.Token = Token;
        Token["__class"] = "framework.components.Token";
        Token["__interfaces"] = ["framework.components.api.Renderable"];
        (function (Token) {
            class Token$0 {
                constructor(__parent, from, to, day, type, quantity) {
                    this.from = from;
                    this.to = to;
                    this.day = day;
                    this.type = type;
                    this.quantity = quantity;
                    this.__parent = __parent;
                }
                /**
                 *
                 * @param {*} source
                 * @param {Event} evt
                 */
                performAction(source, evt) {
                    const sm = (source.getAncestorWithClass("myapp"));
                    const params = new Object();
                    params["from"] = this.from;
                    params["to"] = this.to;
                    params["day"] = this.day;
                    params["type"] = this.type;
                    params["quantity"] = this.quantity;
                    sm.callHelper("handleEdit", params);
                }
            }
            Token.Token$0 = Token$0;
            Token$0["__interfaces"] = ["framework.components.api.EventListener"];
        })(Token = components.Token || (components.Token = {}));
    })(components = framework.components || (framework.components = {}));
})(framework || (framework = {}));
(function (framework) {
    var components;
    (function (components) {
        class WeekView extends framework.components.JSContainer {
            constructor(name) {
                super(name, "div");
                this.startDate = new Date();
                this.days = 1;
                this.startHour = 0;
                this.endHour = 23;
                this.header = new framework.components.Box("header", 12, 12);
                this.headerLeftGutter = new framework.components.Box("headerLeftGutter", 1, 12);
                this.headerRightBody = new framework.components.Box("headerRightBody", 11, 12);
                this.body = new framework.components.Box("body", 12, 12);
                this.bodyLeftGutter = new framework.components.Box("bodyLeftGutter", 1, 12);
                this.bodyRightBody = new framework.components.WeekViewBody("bodyRightBody");
                this.addClass("slds-grid slds-wrap spn-week-view brd-top brd-left WeekView");
                this.header.addClass("spn-header brd-btm");
                this.body.addClass("spn-body");
                this.addChild$framework_components_api_Renderable(this.header);
                this.addChild$framework_components_api_Renderable(this.body);
                this.headerLeftGutter.addClass("spn-header-left-gutter");
                this.header.addChild$framework_components_api_Renderable(this.headerLeftGutter);
                this.headerRightBody.addClass("spn-header-right-body");
                this.header.addChild$framework_components_api_Renderable(this.headerRightBody);
                this.bodyLeftGutter.addClass("spn-body-left-gutter brd-right");
                this.body.addChild$framework_components_api_Renderable(this.bodyLeftGutter);
                this.body.addChild$framework_components_api_Renderable(this.bodyRightBody);
                this.body.setStyle("height", "729px");
                this.body.setStyle("overflow", "auto");
            }
            reset() {
                this.fillAll();
            }
            fillAll() {
                this.fillLeftGutter();
                this.fillRightBody();
            }
            /*private*/ formatDate(date) {
                const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
                const day = date.getDay();
                const iDate = date.getDate();
                const month = date.getMonth() + 1;
                const sDate = iDate < 10 ? "0" + iDate : iDate + "";
                const sMonth = month < 10 ? "0" + month : month + "";
                return days[(day | 0)] + " " + sDate + "/" + sMonth;
            }
            fillLeftGutter() {
                this.headerLeftGutter.clearChildren();
                this.headerLeftGutter.setRendered(false);
                const hgut = new framework.components.JSContainer("div");
                hgut.addClass("slds-col slds-size_1-of-1");
                hgut.addClass("spn-header-left-gutter-cell");
                this.bodyLeftGutter.clearChildren();
                this.bodyLeftGutter.setRendered(false);
                for (let i = this.startHour; i <= this.endHour; i++) {
                    {
                        const gut = new framework.components.Box("gut", 1, 1);
                        gut.addClass("spn-body-left-gutter-cell");
                        this.bodyLeftGutter.addChild$framework_components_api_Renderable(gut);
                        const fullHr = new framework.components.Col("fullHr", 1, 1);
                        fullHr.addClass("brd-btm");
                        fullHr.setStyle("height", WeekView.CELL_HEIGHT + "px");
                        fullHr.setHtml(i + ":00");
                        gut.addChild$framework_components_api_Renderable(fullHr);
                        const halfHr = new framework.components.Col("halfHr", 1, 1);
                        halfHr.addClass("brd-btm");
                        halfHr.setStyle("height", WeekView.CELL_HEIGHT + "px");
                        gut.addChild$framework_components_api_Renderable(halfHr);
                    }
                    ;
                }
            }
            fillRightBody() {
                this.startDate.setHours(0, 0, 0, 0);
                const day = this.startDate.getDay();
                if (day > 0) {
                    const toRemove = 1000 * 60 * 60 * 24 * (day - 1);
                    this.startDate = new Date(this.startDate.getTime() - toRemove);
                }
                else {
                    const toRemove = 1000 * 60 * 60 * 24 * 6;
                    this.startDate = new Date(this.startDate.getTime() - toRemove);
                }
                this.headerRightBody.clearChildren();
                this.headerRightBody.setRendered(false);
                this.bodyRightBody.clearChildren();
                this.bodyRightBody.setRendered(false);
                for (let d = 0; d < this.days; d++) {
                    {
                        const aDay = 1000 * 60 * 60 * 24 * d;
                        const dt = new Date(this.startDate.getTime() + aDay);
                        const headerRightBodyCell = new framework.components.Col("div", 1, this.days);
                        headerRightBodyCell.addClass("spn-header-right-body-cell brd-right");
                        headerRightBodyCell.setHtml(this.formatDate(dt));
                        this.headerRightBody.addChild$framework_components_api_Renderable(headerRightBodyCell.setStyle("height", WeekView.CELL_HEIGHT + "px"));
                    }
                    ;
                }
                for (let h = this.startHour; h <= this.endHour; h++) {
                    {
                        for (let d = 0; d < this.days; d++) {
                            {
                                const aDay = 1000 * 60 * 60 * 24 * d;
                                const dt = new Date(this.startDate.getTime() + aDay);
                                const bodyRightBodyCell = new framework.components.WeekViewDateCell(dt, h, this.days);
                                this.bodyRightBody.addChild$framework_components_api_Renderable(bodyRightBodyCell);
                            }
                            ;
                        }
                    }
                    ;
                }
            }
            setStartDate(date) {
                this.startDate = date;
            }
            setTimeRange(startHour, endHour) {
                this.startHour = startHour;
                this.endHour = endHour;
            }
            removeCalEvent(uiCalEvt) {
                {
                    let array33110 = this.bodyRightBody.getCells();
                    for (let index33109 = 0; index33109 < array33110.length; index33109++) {
                        let r = array33110[index33109];
                        {
                            r.removeCalEvent(uiCalEvt);
                        }
                    }
                }
                this.adjustEventWidth();
            }
            adjustEventWidth() {
                const multiHold = (new Array());
                {
                    let array33112 = this.bodyRightBody.getCells();
                    for (let index33111 = 0; index33111 < array33112.length; index33111++) {
                        let dcell = array33112[index33111];
                        {
                            {
                                let array33114 = dcell.getCells();
                                for (let index33113 = 0; index33113 < array33114.length; index33113++) {
                                    let cell = array33114[index33113];
                                    {
                                        const holding = cell.getHolding();
                                        const size = holding.length;
                                        if (size > 0) {
                                            multiHold.push(cell);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                const sorted = multiHold.sort((a, b) => {
                    return (b.getHolding().length - a.getHolding().length);
                });
                const done = new Object();
                for (let index33115 = 0; index33115 < sorted.length; index33115++) {
                    let cell = sorted[index33115];
                    {
                        const hds = cell.getHolding();
                        const size = hds.length;
                        console.info("size::" + size);
                        for (let index33116 = 0; index33116 < hds.length; index33116++) {
                            let ev = hds[index33116];
                            {
                                if (!done.hasOwnProperty(ev.getId())) {
                                    done[ev.getId()] = ev;
                                    if (size === 1) {
                                        ev.setStyle("width", "90%");
                                    }
                                    else {
                                        ev.setStyle("width", (100 / size) + "%");
                                    }
                                    ev.setStyle("left", (90 / size) * hds.indexOf(ev) + "%");
                                }
                            }
                        }
                    }
                }
            }
            addCalEvent(evt) {
                const wk = new framework.components.WeekViewEvent("");
                wk.setValue(evt);
                const startDate = wk.getStartDate();
                const endDate = wk.getEndDate();
                const cell = this.getDateCell(startDate);
                cell.addCalEvent(wk);
                const startHr = startDate.getHours();
                const startMin = startDate.getMinutes();
                const endHr = endDate.getHours();
                const endMin = endDate.getMinutes();
                let counter = 0;
                for (let i = startHr; i < endHr; i++) {
                    {
                        counter++;
                        const tmpDate = framework.components.Util.addHour(startDate, counter);
                        const hcell = this.getDateCell(tmpDate);
                        hcell.holdHr(wk);
                        if (i < endHr - 1) {
                            hcell.holdHalfHr(wk);
                        }
                        else {
                            if (endMin > 0) {
                                hcell.holdHalfHr(wk);
                            }
                        }
                    }
                    ;
                }
                this.adjustEventWidth();
            }
            unHoldEvent(uiCalEvt) {
                this.bodyRightBody.unholdEvent(uiCalEvt);
            }
            adjustHolding(uiCalEvt) {
                this.unHoldEvent(uiCalEvt);
                const cells = this.getCellsForDateRange(uiCalEvt.getStartDate(), uiCalEvt.getEndDate());
                for (let index33117 = 0; index33117 < cells.length; index33117++) {
                    let cell = cells[index33117];
                    {
                        cell.hold(uiCalEvt);
                    }
                }
            }
            moveCalEvent(uiCalEvt, newEvt) {
                this.removeCalEvent(uiCalEvt);
                this.addCalEvent(newEvt);
            }
            getCellsForDateRange(startDate, endDate) {
                const result = (new Array());
                const startHr = startDate.getHours();
                const startMins = startDate.getMinutes();
                const endHr = endDate.getHours();
                const endMins = endDate.getMinutes();
                for (let i = startHr; i <= endHr; i++) {
                    {
                        const tmp = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), i, 0);
                        const cell = this.getDateCell(tmp);
                        if (i === startHr && startMins === 0) {
                            result.push(cell.getCellHr());
                            result.push(cell.getCellHalfHr());
                        }
                        else if (i === startHr && startMins > 0) {
                            result.push(cell.getCellHalfHr());
                        }
                        else if (i === endHr && endMins > 0) {
                            result.push(cell.getCellHr());
                            result.push(cell.getCellHalfHr());
                        }
                        else if (i === endHr && endMins === 0) {
                            result.push(cell.getCellHr());
                        }
                        else {
                            result.push(cell.getCellHr());
                            result.push(cell.getCellHalfHr());
                        }
                    }
                    ;
                }
                return result;
            }
            getDateCell(date) {
                const hr = date.getHours();
                {
                    let array33119 = this.bodyRightBody.getCells();
                    for (let index33118 = 0; index33118 < array33119.length; index33118++) {
                        let cell = array33119[index33118];
                        {
                            if (framework.components.Util.isSameDate(cell.getDate(), date)) {
                                if (cell.getHour() === hr)
                                    return cell;
                            }
                        }
                    }
                }
                return null;
            }
        }
        WeekView.CELL_HEIGHT = 22;
        components.WeekView = WeekView;
        WeekView["__class"] = "framework.components.WeekView";
        WeekView["__interfaces"] = ["framework.components.api.Renderable"];
    })(components = framework.components || (framework.components = {}));
})(framework || (framework = {}));
(function (framework) {
    var components;
    (function (components) {
        class WeekViewEvent extends framework.components.JSContainer {
            constructor(name) {
                super(name, "div");
                if (this.value === undefined) {
                    this.value = null;
                }
                this.header = new framework.components.JSContainer("header", "div");
                this.body = new framework.components.JSContainer("body", "div");
                this.footer = new framework.components.JSContainer("footer", "div");
                this.title = new framework.components.JSContainer("title", "p");
                this.time = new framework.components.JSContainer("time", "span");
                this.description = new framework.components.JSContainer("description", "p");
                this.resizer = new framework.components.JSContainer("resizer", "div");
                this.close = new framework.components.JSContainer("close", "div");
                this.heldBy = (new Array());
                if (this.startY === undefined) {
                    this.startY = 0;
                }
                if (this.startHeight === undefined) {
                    this.startHeight = 0;
                }
                if (this.newHeight === undefined) {
                    this.newHeight = 0;
                }
                this.resizing = false;
                this.p = null;
                this.doDrag = (e) => {
                    this.p.classList.add("spn-resizing");
                    this.resizing = true;
                    this.p.style.height = (this.startHeight + e.clientY - this.startY) + "px";
                    this.newHeight = (this.startHeight + e.clientY - this.startY);
                };
                this.stopDrag = (e) => {
                    if (this.resizing) {
                        this.resizing = false;
                        this.updateEndDate();
                        this.p.classList.remove("spn-resizing");
                        document.documentElement.removeEventListener("mousemove", (((funcInst) => { if (typeof funcInst == 'function') {
                            return funcInst;
                        } return (arg0) => (funcInst['apply'] ? funcInst['apply'] : funcInst).call(funcInst, arg0); })(this.doDrag)), false);
                        this.render$();
                    }
                };
                this.addClass("spn-week-view-event");
                this.addChild$framework_components_api_Renderable(this.header.addClass("spn-header"));
                this.addChild$framework_components_api_Renderable(this.body.addClass("spn-body"));
                this.addChild$framework_components_api_Renderable(this.footer.addClass("spn-footer"));
                this.header.addChild$framework_components_api_Renderable(this.time.addClass("spn-time")).addChild(this.close.addClass("spn-close"));
                this.body.addChild$framework_components_api_Renderable(this.title.addClass("spn-title")).addChild(this.description.addClass("spn-description"));
                this.footer.addChild$framework_components_api_Renderable(this.resizer.addClass("spn-resizer"));
                this.header.setAttribute("draggable", "true");
                this.header.addEventListener(new WeekViewEvent.WeekViewEvent$0(this), "dragstart");
                this.header.addEventListener(new WeekViewEvent.WeekViewEvent$1(this), "dragend");
                this.resizer.addEventListener(new WeekViewEvent.WeekViewEvent$2(this), "mouseenter");
                this.close.addEventListener(new WeekViewEvent.WeekViewEvent$3(this), "click");
            }
            reset() {
                const title = this.value["title"];
                const description = this.value["description"];
                const startDate = this.value["startDate"];
                const endDate = this.value["endDate"];
                this.title.setHtml(title);
                this.description.setHtml(description);
                this.time.setHtml(this.formatDate(startDate) + " - " + this.formatDate(endDate));
                const startHr = startDate.getHours();
                const startMin = startDate.getMinutes();
                const endHr = endDate.getHours();
                const endMin = endDate.getMinutes();
                let diffHr = (endHr - startHr) * 2;
                if (startMin > 0) {
                    diffHr = diffHr - 1;
                }
                if (endMin > 0) {
                    diffHr = diffHr + 1;
                }
                this.setStyle("height", diffHr * framework.components.WeekView.CELL_HEIGHT + "px");
            }
            getGhost() {
                const g = new framework.components.JSContainer("div");
                g.setStyle("border", "dotted 1px red");
                g.setStyle("height", this.getNative().style.height);
                g.setStyle("width", this.getNative().offsetWidth + "px");
                return g;
            }
            getStartDate() {
                return this.value["startDate"];
            }
            getEndDate() {
                return this.value["endDate"];
            }
            getEventDurationMS() {
                const startDate = this.getStartDate();
                const endDate = this.getEndDate();
                return (endDate.getTime() - startDate.getTime());
            }
            isHeldBy(cell) {
                for (let index33120 = 0; index33120 < this.heldBy.length; index33120++) {
                    let c = this.heldBy[index33120];
                    {
                        if (c.getId() === cell.getId()) {
                            return true;
                        }
                    }
                }
                return false;
            }
            addHeldBy(cell) {
                if (!this.isHeldBy(cell)) {
                    this.heldBy.push(cell);
                }
            }
            formatDate(dt) {
                const hr = dt.getHours();
                const mins = dt.getMinutes();
                return (hr < 10 ? "0" + hr : hr + "") + ":" + (mins < 10 ? "0" + mins : mins);
            }
            setValue(value) {
                this.setName(value["title"]);
                this.value = value;
                this.reset();
            }
            getValue() {
                return this.value;
            }
            removeFromCell() {
                const cell = (this.getAncestorWithClass("spn-week-view-cell"));
                cell.removeCalEvent(this);
                this.heldBy = (new Array());
            }
            getNewEvent(startDate) {
                const evt = new Object();
                {
                    let array33122 = Object.keys(this.value);
                    for (let index33121 = 0; index33121 < array33122.length; index33121++) {
                        let key = array33122[index33121];
                        {
                            evt[key] = this.value[key];
                            if (key === "startDate") {
                                evt["startDate"] = startDate;
                            }
                            if (key === "endDate") {
                                const ostartDate = this.value["startDate"];
                                const oendDate = this.value["endDate"];
                                const diff = oendDate.getTime() - ostartDate.getTime();
                                const endDate = new Date(startDate.getTime() + diff);
                                evt["endDate"] = endDate;
                            }
                        }
                    }
                }
                return evt;
            }
            updateEndDate() {
                const remainder = this.newHeight % framework.components.WeekView.CELL_HEIGHT;
                let segments = (this.newHeight - remainder) / framework.components.WeekView.CELL_HEIGHT;
                if (remainder > 0) {
                    segments = segments + 1;
                }
                const ms = 30 * 60 * 1000 * segments;
                const endDate = new Date(this.getStartDate().getTime() + ms);
                this.value["endDate"] = endDate;
                this.setStyle("height", segments * framework.components.WeekView.CELL_HEIGHT + "px");
                this.getNative().style.height = this.getStyle("height");
                this.time.setHtml(this.formatDate(this.getStartDate()) + " - " + this.formatDate(this.getEndDate()));
                const wj = (this.getAncestorWithClass("WeekView"));
                wj.adjustHolding(this);
                wj.adjustEventWidth();
            }
        }
        components.WeekViewEvent = WeekViewEvent;
        WeekViewEvent["__class"] = "framework.components.WeekViewEvent";
        WeekViewEvent["__interfaces"] = ["framework.components.api.Renderable", "framework.components.ViewEvent"];
        (function (WeekViewEvent) {
            class WeekViewEvent$0 {
                constructor(__parent) {
                    this.__parent = __parent;
                }
                /**
                 *
                 * @param {*} source
                 * @param {Event} evt
                 */
                performAction(source, evt) {
                    const de = evt;
                    de.dataTransfer.setData("text/plain", "move");
                    const el = evt.target;
                    setTimeout((((el) => {
                        return () => {
                            el.parentElement.classList.add("slds-hide");
                        };
                    })(el)), 0);
                    framework.components.WeekViewDndManager.dragging = source.getParent();
                    framework.components.WeekViewDndManager.resizing = null;
                }
            }
            WeekViewEvent.WeekViewEvent$0 = WeekViewEvent$0;
            WeekViewEvent$0["__interfaces"] = ["framework.components.api.EventListener"];
            class WeekViewEvent$1 {
                constructor(__parent) {
                    this.__parent = __parent;
                }
                /**
                 *
                 * @param {*} source
                 * @param {Event} evt
                 */
                performAction(source, evt) {
                    const de = evt;
                    de.dataTransfer.setData("text/plain", "move");
                    const el = evt.target;
                    setTimeout((((el) => {
                        return () => {
                            el.parentElement.classList.remove("slds-hide");
                        };
                    })(el)), 0);
                    framework.components.WeekViewDndManager.dragging = null;
                }
            }
            WeekViewEvent.WeekViewEvent$1 = WeekViewEvent$1;
            WeekViewEvent$1["__interfaces"] = ["framework.components.api.EventListener"];
            class WeekViewEvent$2 {
                constructor(__parent) {
                    this.__parent = __parent;
                }
                /**
                 *
                 * @param {*} source
                 * @param {Event} evt
                 */
                performAction(source, evt) {
                    const me = evt;
                    this.__parent.startY = me.clientY;
                    this.__parent.p = this.__parent.getNative();
                    this.__parent.startHeight = parseInt(document.defaultView.getComputedStyle(this.__parent.p).height, 10);
                    this.__parent.resizer.getNative().addEventListener("mousedown", (e) => {
                        document.documentElement.addEventListener("mousemove", (((funcInst) => { if (typeof funcInst == 'function') {
                            return funcInst;
                        } return (arg0) => (funcInst['apply'] ? funcInst['apply'] : funcInst).call(funcInst, arg0); })(this.__parent.doDrag)), false);
                        document.documentElement.addEventListener("mouseup", (((funcInst) => { if (typeof funcInst == 'function') {
                            return funcInst;
                        } return (arg0) => (funcInst['apply'] ? funcInst['apply'] : funcInst).call(funcInst, arg0); })(this.__parent.stopDrag)), false);
                        return true;
                    }, false);
                }
            }
            WeekViewEvent.WeekViewEvent$2 = WeekViewEvent$2;
            WeekViewEvent$2["__interfaces"] = ["framework.components.api.EventListener"];
            class WeekViewEvent$3 {
                constructor(__parent) {
                    this.__parent = __parent;
                }
                /**
                 *
                 * @param {*} source
                 * @param {Event} evt
                 */
                performAction(source, evt) {
                    const wv = (this.__parent.getAncestorWithClass("WeekView"));
                    const ev = (source.getAncestorWithClass("spn-week-view-event"));
                    wv.removeCalEvent(ev);
                }
            }
            WeekViewEvent.WeekViewEvent$3 = WeekViewEvent$3;
            WeekViewEvent$3["__interfaces"] = ["framework.components.api.EventListener"];
        })(WeekViewEvent = components.WeekViewEvent || (components.WeekViewEvent = {}));
    })(components = framework.components || (framework.components = {}));
})(framework || (framework = {}));
(function (framework) {
    var components;
    (function (components) {
        class MonthViewBody extends framework.components.Box {
            constructor(name) {
                super(name, 1, 1);
                this.addClass("spn-month-view-body");
            }
            getCells() {
                const result = this.getChildren();
                return result;
            }
        }
        components.MonthViewBody = MonthViewBody;
        MonthViewBody["__class"] = "framework.components.MonthViewBody";
        MonthViewBody["__interfaces"] = ["framework.components.api.Renderable"];
    })(components = framework.components || (framework.components = {}));
})(framework || (framework = {}));
(function (framework) {
    var components;
    (function (components) {
        class MonthViewCell extends framework.components.Box {
            constructor(name, of) {
                super(name, 1, of);
                if (this.date === undefined) {
                    this.date = null;
                }
                this.header = new framework.components.Box("header", 1, 1);
                this.body = new framework.components.Box("body", 1, 1);
                this.addClass("spn-month-view-cell");
                this.addChild$framework_components_api_Renderable(this.header);
                this.addChild$framework_components_api_Renderable(this.body);
                this.header.setStyle("height", ((framework.components.MonthView.CELL_HEIGHT / 6 | 0)) + "px");
                this.body.setStyle("height", ((framework.components.MonthView.CELL_HEIGHT * 5 / 6 | 0)) + "px");
                this.body.setStyle("overflow-y", "auto");
                this.addClass("brd-btm");
                this.addClass("brd-right");
                this.addEventListener(new MonthViewCell.MonthViewCell$0(this), "dblclick");
                this.addEventListener(new MonthViewCell.MonthViewCell$1(this), "dragenter");
                this.addEventListener(new MonthViewCell.MonthViewCell$2(this), "dragover");
                this.addEventListener(new MonthViewCell.MonthViewCell$3(this), "dragleave");
                this.addEventListener(new MonthViewCell.MonthViewCell$4(this), "drop");
            }
            setDate(date) {
                this.date = date;
                this.header.setHtml(date.getDate() + "");
            }
            isSameDate(dt) {
                if (dt.getFullYear() === this.date.getFullYear()) {
                    if (dt.getMonth() === this.date.getMonth()) {
                        if (dt.getDate() === this.date.getDate()) {
                            return true;
                        }
                    }
                }
                return false;
            }
            addCalEvent(uiCalEvent) {
                this.body.addChild$framework_components_api_Renderable(uiCalEvent);
            }
            getDate() {
                return this.date;
            }
            removeCalEvent(uiCalEvent) {
                this.body.removeChild(uiCalEvent);
            }
        }
        components.MonthViewCell = MonthViewCell;
        MonthViewCell["__class"] = "framework.components.MonthViewCell";
        MonthViewCell["__interfaces"] = ["framework.components.api.Renderable"];
        (function (MonthViewCell) {
            class MonthViewCell$0 {
                constructor(__parent) {
                    this.__parent = __parent;
                }
                /**
                 *
                 * @param {*} source
                 * @param {Event} evt
                 */
                performAction(source, evt) {
                    const top = source.getNative().offsetTop;
                    const left = source.getNative().offsetLeft;
                    const hour = 17;
                    const min = 30;
                    console.log("{" + left + "," + top + "}");
                    const shrs = prompt("Number of hours:");
                    if (shrs != null) {
                        const ce = new Object();
                        ce["title"] = "New Event";
                        ce["description"] = "Arbitrary event added";
                        const startDate = new Date(this.__parent.date.getFullYear(), this.__parent.date.getMonth(), this.__parent.date.getDate(), parseFloat(shrs), 30);
                        const endDate = framework.components.Util.addHour(startDate, 4);
                        ce["startDate"] = startDate;
                        ce["endDate"] = endDate;
                        const wj = (source.getAncestorWithClass("spn-month-view"));
                        wj.addCalEvent(ce);
                    }
                }
            }
            MonthViewCell.MonthViewCell$0 = MonthViewCell$0;
            MonthViewCell$0["__interfaces"] = ["framework.components.api.EventListener"];
            class MonthViewCell$1 {
                constructor(__parent) {
                    this.__parent = __parent;
                }
                /**
                 *
                 * @param {*} source
                 * @param {Event} evt
                 */
                performAction(source, evt) {
                    if (framework.components.WeekViewDndManager.dragging != null) {
                        evt.preventDefault();
                        source.addClass("drag-over");
                    }
                }
            }
            MonthViewCell.MonthViewCell$1 = MonthViewCell$1;
            MonthViewCell$1["__interfaces"] = ["framework.components.api.EventListener"];
            class MonthViewCell$2 {
                constructor(__parent) {
                    this.__parent = __parent;
                }
                /**
                 *
                 * @param {*} source
                 * @param {Event} evt
                 */
                performAction(source, evt) {
                    if (framework.components.WeekViewDndManager.dragging != null) {
                        evt.preventDefault();
                        source.addClass("drag-over");
                    }
                }
            }
            MonthViewCell.MonthViewCell$2 = MonthViewCell$2;
            MonthViewCell$2["__interfaces"] = ["framework.components.api.EventListener"];
            class MonthViewCell$3 {
                constructor(__parent) {
                    this.__parent = __parent;
                }
                /**
                 *
                 * @param {*} source
                 * @param {Event} evt
                 */
                performAction(source, evt) {
                    if (framework.components.WeekViewDndManager.dragging != null) {
                        evt.preventDefault();
                        source.removeClass("drag-over");
                    }
                }
            }
            MonthViewCell.MonthViewCell$3 = MonthViewCell$3;
            MonthViewCell$3["__interfaces"] = ["framework.components.api.EventListener"];
            class MonthViewCell$4 {
                constructor(__parent) {
                    this.__parent = __parent;
                }
                /**
                 *
                 * @param {*} source
                 * @param {Event} evt
                 */
                performAction(source, evt) {
                    if (framework.components.WeekViewDndManager.dragging != null) {
                        evt.preventDefault();
                        source.removeClass("drag-over");
                        evt.target.classList.remove("drag-over");
                        const dragging = framework.components.WeekViewDndManager.dragging;
                        if (dragging != null) {
                            const srcStartDate = dragging.getStartDate();
                            const startDate = new Date(this.__parent.date.getFullYear(), this.__parent.date.getMonth(), this.__parent.date.getDate(), srcStartDate.getHours(), srcStartDate.getMinutes());
                            const newEvt = dragging.getNewEvent(startDate);
                            const wek = (source.getAncestorWithClass("spn-month-view"));
                            wek.moveCalEvent(dragging, newEvt);
                            framework.components.WeekViewDndManager.dragging = null;
                        }
                    }
                }
            }
            MonthViewCell.MonthViewCell$4 = MonthViewCell$4;
            MonthViewCell$4["__interfaces"] = ["framework.components.api.EventListener"];
        })(MonthViewCell = components.MonthViewCell || (components.MonthViewCell = {}));
    })(components = framework.components || (framework.components = {}));
})(framework || (framework = {}));
(function (framework) {
    var components;
    (function (components) {
        class WeekViewBody extends framework.components.Box {
            constructor(name) {
                super(name, 11, 12);
                this.addClass("spn-body-right-body");
            }
            getCells() {
                const result = this.getChildren();
                return result;
            }
            unholdEvent(uiCalEvt) {
                {
                    let array33124 = this.getCells();
                    for (let index33123 = 0; index33123 < array33124.length; index33123++) {
                        let dc = array33124[index33123];
                        {
                            {
                                let array33126 = dc.getCells();
                                for (let index33125 = 0; index33125 < array33126.length; index33125++) {
                                    let c = array33126[index33125];
                                    {
                                        c.unhold(uiCalEvt);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        components.WeekViewBody = WeekViewBody;
        WeekViewBody["__class"] = "framework.components.WeekViewBody";
        WeekViewBody["__interfaces"] = ["framework.components.api.Renderable"];
    })(components = framework.components || (framework.components = {}));
})(framework || (framework = {}));
(function (framework) {
    var components;
    (function (components) {
        class WeekViewDateCell extends framework.components.Box {
            constructor(date, hr, days) {
                super(framework.components.Util.formatDate(date, "dd"), 1, days);
                if (this.date === undefined) {
                    this.date = null;
                }
                if (this.hour === undefined) {
                    this.hour = null;
                }
                if (this.cellHr === undefined) {
                    this.cellHr = null;
                }
                if (this.cellHalfHr === undefined) {
                    this.cellHalfHr = null;
                }
                this.date = date;
                this.hour = hr;
                this.addClass("spn-body-right-body-cell");
                this.cellHr = new framework.components.WeekViewCell(hr, 0, date);
                this.cellHalfHr = new framework.components.WeekViewCell(hr, 30, date);
                this.addChild$framework_components_api_Renderable(this.cellHr.addClass("brd-btm brd-right")).addChild(this.cellHalfHr.addClass("brd-btm brd-right"));
            }
            addCalEvent(uiCalEvt) {
                const dt = uiCalEvt.getStartDate();
                const mins = dt.getMinutes();
                if (mins > 0) {
                    this.cellHalfHr.addCalEvent(uiCalEvt);
                }
                else {
                    this.cellHr.addCalEvent(uiCalEvt);
                }
            }
            getCells() {
                const result = this.getChildren();
                return result;
            }
            removeCalEvent(uiCalEvt) {
                this.cellHalfHr.removeCalEvent(uiCalEvt);
                this.cellHr.removeCalEvent(uiCalEvt);
            }
            getDate() {
                return this.date;
            }
            getHour() {
                return this.hour;
            }
            holdHr(uiCalEvt) {
                this.cellHr.hold(uiCalEvt);
            }
            holdHalfHr(uiCalEvt) {
                this.cellHalfHr.hold(uiCalEvt);
            }
            unhold(uiCalEvt) {
                this.cellHr.unhold(uiCalEvt);
                this.cellHalfHr.unhold(uiCalEvt);
            }
            getCellHr() {
                return this.cellHr;
            }
            getCellHalfHr() {
                return this.cellHalfHr;
            }
        }
        components.WeekViewDateCell = WeekViewDateCell;
        WeekViewDateCell["__class"] = "framework.components.WeekViewDateCell";
        WeekViewDateCell["__interfaces"] = ["framework.components.api.Renderable"];
    })(components = framework.components || (framework.components = {}));
})(framework || (framework = {}));
(function (framework) {
    var components;
    (function (components) {
        class WeekViewCell extends framework.components.Col {
            constructor(hour, min, date) {
                super(hour + "-" + min, 1, 1);
                if (this.hour === undefined) {
                    this.hour = 0;
                }
                if (this.min === undefined) {
                    this.min = 0;
                }
                if (this.date === undefined) {
                    this.date = null;
                }
                this.holding = (new Array());
                this.hour = hour;
                this.min = min;
                this.date = date;
                this.addClass("spn-week-view-cell");
                this.setStyle("height", framework.components.WeekView.CELL_HEIGHT + "px");
                this.addEventListener(new WeekViewCell.WeekViewCell$0(this, hour, min, date), "dblclick");
                this.addEventListener(new WeekViewCell.WeekViewCell$1(this), "dragenter");
                this.addEventListener(new WeekViewCell.WeekViewCell$2(this), "dragover");
                this.addEventListener(new WeekViewCell.WeekViewCell$3(this), "dragleave");
                this.addEventListener(new WeekViewCell.WeekViewCell$4(this, date, hour, min), "drop");
            }
            addCalEvent(uiCalEvt) {
                this.addChild$framework_components_api_Renderable(uiCalEvt);
                this.hold(uiCalEvt);
            }
            removeCalEvent(uiCalEvt) {
                this.removeChild(uiCalEvt);
                this.unhold(uiCalEvt);
            }
            getHour() {
                return this.hour;
            }
            getMin() {
                return this.min;
            }
            getDate() {
                return this.date;
            }
            hold(uiCalEvt) {
                if (!this.isHolding(uiCalEvt)) {
                    this.holding.push(uiCalEvt);
                }
                uiCalEvt.addHeldBy(this);
            }
            unhold(uiCalEvt) {
                const tmp = (new Array());
                for (let index33127 = 0; index33127 < this.holding.length; index33127++) {
                    let ev = this.holding[index33127];
                    {
                        if (ev.getId() !== uiCalEvt.getId()) {
                            tmp.push(ev);
                        }
                    }
                }
                this.holding = tmp;
            }
            isHolding(uiCalEvt) {
                for (let index33128 = 0; index33128 < this.holding.length; index33128++) {
                    let ev = this.holding[index33128];
                    {
                        if (ev.getId() === uiCalEvt.getId()) {
                            return true;
                        }
                    }
                }
                return false;
            }
            getHolding() {
                return this.holding;
            }
        }
        components.WeekViewCell = WeekViewCell;
        WeekViewCell["__class"] = "framework.components.WeekViewCell";
        WeekViewCell["__interfaces"] = ["framework.components.api.Renderable"];
        (function (WeekViewCell) {
            class WeekViewCell$0 {
                constructor(__parent, hour, min, date) {
                    this.hour = hour;
                    this.min = min;
                    this.date = date;
                    this.__parent = __parent;
                }
                /**
                 *
                 * @param {*} source
                 * @param {Event} evt
                 */
                performAction(source, evt) {
                    const top = source.getNative().offsetTop;
                    const left = source.getNative().offsetLeft;
                    console.log("{" + left + "," + top + "}");
                    const shrs = prompt("Number of hours:");
                    if (shrs != null) {
                        const ce = new Object();
                        ce["title"] = "New Event";
                        ce["description"] = "Arbitrary event added";
                        const time = (this.hour * 60 * 60 * 1000) + (this.min * 60 * 1000);
                        ce["startDate"] = new Date(this.date.getTime() + time);
                        const ms = parseFloat(shrs) * 60 * 60 * 1000 + time;
                        const endDate = new Date(this.date.getTime() + ms);
                        ce["endDate"] = endDate;
                        const wds = new framework.components.WeekViewEvent("");
                        wds.setValue(ce);
                        const wj = (source.getAncestorWithClass("spn-week-view"));
                        wj.addCalEvent(ce);
                    }
                }
            }
            WeekViewCell.WeekViewCell$0 = WeekViewCell$0;
            WeekViewCell$0["__interfaces"] = ["framework.components.api.EventListener"];
            class WeekViewCell$1 {
                constructor(__parent) {
                    this.__parent = __parent;
                }
                /**
                 *
                 * @param {*} source
                 * @param {Event} evt
                 */
                performAction(source, evt) {
                    if (framework.components.WeekViewDndManager.dragging != null) {
                        evt.preventDefault();
                        evt.target.classList.add("drag-over");
                    }
                }
            }
            WeekViewCell.WeekViewCell$1 = WeekViewCell$1;
            WeekViewCell$1["__interfaces"] = ["framework.components.api.EventListener"];
            class WeekViewCell$2 {
                constructor(__parent) {
                    this.__parent = __parent;
                }
                /**
                 *
                 * @param {*} source
                 * @param {Event} evt
                 */
                performAction(source, evt) {
                    if (framework.components.WeekViewDndManager.dragging != null) {
                        evt.preventDefault();
                        evt.target.classList.add("drag-over");
                    }
                }
            }
            WeekViewCell.WeekViewCell$2 = WeekViewCell$2;
            WeekViewCell$2["__interfaces"] = ["framework.components.api.EventListener"];
            class WeekViewCell$3 {
                constructor(__parent) {
                    this.__parent = __parent;
                }
                /**
                 *
                 * @param {*} source
                 * @param {Event} evt
                 */
                performAction(source, evt) {
                    if (framework.components.WeekViewDndManager.dragging != null) {
                        evt.preventDefault();
                        evt.target.classList.remove("drag-over");
                    }
                }
            }
            WeekViewCell.WeekViewCell$3 = WeekViewCell$3;
            WeekViewCell$3["__interfaces"] = ["framework.components.api.EventListener"];
            class WeekViewCell$4 {
                constructor(__parent, date, hour, min) {
                    this.date = date;
                    this.hour = hour;
                    this.min = min;
                    this.__parent = __parent;
                }
                /**
                 *
                 * @param {*} source
                 * @param {Event} evt
                 */
                performAction(source, evt) {
                    if (framework.components.WeekViewDndManager.dragging != null) {
                        evt.preventDefault();
                        evt.target.classList.remove("drag-over");
                        const dragging = framework.components.WeekViewDndManager.dragging;
                        if (dragging != null) {
                            const startDate = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate(), this.hour, this.min);
                            const newEvt = dragging.getNewEvent(startDate);
                            const wek = (source.getAncestorWithClass("spn-week-view"));
                            wek.moveCalEvent(dragging, newEvt);
                            framework.components.WeekViewDndManager.dragging = null;
                        }
                    }
                }
            }
            WeekViewCell.WeekViewCell$4 = WeekViewCell$4;
            WeekViewCell$4["__interfaces"] = ["framework.components.api.EventListener"];
        })(WeekViewCell = components.WeekViewCell || (components.WeekViewCell = {}));
    })(components = framework.components || (framework.components = {}));
})(framework || (framework = {}));
(function (framework) {
    var components;
    (function (components) {
        var input;
        (function (input) {
            class JSAddressInput extends framework.components.HTMLTemplateContainer {
                constructor(name) {
                    super(name, "");
                    this.address = new Object();
                    this.country = new framework.components.input.JSSelect("country");
                    this.city = new framework.components.input.JSTextInput("city");
                    this.postalCode = new framework.components.input.JSTextInput("postalCode");
                    this.state = new framework.components.input.JSTextInput("state");
                    this.street = new framework.components.input.JSTextInput("street");
                    this.addChild$framework_components_api_Renderable(this.country);
                    this.addChild$framework_components_api_Renderable(this.city);
                    this.addChild$framework_components_api_Renderable(this.postalCode);
                    this.addChild$framework_components_api_Renderable(this.state);
                    this.addChild$framework_components_api_Renderable(this.street);
                    this.city.setRequired(true);
                    this.postalCode.setRequired(true);
                    this.street.setRequired(true);
                    this.country.setRequired(true);
                }
                getAddress() {
                    this.address["country"] = this.country.getValue();
                    this.address["city"] = this.city.getValue();
                    this.address["postalCode"] = this.country.getValue();
                    this.address["state"] = this.state.getValue();
                    this.address["street"] = this.street.getValue();
                    return this.address;
                }
                setAddress(address) {
                    this.country.setValue(address["country"]);
                    this.city.setValue$java_lang_String(address["city"]);
                    this.postalCode.setValue$java_lang_String(address["postalCode"]);
                    this.state.setValue$java_lang_String(address["state"]);
                    this.street.setValue$java_lang_String(address["street"]);
                }
                /**
                 *
                 * @return {Object}
                 */
                getValue() {
                    return this.getAddress();
                }
                setValue$jsweet_lang_Object(val) {
                    this.setAddress(val);
                }
                /**
                 *
                 * @param {Object} val
                 */
                setValue(val) {
                    if (((val != null && val instanceof Object) || val === null)) {
                        return this.setValue$jsweet_lang_Object(val);
                    }
                    else
                        throw new Error('invalid overload');
                }
                /**
                 *
                 */
                validate() {
                    this.street.validate();
                    this.postalCode.validate();
                    this.city.validate();
                    this.country.validate();
                }
                /**
                 *
                 * @return {string}
                 */
                getBinding() {
                    if (this.getAttribute("binding") == null) {
                        return this.getName();
                    }
                    else {
                        return this.getAttribute("binding");
                    }
                }
                /**
                 *
                 * @param {string} binding
                 * @return {*}
                 */
                setBinding(binding) {
                    this.setAttribute("binding", binding);
                    return this;
                }
                /**
                 *
                 * @param {boolean} b
                 * @return {*}
                 */
                setRequired(b) {
                    return this;
                }
            }
            input.JSAddressInput = JSAddressInput;
            JSAddressInput["__class"] = "framework.components.input.JSAddressInput";
            JSAddressInput["__interfaces"] = ["framework.components.api.InputField", "framework.components.api.Renderable", "framework.components.api.TemplateRenderable"];
        })(input = components.input || (components.input = {}));
    })(components = framework.components || (framework.components = {}));
})(framework || (framework = {}));
(function (framework) {
    var components;
    (function (components) {
        /**
         * Create a new instance of this component
         * @param {string} name The name of the component
         * @param {string} url The url where to submit uploaded file
         * @param {string} template
         * @class
         * @extends framework.components.HTMLTemplateContainer
         * @author Rossaye Abdool Kureem
         */
        class JSUpload extends framework.components.HTMLTemplateContainer {
            constructor(name, template, url) {
                if (((typeof name === 'string') || name === null) && ((typeof template === 'string') || template === null) && ((typeof url === 'string') || url === null)) {
                    let __args = arguments;
                    super(name, template);
                    this.label = new framework.components.JSContainer("label", "label");
                    this.input = new framework.components.JSContainer("uploadfile", "input");
                    this.uploader = new framework.components.FileUploader();
                    this.required = false;
                    this.addChild$framework_components_api_Renderable(this.label);
                    this.input.setAttribute("type", "file").setAttribute("accept", "*");
                    this.label.setHtml("Upload File:");
                    this.input.addEventListener(this, "change");
                    this.input.addClass("slds-input");
                    this.addChild$framework_components_api_Renderable(this.input);
                    this.setAttribute("url", url);
                }
                else if (((typeof name === 'string') || name === null) && ((typeof template === 'string') || template === null) && url === undefined) {
                    let __args = arguments;
                    let url = __args[1];
                    {
                        let __args = arguments;
                        let template = "<form>\n\t<div name=\"label\"></div>\n\t<div name=\"uploadfile\"></div>\n</form>";
                        super(name, template);
                        this.label = new framework.components.JSContainer("label", "label");
                        this.input = new framework.components.JSContainer("uploadfile", "input");
                        this.uploader = new framework.components.FileUploader();
                        this.required = false;
                        this.addChild$framework_components_api_Renderable(this.label);
                        this.input.setAttribute("type", "file").setAttribute("accept", "*");
                        this.label.setHtml("Upload File:");
                        this.input.addEventListener(this, "change");
                        this.input.addClass("slds-input");
                        this.addChild$framework_components_api_Renderable(this.input);
                        this.setAttribute("url", url);
                    }
                    this.label = new framework.components.JSContainer("label", "label");
                    this.input = new framework.components.JSContainer("uploadfile", "input");
                    this.uploader = new framework.components.FileUploader();
                    this.required = false;
                }
                else
                    throw new Error('invalid overload');
            }
            /**
             * Manually opens native dialog box to select file to upload
             */
            triggerUpload() {
                this.input.getNative().click();
            }
            /**
             *
             * @return {java.lang.String[]}
             */
            advancedEventTypes() {
                return ["success", "error"];
            }
            /**
             * Sets a label to this component
             * @param {string} label The label of the component
             */
            setLabel(label) {
                this.label.setHtml(label);
            }
            /**
             * Sets the accepts mimetypes for this component
             * @param {string} accepts Mime types allowed to upload (e.g image/jpg, image/png, text/html etc)
             */
            setAccepts(accepts) {
                this.input.setAttribute("accept", accepts);
            }
            /**
             *
             * @param {*} source
             * @param {Event} ev
             */
            performAction(source, ev) {
            }
            /**
             * Sets the server url where to submit file to uplaod
             * @param {string} url Url where to submit file to upload
             */
            setUrl(url) {
                this.setAttribute("url", url);
            }
            /**
             * Synonymous to setUrl
             * @param {string} url The url where to submit file to upload
             */
            setEndpoint(url) {
                this.setUrl(url);
            }
            /**
             *
             * @return {Object}
             */
            getValue() {
                return null;
            }
            setValue$jsweet_lang_Object(val) {
            }
            /**
             *
             * @param {Object} val
             */
            setValue(val) {
                if (((val != null && val instanceof Object) || val === null)) {
                    return this.setValue$jsweet_lang_Object(val);
                }
                else
                    throw new Error('invalid overload');
            }
            /**
             *
             */
            validate() {
            }
            /**
             *
             * @return {string}
             */
            getBinding() {
                return this.getAttribute("binding");
            }
            /**
             *
             * @param {string} binding
             * @return {*}
             */
            setBinding(binding) {
                this.setAttribute("binding", binding);
                return this;
            }
            /**
             *
             * @param {boolean} b
             * @return {*}
             */
            setRequired(b) {
                this.required = b;
                return this;
            }
            getUploader() {
                return this.uploader;
            }
            setUploader(uploader) {
                this.uploader = uploader;
            }
            getLabel() {
                return this.label;
            }
            getInput() {
                return this.input;
            }
            isRequired() {
                return this.required;
            }
        }
        components.JSUpload = JSUpload;
        JSUpload["__class"] = "framework.components.JSUpload";
        JSUpload["__interfaces"] = ["framework.components.api.EventListener", "framework.components.api.InputField", "framework.components.api.Renderable", "framework.components.api.TemplateRenderable"];
    })(components = framework.components || (framework.components = {}));
})(framework || (framework = {}));
(function (framework) {
    var components;
    (function (components) {
        var input;
        (function (input) {
            class JSCheckBox extends framework.components.input.AbstractJSInput {
                constructor(name) {
                    super(name);
                    this.setAttribute("type", "checkbox");
                }
                /**
                 *
                 * @return {boolean}
                 */
                getValue() {
                    const el = this.getNative();
                    if (el != null) {
                        return el.checked;
                    }
                    if (this.getAttribute("value") != null && /* equalsIgnoreCase */ ((o1, o2) => o1.toUpperCase() === (o2 === null ? o2 : o2.toUpperCase()))("true", this.getAttribute("value"))) {
                        return true;
                    }
                    return false;
                }
                setValue$java_lang_Boolean(b) {
                    if (b) {
                        this.setAttribute("value", "true");
                        this.setAttribute("checked", "true");
                    }
                    else {
                        this.setAttribute("value", "false");
                        this.setAttribute("checked", null);
                    }
                    const el = this.getNative();
                    if (el != null) {
                        el.checked = b;
                    }
                }
                /**
                 *
                 * @param {boolean} b
                 */
                setValue(b) {
                    if (((typeof b === 'boolean') || b === null)) {
                        return this.setValue$java_lang_Boolean(b);
                    }
                    else
                        throw new Error('invalid overload');
                }
                isChecked() {
                    return this.getValue();
                }
                setChecked(b) {
                    this.setValue$java_lang_Boolean(b);
                }
            }
            input.JSCheckBox = JSCheckBox;
            JSCheckBox["__class"] = "framework.components.input.JSCheckBox";
            JSCheckBox["__interfaces"] = ["framework.components.api.InputField", "framework.components.api.Renderable"];
        })(input = components.input || (components.input = {}));
    })(components = framework.components || (framework.components = {}));
})(framework || (framework = {}));
(function (framework) {
    var components;
    (function (components) {
        var input;
        (function (input) {
            class JSDateInput extends framework.components.input.AbstractJSInput {
                constructor(name) {
                    super(name);
                    this.setType(framework.components.input.DateInputTypes.date);
                    this.addEventListener(new JSDateInput.JSDateInput$0(this), "change");
                }
                setType(type) {
                    this.setAttribute("type", type);
                    return this;
                }
                /**
                 *
                 * @return {Date}
                 */
                getValue() {
                    return this.getDateValue();
                }
                setValue$jsweet_lang_Date(val) {
                    this.setDateValue(val);
                }
                /**
                 *
                 * @param {Date} val
                 */
                setValue(val) {
                    if (((val != null && val instanceof Date) || val === null)) {
                        return this.setValue$jsweet_lang_Date(val);
                    }
                    else
                        throw new Error('invalid overload');
                }
                setMin(min) {
                    this.setAttribute("min", this.toHtmlDateString(min));
                }
                setMax(max) {
                    this.setAttribute("max", this.toHtmlDateString(max));
                }
            }
            input.JSDateInput = JSDateInput;
            JSDateInput["__class"] = "framework.components.input.JSDateInput";
            JSDateInput["__interfaces"] = ["framework.components.api.InputField", "framework.components.api.Renderable"];
            (function (JSDateInput) {
                class JSDateInput$0 {
                    constructor(__parent) {
                        this.__parent = __parent;
                    }
                    /**
                     *
                     * @param {*} source
                     * @param {Event} evt
                     */
                    performAction(source, evt) {
                        this.__parent.setValue(this.__parent.getValue());
                    }
                }
                JSDateInput.JSDateInput$0 = JSDateInput$0;
                JSDateInput$0["__interfaces"] = ["framework.components.api.EventListener"];
            })(JSDateInput = input.JSDateInput || (input.JSDateInput = {}));
        })(input = components.input || (components.input = {}));
    })(components = framework.components || (framework.components = {}));
})(framework || (framework = {}));
(function (framework) {
    var components;
    (function (components) {
        var input;
        (function (input) {
            class JSNumberInput extends framework.components.input.AbstractJSInput {
                constructor(name) {
                    super(name);
                    this.setAttribute("type", "number");
                }
                setType(type) {
                    this.setAttribute("type", type);
                    return this;
                }
                setStep(step) {
                    this.setAttribute("step", step + "");
                }
                getStep() {
                    return parseInt(this.getAttribute("step"));
                }
                /**
                 *
                 * @return {number}
                 */
                getValue() {
                    return this.getDoubleValue();
                }
                setValue$java_lang_Double(val) {
                    this.setDoubleValue(val);
                }
                /**
                 *
                 * @param {number} val
                 */
                setValue(val) {
                    if (((typeof val === 'number') || val === null)) {
                        return this.setValue$java_lang_Double(val);
                    }
                    else
                        throw new Error('invalid overload');
                }
                setMin(min) {
                    this.setAttribute("min", min + "");
                }
                setMax(max) {
                    this.setAttribute("max", "" + max);
                }
            }
            input.JSNumberInput = JSNumberInput;
            JSNumberInput["__class"] = "framework.components.input.JSNumberInput";
            JSNumberInput["__interfaces"] = ["framework.components.api.InputField", "framework.components.api.Renderable"];
        })(input = components.input || (components.input = {}));
    })(components = framework.components || (framework.components = {}));
})(framework || (framework = {}));
(function (framework) {
    var components;
    (function (components) {
        var input;
        (function (input) {
            class JSTextInput extends framework.components.input.AbstractJSInput {
                constructor(name) {
                    super(name);
                    this.setType(framework.components.api.StringInputTypes.text);
                    this.setAttribute("identifier", "html:input");
                }
                setMaxLength(length) {
                    this.setAttribute("maxlength", length + "");
                }
                setType(type) {
                    this.setAttribute("type", type);
                    return this;
                }
                /**
                 *
                 * @return {string}
                 */
                getValue() {
                    return this.getStringValue();
                }
                setValue$java_lang_String(val) {
                    this.setStringValue(val);
                }
                /**
                 *
                 * @param {string} val
                 */
                setValue(val) {
                    if (((typeof val === 'string') || val === null)) {
                        return this.setValue$java_lang_String(val);
                    }
                    else
                        throw new Error('invalid overload');
                }
                getMask() {
                    return this.getAttribute("mask");
                }
                setMask(mask) {
                    this.setAttribute("mask", mask);
                    this.setRendered(false);
                }
            }
            input.JSTextInput = JSTextInput;
            JSTextInput["__class"] = "framework.components.input.JSTextInput";
            JSTextInput["__interfaces"] = ["framework.components.api.InputField", "framework.components.api.Renderable"];
        })(input = components.input || (components.input = {}));
    })(components = framework.components || (framework.components = {}));
})(framework || (framework = {}));
(function (framework) {
    var components;
    (function (components) {
        var input;
        (function (input) {
            class JSTimeInput extends framework.components.input.AbstractJSInput {
                constructor(name) {
                    super(name);
                    this.savedDate = new Date();
                    this.setAttribute("type", "time");
                    this.setAttribute("identifier", "html:time-input");
                }
                /**
                 *
                 * @return {Date}
                 */
                getValue() {
                    const time = this.getStringValue();
                    const d = this.savedDate;
                    if (time != null && /* contains */ (time.indexOf(":") != -1)) {
                        const htmn = time.split(":");
                        d.setHours(parseInt(htmn[0]), parseInt(htmn[1]));
                    }
                    return d;
                }
                setValue$jsweet_lang_Date(val) {
                    if (val != null) {
                        this.savedDate = val;
                        let mins = val.getMinutes() + "";
                        if (mins.length === 1) {
                            mins = "0" + mins;
                        }
                        let hrs = val.getHours() + "";
                        if (hrs.length === 1) {
                            hrs = "0" + hrs;
                        }
                        this.setStringValue(hrs + ":" + mins);
                    }
                }
                /**
                 *
                 * @param {Date} val
                 */
                setValue(val) {
                    if (((val != null && val instanceof Date) || val === null)) {
                        return this.setValue$jsweet_lang_Date(val);
                    }
                    else
                        throw new Error('invalid overload');
                }
            }
            input.JSTimeInput = JSTimeInput;
            JSTimeInput["__class"] = "framework.components.input.JSTimeInput";
            JSTimeInput["__interfaces"] = ["framework.components.api.InputField", "framework.components.api.Renderable"];
        })(input = components.input || (components.input = {}));
    })(components = framework.components || (framework.components = {}));
})(framework || (framework = {}));
(function (framework) {
    var components;
    (function (components) {
        var input;
        (function (input) {
            class RichTextEditor extends framework.components.input.JSTextArea {
                constructor(name) {
                    super(name);
                    this.editor = null;
                    this.setAttribute("identifier", "html:richtext");
                    this.addRenderer(this);
                }
                doRender$framework_components_input_RichTextEditor$jsweet_dom_HTMLElement(c, root) {
                    if (this.editor == null) {
                        eval("this.editor = new Simditor({textarea: $(\'#" + this.getId() + "\')});");
                    }
                }
                /**
                 *
                 * @param {framework.components.input.RichTextEditor} c
                 * @param {HTMLElement} root
                 */
                doRender(c, root) {
                    if (((c != null && c instanceof framework.components.input.RichTextEditor) || c === null) && ((root != null && root instanceof HTMLElement) || root === null)) {
                        return this.doRender$framework_components_input_RichTextEditor$jsweet_dom_HTMLElement(c, root);
                    }
                    else
                        throw new Error('invalid overload');
                }
                /**
                 *
                 * @return {string}
                 */
                getValue() {
                    if (this.editor != null) {
                        this.editor["saveContent"].call(this.editor);
                    }
                    return super.getValue();
                }
            }
            input.RichTextEditor = RichTextEditor;
            RichTextEditor["__class"] = "framework.components.input.RichTextEditor";
            RichTextEditor["__interfaces"] = ["framework.components.api.InputField", "framework.components.api.Renderable", "framework.components.api.Renderer"];
        })(input = components.input || (components.input = {}));
    })(components = framework.components || (framework.components = {}));
})(framework || (framework = {}));
(function (framework) {
    var components;
    (function (components) {
        var input;
        (function (input) {
            class JSRadio extends framework.components.input.JSCheckBox {
                constructor(name) {
                    super(name);
                    this.setAttribute("type", "radio");
                }
            }
            input.JSRadio = JSRadio;
            JSRadio["__class"] = "framework.components.input.JSRadio";
            JSRadio["__interfaces"] = ["framework.components.api.InputField", "framework.components.api.Renderable"];
        })(input = components.input || (components.input = {}));
    })(components = framework.components || (framework.components = {}));
})(framework || (framework = {}));
framework.components.MonthView.DAYS_$LI$();
framework.components.JSContainer.defaultRenderer_$LI$();
framework.components.Util.DAYS_IN_MONTH_$LI$();
framework.components.Util.MONTHS_$LI$();
framework.components.Util.LONG_DAYS_$LI$();
framework.components.Util.SHORT_DAYS_$LI$();
framework.components.Util.DAYS_$LI$();
framework.components.input.NumericInputTypes.types_$LI$();
framework.components.input.DateInputTypes.types_$LI$();
framework.components.api.StringInputTypes.types_$LI$();
framework.components.Boot.main(null);
