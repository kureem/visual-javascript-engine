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
import framework.components.api.InputField;
import framework.components.api.ValidationException;
import jsweet.dom.CustomEvent;
import jsweet.dom.HTMLElement;
import jsweet.dom.HTMLTextAreaElement;

public class JSTextArea extends JSContainer implements InputField<String>{
	
	public JSTextArea(String name) {
		super(name, "textarea");
	}
	
	public JSTextArea setRequired(boolean b){
		if(b){
			setAttribute("required", "true");
		}else
			setAttribute("required", null);
		return this;
	}

	public JSTextArea setDisabled(boolean b) {
		if (b) {
			setAttribute("disabled", "true");
		} else {
			setAttribute("disabled", null);
		}
		return this;
	}

	@Override
	public String getValue() {
		HTMLTextAreaElement elem = (HTMLTextAreaElement)getNative();
		if(elem != null){
			return elem.value;
		}
		return getHtml();
	}

	@Override
	public void setValue(String val) {
		HTMLTextAreaElement elem = (HTMLTextAreaElement)getNative();
		if(elem != null){
			elem.value = val;
		}
		setHtml(val);
	}
	
	

	@Override
	public void validate() throws ValidationException {
		boolean valid = true;
		ValidationException e = new ValidationException();
		HTMLElement nat = getNative();
		if (nat != null) {
			HTMLTextAreaElement el = (HTMLTextAreaElement) nat;
			valid =el.checkValidity();
			if(!valid){
				ValidationException.throwError(el.validationMessage, el.validity);
			}
		}
				
		CustomEvent validate = new CustomEvent("validate");
		validate.$set("errors", e.errors);
		validate.$set("valid", valid);
		validate.$set("source", this);
		fireListener("validate", validate);
		if (!valid) {
			throw e;
		}
		
	}
	
	@Override
	public String[] advancedEventTypes() {
		return new String[]{"validate"};
	}

	public JSTextArea setReadOnly(boolean b) {
		if (b) {
			setAttribute("readonly", "true");
		} else {
			setAttribute("readonly", null);
		}
		return this;
	}

	
	public String getBinding(){
		return getAttribute("binding");
	}


	@Override
	public InputField<String> setBinding(String binding) {
		setAttribute("binding", binding);
		return this;
	}
	

	
}
