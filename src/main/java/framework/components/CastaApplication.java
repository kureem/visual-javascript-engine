package framework.components;

import static jsweet.dom.Globals.document;
import static jsweet.dom.Globals.window;

import jsweet.dom.FormData;
import jsweet.dom.HTMLElement;
import jsweet.dom.XMLHttpRequest;
import jsweet.lang.JSON;

public class CastaApplication {
	
	private JSCastaContainer ui = new JSCastaContainer();
	
	public CastaApplication(String name) {
		window.$set(name, this);
		init(name);
	}
	
	public void init(String name) {
		String url = "castafiore/?casta_applicationid=" + name;
		String curUrl =window.location.href;
		if(curUrl.contains("?")) {
			String params = curUrl.split("?")[1];
			url = url + params;
		}
		
		XMLHttpRequest xhr = new XMLHttpRequest();
		FormData fd = new FormData();
		xhr.open("POST", url, true);
		xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
		/*
		 * xhr.upload.addEventListener("progress", (pe) -> { ProgressEvent e =
		 * (ProgressEvent) pe; Long progress = Math.round((e.loaded * 100.0) / e.total);
		 * e.$set("progress", progress); e.$set("data", progress);
		 * //fireListener("progress", e);
		 * 
		 * });
		 */
		xhr.onreadystatechange = (e) -> {
			if (xhr.readyState == 4 && xhr.status == 200) {
				// File uploaded successfully
				jsweet.lang.Object val = (jsweet.lang.Object)JSON.parse(xhr.responseText);
				ui.setVal((jsweet.lang.Object)val.$get("ui"));
				HTMLElement root = document.getElementById("app_" + name);
				if(root == null) {
					root = document.createElement("div");
					root.setAttribute("id", "app_" + name);
					document.body.appendChild(root);
				}
				ui.render(root);
				
			}
			return e;
		};
		jsweet.lang.Object mm = new jsweet.lang.Object();
		mm.$set("test____", "sfsdfsdfsd");
		xhr.send(mm);

	}

}
