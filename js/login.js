$( "#showLogin" ).click(login);
$( "#showRegister" ).click(register);

function login() {
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
}

function register() {
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
                    click: checkRegister
                }

            ]
        }).dialog("open");
    });
}

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
            if (data.auth == 1) {
                localStorage.auth = 1;
                localStorage.username = data.username;
                localStorage.token = data.token;
                $('.usuarioErrors').removeClass('ui-state-error').html('');
                $('#dialog').dialog('close');
                auth();
            } else {
                localStorage.auth = 0;
                localStorage.token = '';
                $('.usuarioErrors').addClass('ui-state-error').html('Las creedenciales no coinciden.');
            }
        }
    });
    return true;
}

function checkRegister(){
    if (checkUser() && checkPassword() && checkPasswordMatch() && checkEmail() && checkDate()) {
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
                if(data.auth == 1) {
                    localStorage.auth = 1;
                    localStorage.username = data.username;
                    localStorage.token = data.token;
                    $('#error').html('');
                    $('#dialog').dialog('close');
                    auth();
                } else {
                    localStorage.auth = 0;
                    localStorage.token = '';
                    $('#error').html(data.error);
                    $('#dialog').scrollTop(0);
                }
            }
        });
        return true;
    }
    return false;
}