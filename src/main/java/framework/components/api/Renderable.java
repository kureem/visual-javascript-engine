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
package framework.components.api;

import jsweet.dom.HTMLElement;
import jsweet.lang.Array;

/**
 * Base interface that defines contract methods available on any component that
 * can be rendered on a web page.
 * 
 * @author Rossaye Abdool Kureem Apr 10, 2018
 *
 */
public interface Renderable {
	
	
	/**
	 * Checks if it is a valid parent. i.e This renderable can be added to the specified parent
	 * @param parent The parent to check if it can be added to 
	 * @return is valid or not
	 */
	public Boolean isValidParent(Renderable parent);

	/**
	 * return Array of attributes changed during any action<br>
	 * This is used internally by the default rendering engine for optimization
	 * purposes.
	 * 
	 * @return Array of attributes changed during any action<br>
	 * 
	 */
	public Array<String> getChangedAttributes();

	/**
	 * return Array of styles changed or removed during any action<br>
	 * This is used internally by the default rendering engine for optimization
	 * purposes
	 * 
	 * @return Array of styles changed or removed during any action<br>
	 * 
	 */
	public Array<String> getChangedStyles();

	/**
	 * return The native Html Node managed by this component.<br>
	 * can return null of component has never been rendered before.
	 * 
	 * @return The native Html Node managed by this component.<br>
	 * 
	 */
	public HTMLElement getNative();

	/**
	 * return First child with the specified name
	 * 
	 * @param name
	 *            Name of the Renderable to find
	 * @return First child with the specified name
	 */
	public Renderable getChild(String name);

	/**
	 * return The Renderable to remove
	 * 
	 * @param r
	 *            renderable to remove
	 * @return The Renderable to remove
	 */
	public Renderable removeChild(Renderable r);

	/**
	 * Removes all children from this Rendereable<br>
	 * This will not be reflected on the page yet.<br>
	 * Need to call the method setRendered(false) to allow changes to appear on web
	 * page
	 * 
	 * @return The current renderable with all children removed
	 */
	public Renderable clearChildren();

	/**
	 * return List of Renders used to render this component
	 * 
	 * @return List of Renders used to render this component
	 */
	public Array<Renderer<? extends Renderable>> getRenderers();

	/**
	 * Adds a rendered to the list of {@link Renderer} used to render this
	 * component.
	 * 
	 * @param renderer
	 *            {@link Renderer} to add to this component
	 * @return This current {@link Renderable}
	 */
	public Renderable addRenderer(Renderer<? extends Renderable> renderer);

	/**
	 * return The id of the Renderable.<br>
	 * Although it is possible to override this method and manage the id of this
	 * component, it is recommended that you allow the engine to manage it for you
	 * to ensure uniqueness of the id.
	 * 
	 * @return The id of the Renderable.
	 * 
	 */
	public String getId();


	/**
	 * Adds a style class to the {@link Renderable}
	 * 
	 * @param styleClass
	 *            The style class to add
	 * @return The current {@link Renderable}
	 */
	public Renderable addClass(String styleClass);
	
	/**
	 * Checks if the specified style class is present on this component.<br>
	 * Can only check single class. Will throw an error if trying to check multiple classes at once<br>
	 * E.g.<br>
	 * <b><u>Correct:</u></b><br>
	 * <code>
	 * 	r.hasClass("myclass")
	 * </code>
	 * <br><br>
	 * <b><u>Error:</u></b><br>
	 * <code>
	 * r.hasClass("myclass1 myclass2")<br>
	 * </code>
	 * @param styleClass The class to check if present
	 * @return Whether the specified styleclass is present or not
	 */
	public boolean hasClass(String styleClass);
	
	
	/**
	 * Will toggle the specified class on the component. i.e. If the specified styleclass is present, it will remove it, and if it is not present, it will add it<br>
	 * Note that this method internally uses {@link #hasClass(String)} to check if styleclass is present. This means that is works only on single class. Cannot toggle multiple classes at once.
	 * @param styleClass The style class
	 * @return The update state of the current component
	 */
	public Renderable toggleClass(String styleClass);

	/**
	 * Removes the specified class from the component
	 * 
	 * @param cls
	 *            The style class to remove
	 * @return The current {@link Renderable}
	 */
	public Renderable removeClass(String cls);

	/**
	 * Adds a child to this {@link Renderable}
	 * 
	 * @param container
	 *            The {@link Renderable} to add
	 * @return The current {@link Renderable}
	 */
	public Renderable addChild(Renderable container);

	/**
	 * Adds a child {@link Renderable} at the specified position in the child list
	 * 
	 * @param index
	 *            Position in the child list
	 * @param child
	 *            the child to add
	 * @return The current {@link Renderable}
	 */
	public Renderable addChildAt(double index, Renderable child);

	/**
	 * Show / hide the component
	 * 
	 * @param b
	 *            to show or hide the component
	 * @return The current {@link Renderable}
	 */
	public Renderable setVisible(boolean b);

	/**
	 * Adds an {@link EventListener} to this component
	 * 
	 * @param listener
	 *            Implementation of the event listner
	 * @param type
	 *            Type of event. e.g click, dblclick, keyup, keydown etc etc.
	 * @return The current {@link Renderable}
	 */
	public Renderable addEventListener(EventListener listener, String type);

	/**
	 * 
	 * @return The html tag of the renderable
	 */
	public String getTag();

	/**
	 * Sets the html tag of the {@link Renderable}
	 * 
	 * @param tag
	 *            Sets the html tag of the {@link Renderable}
	 * @return The current {@link Renderable}
	 */
	public Renderable setTag(String tag);

