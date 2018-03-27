$("#login").on("click", function() {
    console.log("login..");
    window.location.replace(`/auth/facebook`);
});

$(document).ready(() => {

    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    function checkCookie() {
        var username = getCookie("id");
        if (username != "") {
            alert("Welcome again " + username);
        }
    }

    checkCookie();


// after new login, user enters data, then on submit button click triggers:
    $(".create-form").on("submit", function(event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();

        var newUser = {
            birthday: $("#birthday").val().trim(),
            bio: $("#bio").val().trim(),
            gender: $("#gender").val().trim(),
            interested_in: $("#sexuality").val().trim(),
            faves: $("#favorite1").val().trim(),
            wants_to: $("#interestedIn").val().trim(),
            city: $("#city").val().trim(),
            state: $("#state").val().trim()
        };

        // Send the POST request.
        $.ajax("/api/profile/update", {
            type: "POST",
            data: newUser
        }).then(
            function() {
                console.log("created new user user");
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });


// post new message
     $(".message-form").on("submit", function(event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();

        var newMsg = {
            text: $("#text").val().trim()
        };

        // Send the POST request.
        $.ajax("/api/messages/:user", {
            type: "POST",
            data: newMsg
        }).then(
            function() {
                console.log("posted new message");
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });

});
