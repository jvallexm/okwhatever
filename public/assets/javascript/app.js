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
                
                if(r.birthday){
                    let date = new Date(r.birthday * 1000);
                    $("#birthday").val(`${date.getMonth() +1 }/${date.getDate()}/${date.getFullYear()}`).trigger("change");
                }
                $("#bio").val(r.bio).trigger("change").change();
                $("#gender").val(r.gender).trigger("change").change();
                $("#sexuality").val(r.interested_in).trigger("change").change();
                if(r.faves){
                    let faves = r.faves.split(";;;");
                    $("#favorite1").val(faves[0]).trigger("change").change();     
                    $("#favorite2").val(faves[1]).trigger("change").change();
                    $("#favorite3").val(faves[2]).trigger("change").change();
                }
                $("#city").val(r.city).trigger("change").change();
                $("#state").val(r.state).trigger("change").change();
                $("#interestedIn").val(r.wants_to).trigger("change").change();    

            } else {

                console.log("ERROR!!");

            } 

        });

    }

    $('#birthday')
        .datepicker({
            format: 'mm/dd/yyyy'
        });

        let exp = !/[A-z0-9\s]+/g

        $('#contact_form').bootstrapValidator({
            // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                city: {
                    trigger: "change keyup",
                    validators: {
                            stringLength: {
                            min: 2,
                            max: 20
                        },
                            notEmpty: {
                            message: 'Please provide a city'
                        },
                        regexp: {
                            regexp: exp,
                            message: 'Letters and numbers only, please'
                        }
                    }
                },
                state: {
                    trigger: "change keyup",
                    validators: {
                            stringLength: {
                            min: 2,
                            max: 20
                        },
                            notEmpty: {
                            message: 'Please provide a state'
                        },
                        regexp: {
                            regexp: exp,
                            message: 'Letters and numbers only, please'
                        }
                    }
                },
                date: {
                    validators: {
                        date: {
                            format: 'MM/DD/YYYY',
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
                        },
                        regexp: {
                            regexp: exp,
                            message: 'Letters and numbers only, please'
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
                        },
                        regexp: {
                            regexp: exp,
                            message: 'Letters and numbers only, please'
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
                        },
                        regexp: {
                            regexp: /[A-z\s]/g,
                            message: 'Letters and numbers only, please'
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
               
    });

    $("#contact_form").on("submit",(e)=>{

        e.preventDefault();

        let newUser = {
            birthday:      new Date($(`#birthday`).val()).getTime()/1000,
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
            if(newUnread == 0 || newUnread == "NaN")
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

    let latestMessage;

    socket.on("new message",(from)=>{
        
        console.log("New message from");
        console.log(from);
        latestMessage = from;
        /* Generate modal here */

        $("#msg-btn").popover('show');

            let current = $(`#unread`).text();

            console.log("current messages " + current);

            let newUnread = parseInt($("#unread").text()) - 1;
            if(newUnread == 0)
                $("#unread").text("");
            else
                $("#unread").text(newUnread);

        

    });

    function makePopover(user){

        let message = $("<div>").addClass("pop-pop text-center");
        let mHead   = $("<h6>").addClass("up-up").text(`New Message from ${user.name}`);
        let smol    = $("<img>").addClass("smol").attr("src",user.image);
        message.append(mHead).append(smol);
        return message;

    }

    $('[data-toggle="popover"]').popover({
            html: true,
            delay: {show: 0, hide: 2000},
            content: function(){
                if(latestMessage)
                    return makePopover(latestMessage);
            }
        });

    $("#msg-btn").on('click', function () {
        $('#msg-btn').popover('destroy');
    });

    popultate();

    // force restack of grid after jquery hidetrick

    $grid.masonry();

});
