package framework.components;

public class ExternalJavascript extends JSContainer {
	

	public ExternalJavascript(String name) {
		super(name, "script");
		setAttribute("type", "text/javascript");
		setAttribute("identifier", "html:javascript");
	}

	
	public ExternalJavascript setSource(String src){
		setAttribute("src", src);
		return this;
	}


}
