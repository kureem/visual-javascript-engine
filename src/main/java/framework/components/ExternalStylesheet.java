package framework.components;

import framework.components.api.Renderer;
import jsweet.dom.HTMLElement;

/**
 * Rendered as an external stylesheet call tag as show below<br><br>
 * 
 * <code>
 *  &lt;link rel="stylesheet" media="|all|screen|print|speech" crossorigin="|anonymous|use-credentials" type="text/css" source="??"&gt&lt/link&gt
 * </code>
 * @author Kureem Rossaye
 *
 */
public class ExternalStylesheet extends JSContainer implements  Renderer<ExternalStylesheet>{

	public final static String ORIGIN_ANONYMOUS = "anonymous";
	
	public final static String ORIGIN_USE_CREDENTIALS = "use-credentials";
	
	
	public final static String MEDIA_DEFAULT = null;
	
	public final static String MEDIA_ALL = "all";
	
	public final static String MEDIA_SCREEN = "screen";
	
	public final static String MEDIA_PRINT = "print";
	
	public final static String MEDIA_SPEECH = "speech";
	
	
	/**
	 * External this external stylesheet container with the specified name
	 * @param name - the name of the container
	 */
	public ExternalStylesheet(String name) {
		super(name, "link");
		setAttribute("type", "text/css");
		setAttribute("rel", "stylesheet");
		addRenderer(this);
	}

	

	/**
	 * Sets the source of the external css file and returns the updated instance
	 * @param src - source of external css file
	 * @return - updated instance of this
	 */
	public ExternalStylesheet setSource(String src){
		setAttribute("source", src);
		return this;
	}
	
	/**
	 * Sets the cross origin value of the css file
	 * @param origin - cross origin value
	 * @return - updated instance of this
	 */
	public ExternalStylesheet setCrossOrigin(String origin){
		setAttribute("crossorigin", origin);
		return this;
	}
	
	/**
	 * Sets the media of the css file
	 * @param media - the media of the css file
	 * @return - updated instance of this
	 */
	public ExternalStylesheet setMedia(String media){
		setAttribute("media", media);
		return this;
	}
	



	/**
	 * Rendered used internally which avoids rendering of the css file when the tag is used in our buider.
	 */
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
