package framework.components;

/**
 * Simple container used as child item for the {@link CardLayout} container.
 * @author Kureem Rossaye
 *
 */
public class CardLayoutItem extends JSContainer{

	/**
	 * Instantiate a {@link CardLayoutItem} with specified name and tag
	 * @param name - name of item
	 * @param tag - tag of item
	 */
	public CardLayoutItem(String name, String tag) {
		super(name, tag);
	}

	/**
	 * returns array of specific supported events
	 */
	@Override
	public String[] advancedEventTypes() {
		return new String[]{"activate","deactivate", "validate"};
	}
	
	

}
