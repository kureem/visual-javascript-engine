package framework.components.input;

import framework.components.api.InputType;

public class JSRadio extends JSCheckBox  {

	public JSRadio(String name) {
		super(name);
		setAttribute("type", InputType.RADIO.getValue());
	}
	
	

}
