/* Generated from Java with JSweet 3.0.0 - http://www.jsweet.org */
namespace framework.components.api {
    export class ContainerRenderer implements framework.components.api.Renderer<framework.components.api.Renderable> {
        public static timeSpent: number = 0;

        public static getElementById(id: string): HTMLElement {
            return document.getElementById(id);
        }

        public doRender(c: framework.components.api.Renderable, root: HTMLElement) {
            const jq: HTMLElement = ContainerRenderer.getElementById(c.getId());
            const tag: string = c.getTag();
            const rendered: boolean = c.isRendered();
            const name: string = c.getName();
            const html: string = c.getHtml();
            const parent: framework.components.api.Renderable = c.getParent();
            if (!rendered){
                if (jq != null)jq.remove();
                const njq: HTMLElement = document.createElement(tag);
                if (name != null && name.length > 0)njq.setAttribute("name", name);
                njq.setAttribute("id", c.getId());
                njq.innerHTML = html;
                this.renderAttributes(njq, c, false);
                this.renderStyles(njq, c, false);
                if (parent == null){
                    if (root == null){
                        const body: Node = document.getElementsByTagName("body")[0];
                        body.appendChild(njq);
                    } else {
                        root.appendChild(njq);
                    }
                } else {
                    if (parent != null && (parent.constructor != null && parent.constructor["__interfaces"] != null && parent.constructor["__interfaces"].indexOf("framework.components.api.TemplateRenderable") >= 0)){
                        const elem: Element = ContainerRenderer.getElementById(parent.getId()).querySelector("[name=" + name + "]");
                        elem.parentElement.replaceChild(njq, elem);
                    } else {
                        const index: number = parent.getChildren().indexOf(c);
                        let nextSib: framework.components.api.Renderable = null;
                        if (index < parent.getChildren().length - 1){
                            nextSib = parent.getChildren()[index + 1];
                            if (!nextSib.isRendered()){
                                nextSib = null;
                            }
                        }
                        if (nextSib != null){
                            const p: Node = ContainerRenderer.getElementById(parent.getId());
                            p.insertBefore(njq, ContainerRenderer.getElementById(nextSib.getId()));
                        } else {
                            try {
                                ContainerRenderer.getElementById(parent.getId()).appendChild(njq);
                            } catch(e) {
                                console.error(e.message, e);
                            }
                        }
                    }
                }
                const me: framework.components.api.Renderable = c;
                const component: framework.components.api.Renderable = me;
                this.doNothing(component);
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

        /*private*/ doNothing(r: framework.components.api.Renderable) {
        }

        execCommands(njq: HTMLElement, container: framework.components.api.Renderable) {
        }

        renderEvents(njq: HTMLElement, c: framework.components.api.Renderable) {
            const keys: string[] = Object.keys(c.getListeners());
            for(let index33032=0; index33032 < keys.length; index33032++) {
                let key = keys[index33032];
                {
                    const listeners: Array<framework.components.api.EventListener> = <Array<framework.components.api.EventListener>>c.getListeners()[key];
                    njq.addEventListener(key, ((listeners) => {
                        return (evt) => {
                            for(let index33033=0; index33033 < listeners.length; index33033++) {
                                let l = listeners[index33033];
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

        renderAttributes(njq: HTMLElement, c: framework.components.api.Renderable, changed: boolean) {
            if (changed){
                {
                    let array33035 = c.getChangedAttributes();
                    for(let index33034=0; index33034 < array33035.length; index33034++) {
                        let key = array33035[index33034];
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
                    let array33037 = c.getAttributeNames();
                    for(let index33036=0; index33036 < array33037.length; index33036++) {
                        let key = array33037[index33036];
                        {
                            const attr: string = c.getAttribute(key);
                            if (attr != null)ContainerRenderer.setAttribute(njq, key, attr);
                        }
                    }
                }
            }
            if (!njq.classList.contains(c.getId())){
                njq.classList.add(c.getId());
            }
        }

        clearAttributes(elem: HTMLElement) {
            const attrs: NamedNodeMap = elem.attributes;
            for(let i: number = 0; i < attrs.length; i++) {{
                if (!(attrs[i].name === ("id")))elem.removeAttribute(attrs[i].name);
            };}
        }

        clearStyles(jq: HTMLElement) {
            jq.removeAttribute("style");
        }

        renderStyles(njq: HTMLElement, c: framework.components.api.Renderable, changed: boolean) {
            if (changed){
                {
                    let array33039 = c.getChangedStyles();
                    for(let index33038=0; index33038 < array33039.length; index33038++) {
                        let key = array33039[index33038];
                        {
                            njq.style.setProperty(key, c.getStyle(key));
                        }
                    }
                }
            } else {
                {
                    let array33041 = c.getStyleNames();
                    for(let index33040=0; index33040 < array33041.length; index33040++) {
                        let key = array33041[index33040];
                        {
                            njq.style.setProperty(key, c.getStyle(key));
                        }
                    }
                }
            }
        }

        public static setAttribute(element: HTMLElement, attribute: string, value: string) {
            try {
                element.setAttribute(attribute, value);
            } catch(e) {
                console.warn("Invalid attribute :" + attribute + " set to:" + element.toString());
            }
        }

        public static processCSSRules(renderable: framework.components.api.Renderable, nativeNode: HTMLElement) {
            const rules: Array<string> = renderable.getCSSRules();
            if (rules.length > 0){
                const styleelem: HTMLStyleElement = <HTMLStyleElement>document.createElement("style");
                styleelem.type = "text/css";
                nativeNode.appendChild(styleelem);
                const sheet: CSSStyleSheet = <CSSStyleSheet>styleelem.sheet;
                for(let index33042=0; index33042 < rules.length; index33042++) {
                    let rule = rules[index33042];
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
namespace framework.components.api {
    /**
     * Interface to implement when adding events on components.
     * @author Rossaye Abdool Kureem
     * Jul 11, 2018
     * @class
     */
    export interface EventListener {
        performAction(source: framework.components.api.Renderable, evt: Event);
    }
}
namespace framework.components.api {
    /**
     * All components which allows a user to input a value implements this interface.<br>
     * This interface defines methods that allows setting and retrieving values
     * @author Kureem Rossaye
     * 
     * @param <T>
     * @class
     */
    export interface InputField<T> extends framework.components.api.Renderable {
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
namespace framework.components.api {
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
        getRenderers(): Array<framework.components.api.Renderer<any>>;

        /**
         * Adds a rendered to the list of {@link Renderer} used to render this
         * component.
         * 
         * @param {*} renderer
         * {@link Renderer} to add to this component
         * @return {*} This current {@link Renderable}
         */
        addRenderer(renderer: framework.components.api.Renderer<any>): Renderable;

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
        addEventListener(listener: framework.components.api.EventListener, type: string): Renderable;

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
         * @param {string} rule
         * @return {*} The current renderable
         */
        addCSSRule(rule: string): Renderable;

        /**
         * returns all stylesheet rules associated with this component
         * @return {string[]} All stylesheet rules
         */
        getCSSRules(): Array<string>;
    }
}
namespace framework.components.api {
    /**
     * Interface to implemented by renderer of components
     * @author Kureem Rossaye
     * 
     * @param <T>
     * @class
     */
    export interface Renderer<T extends framework.components.api.Renderable> {
        /**
         * Render the specified component and attach it to the specified parent
         * @param {*} renderable The component to render
         * @param {HTMLElement} parent The parent to which the component is attached
         */
        doRender(renderable: T, parent: HTMLElement);
    }
}
namespace framework.components.api {
    export class StringInputTypes {
        public static text: string = "text";

        public static password: string = "password";

        public static email: string = "email";

        public static url: string = "url";

        public static search: string = "search";

        public static tel: string = "tel";

        public static color: string = "color";

        public static types: string[]; public static types_$LI$(): string[] { if (StringInputTypes.types == null) { StringInputTypes.types = [StringInputTypes.text, StringInputTypes.password, StringInputTypes.email, StringInputTypes.url, StringInputTypes.search, StringInputTypes.tel, StringInputTypes.color]; }  return StringInputTypes.types; }
    }
    StringInputTypes["__class"] = "framework.components.api.StringInputTypes";

}
namespace framework.components.api {
    /**
     * More specific component that is rendered based on a specified template instead of a simple tag
     * @author Kureem Rossaye
     * @class
     */
    export interface TemplateRenderable extends framework.components.api.Renderable {
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
namespace framework.components.api {
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
         * 
         */
        static serialVersionUID: number = 1;

        public errors: Array<Object>;

        public constructor(message?: any, errorCode?: any) {
            if (((typeof message === 'string') || message === null) && ((typeof errorCode === 'number') || errorCode === null)) {
                let __args = arguments;
                super("Validation Error");
                this.errors = <any>(new Array<Object>());
                ValidationException.addError(message, errorCode, this);
            } else if (((typeof message === 'number') || message === null) && errorCode === undefined) {
                let __args = arguments;
                let errorCode: any = __args[0];
                super();
                this.errors = <any>(new Array<Object>());
                ValidationException.addError("", errorCode, this);
            } else if (message === undefined && errorCode === undefined) {
                let __args = arguments;
                super();
                this.errors = <any>(new Array<Object>());
            } else throw new Error('invalid overload');
        }

        public static addError(msg: string, code: number, e: ValidationException) {
            eval("if(!e[\'errors\']){e[\'errors\'] = [];}e[\'errors\'].push({\'msg\':msg, \'code\':code});");
        }
    }
    ValidationException["__class"] = "framework.components.api.ValidationException";
    ValidationException["__interfaces"] = ["java.io.Serializable"];


}
namespace framework.components.api {
    export interface Validator<T> {
        validate(source: framework.components.api.InputField<T>): boolean;

        getErrorMessage(): string;

        getSuccessMessage(): string;

        supports(clazz: any);
    }
}
namespace framework.components {
    export class Boot {
        public static main(args: string[]) {
            const table: framework.components.MonthView = new framework.components.MonthView("wv");
            table.reset();
            setTimeout((((table) => {
                return (e) => {
                    table.render$jsweet_dom_HTMLElement(framework.components.api.ContainerRenderer.getElementById("semainetype"));
                    table.render$jsweet_dom_HTMLElement(framework.components.api.ContainerRenderer.getElementById("semainetype"));
                }
            })(table)), 1000);
        }
    }
    Boot["__class"] = "framework.components.Boot";

}
namespace framework.components {
    export class FileUploader {    }
    FileUploader["__class"] = "framework.components.FileUploader";

}
namespace framework.components.input {
    export class DateInputTypes {
        public static date: string = "date";

        public static month: string = "month";

        public static week: string = "week";

        public static types: string[]; public static types_$LI$(): string[] { if (DateInputTypes.types == null) { DateInputTypes.types = [DateInputTypes.date, DateInputTypes.month, DateInputTypes.week]; }  return DateInputTypes.types; }
    }
    DateInputTypes["__class"] = "framework.components.input.DateInputTypes";

}
namespace framework.components.input {
    export class NumericInputTypes {
        public static number: string = "number";

        public static range: string = "range";

        public static types: string[]; public static types_$LI$(): string[] { if (NumericInputTypes.types == null) { NumericInputTypes.types = [NumericInputTypes.number, NumericInputTypes.range]; }  return NumericInputTypes.types; }
    }
    NumericInputTypes["__class"] = "framework.components.input.NumericInputTypes";

}
namespace framework.components.table {
    export interface TableCellRenderer {
        renderComponent(table: framework.components.table.Table, container: framework.components.api.Renderable, value: any, isSelected: boolean, hasFocus: boolean, row: number, column: number);
    }
}
namespace framework.components.table {
    export class TableColumn {
        /**
         * The index of the column in the model which is to be displayed by this
         * <code>TableColumn</code>. As columns are moved around in the view
         * <code>modelIndex</code> remains constant.
         */
        modelIndex: number;

        /**
         * This object is not used internally by the drawing machinery of the
         * <code>JTable</code>; identifiers may be set in the <code>TableColumn</code>
         * as as an optional way to tag and locate table columns. The table package does
         * not modify or invoke any methods in these identifier objects other than the
         * <code>equals</code> method which is used in the <code>getColumnIndex()</code>
         * method in the <code>DefaultTableColumnModel</code>.
         */
        identifier: any;

        /**
         * The width of the column.
         */
        width: number;

        /**
         * The minimum width of the column.
         */
        minWidth: number;

        /**
         * The maximum width of the column.
         */
        maxWidth: number;

        /**
         * The renderer used to draw the header of the column.
         */
        headerRenderer: framework.components.table.TableCellRenderer;

        /**
         * The header value of the column.
         */
        headerValue: any;

        /**
         * The renderer used to draw the data cells of the column.
         */
        cellRenderer: framework.components.table.TableCellRenderer;

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
            return this.width;
        }

        public setWidth(width: number) {
            this.width = width;
        }

        public getMinWidth(): number {
            return this.minWidth;
        }

        public setMinWidth(minWidth: number) {
            this.minWidth = minWidth;
        }

        public getMaxWidth(): number {
            return this.maxWidth;
        }

        public setMaxWidth(maxWidth: number) {
            this.maxWidth = maxWidth;
        }

        public getHeaderRenderer(): framework.components.table.TableCellRenderer {
            return this.headerRenderer;
        }

        public setHeaderRenderer(headerRenderer: framework.components.table.TableCellRenderer) {
            this.headerRenderer = headerRenderer;
        }

        public getHeaderValue(): any {
            return this.headerValue;
        }

        public setHeaderValue(headerValue: any) {
            this.headerValue = headerValue;
        }

        public getCellRenderer(): framework.components.table.TableCellRenderer {
            return this.cellRenderer;
        }

        public setCellRenderer(cellRenderer: framework.components.table.TableCellRenderer) {
            this.cellRenderer = cellRenderer;
        }

        public isResizable(): boolean {
            return this.resizable;
        }

        public setResizable(resizable: boolean) {
            this.resizable = resizable;
        }

        constructor() {
            if (this.modelIndex === undefined) { this.modelIndex = 0; }
            if (this.identifier === undefined) { this.identifier = null; }
            if (this.width === undefined) { this.width = 0; }
            if (this.minWidth === undefined) { this.minWidth = 0; }
            if (this.maxWidth === undefined) { this.maxWidth = 0; }
            if (this.headerRenderer === undefined) { this.headerRenderer = null; }
            if (this.headerValue === undefined) { this.headerValue = null; }
            if (this.cellRenderer === undefined) { this.cellRenderer = null; }
            if (this.resizable === undefined) { this.resizable = false; }
        }
    }
    TableColumn["__class"] = "framework.components.table.TableColumn";

}
namespace framework.components.table {
    export interface TableColumnModel {
        /**
         * Appends <code>aColumn</code> to the end of the
         * <code>tableColumns</code> array.
         * This method posts a <code>columnAdded</code>
         * event to its listeners.
         * 
         * @param   {framework.components.table.TableColumn} aColumn         the <code>TableColumn</code> to be added
         * @see     #removeColumn
         */
        addColumn(aColumn: framework.components.table.TableColumn);

        /**
         * Deletes the <code>TableColumn</code> <code>column</code> from the
         * <code>tableColumns</code> array.  This method will do nothing if
         * <code>column</code> is not in the table's column list.
         * This method posts a <code>columnRemoved</code>
         * event to its listeners.
         * 
         * @param   {framework.components.table.TableColumn} column          the <code>TableColumn</code> to be removed
         * @see     #addColumn
         */
        removeColumn(column: framework.components.table.TableColumn);

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
         * @return  {framework.components.table.TableColumn} the <code>TableColumn</code> object for
         * the column at <code>columnIndex</code>
         */
        getColumn(columnIndex: number): framework.components.table.TableColumn;
    }
}
namespace framework.components.table {
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
        addTableModelListener(l: framework.components.table.TableModelListener);

        /**
         * Removes a listener from the list that is notified each time a
         * change to the data model occurs.
         * 
         * @param   {*} l               the TableModelListener
         */
        removeTableModelListener(l: framework.components.table.TableModelListener);
    }
}
namespace framework.components.table {
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

        source: framework.components.table.TableModel;

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
         * @return {number}
         */
        public getFirstRow(): number {
            return this.firstRow;
        }

        /**
         * Returns the last row that changed.
         * @return {number}
         */
        public getLastRow(): number {
            return this.lastRow;
        }

        /**
         * Returns the column for the event.  If the return
         * value is ALL_COLUMNS; it means every column in the specified
         * rows changed.
         * @return {number}
         */
        public getColumn(): number {
            return this.column;
        }

        /**
         * Returns the type of event - one of: INSERT, UPDATE and DELETE.
         * @return {number}
         */
        public getType(): number {
            return this.type;
        }
    }
    TableModelEvent["__class"] = "framework.components.table.TableModelEvent";

}
namespace framework.components.table {
    export interface TableModelListener {
        tableChanged(e: framework.components.table.TableModelEvent);
    }
}
namespace framework.components.util {
    export class ComponentUtil {
        public static visit(designable: framework.components.api.Renderable, visitor: ComponentUtil.ComponentVisitor) {
            visitor.doVisit(designable);
            {
                let array33044 = designable.getChildren();
                for(let index33043=0; index33043 < array33044.length; index33043++) {
                    let child = array33044[index33043];
                    {
                        ComponentUtil.visit(child, visitor);
                    }
                }
            }
        }

        public static getTags(type: string): Array<Object> {
            const html5tags: Array<Object> = <any>(window["html5tags"]);
            const result: Array<Object> = <any>(new Array<Object>());
            for(let index33045=0; index33045 < html5tags.length; index33045++) {
                let html5tag = html5tags[index33045];
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
            doVisit(designable: framework.components.api.Renderable);
        }
    }

}
namespace framework.components.util {
    export class PropertyUtil {
        public static DOCUMENT_STRCTURE_HIDE_CONTEXT_MENU_ADDED: boolean = false;

        public static REMOTESERVER: string = "";

        public static getValue(obj: Object, property: string): Object {
            if (obj == null){
                return null;
            }
            if (/* contains */(property.indexOf(".") != -1)){
                const parts: string[] = property.split(".");
                let tmp: Object = obj;
                for(let index33046=0; index33046 < parts.length; index33046++) {
                    let part = parts[index33046];
                    {
                        tmp = PropertyUtil.getValue(tmp, part);
                    }
                }
                return tmp;
            } else {
                return <Object>obj[property];
            }
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
                for(let index33047=0; index33047 < kvs.length; index33047++) {
                    let kv = kvs[index33047];
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
namespace framework.components {
    export class Util {
        public static DAYS: string[]; public static DAYS_$LI$(): string[] { if (Util.DAYS == null) { Util.DAYS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"]; }  return Util.DAYS; }

        public static SHORT_DAYS: string[]; public static SHORT_DAYS_$LI$(): string[] { if (Util.SHORT_DAYS == null) { Util.SHORT_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]; }  return Util.SHORT_DAYS; }

        static LONG_DAYS: string[]; public static LONG_DAYS_$LI$(): string[] { if (Util.LONG_DAYS == null) { Util.LONG_DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; }  return Util.LONG_DAYS; }

        static MONTHS: string[]; public static MONTHS_$LI$(): string[] { if (Util.MONTHS == null) { Util.MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]; }  return Util.MONTHS; }

        static DAYS_IN_MONTH: number[]; public static DAYS_IN_MONTH_$LI$(): number[] { if (Util.DAYS_IN_MONTH == null) { Util.DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; }  return Util.DAYS_IN_MONTH; }

        public static MIN_HOUR: number = 6;

        public static MAX_HOUR: number = 21;

        public static ROW_HEIGHT_PX: number = 28;

        public static COLOR_DISPO: string = "#cfebfe";

        public static COLOR_ABS: string = "#425c5a";

        public static getSemaineType(): Object {
            const s: string = "{\r\n  \"config\": {\r\n    \"Lundi\": {\r\n      \"dispo\": [\r\n        {\r\n          \"from\": \"12:00\",\r\n          \"to\": \"14:00\"\r\n        }\r\n      ],\r\n      \"abs\": []\r\n    },\r\n    \"Mardi\": {\r\n      \"dispo\": [\r\n        {\r\n          \"from\": \"11:30\",\r\n          \"to\": \"12:30\",\r\n          \"quantity\": \"4\"\r\n        }\r\n      ],\r\n      \"abs\": []\r\n    },\r\n    \"Mercredi\": {\r\n      \"dispo\": [\r\n        {\r\n          \"from\": \"09:00\",\r\n          \"to\": \"10:00\",\r\n          \"quantity\": \"4\"\r\n        },\r\n        {\r\n          \"from\": \"12:00\",\r\n          \"to\": \"14:30\",\r\n          \"quantity\": \"3\"\r\n        },\r\n        {\r\n          \"from\": \"12:30\",\r\n          \"to\": \"13:30\",\r\n          \"quantity\": \"3\"\r\n        }\r\n      ],\r\n      \"abs\": []\r\n    },\r\n    \"Jeudi\": {\r\n      \"dispo\": [],\r\n      \"abs\": [\r\n        {\r\n          \"from\": \"10:00\",\r\n          \"to\": \"11:00\",\r\n          \"quantity\": 1\r\n        }\r\n      ]\r\n    },\r\n    \"Vendredi\": {\r\n      \"dispo\": [\r\n        {\r\n          \"from\": \"15:30\",\r\n          \"to\": \"17:00\",\r\n          \"quantity\": \"4\"\r\n        },\r\n        {\r\n          \"from\": \"10:30\",\r\n          \"to\": \"14:00\"\r\n        }\r\n      ],\r\n      \"abs\": []\r\n    },\r\n    \"Samedi\": {\r\n      \"dispo\": [],\r\n      \"abs\": []\r\n    }\r\n  },\r\n  \"until\": \"2020-12-27T00:00:00.000Z\"\r\n}";
            const obj: Object = <Object>JSON.parse(s);
            return obj;
        }

        public static getDaysInMonth(date: Date): number {
            if (date.getMonth() === 11){
                return 31;
            } else {
                const tmp: Date = Util.addDays(new Date(date.getFullYear(), date.getMonth() + 1, date.getDate(), 0, 0, 0, 0), -1);
                return tmp.getDate();
            }
        }

        public static getFirstDateOfMonth(date: Date): Date {
            return new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0, 0);
        }

        public static getLastDateOfMonth(date: Date): Date {
            if (date.getMonth() === 11){
                return new Date(date.getFullYear(), date.getMonth(), 31, 0, 0, 0, 0);
            } else {
                const tmp: Date = new Date(date.getFullYear(), date.getMonth() + 1, 1, 0, 0, 0, 0);
                return Util.addDays(tmp, -1);
            }
        }

        public static to2num(val: number): string {
            if (val < 10){
                return "0" + val;
            } else {
                return val + "";
            }
        }

        public static getTime(hour: number, minute: number): string {
            return Util.to2num(hour) + ":" + Util.to2num(minute);
        }

        public static getHour(time: string): number {
            return /* parseInt */parseInt(time.split(":")[0]);
        }

        public static getMinute(time: string): number {
            return /* parseInt */parseInt(time.split(":")[1]);
        }

        public static countRows(startTime: string, endTime: string): number {
            const fromHr: number = Util.getHour(startTime);
            const toHr: number = Util.getHour(endTime);
            const fromMin: number = Util.getMinute(startTime);
            const toMin: number = Util.getMinute(endTime);
            let whole: number = ((toHr - fromHr) * 2) + 1;
            if (fromMin === 30){
                whole = whole - 1;
            }
            if (toMin === 30){
                whole = whole + 1;
            }
            return whole;
        }

        public static countStartRowPosition(startTime: string): number {
            const hr: number = Util.getHour(startTime);
            const minute: number = Util.getMinute(startTime);
            let startRow: number = (hr - Util.MIN_HOUR) * 2 + 1;
            if (minute === 30){
                startRow = startRow + 1;
            }
            const top: number = (startRow * Util.ROW_HEIGHT_PX) + 1;
            return top;
        }

        public static formatDate(dt: Date, format: string): string {
            const dd: string = Util.formatNum(dt.getDate());
            const MM: string = Util.formatNum(dt.getMonth());
            const hh: string = Util.formatNum(dt.getHours());
            const mm: string = Util.formatNum(dt.getMinutes());
            const ss: string = Util.formatNum(dt.getSeconds());
            const EE: string = Util.SHORT_DAYS_$LI$()[(<number>dt.getDay()|0)];
            const EEEE: string = Util.LONG_DAYS_$LI$()[(<number>dt.getDay()|0)];
            const yyyy: string = dt.getFullYear() + "";
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

        public static replace(text: string, s: string, __with: string): string {
            return /* replace */text.split(s).join(__with);
        }

        public static formatNum(d: number): string {
            return d < 10 ? "0" + d : d + "";
        }

        public static countStartColPosition(day: string, gutter: number, colWidth: number): number {
            let index: number = 0;
            for(let index33048=0; index33048 < Util.DAYS_$LI$().length; index33048++) {
                let s = Util.DAYS_$LI$()[index33048];
                {
                    if (s === day){
                        break;
                    }
                    index++;
                }
            }
            return (colWidth * index) + gutter;
        }

        public static addWeeks(dt: Date, weeks: number): Date {
            return Util.addDays(dt, weeks * 7);
        }

        public static addDays(dt: Date, days: number): Date {
            return Util.addHour(dt, days * 24);
        }

        public static addHour(dt: Date, hrs: number): Date {
            return Util.addMinutes(dt, hrs * 60);
        }

        public static addMinutes(dt: Date, minutes: number): Date {
            return Util.addSeconds(dt, minutes * 60);
        }

        public static addSeconds(dt: Date, secs: number): Date {
            return Util.addMiliseconds(dt, secs * 1000);
        }

        public static addMiliseconds(dt: Date, ms: number): Date {
            return new Date(dt.getTime() + ms);
        }

        public static isSameDate(dt1: Date, dt2: Date): boolean {
            return (dt1.getDate() === dt2.getDate()) && (dt1.getMonth() === dt2.getMonth()) && (dt1.getFullYear() === dt2.getFullYear());
        }
    }
    Util["__class"] = "framework.components.Util";

}
namespace framework.components {
    export interface ViewEvent extends framework.components.api.Renderable {
        getNewEvent(date: Date): Object;

        setValue(value: Object);

        getStartDate(): Date;

        getEndDate(): Date;
    }
}
namespace framework.components {
    export class WeekViewDndManager {
        public static dragging: framework.components.ViewEvent = null;

        public static resizing: framework.components.WeekViewEvent = null;
    }
    WeekViewDndManager["__class"] = "framework.components.WeekViewDndManager";

}
namespace framework.components {
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
    export class JSContainer implements framework.components.api.Renderable {
        public static idCount: number = 0;

        /*private*/ d: Object;

        static defaultRenderer: framework.components.api.ContainerRenderer; public static defaultRenderer_$LI$(): framework.components.api.ContainerRenderer { if (JSContainer.defaultRenderer == null) { JSContainer.defaultRenderer = new framework.components.api.ContainerRenderer(); }  return JSContainer.defaultRenderer; }

        public constructor(name?: any, tag?: any) {
            if (((typeof name === 'string') || name === null) && ((typeof tag === 'string') || tag === null)) {
                let __args = arguments;
                this.d = <Object>new Object();
                this.setTag(tag);
                this.setName(name);
            } else if (((typeof name === 'string') || name === null) && tag === undefined) {
                let __args = arguments;
                let tag: any = __args[0];
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
        public on(evt: string, listener: EventListener) {
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
            console.log("firing:" + key + " on " + this.getName());
            const listeners: Array<framework.components.api.EventListener> = <Array<framework.components.api.EventListener>>this.getListeners()[key];
            if (listeners != null && listeners.length > 0){
                for(let index33049=0; index33049 < listeners.length; index33049++) {
                    let l = listeners[index33049];
                    {
                        l.performAction(this, evt);
                    }
                }
            }
        }

        public hasListenerOfType(type: string): boolean {
            const listeners: Array<framework.components.api.EventListener> = <Array<framework.components.api.EventListener>>this.getListeners()[type];
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

        public getChild(name: string): framework.components.api.Renderable {
            {
                let array33051 = this.getChildren();
                for(let index33050=0; index33050 < array33051.length; index33050++) {
                    let child = array33051[index33050];
                    {
                        if (child.getName() === name){
                            return child;
                        }
                    }
                }
            }
            return null;
        }

        public removeChild(r: framework.components.api.Renderable): framework.components.api.Renderable {
            const children: Array<framework.components.api.Renderable> = this.getChildren();
            const tmp: framework.components.api.Renderable[] = children.filter((ctn, inde, lst) => {
                return !/* equals */(<any>((o1: any, o2: any) => { if (o1 && o1.equals) { return o1.equals(o2); } else { return o1 === o2; } })(ctn,r));
            });
            if (children.length !== tmp.length){
                this.d["children"] = tmp;
                this.setRendered(false);
            }
            return this;
        }

        public addCSSRule(rule: string): framework.components.api.Renderable {
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

        public clearChildren(): framework.components.api.Renderable {
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
            const elem: HTMLElement = framework.components.api.ContainerRenderer.getElementById(this.getId());
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
         * A secret value know by the implementor of the framework. This
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
        public getRenderers(): Array<framework.components.api.Renderer<any>> {
            const arr: Array<framework.components.api.Renderer<any>> = <Array<framework.components.api.Renderer<any>>>this.d["renderers"];
            if (arr != null){
                return arr;
            } else {
                return <any>(new Array<framework.components.api.Renderer<any>>());
            }
        }

        /**
         * 
         * @param {*} renderer
         * @return {framework.components.JSContainer}
         */
        public addRenderer(renderer: framework.components.api.Renderer<any>): JSContainer {
            let arr: Array<framework.components.api.Renderer<any>> = <Array<framework.components.api.Renderer<any>>>this.d["renderers"];
            if (arr == null){
                arr = <any>(new Array<framework.components.api.Renderer<any>>());
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
         * @return {framework.components.JSContainer}
         */
        public addClass(styleClass: string): JSContainer {
            let styles: string = this.getAttribute("class");
            if (styles == null){
                styles = "";
            }
            const aStyles: string[] = styles.split(" ");
            const toAdds: string[] = styleClass.split(" ");
            let res: string = "";
            for(let index33052=0; index33052 < toAdds.length; index33052++) {
                let toAdd = toAdds[index33052];
                {
                    toAdd = toAdd.trim();
                    if (toAdd.length > 0){
                        let add: boolean = true;
                        for(let index33053=0; index33053 < aStyles.length; index33053++) {
                            let style = aStyles[index33053];
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
            for(let index33054=0; index33054 < aStyles.length; index33054++) {
                let style = aStyles[index33054];
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

        public toggleClass(cls: string): framework.components.api.Renderable {
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
         * @return {framework.components.JSContainer}
         */
        public removeClass(cls: string): JSContainer {
            if (cls != null && cls.trim() !== ""){
                const toremove: string[] = cls.split(" ");
                for(let index33055=0; index33055 < toremove.length; index33055++) {
                    let s = toremove[index33055];
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
                for(let index33056=0; index33056 < classes.length; index33056++) {
                    let scl = classes[index33056];
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

        public addChild$framework_components_api_Renderable(container: framework.components.api.Renderable): framework.components.api.Renderable {
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

        public addChild(name?: any, tag?: any, cls?: any): any {
            if (((typeof name === 'string') || name === null) && ((typeof tag === 'string') || tag === null) && ((typeof cls === 'string') || cls === null)) {
                return <any>this.addChild$java_lang_String$java_lang_String$java_lang_String(name, tag, cls);
            } else if (((typeof name === 'string') || name === null) && ((typeof tag === 'string') || tag === null) && cls === undefined) {
                return <any>this.addChild$java_lang_String$java_lang_String(name, tag);
            } else if (((name != null && (name.constructor != null && name.constructor["__interfaces"] != null && name.constructor["__interfaces"].indexOf("framework.components.api.Renderable") >= 0)) || name === null) && tag === undefined && cls === undefined) {
                return <any>this.addChild$framework_components_api_Renderable(name);
            } else throw new Error('invalid overload');
        }

        public isValidParent(parent: framework.components.api.Renderable): boolean {
            return true;
        }

        /**
         * 
         * @param {number} index
         * @param {*} child
         * @return {*}
         */
        public addChildAt(index: number, child: framework.components.api.Renderable): framework.components.api.Renderable {
            (<JSContainer><any>child).d["parent"] = this;
            const children: Array<framework.components.api.Renderable> = <any>(new Array<framework.components.api.Renderable>());
            let i: number = 0;
            let added: boolean = false;
            {
                let array33058 = this.getChildren();
                for(let index33057=0; index33057 < array33058.length; index33057++) {
                    let c = array33058[index33057];
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
         * @return {framework.components.JSContainer}
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
         * @return {framework.components.JSContainer}
         */
        public addEventListener(listener: framework.components.api.EventListener, type: string): JSContainer {
            let listeners: Object = this.getListeners();
            if (listeners == null){
                listeners = <Object>new Object();
                this.d["listeners"] = listeners;
            }
            if (!listeners.hasOwnProperty(type)){
                listeners[type] = new Array<any>();
            }
            const current: Array<framework.components.api.EventListener> = <Array<framework.components.api.EventListener>>listeners[type];
            if (current.lastIndexOf(listener) < 0){
                (<Array<framework.components.api.EventListener>>listeners[type]).push(listener);
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
         * @return {framework.components.JSContainer}
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
         * @return {framework.components.JSContainer}
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
         * @return {framework.components.JSContainer}
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
         * @return {framework.components.JSContainer}
         */
        public getParent(): JSContainer {
            return <JSContainer>this.d["parent"];
        }

        /**
         * 
         * @return {*[]}
         */
        public getChildren(): Array<framework.components.api.Renderable> {
            const children: Array<framework.components.api.Renderable> = <Array<framework.components.api.Renderable>>this.d["children"];
            if (children != null){
                return <Array<framework.components.api.Renderable>>children;
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
         * @return {framework.components.JSContainer}
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
        public setRendered(b: boolean): framework.components.api.Renderable {
            this.d["rendered"] = b;
            if (!b){
                {
                    let array33060 = this.getChildren();
                    for(let index33059=0; index33059 < array33060.length; index33059++) {
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
        public getListeners(): Object {
            const l: Object = <Object>this.d["listeners"];
            if (l == null){
                this.d["listeners"] = <Object>new Object();
                return this.getListeners();
            }
            return l;
        }

        public render$() {
            if (this.getParent() == null)this.render$jsweet_dom_HTMLElement(null); else this.render$jsweet_dom_HTMLElement(framework.components.api.ContainerRenderer.getElementById(this.getParent().getId()));
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
         * @param {?[]} lst
         * The array to check if object is present
         * @param {*} o
         * The object to check if present
         * @return {boolean} Whether is present or not
         */
        contains(lst: Array<any>, o: any): boolean {
            for(let index33061=0; index33061 < lst.length; index33061++) {
                let oo = lst[index33061];
                {
                    if (/* equals */(<any>((o1: any, o2: any) => o1 && o1.equals ? o1.equals(o2) : o1 === o2)(oo,o))){
                        return true;
                    }
                }
            }
            return false;
        }

        public render$jsweet_dom_HTMLElement(parent: HTMLElement) {
            let renderers: Array<framework.components.api.Renderer<any>> = this.getRenderers();
            if (renderers.length === 0){
                renderers.push(JSContainer.defaultRenderer_$LI$());
            }
            if (!this.contains(renderers, JSContainer.defaultRenderer_$LI$())){
                const tmp: Array<framework.components.api.Renderer<any>> = <any>(new Array<framework.components.api.Renderer<any>>());
                tmp.push(JSContainer.defaultRenderer_$LI$());
                for(let index33062=0; index33062 < renderers.length; index33062++) {
                    let r = renderers[index33062];
                    {
                        tmp.push(r);
                    }
                }
                renderers = tmp;
            }
            for(let index33063=0; index33063 < renderers.length; index33063++) {
                let renderer = renderers[index33063];
                renderer.doRender(this, parent)
            }
            {
                let array33065 = this.getChildren();
                for(let index33064=0; index33064 < array33065.length; index33064++) {
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
                for(let index33066=0; index33066 < arData.length; index33066++) {
                    let line = arData[index33066];
                    {
                        const value: string = <string>line["value"];
                        this.setAttribute(value, null);
                    }
                }
            } else {
                if (previous != null){
                    {
                        let array33068 = Object.keys(previous);
                        for(let index33067=0; index33067 < array33068.length; index33067++) {
                            let key = array33068[index33067];
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
                    for(let index33069=0; index33069 < arData.length; index33069++) {
                        let line = arData[index33069];
                        {
                            const text: string = <string>line["text"];
                            const value: string = <string>line["value"];
                            this.setAttribute(value, text);
                        }
                    }
                } else {
                    {
                        let array33071 = Object.keys(data);
                        for(let index33070=0; index33070 < array33071.length; index33070++) {
                            let key = array33071[index33070];
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
        public getAncestorWithClass<T extends framework.components.api.Renderable>(cls: string): T {
            const parent: JSContainer = this.getParent();
            if (parent == null){
                return null;
            }
            const clsss: string = parent.getAttribute("class");
            if (clsss != null){
                {
                    let array33073 = parent.getAttribute("class").split(" ");
                    for(let index33072=0; index33072 < array33073.length; index33072++) {
                        let s = array33073[index33072];
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
         * @return {framework.components.JSContainer}
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
         * @return {framework.components.JSContainer}
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
         * @return {framework.components.JSContainer}
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
        public setUserData(data: any): framework.components.api.Renderable {
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
    }
    JSContainer["__class"] = "framework.components.JSContainer";
    JSContainer["__interfaces"] = ["framework.components.api.Renderable"];



    export namespace JSContainer {

        export class JSContainer$0 implements framework.components.api.EventListener {
            public __parent: any;
            /**
             * 
             * @param {*} source
             * @param {Event} evt
             */
            public performAction(source: framework.components.api.Renderable, evt: Event) {
                evt["source"] = source;
                this.listener(evt);
            }

            constructor(__parent: any, private listener: any) {
                this.__parent = __parent;
            }
        }
        JSContainer$0["__interfaces"] = ["framework.components.api.EventListener"];


    }

}
namespace framework.components {
    export class App extends framework.components.JSContainer {
        public cmp: any;

        public evt: any;

        public helper: Object;

        public constructor() {
            super("div");
            if (this.cmp === undefined) { this.cmp = null; }
            if (this.evt === undefined) { this.evt = null; }
            if (this.helper === undefined) { this.helper = null; }
            const table: framework.components.JSContainer = new framework.components.JSContainer("table");
            for(let i: number = 0; i < 10; i++) {{
                const row: framework.components.JSContainer = new framework.components.JSContainer("tr");
                for(let j: number = 0; j < 10; j++) {{
                    const td: framework.components.JSContainer = new framework.components.JSContainer("td");
                    row.addChild$framework_components_api_Renderable(td);
                };}
                table.addChild$framework_components_api_Renderable(row);
            };}
            this.addChild$framework_components_api_Renderable(table);
            this.addEventListener(new App.App$0(this), "click");
        }
    }
    App["__class"] = "framework.components.App";
    App["__interfaces"] = ["framework.components.api.Renderable"];



    export namespace App {

        export class App$0 implements framework.components.api.EventListener {
            public __parent: any;
            /**
             * 
             * @param {*} source
             * @param {Event} evt
             */
            public performAction(source: framework.components.api.Renderable, evt: Event) {
                const fn: Function = <Function>this.__parent.helper["openPopup"];
                fn.call(fn, this.__parent.cmp, evt, this.__parent.helper);
            }

            constructor(__parent: any) {
                this.__parent = __parent;
            }
        }
        App$0["__interfaces"] = ["framework.components.api.EventListener"];


    }

}
namespace framework.components {
    export class Box extends framework.components.JSContainer {
        public constructor(name: string, size: number, of: number) {
            super(name, "div");
            this.addClass("slds-grid slds-wrap slds-col slds-size_" + size + "-of-" + of);
        }
    }
    Box["__class"] = "framework.components.Box";
    Box["__interfaces"] = ["framework.components.api.Renderable"];


}
namespace framework.components {
    export class CardLayout extends framework.components.JSContainer {
        /*private*/ currentActive: string;

        /*private*/ currentIndex: number;

        public constructor(name: string, tag: string) {
            super(name, tag);
            this.currentActive = "";
            this.currentIndex = 0;
        }

        public addItem(item: framework.components.CardLayoutItem): CardLayout {
            this.addChild$framework_components_api_Renderable(item);
            return this;
        }

        public getCurrentIndex(): number {
            return this.currentIndex;
        }

        public getItem(index: number): framework.components.CardLayoutItem {
            if (index < this.getChildren().length){
                return <framework.components.CardLayoutItem><any>this.getChildren()[index];
            } else {
                return null;
            }
        }

        public getIndex(name: string): number {
            let index: number = 0;
            {
                let array33075 = this.getChildren();
                for(let index33074=0; index33074 < array33075.length; index33074++) {
                    let child = array33075[index33074];
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

        public next(...params: Object[]): framework.components.CardLayoutItem {
            if (this.currentIndex < (this.getChildren().length - 1)){
                const current: framework.components.CardLayoutItem = this.getItem(this.currentIndex);
                const validateEvent: CustomEvent = new CustomEvent("validate");
                validateEvent["source"] = current;
                validateEvent["valid"] = true;
                current.fireListener("validate", validateEvent);
                const isValid: boolean = <boolean>validateEvent["valid"];
                if (isValid){
                    this.currentIndex++;
                    const item: framework.components.CardLayoutItem = this.getItem(this.currentIndex);
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

        public previous(...params: Object[]): framework.components.CardLayoutItem {
            if (this.currentIndex > 0){
                const current: framework.components.CardLayoutItem = this.getItem(this.currentIndex);
                this.currentIndex--;
                const item: framework.components.CardLayoutItem = this.getItem(this.currentIndex);
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

        public back(...params: Object[]): framework.components.CardLayoutItem {
            return this.previous.apply(this, params);
        }

        public first(...params: Object[]): framework.components.CardLayoutItem {
            if (this.currentIndex > 0){
                const current: framework.components.CardLayoutItem = this.getItem(this.currentIndex);
                this.currentIndex = 0;
                const item: framework.components.CardLayoutItem = this.getItem(this.currentIndex);
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
                const item: framework.components.CardLayoutItem = this.getItem(this.currentIndex);
                return item;
            }
        }

        public last(...params: Object[]): framework.components.CardLayoutItem {
            if (this.currentIndex < (this.getChildren().length - 1)){
                const current: framework.components.CardLayoutItem = this.getItem(this.currentIndex);
                this.currentIndex = this.getChildren().length - 1;
                const item: framework.components.CardLayoutItem = this.getItem(this.currentIndex);
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
                const item: framework.components.CardLayoutItem = this.getItem(this.currentIndex);
                return item;
            }
        }

        public getDefault(): string {
            return this.getAttribute("default");
        }

        public activate(name: string, ...params: Object[]) {
            if (name === this.currentActive && this.currentIndex >= 0){
                return;
            }
            {
                let array33077 = this.getChildren();
                for(let index33076=0; index33076 < array33077.length; index33076++) {
                    let child = array33077[index33076];
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
                            (<framework.components.JSContainer><any>child).fireListener("activate", evt);
                            child.setStyle("display", "block");
                        } else if (child.getName() === this.currentActive){
                            const evt: CustomEvent = new CustomEvent("deactivate");
                            evt["data"] = child;
                            (<framework.components.JSContainer><any>child).fireListener("deactivate", evt);
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
    }
    CardLayout["__class"] = "framework.components.CardLayout";
    CardLayout["__interfaces"] = ["framework.components.api.Renderable"];


}
namespace framework.components {
    export class CardLayoutItem extends framework.components.JSContainer {
        public constructor(name: string, tag: string) {
            super(name, tag);
        }

        /**
         * 
         * @return {java.lang.String[]}
         */
        public advancedEventTypes(): string[] {
            return ["activate", "deactivate", "validate"];
        }
    }
    CardLayoutItem["__class"] = "framework.components.CardLayoutItem";
    CardLayoutItem["__interfaces"] = ["framework.components.api.Renderable"];


}
namespace framework.components {
    export class Col extends framework.components.JSContainer {
        public constructor(name: string, size: number, of: number) {
            super(name, "div");
            this.addClass("slds-col slds-size_" + size + "-of-" + of);
        }
    }
    Col["__class"] = "framework.components.Col";
    Col["__interfaces"] = ["framework.components.api.Renderable"];


}
namespace framework.components {
    export class ExternalJavascript extends framework.components.JSContainer {
        public constructor(name: string) {
            super(name, "script");
            this.setAttribute("type", "text/javascript");
            this.setAttribute("identifier", "html:javascript");
        }

        public setSource(src: string): ExternalJavascript {
            this.setAttribute("src", src);
            return this;
        }
    }
    ExternalJavascript["__class"] = "framework.components.ExternalJavascript";
    ExternalJavascript["__interfaces"] = ["framework.components.api.Renderable"];


}
namespace framework.components {
    export class ExternalStylesheet extends framework.components.JSContainer implements framework.components.api.Renderer<ExternalStylesheet> {
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
            this.setAttribute("identifier", "html:stylesheet");
            this.addRenderer(this);
        }

        public setSource(src: string): ExternalStylesheet {
            this.setAttribute("source", src);
            return this;
        }

        public setCrossOrigin(origin: string): ExternalStylesheet {
            this.setAttribute("crossorigin", origin);
            return this;
        }

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
         * 
         * @param {framework.components.ExternalStylesheet} c
         * @param {HTMLElement} root
         */
        public doRender(c?: any, root?: any) {
            if (((c != null && c instanceof <any>framework.components.ExternalStylesheet) || c === null) && ((root != null && root instanceof <any>HTMLElement) || root === null)) {
                return <any>this.doRender$framework_components_ExternalStylesheet$jsweet_dom_HTMLElement(c, root);
            } else throw new Error('invalid overload');
        }
    }
    ExternalStylesheet["__class"] = "framework.components.ExternalStylesheet";
    ExternalStylesheet["__interfaces"] = ["framework.components.api.Renderable","framework.components.api.Renderer"];


}
namespace framework.components {
    /**
     * Constructs an instance of this component
     * 
     * @param {string} name     The name of the component
     * @param {string} template The html template of this component
     * @class
     * @extends framework.components.JSContainer
     * @author Rossaye Abdool Kureem
     */
    export class HTMLTemplateContainer extends framework.components.JSContainer implements framework.components.api.TemplateRenderable {
        /**
         * A context that contains variables exposed to the html template. This can be
         * used by javascript to transmit data from the framework to the template
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
                    for(let index33078=0; index33078 < attrs.length; index33078++) {
                        let att = attrs[index33078];
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

        public static invokeFunction(target: Object, __function: string, ...args: any[]): any {
            if (target.hasOwnProperty(__function)){
                return (o => o.call.apply(o, [target].concat(<any[]>args)))((<Function>target[__function]));
            } else {
                throw new Error(target + " does not contain function:" + __function);
            }
        }
    }
    HTMLTemplateContainer["__class"] = "framework.components.HTMLTemplateContainer";
    HTMLTemplateContainer["__interfaces"] = ["framework.components.api.Renderable","framework.components.api.TemplateRenderable"];


}
namespace framework.components.input {
    export abstract class AbstractJSInput<T> extends framework.components.JSContainer implements framework.components.api.InputField<T> {
        /*private*/ validators: Array<framework.components.api.Validator<T>>;

        public constructor(name: string) {
            super(name, "input");
            this.validators = <any>(new Array<framework.components.api.Validator<T>>());
        }

        public addValidator(validator: framework.components.api.Validator<T>) {
            this.validators.push(validator);
        }

        public setSize(size: number) {
            this.setAttribute("size", size + "");
        }

        public setPattern(pattern: string) {
            this.setAttribute("pattern", pattern);
        }

        public setRequired(b: boolean): AbstractJSInput<T> {
            if (b){
                this.setAttribute("required", "true");
            } else this.setAttribute("required", null);
            return this;
        }

        public setDisabled(b: boolean): AbstractJSInput<T> {
            if (b){
                this.setAttribute("disabled", "true");
            } else {
                this.setAttribute("disabled", null);
            }
            return this;
        }

        public setReadOnly(b: boolean): AbstractJSInput<T> {
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

        public setPlaceHolder(placeholder: string): AbstractJSInput<T> {
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
        public static addError(msg: string, state: ValidityState, e: framework.components.api.ValidationException): framework.components.api.ValidationException {
            if (!state.valid){
                if (state.badInput){
                    framework.components.api.ValidationException.addError(msg, framework.components.api.ValidationException.badInput, e);
                } else if (state.customError){
                    framework.components.api.ValidationException.addError(msg, framework.components.api.ValidationException.customError, e);
                } else if (state.patternMismatch){
                    framework.components.api.ValidationException.addError(msg, framework.components.api.ValidationException.patternMismatch, e);
                } else if (state.rangeOverflow){
                    framework.components.api.ValidationException.addError(msg, framework.components.api.ValidationException.rangeOverflow, e);
                } else if (state.rangeUnderflow){
                    framework.components.api.ValidationException.addError(msg, framework.components.api.ValidationException.rangeUnderflow, e);
                } else if (state.stepMismatch){
                    framework.components.api.ValidationException.addError(msg, framework.components.api.ValidationException.stepMismatch, e);
                } else if (state.tooLong){
                    framework.components.api.ValidationException.addError(msg, framework.components.api.ValidationException.tooLong, e);
                } else if (state.typeMismatch){
                    framework.components.api.ValidationException.addError(msg, framework.components.api.ValidationException.typeMismatch, e);
                } else if (state.valueMissing){
                    framework.components.api.ValidationException.addError(msg, framework.components.api.ValidationException.valueMissing, e);
                }
            }
            return e;
        }

        /**
         * 
         */
        public validate() {
            let valid: boolean = true;
            const e: framework.components.api.ValidationException = new framework.components.api.ValidationException();
            const nat: HTMLElement = this.getNative();
            if (nat != null){
                const el: HTMLInputElement = <HTMLInputElement>nat;
                valid = el.checkValidity();
                if (!valid){
                    AbstractJSInput.addError(el.validationMessage, el.validity, e);
                }
            }
            for(let index33079=0; index33079 < this.validators.length; index33079++) {
                let v = this.validators[index33079];
                {
                    const b: boolean = v.validate(this);
                    if (!b){
                        valid = false;
                        framework.components.api.ValidationException.addError(v.getErrorMessage(), framework.components.api.ValidationException.customError, e);
                    }
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

        public setBinding(binding: string): AbstractJSInput<T> {
            this.setAttribute("binding", binding);
            return this;
        }

        public abstract getValue(): any;
        public abstract setValue(val?: any): any;    }
    AbstractJSInput["__class"] = "framework.components.input.AbstractJSInput";
    AbstractJSInput["__interfaces"] = ["framework.components.api.InputField","framework.components.api.Renderable"];


}
namespace framework.components.input {
    export class Form extends framework.components.JSContainer {
        validationerrors: Object;

        public constructor(name: string) {
            super(name, "form");
            this.validationerrors = <Object>new Object();
        }

        /**
         * 
         * @return {java.lang.String[]}
         */
        public advancedEventTypes(): string[] {
            return ["beforeValidate", "afterValidate", "beforeSetData", "afterSetData", "beforeGetData", "onError", "afterSetData", "beforeSubmit", "afterSubmit", "submit"];
        }

        public isValid(): boolean {
            return Object.keys(this.validationerrors).length <= 0;
        }

        public hasErrors(): boolean {
            const keys: string[] = Object.keys(this.validationerrors);
            if (keys != null && keys.length > 0){
                return true;
            } else {
                return false;
            }
        }

        public getError(binding: string): framework.components.api.ValidationException {
            return <framework.components.api.ValidationException>this.validationerrors[binding];
        }

        public getErrors(): Object {
            return this.validationerrors;
        }

        public getField(binding: string): framework.components.api.InputField<any> {
            const result: Array<framework.components.api.InputField<any>> = <any>(new Array<framework.components.api.InputField<any>>());
            framework.components.util.ComponentUtil.visit(this, new Form.Form$0(this, binding, result));
            if (result.length > 0){
                return result[0];
            }
            return null;
        }

        public validate(): boolean {
            const evt: CustomEvent = new CustomEvent("beforeValidate");
            evt["source"] = this;
            this.fireListener("beforeValidate", evt);
            this.validationerrors = <Object>new Object();
            framework.components.util.ComponentUtil.visit(this, new Form.Form$1(this));
            const evtAfter: CustomEvent = new CustomEvent("afterValidate");
            evtAfter["source"] = this;
            evtAfter["data"] = this.validationerrors;
            evtAfter["errors"] = this.validationerrors;
            evtAfter["hasError"] = Object.keys(this.validationerrors).length > 0;
            this.fireListener("afterValidate", evtAfter);
            if (Object.keys(this.validationerrors).length > 0){
                const onError: CustomEvent = new CustomEvent("onError");
                onError["source"] = this;
                onError["data"] = this.validationerrors;
                onError["errors"] = this.validationerrors;
                onError["hasError"] = Object.keys(this.validationerrors).length > 0;
                this.fireListener("onError", onError);
            }
            return Object.keys(this.validationerrors).length <= 0;
        }

        public setData(data: Object) {
            const evt: CustomEvent = new CustomEvent("beforeSetData");
            evt["source"] = this;
            evt["data"] = data;
            this.fireListener("beforeSetData", evt);
            framework.components.util.ComponentUtil.visit(this, new Form.Form$2(this, data));
            const evtAfter: CustomEvent = new CustomEvent("afterSetData");
            evtAfter["source"] = this;
            evtAfter["data"] = data;
            this.fireListener("afterSetData", evtAfter);
        }

        public getData(): Object {
            const evt: CustomEvent = new CustomEvent("beforeGetData");
            evt["source"] = this;
            this.fireListener("beforeGetData", evt);
            const data: Object = <Object>new Object();
            framework.components.util.ComponentUtil.visit(this, new Form.Form$3(this, data));
            const evtAfter: CustomEvent = new CustomEvent("afterGetData");
            evtAfter["source"] = this;
            evtAfter["data"] = data;
            this.fireListener("afterGetData", evtAfter);
            return data;
        }

        public submit() {
            const evt: CustomEvent = new CustomEvent("beforeSubmit");
            evt["source"] = this;
            this.fireListener("beforeSubmit", evt);
            if (this.validate()){
                const data: Object = this.getData();
                const on: CustomEvent = new CustomEvent("submit");
                on["source"] = this;
                on["data"] = data;
                this.fireListener("submit", on);
            }
            const evtAfter: CustomEvent = new CustomEvent("afterSubmit");
            evtAfter["source"] = this;
            this.fireListener("afterSubmit", evtAfter);
        }
    }
    Form["__class"] = "framework.components.input.Form";
    Form["__interfaces"] = ["framework.components.api.Renderable"];



    export namespace Form {

        export class Form$0 implements framework.components.util.ComponentUtil.ComponentVisitor {
            public __parent: any;
            /**
             * 
             * @param {*} designable
             */
            public doVisit(designable: framework.components.api.Renderable) {
                if (designable != null && (designable.constructor != null && designable.constructor["__interfaces"] != null && designable.constructor["__interfaces"].indexOf("framework.components.api.InputField") >= 0)){
                    try {
                        const b: string = (<framework.components.api.InputField<any>><any>designable).getBinding();
                        if (b === this.binding){
                            this.result.push((<framework.components.api.InputField<any>><any>designable));
                        }
                    } catch(e) {
                        let binding: string = (<framework.components.api.InputField<any>><any>designable).getBinding();
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
        Form$0["__interfaces"] = ["framework.components.util.ComponentUtil.ComponentVisitor"];



        export class Form$1 implements framework.components.util.ComponentUtil.ComponentVisitor {
            public __parent: any;
            /**
             * 
             * @param {*} designable
             */
            public doVisit(designable: framework.components.api.Renderable) {
                if (designable != null && (designable.constructor != null && designable.constructor["__interfaces"] != null && designable.constructor["__interfaces"].indexOf("framework.components.api.InputField") >= 0)){
                    try {
                        (<framework.components.api.InputField<any>><any>designable).validate();
                    } catch(e) {
                        let binding: string = (<framework.components.api.InputField<any>><any>designable).getBinding();
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
        Form$1["__interfaces"] = ["framework.components.util.ComponentUtil.ComponentVisitor"];



        export class Form$2 implements framework.components.util.ComponentUtil.ComponentVisitor {
            public __parent: any;
            /**
             * 
             * @param {*} designable
             */
            public doVisit(designable: framework.components.api.Renderable) {
                if (designable != null && (designable.constructor != null && designable.constructor["__interfaces"] != null && designable.constructor["__interfaces"].indexOf("framework.components.api.InputField") >= 0)){
                    let binding: string = (<framework.components.api.InputField<any>><any>designable).getBinding();
                    if (binding == null || binding.trim() === ""){
                        binding = designable.getName();
                    }
                    if (framework.components.util.PropertyUtil.hasOwnProperty(this.data, binding)){
                        const obj: Object = framework.components.util.PropertyUtil.getValue(this.data, binding);
                        if (designable != null && designable instanceof <any>framework.components.input.JSDateInput){
                            try {
                                if (obj != null && obj instanceof <any>Date){
                                    (<framework.components.api.InputField<any>><any>designable).setValue(obj);
                                } else {
                                    const date: Date = new Date(/* parseLong */parseInt(obj.toString()));
                                    (<framework.components.api.InputField<any>><any>designable).setValue(date);
                                }
                            } catch(e) {
                                (<framework.components.api.InputField<any>><any>designable).setValue(obj);
                            }
                        } else {
                            (<framework.components.api.InputField<any>><any>designable).setValue(obj);
                        }
                    } else {
                        (<framework.components.api.InputField<any>><any>designable).setValue(null);
                    }
                }
            }

            constructor(__parent: any, private data: any) {
                this.__parent = __parent;
            }
        }
        Form$2["__interfaces"] = ["framework.components.util.ComponentUtil.ComponentVisitor"];



        export class Form$3 implements framework.components.util.ComponentUtil.ComponentVisitor {
            public __parent: any;
            /**
             * 
             * @param {*} designable
             */
            public doVisit(designable: framework.components.api.Renderable) {
                if (designable != null && (designable.constructor != null && designable.constructor["__interfaces"] != null && designable.constructor["__interfaces"].indexOf("framework.components.api.InputField") >= 0)){
                    let binding: string = (<framework.components.api.InputField<any>><any>designable).getBinding();
                    if (binding == null || binding.trim() === ""){
                        binding = designable.getName();
                    }
                    const value: Object = <Object>(<framework.components.api.InputField<any>><any>designable).getValue();
                    framework.components.util.PropertyUtil.setValue(this.data, value, binding);
                }
            }

            constructor(__parent: any, private data: any) {
                this.__parent = __parent;
            }
        }
        Form$3["__interfaces"] = ["framework.components.util.ComponentUtil.ComponentVisitor"];


    }

}
namespace framework.components.input {
    export class JSImageInput extends framework.components.JSContainer implements framework.components.api.InputField<string> {
        /*private*/ image: framework.components.JSContainer;

        /*private*/ upload: framework.components.JSUpload;

        /*private*/ imageContainer: framework.components.JSContainer;

        /*private*/ validators: Array<framework.components.api.Validator<string>>;

        public constructor(name: string) {
            super(name, "div");
            this.image = new framework.components.JSContainer("image", "img");
            this.upload = new framework.components.JSUpload("upload", framework.components.util.PropertyUtil.REMOTESERVER + "/resources/upload");
            this.imageContainer = new framework.components.JSContainer("div");
            this.validators = <any>(new Array<framework.components.api.Validator<string>>());
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

        public refreshUploadDir() {
            let dir: string = this.getAttribute("uploadDir");
            const name: string = this.getName();
            if (dir == null){
                dir = "default";
            }
            this.upload.setUrl(framework.components.util.PropertyUtil.REMOTESERVER + "/resources/upload?dir=" + dir + "&name=" + name);
        }

        public getImage(): framework.components.JSContainer {
            return this.image;
        }

        public setRequired(b: boolean): JSImageInput {
            if (b){
                this.setAttribute("required", "true");
            } else this.setAttribute("required", null);
            return this;
        }

        public setDisabled(b: boolean): JSImageInput {
            if (b){
                this.setAttribute("disabled", "true");
            } else {
                this.setAttribute("disabled", null);
            }
            return this;
        }

        public setReadOnly(b: boolean): JSImageInput {
            if (b){
                this.setAttribute("readonly", "true");
            } else {
                this.setAttribute("readonly", null);
            }
            return this;
        }

        public decorateImage() {
            this.image.addEventListener(new JSImageInput.JSImageInput$2(this), "click");
        }

        /**
         * 
         * @return {string}
         */
        public getValue(): string {
            return this.image.getAttribute("src");
        }

        public setValue$java_lang_String(val: string) {
            if (val == null){
                this.image.setAttribute("src", this.getAttribute("default"));
            } else {
                this.image.setAttribute("src", val);
            }
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
            const e: framework.components.api.ValidationException = new framework.components.api.ValidationException();
            for(let index33080=0; index33080 < this.validators.length; index33080++) {
                let v = this.validators[index33080];
                {
                    const b: boolean = v.validate(this);
                    if (!b){
                        valid = false;
                        framework.components.api.ValidationException.addError(v.getErrorMessage(), framework.components.api.ValidationException.customError, e);
                    }
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
         * @return {string}
         */
        public getBinding(): string {
            return this.getAttribute("binding");
        }

        /**
         * 
         * @param {string} binding
         * @return {*}
         */
        public setBinding(binding: string): framework.components.api.InputField<string> {
            this.setAttribute("binding", binding);
            return this;
        }

        /**
         * 
         * @return {java.lang.String[]}
         */
        public advancedEventTypes(): string[] {
            return ["success", "error"];
        }
    }
    JSImageInput["__class"] = "framework.components.input.JSImageInput";
    JSImageInput["__interfaces"] = ["framework.components.api.InputField","framework.components.api.Renderable"];



    export namespace JSImageInput {

        export class JSImageInput$0 implements framework.components.api.EventListener {
            public __parent: any;
            /**
             * 
             * @param {*} source
             * @param {Event} evt
             */
            public performAction(source: framework.components.api.Renderable, evt: Event) {
                if (this.__parent.hasListenerOfType("success")){
                    this.__parent.fireListener("success", evt);
                } else {
                    const data: Object = <Object>evt["data"];
                    if (data != null && data.hasOwnProperty("url")){
                        const url: string = <string>data["url"];
                        this.__parent.setValue(url);
                        this.__parent.render();
                    } else {
                        console.warn("no action taken although upload of image was successfull. You may consider adding a success event to this component");
                    }
                }
            }

            constructor(__parent: any) {
                this.__parent = __parent;
            }
        }
        JSImageInput$0["__interfaces"] = ["framework.components.api.EventListener"];



        export class JSImageInput$1 implements framework.components.api.EventListener {
            public __parent: any;
            /**
             * 
             * @param {*} source
             * @param {Event} evt
             */
            public performAction(source: framework.components.api.Renderable, evt: Event) {
                this.__parent.fireListener("error", evt);
            }

            constructor(__parent: any) {
                this.__parent = __parent;
            }
        }
        JSImageInput$1["__interfaces"] = ["framework.components.api.EventListener"];



        export class JSImageInput$2 implements framework.components.api.EventListener {
            public __parent: any;
            /**
             * 
             * @param {*} source
             * @param {Event} evt
             */
            public performAction(source: framework.components.api.Renderable, evt: Event) {
                this.__parent.upload.triggerUpload();
            }

            constructor(__parent: any) {
                this.__parent = __parent;
            }
        }
        JSImageInput$2["__interfaces"] = ["framework.components.api.EventListener"];


    }

}
namespace framework.components.input {
    export class JSOption extends framework.components.JSContainer {
        public constructor(text: string, value: string) {
            super("option");
            this.setAttribute("value", value);
            this.setHtml(text);
        }

        public getValue(): string {
            return this.getAttribute("value");
        }

        public setValue(value: string) {
            this.setAttribute("value", value);
        }

        public getText(): string {
            return this.getHtml();
        }

        public setText(label: string) {
            this.setHtml(label);
        }

        public setSelected(b: boolean) {
            if (b){
                this.setAttribute("selected", "true");
            } else {
                this.setAttribute("selected", null);
            }
        }
    }
    JSOption["__class"] = "framework.components.input.JSOption";
    JSOption["__interfaces"] = ["framework.components.api.Renderable"];


}
namespace framework.components.input {
    export class JSSelect extends framework.components.JSContainer implements framework.components.api.InputField<any> {
        /*private*/ previousValue: string;

        /*private*/ validators: Array<framework.components.api.Validator<any>>;

        /*private*/ data: Array<Object>;

        public constructor(name: string) {
            super(name, "select");
            if (this.previousValue === undefined) { this.previousValue = null; }
            this.validators = <any>(new Array<framework.components.api.Validator<any>>());
            if (this.data === undefined) { this.data = null; }
            this.setAttribute("identifier", "html:select");
        }

        public addValidator(validator: framework.components.api.Validator<any>) {
            this.validators.push(validator);
        }

        public setOptions$java_lang_String(options: string): JSSelect {
            const opts: string[] = options.split("\n");
            for(let index33081=0; index33081 < opts.length; index33081++) {
                let opt = opts[index33081];
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

        public addOption$framework_components_input_JSOption(option: framework.components.input.JSOption): JSSelect {
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
            return this.addOption$framework_components_input_JSOption(new framework.components.input.JSOption(text, value));
        }

        public addOption(text?: any, value?: any): any {
            if (((typeof text === 'string') || text === null) && ((typeof value === 'string') || value === null)) {
                return <any>this.addOption$java_lang_String$java_lang_String(text, value);
            } else if (((text != null && text instanceof <any>framework.components.input.JSOption) || text === null) && value === undefined) {
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
        public clearChildren(): framework.components.api.Renderable {
            this.data = null;
            return super.clearChildren();
        }

        public clearOptions(): framework.components.api.Renderable {
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
                    for(let index33082=0; index33082 < ele.children.length; index33082++) {
                        let e = ele.children[index33082];
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
                    let array33084 = this.getChildren();
                    for(let index33083=0; index33083 < array33084.length; index33083++) {
                        let opt = array33084[index33083];
                        {
                            if (opt.getAttribute("value") === val){
                                return (<framework.components.input.JSOption><any>opt).getValue();
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
                    let array33086 = this.getChildren();
                    for(let index33085=0; index33085 < array33086.length; index33085++) {
                        let opt = array33086[index33085];
                        {
                            (<framework.components.input.JSOption><any>opt).setSelected(false);
                            for(let index33087=0; index33087 < arrVal.length; index33087++) {
                                let val = arrVal[index33087];
                                {
                                    if (opt.getAttribute("value") === val){
                                        (<framework.components.input.JSOption><any>opt).setSelected(true);
                                    }
                                }
                            }
                        }
                    }
                }
            } else {
                {
                    let array33089 = this.getChildren();
                    for(let index33088=0; index33088 < array33089.length; index33088++) {
                        let opt = array33089[index33088];
                        {
                            (<framework.components.input.JSOption><any>opt).setSelected(false);
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
            const e: framework.components.api.ValidationException = new framework.components.api.ValidationException();
            const nat: HTMLElement = this.getNative();
            if (nat != null){
                const el: HTMLSelectElement = <HTMLSelectElement>nat;
                valid = el.checkValidity();
                if (!valid){
                    framework.components.input.AbstractJSInput.addError(el.validationMessage, el.validity, e);
                }
            }
            for(let index33090=0; index33090 < this.validators.length; index33090++) {
                let v = this.validators[index33090];
                {
                    const b: boolean = v.validate(this);
                    if (!b){
                        valid = false;
                        framework.components.api.ValidationException.addError(v.getErrorMessage(), framework.components.api.ValidationException.customError, e);
                    }
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
            for(let index33091=0; index33091 < data_.length; index33091++) {
                let o = data_[index33091];
                {
                    if (o.hasOwnProperty("value")){
                        const value: string = <string>o["value"];
                        const text: string = <string>o["text"];
                        this.addOption$framework_components_input_JSOption(new framework.components.input.JSOption(text, value));
                    } else {
                        const value: string = <string>o.toString();
                        const text: string = <string>o.toString();
                        this.addOption$framework_components_input_JSOption(new framework.components.input.JSOption(text, value));
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
                    let array33093 = <Array<string>>obj;
                    for(let index33092=0; index33092 < array33093.length; index33092++) {
                        let o = array33093[index33092];
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
                for(let index33094=0; index33094 < this.data.length; index33094++) {
                    let o = this.data[index33094];
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
        public setBinding(binding: string): framework.components.api.InputField<any> {
            this.setAttribute("binding", binding);
            return this;
        }
    }
    JSSelect["__class"] = "framework.components.input.JSSelect";
    JSSelect["__interfaces"] = ["framework.components.api.InputField","framework.components.api.Renderable"];


}
namespace framework.components.input {
    export class JSTextArea extends framework.components.JSContainer implements framework.components.api.InputField<string> {
        /*private*/ validators: Array<framework.components.api.Validator<string>>;

        public constructor(name: string) {
            super(name, "textarea");
            this.validators = <any>(new Array<framework.components.api.Validator<string>>());
            this.setAttribute("identifier", "html:textarea");
        }

        public addValidator(validator: framework.components.api.Validator<string>) {
            this.validators.push(validator);
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
            const e: framework.components.api.ValidationException = new framework.components.api.ValidationException();
            const nat: HTMLElement = this.getNative();
            if (nat != null){
                const el: HTMLInputElement = <HTMLInputElement>nat;
                valid = el.checkValidity();
                if (!valid){
                    framework.components.input.AbstractJSInput.addError(el.validationMessage, el.validity, e);
                }
            }
            for(let index33095=0; index33095 < this.validators.length; index33095++) {
                let v = this.validators[index33095];
                {
                    const b: boolean = v.validate(this);
                    if (!b){
                        valid = false;
                        framework.components.api.ValidationException.addError(v.getErrorMessage(), framework.components.api.ValidationException.customError, e);
                    }
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
        public setBinding(binding: string): framework.components.api.InputField<string> {
            this.setAttribute("binding", binding);
            return this;
        }
    }
    JSTextArea["__class"] = "framework.components.input.JSTextArea";
    JSTextArea["__interfaces"] = ["framework.components.api.InputField","framework.components.api.Renderable"];


}
namespace framework.components {
    export class MonthView extends framework.components.JSContainer {
        /*private*/ startDate: Date;

        public static CELL_HEIGHT: number = 100;

        /*private*/ days: number;

        /*private*/ header: framework.components.Box;

        /*private*/ body: framework.components.MonthViewBody;

        static DAYS: string[]; public static DAYS_$LI$(): string[] { if (MonthView.DAYS == null) { MonthView.DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]; }  return MonthView.DAYS; }

        public constructor(name: string) {
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

        public getStartDate(): Date {
            return this.startDate;
        }

        public setStartDate(startDate: Date) {
            this.startDate = startDate;
        }

        public reset() {
            this.fillHeader();
            this.fillBody();
        }

        /*private*/ fillHeader() {
            this.header.clearChildren();
            this.header.setRendered(false);
            for(let i: number = 0; i < this.days; i++) {{
                const cell: framework.components.Box = new framework.components.Box(MonthView.DAYS_$LI$()[i], 1, this.days);
                cell.addClass("spn-month-view-header-cell");
                cell.setHtml(MonthView.DAYS_$LI$()[i]);
                this.header.addChild$framework_components_api_Renderable(cell);
                cell.addClass("brd-btm");
                cell.addClass("brd-right");
            };}
        }

        /*private*/ fillBody() {
            let firstDate: Date = new Date(this.startDate.getFullYear(), this.startDate.getMonth(), 1, 0, 0);
            let firstDay: number = this.startDate.getDay();
            if (firstDay === 0){
                firstDay = 7;
            }
            firstDate = framework.components.Util.addDays(firstDate, 1 - firstDay);
            const endDate: Date = framework.components.Util.getLastDateOfMonth(this.startDate);
            let lastDate: Date = endDate;
            const lastDay: number = endDate.getDay();
            if (lastDay === 1){
                lastDate = framework.components.Util.addDays(endDate, 6);
            } else if (lastDay === 2){
                lastDate = framework.components.Util.addDays(endDate, 5);
            }
            if (lastDay > 0)lastDate = framework.components.Util.addDays(endDate, this.days - lastDay);
            let tmp: Date = firstDate;
            let counter: number = 0;
            while((true)) {{
                const c: framework.components.MonthViewCell = new framework.components.MonthViewCell("", this.days);
                c.setStyle("height", MonthView.CELL_HEIGHT + "px");
                c.setDate(tmp);
                this.body.addChild$framework_components_api_Renderable(c);
                if (tmp.getTime() >= lastDate.getTime()){
                    break;
                } else {
                    tmp = framework.components.Util.addDays(tmp, 1);
                }
                counter++;
            }};
            const rows: number = ((counter / this.days|0)) + 1;
            this.body.setStyle("height", (MonthView.CELL_HEIGHT * rows) + "px");
        }

        public addCalEvent(evt: Object) {
            const wk: framework.components.MonthViewEvent = new framework.components.MonthViewEvent("");
            wk.setValue(evt);
            const startDate: Date = wk.getStartDate();
            const cell: framework.components.MonthViewCell = this.getCell(startDate);
            cell.addCalEvent(wk);
        }

        public removeCalEvent(uiCalEvt: framework.components.ViewEvent) {
            {
                let array33097 = this.body.getCells();
                for(let index33096=0; index33096 < array33097.length; index33096++) {
                    let r = array33097[index33096];
                    {
                        r.removeCalEvent(uiCalEvt);
                    }
                }
            }
        }

        public moveCalEvent(uiCalEvent: framework.components.ViewEvent, newEvent: Object) {
            this.removeCalEvent(uiCalEvent);
            this.addCalEvent(newEvent);
        }

        public getCell(dt: Date): framework.components.MonthViewCell {
            {
                let array33099 = this.body.getCells();
                for(let index33098=0; index33098 < array33099.length; index33098++) {
                    let cell = array33099[index33098];
                    {
                        if (cell.isSameDate(dt)){
                            return cell;
                        }
                    }
                }
            }
            return null;
        }
    }
    MonthView["__class"] = "framework.components.MonthView";
    MonthView["__interfaces"] = ["framework.components.api.Renderable"];


}
namespace framework.components {
    export class MonthViewEvent extends framework.components.JSContainer implements framework.components.ViewEvent {
        /*private*/ value: Object;

        /*private*/ header: framework.components.JSContainer;

        /*private*/ close: framework.components.JSContainer;

        /*private*/ title: framework.components.JSContainer;

        public constructor(name: string) {
            super(name, "div");
            if (this.value === undefined) { this.value = null; }
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

        public reset() {
            const title: string = <string>this.value["title"];
            const startDate: Date = <Date>this.value["startDate"];
            const endDate: Date = <Date>this.value["endDate"];
            this.title.setHtml(this.formatDate(startDate) + " - " + title);
        }

        formatDate(dt: Date): string {
            return framework.components.Util.formatDate(dt, "hh:mm");
        }

        public setValue(value: Object) {
            this.setName(<string>value["title"]);
            this.value = value;
            this.reset();
        }

        public getStartDate(): Date {
            return <Date>this.value["startDate"];
        }

        public getEndDate(): Date {
            return <Date>this.value["endDate"];
        }

        /**
         * 
         * @param {Date} startDate
         * @return {Object}
         */
        public getNewEvent(startDate: Date): Object {
            const evt: Object = <Object>new Object();
            {
                let array33101 = Object.keys(this.value);
                for(let index33100=0; index33100 < array33101.length; index33100++) {
                    let key = array33101[index33100];
                    {
                        evt[key] = this.value[key];
                        if (key === "startDate"){
                            evt["startDate"] = startDate;
                        }
                        if (key === "endDate"){
                            const ostartDate: Date = <Date>this.value["startDate"];
                            const oendDate: Date = <Date>this.value["endDate"];
                            const diff: number = oendDate.getTime() - ostartDate.getTime();
                            const endDate: Date = new Date(startDate.getTime() + diff);
                            evt["endDate"] = endDate;
                        }
                    }
                }
            }
            return evt;
        }
    }
    MonthViewEvent["__class"] = "framework.components.MonthViewEvent";
    MonthViewEvent["__interfaces"] = ["framework.components.api.Renderable","framework.components.ViewEvent"];



    export namespace MonthViewEvent {

        export class MonthViewEvent$0 implements framework.components.api.EventListener {
            public __parent: any;
            /**
             * 
             * @param {*} source
             * @param {Event} evt
             */
            public performAction(source: framework.components.api.Renderable, evt: Event) {
                const de: DragEvent = <DragEvent>evt;
                de.dataTransfer.setData("text/plain", "move");
                const el: HTMLElement = <HTMLElement>evt.target;
                setTimeout((((el) => {
                    return () => {
                        el.parentElement.classList.add("slds-hide");
                    }
                })(el)), 0);
                framework.components.WeekViewDndManager.dragging = <framework.components.MonthViewEvent><any>source.getParent();
                framework.components.WeekViewDndManager.resizing = null;
            }

            constructor(__parent: any) {
                this.__parent = __parent;
            }
        }
        MonthViewEvent$0["__interfaces"] = ["framework.components.api.EventListener"];



        export class MonthViewEvent$1 implements framework.components.api.EventListener {
            public __parent: any;
            /**
             * 
             * @param {*} source
             * @param {Event} evt
             */
            public performAction(source: framework.components.api.Renderable, evt: Event) {
                const de: DragEvent = <DragEvent>evt;
                de.dataTransfer.setData("text/plain", "move");
                const el: HTMLElement = <HTMLElement>evt.target;
                setTimeout((((el) => {
                    return () => {
                        el.parentElement.classList.remove("slds-hide");
                    }
                })(el)), 0);
                framework.components.WeekViewDndManager.dragging = null;
            }

            constructor(__parent: any) {
                this.__parent = __parent;
            }
        }
        MonthViewEvent$1["__interfaces"] = ["framework.components.api.EventListener"];



        export class MonthViewEvent$2 implements framework.components.api.EventListener {
            public __parent: any;
            /**
             * 
             * @param {*} source
             * @param {Event} evt
             */
            public performAction(source: framework.components.api.Renderable, evt: Event) {
                const wv: framework.components.MonthView = <any>(this.__parent.getAncestorWithClass("MonthView"));
                const ev: framework.components.MonthViewEvent = <any>(source.getAncestorWithClass<any>("spn-month-view-event"));
                wv.removeCalEvent(ev);
            }

            constructor(__parent: any) {
                this.__parent = __parent;
            }
        }
        MonthViewEvent$2["__interfaces"] = ["framework.components.api.EventListener"];


    }

}
namespace framework.components {
    export class Row extends framework.components.JSContainer {
        public constructor(name: string) {
            super(name, "div");
            this.addClass("row");
            this.addCSSRule(".row{display:table;padding:10px;width:100%;}");
        }
    }
    Row["__class"] = "framework.components.Row";
    Row["__interfaces"] = ["framework.components.api.Renderable"];


}
namespace framework.components {
    export class SemaineType extends framework.components.JSContainer {
        public cmp: Object;

        public evt: Object;

        public helper: Object;

        /*private*/ table: framework.components.SemaineTypeTable;

        public constructor() {
            super("semainetype", "div");
            if (this.cmp === undefined) { this.cmp = null; }
            if (this.evt === undefined) { this.evt = null; }
            if (this.helper === undefined) { this.helper = null; }
            this.table = new framework.components.SemaineTypeTable();
            this.addChild$framework_components_api_Renderable(this.table);
            this.addClass("myapp");
        }

        public callHelper(method: string, ...parsm: Object[]) {
            const fn: Function = <Function>this.helper[method];
            const params: Object[] = (s => { let a=[]; while(s-->0) a.push(null); return a; })(parsm.length + 1);
            params[0] = this.cmp;
            for(let i: number = 0; i < parsm.length; i++) {{
                params[i + 1] = parsm[i];
            };}
            fn.call(fn, params);
        }

        public setSemaineType(semaineType: Object) {
            super.clearChildren();
            this.addChild$framework_components_api_Renderable(this.table);
            this.setRendered(false);
            const config: Object = <Object>semaineType["config"];
            {
                let array33103 = Object.keys(config);
                for(let index33102=0; index33102 < array33103.length; index33102++) {
                    let day = array33103[index33102];
                    {
                        const plannings: Object = <Object>config[day];
                        {
                            let array33105 = Object.keys(plannings);
                            for(let index33104=0; index33104 < array33105.length; index33104++) {
                                let type = array33105[index33104];
                                {
                                    const plans: Array<Object> = <Array<Object>>plannings[type];
                                    for(let index33106=0; index33106 < plans.length; index33106++) {
                                        let plan = plans[index33106];
                                        {
                                            const from: string = <string>plan["from"];
                                            const to: string = <string>plan["to"];
                                            let quantity: number = <number>plan["quantity"];
                                            if (quantity == null){
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

        public addItem(from: string, to: string, type: string, day: string, quantity: number) {
            const token: framework.components.Token = new framework.components.Token(from, to, day, type, quantity);
            token.processWith(this.table);
            this.addChild$framework_components_api_Renderable(token);
        }
    }
    SemaineType["__class"] = "framework.components.SemaineType";
    SemaineType["__interfaces"] = ["framework.components.api.Renderable"];



    export namespace SemaineType {

        export class SemaineType$0 implements framework.components.api.EventListener {
            public __parent: any;
            /**
             * 
             * @param {*} source
             * @param {Event} evt
             */
            public performAction(source: framework.components.api.Renderable, evt: Event) {
            }

            constructor(__parent: any) {
                this.__parent = __parent;
            }
        }
        SemaineType$0["__interfaces"] = ["framework.components.api.EventListener"];


    }

}
namespace framework.components {
    export class SemaineTypeCell extends framework.components.JSContainer {
        /*private*/ hour: number;

        /*private*/ minute: number;

        /*private*/ day: string;

        public constructor(day: string, hour: number, minute: number) {
            super(day, "td");
            if (this.hour === undefined) { this.hour = 0; }
            if (this.minute === undefined) { this.minute = 0; }
            if (this.day === undefined) { this.day = null; }
            this.hour = hour;
            this.minute = minute;
            this.day = day;
            this.addClass("cell");
            this.setStyle("cursor", "pointer");
            this.setStyle("padding", "0");
            this.addEventListener(new SemaineTypeCell.SemaineTypeCell$0(this, hour, minute, day), "click");
        }

        public getHour(): number {
            return this.hour;
        }

        public getMinute(): number {
            return this.minute;
        }

        public getDay(): string {
            return this.day;
        }
    }
    SemaineTypeCell["__class"] = "framework.components.SemaineTypeCell";
    SemaineTypeCell["__interfaces"] = ["framework.components.api.Renderable"];



    export namespace SemaineTypeCell {

        export class SemaineTypeCell$0 implements framework.components.api.EventListener {
            public __parent: any;
            /**
             * 
             * @param {*} source
             * @param {Event} evt
             */
            public performAction(source: framework.components.api.Renderable, evt: Event) {
                const sm: framework.components.SemaineType = <any>(source.getAncestorWithClass<any>("myapp"));
                const params: Object = <Object>new Object();
                const time: string = framework.components.Util.getTime(this.hour, this.minute);
                params["time"] = time;
                params["day"] = this.day;
                sm.callHelper("handleCreate", params);
            }

            constructor(__parent: any, private hour: any, private minute: any, private day: any) {
                this.__parent = __parent;
            }
        }
        SemaineTypeCell$0["__interfaces"] = ["framework.components.api.EventListener"];


    }

}
namespace framework.components {
    export class SemaineTypeRow extends framework.components.JSContainer {
        /*private*/ hour: number;

        /*private*/ minute: number;

        public constructor(hour: number, minute: number) {
            super(framework.components.Util.getTime(hour, minute), "tr");
            if (this.hour === undefined) { this.hour = 0; }
            if (this.minute === undefined) { this.minute = 0; }
            this.hour = hour;
            this.minute = minute;
            const head: framework.components.JSContainer = new framework.components.JSContainer("td");
            head.setHtml(minute === 0 ? framework.components.Util.getTime(hour, minute) : "");
            this.addChild$framework_components_api_Renderable(head);
            for(let index33107=0; index33107 < framework.components.Util.DAYS_$LI$().length; index33107++) {
                let day = framework.components.Util.DAYS_$LI$()[index33107];
                {
                    const cell: framework.components.SemaineTypeCell = new framework.components.SemaineTypeCell(day, hour, minute);
                    this.addChild$framework_components_api_Renderable(cell);
                }
            }
        }

        public getHour(): number {
            return this.hour;
        }

        public getMinute(): number {
            return this.minute;
        }
    }
    SemaineTypeRow["__class"] = "framework.components.SemaineTypeRow";
    SemaineTypeRow["__interfaces"] = ["framework.components.api.Renderable"];


}
namespace framework.components {
    export class SemaineTypeTable extends framework.components.JSContainer {
        /*private*/ thead: framework.components.JSContainer;

        /*private*/ tbody: framework.components.JSContainer;

        public constructor() {
            super("table");
            this.thead = new framework.components.JSContainer("head", "thead");
            this.tbody = new framework.components.JSContainer("tbody", "tbody");
            this.addClass("slds-table slds-table_cell-buffer slds-table_bordered slds-table_striped slds-table_col-bordered");
            this.initHeader();
            this.initBody();
        }

        public getColWidth(): number {
            const elem: HTMLElement = this.tbody.getChildren()[0].getChildren()[1].getNative();
            return elem.offsetWidth;
        }

        public getGutterWitdh(): number {
            const elem: HTMLElement = this.tbody.getChildren()[0].getChildren()[0].getNative();
            return elem.offsetWidth;
        }

        /*private*/ initHeader() {
            const tr: framework.components.JSContainer = new framework.components.JSContainer("tr", "tr");
            const root: framework.components.JSContainer = new framework.components.JSContainer("td").setStyle("width", "4%");
            tr.addChild$framework_components_api_Renderable(root);
            this.thead.addChild$framework_components_api_Renderable(tr);
            this.addChild$framework_components_api_Renderable(this.thead);
            for(let index33108=0; index33108 < framework.components.Util.DAYS_$LI$().length; index33108++) {
                let day = framework.components.Util.DAYS_$LI$()[index33108];
                {
                    const td: framework.components.JSContainer = new framework.components.JSContainer(day, "td").setStyle("width", "16%");
                    tr.addChild$framework_components_api_Renderable(td);
                    td.setHtml(day);
                }
            }
        }

        /*private*/ initBody() {
            this.addChild$framework_components_api_Renderable(this.tbody);
            for(let i: number = framework.components.Util.MIN_HOUR; i <= framework.components.Util.MAX_HOUR; i++) {{
                const row0: framework.components.SemaineTypeRow = new framework.components.SemaineTypeRow(i, 0);
                const row30: framework.components.SemaineTypeRow = new framework.components.SemaineTypeRow(i, 30);
                this.tbody.addChild$framework_components_api_Renderable(row0);
                this.tbody.addChild$framework_components_api_Renderable(row30);
            };}
        }
    }
    SemaineTypeTable["__class"] = "framework.components.SemaineTypeTable";
    SemaineTypeTable["__interfaces"] = ["framework.components.api.Renderable"];


}
namespace framework.components.table {
    export class Table extends framework.components.JSContainer {
        /*private*/ head: framework.components.JSContainer;

        /*private*/ body: framework.components.JSContainer;

        dataModel: framework.components.table.TableModel;

        columnModel: framework.components.table.TableColumnModel;

        public constructor(name: string) {
            super(name, "table");
            this.head = new framework.components.JSContainer("head", "thead");
            this.body = new framework.components.JSContainer("body", "tbody");
            if (this.dataModel === undefined) { this.dataModel = null; }
            if (this.columnModel === undefined) { this.columnModel = null; }
            this.addChild$framework_components_api_Renderable(this.head);
            this.addChild$framework_components_api_Renderable(this.body);
        }

        public getHead(): framework.components.JSContainer {
            return this.head;
        }

        public getBody(): framework.components.JSContainer {
            return this.body;
        }

        public getDataModel(): framework.components.table.TableModel {
            return this.dataModel;
        }

        public setDataModel(dataModel: framework.components.table.TableModel) {
            this.dataModel = dataModel;
        }

        public getColumnModel(): framework.components.table.TableColumnModel {
            return this.columnModel;
        }

        public setColumnModel(columnModel: framework.components.table.TableColumnModel) {
            this.columnModel = columnModel;
        }

        public refresh() {
            this.head.clearChildren();
            this.body.clearChildren();
            if (this.columnModel != null){
                const hrow: framework.components.JSContainer = new framework.components.JSContainer("headerRow", "tr");
                this.head.addChild$framework_components_api_Renderable(hrow);
                for(let i: number = 0; i < this.columnModel.getColumnCount(); i++) {{
                    const column: framework.components.table.TableColumn = this.columnModel.getColumn(i);
                    const headerRenderer: framework.components.table.TableCellRenderer = column.getHeaderRenderer();
                    const th: framework.components.JSContainer = new framework.components.JSContainer("", "th").setAttribute("scope", "col");
                    th.setStyle("width", column.getWidth() + "px");
                    th.setStyle("max-width", column.getMaxWidth() + "px");
                    th.setStyle("min-width", column.getMinWidth() + "px");
                    hrow.addChild$framework_components_api_Renderable(th);
                    headerRenderer.renderComponent(this, th, column.getHeaderValue(), false, false, 0, i);
                };}
            }
            if (this.dataModel != null){
                for(let row: number = 0; row < this.dataModel.getRowCount(); row++) {{
                    const r: framework.components.JSContainer = new framework.components.JSContainer("", "tr");
                    this.body.addChild$framework_components_api_Renderable(r);
                    for(let col: number = 0; col < this.dataModel.getColumnCount(); col++) {{
                        const cell: framework.components.JSContainer = new framework.components.JSContainer("", "td");
                        r.addChild$framework_components_api_Renderable(cell);
                        const val: any = this.dataModel.getValueAt(row, col);
                        if (this.columnModel != null){
                            const column: framework.components.table.TableColumn = this.columnModel.getColumn(col);
                            column.getCellRenderer().renderComponent(this, cell, val, false, false, row, col);
                        } else {
                            cell.setHtml(val != null ? val.toString() : "");
                        }
                    };}
                };}
            }
        }
    }
    Table["__class"] = "framework.components.table.Table";
    Table["__interfaces"] = ["framework.components.api.Renderable"];


}
namespace framework.components {
    export class Token extends framework.components.JSContainer {
        /*private*/ from: string;

        /*private*/ to: string;

        /*private*/ day: string;

        /*private*/ type: string;

        /*private*/ quantity: number;

        public constructor(from: string, to: string, day: string, type: string, quantity: number) {
            super("div");
            if (this.from === undefined) { this.from = null; }
            if (this.to === undefined) { this.to = null; }
            if (this.day === undefined) { this.day = null; }
            if (this.type === undefined) { this.type = null; }
            if (this.quantity === undefined) { this.quantity = null; }
            this.from = from;
            this.to = to;
            this.day = day;
            this.type = type;
            this.quantity = quantity;
            this.addClass("token");
            this.addEventListener(new Token.Token$0(this, from, to, day, type, quantity), "click");
            let html: string = type === "abs" ? "Absence" : "Disponibilit\u00e9";
            html = html + " de " + from + " \u00e0" + to;
            this.setHtml(html);
            this.setStyle("text-align", "center");
            this.setAttribute("title", html);
            if (type === "abs"){
                this.setStyle("color", "white");
            }
            this.setStyle("padding-top", "8px");
        }

        public getFrom(): string {
            return this.from;
        }

        public getTo(): string {
            return this.to;
        }

        public getDay(): string {
            return this.day;
        }

        public getType(): string {
            return this.type;
        }

        public processWith(table: framework.components.SemaineTypeTable) {
            const colWidth: number = table.getColWidth();
            const steps: number = Math.floor((colWidth - 80) / 16);
            const offset: number = Math.ceil(Math.random() * steps) * 16;
            const rows: number = framework.components.Util.countRows(this.from, this.to);
            this.setStyle("width", "80px");
            const height: number = rows * framework.components.Util.ROW_HEIGHT_PX;
            this.setStyle("height", height + "px");
            this.addClass("type_" + this.type);
            const top: number = framework.components.Util.countStartRowPosition(this.from);
            this.setStyle("top", top + "px");
            const left: number = framework.components.Util.countStartColPosition(this.day, table.getGutterWitdh(), table.getColWidth());
            this.setStyle("left", (left + offset) + "px");
        }
    }
    Token["__class"] = "framework.components.Token";
    Token["__interfaces"] = ["framework.components.api.Renderable"];



    export namespace Token {

        export class Token$0 implements framework.components.api.EventListener {
            public __parent: any;
            /**
             * 
             * @param {*} source
             * @param {Event} evt
             */
            public performAction(source: framework.components.api.Renderable, evt: Event) {
                const sm: framework.components.SemaineType = <any>(source.getAncestorWithClass<any>("myapp"));
                const params: Object = <Object>new Object();
                params["from"] = this.from;
                params["to"] = this.to;
                params["day"] = this.day;
                params["type"] = this.type;
                params["quantity"] = this.quantity;
                sm.callHelper("handleEdit", params);
            }

            constructor(__parent: any, private from: any, private to: any, private day: any, private type: any, private quantity: any) {
                this.__parent = __parent;
            }
        }
        Token$0["__interfaces"] = ["framework.components.api.EventListener"];


    }

}
namespace framework.components {
    export class WeekView extends framework.components.JSContainer {
        /*private*/ startDate: Date;

        /*private*/ days: number;

        /*private*/ startHour: number;

        /*private*/ endHour: number;

        public static CELL_HEIGHT: number = 22;

        /*private*/ header: framework.components.Box;

        /*private*/ headerLeftGutter: framework.components.Box;

        /*private*/ headerRightBody: framework.components.Box;

        /*private*/ body: framework.components.Box;

        /*private*/ bodyLeftGutter: framework.components.Box;

        /*private*/ bodyRightBody: framework.components.WeekViewBody;

        public constructor(name: string) {
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

        public reset() {
            this.fillAll();
        }

        fillAll() {
            this.fillLeftGutter();
            this.fillRightBody();
        }

        /*private*/ formatDate(date: Date): string {
            const days: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            const day: number = date.getDay();
            const iDate: number = date.getDate();
            const month: number = date.getMonth() + 1;
            const sDate: string = iDate < 10 ? "0" + iDate : iDate + "";
            const sMonth: string = month < 10 ? "0" + month : month + "";
            return days[(<number>day|0)] + " " + sDate + "/" + sMonth;
        }

        fillLeftGutter() {
            this.headerLeftGutter.clearChildren();
            this.headerLeftGutter.setRendered(false);
            const hgut: framework.components.JSContainer = new framework.components.JSContainer("div");
            hgut.addClass("slds-col slds-size_1-of-1");
            hgut.addClass("spn-header-left-gutter-cell");
            this.bodyLeftGutter.clearChildren();
            this.bodyLeftGutter.setRendered(false);
            for(let i: number = this.startHour; i <= this.endHour; i++) {{
                const gut: framework.components.Box = new framework.components.Box("gut", 1, 1);
                gut.addClass("spn-body-left-gutter-cell");
                this.bodyLeftGutter.addChild$framework_components_api_Renderable(gut);
                const fullHr: framework.components.Col = new framework.components.Col("fullHr", 1, 1);
                fullHr.addClass("brd-btm");
                fullHr.setStyle("height", WeekView.CELL_HEIGHT + "px");
                fullHr.setHtml(i + ":00");
                gut.addChild$framework_components_api_Renderable(fullHr);
                const halfHr: framework.components.Col = new framework.components.Col("halfHr", 1, 1);
                halfHr.addClass("brd-btm");
                halfHr.setStyle("height", WeekView.CELL_HEIGHT + "px");
                gut.addChild$framework_components_api_Renderable(halfHr);
            };}
        }

        fillRightBody() {
            this.startDate.setHours(0, 0, 0, 0);
            const day: number = this.startDate.getDay();
            if (day > 0){
                const toRemove: number = 1000 * 60 * 60 * 24 * (day - 1);
                this.startDate = new Date(this.startDate.getTime() - toRemove);
            } else {
                const toRemove: number = 1000 * 60 * 60 * 24 * 6;
                this.startDate = new Date(this.startDate.getTime() - toRemove);
            }
            this.headerRightBody.clearChildren();
            this.headerRightBody.setRendered(false);
            this.bodyRightBody.clearChildren();
            this.bodyRightBody.setRendered(false);
            for(let d: number = 0; d < this.days; d++) {{
                const aDay: number = 1000 * 60 * 60 * 24 * d;
                const dt: Date = new Date(this.startDate.getTime() + aDay);
                const headerRightBodyCell: framework.components.Col = new framework.components.Col("div", 1, this.days);
                headerRightBodyCell.addClass("spn-header-right-body-cell brd-right");
                headerRightBodyCell.setHtml(this.formatDate(dt));
                this.headerRightBody.addChild$framework_components_api_Renderable(headerRightBodyCell.setStyle("height", WeekView.CELL_HEIGHT + "px"));
            };}
            for(let h: number = this.startHour; h <= this.endHour; h++) {{
                for(let d: number = 0; d < this.days; d++) {{
                    const aDay: number = 1000 * 60 * 60 * 24 * d;
                    const dt: Date = new Date(this.startDate.getTime() + aDay);
                    const bodyRightBodyCell: framework.components.WeekViewDateCell = new framework.components.WeekViewDateCell(dt, h, this.days);
                    this.bodyRightBody.addChild$framework_components_api_Renderable(bodyRightBodyCell);
                };}
            };}
        }

        public setStartDate(date: Date) {
            this.startDate = date;
        }

        public setTimeRange(startHour: number, endHour: number) {
            this.startHour = startHour;
            this.endHour = endHour;
        }

        public removeCalEvent(uiCalEvt: framework.components.ViewEvent) {
            {
                let array33110 = this.bodyRightBody.getCells();
                for(let index33109=0; index33109 < array33110.length; index33109++) {
                    let r = array33110[index33109];
                    {
                        r.removeCalEvent(uiCalEvt);
                    }
                }
            }
            this.adjustEventWidth();
        }

        public adjustEventWidth() {
            const multiHold: Array<framework.components.WeekViewCell> = <any>(new Array<framework.components.WeekViewCell>());
            {
                let array33112 = this.bodyRightBody.getCells();
                for(let index33111=0; index33111 < array33112.length; index33111++) {
                    let dcell = array33112[index33111];
                    {
                        {
                            let array33114 = dcell.getCells();
                            for(let index33113=0; index33113 < array33114.length; index33113++) {
                                let cell = array33114[index33113];
                                {
                                    const holding: Array<framework.components.ViewEvent> = cell.getHolding();
                                    const size: number = holding.length;
                                    if (size > 0){
                                        multiHold.push(cell);
                                    }
                                }
                            }
                        }
                    }
                }
            }
            const sorted: framework.components.WeekViewCell[] = multiHold.sort((a, b) => {
                return (b.getHolding().length - a.getHolding().length);
            });
            const done: Object = <Object>new Object();
            for(let index33115=0; index33115 < sorted.length; index33115++) {
                let cell = sorted[index33115];
                {
                    const hds: Array<framework.components.ViewEvent> = cell.getHolding();
                    const size: number = hds.length;
                    console.info("size::" + size);
                    for(let index33116=0; index33116 < hds.length; index33116++) {
                        let ev = hds[index33116];
                        {
                            if (!done.hasOwnProperty(ev.getId())){
                                done[ev.getId()] = ev;
                                if (size === 1){
                                    ev.setStyle("width", "90%");
                                } else {
                                    ev.setStyle("width", (100 / size) + "%");
                                }
                                ev.setStyle("left", (90 / size) * hds.indexOf(ev) + "%");
                            }
                        }
                    }
                }
            }
        }

        public addCalEvent(evt: Object) {
            const wk: framework.components.WeekViewEvent = new framework.components.WeekViewEvent("");
            wk.setValue(evt);
            const startDate: Date = wk.getStartDate();
            const endDate: Date = wk.getEndDate();
            const cell: framework.components.WeekViewDateCell = this.getDateCell(startDate);
            cell.addCalEvent(wk);
            const startHr: number = startDate.getHours();
            const startMin: number = startDate.getMinutes();
            const endHr: number = endDate.getHours();
            const endMin: number = endDate.getMinutes();
            let counter: number = 0;
            for(let i: number = startHr; i < endHr; i++) {{
                counter++;
                const tmpDate: Date = framework.components.Util.addHour(startDate, counter);
                const hcell: framework.components.WeekViewDateCell = this.getDateCell(tmpDate);
                hcell.holdHr(wk);
                if (i < endHr - 1){
                    hcell.holdHalfHr(wk);
                } else {
                    if (endMin > 0){
                        hcell.holdHalfHr(wk);
                    }
                }
            };}
            this.adjustEventWidth();
        }

        public unHoldEvent(uiCalEvt: framework.components.WeekViewEvent) {
            this.bodyRightBody.unholdEvent(uiCalEvt);
        }

        public adjustHolding(uiCalEvt: framework.components.WeekViewEvent) {
            this.unHoldEvent(uiCalEvt);
            const cells: Array<framework.components.WeekViewCell> = this.getCellsForDateRange(uiCalEvt.getStartDate(), uiCalEvt.getEndDate());
            for(let index33117=0; index33117 < cells.length; index33117++) {
                let cell = cells[index33117];
                {
                    cell.hold(uiCalEvt);
                }
            }
        }

        public moveCalEvent(uiCalEvt: framework.components.ViewEvent, newEvt: Object) {
            this.removeCalEvent(uiCalEvt);
            this.addCalEvent(newEvt);
        }

        public getCellsForDateRange(startDate: Date, endDate: Date): Array<framework.components.WeekViewCell> {
            const result: Array<framework.components.WeekViewCell> = <any>(new Array<framework.components.WeekViewCell>());
            const startHr: number = startDate.getHours();
            const startMins: number = startDate.getMinutes();
            const endHr: number = endDate.getHours();
            const endMins: number = endDate.getMinutes();
            for(let i: number = startHr; i <= endHr; i++) {{
                const tmp: Date = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), i, 0);
                const cell: framework.components.WeekViewDateCell = this.getDateCell(tmp);
                if (i === startHr && startMins === 0){
                    result.push(cell.getCellHr());
                    result.push(cell.getCellHalfHr());
                } else if (i === startHr && startMins > 0){
                    result.push(cell.getCellHalfHr());
                } else if (i === endHr && endMins > 0){
                    result.push(cell.getCellHr());
                    result.push(cell.getCellHalfHr());
                } else if (i === endHr && endMins === 0){
                    result.push(cell.getCellHr());
                } else {
                    result.push(cell.getCellHr());
                    result.push(cell.getCellHalfHr());
                }
            };}
            return result;
        }

        public getDateCell(date: Date): framework.components.WeekViewDateCell {
            const hr: number = date.getHours();
            {
                let array33119 = this.bodyRightBody.getCells();
                for(let index33118=0; index33118 < array33119.length; index33118++) {
                    let cell = array33119[index33118];
                    {
                        if (framework.components.Util.isSameDate(cell.getDate(), date)){
                            if (cell.getHour() === hr)return cell;
                        }
                    }
                }
            }
            return null;
        }
    }
    WeekView["__class"] = "framework.components.WeekView";
    WeekView["__interfaces"] = ["framework.components.api.Renderable"];


}
namespace framework.components {
    export class WeekViewEvent extends framework.components.JSContainer implements framework.components.ViewEvent {
        /*private*/ value: Object;

        /*private*/ header: framework.components.JSContainer;

        /*private*/ body: framework.components.JSContainer;

        /*private*/ footer: framework.components.JSContainer;

        /*private*/ title: framework.components.JSContainer;

        /*private*/ time: framework.components.JSContainer;

        /*private*/ description: framework.components.JSContainer;

        /*private*/ resizer: framework.components.JSContainer;

        /*private*/ close: framework.components.JSContainer;

        /*private*/ heldBy: Array<framework.components.WeekViewCell>;

        startY: number;

        startHeight: number;

        newHeight: number;

        resizing: boolean;

        p: HTMLElement;

        doDrag: EventListener;

        stopDrag: EventListener;

        public constructor(name: string) {
            super(name, "div");
            if (this.value === undefined) { this.value = null; }
            this.header = new framework.components.JSContainer("header", "div");
            this.body = new framework.components.JSContainer("body", "div");
            this.footer = new framework.components.JSContainer("footer", "div");
            this.title = new framework.components.JSContainer("title", "p");
            this.time = new framework.components.JSContainer("time", "span");
            this.description = new framework.components.JSContainer("description", "p");
            this.resizer = new framework.components.JSContainer("resizer", "div");
            this.close = new framework.components.JSContainer("close", "div");
            this.heldBy = <any>(new Array<framework.components.WeekViewCell>());
            if (this.startY === undefined) { this.startY = 0; }
            if (this.startHeight === undefined) { this.startHeight = 0; }
            if (this.newHeight === undefined) { this.newHeight = 0; }
            this.resizing = false;
            this.p = null;
            this.doDrag = (e) => {
                this.p.classList.add("spn-resizing");
                this.resizing = true;
                this.p.style.height = (this.startHeight + (<MouseEvent>e).clientY - this.startY) + "px";
                this.newHeight = (this.startHeight + (<MouseEvent>e).clientY - this.startY);
            };
            this.stopDrag = (e) => {
                if (this.resizing){
                    this.resizing = false;
                    this.updateEndDate();
                    this.p.classList.remove("spn-resizing");
                    document.documentElement.removeEventListener("mousemove", <any>(((funcInst: any) => { if (typeof funcInst == 'function') { return funcInst } return (arg0) =>  (funcInst['apply'] ? funcInst['apply'] : funcInst) .call(funcInst, arg0)})(this.doDrag)), false);
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

        public reset() {
            const title: string = <string>this.value["title"];
            const description: string = <string>this.value["description"];
            const startDate: Date = <Date>this.value["startDate"];
            const endDate: Date = <Date>this.value["endDate"];
            this.title.setHtml(title);
            this.description.setHtml(description);
            this.time.setHtml(this.formatDate(startDate) + " - " + this.formatDate(endDate));
            const startHr: number = startDate.getHours();
            const startMin: number = startDate.getMinutes();
            const endHr: number = endDate.getHours();
            const endMin: number = endDate.getMinutes();
            let diffHr: number = (endHr - startHr) * 2;
            if (startMin > 0){
                diffHr = diffHr - 1;
            }
            if (endMin > 0){
                diffHr = diffHr + 1;
            }
            this.setStyle("height", diffHr * framework.components.WeekView.CELL_HEIGHT + "px");
        }

        public getGhost(): framework.components.JSContainer {
            const g: framework.components.JSContainer = new framework.components.JSContainer("div");
            g.setStyle("border", "dotted 1px red");
            g.setStyle("height", this.getNative().style.height);
            g.setStyle("width", this.getNative().offsetWidth + "px");
            return g;
        }

        public getStartDate(): Date {
            return <Date>this.value["startDate"];
        }

        public getEndDate(): Date {
            return <Date>this.value["endDate"];
        }

        public getEventDurationMS(): number {
            const startDate: Date = this.getStartDate();
            const endDate: Date = this.getEndDate();
            return (endDate.getTime() - startDate.getTime());
        }

        public isHeldBy(cell: framework.components.WeekViewCell): boolean {
            for(let index33120=0; index33120 < this.heldBy.length; index33120++) {
                let c = this.heldBy[index33120];
                {
                    if (c.getId() === cell.getId()){
                        return true;
                    }
                }
            }
            return false;
        }

        public addHeldBy(cell: framework.components.WeekViewCell) {
            if (!this.isHeldBy(cell)){
                this.heldBy.push(cell);
            }
        }

        formatDate(dt: Date): string {
            const hr: number = dt.getHours();
            const mins: number = dt.getMinutes();
            return (hr < 10 ? "0" + hr : hr + "") + ":" + (mins < 10 ? "0" + mins : mins);
        }

        public setValue(value: Object) {
            this.setName(<string>value["title"]);
            this.value = value;
            this.reset();
        }

        public getValue(): Object {
            return this.value;
        }

        public removeFromCell() {
            const cell: framework.components.WeekViewCell = <any>(this.getAncestorWithClass<any>("spn-week-view-cell"));
            cell.removeCalEvent(this);
            this.heldBy = <any>(new Array<framework.components.WeekViewCell>());
        }

        public getNewEvent(startDate: Date): Object {
            const evt: Object = <Object>new Object();
            {
                let array33122 = Object.keys(this.value);
                for(let index33121=0; index33121 < array33122.length; index33121++) {
                    let key = array33122[index33121];
                    {
                        evt[key] = this.value[key];
                        if (key === "startDate"){
                            evt["startDate"] = startDate;
                        }
                        if (key === "endDate"){
                            const ostartDate: Date = <Date>this.value["startDate"];
                            const oendDate: Date = <Date>this.value["endDate"];
                            const diff: number = oendDate.getTime() - ostartDate.getTime();
                            const endDate: Date = new Date(startDate.getTime() + diff);
                            evt["endDate"] = endDate;
                        }
                    }
                }
            }
            return evt;
        }

        public updateEndDate() {
            const remainder: number = this.newHeight % framework.components.WeekView.CELL_HEIGHT;
            let segments: number = (this.newHeight - remainder) / framework.components.WeekView.CELL_HEIGHT;
            if (remainder > 0){
                segments = segments + 1;
            }
            const ms: number = 30 * 60 * 1000 * segments;
            const endDate: Date = new Date(this.getStartDate().getTime() + ms);
            this.value["endDate"] = endDate;
            this.setStyle("height", segments * framework.components.WeekView.CELL_HEIGHT + "px");
            this.getNative().style.height = this.getStyle("height");
            this.time.setHtml(this.formatDate(this.getStartDate()) + " - " + this.formatDate(this.getEndDate()));
            const wj: framework.components.WeekView = <any>(this.getAncestorWithClass<any>("WeekView"));
            wj.adjustHolding(this);
            wj.adjustEventWidth();
        }
    }
    WeekViewEvent["__class"] = "framework.components.WeekViewEvent";
    WeekViewEvent["__interfaces"] = ["framework.components.api.Renderable","framework.components.ViewEvent"];



    export namespace WeekViewEvent {

        export class WeekViewEvent$0 implements framework.components.api.EventListener {
            public __parent: any;
            /**
             * 
             * @param {*} source
             * @param {Event} evt
             */
            public performAction(source: framework.components.api.Renderable, evt: Event) {
                const de: DragEvent = <DragEvent>evt;
                de.dataTransfer.setData("text/plain", "move");
                const el: HTMLElement = <HTMLElement>evt.target;
                setTimeout((((el) => {
                    return () => {
                        el.parentElement.classList.add("slds-hide");
                    }
                })(el)), 0);
                framework.components.WeekViewDndManager.dragging = <framework.components.WeekViewEvent><any>source.getParent();
                framework.components.WeekViewDndManager.resizing = null;
            }

            constructor(__parent: any) {
                this.__parent = __parent;
            }
        }
        WeekViewEvent$0["__interfaces"] = ["framework.components.api.EventListener"];



        export class WeekViewEvent$1 implements framework.components.api.EventListener {
            public __parent: any;
            /**
             * 
             * @param {*} source
             * @param {Event} evt
             */
            public performAction(source: framework.components.api.Renderable, evt: Event) {
                const de: DragEvent = <DragEvent>evt;
                de.dataTransfer.setData("text/plain", "move");
                const el: HTMLElement = <HTMLElement>evt.target;
                setTimeout((((el) => {
                    return () => {
                        el.parentElement.classList.remove("slds-hide");
                    }
                })(el)), 0);
                framework.components.WeekViewDndManager.dragging = null;
            }

            constructor(__parent: any) {
                this.__parent = __parent;
            }
        }
        WeekViewEvent$1["__interfaces"] = ["framework.components.api.EventListener"];



        export class WeekViewEvent$2 implements framework.components.api.EventListener {
            public __parent: any;
            /**
             * 
             * @param {*} source
             * @param {Event} evt
             */
            public performAction(source: framework.components.api.Renderable, evt: Event) {
                const me: MouseEvent = <MouseEvent>evt;
                this.__parent.startY = me.clientY;
                this.__parent.p = this.__parent.getNative();
                this.__parent.startHeight = parseInt(document.defaultView.getComputedStyle(this.__parent.p).height, 10);
                this.__parent.resizer.getNative().addEventListener("mousedown", (e) => {
                    document.documentElement.addEventListener("mousemove", <any>(((funcInst: any) => { if (typeof funcInst == 'function') { return funcInst } return (arg0) =>  (funcInst['apply'] ? funcInst['apply'] : funcInst) .call(funcInst, arg0)})(this.__parent.doDrag)), false);
                    document.documentElement.addEventListener("mouseup", <any>(((funcInst: any) => { if (typeof funcInst == 'function') { return funcInst } return (arg0) =>  (funcInst['apply'] ? funcInst['apply'] : funcInst) .call(funcInst, arg0)})(this.__parent.stopDrag)), false);
                    return true;
                }, false);
            }

            constructor(__parent: any) {
                this.__parent = __parent;
            }
        }
        WeekViewEvent$2["__interfaces"] = ["framework.components.api.EventListener"];



        export class WeekViewEvent$3 implements framework.components.api.EventListener {
            public __parent: any;
            /**
             * 
             * @param {*} source
             * @param {Event} evt
             */
            public performAction(source: framework.components.api.Renderable, evt: Event) {
                const wv: framework.components.WeekView = <any>(this.__parent.getAncestorWithClass("WeekView"));
                const ev: framework.components.WeekViewEvent = <any>(source.getAncestorWithClass<any>("spn-week-view-event"));
                wv.removeCalEvent(ev);
            }

            constructor(__parent: any) {
                this.__parent = __parent;
            }
        }
        WeekViewEvent$3["__interfaces"] = ["framework.components.api.EventListener"];


    }

}
namespace framework.components {
    export class MonthViewBody extends framework.components.Box {
        public constructor(name: string) {
            super(name, 1, 1);
            this.addClass("spn-month-view-body");
        }

        public getCells(): Array<framework.components.MonthViewCell> {
            const result: Array<any> = this.getChildren();
            return result;
        }
    }
    MonthViewBody["__class"] = "framework.components.MonthViewBody";
    MonthViewBody["__interfaces"] = ["framework.components.api.Renderable"];


}
namespace framework.components {
    export class MonthViewCell extends framework.components.Box {
        /*private*/ date: Date;

        /*private*/ header: framework.components.Box;

        /*private*/ body: framework.components.Box;

        public constructor(name: string, of: number) {
            super(name, 1, of);
            if (this.date === undefined) { this.date = null; }
            this.header = new framework.components.Box("header", 1, 1);
            this.body = new framework.components.Box("body", 1, 1);
            this.addClass("spn-month-view-cell");
            this.addChild$framework_components_api_Renderable(this.header);
            this.addChild$framework_components_api_Renderable(this.body);
            this.header.setStyle("height", ((framework.components.MonthView.CELL_HEIGHT / 6|0)) + "px");
            this.body.setStyle("height", ((framework.components.MonthView.CELL_HEIGHT * 5 / 6|0)) + "px");
            this.body.setStyle("overflow-y", "auto");
            this.addClass("brd-btm");
            this.addClass("brd-right");
            this.addEventListener(new MonthViewCell.MonthViewCell$0(this), "dblclick");
            this.addEventListener(new MonthViewCell.MonthViewCell$1(this), "dragenter");
            this.addEventListener(new MonthViewCell.MonthViewCell$2(this), "dragover");
            this.addEventListener(new MonthViewCell.MonthViewCell$3(this), "dragleave");
            this.addEventListener(new MonthViewCell.MonthViewCell$4(this), "drop");
        }

        public setDate(date: Date) {
            this.date = date;
            this.header.setHtml(date.getDate() + "");
        }

        public isSameDate(dt: Date): boolean {
            if (dt.getFullYear() === this.date.getFullYear()){
                if (dt.getMonth() === this.date.getMonth()){
                    if (dt.getDate() === this.date.getDate()){
                        return true;
                    }
                }
            }
            return false;
        }

        public addCalEvent(uiCalEvent: framework.components.ViewEvent) {
            this.body.addChild$framework_components_api_Renderable(uiCalEvent);
        }

        public getDate(): Date {
            return this.date;
        }

        public removeCalEvent(uiCalEvent: framework.components.ViewEvent) {
            this.body.removeChild(uiCalEvent);
        }
    }
    MonthViewCell["__class"] = "framework.components.MonthViewCell";
    MonthViewCell["__interfaces"] = ["framework.components.api.Renderable"];



    export namespace MonthViewCell {

        export class MonthViewCell$0 implements framework.components.api.EventListener {
            public __parent: any;
            /**
             * 
             * @param {*} source
             * @param {Event} evt
             */
            public performAction(source: framework.components.api.Renderable, evt: Event) {
                const top: number = source.getNative().offsetTop;
                const left: number = source.getNative().offsetLeft;
                const hour: number = 17;
                const min: number = 30;
                console.log("{" + left + "," + top + "}");
                const shrs: string = prompt("Number of hours:");
                if (shrs != null){
                    const ce: Object = <Object>new Object();
                    ce["title"] = "New Event";
                    ce["description"] = "Arbitrary event added";
                    const startDate: Date = new Date(this.__parent.date.getFullYear(), this.__parent.date.getMonth(), this.__parent.date.getDate(), parseFloat(shrs), 30);
                    const endDate: Date = framework.components.Util.addHour(startDate, 4);
                    ce["startDate"] = startDate;
                    ce["endDate"] = endDate;
                    const wj: framework.components.MonthView = <any>(source.getAncestorWithClass<any>("spn-month-view"));
                    wj.addCalEvent(ce);
                }
            }

            constructor(__parent: any) {
                this.__parent = __parent;
            }
        }
        MonthViewCell$0["__interfaces"] = ["framework.components.api.EventListener"];



        export class MonthViewCell$1 implements framework.components.api.EventListener {
            public __parent: any;
            /**
             * 
             * @param {*} source
             * @param {Event} evt
             */
            public performAction(source: framework.components.api.Renderable, evt: Event) {
                if (framework.components.WeekViewDndManager.dragging != null){
                    evt.preventDefault();
                    source.addClass("drag-over");
                }
            }

            constructor(__parent: any) {
                this.__parent = __parent;
            }
        }
        MonthViewCell$1["__interfaces"] = ["framework.components.api.EventListener"];



        export class MonthViewCell$2 implements framework.components.api.EventListener {
            public __parent: any;
            /**
             * 
             * @param {*} source
             * @param {Event} evt
             */
            public performAction(source: framework.components.api.Renderable, evt: Event) {
                if (framework.components.WeekViewDndManager.dragging != null){
                    evt.preventDefault();
                    source.addClass("drag-over");
                }
            }

            constructor(__parent: any) {
                this.__parent = __parent;
            }
        }
        MonthViewCell$2["__interfaces"] = ["framework.components.api.EventListener"];



        export class MonthViewCell$3 implements framework.components.api.EventListener {
            public __parent: any;
            /**
             * 
             * @param {*} source
             * @param {Event} evt
             */
            public performAction(source: framework.components.api.Renderable, evt: Event) {
                if (framework.components.WeekViewDndManager.dragging != null){
                    evt.preventDefault();
                    source.removeClass("drag-over");
                }
            }

            constructor(__parent: any) {
                this.__parent = __parent;
            }
        }
        MonthViewCell$3["__interfaces"] = ["framework.components.api.EventListener"];



        export class MonthViewCell$4 implements framework.components.api.EventListener {
            public __parent: any;
            /**
             * 
             * @param {*} source
             * @param {Event} evt
             */
            public performAction(source: framework.components.api.Renderable, evt: Event) {
                if (framework.components.WeekViewDndManager.dragging != null){
                    evt.preventDefault();
                    source.removeClass("drag-over");
                    (<HTMLElement>evt.target).classList.remove("drag-over");
                    const dragging: framework.components.ViewEvent = framework.components.WeekViewDndManager.dragging;
                    if (dragging != null){
                        const srcStartDate: Date = dragging.getStartDate();
                        const startDate: Date = new Date(this.__parent.date.getFullYear(), this.__parent.date.getMonth(), this.__parent.date.getDate(), srcStartDate.getHours(), srcStartDate.getMinutes());
                        const newEvt: Object = dragging.getNewEvent(startDate);
                        const wek: framework.components.MonthView = <any>(source.getAncestorWithClass<any>("spn-month-view"));
                        wek.moveCalEvent(dragging, newEvt);
                        framework.components.WeekViewDndManager.dragging = null;
                    }
                }
            }

            constructor(__parent: any) {
                this.__parent = __parent;
            }
        }
        MonthViewCell$4["__interfaces"] = ["framework.components.api.EventListener"];


    }

}
namespace framework.components {
    export class WeekViewBody extends framework.components.Box {
        public constructor(name: string) {
            super(name, 11, 12);
            this.addClass("spn-body-right-body");
        }

        public getCells(): Array<framework.components.WeekViewDateCell> {
            const result: Array<any> = this.getChildren();
            return result;
        }

        public unholdEvent(uiCalEvt: framework.components.WeekViewEvent) {
            {
                let array33124 = this.getCells();
                for(let index33123=0; index33123 < array33124.length; index33123++) {
                    let dc = array33124[index33123];
                    {
                        {
                            let array33126 = dc.getCells();
                            for(let index33125=0; index33125 < array33126.length; index33125++) {
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
    WeekViewBody["__class"] = "framework.components.WeekViewBody";
    WeekViewBody["__interfaces"] = ["framework.components.api.Renderable"];


}
namespace framework.components {
    export class WeekViewDateCell extends framework.components.Box {
        /*private*/ date: Date;

        /*private*/ hour: number;

        /*private*/ cellHr: framework.components.WeekViewCell;

        /*private*/ cellHalfHr: framework.components.WeekViewCell;

        public constructor(date: Date, hr: number, days: number) {
            super(framework.components.Util.formatDate(date, "dd"), 1, days);
            if (this.date === undefined) { this.date = null; }
            if (this.hour === undefined) { this.hour = null; }
            if (this.cellHr === undefined) { this.cellHr = null; }
            if (this.cellHalfHr === undefined) { this.cellHalfHr = null; }
            this.date = date;
            this.hour = hr;
            this.addClass("spn-body-right-body-cell");
            this.cellHr = new framework.components.WeekViewCell(hr, 0, date);
            this.cellHalfHr = new framework.components.WeekViewCell(hr, 30, date);
            this.addChild$framework_components_api_Renderable(this.cellHr.addClass("brd-btm brd-right")).addChild(this.cellHalfHr.addClass("brd-btm brd-right"));
        }

        public addCalEvent(uiCalEvt: framework.components.WeekViewEvent) {
            const dt: Date = uiCalEvt.getStartDate();
            const mins: number = dt.getMinutes();
            if (mins > 0){
                this.cellHalfHr.addCalEvent(uiCalEvt);
            } else {
                this.cellHr.addCalEvent(uiCalEvt);
            }
        }

        public getCells(): Array<framework.components.WeekViewCell> {
            const result: Array<any> = this.getChildren();
            return result;
        }

        public removeCalEvent(uiCalEvt: framework.components.ViewEvent) {
            this.cellHalfHr.removeCalEvent(uiCalEvt);
            this.cellHr.removeCalEvent(uiCalEvt);
        }

        public getDate(): Date {
            return this.date;
        }

        public getHour(): number {
            return this.hour;
        }

        public holdHr(uiCalEvt: framework.components.WeekViewEvent) {
            this.cellHr.hold(uiCalEvt);
        }

        public holdHalfHr(uiCalEvt: framework.components.WeekViewEvent) {
            this.cellHalfHr.hold(uiCalEvt);
        }

        public unhold(uiCalEvt: framework.components.WeekViewEvent) {
            this.cellHr.unhold(uiCalEvt);
            this.cellHalfHr.unhold(uiCalEvt);
        }

        public getCellHr(): framework.components.WeekViewCell {
            return this.cellHr;
        }

        public getCellHalfHr(): framework.components.WeekViewCell {
            return this.cellHalfHr;
        }
    }
    WeekViewDateCell["__class"] = "framework.components.WeekViewDateCell";
    WeekViewDateCell["__interfaces"] = ["framework.components.api.Renderable"];


}
namespace framework.components {
    export class WeekViewCell extends framework.components.Col {
        /*private*/ hour: number;

        /*private*/ min: number;

        /*private*/ date: Date;

        /*private*/ holding: Array<framework.components.ViewEvent>;

        public constructor(hour: number, min: number, date: Date) {
            super(hour + "-" + min, 1, 1);
            if (this.hour === undefined) { this.hour = 0; }
            if (this.min === undefined) { this.min = 0; }
            if (this.date === undefined) { this.date = null; }
            this.holding = <any>(new Array<framework.components.ViewEvent>());
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

        public addCalEvent(uiCalEvt: framework.components.WeekViewEvent) {
            this.addChild$framework_components_api_Renderable(uiCalEvt);
            this.hold(uiCalEvt);
        }

        public removeCalEvent(uiCalEvt: framework.components.ViewEvent) {
            this.removeChild(uiCalEvt);
            this.unhold(uiCalEvt);
        }

        public getHour(): number {
            return this.hour;
        }

        public getMin(): number {
            return this.min;
        }

        public getDate(): Date {
            return this.date;
        }

        public hold(uiCalEvt: framework.components.WeekViewEvent) {
            if (!this.isHolding(uiCalEvt)){
                this.holding.push(uiCalEvt);
            }
            uiCalEvt.addHeldBy(this);
        }

        public unhold(uiCalEvt: framework.components.ViewEvent) {
            const tmp: Array<framework.components.ViewEvent> = <any>(new Array<framework.components.ViewEvent>());
            for(let index33127=0; index33127 < this.holding.length; index33127++) {
                let ev = this.holding[index33127];
                {
                    if (ev.getId() !== uiCalEvt.getId()){
                        tmp.push(ev);
                    }
                }
            }
            this.holding = tmp;
        }

        public isHolding(uiCalEvt: framework.components.ViewEvent): boolean {
            for(let index33128=0; index33128 < this.holding.length; index33128++) {
                let ev = this.holding[index33128];
                {
                    if (ev.getId() === uiCalEvt.getId()){
                        return true;
                    }
                }
            }
            return false;
        }

        public getHolding(): Array<framework.components.ViewEvent> {
            return this.holding;
        }
    }
    WeekViewCell["__class"] = "framework.components.WeekViewCell";
    WeekViewCell["__interfaces"] = ["framework.components.api.Renderable"];



    export namespace WeekViewCell {

        export class WeekViewCell$0 implements framework.components.api.EventListener {
            public __parent: any;
            /**
             * 
             * @param {*} source
             * @param {Event} evt
             */
            public performAction(source: framework.components.api.Renderable, evt: Event) {
                const top: number = source.getNative().offsetTop;
                const left: number = source.getNative().offsetLeft;
                console.log("{" + left + "," + top + "}");
                const shrs: string = prompt("Number of hours:");
                if (shrs != null){
                    const ce: Object = <Object>new Object();
                    ce["title"] = "New Event";
                    ce["description"] = "Arbitrary event added";
                    const time: number = (this.hour * 60 * 60 * 1000) + (this.min * 60 * 1000);
                    ce["startDate"] = new Date(this.date.getTime() + time);
                    const ms: number = parseFloat(shrs) * 60 * 60 * 1000 + time;
                    const endDate: Date = new Date(this.date.getTime() + ms);
                    ce["endDate"] = endDate;
                    const wds: framework.components.WeekViewEvent = new framework.components.WeekViewEvent("");
                    wds.setValue(ce);
                    const wj: framework.components.WeekView = <any>(source.getAncestorWithClass<any>("spn-week-view"));
                    wj.addCalEvent(ce);
                }
            }

            constructor(__parent: any, private hour: any, private min: any, private date: any) {
                this.__parent = __parent;
            }
        }
        WeekViewCell$0["__interfaces"] = ["framework.components.api.EventListener"];



        export class WeekViewCell$1 implements framework.components.api.EventListener {
            public __parent: any;
            /**
             * 
             * @param {*} source
             * @param {Event} evt
             */
            public performAction(source: framework.components.api.Renderable, evt: Event) {
                if (framework.components.WeekViewDndManager.dragging != null){
                    evt.preventDefault();
                    (<HTMLElement>evt.target).classList.add("drag-over");
                }
            }

            constructor(__parent: any) {
                this.__parent = __parent;
            }
        }
        WeekViewCell$1["__interfaces"] = ["framework.components.api.EventListener"];



        export class WeekViewCell$2 implements framework.components.api.EventListener {
            public __parent: any;
            /**
             * 
             * @param {*} source
             * @param {Event} evt
             */
            public performAction(source: framework.components.api.Renderable, evt: Event) {
                if (framework.components.WeekViewDndManager.dragging != null){
                    evt.preventDefault();
                    (<HTMLElement>evt.target).classList.add("drag-over");
                }
            }

            constructor(__parent: any) {
                this.__parent = __parent;
            }
        }
        WeekViewCell$2["__interfaces"] = ["framework.components.api.EventListener"];



        export class WeekViewCell$3 implements framework.components.api.EventListener {
            public __parent: any;
            /**
             * 
             * @param {*} source
             * @param {Event} evt
             */
            public performAction(source: framework.components.api.Renderable, evt: Event) {
                if (framework.components.WeekViewDndManager.dragging != null){
                    evt.preventDefault();
                    (<HTMLElement>evt.target).classList.remove("drag-over");
                }
            }

            constructor(__parent: any) {
                this.__parent = __parent;
            }
        }
        WeekViewCell$3["__interfaces"] = ["framework.components.api.EventListener"];



        export class WeekViewCell$4 implements framework.components.api.EventListener {
            public __parent: any;
            /**
             * 
             * @param {*} source
             * @param {Event} evt
             */
            public performAction(source: framework.components.api.Renderable, evt: Event) {
                if (framework.components.WeekViewDndManager.dragging != null){
                    evt.preventDefault();
                    (<HTMLElement>evt.target).classList.remove("drag-over");
                    const dragging: framework.components.ViewEvent = framework.components.WeekViewDndManager.dragging;
                    if (dragging != null){
                        const startDate: Date = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate(), this.hour, this.min);
                        const newEvt: Object = dragging.getNewEvent(startDate);
                        const wek: framework.components.WeekView = <any>(source.getAncestorWithClass<any>("spn-week-view"));
                        wek.moveCalEvent(dragging, newEvt);
                        framework.components.WeekViewDndManager.dragging = null;
                    }
                }
            }

            constructor(__parent: any, private date: any, private hour: any, private min: any) {
                this.__parent = __parent;
            }
        }
        WeekViewCell$4["__interfaces"] = ["framework.components.api.EventListener"];


    }

}
namespace framework.components.input {
    export class JSAddressInput extends framework.components.HTMLTemplateContainer implements framework.components.api.InputField<Object> {
        /*private*/ address: Object;

        /*private*/ country: framework.components.input.JSSelect;

        /*private*/ city: framework.components.input.JSTextInput;

        /*private*/ postalCode: framework.components.input.JSTextInput;

        /*private*/ state: framework.components.input.JSTextInput;

        /*private*/ street: framework.components.input.JSTextInput;

        public constructor(name: string) {
            super(name, "");
            this.address = <Object>new Object();
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

        public getAddress(): Object {
            this.address["country"] = this.country.getValue();
            this.address["city"] = this.city.getValue();
            this.address["postalCode"] = this.country.getValue();
            this.address["state"] = this.state.getValue();
            this.address["street"] = this.street.getValue();
            return this.address;
        }

        public setAddress(address: Object) {
            this.country.setValue(address["country"]);
            this.city.setValue$java_lang_String(<string>address["city"]);
            this.postalCode.setValue$java_lang_String(<string>address["postalCode"]);
            this.state.setValue$java_lang_String(<string>address["state"]);
            this.street.setValue$java_lang_String(<string>address["street"]);
        }

        /**
         * 
         * @return {Object}
         */
        public getValue(): Object {
            return this.getAddress();
        }

        public setValue$jsweet_lang_Object(val: Object) {
            this.setAddress(val);
        }

        /**
         * 
         * @param {Object} val
         */
        public setValue(val?: any) {
            if (((val != null && val instanceof <any>Object) || val === null)) {
                return <any>this.setValue$jsweet_lang_Object(val);
            } else throw new Error('invalid overload');
        }

        /**
         * 
         */
        public validate() {
            this.street.validate();
            this.postalCode.validate();
            this.city.validate();
            this.country.validate();
        }

        /**
         * 
         * @return {string}
         */
        public getBinding(): string {
            if (this.getAttribute("binding") == null){
                return this.getName();
            } else {
                return this.getAttribute("binding");
            }
        }

        /**
         * 
         * @param {string} binding
         * @return {*}
         */
        public setBinding(binding: string): framework.components.api.InputField<Object> {
            this.setAttribute("binding", binding);
            return this;
        }

        /**
         * 
         * @param {boolean} b
         * @return {*}
         */
        public setRequired(b: boolean): framework.components.api.InputField<Object> {
            return this;
        }
    }
    JSAddressInput["__class"] = "framework.components.input.JSAddressInput";
    JSAddressInput["__interfaces"] = ["framework.components.api.InputField","framework.components.api.Renderable","framework.components.api.TemplateRenderable"];


}
namespace framework.components {
    /**
     * Create a new instance of this component
     * @param {string} name The name of the component
     * @param {string} url The url where to submit uploaded file
     * @param {string} template
     * @class
     * @extends framework.components.HTMLTemplateContainer
     * @author Rossaye Abdool Kureem
     */
    export class JSUpload extends framework.components.HTMLTemplateContainer implements framework.components.api.EventListener, framework.components.api.InputField<Object> {
        /*private*/ label: framework.components.JSContainer;

        /*private*/ input: framework.components.JSContainer;

        /*private*/ uploader: framework.components.FileUploader;

        /*private*/ required: boolean;

        public constructor(name?: any, template?: any, url?: any) {
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
            } else if (((typeof name === 'string') || name === null) && ((typeof template === 'string') || template === null) && url === undefined) {
                let __args = arguments;
                let url: any = __args[1];
                {
                    let __args = arguments;
                    let template: any = "<form>\n\t<div name=\"label\"></div>\n\t<div name=\"uploadfile\"></div>\n</form>";
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
            } else throw new Error('invalid overload');
        }

        /**
         * Manually opens native dialog box to select file to upload
         */
        public triggerUpload() {
            this.input.getNative().click();
        }

        /**
         * 
         * @return {java.lang.String[]}
         */
        public advancedEventTypes(): string[] {
            return ["success", "error"];
        }

        /**
         * Sets a label to this component
         * @param {string} label The label of the component
         */
        public setLabel(label: string) {
            this.label.setHtml(label);
        }

        /**
         * Sets the accepts mimetypes for this component
         * @param {string} accepts Mime types allowed to upload (e.g image/jpg, image/png, text/html etc)
         */
        public setAccepts(accepts: string) {
            this.input.setAttribute("accept", accepts);
        }

        /**
         * 
         * @param {*} source
         * @param {Event} ev
         */
        public performAction(source: framework.components.api.Renderable, ev: Event) {
        }

        /**
         * Sets the server url where to submit file to uplaod
         * @param {string} url Url where to submit file to upload
         */
        public setUrl(url: string) {
            this.setAttribute("url", url);
        }

        /**
         * Synonymous to setUrl
         * @param {string} url The url where to submit file to upload
         */
        public setEndpoint(url: string) {
            this.setUrl(url);
        }

        /**
         * 
         * @return {Object}
         */
        public getValue(): Object {
            return null;
        }

        public setValue$jsweet_lang_Object(val: Object) {
        }

        /**
         * 
         * @param {Object} val
         */
        public setValue(val?: any) {
            if (((val != null && val instanceof <any>Object) || val === null)) {
                return <any>this.setValue$jsweet_lang_Object(val);
            } else throw new Error('invalid overload');
        }

        /**
         * 
         */
        public validate() {
        }

        /**
         * 
         * @return {string}
         */
        public getBinding(): string {
            return this.getAttribute("binding");
        }

        /**
         * 
         * @param {string} binding
         * @return {*}
         */
        public setBinding(binding: string): framework.components.api.InputField<Object> {
            this.setAttribute("binding", binding);
            return this;
        }

        /**
         * 
         * @param {boolean} b
         * @return {*}
         */
        public setRequired(b: boolean): framework.components.api.InputField<Object> {
            this.required = b;
            return this;
        }

        public getUploader(): framework.components.FileUploader {
            return this.uploader;
        }

        public setUploader(uploader: framework.components.FileUploader) {
            this.uploader = uploader;
        }

        public getLabel(): framework.components.JSContainer {
            return this.label;
        }

        public getInput(): framework.components.JSContainer {
            return this.input;
        }

        public isRequired(): boolean {
            return this.required;
        }
    }
    JSUpload["__class"] = "framework.components.JSUpload";
    JSUpload["__interfaces"] = ["framework.components.api.EventListener","framework.components.api.InputField","framework.components.api.Renderable","framework.components.api.TemplateRenderable"];


}
namespace framework.components.input {
    export class JSCheckBox extends framework.components.input.AbstractJSInput<boolean> {
        public constructor(name: string) {
            super(name);
            this.setAttribute("type", "checkbox");
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
namespace framework.components.input {
    export class JSDateInput extends framework.components.input.AbstractJSInput<Date> {
        public constructor(name: string) {
            super(name);
            this.setType(framework.components.input.DateInputTypes.date);
            this.addEventListener(new JSDateInput.JSDateInput$0(this), "change");
        }

        public setType(type: string): JSDateInput {
            this.setAttribute("type", type);
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

        export class JSDateInput$0 implements framework.components.api.EventListener {
            public __parent: any;
            /**
             * 
             * @param {*} source
             * @param {Event} evt
             */
            public performAction(source: framework.components.api.Renderable, evt: Event) {
                this.__parent.setValue(this.__parent.getValue());
            }

            constructor(__parent: any) {
                this.__parent = __parent;
            }
        }
        JSDateInput$0["__interfaces"] = ["framework.components.api.EventListener"];


    }

}
namespace framework.components.input {
    export class JSNumberInput extends framework.components.input.AbstractJSInput<number> {
        public constructor(name: string) {
            super(name);
            this.setAttribute("type", "number");
        }

        public setType(type: string): JSNumberInput {
            this.setAttribute("type", type);
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
namespace framework.components.input {
    export class JSTextInput extends framework.components.input.AbstractJSInput<string> {
        public constructor(name: string) {
            super(name);
            this.setType(framework.components.api.StringInputTypes.text);
            this.setAttribute("identifier", "html:input");
        }

        public setMaxLength(length: number) {
            this.setAttribute("maxlength", length + "");
        }

        public setType(type: string): JSTextInput {
            this.setAttribute("type", type);
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
namespace framework.components.input {
    export class JSTimeInput extends framework.components.input.AbstractJSInput<Date> {
        /*private*/ savedDate: Date;

        public constructor(name: string) {
            super(name);
            this.savedDate = new Date();
            this.setAttribute("type", "time");
            this.setAttribute("identifier", "html:time-input");
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
            } else throw new Error('invalid overload');
        }
    }
    JSTimeInput["__class"] = "framework.components.input.JSTimeInput";
    JSTimeInput["__interfaces"] = ["framework.components.api.InputField","framework.components.api.Renderable"];


}
namespace framework.components.input {
    export class RichTextEditor extends framework.components.input.JSTextArea implements framework.components.api.Renderer<RichTextEditor> {
        /*private*/ editor: Object;

        public constructor(name: string) {
            super(name);
            this.editor = null;
            this.setAttribute("identifier", "html:richtext");
            this.addRenderer(this);
        }

        public doRender$framework_components_input_RichTextEditor$jsweet_dom_HTMLElement(c: RichTextEditor, root: HTMLElement) {
            if (this.editor == null){
                eval("this.editor = new Simditor({textarea: $(\'#" + this.getId() + "\')});");
            }
        }

        /**
         * 
         * @param {framework.components.input.RichTextEditor} c
         * @param {HTMLElement} root
         */
        public doRender(c?: any, root?: any) {
            if (((c != null && c instanceof <any>framework.components.input.RichTextEditor) || c === null) && ((root != null && root instanceof <any>HTMLElement) || root === null)) {
                return <any>this.doRender$framework_components_input_RichTextEditor$jsweet_dom_HTMLElement(c, root);
            } else throw new Error('invalid overload');
        }

        /**
         * 
         * @return {string}
         */
        public getValue(): string {
            if (this.editor != null){
                (<Function>this.editor["saveContent"]).call(this.editor);
            }
            return super.getValue();
        }
    }
    RichTextEditor["__class"] = "framework.components.input.RichTextEditor";
    RichTextEditor["__interfaces"] = ["framework.components.api.InputField","framework.components.api.Renderable","framework.components.api.Renderer"];


}
namespace framework.components.input {
    export class JSRadio extends framework.components.input.JSCheckBox {
        public constructor(name: string) {
            super(name);
            this.setAttribute("type", "radio");
        }
    }
    JSRadio["__class"] = "framework.components.input.JSRadio";
    JSRadio["__interfaces"] = ["framework.components.api.InputField","framework.components.api.Renderable"];


}


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
