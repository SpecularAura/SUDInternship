const submitForm = document.getElementById("form");
const successElements = document.getElementsByClassName("success");

submitForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let name = document.getElementsByName("name")[0].value;
    let email = document.getElementsByName("email")[0].value;
    let message = document.getElementsByName("message")[0].value;
    console.log(message);
    document.getElementsByName("message")[0].value = '';
    let reqBody = {
        'name': name,
        'email': email,
        'additionalMessage': message
    }
    // Some Changes
    fetch('/api/send-email',
        {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(reqBody)
        }
    ).then(async (response) => {
        const responseObject = await response.json();
        responseObject['displayClass'] = response.ok ? "success" : "error";
        return responseObject;
    }
    ).then(async (data) => {
        await data;
        document.getElementById("toggle-msg").innerHTML = data.message;
        document.getElementById("toggle-img").src = data.displayClass === "success" ? "tick.jpg" : "cross.png";
        let i = 0;
        for (i = 0; i < successElements.length; i++) {
            successElements[i].style.display = 'flex'
        }
    })
});

