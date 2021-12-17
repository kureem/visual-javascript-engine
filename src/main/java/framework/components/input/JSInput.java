package framework.components.input;

import static jsweet.lang.Globals.parseFloat;

import framework.components.JSContainer;
import framework.components.api.InputField;
import framework.components.api.ValidationException;
import jsweet.dom.CustomEvent;
import jsweet.dom.HTMLElement;
import jsweet.dom.HTMLInputElement;
import jsweet.lang.Date;

public  class JSInput<T> extends JSContainer
		implements InputField<T> {



	public JSInput(String name) {
		super(name, "input");
	}


	public void setSize(Double size) {
		setAttribute("size", size + "");
	}

	public void setPattern(String pattern) {
		setAttribute("pattern", pattern);
	}

	public JSInput<T> setRequired(boolean b) {
		if (b) {
			setAttribute("required", "true");
		} else
			setAttribute("required", null);
		return this;
	}

	public JSInput<T> setDisabled(boolean b) {
		if (b) {
			setAttribute("disabled", "true");
		} else {
			setAttribute("disabled", null);
		}
		return this;
	}

	public JSInput<T> setReadOnly(boolean b) {
		if (b) {
			setAttribute("readonly", "true");
		} else {
			setAttribute("readonly", null);
		}
		return this;
	}

	protected String toHtmlDateString(Date date) {
		
		String month = (date.getMonth() +1) + "";
		if(month.length() == 1) {
			month = "0" + month;
		}
		
		String sdate = (date.getDate()) + "";
		if(sdate.length() == 1) {
			sdate = "0" + sdate;
		} 
		
		return date.getFullYear() + "-" + month + "-" + sdate;
	}

	protected Double getDoubleValue() {
		HTMLElement nat = getNative();
		if (nat != null) {
			HTMLInputElement el = (HTMLInputElement) nat;
			// el.validity
			return el.valueAsNumber;
		}

		return parseFloat(getAttribute("value"));
	}

	protected String getStringValue() {
		HTMLElement nat = getNative();
		if (nat != null) {
			HTMLInputElement el = (HTMLInputElement) nat;
			// el.validity
			return el.value;
		}

		return getAttribute("value");
	}

	protected Date getDateValue() {
		HTMLElement nat = getNative();
		if (nat != null) {
			HTMLInputElement el = (HTMLInputElement) nat;
			return el.valueAsDate;
		}
		return new Date(getAttribute("value"));
		// return null;
	}

	protected HTMLInputElement getNativeInput() {
		HTMLElement nat = getNative();
		if (nat != null) {
			HTMLInputElement el = (HTMLInputElement) nat;
			return el;
			// el.valueAsNumber = val;
		}
		return null;
	}

	protected void setDoubleValue(Double val) {
		HTMLInputElement el = getNativeInput();
		if (el != null) {
			el.valueAsNumber = val;
		} 
		setAttribute("value", val + "");
		
	}

	protected void setStringValue(String s) {
		HTMLInputElement el = getNativeInput();
		if (el != null) {
			el.value = s;
		}
		setAttribute("value", s);
		
	}

	protected void setDateValue(Date date) {
		HTMLInputElement el = getNativeInput();
		if (el != null) {
			el.valueAsDate = date;
		} 
		if (date != null)
			setAttribute("value", toHtmlDateString(date));
		else
			setAttribute("value", "");
		
	}

	public String getBinding() {
		return getAttribute("binding");
	}

	public JSInput<T> setPlaceHolder(String placeholder) {
		setAttribute("placeholder", placeholder);
		return this;
	}


	/*
	 * (non-Javadoc)
	 * @see framework.input.InputField#validate()
	 */
	@Override
	public void validate() throws ValidationException {
		boolean valid = true;
		ValidationException e = new ValidationException();
		HTMLElement nat = getNative();
		if (nat != null) {
			HTMLInputElement el = (HTMLInputElement) nat;
			valid = el.checkValidity();
			if (!valid) {
				ValidationException.throwError(el.validationMessage,el.validity);
			}
		}

		/*
		 * for (Validator<T> v : validators) {
		 * 
		 * boolean b = v.validate(this); if (!b) { valid = false;
		 * ValidationException.addError(v.getErrorMessage(),
		 * ValidationException.customError, e); } }
		 */
		CustomEvent validate = new CustomEvent("validate");
		validate.$set("errors", e.errors);
		validate.$set("valid", valid);
		validate.$set("source", this);
		fireListener("validate", validate);
		if (!valid) {
			throw e;
		}
	}

	/*
	 * (non-Javadoc)
	 * @see framework.JSContainer#advancedEventTypes()
	 */
	@Override
	public String[] advancedEventTypes() {
		return new String[] { "validate" };
	}

		
	public JSInput<T> setBinding(String binding) {
		setAttribute("binding", binding);
		return this;
	}

	@SuppressWarnings("unchecked")
	@Override
	public T getValue() {
		HTMLInputElement inp = (HTMLInputElement)getNative();
		if(inp != null)
			return ((T)inp.value);
		else
			return (T)getAttribute("value");
	}

	@Override
	public void setValue(T val) {
		HTMLInputElement inp = (HTMLInputElement)getNative();
		if(inp != null)
			inp.value = (String)val;
		
		setAttribute("text", (String)val);
	}

	

}
