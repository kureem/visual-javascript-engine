package framework.components;

import framework.components.api.ContainerRenderer;
import static jsweet.dom.Globals.setTimeout;
import static jsweet.util.Globals.function;
public class Boot {

	public static void main(String[] args) {

		
		
		MonthView table =new MonthView("wv");
		table.reset();
	    setTimeout(function((e)->{
	    	table.render(ContainerRenderer.getElementById("semainetype"));
	    	//table.addItem("09:30", "12:30", "dispo", "Mercredi");
	    	//table.setSemaineType(Util.getSemaineType());
	    	table.render(ContainerRenderer.getElementById("semainetype"));
	    }), 1000 );
	}

}
