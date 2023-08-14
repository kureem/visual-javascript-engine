package framework.components.api;

public enum Units {
	PIXEL("pixel", "px", "absolute"),
	CENTIMETER("centimer", "cm", "absolute"),
	MILLIMETER("millimeter", "mm", "absolute"),
	INCH("inch", "mm", "absolute"),
	POINT("point", "pt", "absolute"),
	PICA("pica", "pc", "absolute"),
	EM("em", "em", "relative"),
	EX("ex", "ex", "relative"),
	CH("ch", "ch", "relative"),
	REM("root element", "rem", "relative"),
	VIEWPORT_WIDTH("viewport width", "vw", "relative"),
	VIEWPORT_HEIGHT("viewport height", "vw", "relative"),
	VIEWPORT_MIN("viewport minimum", "vmin", "relative"),
	VIEWPORT_MAX("viewport maximum", "vmax", "relative"),
	PERCENT("percent", "%", "relative"),
	
	;
	
	
	private Units(String name, String display, String type) {
		this.name = name;
		this.display = display;
		this.type = type;
	}

	private String name;
	
	private String display;
	
	private String type;

	public String getName() {
		return name;
	}

	public String getDisplay() {
		return display;
	}

	public String getType() {
		return type;
	}

	
}
