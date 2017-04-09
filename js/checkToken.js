if (localStorage.auth == 1) {
    checkToken();
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
                $('#menu').html('')
                    .append('<li><a id="#">' + window.localStorage.username +'</a></li>')
                    .append('<li><a id="logout">Salir</a></li>');

                $("#logout").click(function() {
                    logout();
                });
            } else {
                localStorage.auth = 0;
                localStorage.token = '';
            }
        }
    });
    return true;
}

function logout() {
    $.ajax({
        type: 'POST',
        url: '../php/logout.php',
        dataType: 'json',
        data: {
            token: localStorage.token
        },
        success: function (data) {
            if(data.auth == 1) {
                localStorage.auth = 1;
                localStorage.token = data.token;
                window.location.href = '#';
                $('#menu').html('');
                $('#menu').append('<li><a id="#">' + window.localStorage.username +'</a></li>');
                $('#menu').append('<li><a id="logout">Salir</a></li>');
            } else {
                localStorage.auth = 0;
                localStorage.token = '';
            }
        }
    });
}