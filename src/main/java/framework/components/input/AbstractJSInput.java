package framework.components.input;

import static jsweet.lang.Globals.parseFloat;

import framework.components.JSContainer;
import framework.components.api.InputField;
import framework.components.api.ValidationException;
import framework.components.api.Validator;
import jsweet.dom.CustomEvent;
import jsweet.dom.HTMLElement;
import jsweet.dom.HTMLInputElement;
import jsweet.dom.ValidityState;
import jsweet.lang.Array;
import jsweet.lang.Date;

public abstract class AbstractJSInput<T> extends JSContainer
		implements InputField<T> {


	private Array<Validator<T>> validators = new Array<Validator<T>>();

	public AbstractJSInput(String name) {
		super(name, "input");
	}

	@SuppressWarnings("unchecked")
	public void addValidator(Validator<T> validator) {
		validators.push(validator);
	}

	public void setSize(Double size) {
		setAttribute("size", size + "");
	}

	public void setPattern(String pattern) {
		setAttribute("pattern", pattern);
	}

	public AbstractJSInput<T> setRequired(boolean b) {
		if (b) {
			setAttribute("required", "true");
		} else
			setAttribute("required", null);
		return this;
	}

	public AbstractJSInput<T> setDisabled(boolean b) {
		if (b) {
			setAttribute("disabled", "true");
		} else {
			setAttribute("disabled", null);
		}
		return this;
	}

	public AbstractJSInput<T> setReadOnly(boolean b) {
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

	public AbstractJSInput<T> setPlaceHolder(String placeholder) {
		setAttribute("placeholder", placeholder);
		return this;
	}

	/**
	 * 
	 * @param msg
	 *            The message to add in the validation context
	 * @param state
	 *            The ValidityState returned
	 * @param e
	 *            The validation exception to add to error context
	 * @return The current instance of the {@link ValidationException}
	 */
	public static ValidationException addError(String msg, ValidityState state, ValidationException e) {
		if (!state.valid) {
			if (state.badInput) {

				ValidationException.addError(msg, ValidationException.badInput, e);
			} else if (state.customError) {
				ValidationException.addError(msg, ValidationException.customError, e);
			} else if (state.patternMismatch) {
				ValidationException.addError(msg, ValidationException.patternMismatch, e);
			} else if (state.rangeOverflow) {
				ValidationException.addError(msg, ValidationException.rangeOverflow, e);
			} else if (state.rangeUnderflow) {
				ValidationException.addError(msg, ValidationException.rangeUnderflow, e);
			} else if (state.stepMismatch) {
				ValidationException.addError(msg, ValidationException.stepMismatch, e);
			} else if (state.tooLong) {
				ValidationException.addError(msg, ValidationException.tooLong, e);
			} else if (state.typeMismatch) {
				ValidationException.addError(msg, ValidationException.typeMismatch, e);
			} else if (state.valueMissing) {
				ValidationException.addError(msg, ValidationException.valueMissing, e);
			}
		}
		return e;
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
				addError(el.validationMessage, el.validity, e);
				// el.validity.
			}
		}

		for (Validator<T> v : validators) {

			boolean b = v.validate(this);
			if (!b) {
				valid = false;
				ValidationException.addError(v.getErrorMessage(), ValidationException.customError, e);
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

	/*
	 * (non-Javadoc)
	 * @see framework.JSContainer#advancedEventTypes()
	 */
	@Override
	public String[] advancedEventTypes() {
		return new String[] { "validate" };
	}

		
	public AbstractJSInput<T> setBinding(String binding) {
		setAttribute("binding", binding);
		return this;
	}

	

}
