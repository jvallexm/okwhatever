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
    

    if ($('.datepicker').val() === "") {
        date = false;
    };
    if ($('#gender').val() === null) {
        gender = false;
    };
    if ($('#sexuality').val() === null) {
       sexuality = false;
    };
    if ($('#favorite1').val() === "") {
        favThing1 = false;
    };
    if ($('#favorite2').val() === "") {
        favThing2 = false;
    };
    if ($('#favorite3').val() === "") {
        favThing3 = false;
    };
    if ($('#bio').val() === "") {
        bio = false;
    };
    if ($('#interestedIn').val() === "") {
        interested = false;
    };

    // info object to send to post user
    var validationData = {
        date: "empty date",
        gender: "no gender",
        sexuality: "no sexuality"
      };

    $(".btn").on("click", function(event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
    
        if (date===false){
            alert("fill out the date");
        }
    });

});
