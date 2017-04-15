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
                auth();
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

function auth() {
    $('#menu').html('')
        .append('<li><a>' + localStorage.username +'</a></li>')
        .append('<li><a id="logout">Salir</a></li>');

    $("#logout").click(function() {
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