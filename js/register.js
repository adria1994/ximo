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
    autoOpen: false,
    resizable: false,
    draggable: false,
    modal: true,
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
    modal: true,
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

        }

    ]
});
$( "#showLogin" ).click(function() {
    $('#login').dialog('option', 'title', 'Iniciar sesion');
    $( "#register" ).dialog( "isOpen" ) == true ? "" : $( "#login" ).dialog( "open" );;

});
$( "#showRegister" ).click(function() {
    if(!$( "#login" ).dialog( "isOpen" ) == true){
        $('#register').dialog('option', 'title', 'Nuevo registro');
        $( "#register" ).dialog( "open" )

    }

});

function checkLogin(){
    return true;

}
