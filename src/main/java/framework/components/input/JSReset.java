package framework.components.input;

import framework.components.api.InputType;

/**
 * Simple reset button to be placed inside a form tag<br><br>
 * 
 * @author Kureem Rossaye
 *
 */
public class JSReset extends JSButton{

	/**
	 * Creates a new instance of reset button with specified name and text
	 * @param name - name of the reset button
	 * @param text - text inside the reset button
	 */
	public JSReset(String name, String text) {
		super(name, text);
		setType(InputType.RESET);
	}

}
