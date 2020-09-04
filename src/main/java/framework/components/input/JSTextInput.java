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

import static def.jquery.Globals.$;
import static jsweet.lang.Globals.eval;

import def.jquery.JQuery;
import def.js.Function;
import framework.components.api.Renderer;
import framework.components.api.StringInputTypes;
import jsweet.dom.HTMLElement;

public class JSTextInput extends AbstractJSInput<String> implements Renderer<JSTextInput> {

	public JSTextInput(String name) {
		super(name);
		setType(StringInputTypes.text);
		setAttribute("identifier", "html:input");
		addRenderer(this);
	}

	public void setMaxLength(Double length) {
		setAttribute("maxlength", length + "");
	}

	public JSTextInput setType(String type) {
		setAttribute("type", type);
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

	
	@Override
	public void doRender(JSTextInput c, HTMLElement root) {
		
		String mask = getMask();
		if(mask != null && mask.trim().length() > 0){
			HTMLElement elem = getNative();
			JQuery jq = $(elem);
			 ((Function)$(elem).$get("inputmask")).call(jq, mask);
			 eval("");
		}
		// TODO Auto-generated method stub
		
	}

}
