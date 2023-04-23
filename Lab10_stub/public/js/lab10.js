// In this file, you must perform all client-side validation for every single form input (and the role dropdown) on your pages. The constraints for those fields are the same as they are for the data functions and routes. Using client-side JS, you will intercept the form's submit event when the form is submitted and If there is an error in the user's input or they are missing fields, you will not allow the form to submit to the server and will display an error on the page to the user informing them of what was incorrect or missing.  You must do this for ALL fields for the register form as well as the login form. If the form being submitted has all valid data, then you will allow it to submit to the server for processing. Don't forget to check that password and confirm password match on the registration form!
let loginForm = document.getElementById("form-login");
let signupForm = document.getElementById("registration-form");
if (loginForm) {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    let error = [];
    let email = document.getElementById("emailAddressInput");
    let password = document.getElementById("passwordInput");
    let error_client = document.getElementById("error-client");
    error_client.hidden = true;
    error_client.innerHTML = "";
    if (!checkMail(email.value))
      error.push(`Expected Email id to be of proper form`);
    if (!password || !checkPassword(password.value))
      error.push(
        `Expected Password to atleast 8 character and contain one uppercase one lowercase one digit and one special character`
      );

    if (error.length > 0) {
      error_client.hidden = false;
      let ul = document.createElement("ul");
      error.forEach((err) => {
        let li = document.createElement("li");
        li.innerHTML = err;
        ul.appendChild(li);
      });
      error_client.appendChild(ul);
      error_client.innerHTML += `</ul>`;
    } else {
      loginForm.submit();
    }
  });
}

if (signupForm) {
  signupForm.addEventListener("submit", function (event) {
    event.preventDefault();
    let error = [];
    let firstName = document.getElementById("firstNameInput");
    let lastName = document.getElementById("lastNameInput");
    let email = document.getElementById("emailAddressInput");
    let password = document.getElementById("passwordInput");
    let confirmPassword = document.getElementById("confirmPasswordInput");
    let role = document.getElementById("roleInput");
    let error_client = document.getElementById("error-client");
    error_client.hidden = true;
    error_client.innerHTML = "";
    if (!checkName(firstName.value) || !checkName(lastName.value))
      error.push(`Expected First Name and Last Name`);
    if (!checkMail(email.value))
      error.push(`Expected Email id to be of proper form`);
    if (!password || !checkPassword(password.value))
      error.push(
        `Expected Password to atleast 8 character and contain one uppercase one lowercase one digit and one special character`
      );
    if (!confirmPassword || !checkPassword(confirmPassword.value))
      error.push(`Expected Password in Confirm Password field`);

    if (password.value.trim() !== confirmPassword.value.trim())
      error.push(`Password donot match please check them`);
    if (role.value === "none") error.push(`Please select role from drop down`);
    if (error.length > 0) {
      error_client.hidden = false;
      let ul = document.createElement("ul");
      error.forEach((err) => {
        let li = document.createElement("li");
        li.innerHTML = err;
        ul.appendChild(li);
      });
      error_client.appendChild(ul);
    } else {
      signupForm.submit();
    }
  });
}

function checkMail(emailid) {
  emailid = emailid.trim().toLowerCase();
  let regex = /^[\w._%+-]+(@[a-z]+\.com)$/;
  return regex.test(emailid);
}

function checkName(name) {
  name = name.trim().toLowerCase();
  let regex = /^[a-zA-Z]{2,25}$/;
  return regex.test(name);
}

function checkPassword(password) {
  password = password.trim();
  let regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/;
  return regex.test(password);
}
