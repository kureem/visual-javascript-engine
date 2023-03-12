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
namespace api {
    export class ContainerRenderer implements api.Renderer<api.Renderable> {
        public static timeSpent: number = 0;

        public static getElementById(id: string): HTMLElement {
            return document.getElementById(id);
        }

        public decorate(renderable: api.Renderable) {
        }

        public doRender(c: api.Renderable, root: HTMLElement) {
            const jq: HTMLElement = c.getElement();
            const tag: string = c.getTag();
            const rendered: boolean = c.isRendered();
            const name: string = c.getName();
            const html: string = c.getHtml();
            const rparent: api.Renderable = c.getParent();
            if (!rendered){
                if (jq != null)jq.remove();
                let njq: Element = null;
                if (tag === "svg"){
                    njq = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                } else {
                    njq = document.createElement(tag);
                }
                c.setElement(<HTMLElement>njq);
                if (name != null && name.length > 0)njq.setAttribute("name", name);
                njq.setAttribute("id", c.getId());
                njq.innerHTML = html;
                const uiscripts: NodeListOf<Element> = njq.querySelectorAll("script");
                const scripts: Array<string> = <any>(new Array<string>());
                for(let i: number = 0; i < uiscripts.length; i++) {{
                    const elem: HTMLScriptElement = <HTMLScriptElement>uiscripts[i];
                    if (elem.innerText != null && elem.innerText.trim().length > 0)scripts.push(elem.innerText);
                };}
                this.renderAttributes(njq, c, false);
                this.renderStyles(njq, c, false);
                if (rparent == null){
                    if (root == null){
                        const body: Node = document.getElementsByTagName("body")[0];
                        body.appendChild(njq);
                    } else {
                        root.appendChild(njq);
                    }
                } else {
                    if (rparent != null && (rparent.constructor != null && rparent.constructor["__interfaces"] != null && rparent.constructor["__interfaces"].indexOf("framework.components.api.TemplateRenderable") >= 0)){
                        const elem: Element = rparent.getElement();
                        elem.parentElement.replaceChild(njq, elem);
                    } else {
                        const index: number = rparent.getChildren().indexOf(c);
                        let nextSib: api.Renderable = null;
                        if (index < rparent.getChildren().length - 1){
                            nextSib = rparent.getChildren()[index + 1];
                            if (!nextSib.isRendered()){
                                nextSib = null;
                            }
                        }
                        if (nextSib != null){
                            const p: Node = rparent.getElement();
                            p.insertBefore(njq, nextSib.getElement());
                        } else {
                            try {
                                rparent.getElement().appendChild(njq);
                            } catch(e) {
                                console.error(e.message, e);
                            }
                        }
                    }
                }
                const me: api.Renderable = c;
                const component: api.Renderable = me;
                this.doNothing(component);
                for(let index186=0; index186 < scripts.length; index186++) {
                    let scr = scripts[index186];
                    {
                        eval(scr);
                    }
                }
                this.renderEvents(njq, c);
                ContainerRenderer.processCSSRules(c, njq);
                this.execCommands(njq, c);
                c.flush("a28n12l10");
            } else {
                if (jq != null){
                    this.renderAttributes(jq, c, true);
                    this.renderStyles(jq, c, true);
                    this.execCommands(jq, c);
                    c.flush("a28n12l10");
                }
            }
        }

        /*private*/ doNothing(r: api.Renderable) {
        }

        execCommands(njq: Element, container: api.Renderable) {
        }

        renderEvents(njq: Element, c: api.Renderable) {
            const keys: string[] = Object.keys(c.getListeners());
            for(let index187=0; index187 < keys.length; index187++) {
                let key = keys[index187];
                {
                    const listeners: Array<api.EventListener> = <Array<api.EventListener>>c.getListeners()[key];
                    njq.addEventListener(key, ((listeners) => {
                        return (evt) => {
                            for(let index188=0; index188 < listeners.length; index188++) {
                                let l = listeners[index188];
                                {
                                    l.performAction(c, evt);
                                }
                            }
                            c.getRoot()['render$']();
                        }
                    })(listeners));
                }
            }
        }

        renderAttributes(njq: Element, c: api.Renderable, changed: boolean) {
            if (changed){
                {
                    let array190 = c.getChangedAttributes();
                    for(let index189=0; index189 < array190.length; index189++) {
                        let key = array190[index189];
                        {
                            const attr: string = c.getAttribute(key);
                            if (attr == null){
                                njq.removeAttribute(key);
                            } else {
                                ContainerRenderer.setAttribute(njq, key, attr);
                            }
                        }
                    }
                }
            } else {
                {
                    let array192 = c.getAttributeNames();
                    for(let index191=0; index191 < array192.length; index191++) {
                        let key = array192[index191];
                        {
                            const attr: string = c.getAttribute(key);
                            if (attr != null)ContainerRenderer.setAttribute(njq, key, attr);
                        }
                    }
                }
            }
        }

        clearAttributes(elem: Element) {
            const attrs: NamedNodeMap = elem.attributes;
            for(let i: number = 0; i < attrs.length; i++) {{
                if (!(attrs[i].name === ("id")))elem.removeAttribute(attrs[i].name);
            };}
        }

        clearStyles(jq: Element) {
            jq.removeAttribute("style");
        }

        renderStyles(njq: Element, c: api.Renderable, changed: boolean) {
            if (changed){
                {
                    let array194 = c.getChangedStyles();
                    for(let index193=0; index193 < array194.length; index193++) {
                        let key = array194[index193];
                        {
                            (<HTMLElement>njq).style.setProperty(key, c.getStyle(key));
                        }
                    }
                }
            } else {
                {
                    let array196 = c.getStyleNames();
                    for(let index195=0; index195 < array196.length; index195++) {
                        let key = array196[index195];
                        {
                            (<HTMLElement>njq).style.setProperty(key, c.getStyle(key));
                        }
                    }
                }
            }
        }

        public static setAttribute(element: Element, attribute: string, value: string) {
            try {
                element.setAttribute(attribute, value);
            } catch(e) {
                console.warn("Invalid attribute :" + attribute + " set to:" + element.toString());
            }
        }

        public static processCSSRules(renderable: api.Renderable, nativeNode: Element) {
            const rules: Array<string> = renderable.getCSSRules();
            if (rules.length > 0){
                const styleelem: HTMLStyleElement = <HTMLStyleElement>document.createElement("style");
                styleelem.type = "text/css";
                nativeNode.appendChild(styleelem);
                const sheet: CSSStyleSheet = <CSSStyleSheet>styleelem.sheet;
                for(let index197=0; index197 < rules.length; index197++) {
                    let rule = rules[index197];
                    sheet.insertRule(rule)
                }
            }
        }

        constructor() {
        }
    }
    ContainerRenderer["__class"] = "framework.components.api.ContainerRenderer";
    ContainerRenderer["__interfaces"] = ["framework.components.api.Renderer"];


}
namespace api {
    /**
     * Interface to implement when adding events on components.
     * @author Rossaye Abdool Kureem
     * Jul 11, 2018
     * @class
     */
    export interface EventListener {
        performAction(source: api.Renderable, evt: Event);
    }
}
namespace api {
    /**
     * All components which allows a user to input a value implements this interface.<br>
     * This interface defines methods that allows setting and retrieving values
     * @author Kureem Rossaye
     * 
     * @param <T> - The type of value store by this field
     * @class
     */
    export interface InputField<T> extends api.Renderable {
        /**
         * Returns the value entered
         * @return {*} The value entered
         */
        getValue(): T;

        /**
         * Sets the value to the component
         * @param {*} val The value to set
         */
        setValue(val: T);

        /**
         * Validates the value entered
         * @throws ValidationException Exception throws if the value is not valid
         */
        validate();

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
namespace api {
    export enum InputType {
        BUTTON, CHECKBOX, DATE, DATETIME_LOCAL, FILE, HIDDEN, IMAGE, MONTH, NUMBER, RADIO, RANGE, RESET, SUBMIT, TIME, WEEK, TEXT, PASSWORD, EMAIL, URL, SEARCH, TEL, COLOR
    }

    /** @ignore */
    export class InputType_$WRAPPER {
        /*private*/ value;

        /*private*/ group;

        public constructor(protected _$ordinal: number, protected _$name: string, value?, group?) {
            if (((typeof value === 'string') || value === null) && ((typeof group === 'string') || group === null)) {
                let __args = arguments;
                if (this.value === undefined) { this.value = null; } 
                this.group = "text";
                this.value = value;
                this.group = group;
            } else if (((typeof value === 'string') || value === null) && group === undefined) {
                let __args = arguments;
                if (this.value === undefined) { this.value = null; } 
                this.group = "text";
                this.value = value;
                this.group = "text";
            } else throw new Error('invalid overload');
        }

        public getValue(): string {
            return this.value;
        }

        public getGroup(): string {
            return this.group;
        }
        public name(): string { return this._$name; }
        public ordinal(): number { return this._$ordinal; }
        public compareTo(other: any): number { return this._$ordinal - (isNaN(other)?other._$ordinal:other); }
    }
    InputType["__class"] = "framework.components.api.InputType";
    InputType["__interfaces"] = ["java.lang.constant.Constable","java.lang.Comparable","java.io.Serializable"];

    InputType["_$wrappers"] = {0: new InputType_$WRAPPER(0, "BUTTON", "button", "button"), 1: new InputType_$WRAPPER(1, "CHECKBOX", "checkbox", "boolean"), 2: new InputType_$WRAPPER(2, "DATE", "date", "date"), 3: new InputType_$WRAPPER(3, "DATETIME_LOCAL", "datetime-local", "date"), 4: new InputType_$WRAPPER(4, "FILE", "file", "file"), 5: new InputType_$WRAPPER(5, "HIDDEN", "hidden", "text"), 6: new InputType_$WRAPPER(6, "IMAGE", "image", "image"), 7: new InputType_$WRAPPER(7, "MONTH", "month", "date"), 8: new InputType_$WRAPPER(8, "NUMBER", "number", "number"), 9: new InputType_$WRAPPER(9, "RADIO", "radio", "boolean"), 10: new InputType_$WRAPPER(10, "RANGE", "range", "number"), 11: new InputType_$WRAPPER(11, "RESET", "reset", "button"), 12: new InputType_$WRAPPER(12, "SUBMIT", "submit", "button"), 13: new InputType_$WRAPPER(13, "TIME", "time", "date"), 14: new InputType_$WRAPPER(14, "WEEK", "week", "date"), 15: new InputType_$WRAPPER(15, "TEXT", "text"), 16: new InputType_$WRAPPER(16, "PASSWORD", "password"), 17: new InputType_$WRAPPER(17, "EMAIL", "email"), 18: new InputType_$WRAPPER(18, "URL", "url"), 19: new InputType_$WRAPPER(19, "SEARCH", "search"), 20: new InputType_$WRAPPER(20, "TEL", "tel"), 21: new InputType_$WRAPPER(21, "COLOR", "color")};

}
namespace api {
    /**
     * Base interface that defines contract methods available on any component that
     * can be rendered on a web page.
     * 
     * @author Rossaye Abdool Kureem Apr 10, 2018
     * @class
     */
    export interface Renderable {
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
        setName(name: string);

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
        render(root?: any);

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
        setCustomProperties(data: any);

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

        flush(secret: string);

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
        setElement(elem: HTMLElement);

        /**
         * returns the {@link HTMLElement} that is created for this container on the browser when this {@link Renderable} is rendered
         * @return {HTMLElement} - The {@link HTMLElement} that this container represents on the browser
         */
        getElement(): HTMLElement;
    }
}
namespace api {
    /**
     * Interface to implemented by renderer of components
     * @author Kureem Rossaye
     * 
     * @param <T> - The type of {@link Renderable} that this renderer is compatible with
     * @class
     */
    export interface Renderer<T extends api.Renderable> {
        /**
         * Render the specified component and attach it to the specified parent
         * @param {*} renderable The component to render
         * @param {HTMLElement} parent The parent to which the component is attached
         */
        doRender(renderable: T, parent: HTMLElement);
    }
}
namespace api {
    /**
     * More specific component that is rendered based on a specified template instead of a simple tag
     * @author Kureem Rossaye
     * @class
     */
    export interface TemplateRenderable extends api.Renderable {
        /**
         * Returns the html template of the component
         * @return {string} The html template of the component
         */
        getTemplate(): string;

        /**
         * Sets the template for this component
         * @param {string} template The template for the component
         */
        setTemplate(template: string);

        /**
         * data injected to the component that can be used by the compiler to compile the template
         * @return {Object} Data injected to the component
         */
        getContext(): Object;

        /**
         * Render the component and attach it to the specified parent
         * @param {HTMLElement} parent
         */
        render(parent?: any);
    }
}
namespace api {
    export enum Units {
        PIXEL, CENTIMETER, MILLIMETER, INCH, POINT, PICA, EM, EX, CH, REM, VIEWPORT_WIDTH, VIEWPORT_HEIGHT, VIEWPORT_MIN, VIEWPORT_MAX, PERCENT
    }

    /** @ignore */
    export class Units_$WRAPPER {
        constructor(protected _$ordinal: number, protected _$name: string, name, display, type) {
            if (this.__name === undefined) { this.__name = null; }
            if (this.display === undefined) { this.display = null; }
            if (this.type === undefined) { this.type = null; }
            this.__name = name;
            this.display = display;
            this.type = type;
        }

        /*private*/ __name;

        /*private*/ display;

        /*private*/ type;

        public getName(): string {
            return this.__name;
        }

        public getDisplay(): string {
            return this.display;
        }

        public getType(): string {
            return this.type;
        }
        public name(): string { return this._$name; }
        public ordinal(): number { return this._$ordinal; }
        public compareTo(other: any): number { return this._$ordinal - (isNaN(other)?other._$ordinal:other); }
    }
    Units["__class"] = "framework.components.api.Units";
    Units["__interfaces"] = ["java.lang.constant.Constable","java.lang.Comparable","java.io.Serializable"];

    Units["_$wrappers"] = {0: new Units_$WRAPPER(0, "PIXEL", "pixel", "px", "absolute"), 1: new Units_$WRAPPER(1, "CENTIMETER", "centimer", "cm", "absolute"), 2: new Units_$WRAPPER(2, "MILLIMETER", "millimeter", "mm", "absolute"), 3: new Units_$WRAPPER(3, "INCH", "inch", "mm", "absolute"), 4: new Units_$WRAPPER(4, "POINT", "point", "pt", "absolute"), 5: new Units_$WRAPPER(5, "PICA", "pica", "pc", "absolute"), 6: new Units_$WRAPPER(6, "EM", "em", "em", "relative"), 7: new Units_$WRAPPER(7, "EX", "ex", "ex", "relative"), 8: new Units_$WRAPPER(8, "CH", "ch", "ch", "relative"), 9: new Units_$WRAPPER(9, "REM", "root element", "rem", "relative"), 10: new Units_$WRAPPER(10, "VIEWPORT_WIDTH", "viewport width", "vw", "relative"), 11: new Units_$WRAPPER(11, "VIEWPORT_HEIGHT", "viewport height", "vw", "relative"), 12: new Units_$WRAPPER(12, "VIEWPORT_MIN", "viewport minimum", "vmin", "relative"), 13: new Units_$WRAPPER(13, "VIEWPORT_MAX", "viewport maximum", "vmax", "relative"), 14: new Units_$WRAPPER(14, "PERCENT", "percent", "%", "relative")};

}
namespace api {
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
    export class ValidationException extends Error {
        /*private*/ code: number;

