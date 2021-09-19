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

public enum InputType {
	
	BUTTON("button", "button"),
	CHECKBOX("checkbox", "boolean"),
	DATE("date", "date"),
	DATETIME_LOCAL("datetime-local","date"),
	FILE("file", "file"),
	HIDDEN("hidden", "text"),
	IMAGE("image", "image"),
	MONTH("month", "date"),
	NUMBER("number", "number"),
	RADIO("radio", "boolean"),
	RANGE("range", "number"),
	RESET("reset", "button"),
	SUBMIT("submit", "button"),
	TIME("time","date"),
	WEEK("week","date"),
	TEXT("text"),
	PASSWORD("password"),
	EMAIL("email"),
	URL("url"),
	SEARCH("search"),
	TEL("tel"),
	COLOR("color")
	
	
	
	
	;
	
	private String value;
	
	private String group = "text";

	
	private InputType(String value) {
		this.value = value;
		this.group = "text";
	}
	
	private InputType(String value, String group) {
		this.value = value;
		this.group = group;
	}
	
	public String getValue() {
		return this.value;
	}
	
	public String getGroup() {
		return this.group;
	}
	
		
}


/**
 * 
 *public enum ScreenSize {
		NORMAL(""),
		SMALL("sm"),
		MEDIUM("md"),
		LARGE("lg"),
		EXTRA_LARGE("xl"),
		EXTRA_EXTRA_LARGE("xxl"),
		;
		
		
		private String value;
		
		private ScreenSize(String value) {
			this.value = value;
		}
		
		public String getValue() {
			return this.value;
		}

	} 
 */
