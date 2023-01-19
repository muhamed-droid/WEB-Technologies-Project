

const PoziviAjax = (()=>{

    //fnCallback u svim metodama se poziva kada stigne odgovor sa servera putem Ajax-a
    // svaki callback kao parametre ima error i data, error je null ako je status 200 i data je tijelo odgovora
    // ako postoji greška poruka se prosljeđuje u error parametar callback-a, a data je tada null
    function impl_getPredmet(naziv,fnCallback){

    }
    // vraća listu predmeta za loginovanog nastavnika ili grešku da nastavnik nije loginovan
    function impl_getPredmeti(fnCallback){

    }
    function impl_postLogin(username,password,fnCallback){
        /* var data = {username: $("#username").val(), password: $("#password").val()};
        $.ajax({
            type: "POST",
            url: '/login',
            data: data,
            success: function(response) {
            console.log(response);
            }
    }); */

    // JavaScript code to handle the form submit event
    document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault(); // prevent form from submitting

    // Get the entered username and password
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    // Use AJAX to send a GET request to your server-side script
    // that will check if the entered username and password are in the JSON file
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "/check-credentials?username=" + username + "&password=" + password);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let response = JSON.parse(xhr.responseText);
            if (response.isValid) {
                // Credentials are valid, redirect the user to the homepage
                window.location.href = "/../html/prisustvo.html";
            } else {
                // Credentials are not valid, show an error message
                alert("Invalid username or password.");
            }
        }
    };
    xhr.send();
});
    }
    function impl_postLogout(fnCallback){

    }
    //prisustvo ima oblik {sedmica:N,predavanja:P,vjezbe:V}
    function impl_postPrisustvo(naziv,index,prisustvo,fnCallback){

    }

    return{
        postLogin: impl_postLogin,
        postLogout: impl_postLogout,
        getPredmet: impl_getPredmet,
        getPredmeti: impl_getPredmeti,
        postPrisustvo: impl_postPrisustvo
    };
})();