        /**
         * Is a <code>Numeric</code> indicating the user has provided input that the
         * browser is unable to convert.
         */
        public static badInput: number = 0;

        /**
         * Is a <code>Numeric</code> indicating the element's custom validity
         * message has been set to a non-empty string by calling the element's
         * <code>addValidator()</code> method.
         */
        public static customError: number = 1;

        /**
         * Is a <code>Numeric</code> indicating the value does not match the
         * specified <code>pattern</code>.
         */
        public static patternMismatch: number = 2;

        /**
         * Is a <code>Numeric</code> indicating the value is greater than the
         * maximum specified by the <code>max</code> attribute.
         */
        public static rangeOverflow: number = 3;

        /**
         * Is a <code>Numeric</code> indicating the value is less than the minimum
         * specified by the <code>min</code> attribute.
         */
        public static rangeUnderflow: number = 4;

        /**
         * Is a <code>Numeric</code> indicating the value does not fit the rules
         * determined by the <code>step</code> attribute (that is, it's not evenly
         * divisible by the step value).
         */
        public static stepMismatch: number = 5;

        /**
         * Is a <code>Numeric</code> indicating the value exceeds the specified
         * <code>maxlength</code> for {@link JSTextInput}
         * component.
         * <em><strong>Note:</strong> This will never be <code>true</code> in Gecko,
         * because elements' values are prevented from being longer than
         * <code>maxlength</code>.</em>
         */
        public static tooLong: number = 6;

        /**
         * Is a <code>Numeric</code> indicating the value is not in the required
         * syntax (when <code>type</code> is <code>email</code> or <code>url</code>
         * ).
         */
        public static typeMismatch: number = 7;

        /**
         * Is a <code>Numeric</code> indicating the element has a
         * <code>required</code> attribute, but no value.
         */
        public static valueMissing: number = 8;

        /**
         * Is a <code>Numeric</code> indicating the value less than the specified
         * <code>minlength</code> for {@link JSTextInput}
         * component.
         * <em><strong>Note:</strong> This will never be <code>true</code> in Gecko,
         * because elements' values are prevented from being shorter than
         * <code>minlength</code>.</em>
         */
        public static tooShort: number = 9;

        /**
         * 
         */
        static serialVersionUID: number = 1;

        public errors: Array<Object>;

        public constructor(message?: any, errorCode?: any) {
            if (((typeof message === 'string') || message === null) && ((typeof errorCode === 'number') || errorCode === null)) {
                let __args = arguments;
                super(message);
                if (this.code === undefined) { this.code = 0; } 
                this.errors = <any>(new Array<Object>());
                this.code = errorCode;
            } else if (((typeof message === 'number') || message === null) && errorCode === undefined) {
                let __args = arguments;
                let errorCode: any = __args[0];
                super();
                if (this.code === undefined) { this.code = 0; } 
                this.errors = <any>(new Array<Object>());
                this.code = errorCode;
            } else if (message === undefined && errorCode === undefined) {
                let __args = arguments;
                super();
                if (this.code === undefined) { this.code = 0; } 
                this.errors = <any>(new Array<Object>());
            } else throw new Error('invalid overload');
        }

        public static throwError$java_lang_String$int(msg: string, code: number) {
            throw new ValidationException(msg, code);
        }

        public static throwError$java_lang_String$jsweet_dom_ValidityState(msg: string, state: ValidityState) {
            if (!state.valid){
                if (state.badInput){
                    ValidationException.throwError$java_lang_String$int(msg, ValidationException.badInput);
                } else if (state.customError){
                    ValidationException.throwError$java_lang_String$int(msg, ValidationException.customError);
                } else if (state.patternMismatch){
                    ValidationException.throwError$java_lang_String$int(msg, ValidationException.patternMismatch);
                } else if (state.rangeOverflow){
                    ValidationException.throwError$java_lang_String$int(msg, ValidationException.rangeOverflow);
                } else if (state.rangeUnderflow){
                    ValidationException.throwError$java_lang_String$int(msg, ValidationException.rangeUnderflow);
                } else if (state.stepMismatch){
                    ValidationException.throwError$java_lang_String$int(msg, ValidationException.stepMismatch);
                } else if (state.tooLong){
                    ValidationException.throwError$java_lang_String$int(msg, ValidationException.tooLong);
                } else if (state.typeMismatch){
                    ValidationException.throwError$java_lang_String$int(msg, ValidationException.typeMismatch);
                } else if (state.valueMissing){
                    ValidationException.throwError$java_lang_String$int(msg, ValidationException.valueMissing);
                }
            }
        }

        public static throwError(msg?: any, state?: any) {
            if (((typeof msg === 'string') || msg === null) && ((state != null && state instanceof <any>ValidityState) || state === null)) {
                return <any>api.ValidationException.throwError$java_lang_String$jsweet_dom_ValidityState(msg, state);
            } else if (((typeof msg === 'string') || msg === null) && ((typeof state === 'number') || state === null)) {
                return <any>api.ValidationException.throwError$java_lang_String$int(msg, state);
            } else throw new Error('invalid overload');
        }

        public getCode(): number {
            return this.code;
        }
    }
    ValidationException["__class"] = "framework.components.api.ValidationException";
    ValidationException["__interfaces"] = ["java.io.Serializable"];


}
namespace table {
    export class DefaulTableModel implements table.TableModel {
        /*private*/ data: Array<Object>;

        /**
         * 
         * @return {number}
         */
        public getRowCount(): number {
            return (<number>this.data.length|0);
        }

        /**
         * 
         * @return {number}
         */
        public getColumnCount(): number {
            return 0;
        }

        /**
         * 
         * @param {number} columnIndex
         * @return {string}
         */
        public getColumnName(columnIndex: number): string {
            return null;
        }

        /**
         * 
         * @param {number} rowIndex
         * @param {number} columnIndex
         * @return {boolean}
         */
        public isCellEditable(rowIndex: number, columnIndex: number): boolean {
            return false;
        }

        /**
         * 
         * @param {number} rowIndex
         * @param {number} columnIndex
         * @return {*}
         */
        public getValueAt(rowIndex: number, columnIndex: number): any {
            return null;
        }

        /**
         * 
         * @param {*} aValue
         * @param {number} rowIndex
         * @param {number} columnIndex
         */
        public setValueAt(aValue: any, rowIndex: number, columnIndex: number) {
        }

        /**
         * 
         * @param {*} l
         */
        public addTableModelListener(l: table.TableModelEventListener) {
        }

        /**
         * 
         * @param {*} l
         */
        public removeTableModelListener(l: table.TableModelEventListener) {
        }

        constructor() {
            this.data = <any>(new Array<Object>());
        }
    }
    DefaulTableModel["__class"] = "framework.components.table.DefaulTableModel";
    DefaulTableModel["__interfaces"] = ["framework.components.table.TableModel"];


}
namespace table {
    export class DefaultTableColumnModel implements table.TableColumnModel {
        /*private*/ columns: Array<table.TableColumn>;

        /*private*/ pointer: number;

        public addColumn$framework_components_table_TableColumn(aColumn: table.TableColumn) {
            this.columns.push(aColumn);
            this.reset();
        }

        /**
         * 
         * @param {table.TableColumn} aColumn
         */
        public addColumn(aColumn?: any) {
            if (((aColumn != null && aColumn instanceof <any>table.TableColumn) || aColumn === null)) {
                return <any>this.addColumn$framework_components_table_TableColumn(aColumn);
            } else if (((aColumn != null && aColumn instanceof <any>Array && (aColumn.length == 0 || aColumn[0] == null ||(aColumn[0] != null && aColumn[0] instanceof <any>table.TableColumn))) || aColumn === null)) {
                return <any>this.addColumn$framework_components_table_TableColumn_A(...aColumn);
            } else throw new Error('invalid overload');
        }

        /*private*/ reset() {
            this.pointer = -1;
        }

        /**
         * 
         * @param {table.TableColumn} column
         */
        public removeColumn(column: table.TableColumn) {
            this.columns.splice(this.columns.indexOf(column));
            this.reset();
        }

        /**
         * 
         * @return {number}
         */
        public getColumnCount(): number {
            return (<number>this.columns.length|0);
        }

        /**
         * 
         * @return {*}
         */
        public getColumns(): any {
            return this;
        }

        /**
         * 
         * @param {*} columnIdentifier
         * @return {number}
         */
        public getColumnIndex(columnIdentifier: any): number {
            for(let index198=0; index198 < this.columns.length; index198++) {
                let col = this.columns[index198];
                {
                    if (col.identifier === columnIdentifier){
                        return (<number>this.columns.indexOf(col)|0);
                    }
                }
            }
            return -1;
        }

        public addColumn$framework_components_table_TableColumn_A(...col: table.TableColumn[]): DefaultTableColumnModel {
            this.columns.push(...col);
            this.reset();
            return this;
        }

        public addColumnAt(col: table.TableColumn, index: number): DefaultTableColumnModel {
            const tmp: Array<table.TableColumn> = <any>(new Array<table.TableColumn>());
            for(let i: number = 0; i < this.columns.length; i++) {{
                tmp.push(this.columns[i]);
                if (i === index){
                    tmp.push(col);
                }
            };}
            this.columns = tmp;
            this.reset();
            return this;
        }

        /**
         * 
         * @param {number} columnIndex
         * @return {table.TableColumn}
         */
        public getColumn(columnIndex: number): table.TableColumn {
            return this.columns[columnIndex];
        }

        /**
         * 
         * @return {boolean}
         */
        public hasMoreElements(): boolean {
            return ((this.pointer + 1) < this.columns.length);
        }

        /**
         * 
         * @return {table.TableColumn}
         */
        public nextElement(): table.TableColumn {
            this.pointer = this.pointer + 1;
            return this.columns[this.pointer];
        }

        constructor() {
            this.columns = <any>(new Array<table.TableColumn>());
            this.pointer = -1;
        }
    }
    DefaultTableColumnModel["__class"] = "framework.components.table.DefaultTableColumnModel";
    DefaultTableColumnModel["__interfaces"] = ["framework.components.table.TableColumnModel","java.util.Enumeration"];


}
namespace table {
    export interface TableCellRenderer {
        renderComponent(table: table.Table, container: api.Renderable, value: any, isSelected: boolean, hasFocus: boolean, row: number, column: number);
    }
}
namespace table {
    /**
     * Contract Interface used by Table to render a <code>TableColumn</code>
     * @author Kureem Rossaye
     * @class
     */
    export interface TableColumnModel {
        /**
         * Appends <code>aColumn</code> to the end of the
         * <code>tableColumns</code> array.
         * This method posts a <code>columnAdded</code>
         * event to its listeners.
         * 
         * @param   {table.TableColumn} aColumn         the <code>TableColumn</code> to be added
         * @see     #removeColumn
         */
        addColumn(aColumn: table.TableColumn);

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
        removeColumn(column: table.TableColumn);

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
namespace table {
    export interface TableModel {
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
        setValueAt(aValue: any, rowIndex: number, columnIndex: number);

        /**
         * Adds a listener to the list that is notified each time a change
         * to the data model occurs.
         * 
         * @param   {*} l               the TableModelListener
         */
        addTableModelListener(l: table.TableModelEventListener);

        /**
         * Removes a listener from the list that is notified each time a
         * change to the data model occurs.
         * 
         * @param   {*} l               the TableModelListener
         */
        removeTableModelListener(l: table.TableModelEventListener);
    }
}
namespace table {
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
    export class TableModelEvent {
        /**
         * Identifies the addition of new rows or columns.
         */
        public static INSERT: number = 1;

        /**
         * Identifies a change to existing data.
         */
        public static UPDATE: number = 0;

        /**
         * Identifies the removal of rows or columns.
         */
        public static DELETE: number = -1;

        /**
         * Identifies the header row.
         */
        public static HEADER_ROW: number = -1;

        /**
         * Specifies all columns in a row or rows.
         */
        public static ALL_COLUMNS: number = -1;

        type: number;

        firstRow: number;

        lastRow: number;

        column: number;

        source: table.TableModel;

