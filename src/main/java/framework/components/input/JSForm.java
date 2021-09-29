package framework.components.input;

import java.util.Date;

import framework.components.JSContainer;
import framework.components.api.EventListener;
import framework.components.api.InputField;
import framework.components.api.Renderable;
import framework.components.api.ValidationException;
import framework.components.util.ComponentUtil;
import framework.components.util.PropertyUtil;
import framework.components.util.ComponentUtil.ComponentVisitor;
import jsweet.dom.CustomEvent;
import jsweet.dom.Event;
import jsweet.lang.Array;
import jsweet.lang.Object;


/**
 * Renders a form tag with
 * @author Kureem Rossaye
 *
 */
public class JSForm extends JSContainer {
	
	protected Object validationerrors = new Object();

	/**
	 * Creates a new instance of form with the specified name
	 * @param name - The name of the form
	 */
	public JSForm(String name) {
		super(name, "form");
		addEventListener(new EventListener() {
			
			@Override
			public void performAction(Renderable source, Event evt) {
				submit();
			}
		}, "submit");
		
		addEventListener(new EventListener() {
			
			@Override
			public void performAction(Renderable source, Event evt) {
				reset();
			}
		}, "reset");
	}

	/**
	 * returns an array of advanced specific supported event listener<br>
	 * <ul>
	 * <li>beforeValidate - Fired before validating the form</li>
	 * <li>afterValidate  - Fired after the form is validated </li>
	 * <li>beforeSetData  - Fired before setting data into the input fields of the form</li>
	 * <li>afterSetData   - Fired after setting data  into the input fields of the form</li>
	 * <li>beforeGetData  - Fired before retrieving data from the input fields of the form</li>
	 * <li>afterGetData   - Fired after  retrieving data from the input fields of the form</li>
	 * <li>onError        - Fired if there is one or more errors after validating the form</li>
	 * <li>beforeSubmit   - Fired before submitting the form</li>
	 * <li>afterSubmit    - Fired after submitting the form even if the form is not valid</li>
	 * <li>submit         - Fired on submitting the form and if there is no error after validation</li>
	 * <li>reset          - Fired when the form is reset</li>
	 * </ul>
	 */
	@Override
	public String[] advancedEventTypes() {
		return new String[] { "beforeValidate", "afterValidate", "beforeSetData", "afterSetData", "beforeGetData","onError",
				"afterGetData", "beforeSubmit", "afterSubmit", "submit" };
	}
	
	
	/**
	 * Return whether the form is valid of not after validating it.<br> If the form has not been validated yet,
	 * this method will return true
	 * @return - Whether the form is valid or not
	 */
	public boolean isValid(){
		return Object.keys(validationerrors).length <= 0;
	}

	
	/**
	 * Returns whether this form has errors or not after validating it<br> If the form has not been validated yet, 
	 * this method will return false
	 * @return - Whether this form has errors or not
	 */
	public boolean hasErrors(){
		return !isValid();
	}
	
	/**
	 * 
	 * @param binding - The name or binding of the input element in the form
	 * @return - The validation exception if any for the specified binding of the form element
	 */
	public ValidationException getError(String binding){
		return (ValidationException)validationerrors.$get(binding);
	}
	
	/**
	 * 
	 * @return - All errors found after validating this form
	 */
	public Object getErrors(){
		return validationerrors;
	}
	
	/**
	 * 
	 * @param binding - The binding or name of the input field to search for
	 * @return - The input field having specified name or binding
	 */
	public InputField<?> getField(String binding){
		Array<InputField<?>> result = new Array<InputField<?>>();
		ComponentUtil.visit(this, new ComponentVisitor() {

			@Override
			public void doVisit(Renderable designable) {
				if (designable instanceof InputField<?>) {
					try {
						String b = ((InputField<?>) designable).getBinding();
						if(b == binding){
							result .push(((InputField<?>) designable));
						}
					} catch (ValidationException e) {
						String binding = ((InputField<?>) designable).getBinding();
						if (binding == null || binding.trim() == "") {
							binding = designable.getName();
						}
						validationerrors.$set(binding, e);
					}
				}
			}
		});
		if(result.length > 0){
			return result.$get(0);
		}
		
		return null;
	}
	
	/**
	 * Validates all fields in this form and returns whether there is any error in the form<br>
	 * The following chain of event will be fired when this method is called:<br>
	 * <ul>
	 * 	<li>beforeValidate</li>
	 * 	<li>onError - only if there is any error in the form</li>
	 * 	<li>afterValidate</li>
	 * </ul>
	 * @return - Whether there is any error in the form
	 */
	public boolean validate() {
		CustomEvent evt = new CustomEvent("beforeValidate");
		evt.$set("source", this);
		fireListener("beforeValidate", evt);
		validationerrors = new Object();
		ComponentUtil.visit(this, new ComponentVisitor() {

			@Override
			public void doVisit(Renderable designable) {
				if (designable instanceof InputField<?>) {
					try {
						((InputField<?>) designable).validate();
					} catch (ValidationException e) {
						String binding = ((InputField<?>) designable).getBinding();
						if (binding == null || binding.trim() == "") {
							binding = designable.getName();
						}
						validationerrors.$set(binding, e);
					}
				}
			}
		});
		
		if(Object.keys(validationerrors).length >0) {
			CustomEvent onError = new CustomEvent("onError");
			onError.$set("source", this);
			onError.$set("data", validationerrors);
			onError.$set("errors", validationerrors);
			onError.$set("hasError", Object.keys(validationerrors).length > 0);
			fireListener("onError", onError);
		}

		CustomEvent evtAfter = new CustomEvent("afterValidate");
		evtAfter.$set("source", this);
		evtAfter.$set("data", validationerrors);
		evtAfter.$set("errors", validationerrors);
		evtAfter.$set("hasError", Object.keys(validationerrors).length > 0);
		fireListener("afterValidate", evtAfter);
		
		return Object.keys(validationerrors).length <= 0;

	}

