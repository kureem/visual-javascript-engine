package framework.components;

import framework.components.api.Renderer;
import jsweet.dom.HTMLElement;

public class ExternalStylesheet extends JSContainer implements  Renderer<ExternalStylesheet>{

	public final static String ORIGIN_ANONYMOUS = "anonymous";
	
	public final static String ORIGIN_USE_CREDENTIALS = "use-credentials";
	
	//media.options.push(new Option("", ""),new Option("all", "All"),new Option("screen", "Screen"),new Option("print", "Print"),new Option("speech", "Speech"));
	
	public final static String MEDIA_DEFAULT = null;
	
	public final static String MEDIA_ALL = "all";
	
	public final static String MEDIA_SCREEN = "screen";
	
	public final static String MEDIA_PRINT = "print";
	
	public final static String MEDIA_SPEECH = "speech";
	
	public ExternalStylesheet(String name) {
		super(name, "link");
		setAttribute("type", "text/css");
		setAttribute("rel", "stylesheet");
		setAttribute("identifier", "html:stylesheet");
		addRenderer(this);
	}

	

	public ExternalStylesheet setSource(String src){
		setAttribute("source", src);
		return this;
	}
	
	public ExternalStylesheet setCrossOrigin(String origin){
		setAttribute("crossorigin", origin);
		return this;
	}
	
	public ExternalStylesheet setMedia(String media){
		setAttribute("media", media);
		return this;
	}
	



	@Override
	public void doRender(ExternalStylesheet c, HTMLElement root) {
		
		
		if(c.getAncestorWithClass("builder") != null) {
			HTMLElement nati = c.getNative();
			if(nati != null) {
				nati.remove();
			}
			//c.getNative().remove();
			
			//c.setTag("unlink");
			
		}
		// TODO Auto-generated method stub
		
	}
}
