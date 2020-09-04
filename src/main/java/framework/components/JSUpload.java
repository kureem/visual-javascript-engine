package framework.components;

import framework.components.api.EventListener;
import framework.components.api.InputField;
import framework.components.api.Renderable;
import framework.components.api.ValidationException;
import jsweet.dom.CustomEvent;
import jsweet.dom.Event;
import jsweet.dom.FormData;
import jsweet.dom.HTMLFormElement;
import jsweet.lang.Object;

/**
 * This component renders an input component of type file. It provides a mechism to upload a file<br>
 * 
 * @author Rossaye Abdool Kureem
 *
 */
public class JSUpload extends JSTemplateContainer implements EventListener, InputField<jsweet.lang.Object> {

	
	private JSContainer label = new JSContainer("label","label");
	
	private JSContainer input = new JSContainer("uploadfile", "input");
	
	
	private FileUploader uploader = new FileUploader();
	
	private boolean required = false;
	
	
	
	/**
	 * Create a new instance of this component
	 * @param name The name of the component
	 * @param url The url where to submit uploaded file
	 */
	public JSUpload(String name,String template, String url) {
		super(name,template);
		setCompiled(true);
		
		addChild(label);
		input.setAttribute("type", "file").setAttribute("accept", "*");
		
		label.setHtml("Upload File:");
		input.addEventListener(this, "change");
		input.addClass("slds-input");
		addChild(input);
		this.setAttribute("url", url);
		
	}
	
	
	public JSUpload(String name, String url) {
		this(name, "<form>\n" + 
				"	<div name=\"label\"></div>\n" + 
				"	<div name=\"uploadfile\"></div>\n" + 
				"</form>",url);
	}
	
	/**
	 * Manually opens native dialog box to select file to upload
	 */
	public void triggerUpload(){
		input.getNative().click();
	}
	
	/*
	 * (non-Javadoc)
	 * @see framework.JSContainer#advancedEventTypes()
	 */
	@Override
	public String[] advancedEventTypes() {
		return new String[]{"success", "error"};
	}


	/**
	 * Sets a label to this component
	 * @param label The label of the component
	 */
	public void setLabel(String label){
		this.label.setHtml(label);
	}
	
	/**
	 * Sets the accepts mimetypes for this component
	 * @param accepts Mime types allowed to upload (e.g image/jpg, image/png, text/html etc)
	 */
	public void setAccepts(String accepts){
		input.setAttribute("accept", accepts);
	}


	/*
	 * (non-Javadoc)
	 * @see framework.EventListener#performAction(framework.JSContainer, jsweet.dom.Event)
	 */
	@Override
	public void performAction(Renderable source, Event ev) {
		/*
		 * uploader.uploadFile(getAttribute("url"), new FormData((HTMLFormElement)
		 * getNative())).then((d)->{ CustomEvent evt = new CustomEvent("error");
		 * evt.$set("data",d); evt.$set("source", this); fireListener("success", evt);
		 * 
		 * }).Catch((e)->{ CustomEvent evt = new CustomEvent("error");
		 * evt.$set("err",e); evt.$set("source", this); fireListener("error", evt); });
		 */
		
	}

	/**
	 * Sets the server url where to submit file to uplaod
	 * @param url Url where to submit file to upload
	 */
	public void setUrl(String url){
		setAttribute("url", url);
	}
	
	/**
	 * Synonymous to setUrl
	 * @param url The url where to submit file to upload
	 */
	public void setEndpoint(String url){
		setUrl(url);
	}


	@Override
	public Object getValue() {
		return null;
	}


	@Override
	public void setValue(Object val) {
		
	}


	@Override
	public void validate() throws ValidationException {
		
	}


	@Override
	public String getBinding() {
		return getAttribute("binding");
	}


	@Override
	public InputField<Object> setBinding(String binding) {
		setAttribute("binding", binding);
		return this;
	}


	@Override
	public InputField<Object> setRequired(boolean b) {
		this.required = b;
		return this;
	}


	public FileUploader getUploader() {
		return uploader;
	}


	public void setUploader(FileUploader uploader) {
		this.uploader = uploader;
	}


	public JSContainer getLabel() {
		return label;
	}


	public JSContainer getInput() {
		return input;
	}


	public boolean isRequired() {
		return required;
	}

	
	
}
