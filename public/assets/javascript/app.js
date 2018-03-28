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


    function popultate(){

        let id = getCookie("id");
        $.get("/api/profile/" + id).done((r)=>{

            if(r){

                $("#birthday").val(r.birthday);
                $("#bio").val(r.bio);
                $("#gender").val(r.gender);
                $("#sexuality").val(r.interested_in);
                let faves = r.faves.split(";;;");
                $("#favorite1").val(faves[0]);
                $("#favorite2").val(faves[1]);
                $("#favorite3").val(faves[2]);
                $("#city").val(r.city);
                $("#state").val(r.state);
                $("#interestedIn").val(r.wants_to);

            } else {

                console.log("ERROR!!");

            }

        });

    }

// after new login, user enters data, then on submit button click triggers:
    $(".create-form").on("submit", function(event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();

        var newUser = {
            birthday:      $("#birthday").val().trim(),
            bio:           $("#bio").val().trim(),
            gender:        $("#gender").val().trim(),
            interested_in: $("#sexuality").val().trim(),
            faves:         `${$("#favorite1").val().trim()};;;${$("#favorite2").val().trim()};;;${$("#favorite3").val().trim()}`,
            wants_to:      $("#interestedIn").val().trim(),
            city:          $("#city").val().trim(),
            state:         $("#state").val().trim()
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


    $(".flirt").on("click", function(event) {
        $('#myModal').modal('show');
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

    popultate();

});
