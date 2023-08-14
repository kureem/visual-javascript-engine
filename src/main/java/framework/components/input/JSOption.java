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
package framework.components.input;

import framework.components.JSContainer;
import jsweet.dom.HTMLOptionElement;
/**
 * Represents an option tag inside select element
 * 
 * @author Kureem Rossaye
 *
 */
public class JSOption extends JSContainer {

	/**
	 * Creates a new instance of {@link JSOption} with the specified text and value
	 * @param text - The text to display for the option
	 * @param value - the value of the option
	 */
	public JSOption(String text, String value) {
		super("option");
		setAttribute("value", value);
		setHtml(text);
	}

	/**
	 * The value of the option
	 * @return - The value of the option
	 */
	public String getValue() {
		return getAttribute("value");
	}

	/**
	 * Sets the value of the option
	 * @param value - The value of the option
	 */
	public void setValue(String value) {
		setAttribute("value", value);
	}

	/**
	 * 
	 * @return - The text of the option
	 */
	public String getText() {
		return getHtml();
	}

	/**
	 * Sets the text or label of the option
	 * @param text - The text of the option
	 */
	public void setText(String text) {
		setHtml(text);
	}
	
	/**
	 * Mark or unmark this option as selected
	 * @param b - Whether to select or not select this option
	 */
	public void setSelected(boolean b){
		if (b) {
			setAttribute("selected", "true");
		}else{
			setAttribute("selected", null);
		}
	}
	
	/**
	 * 
	 * @return - Whether this option is selected or not
	 */
	public Boolean isSelected() {
		HTMLOptionElement opt = (HTMLOptionElement)getNative();
		if(opt != null) {
			return opt.selected;
		}else {
			String attr = getAttribute("selected");
			if(attr != null && attr == "true") {
				return true;
			}else {
				return false;
			}
		}
	}

}
