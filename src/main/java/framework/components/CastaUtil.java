package framework.components;

import static jsweet.lang.Globals.eval;

import framework.components.api.EventListener;
import framework.components.api.Renderable;
import jsweet.dom.Event;
import jsweet.lang.Array;
import jsweet.lang.Object;

public class CastaUtil {
	
	public static void setVal(Object val, CastaContainer c) {
		boolean rendered = (Boolean)val.$get("rendered");
		Object styles = (Object)val.$get("styles");
		Object attrs = (Object)val.$get("attributes");
		String uid = (String)val.$get("id");
		if(!rendered) {
			
			c.setRendered(false);
			c.setId(uid);
			String tag = (String)val.$get("tagName");
			c.setTag(tag);
			boolean isTemplate = (Boolean)val.$get("isTemplate");
			if(isTemplate) {
				String template = (String)val.$get("html");
				((HTMLTemplateContainer)c).setTemplate(template);
			}else {
				c.setHtml((String)val.$get("text"));
			}
			//c.setHtml((String)val.$get("text"));
			c.setName((String)val.$get("name"));
			Object events = (Object)val.$get("events");
			
			Object listeners = c.getListeners();
			for(String key : Object.keys(listeners)) {
				listeners.$delete(key);
			}
			
			for(String event : Object.keys(events)) {
				String js = (String)events.$get(event);
				c.addEventListener(new EventListener() {
					
					@Override
					public void performAction(Renderable source, Event evt) {
						eval(js);
					}
				}, event);
			}
		}
		
		for(String style : Object.keys(styles)) {
			c.setStyle(style, (String)styles.$get(style));
		}
		for(String attr : Object.keys(attrs)) {
			c.setAttribute(attr, (String)attrs.$get(attr));
		}
		
		Array<Object> children = (Array<Object>)val.$get("children");
		int index = 0;
		for(Object child : children) {
			String id = (String)child.$get("id");
			boolean isTemplate = (Boolean)child.$get("isTemplate");
			CastaContainer ch = getChildById(c,id);
			if(ch == null) {
				if(isTemplate) {
					ch = new JSCastaTemplateContainer();
				}else {
					ch = new JSCastaContainer();
				}
				if(c.getChildren().length > index) {
					c.addChild(ch);
				}else {
					c.addChildAt(index, ch);
				}
			}
			
			CastaUtil.setVal(child, ch);
			
			index++;
		}
	}
	
	public static CastaContainer getChildById(CastaContainer p, String id) {
		for(Renderable r : p.getChildren()) {
			if(r.getId() == id) {
				return (CastaContainer)r;
			}
		}
		return null;
	}

}
