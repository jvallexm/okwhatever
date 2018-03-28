$(document).ready(function () {

    $('.datepicker').datepicker();

    let date = Boolean;
    let gender = Boolean;
    let sexuality = Boolean;
    let favThing1 = Boolean;
    let favThing2 = Boolean;
    let favThing3 = Boolean;
    let bio = Boolean;
    let interested = Boolean;


  

    $(".btn").on("click", function(event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        
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
        };

        console.log(isValidated);

    });

});


