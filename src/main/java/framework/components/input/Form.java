package framework.components.input;

import java.util.Date;

import framework.components.JSContainer;
import framework.components.api.InputField;
import framework.components.api.Renderable;
import framework.components.api.ValidationException;
import framework.components.util.ComponentUtil;
import framework.components.util.PropertyUtil;
import framework.components.util.ComponentUtil.ComponentVisitor;
import jsweet.dom.CustomEvent;
import jsweet.lang.Array;
import jsweet.lang.Object;

public class Form extends JSContainer {
	
	protected Object validationerrors = new Object();

	public Form(String name) {
		super(name, "form");
	}

	@Override
	public String[] advancedEventTypes() {
		return new String[] { "beforeValidate", "afterValidate", "beforeSetData", "afterSetData", "beforeGetData","onError",
				"afterSetData", "beforeSubmit", "afterSubmit", "submit" };
	}
	
	
	public boolean isValid(){
		return Object.keys(validationerrors).length <= 0;
	}

	
	public boolean hasErrors(){
		String[] keys = Object.keys(validationerrors);
		if(keys != null && keys.length > 0){
			return true;
		}else{
			return false;
		}
	}
	
	public ValidationException getError(String binding){
		return (ValidationException)validationerrors.$get(binding);
	}
	
	public Object getErrors(){
		return validationerrors;
	}
	
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

		CustomEvent evtAfter = new CustomEvent("afterValidate");
		evtAfter.$set("source", this);
		evtAfter.$set("data", validationerrors);
		evtAfter.$set("errors", validationerrors);
		evtAfter.$set("hasError", Object.keys(validationerrors).length > 0);
		fireListener("afterValidate", evtAfter);
		if(Object.keys(validationerrors).length >0) {
			CustomEvent onError = new CustomEvent("onError");
			onError.$set("source", this);
			onError.$set("data", validationerrors);
			onError.$set("errors", validationerrors);
			onError.$set("hasError", Object.keys(validationerrors).length > 0);
			fireListener("onError", onError);
		}
		return Object.keys(validationerrors).length <= 0;

	}

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
