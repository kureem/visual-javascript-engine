package framework.components.input;

import framework.components.api.EventListener;
import framework.components.api.Renderable;
import jsweet.dom.Event;
import jsweet.lang.Date;

public class JSDateInput extends AbstractJSInput<Date> {

	public JSDateInput(String name) {
		super(name);
		setType(DateInputTypes.date);
		addEventListener(new EventListener() {
			
			@Override
			public void performAction(Renderable source, Event evt) {
				setValue(getValue());
			}
		}, "change");
	}

	public JSDateInput setType(String type) {
		setAttribute("type", type);
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
