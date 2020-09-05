package framework.components.input;

import framework.components.HTMLTemplateContainer;
import framework.components.api.InputField;
import framework.components.api.ValidationException;
import jsweet.lang.Object;

public class JSAddressInput extends HTMLTemplateContainer implements InputField<Object>{

	

	private Object address = new Object();

	private JSSelect country = new JSSelect("country");

	private JSTextInput city = new JSTextInput("city");

	private JSTextInput postalCode = new JSTextInput("postalCode");

	private JSTextInput state = new JSTextInput("state");

	private JSTextInput street = new JSTextInput("street");
	
	public JSAddressInput(String name) {
		super(name,"");
		
		addChild(country);
		addChild(city);
		addChild(postalCode);
		addChild(state);
		addChild(street);
		
		city.setRequired(true);
		postalCode.setRequired(true);
		//state.setRequired(true);
		street.setRequired(true);
		country.setRequired(true);
	}
	
	
	public Object getAddress() {
		address.$set("country", country.getValue());
		address.$set("city", city.getValue());
		address.$set("postalCode", country.getValue());
		address.$set("state", state.getValue());
		address.$set("street", street.getValue());
		
		return address;
	}
	
	
	public void setAddress(Object address) {
		country.setValue(address.$get("country"));
		city.setValue((String)address.$get("city"));
		postalCode.setValue((String)address.$get("postalCode"));
		state.setValue((String)address.$get("state"));
		street.setValue((String)address.$get("street"));
		
	}


	@Override
	public Object getValue() {
		return getAddress();
	}


	@Override
	public void setValue(Object val) {
		setAddress(val);
	}


	@Override
	public void validate() throws ValidationException {
		street.validate();
		postalCode.validate();
		city.validate();
		country.validate();
		
	}


	@Override
	public String getBinding() {
		if(getAttribute("binding") == null) {
			return getName();
		}else {
			return getAttribute("binding");
		}
	}


	@Override
	public InputField<Object> setBinding(String binding) {
		setAttribute("binding", binding);
		return this;
	}


	@Override
	public InputField<Object> setRequired(boolean b) {
		return this;
	}



	
	
	
}
