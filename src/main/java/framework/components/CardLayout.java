package framework.components;

import framework.components.api.Renderable;
import jsweet.dom.CustomEvent;
import jsweet.lang.Object;
 
/**
 * Simple card layout component<br>
 * Contains convenient methods to stack containers over other containers and
 * show one at a time.<br />
 * <code>
 * import framework.components.CardLayout; <br /> 
 * import framework.components.CardLayoutItem;<br /> 
 * import framework.components.JSContainer; <br /> 
 * import framework.components.api.EventListener; <br /> 
 * import framework.components.api.Renderable; <br /> 
 * import framework.components.input.JSInput; <br /> 
 * import framework.components.input.JSTextInput; <br /> 
 * import jsweet.dom.Event; <br /> 
 * import jsweet.lang.Object; <br /> 
 * public class boot { <br />     
 * &nbsp;&nbsp;public static void main(String[] args) {<br /> 
 * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;JSContainer application = new JSContainer("div");<br />
 * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;JSContainer titlei1 = new JSContainer("h1"); <br /> 
 * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;JSContainer titlei2 = new JSContainer("h1"); <br /> 
 * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CardLayout card = new CardLayout("ss", "div"); <br /> 
 * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CardLayoutItem item1 = new CardLayoutItem("item1","div"); <br />
 * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;item1.addChild(titlei1); <br /> 
 * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;item1.addEventListener(new EventListener() { <br /> 
 * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#64;Override <br /> 
 * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;public void performAction(Renderable source, Event evt) { <br /> 
 * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Object param = (Object)evt.$get("param"); <br /> 
 * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;titlei1.setHtml((String)param.$get("val")); <br /> 
 * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;} <br /> 
 * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}, "activate");<br /> 
 * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CardLayoutItem item2 = new CardLayoutItem("item2","div"); <br /> 
 * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;item2.addChild(titlei2); <br /> 
 * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;item2.addEventListener(new EventListener() { <br /> 
 * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#64;Override <br /> 
 * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;public void performAction(Renderable source, Event evt) { <br /> 
 * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Object param = (Object)evt.$get("param"); <br /> 
 * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;titlei2.setHtml((String)param.$get("val"));<br /> 
 * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br /> 
 * &nbsp;&nbsp;&nbsp;&nbsp;}, "activate"); <br /> 
 * &nbsp;&nbsp;&nbsp;&nbsp;card.addItem(item1).addItem(item2); <br />  <br /> 
 * &nbsp;&nbsp;&nbsp;&nbsp;JSContainer label1 = new JSContainer("label1").setHtml("Enter value to pass as param for card layout 1"); <br /> 
 * &nbsp;&nbsp;&nbsp;&nbsp;JSContainer label2 = new JSContainer("label2").setHtml("Enter value to pass as param for card layout 1");<br /> 
 * &nbsp;&nbsp;&nbsp;&nbsp;JSTextInput param1 = new JSTextInput("param1");<br /> 
 * &nbsp;&nbsp;&nbsp;&nbsp;JSTextInput param2 = new JSTextInput("param2"); <br /> 
 * &nbsp;&nbsp;&nbsp;&nbsp;Renderable link = new JSContainer("a").setAttribute("href", "javascript:void(0);").setHtml("Activate page 1");<br /> 
 * &nbsp;&nbsp;&nbsp;&nbsp;Renderable link2 = new JSContainer("a").setAttribute("href", "javascript:void(0);").setHtml("Activate page 2");  <br /> 
 * &nbsp;&nbsp;&nbsp;&nbsp;link.addEventListener(new EventListener() {  <br /> 
 * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#64;Override </br>
 * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;public void performAction(Renderable source, Event evt) { <br /> 
 * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;jsweet.lang.Object p = new Object(); <br /> 
 * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;String par = param1.getValue(); <br /> 
 * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;p.$set("val", par); <br /> 
 * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;card.activate("item1", p); <br /> 
 * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br /> 
 * &nbsp;&nbsp;&nbsp;&nbsp;}, "click");  <br /> 
 * &nbsp;&nbsp;&nbsp;&nbsp;link2.addEventListener(new EventListener() {  <br /> 
 * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#64;Override<br> 
 * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;public void performAction(Renderable source, Event evt) { <br /> 
 * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;jsweet.lang.Object p = new Object(); <br /> 
 * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;String par = param2.getValue(); <br /> 
 * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;p.$set("val", par); <br /> 
 * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;card.activate("item2", p); <br /> 
 * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;} <br /> 
 * &nbsp;&nbsp;&nbsp;&nbsp;}, "click");   <br /> 
 * &nbsp;&nbsp;&nbsp;&nbsp;application.addChild(card); <br /> 
 * &nbsp;&nbsp;&nbsp;&nbsp;application.addChild(label1); <br /> 
 * &nbsp;&nbsp;&nbsp;&nbsp;application.addChild(param1); <br /> 
 * &nbsp;&nbsp;&nbsp;&nbsp;application.addChild(label2); <br /> 
 * &nbsp;&nbsp;&nbsp;&nbsp;application.addChild(param2); <br /> 
 * &nbsp;&nbsp;&nbsp;&nbsp;application.addChild(link); <br /> 
 * &nbsp;&nbsp;&nbsp;&nbsp;application.addChild(link2);  <br /> 
 * &nbsp;&nbsp;&nbsp;&nbsp;application.render();  <br /> 
 *&nbsp;&nbsp;}  <br /> 
 *} </code>
 *     
 * 
 * @author Kureem Rossaye<br>
 *         kureem@gmail.com
 */
