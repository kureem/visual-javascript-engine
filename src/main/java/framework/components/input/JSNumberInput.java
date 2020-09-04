package framework.components.input;

import static jsweet.lang.Globals.parseInt;

public class JSNumberInput extends AbstractJSInput<Double> {

	public JSNumberInput(String name) {
		super(name);
		setAttribute("type", "number");
	}
	
	
	public JSNumberInput setType(String type) {
		setAttribute("type", type);
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
