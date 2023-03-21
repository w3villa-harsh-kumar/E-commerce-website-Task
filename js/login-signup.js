// Description: This file contains the login and signup functionality
// Author: Harsh Kumar
// Date: 10/10/2021
// Version: 1.0

// Variables
let signup = document.getElementById("signup");
let login = document.getElementById("login-link");
let welcomeText = document.getElementById("welcome-text");
let loginContainer = document.getElementById("login-container");
let signUpContainer = document.getElementById("signup-container");

// Hide Login Container
function getSignUpPage() {
  loginContainer.classList.toggle("flip-login");
  setTimeout(() => {
    loginContainer.classList.add("display-none");
    signUpContainer.classList.add("display-flex");
    signUpContainer.classList.remove("flip-signup");
  }, 1000);
  welcomeText.innerHTML = `
        <div class="heading">Welcome!</div>
                <div class="text">
                    Enter your personal details and start your journey with us today.
                </div>`;
}

// Hide Sign Up Container
function getLoginPage() {
  signUpContainer.classList.toggle("flip-signup");
  setTimeout(() => {
    loginContainer.classList.remove("display-none");
    signUpContainer.classList.remove("display-flex");
    loginContainer.classList.remove("flip-login");
  }, 1000);
  welcomeText.innerHTML = `
        <div class="heading">Welcome Back!</div>
          <div class="text">
            To keep connected with us please login with your personal info.
          </div>`;
}

// Event Listeners
signup.addEventListener("click", () => {
  getSignUpPage();
});

login.addEventListener("click", () => {
  getLoginPage();
});

// Redirect to the page from the index page
function redirectedToPage() {
  let page = localStorage.getItem("redirectPage");

  // if user is already logged in
  let loggedUserId = localStorage.getItem("loggedUserId");
  if (loggedUserId) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "You are already logged in!",
      confirmButtonColor: "#4285f4",
      confirmButtonText: "Ok",
    }).then(() => {
      window.location.href = "index.html";
    });
  }

  if (page === "login") {
    getLoginPage();
  } else if (page === "register") {
    getSignUpPage();
  }
  localStorage.removeItem("redirectPage");
}
redirectedToPage();

// User Register Function
function userRegisteration() {
  let name = document.getElementById("signup-name").value;
  let email = document.getElementById("signup-email").value;
  let password = document.getElementById("signup-password").value;

  // Check whether the fields are empty or not
  if (name == "" || email == "" || password == "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please fill all the fields!",
      confirmButtonColor: "#4285f4",
      confirmButtonText: "Ok",
    });
    return;
  }

  // Name Validation
  if (name.length < 3) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Name Must Be At Least 3 Characters Long!",
      confirmButtonColor: "#4285f4",
      confirmButtonText: "Ok",
    });
    return;
  }

  // Email Validation
  if (
    !(
      email.includes("@") &&
      email.includes(".") &&
      email.length > 8 &&
      email.endsWith("gmail.com")
    )
  ) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Email Is Not Valid! Please Enter A Valid Email Address! eg: example123@gmail.com ",
      confirmButtonColor: "#4285f4",
      confirmButtonText: "Ok",
    });
    return;
  }

  // Password Validation
  if (password.length < 6) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Password Must Be At Least 6 Characters Long!",
      confirmButtonColor: "#4285f4",
      confirmButtonText: "Ok",
    });
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  if (!users) {
    let userID = 0;
    const userDetails = { id: ++userID, name, email, password };
    users.push(userDetails);
    localStorage.setItem("users", JSON.stringify(users));

    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Registered Successfully, Please login to proceed!",
      confirmButtonColor: "#4285f4",
      confirmButtonText: "Ok",
    }).then(() => {
      document.getElementById("signup-name").value = "";
      document.getElementById("signup-email").value = "";
      document.getElementById("signup-password").value = "";
      getLoginPage();
    });
  } else {
    let userID = users[users?.length - 1]?.id;
    const userDetails = { id: ++userID, name, email, password };

    // Check whether the user is already registered or not
    let isUserExist = false;
    users.forEach((user) => {
      if (user.email === email) {
        isUserExist = true;
      }
    });

    if (isUserExist) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "User already exist with this email! Please login with this email or use another email!",
        confirmButtonColor: "#4285f4",
        confirmButtonText: "Ok",
      });
    } else {
      users.push(userDetails);
      localStorage.setItem("users", JSON.stringify(users));
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Registeration Successfully, Please login to proceed!",
        confirmButtonColor: "#4285f4",
        confirmButtonText: "Ok",
      }).then(() => {
        document.getElementById("signup-name").value = "";
        document.getElementById("signup-email").value = "";
        document.getElementById("signup-password").value = "";
        getLoginPage();
      });
    }
  }
}

// User Login Function
function userLogin() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  // Check whether the fields are empty or not
  if (email == "" || password == "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please fill all the fields!",
      confirmButtonColor: "#4285f4",
      confirmButtonText: "Ok",
    });
    return;
  }

  // Email Validation
  if (
    !(
      email.includes("@") &&
      email.includes(".") &&
      email.length > 8 &&
      email.endsWith("gmail.com")
    )
  ) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Either email or password is Invalid, Try Again!",
      confirmButtonColor: "#4285f4",
      confirmButtonText: "Ok",
    }).then(() => {
      window.location.reload();
    });
    return;
  }

  // Password Validation
  if (password.length < 6) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Invalid email or password, Try Again!",
      confirmButtonColor: "#4285f4",
      confirmButtonText: "Ok",
    }).then(() => {
      window.location.reload();
    });
    return;
  }

  // Checking whether the user exist with the email or not
  const users = JSON.parse(localStorage.getItem("users")) || [];
  let userDetails;
  let isUserExist = false;
  users.forEach((user) => {
    if (user.email === email) {
      userDetails = user;
      isUserExist = true;
      return;
    }
  });

  if (!isUserExist) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "No account found for the given credentials, please register to login! ",
      confirmButtonColor: "#4285f4",
      confirmButtonText: "Ok",
    }).then(() => {
      getSignUpPage();
      return;
    });
  }

  // if the user exists then checks the credentials of user
  if (userDetails?.email === email && userDetails?.password === password) {
    const loggedUserId = userDetails.id;
    localStorage.setItem("loggedUserId", loggedUserId);
    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Login Successfully!",
      confirmButtonColor: "#4285f4",
      confirmButtonText: "Ok",
    }).then(() => {
      window.location.href = "index.html";
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Invalid email or password, Try Again!",
      confirmButtonColor: "#4285f4",
      confirmButtonText: "Ok",
    }).then(() => {
      window.location.reload();
    });
  }
}
