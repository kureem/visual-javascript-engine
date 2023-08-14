<<<<<<< HEAD:src/main/resources/META-INF/resources/webjars/engine/1.0.0-SNAPSHOT/bundle.js
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
=======
/*
 * Copyright 2012-2019 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var api;
(function (api) {
    class ContainerRenderer {
        constructor() {
        }
        static getElementById(id) {
            return document.getElementById(id);
        }
        decorate(renderable) {
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
                let njq = null;
                if (tag === "svg") {
                    njq = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                }
                else {
                    njq = document.createElement(tag);
                }
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
                        const toreplace = elem.querySelector("[name=" + name + "]");
                        if (toreplace != null) {
                            toreplace.parentElement.replaceChild(njq, toreplace);
                        }
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
<<<<<<< HEAD
                for (let index121 = 0; index121 < scripts.length; index121++) {
                    let scr = scripts[index121];
=======
                for (let index186 = 0; index186 < scripts.length; index186++) {
                    let scr = scripts[index186];
>>>>>>> 22406dddccff80f7ba3312f225059ce74aa76c42
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
<<<<<<< HEAD
            for (let index122 = 0; index122 < keys.length; index122++) {
                let key = keys[index122];
=======
            for (let index187 = 0; index187 < keys.length; index187++) {
                let key = keys[index187];
>>>>>>> 22406dddccff80f7ba3312f225059ce74aa76c42
                {
                    const listeners = c.getListeners()[key];
                    njq.addEventListener(key, ((listeners) => {
                        return (evt) => {
<<<<<<< HEAD
                            for (let index123 = 0; index123 < listeners.length; index123++) {
                                let l = listeners[index123];
=======
                            for (let index188 = 0; index188 < listeners.length; index188++) {
                                let l = listeners[index188];
>>>>>>> 22406dddccff80f7ba3312f225059ce74aa76c42
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
<<<<<<< HEAD
                    let array125 = c.getChangedAttributes();
                    for (let index124 = 0; index124 < array125.length; index124++) {
                        let key = array125[index124];
=======
                    let array190 = c.getChangedAttributes();
                    for (let index189 = 0; index189 < array190.length; index189++) {
                        let key = array190[index189];
>>>>>>> 22406dddccff80f7ba3312f225059ce74aa76c42
                        {
                            const attr = c.getAttribute(key);
                            if (attr == null) {
                                njq.removeAttribute(key);
>>>>>>> 397d0857239819c5511f298d8b42d80ea904d52a:src/main/resources/META-INF/resources/webjars/engine/1.0.2-SNAPSHOT/bundle.js
                            }
                            else {
                                root.appendChild(njq);
                            }
                        }
<<<<<<< HEAD:src/main/resources/META-INF/resources/webjars/engine/1.0.0-SNAPSHOT/bundle.js
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
=======
                    }
                }
            }
            else {
                {
<<<<<<< HEAD
                    let array127 = c.getAttributeNames();
                    for (let index126 = 0; index126 < array127.length; index126++) {
                        let key = array127[index126];
=======
                    let array192 = c.getAttributeNames();
                    for (let index191 = 0; index191 < array192.length; index191++) {
                        let key = array192[index191];
>>>>>>> 22406dddccff80f7ba3312f225059ce74aa76c42
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
<<<<<<< HEAD
                    let array129 = c.getChangedStyles();
                    for (let index128 = 0; index128 < array129.length; index128++) {
                        let key = array129[index128];
=======
                    let array194 = c.getChangedStyles();
                    for (let index193 = 0; index193 < array194.length; index193++) {
                        let key = array194[index193];
>>>>>>> 22406dddccff80f7ba3312f225059ce74aa76c42
                        {
                            njq.style.setProperty(key, c.getStyle(key));
                        }
                    }
                }
            }
            else {
                {
<<<<<<< HEAD
                    let array131 = c.getStyleNames();
                    for (let index130 = 0; index130 < array131.length; index130++) {
                        let key = array131[index130];
=======
                    let array196 = c.getStyleNames();
                    for (let index195 = 0; index195 < array196.length; index195++) {
                        let key = array196[index195];
>>>>>>> 22406dddccff80f7ba3312f225059ce74aa76c42
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
<<<<<<< HEAD
                for (let index132 = 0; index132 < rules.length; index132++) {
                    let rule = rules[index132];
=======
                for (let index197 = 0; index197 < rules.length; index197++) {
                    let rule = rules[index197];
>>>>>>> 22406dddccff80f7ba3312f225059ce74aa76c42
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
    InputType["__interfaces"] = ["java.lang.Comparable", "java.io.Serializable"];
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
    Units["__interfaces"] = ["java.lang.Comparable", "java.io.Serializable"];
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
                super(message);
                if (this.code === undefined) {
                    this.code = 0;
                }
                this.errors = (new Array());
                this.code = errorCode;
            }
            else if (((typeof message === 'number') || message === null) && errorCode === undefined) {
                let __args = arguments;
                let errorCode = __args[0];
                super();
                if (this.code === undefined) {
                    this.code = 0;
                }
                this.errors = (new Array());
                this.code = errorCode;
            }
            else if (message === undefined && errorCode === undefined) {
                let __args = arguments;
                super();
                if (this.code === undefined) {
                    this.code = 0;
                }
                this.errors = (new Array());
            }
            else
                throw new Error('invalid overload');
        }
        static throwError$java_lang_String$int(msg, code) {
            throw new ValidationException(msg, code);
        }
        static throwError$java_lang_String$jsweet_dom_ValidityState(msg, state) {
            if (!state.valid) {
                if (state.badInput) {
                    ValidationException.throwError$java_lang_String$int(msg, ValidationException.badInput);
                }
                else if (state.customError) {
                    ValidationException.throwError$java_lang_String$int(msg, ValidationException.customError);
                }
                else if (state.patternMismatch) {
                    ValidationException.throwError$java_lang_String$int(msg, ValidationException.patternMismatch);
                }
                else if (state.rangeOverflow) {
                    ValidationException.throwError$java_lang_String$int(msg, ValidationException.rangeOverflow);
                }
                else if (state.rangeUnderflow) {
                    ValidationException.throwError$java_lang_String$int(msg, ValidationException.rangeUnderflow);
                }
                else if (state.stepMismatch) {
                    ValidationException.throwError$java_lang_String$int(msg, ValidationException.stepMismatch);
                }
                else if (state.tooLong) {
                    ValidationException.throwError$java_lang_String$int(msg, ValidationException.tooLong);
                }
                else if (state.typeMismatch) {
                    ValidationException.throwError$java_lang_String$int(msg, ValidationException.typeMismatch);
                }
                else if (state.valueMissing) {
                    ValidationException.throwError$java_lang_String$int(msg, ValidationException.valueMissing);
                }
            }
        }
        static throwError(msg, state) {
            if (((typeof msg === 'string') || msg === null) && ((state != null && state instanceof ValidityState) || state === null)) {
                return api.ValidationException.throwError$java_lang_String$jsweet_dom_ValidityState(msg, state);
            }
            else if (((typeof msg === 'string') || msg === null) && ((typeof state === 'number') || state === null)) {
                return api.ValidationException.throwError$java_lang_String$int(msg, state);
            }
            else
                throw new Error('invalid overload');
        }
        getCode() {
            return this.code;
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
     * Is a <code>Numeric</code> indicating the value less than the specified
     * <code>minlength</code> for {@link JSTextInput}
     * component.
     * <em><strong>Note:</strong> This will never be <code>true</code> in Gecko,
     * because elements' values are prevented from being shorter than
     * <code>minlength</code>.</em>
     */
    ValidationException.tooShort = 9;
    /**
     *
     */
    ValidationException.serialVersionUID = 1;
    api.ValidationException = ValidationException;
    ValidationException["__class"] = "framework.components.api.ValidationException";
    ValidationException["__interfaces"] = ["java.io.Serializable"];
})(api || (api = {}));
<<<<<<< HEAD
class CastaApplication {
    constructor(name) {
        this.ui = new JSCastaContainer();
        window[name] = this;
        this.init(name);
    }
    init(name) {
        let url = "castafiore/?casta_applicationid=" + name;
        const curUrl = window.location.href;
        if ( /* contains */(curUrl.indexOf("?") != -1)) {
            const params = curUrl.split("?")[1];
            url = url + params;
        }
        const xhr = new XMLHttpRequest();
        const fd = new FormData();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        xhr.onreadystatechange = ((xhr) => {
            return (e) => {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    const val = JSON.parse(xhr.responseText);
                    this.ui.setVal(val["ui"]);
                    let root = document.getElementById("app_" + name);
                    if (root == null) {
                        root = document.createElement("div");
                        root.setAttribute("id", "app_" + name);
                        document.body.appendChild(root);
                    }
                    this.ui.render$jsweet_dom_HTMLElement(root);
                }
                return e;
            };
        })(xhr);
        xhr.send(fd);
    }
}
CastaApplication["__class"] = "framework.components.CastaApplication";
class CastaUtil {
    static setVal(val, c) {
        const rendered = val["rendered"];
        const styles = val["styles"];
        const attrs = val["attributes"];
        const uid = val["id"];
        if (!rendered) {
            c.setRendered(false);
            c.setId(uid);
            const tag = val["tagName"];
            c.setTag(tag);
            const isTemplate = val["isTemplate"];
            if (isTemplate) {
                const template = val["html"];
                c.setTemplate(template);
            }
            else {
                c.setHtml(val["text"]);
            }
            c.setName(val["name"]);
            const events = val["events"];
            const listeners = c.getListeners();
            {
                let array134 = Object.keys(listeners);
                for (let index133 = 0; index133 < array134.length; index133++) {
                    let key = array134[index133];
                    {
                        delete listeners[key];
                    }
                }
            }
            {
                let array136 = Object.keys(events);
                for (let index135 = 0; index135 < array136.length; index135++) {
                    let event = array136[index135];
                    {
                        const js = events[event];
                        c.addEventListener(new CastaUtil.CastaUtil$0(js), event);
                    }
                }
            }
        }
        {
            let array138 = Object.keys(styles);
            for (let index137 = 0; index137 < array138.length; index137++) {
                let style = array138[index137];
                {
                    c.setStyle(style, styles[style]);
                }
            }
        }
        {
            let array140 = Object.keys(attrs);
            for (let index139 = 0; index139 < array140.length; index139++) {
                let attr = array140[index139];
                {
                    c.setAttribute(attr, attrs[attr]);
                }
            }
        }
        const children = val["children"];
        let index = 0;
        for (let index141 = 0; index141 < children.length; index141++) {
            let child = children[index141];
            {
                const id = child["id"];
                const isTemplate = child["isTemplate"];
                let ch = CastaUtil.getChildById(c, id);
                if (ch == null) {
                    if (isTemplate) {
                        ch = new JSCastaTemplateContainer();
                    }
                    else {
                        ch = new JSCastaContainer();
                    }
                    if (c.getChildren().length > index) {
                        c.addChild(ch);
                    }
                    else {
                        c.addChildAt(index, ch);
                    }
                }
                CastaUtil.setVal(child, ch);
                index++;
            }
        }
    }
    static getChildById(p, id) {
        {
            let array143 = p.getChildren();
            for (let index142 = 0; index142 < array143.length; index142++) {
                let r = array143[index142];
                {
                    if (r.getId() === id) {
                        return r;
                    }
                }
            }
        }
        return null;
    }
}
CastaUtil["__class"] = "framework.components.CastaUtil";
(function (CastaUtil) {
    class CastaUtil$0 {
        constructor(js) {
            this.js = js;
        }
        /**
         *
         * @param {*} source
         * @param {Event} evt
         */
        performAction(source, evt) {
            eval(this.js);
        }
    }
    CastaUtil.CastaUtil$0 = CastaUtil$0;
    CastaUtil$0["__interfaces"] = ["framework.components.api.EventListener"];
})(CastaUtil || (CastaUtil = {}));
=======
>>>>>>> 22406dddccff80f7ba3312f225059ce74aa76c42
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
<<<<<<< HEAD
            for (let index144 = 0; index144 < this.columns.length; index144++) {
                let col = this.columns[index144];
=======
            for (let index198 = 0; index198 < this.columns.length; index198++) {
                let col = this.columns[index198];
>>>>>>> 22406dddccff80f7ba3312f225059ce74aa76c42
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
<<<<<<< HEAD
                let array146 = designable.getChildren();
                for (let index145 = 0; index145 < array146.length; index145++) {
                    let child = array146[index145];
=======
                let array200 = designable.getChildren();
                for (let index199 = 0; index199 < array200.length; index199++) {
                    let child = array200[index199];
>>>>>>> 22406dddccff80f7ba3312f225059ce74aa76c42
                    {
                        ComponentUtil.visit(child, visitor);
                    }
                }
            }
        }
        static getTags(type) {
            const html5tags = (window["html5tags"]);
            const result = (new Array());
<<<<<<< HEAD
            for (let index147 = 0; index147 < html5tags.length; index147++) {
                let html5tag = html5tags[index147];
=======
            for (let index201 = 0; index201 < html5tags.length; index201++) {
                let html5tag = html5tags[index201];
>>>>>>> 22406dddccff80f7ba3312f225059ce74aa76c42
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
            if (!(property.indexOf(".") != -1)) {
                return obj[property];
            }
            const parts = property.split(".");
            let tmp = obj;
<<<<<<< HEAD
            for (let index148 = 0; index148 < parts.length; index148++) {
                let part = parts[index148];
=======
            for (let index202 = 0; index202 < parts.length; index202++) {
                let part = parts[index202];
>>>>>>> 22406dddccff80f7ba3312f225059ce74aa76c42
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
<<<<<<< HEAD
                for (let index149 = 0; index149 < kvs.length; index149++) {
                    let kv = kvs[index149];
=======
                for (let index203 = 0; index203 < kvs.length; index203++) {
                    let kv = kvs[index203];
>>>>>>> 22406dddccff80f7ba3312f225059ce74aa76c42
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
        const listeners = this.getListeners()[key];
        if (listeners != null && listeners.length > 0) {
<<<<<<< HEAD
            for (let index150 = 0; index150 < listeners.length; index150++) {
                let l = listeners[index150];
=======
            for (let index204 = 0; index204 < listeners.length; index204++) {
                let l = listeners[index204];
>>>>>>> 22406dddccff80f7ba3312f225059ce74aa76c42
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
<<<<<<< HEAD
            let array152 = this.getChildren();
            for (let index151 = 0; index151 < array152.length; index151++) {
                let child = array152[index151];
=======
            let array206 = this.getChildren();
            for (let index205 = 0; index205 < array206.length; index205++) {
                let child = array206[index205];
>>>>>>> 22406dddccff80f7ba3312f225059ce74aa76c42
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
     * A secret value known by the implementor of the framework. This
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
<<<<<<< HEAD
        for (let index153 = 0; index153 < toAdds.length; index153++) {
            let toAdd = toAdds[index153];
=======
        for (let index207 = 0; index207 < toAdds.length; index207++) {
            let toAdd = toAdds[index207];
>>>>>>> 22406dddccff80f7ba3312f225059ce74aa76c42
            {
                toAdd = toAdd.trim();
                if (toAdd.length > 0) {
                    let add = true;
<<<<<<< HEAD
                    for (let index154 = 0; index154 < aStyles.length; index154++) {
                        let style = aStyles[index154];
=======
                    for (let index208 = 0; index208 < aStyles.length; index208++) {
                        let style = aStyles[index208];
>>>>>>> 22406dddccff80f7ba3312f225059ce74aa76c42
                        {
                            style = style.trim();
                            if (style.length > 0) {
                                if (style.trim() === toAdd) {
                                    add = false;
>>>>>>> 397d0857239819c5511f298d8b42d80ea904d52a:src/main/resources/META-INF/resources/webjars/engine/1.0.2-SNAPSHOT/bundle.js
                                }
                            }
                        }
                    }
<<<<<<< HEAD:src/main/resources/META-INF/resources/webjars/engine/1.0.0-SNAPSHOT/bundle.js
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
=======
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
<<<<<<< HEAD
        for (let index155 = 0; index155 < aStyles.length; index155++) {
            let style = aStyles[index155];
=======
        for (let index209 = 0; index209 < aStyles.length; index209++) {
            let style = aStyles[index209];
>>>>>>> 22406dddccff80f7ba3312f225059ce74aa76c42
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
<<<<<<< HEAD
            for (let index156 = 0; index156 < toremove.length; index156++) {
                let s = toremove[index156];
=======
            for (let index210 = 0; index210 < toremove.length; index210++) {
                let s = toremove[index210];
>>>>>>> 22406dddccff80f7ba3312f225059ce74aa76c42
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
<<<<<<< HEAD
            for (let index157 = 0; index157 < classes.length; index157++) {
                let scl = classes[index157];
=======
            for (let index211 = 0; index211 < classes.length; index211++) {
                let scl = classes[index211];
>>>>>>> 22406dddccff80f7ba3312f225059ce74aa76c42
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
    /**
     * Adds a {@link JSContainer} to this component with the specified tag.<br />
     * The added {@link JSContainer} will have the specified tag css class to it.<br />
     * It will also be given the specified name.
     *
     * @param {string} name The name of the {@link JSContainer} added
     *
     * @param {string} tag  The tag of the {@link JSContainer} added
     *
     * @param {string} cls  The css class to be added on the added {@link JSContainer}
     *
     * @return {JSContainer} The Updated state if the current {@link JSContainer} for chaining.
     */
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
<<<<<<< HEAD
            let array159 = this.getChildren();
            for (let index158 = 0; index158 < array159.length; index158++) {
                let c = array159[index158];
=======
            let array213 = this.getChildren();
            for (let index212 = 0; index212 < array213.length; index212++) {
                let c = array213[index212];
>>>>>>> 22406dddccff80f7ba3312f225059ce74aa76c42
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
<<<<<<< HEAD
                let array161 = this.getChildren();
                for (let index160 = 0; index160 < array161.length; index160++) {
                    let child = array161[index160];
=======
                let array215 = this.getChildren();
                for (let index214 = 0; index214 < array215.length; index214++) {
                    let child = array215[index214];
>>>>>>> 22406dddccff80f7ba3312f225059ce74aa76c42
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
<<<<<<< HEAD
            for (let index162 = 0; index162 < renderers.length; index162++) {
                let r = renderers[index162];
=======
            for (let index216 = 0; index216 < renderers.length; index216++) {
                let r = renderers[index216];
>>>>>>> 22406dddccff80f7ba3312f225059ce74aa76c42
                {
                    tmp.push(r);
                }
            }
            renderers = tmp;
        }
<<<<<<< HEAD
        for (let index163 = 0; index163 < renderers.length; index163++) {
            let renderer = renderers[index163];
            renderer.doRender(this, parent);
        }
        {
            let array165 = this.getChildren();
            for (let index164 = 0; index164 < array165.length; index164++) {
                let child = array165[index164];
=======
        for (let index217 = 0; index217 < renderers.length; index217++) {
            let renderer = renderers[index217];
            renderer.doRender(this, parent);
        }
        {
            let array219 = this.getChildren();
            for (let index218 = 0; index218 < array219.length; index218++) {
                let child = array219[index218];
>>>>>>> 22406dddccff80f7ba3312f225059ce74aa76c42
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
<<<<<<< HEAD
            for (let index166 = 0; index166 < arData.length; index166++) {
                let line = arData[index166];
=======
            for (let index220 = 0; index220 < arData.length; index220++) {
                let line = arData[index220];
>>>>>>> 22406dddccff80f7ba3312f225059ce74aa76c42
                {
                    const value = line["value"];
                    this.setAttribute(value, null);
                }
            }
        }
        else {
            if (previous != null) {
                {
<<<<<<< HEAD
                    let array168 = Object.keys(previous);
                    for (let index167 = 0; index167 < array168.length; index167++) {
                        let key = array168[index167];
=======
                    let array222 = Object.keys(previous);
                    for (let index221 = 0; index221 < array222.length; index221++) {
                        let key = array222[index221];
>>>>>>> 22406dddccff80f7ba3312f225059ce74aa76c42
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
<<<<<<< HEAD
                for (let index169 = 0; index169 < arData.length; index169++) {
                    let line = arData[index169];
=======
                for (let index223 = 0; index223 < arData.length; index223++) {
                    let line = arData[index223];
>>>>>>> 22406dddccff80f7ba3312f225059ce74aa76c42
                    {
                        const text = line["text"];
                        const value = line["value"];
                        this.setAttribute(value, text);
                    }
                }
            }
            else {
                {
<<<<<<< HEAD
                    let array171 = Object.keys(data);
                    for (let index170 = 0; index170 < array171.length; index170++) {
                        let key = array171[index170];
=======
                    let array225 = Object.keys(data);
                    for (let index224 = 0; index224 < array225.length; index224++) {
                        let key = array225[index224];
>>>>>>> 22406dddccff80f7ba3312f225059ce74aa76c42
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
<<<<<<< HEAD
                let array173 = parent.getAttribute("class").split(" ");
                for (let index172 = 0; index172 < array173.length; index172++) {
                    let s = array173[index172];
=======
                let array227 = parent.getAttribute("class").split(" ");
                for (let index226 = 0; index226 < array227.length; index226++) {
                    let s = array227[index226];
>>>>>>> 22406dddccff80f7ba3312f225059ce74aa76c42
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
 *
 * @param {string} name - The name of the container.
 * @param {string} tag  - The tag of the container
 * @class
 * @extends JSContainer
 * @author Kureem Rossaye<br>
 */
class CardLayout extends JSContainer {
    constructor(name, tag) {
        super(name, tag);
        this.currentActive = "";
        this.currentIndex = 0;
    }
    /**
     * Adds a {@link CardLayoutItem} to this container.
     *
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
     * Adds {@link CardLayoutItem}s to this container.
     *
     * @param {framework.components.CardLayoutItem[]} items - The items to add
     * @return {CardLayout} - this
     */
    addItems(...items) {
<<<<<<< HEAD
        for (let index174 = 0; index174 < items.length; index174++) {
            let item = items[index174];
=======
        for (let index228 = 0; index228 < items.length; index228++) {
            let item = items[index228];
>>>>>>> 22406dddccff80f7ba3312f225059ce74aa76c42
            {
                this.addItem(item);
            }
        }
        return this;
    }
    /**
     *
     * @return {number} - The index of the currently active (visible) {@link CardLayoutItem}
     * of this container
     */
    getCurrentIndex() {
        return this.currentIndex;
    }
    /**
     * Search and return the {@link CardLayoutItem} having the specified index
     *
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
     * Searches for the {@link CardLayoutItem} having specified name, and returns
     * its index.
     *
     * @param {string} name - The name of {@link CardLayoutItem} searching for
     *
     * @return {number} - The index of the {@link CardLayoutItem} having name specified
     */
    getIndex(name) {
        let index = 0;
        {
<<<<<<< HEAD
            let array176 = this.getChildren();
            for (let index175 = 0; index175 < array176.length; index175++) {
                let child = array176[index175];
=======
            let array230 = this.getChildren();
            for (let index229 = 0; index229 < array230.length; index229++) {
                let child = array230[index229];
>>>>>>> 22406dddccff80f7ba3312f225059ce74aa76c42
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
     * Activates the next {@link CardLayoutItem} of this container, and setting the
     * specified object as payload<br>
     * The previous Event will be activated<br>
     *
     * will return null and do nothing if currently the last item is active.
     *
     * @param {jsweet.lang.Object[]} params - The payload to set to the next {@link CardLayoutItem} being
     * activated
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
     * Activates the previous {@link CardLayoutItem} of this container, and setting
     * the specified object as payload<br>
     * will return null and do nothing if currently the first item is active.
     *
     * @param {jsweet.lang.Object[]} params - The payload to set to the next {@link CardLayoutItem} being
     * activated
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
     * Activates the previous {@link CardLayoutItem} of this container, and setting
     * the specified object as payload<br>
     * will return null and do nothing if currently the first item is active.
     *
     * @param {jsweet.lang.Object[]} params - The payload to set to the next {@link CardLayoutItem} being
     * activated
     * @return {CardLayoutItem} - The {@link CardLayoutItem} being activated.
     */
    back(...params) {
        return this.previous.apply(this, params);
    }
    /**
     * Shows the first {@link CardLayoutItem} by passing the specified parameters in
     * the event triggered when the method is called
     *
     * @param {jsweet.lang.Object[]} params The parameters that are set in the event triggered when the
     * method is called
     *
     * @return {CardLayoutItem} The current state of this component
     */
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
<<<<<<< HEAD
            let array178 = this.getChildren();
            for (let index177 = 0; index177 < array178.length; index177++) {
                let child = array178[index177];
=======
            let array232 = this.getChildren();
            for (let index231 = 0; index231 < array232.length; index231++) {
                let child = array232[index231];
>>>>>>> 22406dddccff80f7ba3312f225059ce74aa76c42
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
>>>>>>> 397d0857239819c5511f298d8b42d80ea904d52a:src/main/resources/META-INF/resources/webjars/engine/1.0.2-SNAPSHOT/bundle.js
                            }
                        }
                    }
<<<<<<< HEAD:src/main/resources/META-INF/resources/webjars/engine/1.0.0-SNAPSHOT/bundle.js
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
=======
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
<<<<<<< HEAD
            let array180 = this.getChildren();
            for (let index179 = 0; index179 < array180.length; index179++) {
                let r = array180[index179];
=======
            let array234 = this.getChildren();
            for (let index233 = 0; index233 < array234.length; index233++) {
                let r = array234[index233];
>>>>>>> 22406dddccff80f7ba3312f225059ce74aa76c42
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
<<<<<<< HEAD
                for (let index181 = 0; index181 < attrs.length; index181++) {
                    let att = attrs[index181];
=======
                for (let index235 = 0; index235 < attrs.length; index235++) {
                    let att = attrs[index235];
>>>>>>> 22406dddccff80f7ba3312f225059ce74aa76c42
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
         * <li>onSubmit         - Fired on submitting the form and if there is no error after validation</li>
         * <li>onReset          - Fired when the form is reset</li>
         * </ul>
         * @return {java.lang.String[]}
         */
        advancedEventTypes() {
            return ["beforeValidate", "afterValidate", "beforeSetData", "afterSetData", "beforeGetData", "onError", "afterGetData", "beforeSubmit", "afterSubmit", "onSubmit", "onReset"];
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
         * The onReset event is fired when this method is called
         *
         */
        reset() {
            const data = new Object();
            this.setData(data);
            const on = new CustomEvent("onReset");
            on["source"] = this;
            on["data"] = data;
            this.fireListener("onReset", on);
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
         * <li>if form is valid onSubmit event is fired</li>
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
                const on = new CustomEvent("onSubmit");
                on["source"] = this;
                on["data"] = data;
                this.fireListener("onSubmit", on);
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
         */
        validate() {
            let valid = true;
            const e = new api.ValidationException();
            const nat = this.getNative();
            if (nat != null) {
                const el = nat;
                valid = el.checkValidity();
                if (!valid) {
                    api.ValidationException.throwError$java_lang_String$jsweet_dom_ValidityState(el.validationMessage, el.validity);
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
            if (this.data === undefined) {
                this.data = null;
            }
        }
        setOptions$java_lang_String(options) {
            const opts = options.split("\n");
<<<<<<< HEAD
            for (let index182 = 0; index182 < opts.length; index182++) {
                let opt = opts[index182];
=======
            for (let index236 = 0; index236 < opts.length; index236++) {
                let opt = opts[index236];
>>>>>>> 22406dddccff80f7ba3312f225059ce74aa76c42
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
<<<<<<< HEAD
                    for (let index183 = 0; index183 < ele.children.length; index183++) {
                        let e = ele.children[index183];
=======
                    for (let index237 = 0; index237 < ele.children.length; index237++) {
                        let e = ele.children[index237];
>>>>>>> 22406dddccff80f7ba3312f225059ce74aa76c42
                        {
                            const opt = e;
                            if (opt.selected)
                                result.push(opt.value);
>>>>>>> 397d0857239819c5511f298d8b42d80ea904d52a:src/main/resources/META-INF/resources/webjars/engine/1.0.2-SNAPSHOT/bundle.js
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
<<<<<<< HEAD:src/main/resources/META-INF/resources/webjars/engine/1.0.0-SNAPSHOT/bundle.js
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
=======
            else {
                const val = this.getAttribute("value");
                {
<<<<<<< HEAD
                    let array185 = this.getChildren();
                    for (let index184 = 0; index184 < array185.length; index184++) {
                        let opt = array185[index184];
=======
                    let array239 = this.getChildren();
                    for (let index238 = 0; index238 < array239.length; index238++) {
                        let opt = array239[index238];
>>>>>>> 22406dddccff80f7ba3312f225059ce74aa76c42
                        {
                            if (opt.getAttribute("value") === val) {
                                return opt.getValue();
                            }
>>>>>>> 397d0857239819c5511f298d8b42d80ea904d52a:src/main/resources/META-INF/resources/webjars/engine/1.0.2-SNAPSHOT/bundle.js
                        }
                    }
                }
            }
<<<<<<< HEAD:src/main/resources/META-INF/resources/webjars/engine/1.0.0-SNAPSHOT/bundle.js
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
=======
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
>>>>>>> 397d0857239819c5511f298d8b42d80ea904d52a:src/main/resources/META-INF/resources/webjars/engine/1.0.2-SNAPSHOT/bundle.js
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
<<<<<<< HEAD:src/main/resources/META-INF/resources/webjars/engine/1.0.0-SNAPSHOT/bundle.js
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
=======
                    arrVal.push(values);
                }
                if (ele != null) {
                    ele.value = firstVal;
                }
                this.setAttribute("value", firstVal);
                {
<<<<<<< HEAD
                    let array187 = this.getChildren();
                    for (let index186 = 0; index186 < array187.length; index186++) {
                        let opt = array187[index186];
                        {
                            opt.setSelected(false);
                            for (let index188 = 0; index188 < arrVal.length; index188++) {
                                let val = arrVal[index188];
=======
                    let array241 = this.getChildren();
                    for (let index240 = 0; index240 < array241.length; index240++) {
                        let opt = array241[index240];
                        {
                            opt.setSelected(false);
                            for (let index242 = 0; index242 < arrVal.length; index242++) {
                                let val = arrVal[index242];
>>>>>>> 22406dddccff80f7ba3312f225059ce74aa76c42
                                {
                                    if (opt.getAttribute("value") === val) {
                                        opt.setSelected(true);
                                    }
>>>>>>> 397d0857239819c5511f298d8b42d80ea904d52a:src/main/resources/META-INF/resources/webjars/engine/1.0.2-SNAPSHOT/bundle.js
                                }
                            }
                        }
                    }
                }
            }
<<<<<<< HEAD:src/main/resources/META-INF/resources/webjars/engine/1.0.0-SNAPSHOT/bundle.js
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
=======
            else {
                {
<<<<<<< HEAD
                    let array190 = this.getChildren();
                    for (let index189 = 0; index189 < array190.length; index189++) {
                        let opt = array190[index189];
=======
                    let array244 = this.getChildren();
                    for (let index243 = 0; index243 < array244.length; index243++) {
                        let opt = array244[index243];
>>>>>>> 22406dddccff80f7ba3312f225059ce74aa76c42
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
                    api.ValidationException.throwError$java_lang_String$jsweet_dom_ValidityState(el.validationMessage, el.validity);
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
<<<<<<< HEAD
            for (let index191 = 0; index191 < data_.length; index191++) {
                let o = data_[index191];
=======
            for (let index245 = 0; index245 < data_.length; index245++) {
                let o = data_[index245];
>>>>>>> 22406dddccff80f7ba3312f225059ce74aa76c42
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
>>>>>>> 397d0857239819c5511f298d8b42d80ea904d52a:src/main/resources/META-INF/resources/webjars/engine/1.0.2-SNAPSHOT/bundle.js
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
<<<<<<< HEAD:src/main/resources/META-INF/resources/webjars/engine/1.0.0-SNAPSHOT/bundle.js
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
=======
        getSelectedItems() {
            const obj = this.getValue();
            const result = (new Array());
            if (this.isMultiple()) {
                {
<<<<<<< HEAD
                    let array193 = obj;
                    for (let index192 = 0; index192 < array193.length; index192++) {
                        let o = array193[index192];
=======
                    let array247 = obj;
                    for (let index246 = 0; index246 < array247.length; index246++) {
                        let o = array247[index246];
>>>>>>> 22406dddccff80f7ba3312f225059ce74aa76c42
                        {
                            const item = this.findItem(o);
>>>>>>> 397d0857239819c5511f298d8b42d80ea904d52a:src/main/resources/META-INF/resources/webjars/engine/1.0.2-SNAPSHOT/bundle.js
                            if (item != null) {
                                result.push(item);
                            }
                        }
                    }
                    return result;
                }
<<<<<<< HEAD:src/main/resources/META-INF/resources/webjars/engine/1.0.0-SNAPSHOT/bundle.js
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
=======
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
<<<<<<< HEAD
                for (let index194 = 0; index194 < this.data.length; index194++) {
                    let o = this.data[index194];
=======
                for (let index248 = 0; index248 < this.data.length; index248++) {
                    let o = this.data[index248];
>>>>>>> 22406dddccff80f7ba3312f225059ce74aa76c42
                    {
                        let val = o["value"];
                        val = val + "";
                        const comp = value + "";
                        if (val != null && (val === comp)) {
                            return o;
>>>>>>> 397d0857239819c5511f298d8b42d80ea904d52a:src/main/resources/META-INF/resources/webjars/engine/1.0.2-SNAPSHOT/bundle.js
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
<<<<<<< HEAD:src/main/resources/META-INF/resources/webjars/engine/1.0.0-SNAPSHOT/bundle.js
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
=======
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
                    api.ValidationException.throwError$java_lang_String$jsweet_dom_ValidityState(el.validationMessage, el.validity);
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
<<<<<<< HEAD
class JSCastaContainer extends JSContainer {
    constructor() {
        super("div");
        if (this.id === undefined) {
            this.id = null;
        }
    }
    setVal(val) {
        CastaUtil.setVal(val, this);
    }
    getId() {
        return this.id;
    }
    setId(id) {
        this.id = id;
    }
    /**
     *
     * @param {string} id
     * @return {*}
     */
    getChildById(id) {
        return CastaUtil.getChildById(this, id);
    }
}
JSCastaContainer["__class"] = "framework.components.JSCastaContainer";
JSCastaContainer["__interfaces"] = ["framework.components.api.Renderable", "framework.components.CastaContainer"];
=======
>>>>>>> 22406dddccff80f7ba3312f225059ce74aa76c42
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
>>>>>>> 397d0857239819c5511f298d8b42d80ea904d52a:src/main/resources/META-INF/resources/webjars/engine/1.0.2-SNAPSHOT/bundle.js
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
<<<<<<< HEAD:src/main/resources/META-INF/resources/webjars/engine/1.0.0-SNAPSHOT/bundle.js
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
=======
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
<<<<<<< HEAD
                    let array196 = /* Enum.values */ function () { let result = []; for (let val in api.Units) {
=======
                    let array250 = /* Enum.values */ function () { let result = []; for (let val in api.Units) {
>>>>>>> 22406dddccff80f7ba3312f225059ce74aa76c42
                        if (!isNaN(val)) {
                            result.push(parseInt(val, 10));
                        }
                    } return result; }();
<<<<<<< HEAD
                    for (let index195 = 0; index195 < array196.length; index195++) {
                        let u = array196[index195];
=======
                    for (let index249 = 0; index249 < array250.length; index249++) {
                        let u = array250[index249];
>>>>>>> 22406dddccff80f7ba3312f225059ce74aa76c42
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
<<<<<<< HEAD
class JSCastaTemplateContainer extends HTMLTemplateContainer {
    constructor() {
        super("", "");
        if (this.id === undefined) {
            this.id = null;
        }
    }
    /**
     *
     * @param {string} id
     */
    setId(id) {
        this.id = id;
    }
    getId() {
        return this.id;
    }
    /**
     *
     * @param {string} id
     * @return {*}
     */
    getChildById(id) {
        return CastaUtil.getChildById(this, id);
    }
}
JSCastaTemplateContainer["__class"] = "framework.components.JSCastaTemplateContainer";
JSCastaTemplateContainer["__interfaces"] = ["framework.components.api.Renderable", "framework.components.CastaContainer", "framework.components.api.TemplateRenderable"];
=======
>>>>>>> 22406dddccff80f7ba3312f225059ce74aa76c42
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
>>>>>>> 397d0857239819c5511f298d8b42d80ea904d52a:src/main/resources/META-INF/resources/webjars/engine/1.0.2-SNAPSHOT/bundle.js
            }
            /**
             * Sets a label to this component
             * @param {string} label The label of the component
             */
            setLabel(label) {
                this.label.setHtml(label);
            }
<<<<<<< HEAD:src/main/resources/META-INF/resources/webjars/engine/1.0.0-SNAPSHOT/bundle.js
            /**
             * Sets the accepts mimetypes for this component
             * @param {string} accepts Mime types allowed to upload (e.g image/jpg, image/png, text/html etc)
             */
            setAccepts(accepts) {
                this.input.setAttribute("accept", accepts);
=======
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
>>>>>>> 397d0857239819c5511f298d8b42d80ea904d52a:src/main/resources/META-INF/resources/webjars/engine/1.0.2-SNAPSHOT/bundle.js
            }
            /**
             *
             * @param {*} source
             * @param {Event} ev
             */
            performAction(source, ev) {
            }
<<<<<<< HEAD:src/main/resources/META-INF/resources/webjars/engine/1.0.0-SNAPSHOT/bundle.js
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
=======
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
>>>>>>> 397d0857239819c5511f298d8b42d80ea904d52a:src/main/resources/META-INF/resources/webjars/engine/1.0.2-SNAPSHOT/bundle.js
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
<<<<<<< HEAD:src/main/resources/META-INF/resources/webjars/engine/1.0.0-SNAPSHOT/bundle.js
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
=======
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
>>>>>>> 397d0857239819c5511f298d8b42d80ea904d52a:src/main/resources/META-INF/resources/webjars/engine/1.0.2-SNAPSHOT/bundle.js
