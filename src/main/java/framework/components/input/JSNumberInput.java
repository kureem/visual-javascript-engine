package framework.components.input;

import static jsweet.lang.Globals.parseInt;

import framework.components.api.InputType;

public class JSNumberInput extends JSInput<Double> {

	public JSNumberInput(String name) {
		super(name);
		setType( InputType.NUMBER);
	}
	
	
	public JSNumberInput setType(InputType type) {
		if(type != null) {
			if(type.getGroup() != "number") {
				throw new RuntimeException("only numeric types are allowed");
			}
			setAttribute("type", type.getValue());
		}else {
			throw new RuntimeException("cannot set null value for type attribute");
		}
		return this;
	}

	public void setStep(Double step) {
		setAttribute("step", step + "");
	}

	public Double getStep() {
		return parseInt(getAttribute("step"));
	}

	@Override
	public Double getValue() {
		return getDoubleValue();
	}

	@Override
	public void setValue(Double val) {
		setDoubleValue(val);
	}

	public void setMin(Double min) {
		setAttribute("min", min + "");
	}

	public void setMax(Double max) {
		setAttribute("max", "" + max);
	}



}