	/**
	 * Injects data into the fields of the form.<br>
	 * each property of the form should be the binding of the input field<br>
	 * If for a field in the form, corresponding property is not found in the specified data, 
	 * the field will be cleared and its value set to null<br>
	 * The following chain of event is fired when this method is called:<br>
	 * <ul>
	 * 	<li>beforeSetData</li>
	 * <li>afterSetData</li>
	 * </ul>
	 * 
	 * @param data - The data to inject into the form
	 */
	public void setData(Object data) {
		CustomEvent evt = new CustomEvent("beforeSetData");
		evt.$set("source", this);
		evt.$set("data", data);
		fireListener("beforeSetData", evt);
		ComponentUtil.visit(this, new ComponentVisitor() {

			@SuppressWarnings({ "unchecked", "rawtypes" })
			@Override
			public void doVisit(Renderable designable) {
				if (designable instanceof InputField<?>) {
					String binding = ((InputField<?>) designable).getBinding();
					if (binding == null || binding.trim() == "") {
						binding = designable.getName();
					}
					if (PropertyUtil.hasOwnProperty(data, binding)) {
						Object obj = PropertyUtil.getValue(data, binding);
						if (designable instanceof JSDateInput) {
							try {
								if(obj instanceof jsweet.lang.Date) {
									((InputField) designable).setValue(obj);
								}else {
									Date date = new Date(Long.parseLong(obj.toString()));
									((InputField) designable).setValue(date);
								}
							} catch (Exception e) {
								((InputField) designable).setValue(obj);
							}

						} else {
							((InputField) designable).setValue(obj);
						}

					} else {
						((InputField) designable).setValue(null);
					}

				}
			}
		});

		CustomEvent evtAfter = new CustomEvent("afterSetData");
		evtAfter.$set("source", this);
		evtAfter.$set("data", data);
		fireListener("afterSetData", evtAfter);
	}

	/**
	 * Retrieves data from all the fields in this form<br>
	 * The following chain of event is fired when this method is called:<br>
	 * <ul>
	 * 	<li>beforeGetData</li>
	 * <li>afterGetData</li>
	 * </ul>
	 * @return - The data from all the fields in the form
	 */
	public Object getData() {
		CustomEvent evt = new CustomEvent("beforeGetData");
		evt.$set("source", this);
		fireListener("beforeGetData", evt);
		Object data = new Object();
		ComponentUtil.visit(this, new ComponentVisitor() {

			@SuppressWarnings("rawtypes")
			@Override
			public void doVisit(Renderable designable) {
				if (designable instanceof InputField<?>) {
					String binding = ((InputField<?>) designable).getBinding();
					if (binding == null || binding.trim() == "") {
						binding = designable.getName();
					}
					Object value = (Object) ((InputField) designable).getValue();
					PropertyUtil.setValue(data, value, binding);

				}
			}
		});
		CustomEvent evtAfter = new CustomEvent("afterGetData");
		evtAfter.$set("source", this);
		evtAfter.$set("data", data);
		fireListener("afterGetData", evtAfter);
		return data;
	}

	/**
	 * Resets the form by clearing all the fields in the form<br>
	 * This method is called automatically when the form is reset for example by clicking an input of type reset present in the form<br>
	 * or by resetting it using javascript means.<br>
	 * The reset event is fired when this method is called
	 * 
	 */
	public void reset() {
		Object data = new Object();//getData();
		setData(data);
		CustomEvent on = new CustomEvent("reset");
		on.$set("source", this);
		on.$set("data", data);
		fireListener("reset", on);

	}

	/**
	 * Submits the form.<br>
	 * This method is called automatically when the form is submitted for example by clicking an input of type submit present
	 * in the form or by submitting the form using javascript.<br>
	 * When this method is called, the form is validated, then the getData method is called.<br>
	 * The following chain of event is fired when this method is called
	 * <ul>
	 * 	<li>beforeSubmit event is fired</li>
	 *  <li>
	 *  	validate method is called
	 *  	<ul>
	 *  		<li>beforeValidate event is fired</li>
	 * 			<li>onError event is fired only if there is any error in the form</li>			
	 * 			<li>afterValidate event is fired</li>
	 *  	</ul>
	 *  </li>
	 *  <li>
	 *  	if form is valid, getData method is called
	 *  	<ul>
	 *  		<li>beforeGetData event is fired</li>
	 * 			<li>afterGetData event is fired</li>
	 *  	</ul>
	 *  </li>
	 *  <li>if form is valid submit event is fired</li>
	 *  <li>Whether or not form is valid, afterSubmit event is fired</li>
	 * </ul> 
	 * 
	 */
	public void submit() {
		CustomEvent evt = new CustomEvent("beforeSubmit");
		evt.$set("source", this);
		fireListener("beforeSubmit", evt);
		if (validate()) {
			Object data = getData();
			CustomEvent on = new CustomEvent("submit");
			on.$set("source", this);
			on.$set("data", data);
			fireListener("submit", on);
		}

		CustomEvent evtAfter = new CustomEvent("afterSubmit");
		evtAfter.$set("source", this);
		fireListener("afterSubmit", evtAfter);
	}

}
