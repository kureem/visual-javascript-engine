package framework.components;

import static def.jquery.Globals.$;
import static jsweet.lang.Globals.parseFloat;

import def.jquery.JQueryAjaxSettings;
import def.jquery.JQueryAjaxSettings.Headers;
import def.jquery.JQueryXHR;
import jsweet.dom.CustomEvent;
import jsweet.lang.JSON;

public class RestWebservice extends JSContainer {
	

	public RestWebservice() {
		this("rw");
	}
	
	public RestWebservice(String name) {
		super(name);
		setAttribute("method", "GET");
		setAsync(true);
	}

	@Override
	public String[] advancedEventTypes() {
		return new String[] { "success", "error", "beforeSend", "complete" };
	}

	public boolean isSet(String prop){
		if(getAttribute(prop) != null && getAttribute(prop).length()  > 0){
			return true;
		}else{
			return false;
		}
	}
	
	public String getAccepts(){
		return getAttribute("accepts");
	}
	
	public void setAccepts(String accepts) {
		setAttribute("accepts", accepts);
	}

	public void setDataType(String dataType) {
		setAttribute("dataType", dataType);
	}
	
	public String getDataType() {
		return getAttribute("dataType");
	}

	public void setContentType(String contentType) {
		setAttribute("contentType", contentType);
	}
	
	public String getContentType() {
		return getAttribute("contentType");
	}
	
	public boolean getBoolean(String prop){
		return "true".equals(getAttribute(prop));
	}

	public void setAsync(boolean b) {
		setAttribute("async", b ? "true" : "false");
	}

	public boolean getAsync() {
		return getBoolean("async");
	}
	
	public void setCache(Boolean b) {
		setAttribute("cache", b ? "true" : "false");
	}

	public Boolean getCache() {
		return getBoolean("cache");
	}
	
	public void setCrossDomain(Boolean b) {
		setAttribute("crossDomain", b ? "true" : "false");
	}

	public Boolean getCrossDomain() {
		return getBoolean("crossDomain");
	}
	
	public void setIfModified(Boolean b) {
		
		setAttribute("ifModified", b ? "true" : "false");
	}

	public Boolean getIfModified() {
		return getBoolean("ifModified");
	}
	
	public void setProcessData(Boolean b) {
		setAttribute("processData", b ? "true" : "false");
	}
	
	public Boolean getProcessData() {
		return getBoolean("processData");
	}

	public void setScriptCharset(String charset) {
		setAttribute("scriptCharset", charset);
	}

	public String getScriptCharset() {
		return getAttribute("scriptCharset");
	}
	
	public void setUsername(String username) {
		setAttribute("username", username);
	}

	public String getUsername() {
		return getAttribute("username");
	}
	
	public void setMimeType(String mimetype) {
		setAttribute("mimeType", mimetype);
	}

	public String getMimeType() {
		return getAttribute("mimeType");
	}
	
	public void setPassword(String password) {
		setAttribute("password", password);
	}

	public String getPassword() {
		return getAttribute("password");
	}
	
	public void setTraditional(Boolean b) {
		setAttribute("traditional", b ? "true" : "false");
	}
	
	public Boolean getTraditional() {
		return getBoolean("traditional");
	}

	public void setTimeout(double timeout) {
		setAttribute("timeout", timeout + "");
	}
	
	public double getTimeout() {
		return parseFloat(getAttribute("timeout"));
	}

	public void setUrl(String url) {
		setAttribute("url", url);
	}
	
	public String getUrl() {
		return getAttribute("url");
	}

	public void addHeader(String key, String value) {
		String headers = getAttribute("headers");
		jsweet.lang.Object obj = (jsweet.lang.Object) JSON.parse(headers);
		obj.$set(key, value);
		setAttribute("headers", JSON.stringify(obj));
	}
	
	public Headers getHeaders(){
		String headers = getAttribute("headers");
		Object obj =  JSON.parse(headers);
		return (Headers)obj;
	}
	
	public Object getData(){
		return JSON.parse(getAttribute("data"));
	}
	
	public void setData(Object data){
		if(data instanceof String)
			setAttribute("data", (String)data);
		else
			setAttribute("data", JSON.stringify(data));
	}
	
	public void setMethod(String method){
		setAttribute("method", method);
	}
	
	public String getMethod(){
		return getAttribute("method");
	}

	public void execute() {
		//String url = getAttribute("url");
		//String method = getAttribute("method");
		if (isSet("url")) {
			

			JQueryAjaxSettings settings = new JQueryAjaxSettings() {
				@Override
				public java.lang.Object error(JQueryXHR jqXHR, String textStatus, String errorThrown) {
					CustomEvent evt = new CustomEvent("error");
					evt.$set("error", errorThrown);
					evt.$set("source", this);
					evt.$set("xhr", jqXHR);
					fireListener("error", evt);
					getRoot().render();
					return null;
				}

				@Override
				public java.lang.Object success(java.lang.Object data, String textStatus, JQueryXHR jqXHR) {
					CustomEvent evt = new CustomEvent("success");
					evt.$set("data", data);
					evt.$set("status", textStatus);
					evt.$set("source", this);
					evt.$set("xhr", jqXHR);
					fireListener("success", evt);
					getRoot().render();
					return null;
				}

				@Override
				public java.lang.Object complete(JQueryXHR jqXHR, String textStatus) {
					CustomEvent evt = new CustomEvent("complete");

					evt.$set("status", textStatus);
					evt.$set("source", this);
					evt.$set("xhr", jqXHR);
					fireListener("complete", evt);
					
					getRoot().render();
					return null;
				}

				@Override
				public Object beforeSend(JQueryXHR jqXHR, JQueryAjaxSettings settings) {
					CustomEvent evt = new CustomEvent("beforeSend");
					evt.$set("source", this);
					evt.$set("settings", settings);
					evt.$set("xhr", jqXHR);
					fireListener("beforeSend", evt);
					
					getRoot().render();
					return null;
				}
			};

			//settings.type = method;
			if(isSet("accepts"))
				settings.accepts = getAccepts();
			
			if(isSet("async"))
				settings.async = getAsync();
			
			if(isSet("cache"))
				settings.cache = getCache();
			
			if(isSet("contentType"))
				settings.contentType = getContentType();
			
			if(isSet("crossDomain"))
				settings.crossDomain = getCrossDomain();
			
			if(isSet("dataType"))
				settings.dataType = getDataType();
			
			if(isSet("ifModified"))
				settings.ifModified = getIfModified();
			
			if(isSet("method"))
				settings.method = getMethod();
			
			if(isSet("mimeType"))
				settings.mimeType = getMimeType();
			
			if(isSet("password"))
				settings.password = getPassword();
			
			if(isSet("processData"))
				settings.processData = getProcessData();
			
			if(isSet("scriptCharset"))
				settings.scriptCharset = getScriptCharset();
			
			if(isSet("timeout"))
				settings.timeout = getTimeout();
			
			if(isSet("traditional"))
				settings.traditional = getTraditional();
			
			if(isSet("type"))
				settings.type = getMethod();
			
			if(isSet("url"))
				settings.url = getUrl();
			
			if(isSet("username"))
				settings.username = getUsername();
			
			if(isSet("headers"))
				settings.headers = getHeaders();
			
			if(isSet("data"))
				settings.data = getData();
			
			$.ajax(settings);

		}
	}

	
}
