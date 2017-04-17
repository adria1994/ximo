/**
 * Created by adria on 4/04/17.
 */
function checkQuestions(){
    var bool = true;
    if($('#enunciado').val().length == 0){ bool = false }
    if($('#respuesta1').val().length == 0){ bool = false }
    if($('#respuesta2').val().length == 0){ bool = false }
    if($('#respuesta3').val().length == 0){ bool = false }
    if($('#respuesta4').val().length == 0){ bool = false }
    return bool;
}
function loadThemes(){
    $.ajax({
        type: 'POST',
        data: {
            funcion: 'loadThemes'
        },
        url: '../php/questionsAdmin.php',
        success: function(data) {
            data = JSON.parse(data);
            $('#tema').html("");
            data.forEach(function (item) {
                $('#tema').append("<option value='"+item.Id+"'>"+item.Name+"</option>");
            })
        }
    });
}

function sendQuestion(){
    if(checkQuestions()){
        $('#errorForm').removeClass('alert alert-danger').empty();
        recordQuestion();
        clearForm();

    }else{
        $('#errorForm').addClass('alert alert-danger').html('Los campos no pueden estar vacios');
    }
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
            CorrectAnswer:$('#respuestaCorrecta').val(),
            IdTheme:$('#tema').val()
        },
        url: '../php/questionsAdmin.php',
        success: function(data){
            if(data){
                $('#content').load('questionLoad.html',function(){
                    loadQuestions();
                    addDoneButton("Pregunta añadida correctamente");
                    $('.close').click(function(){
                        clearMessage()
                    });
                });

            }
        }
    })
}
function addDoneButton($message){
    $('#message').addClass("alert alert-success").append("<a class='close'x>×</a> <p>"+$message+"</p>");
}
function clearForm(){
    $('#enunciado').val('');
    $('#respuesta1').val('');
    $('#respuesta2').val('');
    $('#respuesta3').val('');
    $('#respuesta4').val('');
}
