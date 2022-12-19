let gray_background_login = document.querySelector("#gray_background");
let goTOLogInPage = document.querySelector(".goTOLogInPage");

goTOLogInPage.addEventListener("click", grayOn)
let if_user_exist = JSON.parse(localStorage.getItem("current_user")) || null;
if(if_user_exist){
    goTOLogInPage.innerText = "User";
    goTOLogInPage.removeEventListener("click",grayOn);
}
function grayOn(){
    gray_background_login.style.display = "flex";
}
let close_login_Btn = document.querySelector("#close_login_botton");
let phone_input = document.querySelector("#mob_num");
let get_OTP_Btn = document.querySelector("#getOTP");
let otp_sent_alert = document.querySelector("#opt_sent_alert");
let enter_otp = document.querySelector("#opt_input");
let confirm_OTP_botton = document.querySelector("#confirmOTP");
let opt_notify = document.querySelector("#opt_notify");
let errors = document.querySelector("#numb_error");

get_OTP_Btn.addEventListener("click", () => {
    let mobNumber = document.querySelector("#mob_num").value;
    if (Number(mobNumber) + "" == "NaN") {
        document.querySelector("#numb_error").style.display = "flex"
    }
    if ((mobNumber + "").length != 10) {
        document.querySelector("#numb_error").style.display = "flex"
    }
    if (Number(mobNumber) + "" != "NaN" && (mobNumber + "").length == 10) {
        document.querySelector("#numb_error").style.display = "none"
        let otp = Math.floor(Math.random() * (9874 - 1345) + 1345);
        setTimeout(() => {
            // console.log("your OTP is", otp);
            otp_sent_alert.style.display = "flex";

            setTimeout(() => {
                otp_sent_alert.style.display = "none";
            }, 2000)

            enter_otp.style.display = "flex";
            get_OTP_Btn.style.display = "none";
            confirm_OTP_botton.style.display = "block";

            let opt_message = document.querySelector("#opt_notify>div")
            opt_message.innerHTML = `<b>${otp}</b> ${opt_message.innerHTML}`
            console.log(opt_message)
            opt_notify.style.height = '130px';
            opt_notify.style.width = '620px';

            setTimeout(() => {
                opt_message.innerHTML = " is the OTP to access your Licious account. Do not share this with anyone. Thank you for using Licious. -Licious";
                opt_notify.style.height = '50px';
                opt_notify.style.width = '300px';
            }, 5000)
            confirm_OTP_botton.addEventListener("click", confirmOtpProcess);
            function confirmOtpProcess(){
                if (enter_otp.value == otp) {
                    errors.style.display = "none"
                    console.log("login successfull")
                        ; (async function () {
                            try {
                                let users_promise = await fetch("https://63982e64044fa481d693d25f.mockapi.io/users");
                                let all_users = await users_promise.json();

                                let exist = false;
                                let current_user;
                                for (let i = 0; i < all_users.length; i++) {
                                    if (all_users[i].phone_number == mobNumber) {
                                        exist = true;
                                        current_user = all_users[i];
                                        break;
                                    }
                                }
                                if (exist == false) {
                                    let new_user = {
                                        phone_number: mobNumber,
                                        username: `user ${all_users.length + 1}`,
                                        firstname: `firstname ${all_users.length + 1}`,
                                        lastname: `lastname ${all_users.length + 1}`,
                                        avtar: `avtar ${all_users.length + 1}`,
                                        cart: [],
                                        orders: [],
                                        address : [],
                                    }
                                    let a = await fetch("https://63982e64044fa481d693d25f.mockapi.io/users", {
                                        method: "POST",
                                        headers: {
                                            "Content-type": "application/json",
                                        },
                                        body: JSON.stringify(new_user)
                                    })
                                    let b = await a.json();
                                    localStorage.setItem("current_user", JSON.stringify(b));
                                } else {
                                    localStorage.setItem("current_user", JSON.stringify(current_user));
                                }
                                setTimeout(() => {
                                    gray_background_login.style.display = "none"
                                    get_OTP_Btn.style.display = "block";
                                    confirm_OTP_botton.style.display = "none";
                                    phone_input.value = "";
                                    enter_otp.value = "";
                                    enter_otp.style.display = "none"
                                    get_OTP_Btn.style.backgroundColor = "#c4c4c4";
                                    document.querySelector("#loginSuccessText").style.display = "flex"
                                    setTimeout(() => {
                                        document.querySelector("#loginSuccessText").style.display = "none"
                                    }, 2000)
                                }, 200)
                                goTOLogInPage.innerText = "User";
                                goTOLogInPage.removeEventListener("click",grayOn);
                            } catch (error) {
                                console.log(error);
                            }
                        })();
                } else {
                    errors.innerHTML = "Invalid OTP"
                    errors.style.display = "flex"
                    setTimeout(() => {
                        errors.style.display = "none";
                        errors.innerHTML = "Invalid OTP"
                    }, 2500)
                    console.log("a-aa wrong OTP")
                }
                removeEventListener("click", confirmOtpProcess)
            }
        }, 400)
    }
})
document.querySelector("#mob_num").addEventListener("focus", () => {
    get_OTP_Btn.style.backgroundColor = "#D11243";
    document.querySelector("#numb_error").style.display = "none"
})
document.querySelector("#mob_num").addEventListener("focusout", () => {
    let mobNumber = document.querySelector("#mob_num").value;
    if (Number(mobNumber) + "" == "NaN" || (mobNumber + "").length != 10) {
        get_OTP_Btn.style.backgroundColor = "#c4c4c4";
    }
})

close_login_Btn.addEventListener("click", () => {
    gray_background_login.style.display = "none";
    get_OTP_Btn.style.display = "block";
    confirm_OTP_botton.style.display = "none";
    phone_input.value = "";
    enter_otp.value = "";
})
document.querySelector("#close_login_background").addEventListener("click", () => {
    gray_background_login.style.display = "none"
    get_OTP_Btn.style.display = "block";
    confirm_OTP_botton.style.display = "none";
    phone_input.value = "";
    enter_otp.value = "";
})