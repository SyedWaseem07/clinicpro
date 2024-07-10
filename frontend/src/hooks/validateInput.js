function validateInput(name, mobile, age) {
  // Regular expressions
  const nameRegex = /^[A-Za-z]{3,}\s[A-Za-z]{3,}$/;
  const mobileRegex = /^\d{10}$/;
  const ageRegex = /^\d{1,3}$/;

  // Validate name
  if (!nameRegex.test(name)) {
    return 1; // Name is invalid
  }

  // Validate mobile
  if (!mobileRegex.test(mobile)) {
    return 2; // Mobile is invalid
  }

  // Validate age
  if (!ageRegex.test(age)) {
    return 3; // Age is invalid
  }

  // All inputs are valid
  return 0;
}

export function validateString(inputString) {
  // Regular expression to match strings containing at least 3 letters
  const regex = /^[^a-zA-Z]*([a-zA-Z][^a-zA-Z]*){3,}$/;

  // Test the input string against the regex
  if (regex.test(inputString)) {
    return 0; // Return 0 if the string contains at least 3 letters
  } else {
    return 1; // Return 1 if the string does not contain at least 3 letters
  }
}
export default validateInput

export function validateProfileInputs(username, fullname, email, mobile, password, confirmPassword) {
  const errors = {
    username: 0,
    fullname: 0,
    email: 0,
    mobile: 0,
    password: 0,
    confirmPassword: 0,
    arePasswordSame: 0
  };

  if (username.length < 3) {
    errors.username = 1;
  }

  // Validate fullname (firstname and lastname, each at least 3 characters)
  const fullnameRegex = /^[A-Za-z]{3,}\s[A-Za-z]{3,}$/;
  if (!fullnameRegex.test(fullname)) {
    errors.fullname = 1; // Fullname must be in "Firstname Lastname" format with each name at least 3 characters
  }

  // Validate email (simple regex for demonstration purposes)
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    errors.email = 1; // Invalid email format
  }

  // Validate mobile (assuming a simple numeric check for 10 digits)
  const mobileRegex = /^\d{10}$/;
  if (!mobileRegex.test(mobile)) {
    errors.mobile = 1; // Invalid mobile number
  }

  // Validate password
  const passwordRegex = /^(?=.*[A-Z])(?=.*\W).{6,}$/;
  if (!passwordRegex.test(password)) {
    errors.password = 1; // Password must be at least 6 characters, with at least one uppercase letter and one special character
  }

  if (!passwordRegex.test(confirmPassword)) {
    errors.confirmPassword = 1;
  }

  if (password !== confirmPassword) errors.arePasswordSame = 1;

  return errors;
}


