const socket = io();

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
                if(r.faves){
                    let faves = r.faves.split(";;;");
                    $("#favorite1").val(faves[0]);     
                    $("#favorite2").val(faves[1]);
                    $("#favorite3").val(faves[2]);
                }
                $("#city").val(r.city);
                $("#state").val(r.state);
                $("#interestedIn").val(r.wants_to);

            } else {

                console.log("ERROR!!");

            }

        });

    }

    $('#datePicker')
        .datepicker({
            format: 'mm/dd/yyyy'
        })
        .on('changeDate', function(e) {
            // Revalidate the date field
            $('#eventForm').formValidation('revalidateField', 'date');
        });


  
  /*
        // after new login, user enters data, then on submit button click triggers:
    $(".create-form").on("submit", function(event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();



        console.log(newUser.birthday);

        let isValidated = false;

        $("#validation").text("")

        if ($('.datepicker').val() === "") {
            date = false;
        } else {date = true;};

        if ($('#gender').val() === null) {
            gender = false;
        }else {gender = true;};

        if ($('#sexuality').val() === null) {
           sexuality = false;
        }else {sexuality = true;};

        if ($('#favorite1').val() === "") {
            favThing1 = false;
        }else {favThing1 = true;};

        if ($('#favorite2').val() === "") {
            favThing2 = false;
        }else {favThing2 = true;};

        if ($('#favorite3').val() === "") {
            favThing3 = false;
        }else {favThing3 = true;};

        if ($('#bio').val() === "") {
            bio = false;
        }else {bio = true;};
        
        if ($('#interestedIn').val() === "") {
            interested = false;
        }else {interested = true;};

        if (date===false){
            $("#validation").append(" please fill out a date. ");
        };
        if (gender===false){
            $("#validation").append(" please fill out a gender. ");
        };
        if (sexuality===false){
            $("#validation").append(" please fill out a sexuality. ");
        };
        if (favThing1===false){
            $("#validation").append(" please fill out favorite thing 1. ");
        };
        if (favThing2===false){
            $("#validation").append(" please fill out favorite thing 2. ");
        };
        if (favThing3===false){
            $("#validation").append(" please fill out favorite thing 3. ");
        };
        if (bio===false){
            $("#validation").append(" please fill out a bio. ");
        };
        if (interested===false){
            $("#validation").append(" please fill out some of your interests. ");
        };

        if ($("#validation").val().trim() === ""){
            isValidated = true;
            // Send the POST request.
            $.ajax("/api/profile/update", {
                type: "POST",
                data: newUser
            }).then(
                function() {
                    console.log("created new user user");
                    // Reload the page to get the updated list
                    $("#validation").val("Profile updated!")
                    $('#successModal').modal('show');
                    $('#modal2msg').text('Your Profile has been successfully updated!');
                }
            );
        } 
    });*/

    $('#contact_form').bootstrapValidator({
        // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            city: {
                validators: {
                        stringLength: {
                        min: 2,
                        max: 20
                    },
                        notEmpty: {
                        message: 'Please provide a city'
                    }
                }
            },
            state: {
                validators: {
                        stringLength: {
                        min: 2,
                        max: 20
                    },
                        notEmpty: {
                        message: 'Please provide a state'
                    }
                }
            },
            date: {
                validators: {
                    date: {
                        format: 'MM-DD-YYYY',
                        message: 'The value is not a valid date'
                    }
                }
            },
            gender: {
                validators: {
                    notEmpty: {
                        message: 'Please select a gender'
                    }
                }
            },
            sexuality: {
                validators: {
                    notEmpty: {
                        message: 'Please select a sexuality'
                    }
                }
            },
            fav1: {
                validators: {
                        stringLength: {
                        min: 2,
                        max: 50
                    },
                        notEmpty: {
                        message: 'Please provide a favorite thing between 2 and 50 characters'
                    }
                }
            },
            fav2: {
                validators: {
                        stringLength: {
                        min: 2,
                        max: 50
                    },
                        notEmpty: {
                        message: 'Please provide a favorite thing between 2 and 50 characters'
                    }
                }
            },
            fav3: {
                validators: {
                        stringLength: {
                        min: 2,
                        max: 50
                    },
                        notEmpty: {
                        message: 'Please provide a favorite thing between 2 and 50 characters'
                    }
                }
            },
            bio: {
                validators: {
                        stringLength: {
                        max: 250
                    },
                        notEmpty: {
                        message: 'Please fill out but do not exceed 250 characters'
                    }
                }
            },
            interestedIn: {
                validators: {
                        stringLength: {
                        max: 100
                    },
                        notEmpty: {
                        message: 'Please fill out but do not exceed 100 characters'
                    }
                }
            },


        }
           
        })
        .on('success.form.bv', function(e) {
            // Prevent form submission
            e.preventDefault();

            let newUser = {
                birthday:      $("#birthday").val(),
                bio:           $("#bio").val().trim(),
                gender:        $("#gender").val().trim(),
                interested_in: $("#sexuality").val().trim(),
                faves:         `${$("#favorite1").val().trim()};;;${$("#favorite2").val().trim()};;;${$("#favorite3").val().trim()}`,
                wants_to:      $("#interestedIn").val().trim(),
                city:          $("#city").val().trim(),
                state:         $("#state").val().trim()
            };

            // Use Ajax to submit form data
            $.ajax("/api/profile/update", {
                type: "POST",
                data: newUser
            }).then(
                function() {
                    console.log("created new user user");
                    // Reload the page to get the updated list
                    $("#validation").val("Profile updated!")
                    $('#successModal').modal('show');
                    $('#modal2msg').text('Your Profile has been successfully updated!');
                }
            );
        });


    var msgid;
    var flirtornot;

    $(".flirt").on("click", function(event) {
        msgid = $(this).data("id");
        flirtornot = true;
        $('#myModal').modal('show');
    });

    $(".whatever").on("click", function(event) {
        msgid = $(this).data("id");
        flirtornot = false;
        $('#myModal').modal('show');
    });

    $(".read").on("click",function(e){

        $.ajax(`/api/message/read`,{

            type: 'POST',
            data: {id: $(this).attr("data-id")}

        }).then((r)=>{

            $(this).removeClass("btn-info read")
                   .addClass("btn-secondary")
                   .text("");

            $(this).append($("<span>").addClass("glyphicon glyphicon-check"));

            let newUnread = parseInt($("#unread").text()) - 1;
            if(newUnread == 0)
                $("#unread").text("");
            else
                $("#unread").text(newUnread);

        });

    });

    // post new message
     $(".message-form").on("submit", function(event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();

        var newMsg = {
            text: $("#message").val().trim(),
            id: msgid,
            flirt: flirtornot
        };

        // Send the POST request.
        $.ajax("/api/send", {
            type: "POST",
            data: newMsg
        }).then(
            function() {
                console.log("posted new message");
                socket.emit("send message",{toId: msgid, fromId: getCookie("id")});
                // confirmation modal
                $("#myModal").modal('hide');
                $("#message").val("");
                $('#successModal').modal('show');
            }
        );
    });

    socket.on("new message",(from)=>{
        
        console.log("New message from");
        console.log(from);

        /* Generate modal here */

        if($("unread").length){

            let newUnread = parseInt($("#unread").text()) - 1;
            if(newUnread == 0)
                $("#unread").text("");
            else
                $("#unread").text(newUnread);

        } else {

            let unread = $("<span>").attr("id","unread").text("1");
            $("#msg-btn").prepend(unread);

        }

    });

    popultate();

});
