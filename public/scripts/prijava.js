

let var1 = document.getElementsByClassName("submit-button");

let username = document.getElementById("username").value;
let password = document.getElementById("password").value;

console.log("Ovo je username: " + username);
console.log("Ovo je password: " + password);

var1.onclick = function() {
    PoziviAjax.postLogin(username, password, function(status, data){
        
    })
};