package framework.components;

public class FileUploader {

	/*public Promise<Object> uploadFile(String url, FormData formData) {

		return new Promise<Object>((Consumer<Object> resolve, Consumer<Object> reject) -> {
			
			
			JQueryAjaxSettings settings = new JQueryAjaxSettings() {
				@Override
				public java.lang.Object error(JQueryXHR jqXHR, String textStatus, String errorThrown) {
					//callback.error(errorThrown, jqXHR.status);
				
					reject.accept(errorThrown);
					return null;
				}

				@Override
				public java.lang.Object success(java.lang.Object data, String textStatus, JQueryXHR jqXHR) {
					
					resolve.accept(data);
					//callback.consume(data, jqXHR.status);
					return null;
				}
			};

			settings.type = "POST";

			settings.data = formData;
			settings.url = url;
			settings.processData = false;
			settings.contentType = false;
			settings.$set("enctype", "multipart/form-data");
			settings.cache= false;
			$.ajax(settings);
			
			
		});*/
		
		
		

	//}

}
