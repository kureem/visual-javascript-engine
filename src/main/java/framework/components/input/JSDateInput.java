package framework.components.input;

import framework.components.api.EventListener;
import framework.components.api.InputType;
import framework.components.api.Renderable;
import jsweet.dom.Event;
import jsweet.lang.Date;

public class JSDateInput extends JSInput<Date> {

	public JSDateInput(String name) {
		super(name);
		setType(InputType.DATE);
		addEventListener(new EventListener() {
			
			@Override
			public void performAction(Renderable source, Event evt) {
				setValue(getValue());
			}
		}, "change");
	}

	public JSDateInput setType(InputType type) {
		if(type != null) {
			if(type.getGroup() != "date") {
				throw new RuntimeException("only date types are allowed");
			}
			setAttribute("type", type.getValue());
		}else {
			throw new RuntimeException("cannot set null value for type attribute");
		}
		return this;
	}

	@Override
	public Date getValue() {
		return getDateValue();
	}

	@Override
	public void setValue(Date val) {
		setDateValue(val);
	}

	public void setMin(Date min) {
		setAttribute("min", toHtmlDateString(min));
	}

	public void setMax(Date max) {
		setAttribute("max", toHtmlDateString(max));
	}

	
}
