package framework.components;

import framework.components.api.Renderable;

public interface CastaContainer extends Renderable{
	public void setId(String id);
	
	public CastaContainer getChildById(String id);

}
