/*
 * Copyright 2002-2018 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package framework.components;

import static jsweet.dom.Globals.window;
import static jsweet.dom.Globals.document;

import framework.components.api.TemplateRenderable;
import jsweet.dom.Attr;
import jsweet.dom.Element;
import jsweet.dom.HTMLElement;
import jsweet.dom.NamedNodeMap;
import jsweet.dom.NodeList;
import jsweet.lang.Error;
import jsweet.lang.Function;
import jsweet.lang.Object;

/**
 * A component that is rendered with a specified html template.<br>
 * Instead of having just a tag like other component, this component body is an
 * html template.<br>
 * Children of this component are placed according to the name of the
 * component.<br>
 * E.g. If the template contains a tag with name=foo. When any component with
 * name = foo is added to this component, the tag with name=foo is replaced by
 * the added child.
 * 
 * @author Rossaye Abdool Kureem
 *
 */
public class HTMLTemplateContainer extends JSContainer implements TemplateRenderable {

	// public final static Object GLOBAL_TEMPLATES = new Object();

	/**
	 * A context that contains variables exposed to the html template. This can be
	 * used by javascript to transmit data from the framework to the template
	 */
	public Object context = new Object();

	private String template;

	/**
	 * Constructs an instance of this component
	 * 
	 * @param name     The name of the component
	 * @param template The html template of this component
	 */
	public HTMLTemplateContainer(String name, String template) {
		super(name, "div");
		setTemplate(template);
	}

	/**
	 * 
	 * @return The template of the component
	 */
	public String getTemplate() {
		return this.template;// getAttribute("template");
	}

	/**
	 * Sets the template of this component
	 * 
	 * @param template The template of this component
	 */
	public void setTemplate(String template) {
		this.template = template;
		setRendered(false);
	}

	/**
	 * 
	 * @return The variable context of this component
	 */
	public Object getContext() {
		return context;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see framework.JSContainer#render(jsweet.dom.HTMLElement)
	 */
	@Override
	public void render(HTMLElement parent) {

		if (!isRendered()) {
			// String attr = getTemplate();
			// String html = $(getTemplate()).html();
			// String html = (String) GLOBAL_TEMPLATES.$get(attr.replace("#", ""));
			// if(compiled) {
			// html = attr;
			// }
			String html = getTemplate();
			if (html != null) {
				Object cxt = context;
				String rendered = compile(html, cxt);

				HTMLElement tmp = document.createElement("div");
				tmp.innerHTML = rendered;
				Element tm = tmp.firstElementChild;
				NodeList children = tmp.childNodes;
				if(children.length > 1 || tm == null) {
					tm = tmp;
				}
				rendered = tm.innerHTML;
				String tag = tm.tagName;
				setTag(tag);
				NamedNodeMap attrs = tm.attributes;
				for (Attr att : attrs) {
					setAttribute(att.name, att.value);
				}
				setHtml(rendered);
				
			} else {
				setHtml("Cannot load template:" + getTemplate());
			}

		}
		super.render(parent);
	}

	public String compile(String html, Object ctx) {
		return html;
	}

	public static java.lang.Object invokeFunction(jsweet.lang.Object target, String function,
			java.lang.Object... args) {
		if (target.hasOwnProperty(function)) {
			return ((Function) target.$get(function)).call(target, args);
		} else {
			throw new Error(target + " does not contain function:" + function);
		}
	}
}
