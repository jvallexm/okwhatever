$("#login").on("click",function(){
    console.log("login..");
    window.open(`/auth/facebook`);
});

$(document).ready(()=>{
    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
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
        var username = getCookie("auth");
        if (username != "") {
            alert("Welcome again " + username);
        }
    }
    checkCookie();
});