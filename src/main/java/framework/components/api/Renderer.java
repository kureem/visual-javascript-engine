package framework.components.api;

import framework.components.api.Renderable;
import jsweet.dom.HTMLElement;

/**
 * Interface to implemented by renderer of components
 * @author Kureem Rossaye
 *
 * @param <T>
 */
public interface Renderer<T extends Renderable> {
	
	/**
	 * Render the specified component and attach it to the specified parent
	 * @param renderable The component to render
	 * @param parent The parent to which the component is attached
	 */
	public void doRender(T renderable, HTMLElement parent);

}
 