package framework.components.input;

import framework.components.api.InputType;

/**
 * Simple submit button to be placed inside a form tags<br><br>
 * @author Kureem Rossaye
 *
 */
public class JSSubmit extends JSButton{

	
	/**
	 * Instantiate a submit button with specified name and text
	 * @param name - name of button
	 * @param text - text of the button 
	 */
	public JSSubmit(String name, String text) {
		super(name, text);
		setType(InputType.SUBMIT);
	}

}
