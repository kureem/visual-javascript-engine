/*
 * Copyright 2002-2018 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package framework.components;

import static jsweet.dom.Globals.console;
import static jsweet.dom.Globals.document;

import framework.components.api.ContainerRenderer;
import framework.components.api.EventListener;
import framework.components.api.Renderable;
import framework.components.api.Renderer;
import jsweet.dom.Event;
import jsweet.dom.HTMLElement;
import jsweet.lang.Array;

/**
 * 
 * Most basic component built in with a default {@link Renderer}<br>
 * An instance of this component will render a simple tag in the browser. The
 * tag is specified in the constructor of the component or can be set via
 * {@link #setTag(String)}<br>
 * 
 * Example:<br>
 * <code>
 * 	var ctn = new framework.components.JSContainer('mycomponent', 'div');<br><br>
 * 	ctn.setStyle('width', '100px')<br>
 * &nbsp;&nbsp;&nbsp;.setStyle('height', '100px')<br>
 * &nbsp;&nbsp;&nbsp;.setStyle('background', 'red');<br><br>
 * 	ctn.on('click', function(e){<br>
 * &nbsp;&nbsp;&nbsp;alert('Hello world');<br>
 * 	})<br>
 * 
 * 	source.addChild(ctn);<br><br>
 * </code>
 * 
 * All other components in the framework are sub classes of this component
 * 
 * @author Rossaye Abdool Kureem Apr 10, 2018
 *
 */
@SuppressWarnings("unchecked")
public class JSContainer implements Renderable {

	public static int idCount = 0;

	private jsweet.lang.Object d = new jsweet.lang.Object();
	private static ContainerRenderer defaultRenderer = new ContainerRenderer();
	



	/**
	 * Constructs a new instance of this component
	 * 
	 * @param name
	 *            The name of the component
	 * @param tag
	 *            The html tag of the component
	 */
	public JSContainer(String name, String tag) {
		super();
		setTag(tag);
		setName(name);

	}

	/**
	 * Constructs a new instance of this component
	 * 
	 * @param tag
	 *            The tag of the component
	 */
	public JSContainer(String tag) {
		super();
		setTag(tag);
	}

	/**
	 * Adds an event on the component
	 * 
	 * @param evt
	 *            The name of the event (click, dblclick, keyup etc)
	 * @param listener
	 *            The javascript function to be called back
	 */
	public void on(String evt, jsweet.dom.EventListener listener) {
		addEventListener(new EventListener() {

			@Override
			public void performAction(Renderable source, Event evt) {
				evt.$set("source", source);
				listener.apply(evt);
			}
		}, evt);
	}
	
	
	
	

	/**
	 * 
	 * @return An array of custom events supported by the component<br>
	 *         This method is overridden by more complex components to provide
	 *         more advanced events mechanisms.
	 */
	public String[] advancedEventTypes() {
		return new String[] {};
	}

