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
import framework.components.api.Renderable;
import framework.components.api.ValidationException;
import jsweet.dom.CustomEvent;
import jsweet.dom.Element;
import jsweet.dom.HTMLElement;
import jsweet.dom.HTMLOptionElement;
import jsweet.dom.HTMLSelectElement;
import jsweet.lang.Array;

public class JSSelect extends JSContainer implements InputField<Object> {


	private String previousValue;


	private Array<jsweet.lang.Object> data;

	public JSSelect(String name) {
		super(name, "select");
	}

	
	
	public JSSelect setOptions(String options) {
		String[] opts = options.split("\n");
		for(String opt : opts) {
			addOption(opt, opt);
		}
		
		return this;
	}

	public JSSelect addOption(JSOption option) {

		if (data == null) {
			data = new Array<jsweet.lang.Object>();
		}

		if (findItem(option.getValue()) == null) {

			jsweet.lang.Object opt = new jsweet.lang.Object();
			opt.$set("text", option.getText());
			opt.$set("value", option.getValue());
			data.push(opt);
			addChild(option);
		}
		return this;
	}

	public JSSelect addOption(String text, String value) {
		return addOption(new JSOption(text, value));
	}

	public JSSelect addOption(jsweet.lang.Object opt) {
		String text = (String) opt.$get("text");
		text = text + "";
		String value = (String) opt.$get("value");
		value = value + "";
		return addOption(text, value);
	}

	@Override
	public Renderable clearChildren() {
		this.data = null;
		return super.clearChildren();

	}

	public Renderable clearOptions() {
		return clearChildren();

	}
	
	public void setMultiple(boolean b) {
		if (b) {
			setAttribute("multiple", "true");
		} else {
			setAttribute("multiple", null);
		}
	}

	public void setSize(Double size) {
		setAttribute("size", size + "");
	}

	public void setPattern(String pattern) {
		setAttribute("pattern", pattern);
	}

	public JSSelect setRequired(boolean b) {
		if (b) {
			setAttribute("required", "true");
		} else
			setAttribute("required", null);
		return this;
	}

	public JSSelect setDisabled(boolean b) {
		if (b) {
			setAttribute("disabled", "true");
		} else {
			setAttribute("disabled", null);
		}
		return this;
	}

	public JSSelect setReadOnly(boolean b) {
		if (b) {
			setAttribute("readonly", "true");
		} else {
			setAttribute("readonly", null);
		}
		return this;
	}

	public boolean isMultiple() {
		return "true".equals(getAttribute("multiple"));
	}

	@Override
	public Object getValue() {

		jsweet.dom.HTMLSelectElement ele = (jsweet.dom.HTMLSelectElement) getNative();
		if (ele != null) {
			if (ele.multiple) {
				Array<String> result = new Array<String>();
				for (Element e : ele.children) {
					HTMLOptionElement opt = (HTMLOptionElement) e;
					if(opt.selected)
						result.push(opt.value);
				}
				return result;
			} else {
				return ele.value;
			}
		} else {
			String val = getAttribute("value");
			for (Renderable opt : getChildren()) {
				if (opt.getAttribute("value").equals(val)) {
					return ((JSOption) opt).getValue();
				}
			}
		}
		return null;
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	public void setValue(Object values) {

		previousValue = (String) getValue();
		if (values != null) {
			jsweet.dom.HTMLSelectElement ele = (jsweet.dom.HTMLSelectElement) getNative();
			String firstVal = values.toString();
			Array<String> arrVal = new Array<String>();
			if (values instanceof Array) {
				arrVal = (Array) values;
				if (arrVal.length > 0) {
					firstVal = arrVal.$get(0);
				} else {
					firstVal = "";
				}
			} else {
				arrVal.push((String) values);
			}

			if (ele != null) {
				ele.value = firstVal;
			}

			setAttribute("value", firstVal);
			for (Renderable opt : getChildren()) {
				((JSOption) opt).setSelected(false);
				for (String val : arrVal) {
					if (opt.getAttribute("value").equals(val)) {
						((JSOption) opt).setSelected(true);
					}
				}
			}
		} else {
			for (Renderable opt : getChildren()) {
				((JSOption) opt).setSelected(false);
			}
			jsweet.dom.HTMLSelectElement ele = (jsweet.dom.HTMLSelectElement) getNative();
			if (ele != null) {
				ele.value = "";
			}
			setAttribute("value", "");
		}

	}

	public String getPreviousValue() {
		return previousValue;
	}

	@Override
	public void validate() throws ValidationException {

		boolean valid = true;
		ValidationException e = new ValidationException();
		HTMLElement nat = getNative();
		if (nat != null) {
			HTMLSelectElement el = (HTMLSelectElement) nat;
			valid = el.checkValidity();
			if (!valid) {
				//JSInput.addError(el.validationMessage, el.validity, e);
				// el.validity.
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

	
	public String getBinding() {
		return getAttribute("binding");
	}

	
	public void setData(Array<jsweet.lang.Object> data_) {
		clearChildren();
		setRendered(false);
		// this.data = data;
		for (jsweet.lang.Object o : data_) {
			if(o.hasOwnProperty("value")){
				String value = (String) o.$get("value");
				String text = (String) o.$get("text");
				addOption(new JSOption(text, value));
			}else{
				String value = (String) o.toString();
				String text = (String) o.toString();
				addOption(new JSOption(text, value));
			}
		}
	}
	
	public void setOptions(Array<jsweet.lang.Object> data_){
		setData(data_);
	}

	@SuppressWarnings("unchecked")
	public Array<jsweet.lang.Object> getSelectedItems() {
		Object obj = getValue();
		Array<jsweet.lang.Object> result = new Array<jsweet.lang.Object>();
		if (isMultiple()) {
			for (String o : (Array<String>) obj) {

				jsweet.lang.Object item = findItem(o);
				if (item != null) {
					result.push(item);
				}
			}
		} else {
			if (obj != null) {
				jsweet.lang.Object item = findItem(obj.toString());
				if (item != null) {
					result.push(item);
				}
			}
		}
		return result;
		// if(obj instanceof Array<T>)
	}

	public Array<jsweet.lang.Object> getData() {
		return data;
	}

	public jsweet.lang.Object findItem(String value) {
		if (data != null) {
			for (jsweet.lang.Object o : data) {
				String val = (String) o.$get("value");
				val = val + "";
				String comp = value + "";
				if (val != null && val.equals(comp)) {
					return o;
				}
			}
		}
		return null;
	}

	
	/*
	 * (non-Javadoc)
	 * @see framework.input.InputField#setBinding(java.lang.String)
	 */
	@Override
	public InputField<Object> setBinding(String binding) {
		setAttribute("binding", binding);
		return this;
	}

}
