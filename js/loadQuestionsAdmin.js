/**
 * Created by adria on 29/03/17.
 */
$('document').ready(function(){
   loadQuestions();
   loadThemes();
});
$('#addQuestion').click(function () {
    createQuestion();
})
$('#refreshPage').click(function(){
    location.reload();

});
function loadThemes(){
    $.ajax({
        type: 'POST',
        data: {
            funcion: 'loadThemes'
        },
        url: '../php/questionsAdmin.php',
        success: function(data) {
            data = JSON.parse(data);
            data.forEach(function (item) {
                $('#tema').append("<option value='"+item.Id+"'>"+item.Name+"</option>");
            })
        }
    });
}
function loadQuestions() {
    $.ajax({
        type: 'POST',
        data: {
            funcion: 'loadTable'
        },
        url: '../php/questionsAdmin.php',
        success: function(data){
            data = JSON.parse(data);
            data.forEach(function(item){
               $('.questions').append('<tr>' +
                   '<td>' + item.Name + '</td>' +
                   '<td>' + item.Statement + '</td>' +
                   '<td> <button class="btn btn-default" type="button" name="refresh" aria-label="refresh" title="Refresh">' +
                   '<i class="glyphicon glyphicon-trash icon-trash"></i>'+
                    '</button>' +
                   '<button class="btn btn-default icons" type="button" name="refresh" aria-label="refresh" title="Refresh">' +
                   '<i class="glyphicon glyphicon-pencil icon-pencil "></i>'+
                   '</button></td>');
            })
        }
    })
}
$('#questionForm').dialog({
    autoOpen: false,
    resizable: false,
    draggable: false,
    modal: true,
    width: 600,
    height: 535,
    buttons:[
        {
            text: "Cancelar",
            click: function() {
                $( this ).dialog( "close" );
            }
        },
        {
            text:"Añadir Pregunta",
            click: function(){
                checkQuestions() == true ? recordQuestion() : $('#errorForm').addClass('alert alert-danger').append('Los campos no pueden estar vacios');
            }


        }
    ]
});
function checkQuestions(){
    if($('#enunciado').length == 0 ||
        $('#respuesta1').length == 0 ||
        $('#respuesta2').length == 0 ||
        $('#respuesta3').length == 0 ||
        $('#respuesta4').length == 0 ||
        $('#respuesCorrecta').length == 0){
        return false;
    }
    return true;

}
function recordQuestion(){
    $.ajax({
        type: 'POST',
        data:{
            funcion: 'insertQuestion',
            Id: 'default',
            Statement: $('#enunciado').val(),
            Answer1: $('#respuesta1').val(),
            Answer2: $('#respuesta2').val(),
            Answer3: $('#respuesta3').val(),
            Answer4: $('#respuesta4').val(),
            CorrectAnswer:$('#respuesCorrecta').val(),
            IdTheme:$('#tema').val()
        },
        url: '../php/questionsAdmin.php',
        success: function(data){

            if(data){
                $('.questions').append('<tr>' +
                    '<td>' + $('#tema option:selected').html() + '</td>' +
                    '<td>' + $('#enunciado').val() + '</td>' +
                    '<td> <button class="btn btn-default" type="button" name="refresh" aria-label="refresh" title="Refresh">' +
                    '<i class="glyphicon glyphicon-trash icon-trash"></i>'+
                    '</button>' +
                    '<button class="btn btn-default icons" type="button" name="refresh" aria-label="refresh" title="Refresh">' +
                    '<i class="glyphicon glyphicon-pencil icon-pencil "></i>'+
                    '</button></td>');
                closeDialog("#questionForm");
                cleanInputsOfDialog();
            }
        }
    })
}
function cleanInputsOfDialog() {
    $('#enunciado').empty()
    $('#respuesta1').empty()
    $('#respuesta2').empty()
    $('#respuesta3').empty()
    $('#respuesta4').empty()
    $('#respuesCorrecta').empty()
}

function closeDialog(element){
    $(element).dialog("close");
}
function createQuestion() {
    $('#questionForm').dialog('option', 'title', 'Alta pregunta');
    $('#questionForm').dialog("open");

}