	/**
	 * Fires the {@link EventListener}s for the specified key passing the
	 * specified payload
	 * 
	 * @param key
	 *            The event to execute
	 * @param evt
	 *            The payload to transmit when executing the event.
	 */
	public void fireListener(String key, Event evt) {
		console.log("firing:" + key + " on " + getName());
		final Array<EventListener> listeners = (Array<EventListener>) getListeners().$get(key);
		if (listeners != null && listeners.length > 0) {
			for (EventListener l : listeners) {

				l.performAction(this, evt);
			}
		}

	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see framework.Renderable#hasListenerOfType(java.lang.String)
	 */
	public boolean hasListenerOfType(String type) {
		final Array<EventListener> listeners = (Array<EventListener>) getListeners().$get(type);
		if (listeners != null && listeners.length > 0) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * 
	 * @return An {@link jsweet.lang.Object} to provide a scope for this
	 *         environement
	 */
	public jsweet.lang.Object getScope() {
		return null;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see framework.Renderable#getChild(java.lang.String)
	 */
	public Renderable getChild(String name) {
		for (Renderable child : getChildren()) {
			if (child.getName().equals(name)) {
				return child;
			}
		}
		return null;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see framework.Renderable#removeChild(framework.Renderable)
	 */
	public Renderable removeChild(final Renderable r) {
		Array<Renderable> children = getChildren();
		d.$set("children", children.filter((ctn, inde, lst) -> {
			return !ctn.equals(r);

		}));

		setRendered(false);
		return this;
	}
	
	
	public Renderable addCSSRule(String rule) {
		Array<String> rules = (Array<String>)d.$get("rules");
		if(rules == null) {
			rules = new Array<String>();
			d.$set("rules", rules);
		}
		if(rules.indexOf(rule) <0) {
			rules.push(rule);
			d.$set("rules", rules);
		}
		
		return this;
	}
	
	/**
	 * 
	 */
	public Array<String> getCSSRules(){
		if(d.hasOwnProperty("rules")) {
			return (Array<String>)d.$get("rules");
		}else {
			d.$set("rules", new Array<>());
			return getCSSRules();
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see framework.Renderable#clearChildren()
	 */
	public Renderable clearChildren() {
		d.$set("children", new Array<>());
		return this;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see framework.Renderable#getChangedAttributes()
	 */
	@Override
	public Array<String> getChangedAttributes() {
		if (d.$get("changedAttributes") != null) {
			Array<String> changed = (Array<String>) d.$get("changedAttributes");
			return changed;
		} else {
			d.$set("changedAttributes", new Array<>());
			return getChangedAttributes();
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see framework.Renderable#getNative()
	 */
	public HTMLElement getNative() {
		HTMLElement elem = document.getElementById(getId());
		if (elem != null) {
			return elem;
		} else {
			return null;
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see framework.Renderable#getChangedStyles()
	 */
	@Override
	public Array<String> getChangedStyles() {
		if (d.$get("changedStyles") != null) {
			Array<String> changed = (Array<String>) d.$get("changedStyles");
			return changed;
		} else {
			d.$set("changedStyles", new Array<>());
			return getChangedStyles();
		}
	}

	/**
	 * Flushes any data cleaning this component after it has been rendered on
	 * the browser. This method is used internally by the engine
	 * 
	 * @param s
	 *            A secret value know by the implementor of the framework. This
	 *            is to prevent any end user from invoking this method since it
	 *            is a public exposed method
	 */
	public void flush(String s) {
		if (s.equals("a28n12l10")) {
			d.$delete("changedAttributes");
			d.$delete("changedStyles");
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see framework.Renderable#getRenderers()
	 */
	@Override
	public Array<Renderer<? extends Renderable>> getRenderers() {

		Array<Renderer<? extends Renderable>> arr = (Array<Renderer<? extends Renderable>>) d.$get("renderers");
		if (arr != null) {
			return arr;
		} else {
			return new Array<Renderer<? extends Renderable>>();
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see framework.Renderable#addRenderer(framework.renderer.Renderer)
	 */
	@Override
	public JSContainer addRenderer(Renderer<? extends Renderable> renderer) {
		Array<Renderer<? extends Renderable>> arr = (Array<Renderer<? extends Renderable>>) d.$get("renderers");
		if (arr == null) {
			arr = new Array<Renderer<? extends Renderable>>();
			d.$set("renderers", arr);
		}
		arr.push(renderer);
		d.$set("renderers", arr);
		return this;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see framework.Renderable#getId()
	 */
	@Override
	public String getId() {
		jsweet.lang.Object custom = (jsweet.lang.Object)getCustomProperties();
		
		if(custom != null){
			if(custom.hasOwnProperty("id")){
				return (String)custom.$get("id");
			}
		}
		String id = (String) d.$get("id");
		if (id == null) {
			id = uid();
			d.$set("id", id);
		}

		return id;
	}

	/**
	 * Generates a unique id for this component
	 * 
	 * @return A unique id
	 */
	protected String uid() {

		idCount++;
		return idCount + "";
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see framework.Renderable#addClass(java.lang.String)
	 */
	@Override
	public JSContainer addClass(String styleClass) {
		String styles = getAttribute("class");
		if (styles == null) {
			styles = "";
		}
		String[] aStyles = styles.split(" ");
		String[] toAdds = styleClass.split(" ");

		String res = "";
		for (String toAdd : toAdds) {
			toAdd = toAdd.trim();
			if (toAdd.length() > 0) {
				boolean add = true;
				for (String style : aStyles) {
					style = style.trim();
					if (style.length() > 0) {
						if (style.trim().equals(toAdd)) {
							add = false;
						}
					}
				}
				if (add) {
					res = res + " " + toAdd;
				}
			}
		}

		res = res.trim();

		setAttribute("class", (styles.trim() + " " + res).trim());

		return this;
	}

	/*
	 * (non-Javadoc)
	 * @see framework.components.Renderable#hasClass(java.lang.String)
	 */
	public boolean hasClass(String cls) {
		if (cls == null) {
			return false;
		}

		cls = cls.trim();

		if (cls == "") {
			return false;
		}

		if (cls.indexOf(" ") >= 0) {
			throw new jsweet.lang.Error(
					"Cannot check with multiple classes. You should probably check with each class one by one");
		}

		String styles = getAttribute("class");
		if (styles == null) {
			return false;
		}
		String[] aStyles = styles.split(" ");
		for (String style : aStyles) {
			style = style.trim();
			if (style != "") {
				if (style == cls) {
					return true;
				}
			}
		}

		return false;

	}
	
	
	/*
	 * (non-Javadoc)
	 * @see framework.components.Renderable#toggleClass(java.lang.String)
	 */
	public Renderable toggleClass(String cls){
		if(hasClass(cls)){
			removeClass(cls);
		}else{
			addClass(cls);
		}
		return this;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see framework.Renderable#removeClass(java.lang.String)
	 */
	@Override
	public JSContainer removeClass(String cls) {
		if(cls != null && cls.trim() != ""){
			String[] toremove = cls.split(" ");
			for(String s : toremove){
				removeSingleClass(s);
			}
		}
		
		return this;
	}
	
	
	
	public JSContainer removeSingleClass(String cls){
		
		String cl = getAttribute("class");
		if (cl != null && cl.length() > 0) {
			
			String[] classes = cl.split(" ");
			String result = "";
			for(String scl : classes){
				if(scl != cls){
					if(result == ""){
						result = scl;
					}else{
						result = result + " " + scl;
					}
				}
			}
			
			//cl = cl.replace(cls, "");

			setAttribute("class", result);
		}
		return this;
		
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see framework.Renderable#addChild(framework.JSContainer)
	 */
	@Override
	public Renderable addChild(Renderable container) {
		if (container == null) {
			throw new jsweet.lang.Error("addChild(null): Child component cannot be null.");
		}
		
		if(container.isValidParent(this)) {
			((JSContainer) container).d.$set("parent", this);
			getChildren().push(container);
		}else {
			throw new jsweet.lang.Error("Cannot add this container here because this is not a valid a parent");
		}
		return this;
	}
	
	
	
	public JSContainer addChild(String name, String tag) {
		JSContainer child = new JSContainer(name, tag);
		addChild(child);
		return child;
	}
	
	public JSContainer addChild(String name, String tag, String cls) {
		JSContainer child = new JSContainer(name, tag);
		child.addClass(cls);
		addChild(child);
		return child;
	}
	
	
	public Boolean isValidParent(Renderable parent) {
		return true;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see framework.Renderable#addChildAt(double, framework.JSContainer)
	 */
	@Override
	public Renderable addChildAt(double index, Renderable child) {
		((JSContainer) child).d.$set("parent", this);
		Array<Renderable> children = new Array<Renderable>();
		double i = 0;
		boolean added = false;
		for (Renderable c : getChildren()) {
			if (i == index) {
				children.push(child);
				added = true;
			}
			children.push(c);
			i++;
		}
		if(!added) {
			children.push(child);
		}
		((JSContainer) child).d.$set("parent", this);
		d.$set("children", children);
		return this;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see framework.Renderable#setVisible(boolean)
	 */
	@Override
	public JSContainer setVisible(boolean b) {
		if (!b) {
			addClass("slds-hidden");
		} else {
			removeClass("slds-hidden");
		}
		return this;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see framework.Renderable#addEventListener(framework.EventListener,
	 * java.lang.String)
	 */
	@Override
	public JSContainer addEventListener(EventListener listener, String type) {
		jsweet.lang.Object listeners = getListeners();
		if (listeners == null) {
			listeners = new jsweet.lang.Object();
			d.$set("listeners", listeners);
		}
		if (!listeners.hasOwnProperty(type)) {
			listeners.$set(type, new Array<>());

		}

		Array<EventListener> current = (Array<EventListener>) listeners.$get(type);
		if (current.lastIndexOf(listener) < 0) {
			((Array<EventListener>) listeners.$get(type)).push(listener);
		} else {
			console.log("trap  coq");
		}

		return this;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see framework.Renderable#getTag()
	 */
	@Override
	public String getTag() {
		return getString("tag");
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see framework.Renderable#setTag(java.lang.String)
	 */
	@Override
	public JSContainer setTag(String tag) {
		setString("tag", tag);
		setRendered(false);
		return this;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see framework.Renderable#setStyle(java.lang.String, java.lang.String)
	 */
	@Override
	public JSContainer setStyle(String key, String value) {
		getChangedStyles().push(key);
		if (value != null) {
			if (d.$get("styles") == null) {
				d.$set("styles", new jsweet.lang.Object());
			}
			((jsweet.lang.Object) d.$get("styles")).$set(key, value);
		} else {
			if (d.$get("styles") != null) {
				((jsweet.lang.Object) d.$get("styles")).$delete(key);
				setRendered(false);
			}
		}
		return this;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see framework.Renderable#getStyle(java.lang.String)
	 */
	@Override
	public String getStyle(String key) {
		if (d.$get("styles") != null) {

			return (String) ((jsweet.lang.Object) d.$get("styles")).$get(key);
		}
		return null;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see framework.Renderable#setAttribute(java.lang.String,
	 * java.lang.String)
	 */
	@Override
	public JSContainer setAttribute(String key, String value) {
		getChangedAttributes().push(key);
		//String oldValue = getAttribute(key);
		
		if (value != null) {
			if (d.$get("attributes") == null) {
				d.$set("attributes", new jsweet.lang.Object());
			}
			((jsweet.lang.Object) d.$get("attributes")).$set(key, value);
		} else {
			if (d.$get("attributes") != null)
				((jsweet.lang.Object) d.$get("attributes")).$delete(key);
		}
		/*
		 * if(oldValue != value) { CustomEvent attributeChangedEvent = new
		 * CustomEvent("attributeChanged"); attributeChangedEvent.$set("oldValue",
		 * oldValue); attributeChangedEvent.$set("value", value);
		 * 
		 * fireListener("attributeChanged", attributeChangedEvent); }
		 */
		return this;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see framework.Renderable#getAttribute(java.lang.String)
	 */
	@Override
	public String getAttribute(String key) {
		if (d.$get("attributes") != null) {

			return (String) ((jsweet.lang.Object) d.$get("attributes")).$get(key);
		}
		return null;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see framework.Renderable#getName()
	 */
	@Override
	public String getName() {
		String name = getAttribute("name");
		if (name == null) {
			return "";
		}

		return name;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see framework.Renderable#setName(java.lang.String)
	 */
	@Override
	public void setName(String name) {
		setAttribute("name", name);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see framework.Renderable#getParent()
	 */
	@Override
	public JSContainer getParent() {
		return (JSContainer) d.$get("parent");
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see framework.Renderable#getChildren()
	 */
	@Override
	public Array<Renderable> getChildren() {

		Array<Renderable> children = (Array<Renderable>) d.$get("children");
		if (children != null) {
			return (Array<Renderable>) children;
		} else {
			d.$set("children", new Array<>());
			return getChildren();
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see framework.Renderable#getStyleNames()
	 */
	@Override
	public String[] getStyleNames() {
		jsweet.lang.Object styles = (jsweet.lang.Object) d.$get("styles");
		if (styles != null) {
			return jsweet.lang.Object.keys(styles);
		}
		return new String[] {};
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see framework.Renderable#getAttributeNames()
	 */
	@Override
	public String[] getAttributeNames() {
		jsweet.lang.Object styles = (jsweet.lang.Object) d.$get("attributes");
		if (styles != null) {
			return jsweet.lang.Object.keys(styles);
		}
		return new String[] {};
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see framework.Renderable#getHtml()
	 */
	@Override
	public String getHtml() {
		String html = getString("html");
		if (html == null) {
			return "";
		}
		return html;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see framework.Renderable#setHtml(java.lang.String)
	 */
	@Override
	public JSContainer setHtml(String h) {
		setString("html", h);
		setRendered(false);
		return this;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see framework.Renderable#isRendered()
	 */
	@Override
	public boolean isRendered() {
		return (Boolean) d.$get("rendered");
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see framework.Renderable#setRendered(boolean)
	 */
	@Override
	public Renderable setRendered(boolean b) {
		d.$set("rendered", b);
		if (!b) {
			for (Renderable child : getChildren()) {
				child.setRendered(b);
			}
		}

		return this;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see framework.Renderable#getListeners()
	 */
	@Override
	public jsweet.lang.Object getListeners() {

		jsweet.lang.Object l = (jsweet.lang.Object) d.$get("listeners");
		if (l == null) {
			d.$set("listeners", new jsweet.lang.Object());
			return getListeners();
		}
		return l;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see framework.Renderable#render()
	 */
	@Override
	public void render() {
		if (getParent() == null)
			render(null);
		else
			render(document.getElementById(getParent().getId()));

	}

	/**
	 * This method is invoked by the {@link Renderer} after the component is
	 * rendered on the browser. <br>
	 * This provides a hook for further processing after the component has been
	 * rendered
	 * 
	 * @param root
	 *            The actual {@link HTMLElement} of the root of the application
	 *            in which this component is found
	 */
	public void postRender(HTMLElement root) {

	}

	/**
	 * Unitility method to check if the specified object is present in the
	 * specified array
	 * 
	 * @param lst
	 *            The array to check if object is present
	 * @param o
	 *            The object to check if present
	 * @return Whether is present or not
	 */
	protected boolean contains(Array<?> lst, Object o) {
		for (Object oo : lst) {
			if (oo.equals(o)) {
				return true;
			}
		}
		return false;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see framework.Renderable#render(jsweet.dom.HTMLElement)
	 */
	@SuppressWarnings({ "rawtypes" })
	@Override
	public void render(HTMLElement parent) {

		Array<Renderer<? extends Renderable>> renderers = getRenderers();
		if (renderers.length == 0) {
			renderers.push(defaultRenderer);
		}

		if (!contains(renderers, defaultRenderer)) {

			Array<Renderer<? extends Renderable>> tmp = new Array<Renderer<? extends Renderable>>();
			tmp.push(defaultRenderer);
			for (Renderer<? extends Renderable> r : renderers) {
				tmp.push(r);
			}
			renderers = tmp;
		}
		for (Renderer renderer : renderers)
			renderer.doRender(this, parent);

		for (Renderable child : getChildren()) {
			child.render();
		}

		setRendered(true);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see framework.Renderable#getUserData()
	 */
	@Override
	public Object getCustomProperties() {
		return d.$get("data");
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see framework.Renderable#setUserData(java.lang.Object)
	 */
	@Override
	public void setCustomProperties(Object data) {

		// d.$set("data", data);
		jsweet.lang.Object previous = (jsweet.lang.Object) d.$get("data");
		if (previous instanceof Array) {
			Array<jsweet.lang.Object> arData = (Array<jsweet.lang.Object>) previous;
			for (jsweet.lang.Object line : arData) {
				String value = (String) line.$get("value");
				setAttribute(value, null);
			}
		} else {
			if (previous != null) {
				for (String key : jsweet.lang.Object.keys(previous)) {
					setAttribute(key, null);
				}
			}
		}
		d.$set("data", data);
		if (data != null) {
			if (data instanceof Array) {
				Array<jsweet.lang.Object> arData = (Array<jsweet.lang.Object>) data;
				for (jsweet.lang.Object line : arData) {
					String text = (String) line.$get("text");
					String value = (String) line.$get("value");
					setAttribute(value, text);
				}
			} else {
				for (String key : jsweet.lang.Object.keys(data)) {
					setAttribute(key, (String) ((jsweet.lang.Object) data).$get(key));
				}
			}
		}
	}

	/**
	 * Finds an ancestor that contains the specified class
	 * 
	 * @param cls
	 *            The class to check
	 * @return The ancestor that contains the specified class
	 */
	public <T extends Renderable> T getAncestorWithClass(String cls) {
		JSContainer parent = getParent();
		if (parent == null) {
			return null;
		}
		String clsss = parent.getAttribute("class");
		if (clsss != null) {
			for (String s : parent.getAttribute("class").split(" ")) {
				if (s.trim().equals(cls))
					return (T) parent;
			}
		}

		return ((JSContainer) parent).getAncestorWithClass(cls);

	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see framework.Renderable#getAncestorById(java.lang.String)
	 */
	@Override
	public JSContainer getAncestorById(String id) {
		JSContainer parent = getParent();
		if (getId().equals(id))
			return (JSContainer) this;

		if (parent == null) {
			return null;
		}

		return parent.getAncestorById(id);

	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see framework.Renderable#getAncestorByName(java.lang.String)
	 */
	@Override
	public JSContainer getAncestorByName(String name) {
		if (getName().equals(name))
			return this;

		JSContainer parent = getParent();
		if (parent == null) {
			return null;
		}

		return parent.getAncestorByName(name);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see framework.Renderable#getRoot()
	 */
	@Override
	public JSContainer getRoot() {
		JSContainer parent = getParent();
		if (parent == null) {
			return this;
		} else {
			return parent.getRoot();
		}
	}

	private void setString(String key, String value) {
		d.$set(key, value);
	}

	private String getString(String key) {
		return (String) d.$get(key);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see framework.Renderable#setUserData(java.lang.Object)
	 */
	@Override
	public Renderable setUserData(Object data) {
		d.$set("userData", data);
		return this;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see framework.Renderable#getUserData()
	 */
	@Override
	public Object getUserData() {
		return d.$get("userData");
	}

}
