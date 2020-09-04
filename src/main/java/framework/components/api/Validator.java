package framework.components.api;

public interface Validator<T> {

	public boolean validate(InputField<T> source);
	
	public String getErrorMessage();
	
	public String getSuccessMessage();
	
	public void supports(Class<T> clazz);
}