public class CardLayout extends JSContainer {

	private String currentActive = "";

	private double currentIndex = 0;

	/**
	 * Creates a new card layout container
	 * 
	 * @param name - The name of the container.
	 * @param tag  - The tag of the container
	 */
	public CardLayout(String name, String tag) {
		super(name, tag);
	}

	/**
	 * Adds a {@link CardLayoutItem} to this container.
	 * 
	 * @param item - The item to add
	 * @return - this
	 */
	public CardLayout addItem(CardLayoutItem item) {
		addChild(item);
		if (getChildren().length > 1) {
			item.setStyle("display", "none");
		}
		return this;
	}

	/**
	 * Adds {@link CardLayoutItem}s to this container.
	 * 
	 * @param items - The items to add
	 * @return - this
	 */
	public CardLayout addItems(CardLayoutItem... items) {
		for (CardLayoutItem item : items) {
			addItem(item);
		}
		return this;
	}

	/**
	 * 
	 * @return - The index of the currently active (visible) {@link CardLayoutItem}
	 *         of this container
	 */
	public double getCurrentIndex() {
		return currentIndex;
	}

	/**
	 * Search and return the {@link CardLayoutItem} having the specified index
	 * 
	 * @param index - The index of the {@link CardLayoutItem} searching for
	 * @return - The {@link CardLayoutItem} item having specified index
	 */
	public CardLayoutItem getItem(double index) {
		if (index < getChildren().length) {
			return (CardLayoutItem) getChildren().$get(index);
		} else {
			return null;
		}
	}

	/**
	 * Searches for the {@link CardLayoutItem} having specified name, and returns
	 * its index.
	 * 
	 * @param name - The name of {@link CardLayoutItem} searching for
	 * 
	 * @return - The index of the {@link CardLayoutItem} having name specified
	 */

