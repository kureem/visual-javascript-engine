package framework.components.util;

import jsweet.lang.Object;

public class PropertyUtil {
	
	public static boolean DOCUMENT_STRCTURE_HIDE_CONTEXT_MENU_ADDED=false;
	
	public final static String REMOTESERVER = "";
	
	public static Object getValue(Object obj, String property){
		if(obj == null){
			return null;
		}
			
		String[]parts = property.split(".");
		Object tmp = obj;
		for(String part :  parts){
			tmp = getValue(tmp, part);
		}
		return tmp;
			
	}
	
	
	public static boolean hasOwnProperty(Object obj, String property){
		if(property.contains(".")){
			String[] keys = property.split(".");
			Object tmp = obj;
			for(int i = 0; i < keys.length-1;i++){
				if(!tmp.hasOwnProperty(keys[i])){
					//tmp.$set(keys[i], new Object());
					return false;
				}
				tmp = (Object)tmp.$get(keys[i]);
			}
			
			return tmp.hasOwnProperty(keys[keys.length-1]);
		}else{
			return obj.hasOwnProperty(property);
		}
	}
	
	public static void setValue(Object obj, Object value, String property){
		if(obj == null){
			throw new Error("cannot set  property " + property  + " to undefined");
		}
		//a.b.c = 25
		/*
		 * spoon.senior.address.line1 
		 * 
		 * {
		 * 	"spoon":{
		 * 			"senior":{
		 * 					"firstName":'Rossaye',
		 * 					"lastName" :'Kureem'
		 * 					"address"  :{
		 * 									line1:"R.Tagore Avenue",
		 * 									line2:"Mesnil"
		 * 								}
		 * 						  
		 * 				}
		 * 			,
		 * 			"confirmed":{
		 * 					"firstName":'Rossaye',
		 * 					"lastName" :'Kureem'
		 * 					"address"  :{
		 * 									line1:"R.Tagore Avenue",
		 * 									line2:"Mesnil"
		 * 								}
		 * 							
		 * 			}
		 * 		}
		 * }
		 * 
		 * spoon.confirmed.address.line1
		 */
		if(property.contains(".")){
			String[] keys = property.split(".");
			Object tmp = obj;
			for(int i = 0; i < keys.length -1;i++){
				if(!tmp.hasOwnProperty(keys[i])){
					tmp.$set(keys[i], new Object());
				}
				tmp = getValue(tmp, keys[i]);
			}
			setValue(tmp, value, keys[keys.length-1]);
		}else{
			obj.$set(property, value);
		}
	}
	
	
	/**
	 * Parse a hash string building an object of parameters<br>
	 * e.g. #customer?username=foo&amp;password=bar&amp;name=alice<br>
	 * will return a map
	 * <pre>
	 * 	{
	 * 		"username":"foo",
	 * 		"password":"bar",
	 * 		"name":"alice"
	 * 	}
	 * </pre>
	 * @param hash The query string to parse
	 * @return The object created based on query string
	 */
	public static Object getQuery(String hash){
		Object result = new Object();
		if(hash.contains("?")){
			String[] kvs = hash.split("?")[1].split("&");
			for(String kv : kvs){
				String[] akv = kv.split("=");
				result.$set(akv[0], akv[1]);
			}
		}
		return result;
	}

}
