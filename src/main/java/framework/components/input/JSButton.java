package framework.components.input;

import framework.components.JSContainer;
import framework.components.api.InputType;

/**
 * Simple Button to be placed inside a form<br>
 * 
 * @author Kureem Rossaye
 *
 */
public class JSButton extends JSContainer{

	/**
	 * Creates a new instance of the button with specified name and text
	 * @param name - name of the button
	 * @param text - text inside the button
	 */
	public JSButton(String name, String text) {
		super(name, "input");
		setHtml(text);
	}
	
	/**
	 * Sets the type of the button
	 * @param type - type of the button. Valid values are: InputType.RESET | InputType.BUTTON | InputType.SUBMIT
	 * @return - updated instance of this Button
	 */
	public JSButton setType(InputType type) {
		if(type != null) {
			if(type.getGroup() != "button") {
				throw new RuntimeException("only button types are allowed");
			}
			setAttribute("type", type.getValue());
		}else {
			throw new RuntimeException("cannot set null value for type attribute");
		}
		return this;
	}
	
	

}
