package framework.components;

/**
 * Class that is rendered as javascript source tag as shown below<br>
 *<br>
 *<code>
 * &lt;script type="text/javascript" src="??"&gt;&lt;/script&gt;
 * </code>
 * @author Kureem Rossaye
 *
 */
public class ExternalJavascript extends JSContainer {
	

	/**
	 * Instantiate this container with the specified name
	 * @param name - name of container
	 */
	public ExternalJavascript(String name) {
		super(name, "script");
		setAttribute("type", "text/javascript");
	}

	/**
	 * Sets the source of the external javascript
	 * @param src - source of file
	 * @return - this 
	 */
	public ExternalJavascript setSource(String src){
		setAttribute("src", src);
		return this;
	}


}
