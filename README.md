# Visual Javascript engine

## Description

This project is a java library that allows creation of web user interface using pure java.
The java codes and transpiled to javascript using the Jsweet transpilator.
## How to install the candy

Clone this project with git and install the library in your local Maven repository (so that you can refer to it as a dependency in other Maven projects):

```bash
> mvn install
```

## Use from a Java/JSweet project

Add the following dependency to the ``pom.xml``:

```xml
<dependency>
	<groupId>org.vjs</groupId>
	<artifactId>engine</artifactId>
	<version>1.0.0-SNAPSHOT</version>
</dependency>
```

for convenience, we have created a sample startup project which you can clone. Please visit https://github.com/kureem/visual-javascript-startup 

```bash
git clone https://github.com/kureem/visual-javascript-startup.git

cd visual-javascript-startup

mvn generate-sources

```
### Get Started
```java

package framework.components;

import framework.components.api.EventListener;
import framework.components.api.Renderable;
import jsweet.dom.Event;

public class Main {

	public static void main(String[] args) {

		JSContainer app = new JSContainer("myApp", "div");
		
		JSContainer link = new JSContainer("a");
		link.setAttribute("href", "https://www.google.com");
		link.setHtml("Google");
		link.setStyle("color", "red");
		
		app.addChild(link);
		
		JSContainer button = new JSContainer("button");
		button.setHtml("Click Me");
		button.addEventListener(new EventListener() {
			
			@Override
			public void performAction(Renderable source, Event evt) {
				link.setHtml("Apple");
				link.setAttribute("href", "https://wwww.apple.com");
				app.setRendered(false);
			}
		}, "click");
		
		app.addChild(button);
		
		app.render();
	}
}


```

The project contains a few examples that will help you start using the library.

## License

By default, JSweet candies are published with the Apache 2 Open Source license. Since they are pure APIs, remember that it does not make sense to try to bind a JSweet candy to a commercial license (on contrary to the bridged JS library/framework, which can be distributed under a non-open source license).  
