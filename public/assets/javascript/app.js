$("#login").on("click",function(){
    console.log("login..");
    window.open(`/auth/facebook`);
});

$(document).ready(()=>{
    function checkCookie() {
        var username = getCookie("auth");
        if (username != "") {
            alert("Welcome again " + username);
        }
    }
    checkCookie();
});