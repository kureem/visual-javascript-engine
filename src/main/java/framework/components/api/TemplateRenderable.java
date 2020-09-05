package framework.components.api;

import jsweet.dom.HTMLElement;
import jsweet.lang.Object;

/**
 * More specific component that is rendered based on a specified template instead of a simple tag
 * @author Kureem Rossaye
 *
 */
public interface TemplateRenderable extends Renderable{
	
	/**
	 * Returns the html template of the component
	 * @return The html template of the component
	 */
	public String getTemplate();
	
	/**
	 * Sets the template for this component
	 * @param template The template for the component
	 */
	public void setTemplate(String template);
	
	/**
	 * data injected to the component that can be used by the compiler to compile the template
	 * @return Data injected to the component
	 */
	public Object getContext();
	
	/**
	 * Render the component and attach it to the specified parent
	 */
	public abstract void render(HTMLElement parent);
	

}
