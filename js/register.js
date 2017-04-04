if (localStorage.auth == 1) {
    checkToken();
}
$('document').ready(function(){
    loadCountries();
    $("#bornDate").datepicker({
        dateFormat: 'mm/dd/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: "-100:+0"
    });
});
$('#countryBorn').change(loadCity);
$('#contraseña').keyup(function(e){
    if(e.keyCode == 13) checkLogin();
});

function loadCountries() {
    $.ajax({
        type: 'POST',
        url: '../php/register.php',
        // dataType: 'json',
        data: {
            funcion: 'getCountry'
        },
        success: function (data) {
            data = JSON.parse(data);
            data.forEach(function(item){
                $('#countryBorn').append("<option value='"+item.Code+"'>"+item.Name+"</option>");
            });
            loadCity();
        }
    });
}

function loadCity() {
    $.ajax({
        type: 'POST',
        url: '../php/register.php',
        // dataType: 'json',
        data: {
            funcion: 'getCity',
            country: $('#countryBorn').val()
        },
        success: function (data) {
            $('#cityBorn').html('');
            data = JSON.parse(data);
            data.forEach(function(item){
                $('#cityBorn').append("<option value='"+item.Code+"'>"+item.Name+"</option>");
            });
        }
    });
}

$( "#login" ).dialog({
    autoOpen: localStorage.auth != 1,
    resizable: false,
    title: 'Iniciar sesion',
    draggable: false,
    modal: false,
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
});
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
    $('#usuario').val('');
    $('#contraseña').val('');
    $('.usuarioErrors').html('');
    if($( "#register" ).dialog( "isOpen" ) == true) $('#register').dialog("close");
    $( "#login" ).dialog("open");

});
$( "#showRegister" ).click(function() {
    if($( "#login" ).dialog( "isOpen" ) == true) $('#login').dialog("close");
    $( "#register" ).dialog("open");
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
            password_confirmation: $('#password_confirmation').val(),
            email: $('#email').val(),
            bornDate: $('#bornDate').val(),
            bornCountry: $('#bornCountry option:selected').attr('name'),
            bornCity: $('#bornCity').attr('name')
        },
        success: function (data) {
            console.log(data);
            // if(data.auth == 1) {
            //     console.log(data.token);
            //     localStorage.auth = 1;
            //     localStorage.token = data.token;
            //     window.location.href = '#';
            // } else {
            //     localStorage.auth = 0;
            //     localStorage.token = '';
            // }
        }
    });
    return true;
}