	public double getIndex(String name) {
		double index = 0;
		for (Renderable child : getChildren()) {
			if (child.getName() == name) {
				return index;
			}
			index++;
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
	 * @param params - The payload to set to the next {@link CardLayoutItem} being
	 *               activated
	 * @return - The {@link CardLayoutItem} being activated.
	 */
	public CardLayoutItem next(Object... params) {
		if (currentIndex < (getChildren().length - 1)) {

			CardLayoutItem current = getItem(currentIndex);

			CustomEvent validateEvent = new CustomEvent("validate");
			validateEvent.$set("source", current);
			validateEvent.$set("valid", true);
			current.fireListener("validate", validateEvent);

			Boolean isValid = (Boolean) validateEvent.$get("valid");

			if (isValid) {
				currentIndex++;
				CardLayoutItem item = getItem(currentIndex);
				activate(item.getName(), params);
				CustomEvent nextEvent = new CustomEvent("next");
				nextEvent.$set("from", current);
				nextEvent.$set("to", item);
				nextEvent.$set("source", current);
				nextEvent.$set("dest", item);
				fireListener("next", nextEvent);
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
	 * @param params - The payload to set to the next {@link CardLayoutItem} being
	 *               activated
	 * @return - The {@link CardLayoutItem} being activated.
	 */
	public CardLayoutItem previous(Object... params) {
		if (currentIndex > 0) {
			CardLayoutItem current = getItem(currentIndex);
			currentIndex--;
			CardLayoutItem item = getItem(currentIndex);
			activate(item.getName(), params);
			CustomEvent previousEvent = new CustomEvent("previous");
			previousEvent.$set("from", current);
			previousEvent.$set("to", item);
			previousEvent.$set("source", current);
			previousEvent.$set("dest", item);
			fireListener("previous", previousEvent);
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
	 * @param params - The payload to set to the next {@link CardLayoutItem} being
	 *               activated
	 * @return - The {@link CardLayoutItem} being activated.
	 */
	public CardLayoutItem back(Object... params) {
		return previous(params);
	}

	/**
	 * Shows the first {@link CardLayoutItem} by passing the specified parameters in
	 * the event triggered when the method is called
	 * 
	 * @param params The parameters that are set in the event triggered when the
	 *               method is called
	 * 
	 * @return The current state of this component
	 */
	public CardLayoutItem first(Object... params) {
		if (currentIndex > 0) {
			CardLayoutItem current = getItem(currentIndex);
			currentIndex = 0;
			CardLayoutItem item = getItem(currentIndex);
			activate(item.getName(), params);

			activate(item.getName(), params);
			CustomEvent firstEvent = new CustomEvent("first");
			firstEvent.$set("from", current);
			firstEvent.$set("to", item);
			firstEvent.$set("source", current);
			firstEvent.$set("dest", item);
			fireListener("first", firstEvent);

			return item;
		} else {
			currentIndex = 0;
			CardLayoutItem item = getItem(currentIndex);
			return item;
		}
	}

	public CardLayoutItem last(Object... params) {
		if (currentIndex < (getChildren().length - 1)) {
			CardLayoutItem current = getItem(currentIndex);
			currentIndex = getChildren().length - 1;
			CardLayoutItem item = getItem(currentIndex);
			activate(item.getName(), params);

			CustomEvent lastEvent = new CustomEvent("last");
			lastEvent.$set("from", current);
			lastEvent.$set("to", item);
			lastEvent.$set("source", current);
			lastEvent.$set("dest", item);
			fireListener("last", lastEvent);

			return item;
		} else {
			currentIndex = getChildren().length - 1;
			CardLayoutItem item = getItem(currentIndex);
			// activate(item.getName(), params);
			return item;
		}
	}

	public String getDefault() {
		String def = getAttribute("default");
		if (def == null || def == "") {
			if (getChildren().length > 0) {
				return getChildren().$get(0).getName();
			} else {
				return null;
			}
		} else {
			return def;
		}
	}

	public void activate(String name, Object... params) {
		// boolean deact = !currentActive.equals(name);
		// double index = 0;
		if (name == currentActive && currentIndex >= 0) {
			return;
		}
		for (Renderable child : getChildren()) {
			if (child.getName() == name) {
				CustomEvent evt = new CustomEvent("activate");
				evt.$set("data", child);
				evt.$set("source", this);
				if (params != null) {
					if (params.length > 1) {
						evt.$set("params", params);
					} else if (params.length == 1) {
						evt.$set("params", params);
						evt.$set("param", params[0]);
					}
				}
				((JSContainer) child).fireListener("activate", evt);
				child.setStyle("display", "block");
			} else if (child.getName() == currentActive) {
				CustomEvent evt = new CustomEvent("deactivate");
				evt.$set("data", child);
				((JSContainer) child).fireListener("deactivate", evt);
				child.setStyle("display", "none");
			} else {
				child.setStyle("display", "none");
			}
		}
		this.currentActive = name;
		this.currentIndex = getIndex(currentActive);
	}

	@Override
	public String[] advancedEventTypes() {
		return new String[] { "first", "previous", "next", "last" };
	}

	public void refresh() {
		String def = getDefault();
		for (Renderable r : getChildren()) {
			if (r.getName() == def) {
				r.setStyle("display", null);
			} else {
				r.setStyle("display", "none");
			}
		}
	}

}
