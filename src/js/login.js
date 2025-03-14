import { Auth } from "../services/api.js";

const logincontainer = document.getElementById("logincontainer");
const joincontainer = document.getElementById("joincontainer");
const loginBtn = document.getElementById("loginBtn");
const joinBtn = document.getElementById("joinBtn");

// register

const registerFirstName = document.getElementById("registerFirstName");
const registerLastName = document.getElementById("registerLastName");
const registerEmail = document.getElementById("registerEmail");
const registerPassword = document.getElementById("registerPassword");
const registerBtn = document.getElementById("registerBtn");
const secondeyeicon = document.getElementById("secondeyeicon");
const togglePasswordRegister = document.getElementById(
  "togglePasswordRegister"
);

togglePasswordRegister.addEventListener("click", function () {
  if (registerPassword.type === "password") {
    registerPassword.type = "text";
    secondeyeicon.src = `/src/assets/eye-slash.svg`
  } else {
    registerPassword.type = "password"
    secondeyeicon.src = `/src/assets/eye.svg`
  }
});


let flag = true;

window.showlogincontainer = function () {
  if (flag) {
    logincontainer.classList.add("hidden");

    loginBtn.innerHTML = `<span>Login</span>`;
    loginBtn.classList.remove("border-[#181818]");
    joinBtn.classList.add("!border-[#181818]");

    joinBtn.innerHTML = `<b>Join Us</b>`;

    joincontainer.classList.remove("hidden");
  } else {
    logincontainer.classList.remove("hidden");

    loginBtn.innerHTML = `<b>Login</b>`;

    loginBtn.classList.add("border-[#181818]");
    joinBtn.classList.remove("!border-[#181818]");

    joinBtn.innerHTML = `<span>Join Us</span>`;

    joincontainer.classList.add("hidden");
  }
  flag = !flag;
};

window.register = async () => {
  if (
    !registerEmail.value ||
    !registerLastName.value ||
    !registerFirstName.value ||
    !registerPassword.value
  ) {
    alert("Fields is required");
    return;
  }

  if (registerPassword.value.length < 8) {
    alert("Password must be 8 charachter");
    return;
  }

  let obj = {
    email: registerEmail.value,
    lastName: registerLastName.value,
    firstName: registerFirstName.value,
    password: registerPassword.value,
  };

  registerBtn.disabled = true;
  registerBtn.innerHTML = `
        <div class="flex w-full justify-center items-center">
            <div class="w-8 h-8 border-4 border-dashed border-black rounded-full animate-spin"></div>
        </div>
    `;

  let result = await Auth.register(obj);

  if (!result) {
    alert("Something went wrong");
    registerBtn.disabled = false;
    registerBtn.innerHTML = `<b class="text-[#3B4047]">Create account</b>`;
    return;
  }

  alert("Register is successfully");
  registerEmail.value = "";
  registerFirstName.value = "";
  registerLastName.value = "";
  registerPassword.value = "";
  registerBtn.disabled = false;
  registerBtn.innerHTML = `<b class="text-[#3B4047]">Create account</b>`;
  flag = false;
  window.showlogincontainer();
};

const forgotContainer = document.getElementById("forgotContainer");
const forgotBar = document.getElementById("forgotBar");

// login

const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const LoginBtn = document.getElementById("LoginBtn");
const eyeIcon = document.getElementById("eyeIcon");
const togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("click", function () {
  if (loginPassword.type === "password") {
    loginPassword.type = "text";
    eyeIcon.src = `/src/assets/eye-slash.svg`;
  } else {
    loginPassword.type = "password";
    eyeIcon.src = `/src/assets/eye.svg`;
  }
});

window.login = async () => {
  if (!loginEmail.value || !loginPassword.value) {
    alert("Please fill out this field.");
    return;
  }

  let obj = {
    email: loginEmail.value,
    password: loginPassword.value,
  };

  loginBtn.disabled = true;
  LoginBtn.innerHTML = `
    <div class="flex w-full justify-center items-center">
        <div class="w-8 h-8 border-4 border-dashed border-black rounded-full animate-spin"></div>
    </div>
`;

  let result = await Auth.login(obj);

  if (!result) {
    alert(
      "Invalid login or password. Remember that login names and passwords are case-sensitive. Please try again."
    );
    LoginBtn.innerHTML = `<b class="text-[#3B4047]">Login</b>`;
    LoginBtn.disabled = false;
    return;
  }

  LoginBtn.innerHTML = `<b class="text-[#3B4047]">Login</b>`;
  LoginBtn.disabled = false;

  localStorage.setItem("token", result.token);

  location.href = "/src/account.htm";
};

function showforgotContainer() {
  forgotContainer.classList.toggle("side-act");
  forgotBar.classList.toggle("side-act");
}
