package framework.components;

import jsweet.lang.Object;

public class JSCastaContainer extends JSContainer implements CastaContainer{

	private String id;
	
	public JSCastaContainer() {
		super("div");
		
	}
	
	public void setVal(Object val) {
		CastaUtil.setVal(val, this);
	}
	
	public String getId() {
		return id;
	}
	
	public void setId(String id) {
		this.id = id;
	}
	
	@Override
	public CastaContainer getChildById(String id) {
		return CastaUtil.getChildById(this, id);
	}
}
