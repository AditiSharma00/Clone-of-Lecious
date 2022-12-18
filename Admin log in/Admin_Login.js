let form = document.getElementById("login_form");
form.onsubmit = () => {
  event.preventDefault();
  validateAdmin();
};

let validateAdmin = () => {
  let username = form.username.value;
  let password = form.password.value;

  if (username != "Admin" || password != "ANUPA@admin") {
    alert("Enter the correct Credentials");
  } else {
    alert("Login successfull");
    window.location.href = "../Admin/Admin.html";
    localStorage.setItem("admin_logged_in", true);
  }
};
