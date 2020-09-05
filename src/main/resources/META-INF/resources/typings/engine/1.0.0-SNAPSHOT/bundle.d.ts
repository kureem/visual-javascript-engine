declare namespace api {
    class ContainerRenderer implements api.Renderer<api.Renderable> {
        static timeSpent: number;
        doRender(c: api.Renderable, root: HTMLElement): void;
        execCommands(njq: HTMLElement, container: api.Renderable): void;
        renderEvents(njq: HTMLElement, c: api.Renderable): void;
        renderAttributes(njq: HTMLElement, c: api.Renderable, changed: boolean): void;
        clearAttributes(elem: HTMLElement): void;
        clearStyles(jq: HTMLElement): void;
        renderStyles(njq: HTMLElement, c: api.Renderable, changed: boolean): void;
        static setAttribute(element: HTMLElement, attribute: string, value: string): void;
        static processCSSRules(renderable: api.Renderable, nativeNode: HTMLElement): void;
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
     * @param <T>
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
         * @return {Array} Array of style names set to this {@link Renderable}
         */
        getStyleNames(): string[];
        /**
         * return Array of attributes set to this {@link Renderable}
         *
         * @return {Array} Array of attributes set to this {@link Renderable}
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
declare namespace api {
    /**
     * Interface to implemented by renderer of components
     * @author Kureem Rossaye
     *
     * @param <T>
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
    class StringInputTypes {
        static text: string;
        static password: string;
        static email: string;
        static url: string;
        static search: string;
        static tel: string;
        static color: string;
        static types: string[];
        static types_$LI$(): string[];
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
         *
         */
        static serialVersionUID: number;
        errors: Array<Object>;
        constructor(message?: any, errorCode?: any);
        static addError(msg: string, code: number, e: ValidationException): void;
    }
}
declare namespace api {
    interface Validator<T> {
        validate(source: api.InputField<T>): boolean;
        getErrorMessage(): string;
        getSuccessMessage(): string;
        supports(clazz: any): any;
    }
}
declare class FileUploader {
}
declare namespace input {
    class DateInputTypes {
        static date: string;
        static month: string;
        static week: string;
        static types: string[];
        static types_$LI$(): string[];
    }
}
declare namespace input {
    class NumericInputTypes {
        static number: string;
        static range: string;
        static types: string[];
        static types_$LI$(): string[];
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
    constructor(name?: any, tag?: any);
    /**
     * Adds an event on the component
     *
     * @param {string} evt
     * The name of the event (click, dblclick, keyup etc)
     * @param {*} listener
     * The javascript function to be called back
     */
    on(evt: string, listener: EventListener): void;
    /**
     *
     * @return {Array} An array of custom events supported by the component<br>
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
     * @return {Array}
     */
    getStyleNames(): string[];
    /**
     *
     * @return {Array}
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
     * @param {Bound[]} lst
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
declare class CardLayout extends JSContainer {
    currentActive: string;
    currentIndex: number;
    constructor(name: string, tag: string);
    addItem(item: CardLayoutItem): CardLayout;
    getCurrentIndex(): number;
    getItem(index: number): CardLayoutItem;
    getIndex(name: string): number;
    next(...params: Object[]): CardLayoutItem;
    previous(...params: Object[]): CardLayoutItem;
    back(...params: Object[]): CardLayoutItem;
    first(...params: Object[]): CardLayoutItem;
    last(...params: Object[]): CardLayoutItem;
    getDefault(): string;
    activate(name: string, ...params: Object[]): void;
    /**
     *
     * @return {Array}
     */
    advancedEventTypes(): string[];
}
declare class CardLayoutItem extends JSContainer {
    constructor(name: string, tag: string);
    /**
     *
     * @return {Array}
     */
    advancedEventTypes(): string[];
}
declare class ExternalJavascript extends JSContainer {
    constructor(name: string);
    setSource(src: string): ExternalJavascript;
}
declare class ExternalStylesheet extends JSContainer implements api.Renderer<ExternalStylesheet> {
    static ORIGIN_ANONYMOUS: string;
    static ORIGIN_USE_CREDENTIALS: string;
    static MEDIA_DEFAULT: string;
    static MEDIA_ALL: string;
    static MEDIA_SCREEN: string;
    static MEDIA_PRINT: string;
    static MEDIA_SPEECH: string;
    constructor(name: string);
    setSource(src: string): ExternalStylesheet;
    setCrossOrigin(origin: string): ExternalStylesheet;
    setMedia(media: string): ExternalStylesheet;
    doRender$framework_components_ExternalStylesheet$jsweet_dom_HTMLElement(c: ExternalStylesheet, root: HTMLElement): void;
    /**
     *
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
    static invokeFunction(target: Object, __function: string, ...args: any[]): any;
}
declare namespace input {
    abstract class AbstractJSInput<T> extends JSContainer implements api.InputField<T> {
        validators: Array<api.Validator<T>>;
        constructor(name: string);
        addValidator(validator: api.Validator<T>): void;
        setSize(size: number): void;
        setPattern(pattern: string): void;
        setRequired(b: boolean): AbstractJSInput<T>;
        setDisabled(b: boolean): AbstractJSInput<T>;
        setReadOnly(b: boolean): AbstractJSInput<T>;
        toHtmlDateString(date: Date): string;
        getDoubleValue(): number;
        getStringValue(): string;
        getDateValue(): Date;
        getNativeInput(): HTMLInputElement;
        setDoubleValue(val: number): void;
        setStringValue(s: string): void;
        setDateValue(date: Date): void;
        getBinding(): string;
        setPlaceHolder(placeholder: string): AbstractJSInput<T>;
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
        static addError(msg: string, state: ValidityState, e: api.ValidationException): api.ValidationException;
        /**
         *
         */
        validate(): void;
        /**
         *
         * @return {Array}
         */
        advancedEventTypes(): string[];
        setBinding(binding: string): AbstractJSInput<T>;
        abstract setValue(val?: any): any;
        abstract getValue(): any;
    }
}
declare namespace input {
    class Form extends JSContainer {
        validationerrors: Object;
        constructor(name: string);
        /**
         *
         * @return {Array}
         */
        advancedEventTypes(): string[];
        isValid(): boolean;
        hasErrors(): boolean;
        getError(binding: string): api.ValidationException;
        getErrors(): Object;
        getField(binding: string): api.InputField<any>;
        validate(): boolean;
        setData(data: Object): void;
        getData(): Object;
        submit(): void;
    }
    namespace Form {
        class Form$0 implements util.ComponentUtil.ComponentVisitor {
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
        class Form$1 implements util.ComponentUtil.ComponentVisitor {
            __parent: any;
            /**
             *
             * @param {*} designable
             */
            doVisit(designable: api.Renderable): void;
            constructor(__parent: any);
        }
        class Form$2 implements util.ComponentUtil.ComponentVisitor {
            private data;
            __parent: any;
            /**
             *
             * @param {*} designable
             */
            doVisit(designable: api.Renderable): void;
            constructor(__parent: any, data: any);
        }
        class Form$3 implements util.ComponentUtil.ComponentVisitor {
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
    class JSImageInput extends JSContainer implements api.InputField<string> {
        image: JSContainer;
        upload: JSUpload;
        imageContainer: JSContainer;
        validators: Array<api.Validator<string>>;
        constructor(name: string);
        refreshUploadDir(): void;
        getImage(): JSContainer;
        setRequired(b: boolean): JSImageInput;
        setDisabled(b: boolean): JSImageInput;
        setReadOnly(b: boolean): JSImageInput;
        decorateImage(): void;
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
         * @return {string}
         */
        getBinding(): string;
        /**
         *
         * @param {string} binding
         * @return {*}
         */
        setBinding(binding: string): api.InputField<string>;
        /**
         *
         * @return {Array}
         */
        advancedEventTypes(): string[];
    }
    namespace JSImageInput {
        class JSImageInput$0 implements api.EventListener {
            __parent: any;
            /**
             *
             * @param {*} source
             * @param {Event} evt
             */
            performAction(source: api.Renderable, evt: Event): void;
            constructor(__parent: any);
        }
        class JSImageInput$1 implements api.EventListener {
            __parent: any;
            /**
             *
             * @param {*} source
             * @param {Event} evt
             */
            performAction(source: api.Renderable, evt: Event): void;
            constructor(__parent: any);
        }
        class JSImageInput$2 implements api.EventListener {
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
    class JSOption extends JSContainer {
        constructor(text: string, value: string);
        getValue(): string;
        setValue(value: string): void;
        getText(): string;
        setText(label: string): void;
        setSelected(b: boolean): void;
    }
}
declare namespace input {
    class JSSelect extends JSContainer implements api.InputField<any> {
        previousValue: string;
        validators: Array<api.Validator<any>>;
        data: Array<Object>;
        constructor(name: string);
        addValidator(validator: api.Validator<any>): void;
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
         * @return {Array}
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
        validators: Array<api.Validator<string>>;
        constructor(name: string);
        addValidator(validator: api.Validator<string>): void;
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
         * @return {Array}
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
declare class RestWebservice extends JSContainer {
    constructor(name?: any);
    /**
     *
     * @return {Array}
     */
    advancedEventTypes(): string[];
    isSet(prop: string): boolean;
    getAccepts(): string;
    setAccepts(accepts: string): void;
    setDataType(dataType: string): void;
    getDataType(): string;
    setContentType(contentType: string): void;
    getContentType(): string;
    getBoolean(prop: string): boolean;
    setAsync(b: boolean): void;
    getAsync(): boolean;
    setCache(b: boolean): void;
    getCache(): boolean;
    setCrossDomain(b: boolean): void;
    getCrossDomain(): boolean;
    setIfModified(b: boolean): void;
    getIfModified(): boolean;
    setProcessData(b: boolean): void;
    getProcessData(): boolean;
    setScriptCharset(charset: string): void;
    getScriptCharset(): string;
    setUsername(username: string): void;
    getUsername(): string;
    setMimeType(mimetype: string): void;
    getMimeType(): string;
    setPassword(password: string): void;
    getPassword(): string;
    setTraditional(b: boolean): void;
    getTraditional(): boolean;
    setTimeout(timeout: number): void;
    getTimeout(): number;
    setUrl(url: string): void;
    getUrl(): string;
    addHeader(key: string, value: string): void;
    getHeaders(): any;
    getData(): any;
    setData(data: any): void;
    setMethod(method: string): void;
    getMethod(): string;
    execute(): void;
}
declare class Row extends JSContainer {
    constructor(name: string);
}
declare namespace input {
    class JSAddressInput extends HTMLTemplateContainer implements api.InputField<Object> {
        address: Object;
        country: input.JSSelect;
        city: input.JSTextInput;
        postalCode: input.JSTextInput;
        state: input.JSTextInput;
        street: input.JSTextInput;
        constructor(name: string);
        getAddress(): Object;
        setAddress(address: Object): void;
        /**
         *
         * @return {Object}
         */
        getValue(): Object;
        setValue$jsweet_lang_Object(val: Object): void;
        /**
         *
         * @param {Object} val
         */
        setValue(val?: any): any;
        /**
         *
         */
        validate(): void;
        /**
         *
         * @return {string}
         */
        getBinding(): string;
        /**
         *
         * @param {string} binding
         * @return {*}
         */
        setBinding(binding: string): api.InputField<Object>;
        /**
         *
         * @param {boolean} b
         * @return {*}
         */
        setRequired(b: boolean): api.InputField<Object>;
    }
}
/**
 * Create a new instance of this component
 * @param {string} name The name of the component
 * @param {string} url The url where to submit uploaded file
 * @param {string} template
 * @class
 * @extends HTMLTemplateContainer
 * @author Rossaye Abdool Kureem
 */
declare class JSUpload extends HTMLTemplateContainer implements api.EventListener, api.InputField<Object> {
    label: JSContainer;
    input: JSContainer;
    uploader: FileUploader;
    required: boolean;
    constructor(name?: any, template?: any, url?: any);
    /**
     * Manually opens native dialog box to select file to upload
     */
    triggerUpload(): void;
    /**
     *
     * @return {Array}
     */
    advancedEventTypes(): string[];
    /**
     * Sets a label to this component
     * @param {string} label The label of the component
     */
    setLabel(label: string): void;
    /**
     * Sets the accepts mimetypes for this component
     * @param {string} accepts Mime types allowed to upload (e.g image/jpg, image/png, text/html etc)
     */
    setAccepts(accepts: string): void;
    /**
     *
     * @param {*} source
     * @param {Event} ev
     */
    performAction(source: api.Renderable, ev: Event): void;
    /**
     * Sets the server url where to submit file to uplaod
     * @param {string} url Url where to submit file to upload
     */
    setUrl(url: string): void;
    /**
     * Synonymous to setUrl
     * @param {string} url The url where to submit file to upload
     */
    setEndpoint(url: string): void;
    /**
     *
     * @return {Object}
     */
    getValue(): Object;
    setValue$jsweet_lang_Object(val: Object): void;
    /**
     *
     * @param {Object} val
     */
    setValue(val?: any): any;
    /**
     *
     */
    validate(): void;
    /**
     *
     * @return {string}
     */
    getBinding(): string;
    /**
     *
     * @param {string} binding
     * @return {*}
     */
    setBinding(binding: string): api.InputField<Object>;
    /**
     *
     * @param {boolean} b
     * @return {*}
     */
    setRequired(b: boolean): api.InputField<Object>;
    getUploader(): FileUploader;
    setUploader(uploader: FileUploader): void;
    getLabel(): JSContainer;
    getInput(): JSContainer;
    isRequired(): boolean;
}
declare namespace input {
    class JSCheckBox extends input.AbstractJSInput<boolean> {
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
    class JSDateInput extends input.AbstractJSInput<Date> {
        constructor(name: string);
        setType(type: string): JSDateInput;
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
    class JSNumberInput extends input.AbstractJSInput<number> {
        constructor(name: string);
        setType(type: string): JSNumberInput;
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
    class JSTextInput extends input.AbstractJSInput<string> implements api.Renderer<JSTextInput> {
        constructor(name: string);
        setMaxLength(length: number): void;
        setType(type: string): JSTextInput;
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
        doRender$framework_components_input_JSTextInput$jsweet_dom_HTMLElement(c: JSTextInput, root: HTMLElement): void;
        /**
         *
         * @param {input.JSTextInput} c
         * @param {HTMLElement} root
         */
        doRender(c?: any, root?: any): any;
    }
}
declare namespace input {
    class JSTimeInput extends input.AbstractJSInput<Date> {
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
    class RichTextEditor extends input.JSTextArea implements api.Renderer<RichTextEditor> {
        editor: Object;
        constructor(name: string);
        doRender$framework_components_input_RichTextEditor$jsweet_dom_HTMLElement(c: RichTextEditor, root: HTMLElement): void;
        /**
         *
         * @param {input.RichTextEditor} c
         * @param {HTMLElement} root
         */
        doRender(c?: any, root?: any): any;
        /**
         *
         * @return {string}
         */
        getValue(): string;
    }
}
declare namespace input {
    class JSRadio extends input.JSCheckBox {
        constructor(name: string);
    }
}
