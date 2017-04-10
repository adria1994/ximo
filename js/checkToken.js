if (localStorage.auth == 1) {
    checkToken();
} else {
    login();
}
function checkToken(){
    $.ajax({
        type: 'POST',
        url: '../php/checkToken.php',
        dataType: 'json',
        data: {
            token: localStorage.token
        },
        success: function (data) {
            if(data.auth == 1) {
                localStorage.auth = 1;
                localStorage.token = data.token;
                window.location.href = '#';
                auth();
            } else {
                localStorage.auth = 0;
                localStorage.token = '';
            }
        }
    });
    return true;
}

function auth() {
    $('#menu').html('')
        .append('<li><a>' + localStorage.username +'</a></li>')
        .append('<li><a id="logout">Salir</a></li>');

    $('#content').load('startGame.html');

    $("#logout").click(function() {
        logout();
        $( "#showLogin" ).click(login);
        $( "#showRegister" ).click(register);
    });
}

function logout() {
    localStorage.auth = 0;
    localStorage.token = "";
    $('#menu').html('')
        .append('<li><a id="showLogin">Login</a></li>')
        .append('<li><a id="showRegister">Register</a></li>');
    login();
}