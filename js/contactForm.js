function contactFormSubmit() {
    let iframe = document.getElementById("hidden_iframe");
    //var btn = document.getElementById("btn");
    //btn.disabled = true;

    // https://docs.google.com/forms/d/e/1FAIpQLSffmWaSq5Up5YkTZggiANEnEqcNLZUwptegVGmU_HYG7ZPBiQ/formResponse?usp=pp_url&entry.1864236594=Name&entry.529565398=Email&entry.189756231=Phone&entry.592910776=Message&entry.617573837=BOT
    var form = document.getElementById("gform");
    var email = document.getElementById("entry.529565398").value;
    var name = document.getElementById("entry.1864236594").value;
    var tel = document.getElementById("entry.189756231").value;
    var msg = document.getElementById("entry.592910776").value;
    var bot = document.getElementById("entry.617573837").value;

    if (name == "" || msg == "" || email == "" || bot != "") {
        console.log("Required fields are not set!");
    } else {
        var url = "https://docs.google.com/forms/d/e/1FAIpQLSffmWaSq5Up5YkTZggiANEnEqcNLZUwptegVGmU_HYG7ZPBiQ/formResponse?usp=pp_url&entry.1864236594=";
        url = url.concat(name).concat("&entry.529565398=");
        url = url.concat(email).concat("&entry.189756231=");
        url = url.concat(tel).concat("&entry.592910776=");
        url = url.concat(msg).concat("&entry.617573837=contactFormjs");

        /*
        fetch(url)
        .then(function(response) {
            console.log(response.text);
         }).then(function(body) {
            console.log(body);
        })
        */
       console.log(url);
       //form.setAttribute("action", url);
       iframe.src = url;
    }

    if (bot != "") {
        console.log("Your kind is not served here... -_-*");
    } else {
        //form.submit();
        //btn.disabled = false;
        form.reset();
        //iframe.src = url;
        //window.location.href = "index.html#contact";
    }
}