	/**
	 * Sets a style to the {@link Renderable}
	 * 
	 * @param name
	 *            name of style
	 * @param value
	 *            value of style
	 * @return The current {@link Renderable}
	 */
	public Renderable setStyle(String name, String value);

	/**
	 * return The style for the specified name
	 * 
	 * @param name
	 *            the style name
	 * @return The style for the specified name
	 */
	public String getStyle(String name);

	/**
	 * Sets an attribute to the {@link Renderable}
	 * 
	 * @param name
	 *            name of attribute
	 * @param value
	 *            value of attribute
	 * @return The current {@link Renderable}
	 */
	public Renderable setAttribute(String name, String value);

	/**
	 * return The attribute value for the specified name
	 * 
	 * @param name
	 *            Name of the attribute
	 * @return The attribute value for the specified name
	 */
	public String getAttribute(String name);

	/**
	 * return Name of {@link Renderable}
	 * 
	 * @return Name of {@link Renderable}
	 */
	public String getName();

	/**
	 * Sets the name of the {@link Renderable}
	 * 
	 * @param name
	 *            Name of {@link Renderable}
	 */
	public void setName(String name);

	/**
	 * return Parent of {@link Renderable}
	 * 
	 * @return Parent of {@link Renderable} Will return null of has not been added
	 *         in any {@link Renderable}. <br>
	 * 		e.g Will certainly return null of this method is called in the
	 *         constructor
	 */
	public Renderable getParent();

	/**
	 * return Array of Children added to this {@link Renderable}
	 * 
	 * @return Array of Children added to this {@link Renderable}
	 */
	public Array<Renderable> getChildren();

	/**
	 * return Array of style names set to this {@link Renderable}
	 * 
	 * @return Array of style names set to this {@link Renderable}
	 */
	public String[] getStyleNames();

	/**
	 * return Array of attributes set to this {@link Renderable}
	 * 
	 * @return Array of attributes set to this {@link Renderable}
	 */
	public String[] getAttributeNames();

	/**
	 * return Html set to this {@link Renderable}
	 * 
	 * @return Html set to this {@link Renderable}
	 */
	public String getHtml();

	/**
	 * Sets the html for this {@link Renderable}
	 * 
	 * @param html
	 *            Html to set to this {@link Renderable}
	 * @return The current {@link Renderable}
	 */
	public Renderable setHtml(String html);

	/**
	 * return Whether this {@link Renderable} has been rendered or not
	 * 
	 * @return Whether this {@link Renderable} has been rendered or not
	 */
	public boolean isRendered();

	/**
	 * Mark this {@link Renderable} as rendered
	 * 
	 * @param b
	 *            Boolean to specify if is rendered or not
	 * @return The current {@link Renderable}
	 */
	public Renderable setRendered(boolean b);

	/**
	 * 
	 * @return {@link EventListener} added to this component
	 */
	public jsweet.lang.Object getListeners();

	/**
	 * render this component. Letting the engine decide the best place to append
	 * this {@link Renderable}
	 */
	public void render();

	/**
	 * Render this component by appending it to the specified html element
	 * 
	 * @param root
	 *            The html element to append the current {@link Renderable}
	 */
	public void render(HTMLElement root);

	/**
	 * return User arbitrary data set to this {@link Renderable}
	 * 
	 * @return User arbitrary data set to this {@link Renderable}
	 */
	public Object getCustomProperties();

	/**
	 * Sets an arbitrary attributes to this {@link Renderable}
	 * 
	 * @param data
	 *            The arbitrary data to set to this {@link Renderable}
	 */
	public void setCustomProperties(Object data);

	/**
	 * Sets an arbitrary attributes to this {@link Renderable}
	 * 
	 * @param data
	 *            The arbitrary data to set to this {@link Renderable}
	 * @return The current instance of {@link Renderable}
	 */
	public Renderable setUserData(Object data);

	/**
	 * 
	 * @return The userdata of this component
	 */
	public Object getUserData();
	
	/**
	 * Search first ancestor with the specified class name
	 * @param <T> The first ancestor with the specified class name
	 * @param cls The specified class name
	 * @return The first ancestor with the specified class name
	 */
	public <T extends Renderable> T getAncestorWithClass(String cls);

	/**
	 * Search for an ancestor {@link Renderable} with the specified id
	 * 
	 * @param id
	 *            the id to search
	 * @return Ancestor {@link Renderable} with the specified Id
	 */
	public Renderable getAncestorById(String id);

	/**
	 * return Ancestor {@link Renderable} with the specified name
	 * 
	 * @param name
	 *            The name of the ancestor to search for.
	 * @return Ancestor {@link Renderable} with the specified name
	 */
	public Renderable getAncestorByName(String name);

	/**
	 * return The root {@link Renderable} for this application
	 * 
	 * @return The root {@link Renderable} for this application
	 */
	public Renderable getRoot();

	/**
	 * Checks if this {@link Renderable} has a listener of the specified type
	 * 
	 * @param type
	 *            The type of listener to check
	 * @return whether or not has listener of this type
	 */
	public boolean hasListenerOfType(String type);
	
	
	
	public void flush(String secret);
	
	
	/**
	 * Add a stylesheet rule to be used with this component
	 * @param rule
	 * @return The current renderable
	 */
	public Renderable addCSSRule(String rule);
	
	
	/**
	 * returns all stylesheet rules associated with this component
	 * @return All stylesheet rules
	 */
	public Array<String> getCSSRules();

}