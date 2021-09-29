/* Generated from Java with JSweet 3.0.0 - http://www.jsweet.org */
var api;
(function (api) {
    class ContainerRenderer {
        constructor() {
        }
        static getElementById(id) {
            return document.getElementById(id);
        }
        doRender(c, root) {
            const jq = c.getElement();
            const tag = c.getTag();
            const rendered = c.isRendered();
            const name = c.getName();
            const html = c.getHtml();
            const rparent = c.getParent();
            if (!rendered) {
                if (jq != null)
                    jq.remove();
                const njq = document.createElement(tag);
                c.setElement(njq);
                if (name != null && name.length > 0)
                    njq.setAttribute("name", name);
                njq.setAttribute("id", c.getId());
                njq.innerHTML = html;
                const uiscripts = njq.querySelectorAll("script");
                const scripts = (new Array());
                for (let i = 0; i < uiscripts.length; i++) {
                    {
                        const elem = uiscripts[i];
                        if (elem.innerText != null && elem.innerText.trim().length > 0)
                            scripts.push(elem.innerText);
                    }
                    ;
                }
                this.renderAttributes(njq, c, false);
                this.renderStyles(njq, c, false);
                if (rparent == null) {
                    if (root == null) {
                        const body = document.getElementsByTagName("body")[0];
                        body.appendChild(njq);
                    }
                    else {
                        root.appendChild(njq);
                    }
                }
                else {
                    if (rparent != null && (rparent.constructor != null && rparent.constructor["__interfaces"] != null && rparent.constructor["__interfaces"].indexOf("framework.components.api.TemplateRenderable") >= 0)) {
                        const elem = rparent.getElement();
                        elem.parentElement.replaceChild(njq, elem);
                    }
                    else {
                        const index = rparent.getChildren().indexOf(c);
                        let nextSib = null;
                        if (index < rparent.getChildren().length - 1) {
                            nextSib = rparent.getChildren()[index + 1];
                            if (!nextSib.isRendered()) {
                                nextSib = null;
                            }
                        }
                        if (nextSib != null) {
                            const p = rparent.getElement();
                            p.insertBefore(njq, nextSib.getElement());
                        }
                        else {
                            try {
                                rparent.getElement().appendChild(njq);
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
                for (let index189 = 0; index189 < scripts.length; index189++) {
                    let scr = scripts[index189];
                    {
                        eval(scr);
                    }
                }
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
            for (let index190 = 0; index190 < keys.length; index190++) {
                let key = keys[index190];
                {
                    const listeners = c.getListeners()[key];
                    njq.addEventListener(key, ((listeners) => {
                        return (evt) => {
                            for (let index191 = 0; index191 < listeners.length; index191++) {
                                let l = listeners[index191];
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
                    let array193 = c.getChangedAttributes();
                    for (let index192 = 0; index192 < array193.length; index192++) {
                        let key = array193[index192];
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
                    let array195 = c.getAttributeNames();
                    for (let index194 = 0; index194 < array195.length; index194++) {
                        let key = array195[index194];
                        {
                            const attr = c.getAttribute(key);
                            if (attr != null)
                                ContainerRenderer.setAttribute(njq, key, attr);
                        }
                    }
                }
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
                    let array197 = c.getChangedStyles();
                    for (let index196 = 0; index196 < array197.length; index196++) {
                        let key = array197[index196];
                        {
                            njq.style.setProperty(key, c.getStyle(key));
                        }
                    }
                }
            }
            else {
                {
                    let array199 = c.getStyleNames();
                    for (let index198 = 0; index198 < array199.length; index198++) {
                        let key = array199[index198];
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
                for (let index200 = 0; index200 < rules.length; index200++) {
                    let rule = rules[index200];
                    sheet.insertRule(rule);
                }
            }
        }
    }
    ContainerRenderer.timeSpent = 0;
    api.ContainerRenderer = ContainerRenderer;
    ContainerRenderer["__class"] = "framework.components.api.ContainerRenderer";
    ContainerRenderer["__interfaces"] = ["framework.components.api.Renderer"];
})(api || (api = {}));
(function (api) {
    let InputType;
    (function (InputType) {
        InputType[InputType["BUTTON"] = 0] = "BUTTON";
        InputType[InputType["CHECKBOX"] = 1] = "CHECKBOX";
        InputType[InputType["DATE"] = 2] = "DATE";
        InputType[InputType["DATETIME_LOCAL"] = 3] = "DATETIME_LOCAL";
        InputType[InputType["FILE"] = 4] = "FILE";
        InputType[InputType["HIDDEN"] = 5] = "HIDDEN";
        InputType[InputType["IMAGE"] = 6] = "IMAGE";
        InputType[InputType["MONTH"] = 7] = "MONTH";
        InputType[InputType["NUMBER"] = 8] = "NUMBER";
        InputType[InputType["RADIO"] = 9] = "RADIO";
        InputType[InputType["RANGE"] = 10] = "RANGE";
        InputType[InputType["RESET"] = 11] = "RESET";
        InputType[InputType["SUBMIT"] = 12] = "SUBMIT";
        InputType[InputType["TIME"] = 13] = "TIME";
        InputType[InputType["WEEK"] = 14] = "WEEK";
        InputType[InputType["TEXT"] = 15] = "TEXT";
        InputType[InputType["PASSWORD"] = 16] = "PASSWORD";
        InputType[InputType["EMAIL"] = 17] = "EMAIL";
        InputType[InputType["URL"] = 18] = "URL";
        InputType[InputType["SEARCH"] = 19] = "SEARCH";
        InputType[InputType["TEL"] = 20] = "TEL";
        InputType[InputType["COLOR"] = 21] = "COLOR";
    })(InputType = api.InputType || (api.InputType = {}));
    /** @ignore */
    class InputType_$WRAPPER {
        constructor(_$ordinal, _$name, value, group) {
            this._$ordinal = _$ordinal;
            this._$name = _$name;
            if (((typeof value === 'string') || value === null) && ((typeof group === 'string') || group === null)) {
                let __args = arguments;
                if (this.value === undefined) {
                    this.value = null;
                }
                this.group = "text";
                this.value = value;
                this.group = group;
            }
            else if (((typeof value === 'string') || value === null) && group === undefined) {
                let __args = arguments;
                if (this.value === undefined) {
                    this.value = null;
                }
                this.group = "text";
                this.value = value;
                this.group = "text";
            }
            else
                throw new Error('invalid overload');
        }
        getValue() {
            return this.value;
        }
        getGroup() {
            return this.group;
        }
        name() { return this._$name; }
        ordinal() { return this._$ordinal; }
        compareTo(other) { return this._$ordinal - (isNaN(other) ? other._$ordinal : other); }
    }
    api.InputType_$WRAPPER = InputType_$WRAPPER;
    InputType["__class"] = "framework.components.api.InputType";
    InputType["__interfaces"] = ["java.lang.constant.Constable", "java.lang.Comparable", "java.io.Serializable"];
    InputType["_$wrappers"] = { 0: new InputType_$WRAPPER(0, "BUTTON", "button", "button"), 1: new InputType_$WRAPPER(1, "CHECKBOX", "checkbox", "boolean"), 2: new InputType_$WRAPPER(2, "DATE", "date", "date"), 3: new InputType_$WRAPPER(3, "DATETIME_LOCAL", "datetime-local", "date"), 4: new InputType_$WRAPPER(4, "FILE", "file", "file"), 5: new InputType_$WRAPPER(5, "HIDDEN", "hidden", "text"), 6: new InputType_$WRAPPER(6, "IMAGE", "image", "image"), 7: new InputType_$WRAPPER(7, "MONTH", "month", "date"), 8: new InputType_$WRAPPER(8, "NUMBER", "number", "number"), 9: new InputType_$WRAPPER(9, "RADIO", "radio", "boolean"), 10: new InputType_$WRAPPER(10, "RANGE", "range", "number"), 11: new InputType_$WRAPPER(11, "RESET", "reset", "button"), 12: new InputType_$WRAPPER(12, "SUBMIT", "submit", "button"), 13: new InputType_$WRAPPER(13, "TIME", "time", "date"), 14: new InputType_$WRAPPER(14, "WEEK", "week", "date"), 15: new InputType_$WRAPPER(15, "TEXT", "text"), 16: new InputType_$WRAPPER(16, "PASSWORD", "password"), 17: new InputType_$WRAPPER(17, "EMAIL", "email"), 18: new InputType_$WRAPPER(18, "URL", "url"), 19: new InputType_$WRAPPER(19, "SEARCH", "search"), 20: new InputType_$WRAPPER(20, "TEL", "tel"), 21: new InputType_$WRAPPER(21, "COLOR", "color") };
})(api || (api = {}));
(function (api) {
    let Units;
    (function (Units) {
        Units[Units["PIXEL"] = 0] = "PIXEL";
        Units[Units["CENTIMETER"] = 1] = "CENTIMETER";
        Units[Units["MILLIMETER"] = 2] = "MILLIMETER";
        Units[Units["INCH"] = 3] = "INCH";
        Units[Units["POINT"] = 4] = "POINT";
        Units[Units["PICA"] = 5] = "PICA";
        Units[Units["EM"] = 6] = "EM";
        Units[Units["EX"] = 7] = "EX";
        Units[Units["CH"] = 8] = "CH";
        Units[Units["REM"] = 9] = "REM";
        Units[Units["VIEWPORT_WIDTH"] = 10] = "VIEWPORT_WIDTH";
        Units[Units["VIEWPORT_HEIGHT"] = 11] = "VIEWPORT_HEIGHT";
        Units[Units["VIEWPORT_MIN"] = 12] = "VIEWPORT_MIN";
        Units[Units["VIEWPORT_MAX"] = 13] = "VIEWPORT_MAX";
        Units[Units["PERCENT"] = 14] = "PERCENT";
    })(Units = api.Units || (api.Units = {}));
    /** @ignore */
    class Units_$WRAPPER {
        constructor(_$ordinal, _$name, name, display, type) {
            this._$ordinal = _$ordinal;
            this._$name = _$name;
            if (this.__name === undefined) {
                this.__name = null;
            }
            if (this.display === undefined) {
                this.display = null;
            }
            if (this.type === undefined) {
                this.type = null;
            }
            this.__name = name;
            this.display = display;
            this.type = type;
        }
        getName() {
            return this.__name;
        }
        getDisplay() {
            return this.display;
        }
        getType() {
            return this.type;
        }
        name() { return this._$name; }
        ordinal() { return this._$ordinal; }
        compareTo(other) { return this._$ordinal - (isNaN(other) ? other._$ordinal : other); }
    }
    api.Units_$WRAPPER = Units_$WRAPPER;
    Units["__class"] = "framework.components.api.Units";
    Units["__interfaces"] = ["java.lang.constant.Constable", "java.lang.Comparable", "java.io.Serializable"];
    Units["_$wrappers"] = { 0: new Units_$WRAPPER(0, "PIXEL", "pixel", "px", "absolute"), 1: new Units_$WRAPPER(1, "CENTIMETER", "centimer", "cm", "absolute"), 2: new Units_$WRAPPER(2, "MILLIMETER", "millimeter", "mm", "absolute"), 3: new Units_$WRAPPER(3, "INCH", "inch", "mm", "absolute"), 4: new Units_$WRAPPER(4, "POINT", "point", "pt", "absolute"), 5: new Units_$WRAPPER(5, "PICA", "pica", "pc", "absolute"), 6: new Units_$WRAPPER(6, "EM", "em", "em", "relative"), 7: new Units_$WRAPPER(7, "EX", "ex", "ex", "relative"), 8: new Units_$WRAPPER(8, "CH", "ch", "ch", "relative"), 9: new Units_$WRAPPER(9, "REM", "root element", "rem", "relative"), 10: new Units_$WRAPPER(10, "VIEWPORT_WIDTH", "viewport width", "vw", "relative"), 11: new Units_$WRAPPER(11, "VIEWPORT_HEIGHT", "viewport height", "vw", "relative"), 12: new Units_$WRAPPER(12, "VIEWPORT_MIN", "viewport minimum", "vmin", "relative"), 13: new Units_$WRAPPER(13, "VIEWPORT_MAX", "viewport maximum", "vmax", "relative"), 14: new Units_$WRAPPER(14, "PERCENT", "percent", "%", "relative") };
})(api || (api = {}));
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
})(api || (api = {}));
var table;
(function (table) {
    class DefaulTableModel {
        constructor() {
            this.data = (new Array());
        }
        /**
         *
         * @return {number}
         */
        getRowCount() {
            return (this.data.length | 0);
        }
        /**
         *
         * @return {number}
         */
        getColumnCount() {
            return 0;
        }
        /**
         *
         * @param {number} columnIndex
         * @return {string}
         */
        getColumnName(columnIndex) {
            return null;
        }
        /**
         *
         * @param {number} rowIndex
         * @param {number} columnIndex
         * @return {boolean}
         */
        isCellEditable(rowIndex, columnIndex) {
            return false;
        }
        /**
         *
         * @param {number} rowIndex
         * @param {number} columnIndex
         * @return {*}
         */
        getValueAt(rowIndex, columnIndex) {
            return null;
        }
        /**
         *
         * @param {*} aValue
         * @param {number} rowIndex
         * @param {number} columnIndex
         */
        setValueAt(aValue, rowIndex, columnIndex) {
        }
        /**
         *
         * @param {*} l
         */
        addTableModelListener(l) {
        }
        /**
         *
         * @param {*} l
         */
        removeTableModelListener(l) {
        }
    }
    table.DefaulTableModel = DefaulTableModel;
    DefaulTableModel["__class"] = "framework.components.table.DefaulTableModel";
    DefaulTableModel["__interfaces"] = ["framework.components.table.TableModel"];
})(table || (table = {}));
(function (table) {
    class DefaultTableColumnModel {
        constructor() {
            this.columns = (new Array());
            this.pointer = -1;
        }
        addColumn$framework_components_table_TableColumn(aColumn) {
            this.columns.push(aColumn);
            this.reset();
        }
        /**
         *
         * @param {table.TableColumn} aColumn
         */
        addColumn(aColumn) {
            if (((aColumn != null && aColumn instanceof table.TableColumn) || aColumn === null)) {
                return this.addColumn$framework_components_table_TableColumn(aColumn);
            }
            else if (((aColumn != null && aColumn instanceof Array && (aColumn.length == 0 || aColumn[0] == null || (aColumn[0] != null && aColumn[0] instanceof table.TableColumn))) || aColumn === null)) {
                return this.addColumn$framework_components_table_TableColumn_A(...aColumn);
            }
            else
                throw new Error('invalid overload');
        }
        /*private*/ reset() {
            this.pointer = -1;
        }
        /**
         *
         * @param {table.TableColumn} column
         */
        removeColumn(column) {
            this.columns.splice(this.columns.indexOf(column));
            this.reset();
        }
        /**
         *
         * @return {number}
         */
        getColumnCount() {
            return (this.columns.length | 0);
        }
        /**
         *
         * @return {*}
         */
        getColumns() {
            return this;
        }
        /**
         *
         * @param {*} columnIdentifier
         * @return {number}
         */
        getColumnIndex(columnIdentifier) {
            for (let index201 = 0; index201 < this.columns.length; index201++) {
                let col = this.columns[index201];
                {
                    if (col.identifier === columnIdentifier) {
                        return (this.columns.indexOf(col) | 0);
                    }
                }
            }
            return -1;
        }
        addColumn$framework_components_table_TableColumn_A(...col) {
            this.columns.push(...col);
            this.reset();
            return this;
        }
        addColumnAt(col, index) {
            const tmp = (new Array());
            for (let i = 0; i < this.columns.length; i++) {
                {
                    tmp.push(this.columns[i]);
                    if (i === index) {
                        tmp.push(col);
                    }
                }
                ;
            }
            this.columns = tmp;
            this.reset();
            return this;
        }
        /**
         *
         * @param {number} columnIndex
         * @return {table.TableColumn}
         */
        getColumn(columnIndex) {
            return this.columns[columnIndex];
        }
        /**
         *
         * @return {boolean}
         */
        hasMoreElements() {
            return ((this.pointer + 1) < this.columns.length);
        }
        /**
         *
         * @return {table.TableColumn}
         */
        nextElement() {
            this.pointer = this.pointer + 1;
            return this.columns[this.pointer];
        }
    }
    table.DefaultTableColumnModel = DefaultTableColumnModel;
    DefaultTableColumnModel["__class"] = "framework.components.table.DefaultTableColumnModel";
    DefaultTableColumnModel["__interfaces"] = ["framework.components.table.TableColumnModel", "java.util.Enumeration"];
})(table || (table = {}));
(function (table) {
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
         *
         * @return {number} The first row affected
         */
        getFirstRow() {
            return this.firstRow;
        }
        /**
         *
         * Returns the last row that changed.
         *
         * @return {number} - The last row affected
         */
        getLastRow() {
            return this.lastRow;
        }
        /**
         * Returns the column for the event.  If the return
         * value is ALL_COLUMNS; it means every column in the specified
         * rows changed.
         * @return {number} - The column index affected
         */
        getColumn() {
            return this.column;
        }
        /**
         * Returns the type of event - one of: INSERT, UPDATE and DELETE.
         *
         * @return {number} - The type of event
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
})(table || (table = {}));
var util;
(function (util) {
    class ComponentUtil {
        static visit(designable, visitor) {
            visitor.doVisit(designable);
            {
                let array203 = designable.getChildren();
                for (let index202 = 0; index202 < array203.length; index202++) {
                    let child = array203[index202];
                    {
                        ComponentUtil.visit(child, visitor);
                    }
                }
            }
        }
        static getTags(type) {
            const html5tags = (window["html5tags"]);
            const result = (new Array());
            for (let index204 = 0; index204 < html5tags.length; index204++) {
                let html5tag = html5tags[index204];
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
})(util || (util = {}));
(function (util) {
    class PropertyUtil {
        static getValue(obj, property) {
            if (obj == null) {
                return null;
            }
            const parts = property.split(".");
            let tmp = obj;
            for (let index205 = 0; index205 < parts.length; index205++) {
                let part = parts[index205];
                {
                    tmp = PropertyUtil.getValue(tmp, part);
                }
            }
            return tmp;
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
                for (let index206 = 0; index206 < kvs.length; index206++) {
                    let kv = kvs[index206];
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
})(util || (util = {}));
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
            if (this.elem_ === undefined) {
                this.elem_ = null;
            }
            this.d = new Object();
            this.setTag(tag);
            this.setName(name);
        }
        else if (((typeof name === 'string') || name === null) && tag === undefined) {
            let __args = arguments;
            let tag = __args[0];
            if (this.elem_ === undefined) {
                this.elem_ = null;
            }
            this.d = new Object();
            this.setTag(tag);
        }
        else
            throw new Error('invalid overload');
    }
    static defaultRenderer_$LI$() { if (JSContainer.defaultRenderer == null) {
        JSContainer.defaultRenderer = new api.ContainerRenderer();
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
            for (let index207 = 0; index207 < listeners.length; index207++) {
                let l = listeners[index207];
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
            let array209 = this.getChildren();
            for (let index208 = 0; index208 < array209.length; index208++) {
                let child = array209[index208];
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
        this.d["children"] = children.filter((ctn, inde, lst) => {
            return !((o1, o2) => { if (o1 && o1.equals) {
                return o1.equals(o2);
            }
            else {
                return o1 === o2;
            } })(ctn, r);
        });
        this.setRendered(false);
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
        if (this.elem_ != null) {
            return this.elem_;
        }
        const elem = api.ContainerRenderer.getElementById(this.getId());
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
     * @return {JSContainer}
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
     * @return {JSContainer}
     */
    addClass(styleClass) {
        let styles = this.getAttribute("class");
        if (styles == null) {
            styles = "";
        }
        const aStyles = styles.split(" ");
        const toAdds = styleClass.split(" ");
        let res = "";
        for (let index210 = 0; index210 < toAdds.length; index210++) {
            let toAdd = toAdds[index210];
            {
                toAdd = toAdd.trim();
                if (toAdd.length > 0) {
                    let add = true;
                    for (let index211 = 0; index211 < aStyles.length; index211++) {
                        let style = aStyles[index211];
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
        for (let index212 = 0; index212 < aStyles.length; index212++) {
            let style = aStyles[index212];
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
     * @return {JSContainer}
     */
    removeClass(cls) {
        if (cls != null && cls.trim() !== "") {
            const toremove = cls.split(" ");
            for (let index213 = 0; index213 < toremove.length; index213++) {
                let s = toremove[index213];
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
            for (let index214 = 0; index214 < classes.length; index214++) {
                let scl = classes[index214];
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
            let array216 = this.getChildren();
            for (let index215 = 0; index215 < array216.length; index215++) {
                let c = array216[index215];
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
     * @return {JSContainer}
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
     * @return {JSContainer}
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
     * @return {JSContainer}
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
     * @return {JSContainer}
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
     * @return {JSContainer}
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
     * @return {JSContainer}
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
     * @return {JSContainer}
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
            this.elem_ = null;
            {
                let array218 = this.getChildren();
                for (let index217 = 0; index217 < array218.length; index217++) {
                    let child = array218[index217];
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
        if (this.getParent() == null) {
            const nat = this.getNative();
            if (nat != null) {
                const parent = nat.parentElement;
                if (parent != null) {
                    this.render$jsweet_dom_HTMLElement(nat.parentElement);
                }
                else {
                    this.render$jsweet_dom_HTMLElement(null);
                }
            }
            else {
                this.render$jsweet_dom_HTMLElement(null);
            }
        }
        else {
            this.render$jsweet_dom_HTMLElement(this.getParent().getElement());
        }
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
     * @param {Array} lst
     * The array to check if object is present
     * @param {*} o
     * The object to check if present
     * @return {boolean} Whether is present or not
     */
    contains(lst, o) {
        return lst.indexOf(o) >= 0;
    }
    render$jsweet_dom_HTMLElement(parent) {
        let renderers = this.getRenderers();
        if (renderers.length === 0) {
            renderers.push(JSContainer.defaultRenderer_$LI$());
        }
        if (!this.contains(renderers, JSContainer.defaultRenderer_$LI$())) {
            const tmp = (new Array());
            tmp.push(JSContainer.defaultRenderer_$LI$());
            for (let index219 = 0; index219 < renderers.length; index219++) {
                let r = renderers[index219];
                {
                    tmp.push(r);
                }
            }
            renderers = tmp;
        }
        for (let index220 = 0; index220 < renderers.length; index220++) {
            let renderer = renderers[index220];
            renderer.doRender(this, parent);
        }
        {
            let array222 = this.getChildren();
            for (let index221 = 0; index221 < array222.length; index221++) {
                let child = array222[index221];
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
            for (let index223 = 0; index223 < arData.length; index223++) {
                let line = arData[index223];
                {
                    const value = line["value"];
                    this.setAttribute(value, null);
                }
            }
        }
        else {
            if (previous != null) {
                {
                    let array225 = Object.keys(previous);
                    for (let index224 = 0; index224 < array225.length; index224++) {
                        let key = array225[index224];
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
                for (let index226 = 0; index226 < arData.length; index226++) {
                    let line = arData[index226];
                    {
                        const text = line["text"];
                        const value = line["value"];
                        this.setAttribute(value, text);
                    }
                }
            }
            else {
                {
                    let array228 = Object.keys(data);
                    for (let index227 = 0; index227 < array228.length; index227++) {
                        let key = array228[index227];
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
                let array230 = parent.getAttribute("class").split(" ");
                for (let index229 = 0; index229 < array230.length; index229++) {
                    let s = array230[index229];
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
     * @return {JSContainer}
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
     * @return {JSContainer}
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
     * @return {JSContainer}
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
    /**
     *
     * @param {HTMLElement} elem
     */
    setElement(elem) {
        this.elem_ = elem;
    }
    /**
     *
     * @return {HTMLElement}
     */
    getElement() {
        return this.getNative();
    }
}
JSContainer.idCount = 0;
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
            (target => (typeof target === 'function') ? target(source, evt) : target.apply(source, evt))(this.listener);
        }
    }
    JSContainer.JSContainer$0 = JSContainer$0;
    JSContainer$0["__interfaces"] = ["framework.components.api.EventListener"];
})(JSContainer || (JSContainer = {}));
/**
 * Creates a new card layout container
 * @param {string} name - The name of the container.
 * @param {string} tag - The tag of the container
 * @class
 * @extends JSContainer
 * @author Kureem Rossaye
 */
class CardLayout extends JSContainer {
    constructor(name, tag) {
        super(name, tag);
        this.currentActive = "";
        this.currentIndex = 0;
    }
    /**
     * Adds a {@link CardLayoutItem} to this container.
     * @param {CardLayoutItem} item - The item to add
     * @return {CardLayout} - this
     */
    addItem(item) {
        this.addChild$framework_components_api_Renderable(item);
        if (this.getChildren().length > 1) {
            item.setStyle("display", "none");
        }
        return this;
    }
    /**
     * Adds  {@link CardLayoutItem}s to this container.
     * @param {framework.components.CardLayoutItem[]} items - The items to add
     * @return {CardLayout} - this
     */
    addItems(...items) {
        for (let index231 = 0; index231 < items.length; index231++) {
            let item = items[index231];
            {
                this.addItem(item);
            }
        }
        return this;
    }
    /**
     *
     * @return {number} - The index of the currently active (visible) {@link CardLayoutItem} of this container
     */
    getCurrentIndex() {
        return this.currentIndex;
    }
    /**
     * Search and return the {@link CardLayoutItem} having the specified index
     * @param {number} index - The index of the {@link CardLayoutItem} searching for
     * @return {CardLayoutItem} - The {@link CardLayoutItem} item having specified index
     */
    getItem(index) {
        if (index < this.getChildren().length) {
            return this.getChildren()[index];
        }
        else {
            return null;
        }
    }
    /**
     * Searches for the {@link CardLayoutItem} having specified name, and returns its index.
     * @param {string} name - The name of {@link CardLayoutItem} searching for
     * @return {number} - The index of the {@link CardLayoutItem} having name specified
     *
     */
    getIndex(name) {
        let index = 0;
        {
            let array233 = this.getChildren();
            for (let index232 = 0; index232 < array233.length; index232++) {
                let child = array233[index232];
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
    /**
     * Activates the next {@link CardLayoutItem} of this container, and setting the specified object as payload<br>
     * The previous Event will be activated<br>
     *
     * will return null and do nothing if currently the last item is active.
     * @param {jsweet.lang.Object[]} params - The payload to set to the next {@link CardLayoutItem} being activated
     * @return {CardLayoutItem} - The {@link CardLayoutItem} being activated.
     */
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
    /**
     * Activates the previous {@link CardLayoutItem} of this container, and setting the specified object as payload<br>
     * will return null and do nothing if currently the first item is active.
     * @param {jsweet.lang.Object[]} params - The payload to set to the next {@link CardLayoutItem} being activated
     * @return {CardLayoutItem} - The {@link CardLayoutItem} being activated.
     */
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
    /**
     * Activates the previous {@link CardLayoutItem} of this container, and setting the specified object as payload<br>
     * will return null and do nothing if currently the first item is active.
     * @param {jsweet.lang.Object[]} params - The payload to set to the next {@link CardLayoutItem} being activated
     * @return {CardLayoutItem} - The {@link CardLayoutItem} being activated.
     */
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
        const def = this.getAttribute("default");
        if (def == null || def === "") {
            if (this.getChildren().length > 0) {
                return this.getChildren()[0].getName();
            }
            else {
                return null;
            }
        }
        else {
            return def;
        }
    }
    activate(name, ...params) {
        if (name === this.currentActive && this.currentIndex >= 0) {
            return;
        }
        {
            let array235 = this.getChildren();
            for (let index234 = 0; index234 < array235.length; index234++) {
                let child = array235[index234];
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
    refresh() {
        const def = this.getDefault();
        {
            let array237 = this.getChildren();
            for (let index236 = 0; index236 < array237.length; index236++) {
                let r = array237[index236];
                {
                    if (r.getName() === def) {
                        r.setStyle("display", null);
                    }
                    else {
                        r.setStyle("display", "none");
                    }
                }
            }
        }
    }
}
CardLayout["__class"] = "framework.components.CardLayout";
CardLayout["__interfaces"] = ["framework.components.api.Renderable"];
/**
 * Instantiate a {@link CardLayoutItem} with specified name and tag
 * @param {string} name - name of item
 * @param {string} tag - tag of item
 * @class
 * @extends JSContainer
 * @author Kureem Rossaye
 */
class CardLayoutItem extends JSContainer {
    constructor(name, tag) {
        super(name, tag);
    }
    /**
     * returns array of specific supported events
     * @return {java.lang.String[]}
     */
    advancedEventTypes() {
        return ["activate", "deactivate", "validate"];
    }
}
CardLayoutItem["__class"] = "framework.components.CardLayoutItem";
CardLayoutItem["__interfaces"] = ["framework.components.api.Renderable"];
/**
 * Instantiate this container with the specified name
 * @param {string} name - name of container
 * @class
 * @extends JSContainer
 * @author Kureem Rossaye
 */
class ExternalJavascript extends JSContainer {
    constructor(name) {
        super(name, "script");
        this.setAttribute("type", "text/javascript");
    }
    /**
     * Sets the source of the external javascript
     * @param {string} src - source of file
     * @return {ExternalJavascript} - this
     */
    setSource(src) {
        this.setAttribute("src", src);
        return this;
    }
}
ExternalJavascript["__class"] = "framework.components.ExternalJavascript";
ExternalJavascript["__interfaces"] = ["framework.components.api.Renderable"];
/**
 * External this external stylesheet container with the specified name
 * @param {string} name - the name of the container
 * @class
 * @extends JSContainer
 * @author Kureem Rossaye
 */
class ExternalStylesheet extends JSContainer {
    constructor(name) {
        super(name, "link");
        this.setAttribute("type", "text/css");
        this.setAttribute("rel", "stylesheet");
        this.addRenderer(this);
    }
    /**
     * Sets the source of the external css file and returns the updated instance
     * @param {string} src - source of external css file
     * @return {ExternalStylesheet} - updated instance of this
     */
    setSource(src) {
        this.setAttribute("source", src);
        return this;
    }
    /**
     * Sets the cross origin value of the css file
     * @param {string} origin - cross origin value
     * @return {ExternalStylesheet} - updated instance of this
     */
    setCrossOrigin(origin) {
        this.setAttribute("crossorigin", origin);
        return this;
    }
    /**
     * Sets the media of the css file
     * @param {string} media - the media of the css file
     * @return {ExternalStylesheet} - updated instance of this
     */
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
     * Rendered used internally which avoids rendering of the css file when the tag is used in our buider.
     * @param {ExternalStylesheet} c
     * @param {HTMLElement} root
     */
    doRender(c, root) {
        if (((c != null && c instanceof ExternalStylesheet) || c === null) && ((root != null && root instanceof HTMLElement) || root === null)) {
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
ExternalStylesheet["__class"] = "framework.components.ExternalStylesheet";
ExternalStylesheet["__interfaces"] = ["framework.components.api.Renderable", "framework.components.api.Renderer"];
/**
 * Constructs an instance of this component
 *
 * @param {string} name     The name of the component
 * @param {string} template The html template of this component
 * @class
 * @extends JSContainer
 * @author Rossaye Abdool Kureem
 */
class HTMLTemplateContainer extends JSContainer {
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
                for (let index238 = 0; index238 < attrs.length; index238++) {
                    let att = attrs[index238];
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
    static invokeFunction(target, _function, ...args) {
        if (target.hasOwnProperty(_function)) {
            return (o => o.call.apply(o, [target].concat(args)))(target[_function]);
        }
        else {
            throw new Error(target + " does not contain function:" + _function);
        }
    }
}
HTMLTemplateContainer["__class"] = "framework.components.HTMLTemplateContainer";
HTMLTemplateContainer["__interfaces"] = ["framework.components.api.Renderable", "framework.components.api.TemplateRenderable"];
var input;
(function (input) {
    /**
     * Creates a new instance of the button with specified name and text
     * @param {string} name - name of the button
     * @param {string} text - text inside the button
     * @class
     * @extends JSContainer
     * @author Kureem Rossaye
     */
    class JSButton extends JSContainer {
        constructor(name, text) {
            super(name, "input");
            this.setAttribute("type", api.InputType["_$wrappers"][api.InputType.BUTTON].getValue());
            this.setAttribute("value", text);
        }
        /**
         * Sets the type of the button
         * @param {api.InputType} type - type of the button. Valid values are: InputType.RESET | InputType.BUTTON | InputType.SUBMIT
         * @return {input.JSButton} - updated instance of this Button
         */
        setType(type) {
            if (type != null) {
                if (api.InputType["_$wrappers"][type].getGroup() !== "button") {
                    throw Object.defineProperty(new Error("only button types are allowed"), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.Exception'] });
                }
                this.setAttribute("type", api.InputType["_$wrappers"][type].getValue());
            }
            else {
                throw Object.defineProperty(new Error("cannot set null value for type attribute"), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.Exception'] });
            }
            return this;
        }
    }
    input.JSButton = JSButton;
    JSButton["__class"] = "framework.components.input.JSButton";
    JSButton["__interfaces"] = ["framework.components.api.Renderable"];
})(input || (input = {}));
(function (input) {
    /**
     * Creates a new instance of form with the specified name
     * @param {string} name - The name of the form
     * @class
     * @extends JSContainer
     * @author Kureem Rossaye
     */
    class JSForm extends JSContainer {
        constructor(name) {
            super(name, "form");
            this.validationerrors = new Object();
            this.addEventListener(new JSForm.JSForm$0(this), "submit");
            this.addEventListener(new JSForm.JSForm$1(this), "reset");
        }
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
         * <li>submit         - Fired on submitting the form and if there is no error after validation</li>
         * <li>reset          - Fired when the form is reset</li>
         * </ul>
         * @return {java.lang.String[]}
         */
        advancedEventTypes() {
            return ["beforeValidate", "afterValidate", "beforeSetData", "afterSetData", "beforeGetData", "onError", "afterGetData", "beforeSubmit", "afterSubmit", "submit"];
        }
        /**
         * Return whether the form is valid of not after validating it.<br> If the form has not been validated yet,
         * this method will return true
         * @return {boolean} - Whether the form is valid or not
         */
        isValid() {
            return Object.keys(this.validationerrors).length <= 0;
        }
        /**
         * Returns whether this form has errors or not after validating it<br> If the form has not been validated yet,
         * this method will return false
         * @return {boolean} - Whether this form has errors or not
         */
        hasErrors() {
            return !this.isValid();
        }
        /**
         *
         * @param {string} binding - The name or binding of the input element in the form
         * @return {api.ValidationException} - The validation exception if any for the specified binding of the form element
         */
        getError(binding) {
            return this.validationerrors[binding];
        }
        /**
         *
         * @return {Object} - All errors found after validating this form
         */
        getErrors() {
            return this.validationerrors;
        }
        /**
         *
         * @param {string} binding - The binding or name of the input field to search for
         * @return {*} - The input field having specified name or binding
         */
        getField(binding) {
            const result = (new Array());
            util.ComponentUtil.visit(this, new JSForm.JSForm$2(this, binding, result));
            if (result.length > 0) {
                return result[0];
            }
            return null;
        }
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
        validate() {
            const evt = new CustomEvent("beforeValidate");
            evt["source"] = this;
            this.fireListener("beforeValidate", evt);
            this.validationerrors = new Object();
            util.ComponentUtil.visit(this, new JSForm.JSForm$3(this));
            if (Object.keys(this.validationerrors).length > 0) {
                const onError = new CustomEvent("onError");
                onError["source"] = this;
                onError["data"] = this.validationerrors;
                onError["errors"] = this.validationerrors;
                onError["hasError"] = Object.keys(this.validationerrors).length > 0;
                this.fireListener("onError", onError);
            }
            const evtAfter = new CustomEvent("afterValidate");
            evtAfter["source"] = this;
            evtAfter["data"] = this.validationerrors;
            evtAfter["errors"] = this.validationerrors;
            evtAfter["hasError"] = Object.keys(this.validationerrors).length > 0;
            this.fireListener("afterValidate", evtAfter);
            return Object.keys(this.validationerrors).length <= 0;
        }
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
        setData(data) {
            const evt = new CustomEvent("beforeSetData");
            evt["source"] = this;
            evt["data"] = data;
            this.fireListener("beforeSetData", evt);
            util.ComponentUtil.visit(this, new JSForm.JSForm$4(this, data));
            const evtAfter = new CustomEvent("afterSetData");
            evtAfter["source"] = this;
            evtAfter["data"] = data;
            this.fireListener("afterSetData", evtAfter);
        }
        /**
         * Retrieves data from all the fields in this form<br>
         * The following chain of event is fired when this method is called:<br>
         * <ul>
         * <li>beforeGetData</li>
         * <li>afterGetData</li>
         * </ul>
         * @return {Object} - The data from all the fields in the form
         */
        getData() {
            const evt = new CustomEvent("beforeGetData");
            evt["source"] = this;
            this.fireListener("beforeGetData", evt);
            const data = new Object();
            util.ComponentUtil.visit(this, new JSForm.JSForm$5(this, data));
            const evtAfter = new CustomEvent("afterGetData");
            evtAfter["source"] = this;
            evtAfter["data"] = data;
            this.fireListener("afterGetData", evtAfter);
            return data;
        }
        /**
         * Resets the form by clearing all the fields in the form<br>
         * This method is called automatically when the form is reset for example by clicking an input of type reset present in the form<br>
         * or by resetting it using javascript means.<br>
         * The reset event is fired when this method is called
         *
         */
        reset() {
            const data = new Object();
            this.setData(data);
            const on = new CustomEvent("reset");
            on["source"] = this;
            on["data"] = data;
            this.fireListener("reset", on);
        }
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
         * <li>if form is valid submit event is fired</li>
         * <li>Whether or not form is valid, afterSubmit event is fired</li>
         * </ul>
         *
         */
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
    input.JSForm = JSForm;
    JSForm["__class"] = "framework.components.input.JSForm";
    JSForm["__interfaces"] = ["framework.components.api.Renderable"];
    (function (JSForm) {
        class JSForm$0 {
            constructor(__parent) {
                this.__parent = __parent;
            }
            /**
             *
             * @param {*} source
             * @param {Event} evt
             */
            performAction(source, evt) {
                this.__parent.submit();
            }
        }
        JSForm.JSForm$0 = JSForm$0;
        JSForm$0["__interfaces"] = ["framework.components.api.EventListener"];
        class JSForm$1 {
            constructor(__parent) {
                this.__parent = __parent;
            }
            /**
             *
             * @param {*} source
             * @param {Event} evt
             */
            performAction(source, evt) {
                this.__parent.reset();
            }
        }
        JSForm.JSForm$1 = JSForm$1;
        JSForm$1["__interfaces"] = ["framework.components.api.EventListener"];
        class JSForm$2 {
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
        JSForm.JSForm$2 = JSForm$2;
        JSForm$2["__interfaces"] = ["framework.components.util.ComponentUtil.ComponentVisitor"];
        class JSForm$3 {
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
        JSForm.JSForm$3 = JSForm$3;
        JSForm$3["__interfaces"] = ["framework.components.util.ComponentUtil.ComponentVisitor"];
        class JSForm$4 {
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
                    if (util.PropertyUtil.hasOwnProperty(this.data, binding)) {
                        const obj = util.PropertyUtil.getValue(this.data, binding);
                        if (designable != null && designable instanceof input.JSDateInput) {
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
        JSForm.JSForm$4 = JSForm$4;
        JSForm$4["__interfaces"] = ["framework.components.util.ComponentUtil.ComponentVisitor"];
        class JSForm$5 {
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
                    util.PropertyUtil.setValue(this.data, value, binding);
                }
            }
        }
        JSForm.JSForm$5 = JSForm$5;
        JSForm$5["__interfaces"] = ["framework.components.util.ComponentUtil.ComponentVisitor"];
    })(JSForm = input.JSForm || (input.JSForm = {}));
})(input || (input = {}));
(function (input) {
    class JSInput extends JSContainer {
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
         * @param {api.ValidationException} e
         * The validation exception to add to error context
         * @return {api.ValidationException} The current instance of the {@link ValidationException}
         */
        static addError(msg, state, e) {
            if (!state.valid) {
                if (state.badInput) {
                    api.ValidationException.addError(msg, api.ValidationException.badInput, e);
                }
                else if (state.customError) {
                    api.ValidationException.addError(msg, api.ValidationException.customError, e);
                }
                else if (state.patternMismatch) {
                    api.ValidationException.addError(msg, api.ValidationException.patternMismatch, e);
                }
                else if (state.rangeOverflow) {
                    api.ValidationException.addError(msg, api.ValidationException.rangeOverflow, e);
                }
                else if (state.rangeUnderflow) {
                    api.ValidationException.addError(msg, api.ValidationException.rangeUnderflow, e);
                }
                else if (state.stepMismatch) {
                    api.ValidationException.addError(msg, api.ValidationException.stepMismatch, e);
                }
                else if (state.tooLong) {
                    api.ValidationException.addError(msg, api.ValidationException.tooLong, e);
                }
                else if (state.typeMismatch) {
                    api.ValidationException.addError(msg, api.ValidationException.typeMismatch, e);
                }
                else if (state.valueMissing) {
                    api.ValidationException.addError(msg, api.ValidationException.valueMissing, e);
                }
            }
            return e;
        }
        /**
         *
         */
        validate() {
            let valid = true;
            const e = new api.ValidationException();
            const nat = this.getNative();
            if (nat != null) {
                const el = nat;
                valid = el.checkValidity();
                if (!valid) {
                    JSInput.addError(el.validationMessage, el.validity, e);
                }
            }
            for (let index239 = 0; index239 < this.validators.length; index239++) {
                let v = this.validators[index239];
                {
                    const b = v.validate(this);
                    if (!b) {
                        valid = false;
                        api.ValidationException.addError(v.getErrorMessage(), api.ValidationException.customError, e);
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
        /**
         *
         * @return {*}
         */
        getValue() {
            const inp = this.getNative();
            if (inp != null)
                return inp.value;
            else
                return this.getAttribute("value");
        }
        /**
         *
         * @param {*} val
         */
        setValue(val) {
            const inp = this.getNative();
            if (inp != null)
                inp.value = val;
            this.setAttribute("text", val);
        }
    }
    input.JSInput = JSInput;
    JSInput["__class"] = "framework.components.input.JSInput";
    JSInput["__interfaces"] = ["framework.components.api.InputField", "framework.components.api.Renderable"];
})(input || (input = {}));
(function (input) {
    /**
     * Creates a new instance of {@link JSOption} with the specified text and value
     * @param {string} text - The text to display for the option
     * @param {string} value - the value of the option
     * @class
     * @extends JSContainer
     * @author Kureem Rossaye
     */
    class JSOption extends JSContainer {
        constructor(text, value) {
            super("option");
            this.setAttribute("value", value);
            this.setHtml(text);
        }
        /**
         * The value of the option
         * @return {string} - The value of the option
         */
        getValue() {
            return this.getAttribute("value");
        }
        /**
         * Sets the value of the option
         * @param {string} value - The value of the option
         */
        setValue(value) {
            this.setAttribute("value", value);
        }
        /**
         *
         * @return {string} - The text of the option
         */
        getText() {
            return this.getHtml();
        }
        /**
         * Sets the text or label of the option
         * @param {string} text - The text of the option
         */
        setText(text) {
            this.setHtml(text);
        }
        /**
         * Mark or unmark this option as selected
         * @param {boolean} b - Whether to select or not select this option
         */
        setSelected(b) {
            if (b) {
                this.setAttribute("selected", "true");
            }
            else {
                this.setAttribute("selected", null);
            }
        }
        /**
         *
         * @return {boolean} - Whether this option is selected or not
         */
        isSelected() {
            const opt = this.getNative();
            if (opt != null) {
                return opt.selected;
            }
            else {
                const attr = this.getAttribute("selected");
                if (attr != null && attr === "true") {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
    }
    input.JSOption = JSOption;
    JSOption["__class"] = "framework.components.input.JSOption";
    JSOption["__interfaces"] = ["framework.components.api.Renderable"];
})(input || (input = {}));
(function (input) {
    class JSSelect extends JSContainer {
        constructor(name) {
            super(name, "select");
            if (this.previousValue === undefined) {
                this.previousValue = null;
            }
            this.validators = (new Array());
            if (this.data === undefined) {
                this.data = null;
            }
        }
        addValidator(validator) {
            this.validators.push(validator);
        }
        setOptions$java_lang_String(options) {
            const opts = options.split("\n");
            for (let index240 = 0; index240 < opts.length; index240++) {
                let opt = opts[index240];
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
            return this.addOption$framework_components_input_JSOption(new input.JSOption(text, value));
        }
        addOption(text, value) {
            if (((typeof text === 'string') || text === null) && ((typeof value === 'string') || value === null)) {
                return this.addOption$java_lang_String$java_lang_String(text, value);
            }
            else if (((text != null && text instanceof input.JSOption) || text === null) && value === undefined) {
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
                    for (let index241 = 0; index241 < ele.children.length; index241++) {
                        let e = ele.children[index241];
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
                    let array243 = this.getChildren();
                    for (let index242 = 0; index242 < array243.length; index242++) {
                        let opt = array243[index242];
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
                    let array245 = this.getChildren();
                    for (let index244 = 0; index244 < array245.length; index244++) {
                        let opt = array245[index244];
                        {
                            opt.setSelected(false);
                            for (let index246 = 0; index246 < arrVal.length; index246++) {
                                let val = arrVal[index246];
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
                    let array248 = this.getChildren();
                    for (let index247 = 0; index247 < array248.length; index247++) {
                        let opt = array248[index247];
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
            const e = new api.ValidationException();
            const nat = this.getNative();
            if (nat != null) {
                const el = nat;
                valid = el.checkValidity();
                if (!valid) {
                    input.JSInput.addError(el.validationMessage, el.validity, e);
                }
            }
            for (let index249 = 0; index249 < this.validators.length; index249++) {
                let v = this.validators[index249];
                {
                    const b = v.validate(this);
                    if (!b) {
                        valid = false;
                        api.ValidationException.addError(v.getErrorMessage(), api.ValidationException.customError, e);
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
            for (let index250 = 0; index250 < data_.length; index250++) {
                let o = data_[index250];
                {
                    if (o.hasOwnProperty("value")) {
                        const value = o["value"];
                        const text = o["text"];
                        this.addOption$framework_components_input_JSOption(new input.JSOption(text, value));
                    }
                    else {
                        const value = o.toString();
                        const text = o.toString();
                        this.addOption$framework_components_input_JSOption(new input.JSOption(text, value));
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
                    let array252 = obj;
                    for (let index251 = 0; index251 < array252.length; index251++) {
                        let o = array252[index251];
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
                for (let index253 = 0; index253 < this.data.length; index253++) {
                    let o = this.data[index253];
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
})(input || (input = {}));
(function (input) {
    class JSTextArea extends JSContainer {
        constructor(name) {
            super(name, "textarea");
            this.validators = (new Array());
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
            const e = new api.ValidationException();
            const nat = this.getNative();
            if (nat != null) {
                const el = nat;
                valid = el.checkValidity();
                if (!valid) {
                    input.JSInput.addError(el.validationMessage, el.validity, e);
                }
            }
            for (let index254 = 0; index254 < this.validators.length; index254++) {
                let v = this.validators[index254];
                {
                    const b = v.validate(this);
                    if (!b) {
                        valid = false;
                        api.ValidationException.addError(v.getErrorMessage(), api.ValidationException.customError, e);
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
})(input || (input = {}));
(function (table) {
    /**
     * Renders a table
     *
     * @author Kureem Rossaye
     * @param {string} name
     * @class
     * @extends JSContainer
     */
    class Table extends JSContainer {
        constructor(name) {
            super(name, "table");
            this.head = new table.TableHead("head", this);
            this.body = new table.TableBody("body", this);
            this.addChild$framework_components_api_Renderable(this.head);
            this.addChild$framework_components_api_Renderable(this.body);
        }
        fireOnClickRow(row, rowIndex) {
            const clickRow = new CustomEvent("clickRow");
            clickRow["source"] = row;
            clickRow["table"] = this;
            clickRow["rowIndex"] = rowIndex;
            clickRow["index"] = rowIndex;
            this.fireListener("clickRow", clickRow);
        }
        fireOnDblClickRow(row, rowIndex) {
            const clickRow = new CustomEvent("dblClickRow");
            clickRow["source"] = row;
            clickRow["table"] = this;
            clickRow["rowIndex"] = rowIndex;
            clickRow["index"] = rowIndex;
            this.fireListener("dblClickRow", clickRow);
        }
        getHead() {
            return this.head;
        }
        getBody() {
            return this.body;
        }
        getDataModel() {
            return this.body.getModel();
        }
        setDataModel(dataModel) {
            this.body.setModel(dataModel);
        }
        getColumnModel() {
            return this.head.getModel();
        }
        setColumnModel(columnModel) {
            this.head.setModel(columnModel);
        }
        refresh() {
            this.head.refresh();
            this.body.refresh();
        }
    }
    table.Table = Table;
    Table["__class"] = "framework.components.table.Table";
    Table["__interfaces"] = ["framework.components.api.Renderable"];
})(table || (table = {}));
(function (table_1) {
    class TableBody extends JSContainer {
        constructor(name, table) {
            super(name, "tbody");
            if (this.table === undefined) {
                this.table = null;
            }
            if (this.model === undefined) {
                this.model = null;
            }
            this.table = table;
        }
        getModel() {
            return this.model;
        }
        setModel(model) {
            this.model = model;
        }
        getTable() {
            return this.table;
        }
        refresh() {
            this.clearChildren();
            this.setRendered(false);
            const columnModel = this.table.getHead().getModel();
            if (this.model != null) {
                for (let row = 0; row < this.model.getRowCount(); row++) {
                    {
                        const r = new JSContainer("", "tr");
                        r.addEventListener(new TableBody.TableBody$0(this), "click");
                        this.addChild$framework_components_api_Renderable(r);
                        for (let col = 0; col < this.model.getColumnCount(); col++) {
                            {
                                const cell = new JSContainer("", "td");
                                r.addChild$framework_components_api_Renderable(cell);
                                const val = this.model.getValueAt(row, col);
                                if (columnModel != null) {
                                    const column = columnModel.getColumn(col);
                                    column.getCellRenderer().renderComponent(this.table, cell, val, false, false, row, col);
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
        /**
         *
         * @param {*} source
         * @param {Event} evt
         */
        performAction(source, evt) {
            const index = (this.getChildren().indexOf(source) | 0);
            const me = evt;
            const type = me.type;
            if (type === "click") {
                this.table.fireOnClickRow(source, index);
            }
            else {
                this.table.fireOnDblClickRow(source, index);
            }
        }
    }
    table_1.TableBody = TableBody;
    TableBody["__class"] = "framework.components.table.TableBody";
    TableBody["__interfaces"] = ["framework.components.api.EventListener", "framework.components.api.Renderable"];
    (function (TableBody) {
        class TableBody$0 {
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
        TableBody.TableBody$0 = TableBody$0;
        TableBody$0["__interfaces"] = ["framework.components.api.EventListener"];
    })(TableBody = table_1.TableBody || (table_1.TableBody = {}));
})(table || (table = {}));
(function (table) {
    /**
     * Hold all the information for the definition of a column in a <code>Table</code>
     * @author Kureem Rossaye
     * @param {string} name
     * @class
     * @extends JSContainer
     */
    class TableColumn extends JSContainer {
        constructor(name) {
            super(name, "th");
            if (this.modelIndex === undefined) {
                this.modelIndex = 0;
            }
            if (this.identifier === undefined) {
                this.identifier = null;
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
            this.identifier = name;
            this.setAttribute("scope", "col");
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
            return this.getDimensionStyle("width");
        }
        /*private*/ setDimensionStyle(name, value) {
            this.setStyle(name, value + api.Units["_$wrappers"][api.Units.PIXEL].getDisplay());
        }
        /*private*/ getDimensionStyle(name) {
            let stWidth = this.getStyle(name);
            if (stWidth != null && stWidth.length > 0) {
                {
                    let array256 = /* Enum.values */ function () { let result = []; for (let val in api.Units) {
                        if (!isNaN(val)) {
                            result.push(parseInt(val, 10));
                        }
                    } return result; }();
                    for (let index255 = 0; index255 < array256.length; index255++) {
                        let u = array256[index255];
                        {
                            stWidth = /* replace */ stWidth.split(api.Units["_$wrappers"][u].getDisplay()).join("");
                        }
                    }
                }
                return /* parseInt */ parseInt(stWidth);
            }
            return null;
        }
        setWidth(width) {
            this.setDimensionStyle("width", width);
        }
        getMinWidth() {
            return this.getDimensionStyle("min-width");
        }
        setMinWidth(minWidth) {
            this.setDimensionStyle("min-width", minWidth);
        }
        getMaxWidth() {
            return this.getDimensionStyle("max-width");
        }
        setMaxWidth(maxWidth) {
            this.setDimensionStyle("max-width", maxWidth);
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
            let html = "";
            if (headerValue != null) {
                html = headerValue.toString();
            }
            this.setHtml(html);
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
    TableColumn["__interfaces"] = ["framework.components.api.Renderable"];
})(table || (table = {}));
(function (table_2) {
    class TableHead extends JSContainer {
        constructor(name, table) {
            super(name, "thead");
            this.tableRow = new JSContainer("headerRow", "tr");
            if (this.table === undefined) {
                this.table = null;
            }
            if (this.model_ === undefined) {
                this.model_ = null;
            }
            this.addChild$framework_components_api_Renderable(this.tableRow);
            this.table = table;
        }
        addColumn(column) {
            this.tableRow.addChild$framework_components_api_Renderable(column);
            const renderer = column.getHeaderRenderer();
            if (renderer != null) {
                renderer.renderComponent(this.table, column, column, false, false, -1, (this.tableRow.getChildren().indexOf(column) | 0));
            }
            return this;
        }
        refresh() {
            this.tableRow.clearChildren();
            this.tableRow.setRendered(false);
            if (this.model_ != null) {
                for (let i = 0; i < this.model_.getColumnCount(); i++) {
                    {
                        const column = this.model_.getColumn(i);
                        this.addColumn(column);
                    }
                    ;
                }
            }
        }
        getModel() {
            return this.model_;
        }
        setModel(model) {
            this.model_ = model;
        }
        getColumns() {
            const result = this.tableRow.getChildren();
            return result;
        }
    }
    table_2.TableHead = TableHead;
    TableHead["__class"] = "framework.components.table.TableHead";
    TableHead["__interfaces"] = ["framework.components.api.Renderable"];
})(table || (table = {}));
(function (input) {
    /**
     * Creates a new instance of reset button with specified name and text
     * @param {string} name - name of the reset button
     * @param {string} text - text inside the reset button
     * @class
     * @extends input.JSButton
     * @author Kureem Rossaye
     */
    class JSReset extends input.JSButton {
        constructor(name, text) {
            super(name, text);
            this.setType(api.InputType.RESET);
        }
    }
    input.JSReset = JSReset;
    JSReset["__class"] = "framework.components.input.JSReset";
    JSReset["__interfaces"] = ["framework.components.api.Renderable"];
})(input || (input = {}));
(function (input) {
    /**
     * Instantiate a submit button with specified name and text
     * @param {string} name - name of button
     * @param {string} text - text of the button
     * @class
     * @extends input.JSButton
     * @author Kureem Rossaye
     */
    class JSSubmit extends input.JSButton {
        constructor(name, text) {
            super(name, text);
            this.setType(api.InputType.SUBMIT);
        }
    }
    input.JSSubmit = JSSubmit;
    JSSubmit["__class"] = "framework.components.input.JSSubmit";
    JSSubmit["__interfaces"] = ["framework.components.api.Renderable"];
})(input || (input = {}));
(function (input) {
    class JSCheckBox extends input.JSInput {
        constructor(name) {
            super(name);
            this.setAttribute("type", api.InputType["_$wrappers"][api.InputType.CHECKBOX].getValue());
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
            else if (((b != null) || b === null)) {
                super.setValue(b);
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
})(input || (input = {}));
(function (input) {
    class JSDateInput extends input.JSInput {
        constructor(name) {
            super(name);
            this.setType(api.InputType.DATE);
            this.addEventListener(new JSDateInput.JSDateInput$0(this), "change");
        }
        setType(type) {
            if (type != null) {
                if (api.InputType["_$wrappers"][type].getGroup() !== "date") {
                    throw Object.defineProperty(new Error("only date types are allowed"), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.Exception'] });
                }
                this.setAttribute("type", api.InputType["_$wrappers"][type].getValue());
            }
            else {
                throw Object.defineProperty(new Error("cannot set null value for type attribute"), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.Exception'] });
            }
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
            else if (((val != null) || val === null)) {
                super.setValue(val);
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
})(input || (input = {}));
(function (input) {
    class JSNumberInput extends input.JSInput {
        constructor(name) {
            super(name);
            this.setType(api.InputType.NUMBER);
        }
        setType(type) {
            if (type != null) {
                if (api.InputType["_$wrappers"][type].getGroup() !== "number") {
                    throw Object.defineProperty(new Error("only numeric types are allowed"), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.Exception'] });
                }
                this.setAttribute("type", api.InputType["_$wrappers"][type].getValue());
            }
            else {
                throw Object.defineProperty(new Error("cannot set null value for type attribute"), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.Exception'] });
            }
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
            else if (((val != null) || val === null)) {
                super.setValue(val);
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
})(input || (input = {}));
(function (input) {
    class JSTextInput extends input.JSInput {
        constructor(name) {
            super(name);
            this.setType(api.InputType.TEXT);
        }
        setMaxLength(length) {
            this.setAttribute("maxlength", length + "");
        }
        setType(type) {
            if (type != null) {
                if (api.InputType["_$wrappers"][type].getGroup() === "text") {
                    this.setAttribute("type", api.InputType["_$wrappers"][type].getValue());
                }
                else {
                    throw Object.defineProperty(new Error("only text input types can be set as type"), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.Exception'] });
                }
            }
            else {
                this.setAttribute("type", null);
            }
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
            else if (((val != null) || val === null)) {
                super.setValue(val);
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
})(input || (input = {}));
(function (input) {
    class JSTimeInput extends input.JSInput {
        constructor(name) {
            super(name);
            this.savedDate = new Date();
            this.setAttribute("type", api.InputType["_$wrappers"][api.InputType.TIME].getValue());
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
            else if (((val != null) || val === null)) {
                super.setValue(val);
            }
            else
                throw new Error('invalid overload');
        }
    }
    input.JSTimeInput = JSTimeInput;
    JSTimeInput["__class"] = "framework.components.input.JSTimeInput";
    JSTimeInput["__interfaces"] = ["framework.components.api.InputField", "framework.components.api.Renderable"];
})(input || (input = {}));
(function (input) {
    class JSRadio extends input.JSCheckBox {
        constructor(name) {
            super(name);
            this.setAttribute("type", api.InputType["_$wrappers"][api.InputType.RADIO].getValue());
        }
    }
    input.JSRadio = JSRadio;
    JSRadio["__class"] = "framework.components.input.JSRadio";
    JSRadio["__interfaces"] = ["framework.components.api.InputField", "framework.components.api.Renderable"];
})(input || (input = {}));
JSContainer.defaultRenderer_$LI$();
