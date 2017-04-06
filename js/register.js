if (localStorage.auth == 1) {
    checkToken();
}
$( "#register" ).dialog({
    autoOpen: false,
    resizable: false,
    draggable: false,
    title: 'Nuevo registro',
    modal: false,
    width: 600,
    height: 535,
    buttons: [
        {
            text: "Cancelar",
            click: function() {
                $( this ).dialog( "close" );
            }
        },
        {
            text:"Registrar",
            click:register
        }

    ]
});
$( "#showLogin" ).click(function() {
    $('#dialog').load('dialogLogin.html', function () {
        $("#dialog").dialog({
            autoOpen: localStorage.auth != 1,
            resizable: false,
            title: 'Iniciar sesion',
            draggable: false,
            modal: false,
            width: 'auto',
            height: 'auto',
            buttons: [
                {
                    text: "Cancelar",
                    click: function() {
                        $( this ).dialog( "close" );
                    }
                },
                {
                    text:"Iniciar Sesion",
                    click:checkLogin
                }

            ]
        }).dialog("open");
    });
});
$( "#showRegister" ).click(function() {
    $('#dialog').load('dialogRegister.html', function () {
        $("#dialog").dialog({
            autoOpen: false,
            resizable: false,
            draggable: false,
            title: 'Nuevo registro',
            modal: false,
            width: 600,
            height: 535,
            buttons: [
                {
                    text: "Cancelar",
                    click: function () {
                        $(this).dialog("close");
                    }
                },
                {
                    text: "Registrar",
                    click: register
                }

            ]
        }).dialog("open");
    });
});

function checkLogin(){
    $.ajax({
        type: 'POST',
        url: '../php/login.php',
        dataType: 'json',
        data: {
            user: $('#usuario').val(),
            pass: $('#contraseña').val()
        },
        success: function (data) {
            if(data.auth == 1) {
                localStorage.auth = 1;
                localStorage.username = data.username;
                localStorage.token = data.token;
                $( "#login" ).dialog("close");
                $('.usuarioErrors').removeClass('ui-state-error').html('');
            } else {
                localStorage.auth = 0;
                localStorage.token = '';
                $('.usuarioErrors').addClass('ui-state-error').html('Las creedenciales no coinciden.');
            }
        }
    });
    return true;
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
                console.log(data.token);
                localStorage.auth = 1;
                localStorage.token = data.token;
                window.location.href = '#';
            } else {
                localStorage.auth = 0;
                localStorage.token = '';
            }
        }
    });
    return true;
}

function register(){
    $.ajax({
        type: 'POST',
        url: '../php/register.php',
        dataType: 'json',
        data: {
            funcion: 'register',
            name: $('#name').val(),
            password: $('#password').val(),
            password_confirmation: $('#password-confirm').val(),
            email: $('#email').val(),
            bornDate: $('#bornDate').val(),
            bornCountry: $('#countryBorn').find('option:selected').val(),
            bornCity: $('#cityBorn').find('option:selected').val()
        },
        success: function (data) {
            console.log(data);
            if(data.auth == 1) {
                localStorage.auth = 1;
                localStorage.token = data.token;
                window.location.href = '#';
            } else {
                localStorage.auth = 0;
                localStorage.token = '';
            }
        }
    });
    return true;
}
