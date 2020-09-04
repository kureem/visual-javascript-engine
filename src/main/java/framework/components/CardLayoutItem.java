package framework.components;

public class CardLayoutItem extends JSContainer{

	public CardLayoutItem(String name, String tag) {
		super(name, tag);
	}

	@Override
	public String[] advancedEventTypes() {
		return new String[]{"activate","deactivate", "validate"};
	}
	
	

}
