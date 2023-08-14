/*
 * Copyright 2002-2018 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package framework.components.api;

/**
 * All components which allows a user to input a value implements this interface.<br>
 * This interface defines methods that allows setting and retrieving values 
 * @author Kureem Rossaye
 *
 * @param <T> - The type of value store by this field
 */
public interface InputField<T> extends Renderable{

	/**
	 * Returns the value entered
	 * @return The value entered
	 */
	public T getValue();
	
	/**
	 * Sets the value to the component
	 * @param val The value to set
	 */
	public void setValue(T val);
	
	/**
	 * Validates the value entered
	 * @throws ValidationException Exception throws if the value is not valid
	 */
	public void validate()throws ValidationException;
	
	/**
	 * This returns a key to which the value can be bound.
	 * @return The binding key
	 */
	public String getBinding();
	
	/**
	 * Sets the binding key to which the value can be bound
	 * @param binding The binding key
	 * @return The new state of this component
	 */
	public InputField<T> setBinding(String binding);
	
	/**
	 * Makes the field required or not
	 * @param b required or not
	 * @return The new state of this component
	 */
	public InputField<T> setRequired(boolean b);
	 
}
 