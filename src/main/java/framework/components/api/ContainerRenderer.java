package framework.components.api;

import static jsweet.dom.Globals.console;
import static jsweet.dom.Globals.document;
//import static jsweet.util.StringTypes.style;

import jsweet.dom.CSSStyleSheet;
import jsweet.dom.Element;
import jsweet.dom.HTMLElement;
import jsweet.dom.HTMLScriptElement;
import jsweet.dom.HTMLStyleElement;
import jsweet.dom.NamedNodeMap;
import jsweet.dom.Node;
import jsweet.dom.NodeListOf;
import jsweet.lang.Array;
import jsweet.lang.Globals;
import jsweet.lang.Object;

public class ContainerRenderer implements Renderer<Renderable> {
	
	public  static double timeSpent =0;

	
	

	public void doRender(Renderable c, HTMLElement root) {
		HTMLElement jq = document.getElementById(c.getId());
		
		String tag = c.getTag();
		boolean rendered = c.isRendered();
		String name = c.getName();
		String html = c.getHtml();
		Renderable parent = c.getParent();
	
		if (!rendered) {
	//		decorate(c);
			if (jq != null)
				jq.remove();
			HTMLElement njq = document.createElement(tag);
			if (name != null && name.length() > 0)
				njq.setAttribute("name", name);
			njq.setAttribute("id", c.getId());
			njq.innerHTML = html;
			
			NodeListOf<Element> uiscripts =  njq.querySelectorAll("script");//njq.getElementsByTagName(StringTypes.script);
			Array<String> scripts = new Array<String>();
			for(double i =0; i < uiscripts.length;i++) {
				HTMLScriptElement elem = (HTMLScriptElement)uiscripts.$get(i);
				if(elem.innerText != null && elem.innerText.trim().length() > 0)
					scripts.push( elem.innerText);
			}
			renderAttributes(njq, c, false);
			renderStyles(njq, c, false);

			if (parent == null) {
				if (root == null) {
					Node body = document.getElementsByTagName("body").$get(0);
					body.appendChild(njq);
				} else {
					root.appendChild(njq);
				}
			} else {

				if (parent instanceof TemplateRenderable) {
					Element elem = document.getElementById(parent.getId()).querySelector("[name=" + name +"]");
					elem.parentElement.replaceChild(njq, elem);
					//$("#" + parent.getId() + " [name=" + name + "]").replaceWith(njq);
				} else {
					
					double index = parent.getChildren().indexOf(c);
					Renderable nextSib = null;
					if (index < parent.getChildren().length - 1) {
						nextSib = parent.getChildren().$get(index + 1);
						if (!nextSib.isRendered()) {
							nextSib = null;
						}
					}

					if (nextSib != null) {
						Node p = document.getElementById(parent.getId());
						p.insertBefore(njq, document.getElementById(nextSib.getId()));
					} else {
						try{
							document.getElementById(parent.getId()).appendChild(njq);
						}catch(Exception e){
							e.printStackTrace();
						}
					}
				}
			}
			
			Renderable me = c;
			Renderable component =me;
			doNothing(component);
			for(String scr : scripts) {
				Globals.eval(scr);
			}
		//	List l =null;
			renderEvents(njq, c);
			processCSSRules(c, njq);
			
			execCommands(njq, c);
			
			c.flush("a28n12l10");
		} else {
			if(jq != null){
				renderAttributes(jq, c, true);
				renderStyles(jq, c, true);
				execCommands(jq, c);
				c.flush("a28n12l10");
			}

		}
	}
	
	private void doNothing(Renderable r) {
		
	}

	protected void execCommands(HTMLElement njq, Renderable container) {
		/*for (JSCommand command : container.getCommands()) {
			String name = command.getName();
			jsweet.lang.Object params = command.getParameters();
			String variable = command.getVariable();
			if ("null".equals(variable)) {
				variable = null;
			}
			if (params == null && variable == null) {
				eval("njq." + name + "()");
			} else if (params != null) {
				eval("njq." + name + "(params)");
			} else if (variable != null) {
				eval("njq." + name + "(" + variable + ")");
			}
		}*/
	}

	@SuppressWarnings("unchecked")
	protected void renderEvents(HTMLElement njq, Renderable c) {
		String[] keys = Object.keys(c.getListeners());
		for (String key :  keys) {
			final Array<EventListener> listeners = (Array<EventListener>)c.getListeners().$get(key);
			njq.addEventListener(key, (evt) -> {
				//synchronizeFields(c.getRoot().getNative(), c.getRoot());
				for (EventListener l : listeners) {
					
					l.performAction(c, evt);
				}
				c.getRoot().render();
			});

		}
	}

	

	protected void renderAttributes(HTMLElement njq, Renderable c, boolean changed) {

		if (changed) {
			for (String key : c.getChangedAttributes()) {
				String attr = c.getAttribute(key);
				if (attr == null) {
					njq.removeAttribute(key);
				} else {
					setAttribute(njq, key, attr);
					//njq.setAttribute(key, attr);
				}
			}
		} else {
			for (String key : c.getAttributeNames()) {
				String attr = c.getAttribute(key);
				if (attr != null)
					//njq.setAttribute(key, c.getAttribute(key));
					setAttribute(njq, key, attr);
			}
		}
	}
	
	
	

	protected void clearAttributes(HTMLElement elem) {
		NamedNodeMap attrs = elem.attributes;
		for (double i = 0; i < attrs.length; i++) {
			if (!attrs.$get(i).name.equals("id"))
				elem.removeAttribute(attrs.$get(i).name);
		}
	}

	protected void clearStyles(HTMLElement jq) {
		jq.removeAttribute("style");

	}

	protected void renderStyles(HTMLElement njq, Renderable c, boolean changed) {

		if (changed) {
			for (String key : c.getChangedStyles()) {
				njq.style.setProperty(key, c.getStyle(key));
			}
		} else {
			for (String key : c.getStyleNames()) {
				njq.style.setProperty(key, c.getStyle(key));
			}
		}
	}
	
	public static void setAttribute(HTMLElement element, String attribute, String value){
		try{
			element.setAttribute(attribute, value);
		}catch(Exception e){
			console.warn("Invalid attribute :" + attribute + " set to:" + element.toString());
		}
	}
	
	
	public static void processCSSRules(Renderable renderable, HTMLElement nativeNode) {
		
		Array<String> rules = renderable.getCSSRules();
		
		if(rules.length > 0) {
			HTMLStyleElement styleelem = (HTMLStyleElement)document.createElement("style");
			styleelem.type="text/css";
			nativeNode.appendChild(styleelem);
			
			CSSStyleSheet sheet = (CSSStyleSheet)styleelem.sheet;
			for(String rule : rules)
				sheet.insertRule(rule);
		}
	}

	
}
