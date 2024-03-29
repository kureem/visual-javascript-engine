package framework.components.api;

import jsweet.dom.HTMLElement;

/**
 * Interface to implemented by renderer of components
 * @author Kureem Rossaye
 *
 * @param <T> - The type of {@link Renderable} that this renderer is compatible with	
 */
public interface Renderer<T extends Renderable> {
	
	/**
	 * Render the specified component and attach it to the specified parent
	 * @param renderable The component to render
	 * @param parent The parent to which the component is attached
	 */
	public void doRender(T renderable, HTMLElement parent);

}
 