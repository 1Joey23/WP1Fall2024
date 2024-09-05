// ASSISTANCE FROM AI

// How to use:
// <script type="module" src="path/to/formUtils.js"></script>

// import { createForm, createTextInput, addSubmitListener } from './formUtils.js';

// // Example usage
// const form = createForm('myForm', '/submit', 'POST');
// const textInput = createTextInput('username', 'Enter your username');
// addFormField(form, textInput);
// document.body.appendChild(form);

// addSubmitListener(form, () => {
//   console.log('Form submitted');
// });



/**
 * Creates a form element with specified id, action, and method.
 * @param {string} id - The id of the form.
 * @param {string} action - The action URL of the form.
 * @param {string} method - The HTTP method of the form.
 * @returns {HTMLFormElement} The created form element.
 */
export function createForm(id, action, method) {
    const form = document.createElement('form');
    form.id = id;
    form.action = action;
    form.method = method;
    return form;
  }
  
  /**
   * Adds a form field to a form.
   * @param {HTMLFormElement} form - The form element.
   * @param {HTMLElement} field - The form field to add.
   */
  export function addFormField(form, field) {
    form.appendChild(field);
  }
  
  /**
   * Creates a text input element with specified name and placeholder.
   * @param {string} name - The name attribute of the input.
   * @param {string} placeholder - The placeholder text of the input.
   * @returns {HTMLInputElement} The created text input element.
   */
  export function createTextInput(name, placeholder) {
    const input = document.createElement('input');
    input.type = 'text';
    input.name = name;
    input.placeholder = placeholder;
    return input;
  }
  
  /**
   * Creates a dropdown (select) element with specified name and options.
   * @param {string} name - The name attribute of the select.
   * @param {Array<{value: string, label: string}>} options - The options for the dropdown.
   * @returns {HTMLSelectElement} The created dropdown element.
   */
  export function createDropdown(name, options) {
    const select = document.createElement('select');
    select.name = name;
    options.forEach(option => {
      const opt = document.createElement('option');
      opt.value = option.value;
      opt.textContent = option.label;
      select.appendChild(opt);
    });
    return select;
  }
  
  /**
   * Adds a field to a form.
   * @param {HTMLFormElement} form - The form element.
   * @param {HTMLElement} field - The field to add.
   */
  export function addField(form, field) {
    form.appendChild(field);
  }
  
  /**
   * Removes a field from a form by its name attribute.
   * @param {HTMLFormElement} form - The form element.
   * @param {string} fieldName - The name attribute of the field to remove.
   */
  export function removeField(form, fieldName) {
    const field = form.querySelector(`[name="${fieldName}"]`);
    if (field) form.removeChild(field);
  }
  
  /**
   * Adds a submit event listener to a form with a custom callback.
   * @param {HTMLFormElement} form - The form element.
   * @param {Function} callback - The callback function to call on submit.
   */
  export function addSubmitListener(form, callback) {
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      callback();
    });
  }
  
  /**
   * Adds real-time validation to an input element.
   * @param {HTMLInputElement} input - The input element to validate.
   * @param {Function} validateFn - The validation function.
   */
  export function addRealTimeValidation(input, validateFn) {
    input.addEventListener('input', function() {
      const isValid = validateFn(input.value);
      // Handle validation feedback here (e.g., update UI)
    });
  }
  
  /**
 * Validates an email address and returns an error message if it's invalid.
 * @param {string} email - The email address to validate.
 * @returns {string} An error message if the email is invalid, otherwise an empty string.
 */
  export function validateEmail(email) {
    // Check for empty input
    if (!email) {
      return 'Email address cannot be empty.';
    }

    // Check for basic format
    const formatRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formatRe.test(email)) {
      return 'Invalid email address format. Must be in format name@example.com';
    }

    // Check for valid domain
    const domainRe = /@([^\s@]+\.[^\s@]+)$/;
    const domainMatch = email.match(domainRe);
    if (domainMatch && domainMatch[1].split('.').length < 2) {
      return 'Invalid domain in email address. Must include a valid domain.';
    }

    // Check for valid local part (before the @ symbol)
    const localPart = email.split('@')[0];
    if (localPart.length > 64) {
      return 'Local part of the email address is too long. Must be 64 characters or fewer.';
    }

    // If all checks pass
    return '';
  }

  /**
 * Checks the strength of a password and returns an error message if it's invalid.
 * @param {string} password - The password to check.
 * @returns {string} An error message if the password is invalid, otherwise an empty string.
 */
