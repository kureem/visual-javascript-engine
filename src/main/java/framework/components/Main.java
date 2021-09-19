package framework.components;
import static jsweet.dom.Globals.console;

import framework.components.api.EventListener;
import framework.components.api.Renderable;
import jsweet.dom.Event;
import jsweet.lang.JSON;
public class Main {

	public static void main(String[] args) {
		
		
		JSContainer main = new JSContainer("div");
		
		
		JSContainer eventLogs = new JSContainer("eventLogs", "div");
		main.addChild(eventLogs);
		

		CardLayout cardLayout = new CardLayout("cards", "div");
		main.addChild(cardLayout);
		
		JSContainer buttons = new JSContainer("div");
		main.addChild(buttons);
		
		Button first = new Button("first", "<<");
		Button previous = new Button("previous", "<");
		Button next =new Button("next", ">");
		Button last = new Button("last", ">>");
		
		buttons.addChild(first).addChild(previous).addChild(next).addChild(last);
		first.addEventListener(new EventListener() {
			
			@Override
			public void performAction(Renderable source, Event evt) {
				jsweet.lang.Object param = new jsweet.lang.Object();
				param.$set("method", "first");
				cardLayout.first(param);
			}
		}, "click");
		
		previous.addEventListener(new EventListener() {
			
			@Override
			public void performAction(Renderable source, Event evt) {
				jsweet.lang.Object param = new jsweet.lang.Object();
				param.$set("method", "previous");
				cardLayout.previous(param);
			}
		}, "click");
		
		next.addEventListener(new EventListener() {
			
			@Override
			public void performAction(Renderable source, Event evt) {
				jsweet.lang.Object param = new jsweet.lang.Object();
				param.$set("method", "next");
				cardLayout.next(param);
			}
		}, "click");
		
		last.addEventListener(new EventListener() {
			
			@Override
			public void performAction(Renderable source, Event evt) {
				jsweet.lang.Object param = new jsweet.lang.Object();
				param.$set("method", "last");
				cardLayout.last(param);
			}
		}, "click");
		
		for(int i = 1; i <= 3; i++ ) {
			CardLayoutItem item = new CardLayoutItem("item-" +i, "div");
			item.setStyle("border", "solid 1px silver").setStyle("width", "200px").setStyle("height", "200px");
			item.addChild(new JSContainer("h1").setHtml("I am Item number " + i ));
			cardLayout.addItem(item);
			item.addEventListener(new EventListener() {
				
				@Override
				public void performAction(Renderable source, Event evt) {
					item.addChild(new JSContainer("p").setHtml("I am being activated"));
					eventLogs.addChild(new JSContainer("p").setHtml(source.getName() + " is being activated" ));
				}
			}, "activate");
			
			item.addEventListener(new EventListener() {
				
				@Override
				public void performAction(Renderable source, Event evt) {
					item.addChild(new JSContainer("p").setHtml("I am being deactivated"));
					eventLogs.addChild(new JSContainer("p").setHtml(source.getName() + " is being deactivated" ));
				}
			}, "deactivate");
			
			
			item.addEventListener(new EventListener() {
				
				@Override
				public void performAction(Renderable source, Event evt) {
					item.addChild(new JSContainer("p").setHtml("I am being validated"));
					eventLogs.addChild(new JSContainer("p").setHtml(source.getName() + " is being validated" ));
				}
			}, "validate");
		}
		
		
		
		cardLayout.addEventListener(new EventListener() {
			
			@Override
			public void performAction(Renderable source, Event evt) {
				//triggered when next method is called in container.
				//but before,the validate event is triggered
				//if valid attribute is set to false in validate event, this event will not be triggered,
				console.log(evt.$get("from"));
				console.log(evt.$get("to"));
				console.log(evt.$get("source"));
				console.log(evt.$get("dest"));
				eventLogs.addChild(new JSContainer("p").setHtml("next is being triggered on " + source.getName() ));
			}
		}, "next");
		
		cardLayout.addEventListener(new EventListener() {
			
			@Override
			public void performAction(Renderable source, Event evt) {
				//triggered when previous method is called in container.
				//activate and deactivate events are triggered if there is a change in current active item<br>
				//before this event is triggered
				console.log(evt.$get("from"));
				console.log(evt.$get("to"));
				console.log(evt.$get("source"));
				console.log(evt.$get("dest"));
				eventLogs.addChild(new JSContainer("p").setHtml("previous is being triggered on " + source.getName() ));
			}
		}, "previous");
				
		
		cardLayout.addEventListener(new EventListener() {
			
			@Override
			public void performAction(Renderable source, Event evt) {
				//triggered when the first method is called in container
				console.log(evt.$get("from"));
				console.log(evt.$get("to"));
				console.log(evt.$get("source"));
				console.log(evt.$get("dest"));
				eventLogs.addChild(new JSContainer("p").setHtml("first is being triggered on " + source.getName() ));
			}
		}, "first");
		
		
		cardLayout.addEventListener(new EventListener() {
			
			@Override
			public void performAction(Renderable source, Event evt) {
				//triggered when last method is called in container
				console.log(evt.$get("from"));
				console.log(evt.$get("to"));
				console.log(evt.$get("source"));
				console.log(evt.$get("dest"));
				eventLogs.addChild(new JSContainer("p").setHtml("last is being triggered on " + source.getName() ));
			}
		}, "last");
		
		cardLayout.refresh();
		
		main.render();
	}
	
	


}