        public constructor(source?: any, firstRow?: any, lastRow?: any, column?: any, type?: any) {
            if (((source != null && (source.constructor != null && source.constructor["__interfaces"] != null && source.constructor["__interfaces"].indexOf("framework.components.table.TableModel") >= 0)) || source === null) && ((typeof firstRow === 'number') || firstRow === null) && ((typeof lastRow === 'number') || lastRow === null) && ((typeof column === 'number') || column === null) && ((typeof type === 'number') || type === null)) {
                let __args = arguments;
                if (this.type === undefined) { this.type = 0; } 
                if (this.firstRow === undefined) { this.firstRow = 0; } 
                if (this.lastRow === undefined) { this.lastRow = 0; } 
                if (this.column === undefined) { this.column = 0; } 
                if (this.source === undefined) { this.source = null; } 
                this.source = source;
                this.firstRow = firstRow;
                this.lastRow = lastRow;
                this.column = column;
                this.type = type;
            } else if (((source != null && (source.constructor != null && source.constructor["__interfaces"] != null && source.constructor["__interfaces"].indexOf("framework.components.table.TableModel") >= 0)) || source === null) && ((typeof firstRow === 'number') || firstRow === null) && ((typeof lastRow === 'number') || lastRow === null) && ((typeof column === 'number') || column === null) && type === undefined) {
                let __args = arguments;
                {
                    let __args = arguments;
                    let type: any = TableModelEvent.UPDATE;
                    if (this.type === undefined) { this.type = 0; } 
                    if (this.firstRow === undefined) { this.firstRow = 0; } 
                    if (this.lastRow === undefined) { this.lastRow = 0; } 
                    if (this.column === undefined) { this.column = 0; } 
                    if (this.source === undefined) { this.source = null; } 
                    this.source = source;
                    this.firstRow = firstRow;
                    this.lastRow = lastRow;
                    this.column = column;
                    this.type = type;
                }
                if (this.type === undefined) { this.type = 0; } 
                if (this.firstRow === undefined) { this.firstRow = 0; } 
                if (this.lastRow === undefined) { this.lastRow = 0; } 
                if (this.column === undefined) { this.column = 0; } 
                if (this.source === undefined) { this.source = null; } 
            } else if (((source != null && (source.constructor != null && source.constructor["__interfaces"] != null && source.constructor["__interfaces"].indexOf("framework.components.table.TableModel") >= 0)) || source === null) && ((typeof firstRow === 'number') || firstRow === null) && ((typeof lastRow === 'number') || lastRow === null) && column === undefined && type === undefined) {
                let __args = arguments;
                {
                    let __args = arguments;
                    let column: any = TableModelEvent.ALL_COLUMNS;
                    let type: any = TableModelEvent.UPDATE;
                    if (this.type === undefined) { this.type = 0; } 
                    if (this.firstRow === undefined) { this.firstRow = 0; } 
                    if (this.lastRow === undefined) { this.lastRow = 0; } 
                    if (this.column === undefined) { this.column = 0; } 
                    if (this.source === undefined) { this.source = null; } 
                    this.source = source;
                    this.firstRow = firstRow;
                    this.lastRow = lastRow;
                    this.column = column;
                    this.type = type;
                }
                if (this.type === undefined) { this.type = 0; } 
                if (this.firstRow === undefined) { this.firstRow = 0; } 
                if (this.lastRow === undefined) { this.lastRow = 0; } 
                if (this.column === undefined) { this.column = 0; } 
                if (this.source === undefined) { this.source = null; } 
            } else if (((source != null && (source.constructor != null && source.constructor["__interfaces"] != null && source.constructor["__interfaces"].indexOf("framework.components.table.TableModel") >= 0)) || source === null) && ((typeof firstRow === 'number') || firstRow === null) && lastRow === undefined && column === undefined && type === undefined) {
                let __args = arguments;
                let row: any = __args[1];
                {
                    let __args = arguments;
                    let firstRow: any = row;
                    let lastRow: any = row;
                    let column: any = TableModelEvent.ALL_COLUMNS;
                    let type: any = TableModelEvent.UPDATE;
                    if (this.type === undefined) { this.type = 0; } 
                    if (this.firstRow === undefined) { this.firstRow = 0; } 
                    if (this.lastRow === undefined) { this.lastRow = 0; } 
                    if (this.column === undefined) { this.column = 0; } 
                    if (this.source === undefined) { this.source = null; } 
                    this.source = source;
                    this.firstRow = firstRow;
                    this.lastRow = lastRow;
                    this.column = column;
                    this.type = type;
                }
                if (this.type === undefined) { this.type = 0; } 
                if (this.firstRow === undefined) { this.firstRow = 0; } 
                if (this.lastRow === undefined) { this.lastRow = 0; } 
                if (this.column === undefined) { this.column = 0; } 
                if (this.source === undefined) { this.source = null; } 
            } else if (((source != null && (source.constructor != null && source.constructor["__interfaces"] != null && source.constructor["__interfaces"].indexOf("framework.components.table.TableModel") >= 0)) || source === null) && firstRow === undefined && lastRow === undefined && column === undefined && type === undefined) {
                let __args = arguments;
                {
                    let __args = arguments;
                    let firstRow: any = 0;
                    let lastRow: any = 2147483647;
                    let column: any = TableModelEvent.ALL_COLUMNS;
                    let type: any = TableModelEvent.UPDATE;
                    if (this.type === undefined) { this.type = 0; } 
                    if (this.firstRow === undefined) { this.firstRow = 0; } 
                    if (this.lastRow === undefined) { this.lastRow = 0; } 
                    if (this.column === undefined) { this.column = 0; } 
                    if (this.source === undefined) { this.source = null; } 
                    this.source = source;
                    this.firstRow = firstRow;
                    this.lastRow = lastRow;
                    this.column = column;
                    this.type = type;
                }
                if (this.type === undefined) { this.type = 0; } 
                if (this.firstRow === undefined) { this.firstRow = 0; } 
                if (this.lastRow === undefined) { this.lastRow = 0; } 
                if (this.column === undefined) { this.column = 0; } 
                if (this.source === undefined) { this.source = null; } 
            } else throw new Error('invalid overload');
        }

        /**
         * Returns the first row that changed.  HEADER_ROW means the meta data,
         * ie. names, types and order of the columns.
         * 
         * @return {number} The first row affected
         */
        public getFirstRow(): number {
            return this.firstRow;
        }

        /**
         * 
         * Returns the last row that changed.
         * 
         * @return {number} - The last row affected
         */
        public getLastRow(): number {
            return this.lastRow;
        }

        /**
         * Returns the column for the event.  If the return
         * value is ALL_COLUMNS; it means every column in the specified
         * rows changed.
         * @return {number} - The column index affected
         */
        public getColumn(): number {
            return this.column;
        }

        /**
         * Returns the type of event - one of: INSERT, UPDATE and DELETE.
         * 
         * @return {number} - The type of event
         */
        public getType(): number {
            return this.type;
        }
    }
    TableModelEvent["__class"] = "framework.components.table.TableModelEvent";

}
namespace table {
    export interface TableModelEventListener {
        tableChanged(e: table.TableModelEvent);
    }
}
namespace util {
    export class ComponentUtil {
        public static visit(designable: api.Renderable, visitor: ComponentUtil.ComponentVisitor) {
            visitor.doVisit(designable);
            {
                let array200 = designable.getChildren();
                for(let index199=0; index199 < array200.length; index199++) {
                    let child = array200[index199];
                    {
                        ComponentUtil.visit(child, visitor);
                    }
                }
            }
        }

        public static getTags(type: string): Array<Object> {
            const html5tags: Array<Object> = <any>(window["html5tags"]);
            const result: Array<Object> = <any>(new Array<Object>());
            for(let index201=0; index201 < html5tags.length; index201++) {
                let html5tag = html5tags[index201];
                {
                    const stype: string = <string>html5tag["type"];
                    if (stype === type || type === "*"){
                        result.push(html5tag);
                    }
                }
            }
            return result;
        }
    }
    ComponentUtil["__class"] = "framework.components.util.ComponentUtil";


    export namespace ComponentUtil {

        export interface ComponentVisitor {
            doVisit(designable: api.Renderable);
        }
    }

}
namespace util {
    export class PropertyUtil {
        public static DOCUMENT_STRCTURE_HIDE_CONTEXT_MENU_ADDED: boolean = false;

        public static REMOTESERVER: string = "";

        public static getValue(obj: Object, property: string): Object {
            if (obj == null){
                return null;
            }
            if (!/* contains */(property.indexOf(".") != -1)){
                return <Object>obj[property];
            }
            const parts: string[] = property.split(".");
            let tmp: Object = obj;
            for(let index202=0; index202 < parts.length; index202++) {
                let part = parts[index202];
                {
                    tmp = PropertyUtil.getValue(tmp, part);
                }
            }
            return tmp;
        }

        public static hasOwnProperty(obj: Object, property: string): boolean {
            if (/* contains */(property.indexOf(".") != -1)){
                const keys: string[] = property.split(".");
                let tmp: Object = obj;
                for(let i: number = 0; i < keys.length - 1; i++) {{
                    if (!tmp.hasOwnProperty(keys[i])){
                        return false;
                    }
                    tmp = <Object>tmp[keys[i]];
                };}
                return tmp.hasOwnProperty(keys[keys.length - 1]);
            } else {
                return obj.hasOwnProperty(property);
            }
        }

