package framework.components;

public class JSCastaTemplateContainer extends HTMLTemplateContainer implements CastaContainer{

	public JSCastaTemplateContainer() {
		super("","");
		// TODO Auto-generated constructor stub
	}


	private String id;
	@Override
	public void setId(String id) {
		this.id = id;
	}

	
	public String getId() {
		return this.id;
	}


	@Override
	public CastaContainer getChildById(String id) {
		return CastaUtil.getChildById(this, id);
	}
	
	
	
}
