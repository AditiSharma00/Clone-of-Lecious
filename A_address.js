    let addBtn = document.getElementById("address-button");

    let loc = document.getElementById("user-location").value;
    let flat = document.getElementById("user-flat").value;
    let landmark = document.getElementById("user-landmark").value;
    let city = document.getElementById("user-city").value;
    let moNumber = document.getElementById("user-moNumber").value;

   

    

addBtn.addEventListener("click", async function (e) {
    e.preventDefault()
    console.log("hi from setAddress")
    let loc = document.getElementById("user-location").value;
    let flat = document.getElementById("user-flat").value;
    let landmark = document.getElementById("user-landmark").value;
    let city = document.getElementById("user-city").value;
    let moNumber = document.getElementById("user-moNumber").value;

    let userAddress = {
        "location" : loc,
        "flat-no" : flat,
        "landmark": landmark,
        "city" : city,
        "phone_number" : moNumber,

    };

    localUser.address.push(userAddress);


    try {
        let res = await fetch(`https://63982e64044fa481d693d25f.mockapi.io/users/${localUser.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",

        },
        body: JSON.stringify(localUser)
    }) 

    let data = await res.json()
    console.log(data);
    } catch (error) {
        console.log(error)
    }

    localStorage.setItem("current_user",JSON.stringify(localUser))
    
    window.location.href = "A_checkout.html";

    document.getElementById("user-location").value = ""
    document.getElementById("user-flat").value = ""
    document.getElementById("user-landmark").value = ""
    document.getElementById("user-city").value = ""
    document.getElementById("user-moNumber").value = ""

    console.log("inside setAddress")
}

)

let localUser = JSON.parse(localStorage.getItem("current_user"));

console.log(localUser);

let localUserId = localUser.id;
if (localUser === undefined || localUser === null) {
    localUser.id = 1;
}

console.log(localUserId)


// async function setAddress() {
//     console.log("hi from setAddress")
//     let loc = document.getElementById("user-location").value;
//     let flat = document.getElementById("user-flat").value;
//     let landmark = document.getElementById("user-landmark").value;
//     let city = document.getElementById("user-city").value;
//     let moNumber = document.getElementById("user-moNumber").value;

//     let userAddress = {
//         "location" : loc,
//         "flat-no" : flat,
//         "landmark": landmark,
//         "city" : city,
//         "phone_number" : moNumber,

//     };

//     localUser.address.push(userAddress);


//     try {
//         let res = await fetch(`https://63982e64044fa481d693d25f.mockapi.io/users/6`, {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json",

//         },
//         body: JSON.stringify(localUser)
//     }) 

//     let data = await res.json()
//     console.log(data);
//     } catch (error) {
//         console.log(error)
//     }

    

//     console.log("inside setAddress")
// }
