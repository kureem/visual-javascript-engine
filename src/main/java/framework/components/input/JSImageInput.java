package framework.components.input;

import static jsweet.dom.Globals.console;

import framework.components.JSContainer;
import framework.components.JSUpload;
import framework.components.api.EventListener;
import framework.components.api.InputField;
import framework.components.api.Renderable;
import framework.components.api.ValidationException;
import framework.components.api.Validator;
import framework.components.util.PropertyUtil;
import jsweet.dom.CustomEvent;
import jsweet.dom.Event;
import jsweet.lang.Array;
import jsweet.lang.Object;

public class JSImageInput extends JSContainer implements  InputField<String>{
	
	
	private JSContainer image = new JSContainer("image", "img");
	
	private JSUpload upload = new JSUpload("upload", PropertyUtil.REMOTESERVER + "/resources/upload");
	
	private JSContainer imageContainer = new JSContainer("div");
	
	private Array<Validator<String>> validators = new Array<Validator<String>>();

	public JSImageInput(String name) {
		super(name, "div");
		setAttribute("identifier", "lgt:image-input");
		addClass("slds-image-input");
		addChild(imageContainer);
		imageContainer.addChild(image);
		decorateImage();
		//addChild(image);
		addChild(upload);
		upload.setVisible(false);
		upload.setStyle("position","absolute");
		setStyle("position", "relative");
		upload.addEventListener(new EventListener() {
			
			@Override
			public void performAction(Renderable source, Event evt) {
				
				if(hasListenerOfType("success")){
					fireListener("success", evt);
				}else{
					Object data = (Object)evt.$get("data");
					if(data != null && data.hasOwnProperty("url")){
						String url = (String)data.$get("url");
						setValue(url);
						render();
					}else{
						console.warn("no action taken although upload of image was successfull. You may consider adding a success event to this component");
					}
				}
			}
		}, "success");
		
		upload.addEventListener(new EventListener() {
			
			@Override
			public void performAction(Renderable source, Event evt) {
				fireListener("error", evt);
			}
		}, "error");
	}

	
	public void refreshUploadDir(){
		String dir = getAttribute("uploadDir");
		String name = getName();
		if(dir == null){
			dir = "default";
		}
		upload.setUrl(PropertyUtil.REMOTESERVER +"/resources/upload?dir=" + dir + "&name=" + name);
	}

	
	public JSContainer getImage(){
		return image;
	}
	
	
	public JSImageInput setRequired(boolean b){
		if(b){
			setAttribute("required", "true");
		}else
			setAttribute("required", null);
		return this;
	}

	public JSImageInput setDisabled(boolean b) {
		if (b) {
			setAttribute("disabled", "true");
		} else {
			setAttribute("disabled", null);
		}
		return this;
	}
	
	public JSImageInput setReadOnly(boolean b) {
		if (b) {
			setAttribute("readonly", "true");
		} else {
			setAttribute("readonly", null);
		}
		return this;
	}

		
	public void decorateImage(){
		image.addEventListener(new EventListener() {
			
			@Override
			public void performAction(Renderable source, Event evt) {
				upload.triggerUpload();
			}
		}, "click");
	}

	
	@Override
	public String getValue() {
		return image.getAttribute("src");
	}

	@Override
	public void setValue(String val) {
		if(val == null){
			image.setAttribute("src", getAttribute("default"));
		}else{
			image.setAttribute("src", val);
		}
	}

	@Override
	public void validate() throws ValidationException {
		boolean valid = true;
		ValidationException e = new ValidationException();
		for (Validator<String> v : validators) {

			boolean b = v.validate(this);
			if (!b) {
				valid = false;
				
				ValidationException.addError(v.getErrorMessage(),ValidationException.customError, e);
			}
		}
		
		CustomEvent validate = new CustomEvent("validate");
		validate.$set("errors", e.errors);
		validate.$set("valid", valid);
		validate.$set("source", this);
		fireListener("validate", validate);
		if (!valid) {
			throw e;
		}
		
	}

	@Override
	public String getBinding() {
		return getAttribute("binding");
	}

	@Override
	public InputField<String> setBinding(String binding) {
		setAttribute("binding", binding);
		return this;
	}

	@Override
	public String[] advancedEventTypes() {
		return new String[]{"success", "error"};
	}


	
	
	

}
