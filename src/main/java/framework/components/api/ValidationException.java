package framework.components.api;

import framework.components.input.JSTextInput;
import jsweet.dom.ValidityState;
import jsweet.lang.Array;
import jsweet.lang.Object;

/**
 * Exception used for validation purposes.<br>
 * This exception is thrown by {@link InputField} when performing validation.
 * <br>
 * It has facilities to hold and tranfer error messages and codes in a generic
 * way<br>
 * There is no UI rendering performed by this class. The UI rendering is
 * delegated to the component throwing this exception<br>
 * The component will know better how to display the message
 * 
 * @author Rossaye Abdool Kureem Apr 15, 2018
 *
 */
public class ValidationException extends jsweet.lang.Error {
	
	private int code;

	/**
	 * Is a <code>Numeric</code> indicating the user has provided input that the
	 * browser is unable to convert.
	 */
	public final static int badInput = 0;
	/**
	 * Is a <code>Numeric</code> indicating the element's custom validity
	 * message has been set to a non-empty string by calling the element's
	 * <code>addValidator()</code> method.
	 */
	public final static int customError = 1;
	/**
	 * Is a <code>Numeric</code> indicating the value does not match the
	 * specified <code>pattern</code>.
	 */
	public final static int patternMismatch = 2;
	/**
	 * Is a <code>Numeric</code> indicating the value is greater than the
	 * maximum specified by the <code>max</code> attribute.
	 */
	public final static int rangeOverflow = 3;
	/**
	 * Is a <code>Numeric</code> indicating the value is less than the minimum
	 * specified by the <code>min</code> attribute.
	 */
	public final static int rangeUnderflow = 4;
	/**
	 * Is a <code>Numeric</code> indicating the value does not fit the rules
	 * determined by the <code>step</code> attribute (that is, it's not evenly
	 * divisible by the step value).
	 */
	public final static int stepMismatch = 5;
	/**
	 * Is a <code>Numeric</code> indicating the value exceeds the specified
	 * <code>maxlength</code> for {@link JSTextInput}
	 * component.
	 * <em><strong>Note:</strong> This will never be <code>true</code> in Gecko,
	 * because elements' values are prevented from being longer than
	 * <code>maxlength</code>.</em>
	 */
	public final static int tooLong = 6;
	/**
	 * Is a <code>Numeric</code> indicating the value is not in the required
	 * syntax (when <code>type</code> is <code>email</code> or <code>url</code>
	 * ).
	 */
	public final static int typeMismatch = 7;

	/**
	 * Is a <code>Numeric</code> indicating the element has a
	 * <code>required</code> attribute, but no value.
	 */
	public final static int valueMissing = 8;
	
	/**
	 * Is a <code>Numeric</code> indicating the value less than the specified
	 * <code>minlength</code> for {@link JSTextInput}
	 * component.
	 * <em><strong>Note:</strong> This will never be <code>true</code> in Gecko,
	 * because elements' values are prevented from being shorter than
	 * <code>minlength</code>.</em>
	 */
	public final static int tooShort = 9;

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	public Array<Object> errors = new Array<Object>();


	/**
	 * Constructs an empty validation context
	 */
	public ValidationException() {
		super();
	}
	
	/**
	 * Constructs a new {@link ValidationException} with no error message
	 * 
	 * @param errorCode
	 *            The error code
	 */
	public ValidationException(int errorCode) {
		super();
		this.code = errorCode;
		//ValidationException.addError(""rrorCode,this);
	}

	/**
	 * Constructs an new {@link ValidationException} with the specified message
	 * and code
	 * 
	 * @param message
	 *            The error message to add
	 * @param errorCode
	 *            The error code to add in the context
	 */
	public ValidationException(String message, int errorCode) {
		super(message);
		this.code = errorCode;
		//ValidationException.addError(messagerrorCode,this);
	}
	
	public static void throwError(String msg, int code){
		throw new ValidationException(msg, code);
	}
	
	public static void throwError(String msg, ValidityState state) {
		if (!state.valid) {
			if (state.badInput) {

				ValidationException.throwError(msg, ValidationException.badInput);
			} else if (state.customError) {
				ValidationException.throwError(msg, ValidationException.customError);
			} else if (state.patternMismatch) {
				ValidationException.throwError(msg, ValidationException.patternMismatch);
			} else if (state.rangeOverflow) {
				ValidationException.throwError(msg, ValidationException.rangeOverflow);
			} else if (state.rangeUnderflow) {
				ValidationException.throwError(msg, ValidationException.rangeUnderflow);
			} else if (state.stepMismatch) {
				ValidationException.throwError(msg, ValidationException.stepMismatch);
			} else if (state.tooLong) {
				ValidationException.throwError(msg, ValidationException.tooLong);
			} else if (state.typeMismatch) {
				ValidationException.throwError(msg, ValidationException.typeMismatch);
			} else if (state.valueMissing) {
				ValidationException.throwError(msg, ValidationException.valueMissing);
			}
		}
	}

	

	public int getCode() {
		return code;
	}

}