export function checkPasswordStrength(password) {
  // Check for at least two special characters
  const specialCharCount = (password.match(/[^a-zA-Z0-9]/g) || []).length;
  if (specialCharCount < 2) {
    return 'Password must include at least two special characters.';
  }

  // Check for sequential characters or numbers
  const sequentialPattern = /(012|123|234|345|456|567|678|789|890|abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|wxy|xyz|1234|2345|3456|4567|5678|6789|7890)/;
  if (sequentialPattern.test(password)) {
    return 'Password must not contain sequential characters or letters.';
  }

  // Check for more than two repeating characters/numbers in a row
  const repeatingPattern = /(.)\1{2,}/;
  if (repeatingPattern.test(password)) {
    return 'Password must not contain more than two repeating characters or numbers in a row.';
  }

  // Check for at least one digit
  if (!/(?=.*\d)/.test(password)) {
    return 'Password must include at least one digit.';
  }

  // Check for at least one lowercase letter
  if (!/(?=.*[a-z])/.test(password)) {
    return 'Password must include at least one lowercase letter.';
  }

  // Check for at least one uppercase letter
  if (!/(?=.*[A-Z])/.test(password)) {
    return 'Password must include at least one uppercase letter.';
  }

  // Check for length between 6 and 20 characters
  if (!/^.{6,20}$/.test(password)) {
    return 'Password must be between 6 and 20 characters long.';
  }

  return ''; // Password is valid
}

  /**
   * Validates if a field is required.
   * @param {string} value - The value to check.
   * @returns {boolean} True if the field is filled, otherwise false.
   */
  export function validateRequired(value) {
    if (value === undefined || value === null || value === '') {
      return false; // Invalid input
    } else {
      return true; // Valid input
    }
  }
  
  /**
   * Validates a value with a custom regex.
   * @param {string} value - The value to validate.
   * @param {RegExp} regex - The regex to use for validation.
   * @returns {boolean} True if the value matches the regex, otherwise false.
   */
  export function validateWithRegex(value, regex) {
    return regex.test(value);
  }
  
  /**
 * Validates that the date string is in the correct YYYY-MM-DD format.
 * @param {string} date - The date string to validate.
 * @returns {boolean} True if the date is in valid YYYY-MM-DD format, false otherwise.
 */
  export function validateDateFormat(date) {
    // Regular expression to match the date format YYYY-MM-DD
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(date);
  }

  /**
   * Submits form data asynchronously.
   * @param {HTMLFormElement} form - The form to submit.
   * @param {string} url - The URL to submit the form data to.
   * @returns {Promise<void>} A promise that resolves when the submission is complete.
   */
  export async function submitForm(form, url) {
    const formData = new FormData(form);
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData
      });
      if (response.ok) {
        const result = await response.json();
        // Handle success response
      } else {
        // Handle error response
      }
    } catch (error) {
      // Handle network errors
    }
  }
  
  /**
   * Formats a phone number as (123) 456-7890.
   * @param {string} number - The phone number to format.
   * @returns {string} The formatted phone number.
   */
  export function formatPhoneNumber(number) {
    return number.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  }
  
  /**
   * Capitalizes the first letter of each word in a name.
   * @param {string} name - The name to capitalize.
   * @returns {string} The capitalized name.
   */
  export function capitalizeName(name) {
    return name.replace(/\b\w/g, char => char.toUpperCase());
  }
  
  /**
 * Formats a date to YYYY-MM-DD.
 * @param {string} date - The date string in YYYY-MM-DD format.
 * @returns {string} The formatted date in YYYY-MM-DD or an error message if invalid.
 */
  export function formatDate(date) {
    if (!validateDateFormat(date)) {
        return 'Invalid date format. Use YYYY-MM-DD.';
    }

    let [year, month, day] = date.split('-');

    // Ensure the year, month, and day are numbers and correctly padded with leading zeros
    year = year.padStart(4, '0'); // Ensures the year is at least 4 digits
    month = month.padStart(2, '0'); // Ensures the month is 2 digits
    day = day.padStart(2, '0'); // Ensures the day is 2 digits

    // Check if the date is valid
    if (isNaN(year) || isNaN(month) || isNaN(day) || 
        parseInt(month) < 1 || parseInt(month) > 12 ||
        parseInt(day) < 1 || parseInt(day) > 31) {
        return 'Invalid date components. Please use a valid date.';
    }

    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  }
  
  /**
   * Displays an error message next to a form field.
   * @param {HTMLElement} field - The form field.
   * @param {string} message - The error message to display.
   */
  export function displayErrorMessage(field, message) {
    let error = field.nextElementSibling;
    if (!error || !error.classList.contains('error-message')) {
      error = document.createElement('span');
      error.className = 'error-message';
      field.parentNode.insertBefore(error, field.nextSibling);
    }
    error.textContent = message;
  }
  
  /**
   * Clears the error message next to a form field.
   * @param {HTMLElement} field - The form field.
   */
  export function clearErrorMessage(field) {
    const error = field.nextElementSibling;
    if (error && error.classList.contains('error-message')) {
      error.textContent = '';
    }
  }
  