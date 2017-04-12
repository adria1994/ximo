/**
 * Created by adria on 4/04/17.
 */

function editQuestion(){
    if($('.checkBox:checked').val() == undefined){
        $('#message').empty();
        $('#message').addClass("alert alert-danger").append("<a class='close'>×</a> <p>Tienes que seleccionar alguna pregunta</p>");

    }else{
        $('#message').removeClass("alert alert-danger").empty();
        $('#content').load('editQuestion.html');
        $.ajax({
            type: 'POST',
            data:{
                funcion: 'loadQuestion',
                Id: $('.checkBox:checked').val(),
            },
            url: '../php/questionsAdmin.php',
            success: function(data){
                data = JSON.parse(data);
                data.forEach(function(item){
                    $('#enunciado').val(item.Statement);
                    $('#respuesta1').val(item.Answer1);
                    $('#respuesta2').val(item.Answer2);
                    $('#respuesta3').val(item.Answer3);
                    $('#respuesta4').val(item.Answer4);
                    $('#respuestaCorrecta').val(item.CorrectAnswer);
                    $('#tema').val(item.IdTheme);
                })
                loadThemes();

            }
        })

    }
    $('.close').click(function(){
        clearMessage();
    });

}
