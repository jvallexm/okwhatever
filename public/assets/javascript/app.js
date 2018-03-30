const socket = io();

$("#login").on("click", function() {
    console.log("login..");
    window.location.replace(`/auth/facebook`);
});

$(document).ready(() => {

    $('#datePicker')
        .datepicker({
            format: 'mm/dd/yyyy'
        })
        .on('changeDate', function(e) {
            // Revalidate the date field
            $('#eventForm').formValidation('revalidateField', 'date');
        });



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
                    },
                        notEmpty: {
                        message: 'Please provide a state'
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
        }
           
        })
        .on('success.form.bv', function(e) {
            $('#success_message').slideDown({ opacity: "show" }, "slow") // Do something ...
                $('#contact_form').data('bootstrapValidator').resetForm();

            // Prevent form submission
            e.preventDefault();

            // Get the form instance
            var $form = $(e.target);

            // Get the BootstrapValidator instance
            var bv = $form.data('bootstrapValidator');

            // Use Ajax to submit form data
            $.post($form.attr('action'), $form.serialize(), function(result) {
                console.log(result);
            }, 'json');
        });


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

    $('.datepicker').datepicker();

    // after new login, user enters data, then on submit button click triggers:
    $(".create-form").on("submit", function(event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();

        var newUser = {
            birthday:      $("#birthday").val(),
            bio:           $("#bio").val().trim(),
            gender:        $("#gender").val().trim(),
            interested_in: $("#sexuality").val().trim(),
            faves:         `${$("#favorite1").val().trim()};;;${$("#favorite2").val().trim()};;;${$("#favorite3").val().trim()}`,
            wants_to:      $("#interestedIn").val().trim(),
            city:          $("#city").val().trim(),
            state:         $("#state").val().trim()
        };

        console.log(newUser.birthday);

        

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
                // confirmation modal
                $("#myModal").modal('hide');
                $("#message").val("");
                $('#successModal').modal('show');
            }
        );
    });

    popultate();

});
