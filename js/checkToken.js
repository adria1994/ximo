if (localStorage.auth == 1) {
    checkToken();
} else {
    logout();
}
function checkToken(){
    $.ajax({
        type: 'POST',
        url: '../php/checkToken.php',
        dataType: 'json',
        data: {
            token: localStorage.token,
            username: localStorage.username
        },
        success: function (data) {
            if(data.auth == 1) {
                localStorage.auth = 1;
                localStorage.token = data.token;
                auth(data.rol);
            } else {
                localStorage.auth = 0;
                localStorage.token = '';
                logout();
            }
        },
        error: function () {
            $('#content').html('');
            logout();
        }
    });
    return true;
}

function auth(rol) {
    if(rol == "admin") {
        $('#menu').html('')
            .append('<li><a id="profile">' + localStorage.username + '</a></li>')
            .append('<li><a id="adminZone">Zona admin</a></li>')
            .append('<li><a id="logout">Salir</a></li>');
        $("#adminZone").click(function(){
            $(location).attr('href','./adminZone.html');
        });

    } else {
        $('#menu').html('')
            .append('<li><a id="profile">' + localStorage.username + '</a></li>')
            .append('<li><a id="logout">Salir</a></li>');
    }
    $("#profile").click(function(){
        $('#content').load('userProfile.html');
    });
    $("#logout").click(function () {
        logout();
    });
    $('#content').load('./startGame.html');
}

function logout() {
    if (localStorage.auth == 1) {
        $.ajax({
            type: 'POST',
            url: '../php/logout.php',
            dataType: 'json',
            data: {
                token: localStorage.token,
                username: localStorage.username
            },
            success: function (data) {
                if (data.error == 0) {
                   logoutRestart();
                } else {
                    alert("No se ha podido desconectar");
                }
            }
        });
    } else {
        logoutRestart();
    }
}

function logoutRestart() {
    localStorage.auth = 0;
    localStorage.token = "";

    $('#content').html('');

    $('#menu').html('')
        .append('<li><a id="showLogin">Login</a></li>')
        .append('<li><a id="showRegister">Register</a></li>');

    $("#showLogin").click(login);
    $("#showRegister").click(register);

    login();
}