        public static setValue(obj: Object, value: Object, property: string) {
            if (obj == null){
                throw Object.defineProperty(new Error("cannot set  property " + property + " to undefined"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object'] });
            }
            if (/* contains */(property.indexOf(".") != -1)){
                const keys: string[] = property.split(".");
                let tmp: Object = obj;
                for(let i: number = 0; i < keys.length - 1; i++) {{
                    if (!tmp.hasOwnProperty(keys[i])){
                        tmp[keys[i]] = <Object>new Object();
                    }
                    tmp = PropertyUtil.getValue(tmp, keys[i]);
                };}
                PropertyUtil.setValue(tmp, value, keys[keys.length - 1]);
            } else {
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
        public static getQuery(hash: string): Object {
            const result: Object = <Object>new Object();
            if (/* contains */(hash.indexOf("?") != -1)){
                const kvs: string[] = hash.split("?")[1].split("&");
                for(let index203=0; index203 < kvs.length; index203++) {
                    let kv = kvs[index203];
                    {
                        const akv: string[] = kv.split("=");
                        result[akv[0]] = akv[1];
                    }
                }
            }
            return result;
        }
    }
    PropertyUtil["__class"] = "framework.components.util.PropertyUtil";

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
class JSContainer implements api.Renderable {
    public static idCount: number = 0;

    /*private*/ d: Object;

    static defaultRenderer: api.ContainerRenderer; public static defaultRenderer_$LI$(): api.ContainerRenderer { if (JSContainer.defaultRenderer == null) { JSContainer.defaultRenderer = new api.ContainerRenderer(); }  return JSContainer.defaultRenderer; }

    /*private*/ elem_: HTMLElement;

    public constructor(name?: any, tag?: any) {
        if (((typeof name === 'string') || name === null) && ((typeof tag === 'string') || tag === null)) {
            let __args = arguments;
            if (this.elem_ === undefined) { this.elem_ = null; } 
            this.d = <Object>new Object();
            this.setTag(tag);
            this.setName(name);
        } else if (((typeof name === 'string') || name === null) && tag === undefined) {
            let __args = arguments;
            let tag: any = __args[0];
            if (this.elem_ === undefined) { this.elem_ = null; } 
            this.d = <Object>new Object();
            this.setTag(tag);
        } else throw new Error('invalid overload');
    }

    /**
     * Adds an event on the component
     * 
     * @param {string} evt
     * The name of the event (click, dblclick, keyup etc)
     * @param {*} listener
     * The javascript function to be called back
     */
    public on(evt: string, listener: (p1: api.Renderable, p2: Event) => void) {
        this.addEventListener(new JSContainer.JSContainer$0(this, listener), evt);
    }

    /**
     * 
     * @return {java.lang.String[]} An array of custom events supported by the component<br>
     * This method is overridden by more complex components to provide
     * more advanced events mechanisms.
     */
    public advancedEventTypes(): string[] {
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
    public fireListener(key: string, evt: Event) {
        const listeners: Array<api.EventListener> = <Array<api.EventListener>>this.getListeners()[key];
        if (listeners != null && listeners.length > 0){
            for(let index204=0; index204 < listeners.length; index204++) {
                let l = listeners[index204];
                {
                    l.performAction(this, evt);
                }
            }
        }
    }

    public hasListenerOfType(type: string): boolean {
        const listeners: Array<api.EventListener> = <Array<api.EventListener>>this.getListeners()[type];
        if (listeners != null && listeners.length > 0){
            return true;
        } else {
            return false;
        }
    }

    /**
     * 
     * @return {Object} An {@link jsweet.lang.Object} to provide a scope for this
     * environement
     */
    public getScope(): Object {
        return null;
    }

    public getChild(name: string): api.Renderable {
        {
            let array206 = this.getChildren();
            for(let index205=0; index205 < array206.length; index205++) {
                let child = array206[index205];
                {
                    if (child.getName() === name){
                        return child;
                    }
                }
            }
        }
        return null;
    }

    public removeChild(r: api.Renderable): api.Renderable {
        const children: Array<api.Renderable> = this.getChildren();
        this.d["children"] = children.filter((ctn, inde, lst) => {
            return !/* equals */(<any>((o1: any, o2: any) => { if (o1 && o1.equals) { return o1.equals(o2); } else { return o1 === o2; } })(ctn,r));
        });
        this.setRendered(false);
        return this;
    }

    public addCSSRule(rule: string): api.Renderable {
        let rules: Array<string> = <Array<string>>this.d["rules"];
        if (rules == null){
            rules = <any>(new Array<string>());
            this.d["rules"] = rules;
        }
        if (rules.indexOf(rule) < 0){
            rules.push(rule);
            this.d["rules"] = rules;
        }
        return this;
    }

    /**
     * 
     * @return {string[]}
     */
    public getCSSRules(): Array<string> {
        if (this.d.hasOwnProperty("rules")){
            return <Array<string>>this.d["rules"];
        } else {
            this.d["rules"] = new Array<any>();
            return this.getCSSRules();
        }
    }

    public clearChildren(): api.Renderable {
        this.d["children"] = new Array<any>();
        return this;
    }

    /**
     * 
     * @return {string[]}
     */
    public getChangedAttributes(): Array<string> {
        if (this.d["changedAttributes"] != null){
            const changed: Array<string> = <Array<string>>this.d["changedAttributes"];
            return changed;
        } else {
            this.d["changedAttributes"] = new Array<any>();
            return this.getChangedAttributes();
        }
    }

    public getNative(): HTMLElement {
        if (this.elem_ != null){
            return this.elem_;
        }
        const elem: HTMLElement = api.ContainerRenderer.getElementById(this.getId());
        if (elem != null){
            return elem;
        } else {
            return null;
        }
    }

    /**
     * 
     * @return {string[]}
     */
    public getChangedStyles(): Array<string> {
        if (this.d["changedStyles"] != null){
            const changed: Array<string> = <Array<string>>this.d["changedStyles"];
            return changed;
        } else {
            this.d["changedStyles"] = new Array<any>();
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
    public flush(s: string) {
        if (s === ("a28n12l10")){
            delete this.d["changedAttributes"];
            delete this.d["changedStyles"];
        }
    }

    /**
     * 
     * @return {*[]}
     */
    public getRenderers(): Array<api.Renderer<any>> {
        const arr: Array<api.Renderer<any>> = <Array<api.Renderer<any>>>this.d["renderers"];
        if (arr != null){
            return arr;
        } else {
            return <any>(new Array<api.Renderer<any>>());
        }
    }

    /**
     * 
     * @param {*} renderer
     * @return {JSContainer}
     */
    public addRenderer(renderer: api.Renderer<any>): JSContainer {
        let arr: Array<api.Renderer<any>> = <Array<api.Renderer<any>>>this.d["renderers"];
        if (arr == null){
            arr = <any>(new Array<api.Renderer<any>>());
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
    public getId(): string {
        const custom: Object = <Object>this.getCustomProperties();
        if (custom != null){
            if (custom.hasOwnProperty("id")){
                return <string>custom["id"];
            }
        }
        let id: string = <string>this.d["id"];
        if (id == null){
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
    uid(): string {
        JSContainer.idCount++;
        return JSContainer.idCount + "";
    }

    addOrRemoveClass(cls: string, b: boolean) {
        if (b && !this.hasClass(cls)){
            this.addClass(cls);
        } else if (!b && this.hasClass(cls)){
            this.removeClass(cls);
        }
    }

    /**
     * 
     * @param {string} styleClass
     * @return {JSContainer}
     */
    public addClass(styleClass: string): JSContainer {
        let styles: string = this.getAttribute("class");
        if (styles == null){
            styles = "";
        }
        const aStyles: string[] = styles.split(" ");
        const toAdds: string[] = styleClass.split(" ");
        let res: string = "";
        for(let index207=0; index207 < toAdds.length; index207++) {
            let toAdd = toAdds[index207];
            {
                toAdd = toAdd.trim();
                if (toAdd.length > 0){
                    let add: boolean = true;
                    for(let index208=0; index208 < aStyles.length; index208++) {
                        let style = aStyles[index208];
                        {
                            style = style.trim();
                            if (style.length > 0){
                                if (style.trim() === toAdd){
                                    add = false;
                                }
                            }
                        }
                    }
                    if (add){
                        res = res + " " + toAdd;
                    }
                }
            }
        }
        res = res.trim();
        this.setAttribute("class", (styles.trim() + " " + res).trim());
        return this;
    }

    public hasClass(cls: string): boolean {
        if (cls == null){
            return false;
        }
        cls = cls.trim();
        if (cls === ""){
            return false;
        }
        if (cls.indexOf(" ") >= 0){
            throw new Error("Cannot check with multiple classes. You should probably check with each class one by one");
        }
        const styles: string = this.getAttribute("class");
        if (styles == null){
            return false;
        }
        const aStyles: string[] = styles.split(" ");
        for(let index209=0; index209 < aStyles.length; index209++) {
            let style = aStyles[index209];
            {
                style = style.trim();
                if (style !== ""){
                    if (style === cls){
                        return true;
                    }
                }
            }
        }
        return false;
    }

    public toggleClass(cls: string): api.Renderable {
        if (this.hasClass(cls)){
            this.removeClass(cls);
        } else {
            this.addClass(cls);
        }
        return this;
    }

    /**
     * 
     * @param {string} cls
     * @return {JSContainer}
     */
    public removeClass(cls: string): JSContainer {
        if (cls != null && cls.trim() !== ""){
            const toremove: string[] = cls.split(" ");
            for(let index210=0; index210 < toremove.length; index210++) {
                let s = toremove[index210];
                {
                    this.removeSingleClass(s);
                }
            }
        }
        return this;
    }

    public removeSingleClass(cls: string): JSContainer {
        const cl: string = this.getAttribute("class");
        if (cl != null && cl.length > 0){
            const classes: string[] = cl.split(" ");
            let result: string = "";
            for(let index211=0; index211 < classes.length; index211++) {
                let scl = classes[index211];
                {
                    if (scl !== cls){
                        if (result === ""){
                            result = scl;
                        } else {
                            result = result + " " + scl;
                        }
                    }
                }
            }
            this.setAttribute("class", result);
        }
        return this;
    }

    public addChild$framework_components_api_Renderable(container: api.Renderable): api.Renderable {
        if (container == null){
            throw new Error("addChild(null): Child component cannot be null.");
        }
        if (container.isValidParent(this)){
            (<JSContainer><any>container).d["parent"] = this;
            this.getChildren().push(container);
        } else {
            throw new Error("Cannot add this container here because this is not a valid a parent");
        }
        return this;
    }

    public addChild$java_lang_String$java_lang_String(name: string, tag: string): JSContainer {
        const child: JSContainer = new JSContainer(name, tag);
        this.addChild$framework_components_api_Renderable(child);
        return child;
    }

    public addChild$java_lang_String$java_lang_String$java_lang_String(name: string, tag: string, cls: string): JSContainer {
        const child: JSContainer = new JSContainer(name, tag);
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
    public addChild(name?: any, tag?: any, cls?: any): any {
        if (((typeof name === 'string') || name === null) && ((typeof tag === 'string') || tag === null) && ((typeof cls === 'string') || cls === null)) {
            return <any>this.addChild$java_lang_String$java_lang_String$java_lang_String(name, tag, cls);
        } else if (((typeof name === 'string') || name === null) && ((typeof tag === 'string') || tag === null) && cls === undefined) {
            return <any>this.addChild$java_lang_String$java_lang_String(name, tag);
        } else if (((name != null && (name.constructor != null && name.constructor["__interfaces"] != null && name.constructor["__interfaces"].indexOf("framework.components.api.Renderable") >= 0)) || name === null) && tag === undefined && cls === undefined) {
            return <any>this.addChild$framework_components_api_Renderable(name);
        } else throw new Error('invalid overload');
    }

    public isValidParent(parent: api.Renderable): boolean {
        return true;
    }

    /**
     * 
     * @param {number} index
     * @param {*} child
     * @return {*}
     */
    public addChildAt(index: number, child: api.Renderable): api.Renderable {
        (<JSContainer><any>child).d["parent"] = this;
        const children: Array<api.Renderable> = <any>(new Array<api.Renderable>());
        let i: number = 0;
        let added: boolean = false;
        {
            let array213 = this.getChildren();
            for(let index212=0; index212 < array213.length; index212++) {
                let c = array213[index212];
                {
                    if (i === index){
                        children.push(child);
                        added = true;
                    }
                    children.push(c);
                    i++;
                }
            }
        }
        if (!added){
            children.push(child);
        }
        (<JSContainer><any>child).d["parent"] = this;
        this.d["children"] = children;
        return this;
    }

    /**
     * 
     * @param {boolean} b
     * @return {JSContainer}
     */
    public setVisible(b: boolean): JSContainer {
        if (!b){
            this.setStyle("display", "none");
            this.addClass("slds-hidden");
        } else {
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
    public addEventListener(listener: api.EventListener, type: string): JSContainer {
        let listeners: Object = this.getListeners();
        if (listeners == null){
            listeners = <Object>new Object();
            this.d["listeners"] = listeners;
        }
        if (!listeners.hasOwnProperty(type)){
            listeners[type] = new Array<any>();
        }
        const current: Array<api.EventListener> = <Array<api.EventListener>>listeners[type];
        if (current.lastIndexOf(listener) < 0){
            (<Array<api.EventListener>>listeners[type]).push(listener);
        } else {
            console.log("trap  coq");
        }
        return this;
    }

    /**
     * 
     * @return {string}
     */
    public getTag(): string {
        return this.getString("tag");
    }

    /**
     * 
     * @param {string} tag
     * @return {JSContainer}
     */
    public setTag(tag: string): JSContainer {
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
    public setStyle(key: string, value: string): JSContainer {
        this.getChangedStyles().push(key);
        if (value != null){
            if (this.d["styles"] == null){
                this.d["styles"] = <Object>new Object();
            }
            (<Object>this.d["styles"])[key] = value;
        } else {
            if (this.d["styles"] != null){
                delete (<Object>this.d["styles"])[key];
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
    public getStyle(key: string): string {
        if (this.d["styles"] != null){
            return <string>(<Object>this.d["styles"])[key];
        }
        return null;
    }

    /**
     * 
     * @param {string} key
     * @param {string} value
     * @return {JSContainer}
     */
    public setAttribute(key: string, value: string): JSContainer {
        this.getChangedAttributes().push(key);
        if (value != null){
            if (this.d["attributes"] == null){
                this.d["attributes"] = <Object>new Object();
            }
            (<Object>this.d["attributes"])[key] = value;
        } else {
            if (this.d["attributes"] != null)delete (<Object>this.d["attributes"])[key];
        }
        return this;
    }

    /**
     * 
     * @param {string} key
     * @return {string}
     */
    public getAttribute(key: string): string {
        if (this.d["attributes"] != null){
            return <string>(<Object>this.d["attributes"])[key];
        }
        return null;
    }

    /**
     * 
     * @return {string}
     */
    public getName(): string {
        const name: string = this.getAttribute("name");
        if (name == null){
            return "";
        }
        return name;
    }

    /**
     * 
     * @param {string} name
     */
    public setName(name: string) {
        this.setAttribute("name", name);
    }

    /**
     * 
     * @return {JSContainer}
     */
    public getParent(): JSContainer {
        return <JSContainer>this.d["parent"];
    }

    /**
     * 
     * @return {*[]}
     */
    public getChildren(): Array<api.Renderable> {
        const children: Array<api.Renderable> = <Array<api.Renderable>>this.d["children"];
        if (children != null){
            return <Array<api.Renderable>>children;
        } else {
            this.d["children"] = new Array<any>();
            return this.getChildren();
        }
    }

    /**
     * 
     * @return {java.lang.String[]}
     */
    public getStyleNames(): string[] {
        const styles: Object = <Object>this.d["styles"];
        if (styles != null){
            return Object.keys(styles);
        }
        return [];
    }

    /**
     * 
     * @return {java.lang.String[]}
     */
    public getAttributeNames(): string[] {
        const styles: Object = <Object>this.d["attributes"];
        if (styles != null){
            return Object.keys(styles);
        }
        return [];
    }

    /**
     * 
     * @return {string}
     */
    public getHtml(): string {
        const html: string = this.getString("html");
        if (html == null){
            return "";
        }
        return html;
    }

    /**
     * 
     * @param {string} h
     * @return {JSContainer}
     */
    public setHtml(h: string): JSContainer {
        this.setString("html", h);
        this.setRendered(false);
        return this;
    }

    /**
     * 
     * @return {boolean}
     */
    public isRendered(): boolean {
        return <boolean>this.d["rendered"];
    }

    /**
     * 
     * @param {boolean} b
     * @return {*}
     */
    public setRendered(b: boolean): api.Renderable {
        this.d["rendered"] = b;
        if (!b){
            this.elem_ = null;
            {
                let array215 = this.getChildren();
                for(let index214=0; index214 < array215.length; index214++) {
                    let child = array215[index214];
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
    public getListeners(): Object {
        const l: Object = <Object>this.d["listeners"];
        if (l == null){
            this.d["listeners"] = <Object>new Object();
            return this.getListeners();
        }
        return l;
    }

    public render$() {
        if (this.getParent() == null){
            const nat: HTMLElement = this.getNative();
            if (nat != null){
                const parent: HTMLElement = nat.parentElement;
                if (parent != null){
                    this.render$jsweet_dom_HTMLElement(nat.parentElement);
                } else {
                    this.render$jsweet_dom_HTMLElement(null);
                }
            } else {
                this.render$jsweet_dom_HTMLElement(null);
            }
        } else {
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
    public postRender(root: HTMLElement) {
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
    contains(lst: Array<any>, o: any): boolean {
        return lst.indexOf(o) >= 0;
    }

    public render$jsweet_dom_HTMLElement(parent: HTMLElement) {
        let renderers: Array<api.Renderer<any>> = this.getRenderers();
        if (renderers.length === 0){
            renderers.push(JSContainer.defaultRenderer_$LI$());
        }
        if (!this.contains(renderers, JSContainer.defaultRenderer_$LI$())){
            const tmp: Array<api.Renderer<any>> = <any>(new Array<api.Renderer<any>>());
            tmp.push(JSContainer.defaultRenderer_$LI$());
            for(let index216=0; index216 < renderers.length; index216++) {
                let r = renderers[index216];
                {
                    tmp.push(r);
                }
            }
            renderers = tmp;
        }
        for(let index217=0; index217 < renderers.length; index217++) {
            let renderer = renderers[index217];
            renderer.doRender(this, parent)
        }
        {
            let array219 = this.getChildren();
            for(let index218=0; index218 < array219.length; index218++) {
                let child = array219[index218];
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
    public render(parent?: any) {
        if (((parent != null && parent instanceof <any>HTMLElement) || parent === null)) {
            return <any>this.render$jsweet_dom_HTMLElement(parent);
        } else if (parent === undefined) {
            return <any>this.render$();
        } else throw new Error('invalid overload');
    }

    /**
     * 
     * @return {*}
     */
    public getCustomProperties(): any {
        return this.d["data"];
    }

    /**
     * 
     * @param {*} data
     */
    public setCustomProperties(data: any) {
        const previous: Object = <Object>this.d["data"];
        if (previous != null && previous instanceof <any>Array){
            const arData: Array<Object> = <Array<Object>>previous;
            for(let index220=0; index220 < arData.length; index220++) {
                let line = arData[index220];
                {
                    const value: string = <string>line["value"];
                    this.setAttribute(value, null);
                }
            }
        } else {
            if (previous != null){
                {
                    let array222 = Object.keys(previous);
                    for(let index221=0; index221 < array222.length; index221++) {
                        let key = array222[index221];
                        {
                            this.setAttribute(key, null);
                        }
                    }
                }
            }
        }
        this.d["data"] = data;
        if (data != null){
            if (data != null && data instanceof <any>Array){
                const arData: Array<Object> = <Array<Object>>data;
                for(let index223=0; index223 < arData.length; index223++) {
                    let line = arData[index223];
                    {
                        const text: string = <string>line["text"];
                        const value: string = <string>line["value"];
                        this.setAttribute(value, text);
                    }
                }
            } else {
                {
                    let array225 = Object.keys(data);
                    for(let index224=0; index224 < array225.length; index224++) {
                        let key = array225[index224];
                        {
                            this.setAttribute(key, <string>(<Object>data)[key]);
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
    public getAncestorWithClass<T extends api.Renderable>(cls: string): T {
        const parent: JSContainer = this.getParent();
        if (parent == null){
            return null;
        }
        const clsss: string = parent.getAttribute("class");
        if (clsss != null){
            {
                let array227 = parent.getAttribute("class").split(" ");
                for(let index226=0; index226 < array227.length; index226++) {
                    let s = array227[index226];
                    {
                        if (s.trim() === cls)return <T><any>parent;
                    }
                }
            }
        }
        return <any>((<JSContainer>parent).getAncestorWithClass<any>(cls));
    }

    /**
     * 
     * @param {string} id
     * @return {JSContainer}
     */
    public getAncestorById(id: string): JSContainer {
        const parent: JSContainer = this.getParent();
        if (this.getId() === id)return <JSContainer>this;
        if (parent == null){
            return null;
        }
        return parent.getAncestorById(id);
    }

    /**
     * 
     * @param {string} name
     * @return {JSContainer}
     */
    public getAncestorByName(name: string): JSContainer {
        if (this.getName() === name)return this;
        const parent: JSContainer = this.getParent();
        if (parent == null){
            return null;
        }
        return parent.getAncestorByName(name);
    }

    /**
     * 
     * @return {JSContainer}
     */
    public getRoot(): JSContainer {
        const parent: JSContainer = this.getParent();
        if (parent == null){
            return this;
        } else {
            return parent.getRoot();
        }
    }

    /*private*/ setString(key: string, value: string) {
        this.d[key] = value;
    }

    /*private*/ getString(key: string): string {
        return <string>this.d[key];
    }

    /**
     * 
     * @param {*} data
     * @return {*}
     */
    public setUserData(data: any): api.Renderable {
        this.d["userData"] = data;
        return this;
    }

    /**
     * 
     * @return {*}
     */
    public getUserData(): any {
        return this.d["userData"];
    }

    /**
     * 
     * @param {HTMLElement} elem
     */
    public setElement(elem: HTMLElement) {
        this.elem_ = elem;
    }

    /**
     * 
     * @return {HTMLElement}
     */
    public getElement(): HTMLElement {
        return this.getNative();
    }
}
JSContainer["__class"] = "framework.components.JSContainer";
JSContainer["__interfaces"] = ["framework.components.api.Renderable"];



namespace JSContainer {

    export class JSContainer$0 implements api.EventListener {
        public __parent: any;
        /**
         * 
         * @param {*} source
         * @param {Event} evt
         */
        public performAction(source: api.Renderable, evt: Event) {
            evt["source"] = source;
            (target => (typeof target === 'function') ? target(source, evt) : (<any>target).apply(source, evt))(this.listener);
        }

        constructor(__parent: any, private listener: any) {
            this.__parent = __parent;
        }
    }
    JSContainer$0["__interfaces"] = ["framework.components.api.EventListener"];


}


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
    /*private*/ currentActive: string;

    /*private*/ currentIndex: number;

    public constructor(name: string, tag: string) {
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
    public addItem(item: CardLayoutItem): CardLayout {
        this.addChild$framework_components_api_Renderable(item);
        if (this.getChildren().length > 1){
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
    public addItems(...items: CardLayoutItem[]): CardLayout {
        for(let index228=0; index228 < items.length; index228++) {
            let item = items[index228];
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
    public getCurrentIndex(): number {
        return this.currentIndex;
    }

    /**
     * Search and return the {@link CardLayoutItem} having the specified index
     * 
     * @param {number} index - The index of the {@link CardLayoutItem} searching for
     * @return {CardLayoutItem} - The {@link CardLayoutItem} item having specified index
     */
    public getItem(index: number): CardLayoutItem {
        if (index < this.getChildren().length){
            return <CardLayoutItem><any>this.getChildren()[index];
        } else {
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
    public getIndex(name: string): number {
        let index: number = 0;
        {
            let array230 = this.getChildren();
            for(let index229=0; index229 < array230.length; index229++) {
                let child = array230[index229];
                {
                    if (child.getName() === name){
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
    public next(...params: Object[]): CardLayoutItem {
        if (this.currentIndex < (this.getChildren().length - 1)){
            const current: CardLayoutItem = this.getItem(this.currentIndex);
            const validateEvent: CustomEvent = new CustomEvent("validate");
            validateEvent["source"] = current;
            validateEvent["valid"] = true;
            current.fireListener("validate", validateEvent);
            const isValid: boolean = <boolean>validateEvent["valid"];
            if (isValid){
                this.currentIndex++;
                const item: CardLayoutItem = this.getItem(this.currentIndex);
                this.activate.apply(this, [item.getName()].concat(<any[]>params));
                const nextEvent: CustomEvent = new CustomEvent("next");
                nextEvent["from"] = current;
                nextEvent["to"] = item;
                nextEvent["source"] = current;
                nextEvent["dest"] = item;
                this.fireListener("next", nextEvent);
                return item;
            } else {
                return null;
            }
        } else {
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
    public previous(...params: Object[]): CardLayoutItem {
        if (this.currentIndex > 0){
            const current: CardLayoutItem = this.getItem(this.currentIndex);
            this.currentIndex--;
            const item: CardLayoutItem = this.getItem(this.currentIndex);
            this.activate.apply(this, [item.getName()].concat(<any[]>params));
            const previousEvent: CustomEvent = new CustomEvent("previous");
            previousEvent["from"] = current;
            previousEvent["to"] = item;
            previousEvent["source"] = current;
            previousEvent["dest"] = item;
            this.fireListener("previous", previousEvent);
            return item;
        } else {
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
    public back(...params: Object[]): CardLayoutItem {
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
    public first(...params: Object[]): CardLayoutItem {
        if (this.currentIndex > 0){
            const current: CardLayoutItem = this.getItem(this.currentIndex);
            this.currentIndex = 0;
            const item: CardLayoutItem = this.getItem(this.currentIndex);
            this.activate.apply(this, [item.getName()].concat(<any[]>params));
            this.activate.apply(this, [item.getName()].concat(<any[]>params));
            const firstEvent: CustomEvent = new CustomEvent("first");
            firstEvent["from"] = current;
            firstEvent["to"] = item;
            firstEvent["source"] = current;
            firstEvent["dest"] = item;
            this.fireListener("first", firstEvent);
            return item;
        } else {
            this.currentIndex = 0;
            const item: CardLayoutItem = this.getItem(this.currentIndex);
            return item;
        }
    }

    public last(...params: Object[]): CardLayoutItem {
        if (this.currentIndex < (this.getChildren().length - 1)){
            const current: CardLayoutItem = this.getItem(this.currentIndex);
            this.currentIndex = this.getChildren().length - 1;
            const item: CardLayoutItem = this.getItem(this.currentIndex);
            this.activate.apply(this, [item.getName()].concat(<any[]>params));
            const lastEvent: CustomEvent = new CustomEvent("last");
            lastEvent["from"] = current;
            lastEvent["to"] = item;
            lastEvent["source"] = current;
            lastEvent["dest"] = item;
            this.fireListener("last", lastEvent);
            return item;
        } else {
            this.currentIndex = this.getChildren().length - 1;
            const item: CardLayoutItem = this.getItem(this.currentIndex);
            return item;
        }
    }

    public getDefault(): string {
        const def: string = this.getAttribute("default");
        if (def == null || def === ""){
            if (this.getChildren().length > 0){
                return this.getChildren()[0].getName();
            } else {
                return null;
            }
        } else {
            return def;
        }
    }

    public activate(name: string, ...params: Object[]) {
        if (name === this.currentActive && this.currentIndex >= 0){
            return;
        }
        {
            let array232 = this.getChildren();
            for(let index231=0; index231 < array232.length; index231++) {
                let child = array232[index231];
                {
                    if (child.getName() === name){
                        const evt: CustomEvent = new CustomEvent("activate");
                        evt["data"] = child;
                        evt["source"] = this;
                        if (params != null){
                            if (params.length > 1){
                                evt["params"] = params;
                            } else if (params.length === 1){
                                evt["params"] = params;
                                evt["param"] = params[0];
                            }
                        }
                        (<JSContainer><any>child).fireListener("activate", evt);
                        child.setStyle("display", "block");
                    } else if (child.getName() === this.currentActive){
                        const evt: CustomEvent = new CustomEvent("deactivate");
                        evt["data"] = child;
                        (<JSContainer><any>child).fireListener("deactivate", evt);
                        child.setStyle("display", "none");
                    } else {
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
    public advancedEventTypes(): string[] {
        return ["first", "previous", "next", "last"];
    }

    public refresh() {
        const def: string = this.getDefault();
        {
            let array234 = this.getChildren();
            for(let index233=0; index233 < array234.length; index233++) {
                let r = array234[index233];
                {
                    if (r.getName() === def){
                        r.setStyle("display", null);
                    } else {
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
    public constructor(name: string, tag: string) {
        super(name, tag);
    }

    /**
     * returns array of specific supported events
     * @return {java.lang.String[]}
     */
    public advancedEventTypes(): string[] {
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
    public constructor(name: string) {
        super(name, "script");
        this.setAttribute("type", "text/javascript");
    }

    /**
     * Sets the source of the external javascript
     * @param {string} src - source of file
     * @return {ExternalJavascript} - this
     */
    public setSource(src: string): ExternalJavascript {
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
class ExternalStylesheet extends JSContainer implements api.Renderer<ExternalStylesheet> {
    public static ORIGIN_ANONYMOUS: string = "anonymous";

    public static ORIGIN_USE_CREDENTIALS: string = "use-credentials";

    public static MEDIA_DEFAULT: string = null;

    public static MEDIA_ALL: string = "all";

    public static MEDIA_SCREEN: string = "screen";

    public static MEDIA_PRINT: string = "print";

    public static MEDIA_SPEECH: string = "speech";

    public constructor(name: string) {
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
    public setSource(src: string): ExternalStylesheet {
        this.setAttribute("source", src);
        return this;
    }

    /**
     * Sets the cross origin value of the css file
     * @param {string} origin - cross origin value
     * @return {ExternalStylesheet} - updated instance of this
     */
    public setCrossOrigin(origin: string): ExternalStylesheet {
        this.setAttribute("crossorigin", origin);
        return this;
    }

    /**
     * Sets the media of the css file
     * @param {string} media - the media of the css file
     * @return {ExternalStylesheet} - updated instance of this
     */
    public setMedia(media: string): ExternalStylesheet {
        this.setAttribute("media", media);
        return this;
    }

    public doRender$framework_components_ExternalStylesheet$jsweet_dom_HTMLElement(c: ExternalStylesheet, root: HTMLElement) {
        if (c.getAncestorWithClass<any>("builder") != null){
            const nati: HTMLElement = c.getNative();
            if (nati != null){
                nati.remove();
            }
        }
    }

    /**
     * Rendered used internally which avoids rendering of the css file when the tag is used in our buider.
     * @param {ExternalStylesheet} c
     * @param {HTMLElement} root
     */
    public doRender(c?: any, root?: any) {
        if (((c != null && c instanceof <any>ExternalStylesheet) || c === null) && ((root != null && root instanceof <any>HTMLElement) || root === null)) {
            return <any>this.doRender$framework_components_ExternalStylesheet$jsweet_dom_HTMLElement(c, root);
        } else throw new Error('invalid overload');
    }
}
ExternalStylesheet["__class"] = "framework.components.ExternalStylesheet";
ExternalStylesheet["__interfaces"] = ["framework.components.api.Renderable","framework.components.api.Renderer"];



/**
 * Constructs an instance of this component
 * 
 * @param {string} name     The name of the component
 * @param {string} template The html template of this component
 * @class
 * @extends JSContainer
 * @author Rossaye Abdool Kureem
 */
class HTMLTemplateContainer extends JSContainer implements api.TemplateRenderable {
    /**
     * A context that contains variables exposed to the html template. This can be
     * used by javascript to transmit data from the framework to the template.
     * Depending on the compiler of the template, the data in the context are rendered<br>
     * refer to documentation of implementation of {@link HTMLTemplateContainer} used for understanding on how the context are used to render the template.
     */
    public context: Object;

    /*private*/ template: string;

    public constructor(name: string, template: string) {
        super(name, "div");
        this.context = <Object>new Object();
        if (this.template === undefined) { this.template = null; }
        this.setTemplate(template);
    }

    /**
     * 
     * @return {string} The template of the component
     */
    public getTemplate(): string {
        return this.template;
    }

    /**
     * Sets the template of this component
     * 
     * @param {string} template The template of this component
     */
    public setTemplate(template: string) {
        this.template = template;
        this.setRendered(false);
    }

    /**
     * 
     * @return {Object} The variable context of this component
     */
    public getContext(): Object {
        return this.context;
    }

    public render$jsweet_dom_HTMLElement(parent: HTMLElement) {
        if (!this.isRendered()){
            const html: string = this.getTemplate();
            if (html != null){
                let cxt: Object = this.context;
                if (cxt == null){
                    cxt = <Object>new Object();
                }
                cxt["component"] = this;
                cxt["me"] = this;
                cxt["$this"] = this;
                let rendered: string = this.compile(html, cxt);
                const tmp: HTMLElement = document.createElement("div");
                tmp.innerHTML = rendered;
                let tm: Element = tmp.firstElementChild;
                const children: NodeList = tmp.childNodes;
                if (children.length > 1 || tm == null){
                    tm = tmp;
                }
                rendered = tm.innerHTML;
                const tag: string = tm.tagName;
                this.setTag(tag);
                const attrs: NamedNodeMap = tm.attributes;
                for(let index235=0; index235 < attrs.length; index235++) {
                    let att = attrs[index235];
                    {
                        this.setAttribute(att.name, att.value);
                    }
                }
                this.setHtml(rendered);
            } else {
                this.setHtml("Cannot load template:" + this.getTemplate());
            }
        }
        super.render$jsweet_dom_HTMLElement(parent);
    }

    /**
     * 
     * @param {HTMLElement} parent
     */
    public render(parent?: any) {
        if (((parent != null && parent instanceof <any>HTMLElement) || parent === null)) {
            return <any>this.render$jsweet_dom_HTMLElement(parent);
        } else if (parent === undefined) {
            return <any>this.render$();
        } else throw new Error('invalid overload');
    }

    public compile(html: string, ctx: Object): string {
        return html;
    }

    public static invokeFunction(target: Object, _function: string, ...args: any[]): any {
        if (target.hasOwnProperty(_function)){
            return (o => o.call.apply(o, [target].concat(<any[]>args)))((<Function>target[_function]));
        } else {
            throw new Error(target + " does not contain function:" + _function);
        }
    }
}
HTMLTemplateContainer["__class"] = "framework.components.HTMLTemplateContainer";
HTMLTemplateContainer["__interfaces"] = ["framework.components.api.Renderable","framework.components.api.TemplateRenderable"];



namespace input {
    /**
     * Creates a new instance of the button with specified name and text
     * @param {string} name - name of the button
     * @param {string} text - text inside the button
     * @class
     * @extends JSContainer
     * @author Kureem Rossaye
     */
    export class JSButton extends JSContainer {
        public constructor(name: string, text: string) {
            super(name, "input");
            this.setAttribute("type", api.InputType["_$wrappers"][api.InputType.BUTTON].getValue());
            this.setAttribute("value", text);
        }

        /**
         * Sets the type of the button
         * @param {api.InputType} type - type of the button. Valid values are: InputType.RESET | InputType.BUTTON | InputType.SUBMIT
         * @return {input.JSButton} - updated instance of this Button
         */
        public setType(type: api.InputType): JSButton {
            if (type != null){
                if (api.InputType["_$wrappers"][type].getGroup() !== "button"){
                    throw Object.defineProperty(new Error("only button types are allowed"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Object','java.lang.RuntimeException','java.lang.Exception'] });
                }
                this.setAttribute("type", api.InputType["_$wrappers"][type].getValue());
            } else {
                throw Object.defineProperty(new Error("cannot set null value for type attribute"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Object','java.lang.RuntimeException','java.lang.Exception'] });
            }
            return this;
        }
    }
    JSButton["__class"] = "framework.components.input.JSButton";
    JSButton["__interfaces"] = ["framework.components.api.Renderable"];


}
namespace input {
    /**
     * Creates a new instance of form with the specified name
     * @param {string} name - The name of the form
     * @class
     * @extends JSContainer
     * @author Kureem Rossaye
     */
    export class JSForm extends JSContainer {
        validationerrors: Object;

        public constructor(name: string) {
            super(name, "form");
            this.validationerrors = <Object>new Object();
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
        public advancedEventTypes(): string[] {
            return ["beforeValidate", "afterValidate", "beforeSetData", "afterSetData", "beforeGetData", "onError", "afterGetData", "beforeSubmit", "afterSubmit", "onSubmit", "onReset"];
        }

        /**
         * Return whether the form is valid of not after validating it.<br> If the form has not been validated yet,
         * this method will return true
         * @return {boolean} - Whether the form is valid or not
         */
        public isValid(): boolean {
            return Object.keys(this.validationerrors).length <= 0;
        }

        /**
         * Returns whether this form has errors or not after validating it<br> If the form has not been validated yet,
         * this method will return false
         * @return {boolean} - Whether this form has errors or not
         */
        public hasErrors(): boolean {
            return !this.isValid();
        }

        /**
         * 
         * @param {string} binding - The name or binding of the input element in the form
         * @return {api.ValidationException} - The validation exception if any for the specified binding of the form element
         */
        public getError(binding: string): api.ValidationException {
            return <api.ValidationException>this.validationerrors[binding];
        }

        /**
         * 
         * @return {Object} - All errors found after validating this form
         */
        public getErrors(): Object {
            return this.validationerrors;
        }

        /**
         * 
         * @param {string} binding - The binding or name of the input field to search for
         * @return {*} - The input field having specified name or binding
         */
        public getField(binding: string): api.InputField<any> {
            const result: Array<api.InputField<any>> = <any>(new Array<api.InputField<any>>());
            util.ComponentUtil.visit(this, new JSForm.JSForm$2(this, binding, result));
            if (result.length > 0){
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
        public validate(): boolean {
            const evt: CustomEvent = new CustomEvent("beforeValidate");
            evt["source"] = this;
            this.fireListener("beforeValidate", evt);
            this.validationerrors = <Object>new Object();
            util.ComponentUtil.visit(this, new JSForm.JSForm$3(this));
            if (Object.keys(this.validationerrors).length > 0){
                const onError: CustomEvent = new CustomEvent("onError");
                onError["source"] = this;
                onError["data"] = this.validationerrors;
                onError["errors"] = this.validationerrors;
                onError["hasError"] = Object.keys(this.validationerrors).length > 0;
                this.fireListener("onError", onError);
            }
            const evtAfter: CustomEvent = new CustomEvent("afterValidate");
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
        public setData(data: Object) {
            const evt: CustomEvent = new CustomEvent("beforeSetData");
            evt["source"] = this;
            evt["data"] = data;
            this.fireListener("beforeSetData", evt);
            util.ComponentUtil.visit(this, new JSForm.JSForm$4(this, data));
            const evtAfter: CustomEvent = new CustomEvent("afterSetData");
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
        public getData(): Object {
            const evt: CustomEvent = new CustomEvent("beforeGetData");
            evt["source"] = this;
            this.fireListener("beforeGetData", evt);
            const data: Object = <Object>new Object();
            util.ComponentUtil.visit(this, new JSForm.JSForm$5(this, data));
            const evtAfter: CustomEvent = new CustomEvent("afterGetData");
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
        public reset() {
            const data: Object = <Object>new Object();
            this.setData(data);
            const on: CustomEvent = new CustomEvent("onReset");
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
        public submit() {
            const evt: CustomEvent = new CustomEvent("beforeSubmit");
            evt["source"] = this;
            this.fireListener("beforeSubmit", evt);
            if (this.validate()){
                const data: Object = this.getData();
                const on: CustomEvent = new CustomEvent("onSubmit");
                on["source"] = this;
                on["data"] = data;
                this.fireListener("onSubmit", on);
            }
            const evtAfter: CustomEvent = new CustomEvent("afterSubmit");
            evtAfter["source"] = this;
            this.fireListener("afterSubmit", evtAfter);
        }
    }
    JSForm["__class"] = "framework.components.input.JSForm";
    JSForm["__interfaces"] = ["framework.components.api.Renderable"];



    export namespace JSForm {

        export class JSForm$0 implements api.EventListener {
            public __parent: any;
            /**
             * 
             * @param {*} source
             * @param {Event} evt
             */
            public performAction(source: api.Renderable, evt: Event) {
                this.__parent.submit();
            }

            constructor(__parent: any) {
                this.__parent = __parent;
            }
        }
        JSForm$0["__interfaces"] = ["framework.components.api.EventListener"];



        export class JSForm$1 implements api.EventListener {
            public __parent: any;
            /**
             * 
             * @param {*} source
             * @param {Event} evt
             */
            public performAction(source: api.Renderable, evt: Event) {
                this.__parent.reset();
            }

            constructor(__parent: any) {
                this.__parent = __parent;
            }
        }
        JSForm$1["__interfaces"] = ["framework.components.api.EventListener"];



        export class JSForm$2 implements util.ComponentUtil.ComponentVisitor {
            public __parent: any;
            /**
             * 
             * @param {*} designable
             */
            public doVisit(designable: api.Renderable) {
                if (designable != null && (designable.constructor != null && designable.constructor["__interfaces"] != null && designable.constructor["__interfaces"].indexOf("framework.components.api.InputField") >= 0)){
                    try {
                        const b: string = (<api.InputField<any>><any>designable).getBinding();
                        if (b === this.binding){
                            this.result.push((<api.InputField<any>><any>designable));
                        }
                    } catch(e) {
                        let binding: string = (<api.InputField<any>><any>designable).getBinding();
                        if (binding == null || binding.trim() === ""){
                            binding = designable.getName();
                        }
                        this.__parent.validationerrors[binding] = e;
                    }
                }
            }

            constructor(__parent: any, private binding: any, private result: any) {
                this.__parent = __parent;
            }
        }
        JSForm$2["__interfaces"] = ["framework.components.util.ComponentUtil.ComponentVisitor"];



        export class JSForm$3 implements util.ComponentUtil.ComponentVisitor {
            public __parent: any;
            /**
             * 
             * @param {*} designable
             */
            public doVisit(designable: api.Renderable) {
                if (designable != null && (designable.constructor != null && designable.constructor["__interfaces"] != null && designable.constructor["__interfaces"].indexOf("framework.components.api.InputField") >= 0)){
                    try {
                        (<api.InputField<any>><any>designable).validate();
                    } catch(e) {
                        let binding: string = (<api.InputField<any>><any>designable).getBinding();
                        if (binding == null || binding.trim() === ""){
                            binding = designable.getName();
                        }
                        this.__parent.validationerrors[binding] = e;
                    }
                }
            }

            constructor(__parent: any) {
                this.__parent = __parent;
            }
        }
        JSForm$3["__interfaces"] = ["framework.components.util.ComponentUtil.ComponentVisitor"];



        export class JSForm$4 implements util.ComponentUtil.ComponentVisitor {
            public __parent: any;
            /**
             * 
             * @param {*} designable
             */
            public doVisit(designable: api.Renderable) {
                if (designable != null && (designable.constructor != null && designable.constructor["__interfaces"] != null && designable.constructor["__interfaces"].indexOf("framework.components.api.InputField") >= 0)){
                    let binding: string = (<api.InputField<any>><any>designable).getBinding();
                    if (binding == null || binding.trim() === ""){
                        binding = designable.getName();
                    }
                    if (util.PropertyUtil.hasOwnProperty(this.data, binding)){
                        const obj: Object = util.PropertyUtil.getValue(this.data, binding);
                        if (designable != null && designable instanceof <any>input.JSDateInput){
                            try {
                                if (obj != null && obj instanceof <any>Date){
                                    (<api.InputField<any>><any>designable).setValue(obj);
                                } else {
                                    const date: Date = new Date(/* parseLong */parseInt(obj.toString()));
                                    (<api.InputField<any>><any>designable).setValue(date);
                                }
                            } catch(e) {
                                (<api.InputField<any>><any>designable).setValue(obj);
                            }
                        } else {
                            (<api.InputField<any>><any>designable).setValue(obj);
                        }
                    } else {
                        (<api.InputField<any>><any>designable).setValue(null);
                    }
                }
            }

            constructor(__parent: any, private data: any) {
                this.__parent = __parent;
            }
        }
        JSForm$4["__interfaces"] = ["framework.components.util.ComponentUtil.ComponentVisitor"];



        export class JSForm$5 implements util.ComponentUtil.ComponentVisitor {
            public __parent: any;
            /**
             * 
             * @param {*} designable
             */
            public doVisit(designable: api.Renderable) {
                if (designable != null && (designable.constructor != null && designable.constructor["__interfaces"] != null && designable.constructor["__interfaces"].indexOf("framework.components.api.InputField") >= 0)){
                    let binding: string = (<api.InputField<any>><any>designable).getBinding();
                    if (binding == null || binding.trim() === ""){
                        binding = designable.getName();
                    }
                    const value: Object = <Object>(<api.InputField<any>><any>designable).getValue();
                    util.PropertyUtil.setValue(this.data, value, binding);
                }
            }

            constructor(__parent: any, private data: any) {
                this.__parent = __parent;
            }
        }
        JSForm$5["__interfaces"] = ["framework.components.util.ComponentUtil.ComponentVisitor"];


    }

}
namespace input {
    export class JSInput<T> extends JSContainer implements api.InputField<T> {
        public constructor(name: string) {
            super(name, "input");
        }

        public setSize(size: number) {
            this.setAttribute("size", size + "");
        }

        public setPattern(pattern: string) {
            this.setAttribute("pattern", pattern);
        }

        public setRequired(b: boolean): JSInput<T> {
            if (b){
                this.setAttribute("required", "true");
            } else this.setAttribute("required", null);
            return this;
        }

        public setDisabled(b: boolean): JSInput<T> {
            if (b){
                this.setAttribute("disabled", "true");
            } else {
                this.setAttribute("disabled", null);
            }
            return this;
        }

        public setReadOnly(b: boolean): JSInput<T> {
            if (b){
                this.setAttribute("readonly", "true");
            } else {
                this.setAttribute("readonly", null);
            }
            return this;
        }

        toHtmlDateString(date: Date): string {
            let month: string = (date.getMonth() + 1) + "";
            if (month.length === 1){
                month = "0" + month;
            }
            let sdate: string = (date.getDate()) + "";
            if (sdate.length === 1){
                sdate = "0" + sdate;
            }
            return date.getFullYear() + "-" + month + "-" + sdate;
        }

        getDoubleValue(): number {
            const nat: HTMLElement = this.getNative();
            if (nat != null){
                const el: HTMLInputElement = <HTMLInputElement>nat;
                return el.valueAsNumber;
            }
            return parseFloat(this.getAttribute("value"));
        }

        getStringValue(): string {
            const nat: HTMLElement = this.getNative();
            if (nat != null){
                const el: HTMLInputElement = <HTMLInputElement>nat;
                return el.value;
            }
            return this.getAttribute("value");
        }

        getDateValue(): Date {
            const nat: HTMLElement = this.getNative();
            if (nat != null){
                const el: HTMLInputElement = <HTMLInputElement>nat;
                return el.valueAsDate;
            }
            return new Date(this.getAttribute("value"));
        }

        getNativeInput(): HTMLInputElement {
            const nat: HTMLElement = this.getNative();
            if (nat != null){
                const el: HTMLInputElement = <HTMLInputElement>nat;
                return el;
            }
            return null;
        }

        setDoubleValue(val: number) {
            const el: HTMLInputElement = this.getNativeInput();
            if (el != null){
                el.valueAsNumber = val;
            }
            this.setAttribute("value", val + "");
        }

        setStringValue(s: string) {
            const el: HTMLInputElement = this.getNativeInput();
            if (el != null){
                el.value = s;
            }
            this.setAttribute("value", s);
        }

        setDateValue(date: Date) {
            const el: HTMLInputElement = this.getNativeInput();
            if (el != null){
                el.valueAsDate = date;
            }
            if (date != null)this.setAttribute("value", this.toHtmlDateString(date)); else this.setAttribute("value", "");
        }

        public getBinding(): string {
            return this.getAttribute("binding");
        }

        public setPlaceHolder(placeholder: string): JSInput<T> {
            this.setAttribute("placeholder", placeholder);
            return this;
        }

        /**
         * 
         */
        public validate() {
            let valid: boolean = true;
            const e: api.ValidationException = new api.ValidationException();
            const nat: HTMLElement = this.getNative();
            if (nat != null){
                const el: HTMLInputElement = <HTMLInputElement>nat;
                valid = el.checkValidity();
                if (!valid){
                    api.ValidationException.throwError$java_lang_String$jsweet_dom_ValidityState(el.validationMessage, el.validity);
                }
            }
            const validate: CustomEvent = new CustomEvent("validate");
            validate["errors"] = e.errors;
            validate["valid"] = valid;
            validate["source"] = this;
            this.fireListener("validate", validate);
            if (!valid){
                throw e;
            }
        }

        /**
         * 
         * @return {java.lang.String[]}
         */
        public advancedEventTypes(): string[] {
            return ["validate"];
        }

        public setBinding(binding: string): JSInput<T> {
            this.setAttribute("binding", binding);
            return this;
        }

        /**
         * 
         * @return {*}
         */
        public getValue(): T {
            const inp: HTMLInputElement = <HTMLInputElement>this.getNative();
            if (inp != null)return (<T><any>inp.value); else return <T><any>this.getAttribute("value");
        }

        /**
         * 
         * @param {*} val
         */
        public setValue(val: T) {
            const inp: HTMLInputElement = <HTMLInputElement>this.getNative();
            if (inp != null)inp.value = <any>val;
            this.setAttribute("text", <any>val);
        }
    }
    JSInput["__class"] = "framework.components.input.JSInput";
    JSInput["__interfaces"] = ["framework.components.api.InputField","framework.components.api.Renderable"];


}
namespace input {
    /**
     * Creates a new instance of {@link JSOption} with the specified text and value
     * @param {string} text - The text to display for the option
     * @param {string} value - the value of the option
     * @class
     * @extends JSContainer
     * @author Kureem Rossaye
     */
    export class JSOption extends JSContainer {
        public constructor(text: string, value: string) {
            super("option");
            this.setAttribute("value", value);
            this.setHtml(text);
        }

        /**
         * The value of the option
         * @return {string} - The value of the option
         */
        public getValue(): string {
            return this.getAttribute("value");
        }

        /**
         * Sets the value of the option
         * @param {string} value - The value of the option
         */
        public setValue(value: string) {
            this.setAttribute("value", value);
        }

        /**
         * 
         * @return {string} - The text of the option
         */
        public getText(): string {
            return this.getHtml();
        }

        /**
         * Sets the text or label of the option
         * @param {string} text - The text of the option
         */
        public setText(text: string) {
            this.setHtml(text);
        }

        /**
         * Mark or unmark this option as selected
         * @param {boolean} b - Whether to select or not select this option
         */
        public setSelected(b: boolean) {
            if (b){
                this.setAttribute("selected", "true");
            } else {
                this.setAttribute("selected", null);
            }
        }

        /**
         * 
         * @return {boolean} - Whether this option is selected or not
         */
        public isSelected(): boolean {
            const opt: HTMLOptionElement = <HTMLOptionElement>this.getNative();
            if (opt != null){
                return opt.selected;
            } else {
                const attr: string = this.getAttribute("selected");
                if (attr != null && attr === "true"){
                    return true;
                } else {
                    return false;
                }
            }
        }
    }
    JSOption["__class"] = "framework.components.input.JSOption";
    JSOption["__interfaces"] = ["framework.components.api.Renderable"];


}
namespace input {
    export class JSSelect extends JSContainer implements api.InputField<any> {
        /*private*/ previousValue: string;

        /*private*/ data: Array<Object>;

        public constructor(name: string) {
            super(name, "select");
            if (this.previousValue === undefined) { this.previousValue = null; }
            if (this.data === undefined) { this.data = null; }
        }

        public setOptions$java_lang_String(options: string): JSSelect {
            const opts: string[] = options.split("\n");
            for(let index236=0; index236 < opts.length; index236++) {
                let opt = opts[index236];
                {
                    this.addOption$java_lang_String$java_lang_String(opt, opt);
                }
            }
            return this;
        }

        public setOptions(options?: any): any {
            if (((typeof options === 'string') || options === null)) {
                return <any>this.setOptions$java_lang_String(options);
            } else if (((options != null && options instanceof <any>Array) || options === null)) {
                return <any>this.setOptions$jsweet_lang_Array(options);
            } else throw new Error('invalid overload');
        }

        public addOption$framework_components_input_JSOption(option: input.JSOption): JSSelect {
            if (this.data == null){
                this.data = <any>(new Array<Object>());
            }
            if (this.findItem(option.getValue()) == null){
                const opt: Object = <Object>new Object();
                opt["text"] = option.getText();
                opt["value"] = option.getValue();
                this.data.push(opt);
                this.addChild$framework_components_api_Renderable(option);
            }
            return this;
        }

        public addOption$java_lang_String$java_lang_String(text: string, value: string): JSSelect {
            return this.addOption$framework_components_input_JSOption(new input.JSOption(text, value));
        }

        public addOption(text?: any, value?: any): any {
            if (((typeof text === 'string') || text === null) && ((typeof value === 'string') || value === null)) {
                return <any>this.addOption$java_lang_String$java_lang_String(text, value);
            } else if (((text != null && text instanceof <any>input.JSOption) || text === null) && value === undefined) {
                return <any>this.addOption$framework_components_input_JSOption(text);
            } else if (((text != null && text instanceof <any>Object) || text === null) && value === undefined) {
                return <any>this.addOption$jsweet_lang_Object(text);
            } else throw new Error('invalid overload');
        }

        public addOption$jsweet_lang_Object(opt: Object): JSSelect {
            let text: string = <string>opt["text"];
            text = text + "";
            let value: string = <string>opt["value"];
            value = value + "";
            return this.addOption$java_lang_String$java_lang_String(text, value);
        }

        /**
         * 
         * @return {*}
         */
        public clearChildren(): api.Renderable {
            this.data = null;
            return super.clearChildren();
        }

        public clearOptions(): api.Renderable {
            return this.clearChildren();
        }

        public setMultiple(b: boolean) {
            if (b){
                this.setAttribute("multiple", "true");
            } else {
                this.setAttribute("multiple", null);
            }
        }

        public setSize(size: number) {
            this.setAttribute("size", size + "");
        }

        public setPattern(pattern: string) {
            this.setAttribute("pattern", pattern);
        }

        public setRequired(b: boolean): JSSelect {
            if (b){
                this.setAttribute("required", "true");
            } else this.setAttribute("required", null);
            return this;
        }

        public setDisabled(b: boolean): JSSelect {
            if (b){
                this.setAttribute("disabled", "true");
            } else {
                this.setAttribute("disabled", null);
            }
            return this;
        }

        public setReadOnly(b: boolean): JSSelect {
            if (b){
                this.setAttribute("readonly", "true");
            } else {
                this.setAttribute("readonly", null);
            }
            return this;
        }

        public isMultiple(): boolean {
            return "true" === this.getAttribute("multiple");
        }

        /**
         * 
         * @return {*}
         */
        public getValue(): any {
            const ele: HTMLSelectElement = <HTMLSelectElement>this.getNative();
            if (ele != null){
                if (ele.multiple){
                    const result: Array<string> = <any>(new Array<string>());
                    for(let index237=0; index237 < ele.children.length; index237++) {
                        let e = ele.children[index237];
                        {
                            const opt: HTMLOptionElement = <HTMLOptionElement>e;
                            if (opt.selected)result.push(opt.value);
                        }
                    }
                    return result;
                } else {
                    return ele.value;
                }
            } else {
                const val: string = this.getAttribute("value");
                {
                    let array239 = this.getChildren();
                    for(let index238=0; index238 < array239.length; index238++) {
                        let opt = array239[index238];
                        {
                            if (opt.getAttribute("value") === val){
                                return (<input.JSOption><any>opt).getValue();
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
        public setValue(values: any) {
            this.previousValue = <string>this.getValue();
            if (values != null){
                const ele: HTMLSelectElement = <HTMLSelectElement>this.getNative();
                let firstVal: string = values.toString();
                let arrVal: Array<string> = <any>(new Array<string>());
                if (values != null && values instanceof <any>Array){
                    arrVal = <Array<any>>values;
                    if (arrVal.length > 0){
                        firstVal = arrVal[0];
                    } else {
                        firstVal = "";
                    }
                } else {
                    arrVal.push(<string>values);
                }
                if (ele != null){
                    ele.value = firstVal;
                }
                this.setAttribute("value", firstVal);
                {
                    let array241 = this.getChildren();
                    for(let index240=0; index240 < array241.length; index240++) {
                        let opt = array241[index240];
                        {
                            (<input.JSOption><any>opt).setSelected(false);
                            for(let index242=0; index242 < arrVal.length; index242++) {
                                let val = arrVal[index242];
                                {
                                    if (opt.getAttribute("value") === val){
                                        (<input.JSOption><any>opt).setSelected(true);
                                    }
                                }
                            }
                        }
                    }
                }
            } else {
                {
                    let array244 = this.getChildren();
                    for(let index243=0; index243 < array244.length; index243++) {
                        let opt = array244[index243];
                        {
                            (<input.JSOption><any>opt).setSelected(false);
                        }
                    }
                }
                const ele: HTMLSelectElement = <HTMLSelectElement>this.getNative();
                if (ele != null){
                    ele.value = "";
                }
                this.setAttribute("value", "");
            }
        }

        public getPreviousValue(): string {
            return this.previousValue;
        }

        /**
         * 
         */
        public validate() {
            let valid: boolean = true;
            const e: api.ValidationException = new api.ValidationException();
            const nat: HTMLElement = this.getNative();
            if (nat != null){
                const el: HTMLSelectElement = <HTMLSelectElement>nat;
                valid = el.checkValidity();
                if (!valid){
                    api.ValidationException.throwError$java_lang_String$jsweet_dom_ValidityState(el.validationMessage, el.validity);
                }
            }
            const validate: CustomEvent = new CustomEvent("validate");
            validate["errors"] = e.errors;
            validate["valid"] = valid;
            validate["source"] = this;
            this.fireListener("validate", validate);
            if (!valid){
                throw e;
            }
        }

        /**
         * 
         * @return {java.lang.String[]}
         */
        public advancedEventTypes(): string[] {
            return ["validate"];
        }

        public getBinding(): string {
            return this.getAttribute("binding");
        }

        public setData(data_: Array<Object>) {
            this.clearChildren();
            this.setRendered(false);
            for(let index245=0; index245 < data_.length; index245++) {
                let o = data_[index245];
                {
                    if (o.hasOwnProperty("value")){
                        const value: string = <string>o["value"];
                        const text: string = <string>o["text"];
                        this.addOption$framework_components_input_JSOption(new input.JSOption(text, value));
                    } else {
                        const value: string = <string>o.toString();
                        const text: string = <string>o.toString();
                        this.addOption$framework_components_input_JSOption(new input.JSOption(text, value));
                    }
                }
            }
        }

        public setOptions$jsweet_lang_Array(data_: Array<Object>) {
            this.setData(data_);
        }

        public getSelectedItems(): Array<Object> {
            const obj: any = this.getValue();
            const result: Array<Object> = <any>(new Array<Object>());
            if (this.isMultiple()){
                {
                    let array247 = <Array<string>>obj;
                    for(let index246=0; index246 < array247.length; index246++) {
                        let o = array247[index246];
                        {
                            const item: Object = this.findItem(o);
                            if (item != null){
                                result.push(item);
                            }
                        }
                    }
                }
            } else {
                if (obj != null){
                    const item: Object = this.findItem(obj.toString());
                    if (item != null){
                        result.push(item);
                    }
                }
            }
            return result;
        }

        public getData(): Array<Object> {
            return this.data;
        }

        public findItem(value: string): Object {
            if (this.data != null){
                for(let index248=0; index248 < this.data.length; index248++) {
                    let o = this.data[index248];
                    {
                        let val: string = <string>o["value"];
                        val = val + "";
                        const comp: string = value + "";
                        if (val != null && (val === comp)){
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
        public setBinding(binding: string): api.InputField<any> {
            this.setAttribute("binding", binding);
            return this;
        }
    }
    JSSelect["__class"] = "framework.components.input.JSSelect";
    JSSelect["__interfaces"] = ["framework.components.api.InputField","framework.components.api.Renderable"];


}
namespace input {
    export class JSTextArea extends JSContainer implements api.InputField<string> {
        public constructor(name: string) {
            super(name, "textarea");
        }

        public setRequired(b: boolean): JSTextArea {
            if (b){
                this.setAttribute("required", "true");
            } else this.setAttribute("required", null);
            return this;
        }

        public setDisabled(b: boolean): JSTextArea {
            if (b){
                this.setAttribute("disabled", "true");
            } else {
                this.setAttribute("disabled", null);
            }
            return this;
        }

        /**
         * 
         * @return {string}
         */
        public getValue(): string {
            const elem: HTMLTextAreaElement = <HTMLTextAreaElement>this.getNative();
            if (elem != null){
                return elem.value;
            }
            return this.getHtml();
        }

        public setValue$java_lang_String(val: string) {
            const elem: HTMLTextAreaElement = <HTMLTextAreaElement>this.getNative();
            if (elem != null){
                elem.value = val;
            }
            this.setHtml(val);
        }

        /**
         * 
         * @param {string} val
         */
        public setValue(val?: any) {
            if (((typeof val === 'string') || val === null)) {
                return <any>this.setValue$java_lang_String(val);
            } else throw new Error('invalid overload');
        }

        /**
         * 
         */
        public validate() {
            let valid: boolean = true;
            const e: api.ValidationException = new api.ValidationException();
            const nat: HTMLElement = this.getNative();
            if (nat != null){
                const el: HTMLTextAreaElement = <HTMLTextAreaElement>nat;
                valid = el.checkValidity();
                if (!valid){
                    api.ValidationException.throwError$java_lang_String$jsweet_dom_ValidityState(el.validationMessage, el.validity);
                }
            }
            const validate: CustomEvent = new CustomEvent("validate");
            validate["errors"] = e.errors;
            validate["valid"] = valid;
            validate["source"] = this;
            this.fireListener("validate", validate);
            if (!valid){
                throw e;
            }
        }

        /**
         * 
         * @return {java.lang.String[]}
         */
        public advancedEventTypes(): string[] {
            return ["validate"];
        }

        public setReadOnly(b: boolean): JSTextArea {
            if (b){
                this.setAttribute("readonly", "true");
            } else {
                this.setAttribute("readonly", null);
            }
            return this;
        }

        public getBinding(): string {
            return this.getAttribute("binding");
        }

        /**
         * 
         * @param {string} binding
         * @return {*}
         */
        public setBinding(binding: string): api.InputField<string> {
            this.setAttribute("binding", binding);
            return this;
        }
    }
    JSTextArea["__class"] = "framework.components.input.JSTextArea";
    JSTextArea["__interfaces"] = ["framework.components.api.InputField","framework.components.api.Renderable"];


}
namespace table {
    /**
     * Renders a table
     * 
     * @author Kureem Rossaye
     * @param {string} name
     * @class
     * @extends JSContainer
     */
    export class Table extends JSContainer {
        /*private*/ head: table.TableHead;

        /*private*/ body: table.TableBody;

        public constructor(name: string) {
            super(name, "table");
            this.head = new table.TableHead("head", this);
            this.body = new table.TableBody("body", this);
            this.addChild$framework_components_api_Renderable(this.head);
            this.addChild$framework_components_api_Renderable(this.body);
        }

        public fireOnClickRow(row: api.Renderable, rowIndex: number) {
            const clickRow: CustomEvent = new CustomEvent("clickRow");
            clickRow["source"] = row;
            clickRow["table"] = this;
            clickRow["rowIndex"] = rowIndex;
            clickRow["index"] = rowIndex;
            this.fireListener("clickRow", clickRow);
        }

        public fireOnDblClickRow(row: api.Renderable, rowIndex: number) {
            const clickRow: CustomEvent = new CustomEvent("dblClickRow");
            clickRow["source"] = row;
            clickRow["table"] = this;
            clickRow["rowIndex"] = rowIndex;
            clickRow["index"] = rowIndex;
            this.fireListener("dblClickRow", clickRow);
        }

        public getHead(): table.TableHead {
            return this.head;
        }

        public getBody(): api.Renderable {
            return this.body;
        }

        public getDataModel(): table.TableModel {
            return this.body.getModel();
        }

        public setDataModel(dataModel: table.TableModel) {
            this.body.setModel(dataModel);
        }

        public getColumnModel(): table.TableColumnModel {
            return this.head.getModel();
        }

        public setColumnModel(columnModel: table.TableColumnModel) {
            this.head.setModel(columnModel);
        }

        public refresh() {
            this.head.refresh();
            this.body.refresh();
        }
    }
    Table["__class"] = "framework.components.table.Table";
    Table["__interfaces"] = ["framework.components.api.Renderable"];


}
namespace table {
    export class TableBody extends JSContainer implements api.EventListener {
        /*private*/ table: table.Table;

        /*private*/ model: table.TableModel;

        public constructor(name: string, table: table.Table) {
            super(name, "tbody");
            if (this.table === undefined) { this.table = null; }
            if (this.model === undefined) { this.model = null; }
            this.table = table;
        }

        public getModel(): table.TableModel {
            return this.model;
        }

        public setModel(model: table.TableModel) {
            this.model = model;
        }

        public getTable(): table.Table {
            return this.table;
        }

        public refresh() {
            this.clearChildren();
            this.setRendered(false);
            const columnModel: table.TableColumnModel = this.table.getHead().getModel();
            if (this.model != null){
                for(let row: number = 0; row < this.model.getRowCount(); row++) {{
                    const r: JSContainer = new JSContainer("", "tr");
                    r.addEventListener(new TableBody.TableBody$0(this), "click");
                    this.addChild$framework_components_api_Renderable(r);
                    for(let col: number = 0; col < this.model.getColumnCount(); col++) {{
                        const cell: JSContainer = new JSContainer("", "td");
                        r.addChild$framework_components_api_Renderable(cell);
                        const val: any = this.model.getValueAt(row, col);
                        if (columnModel != null){
                            const column: table.TableColumn = columnModel.getColumn(col);
                            column.getCellRenderer().renderComponent(this.table, cell, val, false, false, row, col);
                        } else {
                            cell.setHtml(val != null ? val.toString() : "");
                        }
                    };}
                };}
            }
        }

        /**
         * 
         * @param {*} source
         * @param {Event} evt
         */
        public performAction(source: api.Renderable, evt: Event) {
            const index: number = (<number>this.getChildren().indexOf(source)|0);
            const me: MouseEvent = <MouseEvent>evt;
            const type: string = me.type;
            if (type === "click"){
                this.table.fireOnClickRow(source, index);
            } else {
                this.table.fireOnDblClickRow(source, index);
            }
        }
    }
    TableBody["__class"] = "framework.components.table.TableBody";
    TableBody["__interfaces"] = ["framework.components.api.EventListener","framework.components.api.Renderable"];



    export namespace TableBody {

        export class TableBody$0 implements api.EventListener {
            public __parent: any;
            /**
             * 
             * @param {*} source
             * @param {Event} evt
             */
            public performAction(source: api.Renderable, evt: Event) {
            }

            constructor(__parent: any) {
                this.__parent = __parent;
            }
        }
        TableBody$0["__interfaces"] = ["framework.components.api.EventListener"];


    }

}
namespace table {
    /**
     * Hold all the information for the definition of a column in a <code>Table</code>
     * @author Kureem Rossaye
     * @param {string} name
     * @class
     * @extends JSContainer
     */
    export class TableColumn extends JSContainer {
        public constructor(name: string) {
            super(name, "th");
            if (this.modelIndex === undefined) { this.modelIndex = 0; }
            if (this.identifier === undefined) { this.identifier = null; }
            if (this.headerRenderer === undefined) { this.headerRenderer = null; }
            if (this.headerValue === undefined) { this.headerValue = null; }
            if (this.cellRenderer === undefined) { this.cellRenderer = null; }
            if (this.resizable === undefined) { this.resizable = false; }
            this.identifier = name;
            this.setAttribute("scope", "col");
        }

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

        public getModelIndex(): number {
            return this.modelIndex;
        }

        public setModelIndex(modelIndex: number) {
            this.modelIndex = modelIndex;
        }

        public getIdentifier(): any {
            return this.identifier;
        }

        public setIdentifier(identifier: any) {
            this.identifier = identifier;
        }

        public getWidth(): number {
            return this.getDimensionStyle("width");
        }

        /*private*/ setDimensionStyle(name: string, value: number) {
            this.setStyle(name, value + api.Units["_$wrappers"][api.Units.PIXEL].getDisplay());
        }

        /*private*/ getDimensionStyle(name: string): number {
            let stWidth: string = this.getStyle(name);
            if (stWidth != null && stWidth.length > 0){
                {
                    let array250 = /* Enum.values */function() { let result: api.Units[] = []; for(let val in api.Units) { if (!isNaN(<any>val)) { result.push(parseInt(val,10)); } } return result; }();
                    for(let index249=0; index249 < array250.length; index249++) {
                        let u = array250[index249];
                        {
                            stWidth = /* replace */stWidth.split(api.Units["_$wrappers"][u].getDisplay()).join("");
                        }
                    }
                }
                return /* parseInt */parseInt(stWidth);
            }
            return null;
        }

        public setWidth(width: number) {
            this.setDimensionStyle("width", width);
        }

        public getMinWidth(): number {
            return this.getDimensionStyle("min-width");
        }

        public setMinWidth(minWidth: number) {
            this.setDimensionStyle("min-width", minWidth);
        }

        public getMaxWidth(): number {
            return this.getDimensionStyle("max-width");
        }

        public setMaxWidth(maxWidth: number) {
            this.setDimensionStyle("max-width", maxWidth);
        }

        public getHeaderRenderer(): table.TableCellRenderer {
            return this.headerRenderer;
        }

        public setHeaderRenderer(headerRenderer: table.TableCellRenderer) {
            this.headerRenderer = headerRenderer;
        }

        public getHeaderValue(): any {
            return this.headerValue;
        }

        public setHeaderValue(headerValue: any) {
            this.headerValue = headerValue;
            let html: string = "";
            if (headerValue != null){
                html = headerValue.toString();
            }
            this.setHtml(html);
        }

        public getCellRenderer(): table.TableCellRenderer {
            return this.cellRenderer;
        }

        public setCellRenderer(cellRenderer: table.TableCellRenderer) {
            this.cellRenderer = cellRenderer;
        }

        public isResizable(): boolean {
            return this.resizable;
        }

        public setResizable(resizable: boolean) {
            this.resizable = resizable;
        }
    }
    TableColumn["__class"] = "framework.components.table.TableColumn";
    TableColumn["__interfaces"] = ["framework.components.api.Renderable"];


}
namespace table {
    export class TableHead extends JSContainer {
        /*private*/ tableRow: JSContainer;

        /*private*/ table: table.Table;

        /*private*/ model_: table.TableColumnModel;

        public constructor(name: string, table: table.Table) {
            super(name, "thead");
            this.tableRow = new JSContainer("headerRow", "tr");
            if (this.table === undefined) { this.table = null; }
            if (this.model_ === undefined) { this.model_ = null; }
            this.addChild$framework_components_api_Renderable(this.tableRow);
            this.table = table;
        }

        public addColumn(column: table.TableColumn): TableHead {
            this.tableRow.addChild$framework_components_api_Renderable(column);
            const renderer: table.TableCellRenderer = column.getHeaderRenderer();
            if (renderer != null){
                renderer.renderComponent(this.table, column, column, false, false, -1, (<number>this.tableRow.getChildren().indexOf(column)|0));
            }
            return this;
        }

        public refresh() {
            this.tableRow.clearChildren();
            this.tableRow.setRendered(false);
            if (this.model_ != null){
                for(let i: number = 0; i < this.model_.getColumnCount(); i++) {{
                    const column: table.TableColumn = this.model_.getColumn(i);
                    this.addColumn(column);
                };}
            }
        }

        public getModel(): table.TableColumnModel {
            return this.model_;
        }

        public setModel(model: table.TableColumnModel) {
            this.model_ = model;
        }

        public getColumns(): Array<table.TableColumn> {
            const result: Array<any> = this.tableRow.getChildren();
            return result;
        }
    }
    TableHead["__class"] = "framework.components.table.TableHead";
    TableHead["__interfaces"] = ["framework.components.api.Renderable"];


}
namespace input {
    /**
     * Creates a new instance of reset button with specified name and text
     * @param {string} name - name of the reset button
     * @param {string} text - text inside the reset button
     * @class
     * @extends input.JSButton
     * @author Kureem Rossaye
     */
    export class JSReset extends input.JSButton {
        public constructor(name: string, text: string) {
            super(name, text);
            this.setType(api.InputType.RESET);
        }
    }
    JSReset["__class"] = "framework.components.input.JSReset";
    JSReset["__interfaces"] = ["framework.components.api.Renderable"];


}
namespace input {
    /**
     * Instantiate a submit button with specified name and text
     * @param {string} name - name of button
     * @param {string} text - text of the button
     * @class
     * @extends input.JSButton
     * @author Kureem Rossaye
     */
    export class JSSubmit extends input.JSButton {
        public constructor(name: string, text: string) {
            super(name, text);
            this.setType(api.InputType.SUBMIT);
        }
    }
    JSSubmit["__class"] = "framework.components.input.JSSubmit";
    JSSubmit["__interfaces"] = ["framework.components.api.Renderable"];


}
namespace input {
    export class JSCheckBox extends input.JSInput<boolean> {
        public constructor(name: string) {
            super(name);
            this.setAttribute("type", api.InputType["_$wrappers"][api.InputType.CHECKBOX].getValue());
        }

        /**
         * 
         * @return {boolean}
         */
        public getValue(): boolean {
            const el: HTMLInputElement = <HTMLInputElement>this.getNative();
            if (el != null){
                return el.checked;
            }
            if (this.getAttribute("value") != null && /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("true", this.getAttribute("value"))){
                return true;
            }
            return false;
        }

        public setValue$java_lang_Boolean(b: boolean) {
            if (b){
                this.setAttribute("value", "true");
                this.setAttribute("checked", "true");
            } else {
                this.setAttribute("value", "false");
                this.setAttribute("checked", null);
            }
            const el: HTMLInputElement = <HTMLInputElement>this.getNative();
            if (el != null){
                el.checked = b;
            }
        }

        /**
         * 
         * @param {boolean} b
         */
        public setValue(b?: any) {
            if (((typeof b === 'boolean') || b === null)) {
                return <any>this.setValue$java_lang_Boolean(b);
            } else if (((b != null) || b === null)) {
                super.setValue(b);
            } else throw new Error('invalid overload');
        }

        public isChecked(): boolean {
            return this.getValue();
        }

        public setChecked(b: boolean) {
            this.setValue$java_lang_Boolean(b);
        }
    }
    JSCheckBox["__class"] = "framework.components.input.JSCheckBox";
    JSCheckBox["__interfaces"] = ["framework.components.api.InputField","framework.components.api.Renderable"];


}
namespace input {
    export class JSDateInput extends input.JSInput<Date> {
        public constructor(name: string) {
            super(name);
            this.setType(api.InputType.DATE);
            this.addEventListener(new JSDateInput.JSDateInput$0(this), "change");
        }

        public setType(type: api.InputType): JSDateInput {
            if (type != null){
                if (api.InputType["_$wrappers"][type].getGroup() !== "date"){
                    throw Object.defineProperty(new Error("only date types are allowed"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Object','java.lang.RuntimeException','java.lang.Exception'] });
                }
                this.setAttribute("type", api.InputType["_$wrappers"][type].getValue());
            } else {
                throw Object.defineProperty(new Error("cannot set null value for type attribute"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Object','java.lang.RuntimeException','java.lang.Exception'] });
            }
            return this;
        }

        /**
         * 
         * @return {Date}
         */
        public getValue(): Date {
            return this.getDateValue();
        }

        public setValue$jsweet_lang_Date(val: Date) {
            this.setDateValue(val);
        }

        /**
         * 
         * @param {Date} val
         */
        public setValue(val?: any) {
            if (((val != null && val instanceof <any>Date) || val === null)) {
                return <any>this.setValue$jsweet_lang_Date(val);
            } else if (((val != null) || val === null)) {
                super.setValue(val);
            } else throw new Error('invalid overload');
        }

        public setMin(min: Date) {
            this.setAttribute("min", this.toHtmlDateString(min));
        }

        public setMax(max: Date) {
            this.setAttribute("max", this.toHtmlDateString(max));
        }
    }
    JSDateInput["__class"] = "framework.components.input.JSDateInput";
    JSDateInput["__interfaces"] = ["framework.components.api.InputField","framework.components.api.Renderable"];



    export namespace JSDateInput {

        export class JSDateInput$0 implements api.EventListener {
            public __parent: any;
            /**
             * 
             * @param {*} source
             * @param {Event} evt
             */
            public performAction(source: api.Renderable, evt: Event) {
                this.__parent.setValue(this.__parent.getValue());
            }

            constructor(__parent: any) {
                this.__parent = __parent;
            }
        }
        JSDateInput$0["__interfaces"] = ["framework.components.api.EventListener"];


    }

}
namespace input {
    export class JSNumberInput extends input.JSInput<number> {
        public constructor(name: string) {
            super(name);
            this.setType(api.InputType.NUMBER);
        }

        public setType(type: api.InputType): JSNumberInput {
            if (type != null){
                if (api.InputType["_$wrappers"][type].getGroup() !== "number"){
                    throw Object.defineProperty(new Error("only numeric types are allowed"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Object','java.lang.RuntimeException','java.lang.Exception'] });
                }
                this.setAttribute("type", api.InputType["_$wrappers"][type].getValue());
            } else {
                throw Object.defineProperty(new Error("cannot set null value for type attribute"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Object','java.lang.RuntimeException','java.lang.Exception'] });
            }
            return this;
        }

        public setStep(step: number) {
            this.setAttribute("step", step + "");
        }

        public getStep(): number {
            return parseInt(this.getAttribute("step"));
        }

        /**
         * 
         * @return {number}
         */
        public getValue(): number {
            return this.getDoubleValue();
        }

        public setValue$java_lang_Double(val: number) {
            this.setDoubleValue(val);
        }

        /**
         * 
         * @param {number} val
         */
        public setValue(val?: any) {
            if (((typeof val === 'number') || val === null)) {
                return <any>this.setValue$java_lang_Double(val);
            } else if (((val != null) || val === null)) {
                super.setValue(val);
            } else throw new Error('invalid overload');
        }

        public setMin(min: number) {
            this.setAttribute("min", min + "");
        }

        public setMax(max: number) {
            this.setAttribute("max", "" + max);
        }
    }
    JSNumberInput["__class"] = "framework.components.input.JSNumberInput";
    JSNumberInput["__interfaces"] = ["framework.components.api.InputField","framework.components.api.Renderable"];


}
namespace input {
    export class JSTextInput extends input.JSInput<string> {
        public constructor(name: string) {
            super(name);
            this.setType(api.InputType.TEXT);
        }

        public setMaxLength(length: number) {
            this.setAttribute("maxlength", length + "");
        }

        public setType(type: api.InputType): JSTextInput {
            if (type != null){
                if (api.InputType["_$wrappers"][type].getGroup() === "text"){
                    this.setAttribute("type", api.InputType["_$wrappers"][type].getValue());
                } else {
                    throw Object.defineProperty(new Error("only text input types can be set as type"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Object','java.lang.RuntimeException','java.lang.Exception'] });
                }
            } else {
                this.setAttribute("type", null);
            }
            return this;
        }

        /**
         * 
         * @return {string}
         */
        public getValue(): string {
            return this.getStringValue();
        }

        public setValue$java_lang_String(val: string) {
            this.setStringValue(val);
        }

        /**
         * 
         * @param {string} val
         */
        public setValue(val?: any) {
            if (((typeof val === 'string') || val === null)) {
                return <any>this.setValue$java_lang_String(val);
            } else if (((val != null) || val === null)) {
                super.setValue(val);
            } else throw new Error('invalid overload');
        }

        public getMask(): string {
            return this.getAttribute("mask");
        }

        public setMask(mask: string) {
            this.setAttribute("mask", mask);
            this.setRendered(false);
        }
    }
    JSTextInput["__class"] = "framework.components.input.JSTextInput";
    JSTextInput["__interfaces"] = ["framework.components.api.InputField","framework.components.api.Renderable"];


}
namespace input {
    export class JSTimeInput extends input.JSInput<Date> {
        /*private*/ savedDate: Date;

        public constructor(name: string) {
            super(name);
            this.savedDate = new Date();
            this.setAttribute("type", api.InputType["_$wrappers"][api.InputType.TIME].getValue());
        }

        /**
         * 
         * @return {Date}
         */
        public getValue(): Date {
            const time: string = this.getStringValue();
            const d: Date = this.savedDate;
            if (time != null && /* contains */(time.indexOf(":") != -1)){
                const htmn: string[] = time.split(":");
                d.setHours(parseInt(htmn[0]), parseInt(htmn[1]));
            }
            return d;
        }

        public setValue$jsweet_lang_Date(val: Date) {
            if (val != null){
                this.savedDate = val;
                let mins: string = val.getMinutes() + "";
                if (mins.length === 1){
                    mins = "0" + mins;
                }
                let hrs: string = val.getHours() + "";
                if (hrs.length === 1){
                    hrs = "0" + hrs;
                }
                this.setStringValue(hrs + ":" + mins);
            }
        }

        /**
         * 
         * @param {Date} val
         */
        public setValue(val?: any) {
            if (((val != null && val instanceof <any>Date) || val === null)) {
                return <any>this.setValue$jsweet_lang_Date(val);
            } else if (((val != null) || val === null)) {
                super.setValue(val);
            } else throw new Error('invalid overload');
        }
    }
    JSTimeInput["__class"] = "framework.components.input.JSTimeInput";
    JSTimeInput["__interfaces"] = ["framework.components.api.InputField","framework.components.api.Renderable"];


}
namespace input {
    export class JSRadio extends input.JSCheckBox {
        public constructor(name: string) {
            super(name);
            this.setAttribute("type", api.InputType["_$wrappers"][api.InputType.RADIO].getValue());
        }
    }
    JSRadio["__class"] = "framework.components.input.JSRadio";
    JSRadio["__interfaces"] = ["framework.components.api.InputField","framework.components.api.Renderable"];


}


JSContainer.defaultRenderer_$LI$();
