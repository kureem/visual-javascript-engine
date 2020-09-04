package framework.components.util;

import static def.dom.Globals.window;

import framework.components.api.Renderable;
import jsweet.lang.Array;
import jsweet.lang.Object;

public class ComponentUtil {

	public static void visit(Renderable designable, ComponentVisitor visitor){
		visitor.doVisit(designable);
		for(Renderable child : designable.getChildren()){
			visit(child,visitor);
		}
	}
	
	
	public interface ComponentVisitor{
		
		public void doVisit(Renderable designable);
		
		
	}
	
	
	
	public static Array<Object> getTags(String type){
		Array<jsweet.lang.Object> html5tags = window.$get("html5tags");
		Array<Object> result = new Array<Object>();
		for(jsweet.lang.Object html5tag : html5tags) {
			String stype  = (String)html5tag.$get("type");
			if(stype == type || type == "*") {
				result.push(html5tag);
			}
		}
		return result;
	}
	
}
