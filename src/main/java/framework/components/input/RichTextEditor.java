package framework.components.input;

import static jsweet.lang.Globals.eval;

import def.js.Function;
import framework.components.api.Renderer;
import jsweet.dom.HTMLElement;
import jsweet.lang.Object;

public class RichTextEditor extends JSTextArea implements Renderer<RichTextEditor> {

	private Object editor = null;

	public RichTextEditor(String name) {
		super(name);
		setAttribute("identifier", "html:richtext");
		addRenderer(this);
	}

	@Override
	public void doRender(RichTextEditor c, HTMLElement root) {

		if (editor == null) {

			eval("this.editor = new Simditor({textarea: $('#" + getId() + "')});");

		}
	}

	@Override
	public String getValue() {
		if (editor != null) {
			((Function) editor.$get("saveContent")).call(this.editor);
		}
		return super.getValue();
	}

}
