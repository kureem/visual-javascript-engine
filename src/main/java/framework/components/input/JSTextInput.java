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

<<<<<<< HEAD
import framework.components.api.StringInputTypes;

public class JSTextInput extends AbstractJSInput<String> {

	public JSTextInput(String name) {
		super(name);
		setType(StringInputTypes.text);
		setAttribute("identifier", "html:input");
		//addRenderer(this);
=======
import framework.components.api.InputType;

public class JSTextInput extends JSInput<String> {

	public JSTextInput(String name) {
		super(name);
		setType(InputType.TEXT);
>>>>>>> 397d0857239819c5511f298d8b42d80ea904d52a
	}

	public void setMaxLength(Double length) {
		setAttribute("maxlength", length + "");
	}

	public JSTextInput setType(InputType type) {
		if(type != null) {
			if(type.getGroup() == "text") {
				setAttribute("type", type.getValue());
			}else {
				throw new RuntimeException("only text input types can be set as type");
			}
		}else {
			setAttribute("type", null);
		}
		return this;
	}

	@Override
	public String getValue() {
		return getStringValue();
	}

	@Override
	public void setValue(String val) {
		setStringValue(val);
	}
	
	public String getMask(){
		return getAttribute("mask");
	}
	
	public void setMask(String mask){
		setAttribute("mask", mask);
		setRendered(false);
	}

	
<<<<<<< HEAD
	
=======

	
//	@Override
//	public void doRender(JSTextInput c, HTMLElement root) {
//		
//		String mask = getMask();
//		if(mask != null && mask.trim().length() > 0){
//			HTMLElement elem = getNative();
//			JQuery jq = $(elem);
//			 ((Function)$(elem).$get("inputmask")).call(jq, mask);
//			 eval("");
//		}
//		// TODO Auto-generated method stub
//		
//	}
>>>>>>> 397d0857239819c5511f298d8b42d80ea904d52a

}
