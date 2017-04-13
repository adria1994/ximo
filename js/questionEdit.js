/**
 * Created by adria on 4/04/17.
 */

function editQuestion(){
    if($('.checkBox:checked').val() == undefined){
        $('#message').empty();
        $('#message').addClass("alert alert-danger").append("<a class='close'>×</a> <p>Tienes que seleccionar alguna pregunta</p>");

    }else{
        $('#message').removeClass("alert alert-danger").empty();
        $('#content').load('questionEdit.html');
        loadThemesToEdit();
        $.ajax({
            type: 'POST',
            data:{
                funcion: 'loadQuestion',
                Id: $('.checkBox:checked').val(),
            },
            url: '../php/questionsAdmin.php',
            success: function(data){
                data = JSON.parse(data);
                var hola;
                data.forEach(function(item){
                    var hola = item.IdTheme;
                    $('#enunciado').val(item.Statement);
                    $('#respuesta1').val(item.Answer1);
                    $('#respuesta2').val(item.Answer2);
                    $('#respuesta3').val(item.Answer3);
                    $('#respuesta4').val(item.Answer4);
                    $('#respuestaCorrecta option[value="'+item.CorrectAnswer+'"]').attr("selected", "selected");
                    $('#temaEdit option[value="'+hola+'"]').attr("selected", "selected");
                    $('#questionId').val(item.Id);
                })
            }
        })
    }
    $('.close').click(function(){
        clearMessage();
    });

}
function loadThemesToEdit(){
    $.ajax({
        type: 'POST',
        data: {
            funcion: 'loadThemes'
        },
        url: '../php/questionsAdmin.php',
        success: function(data) {
            data = JSON.parse(data);
            $('#temaEdit').html("");
            data.forEach(function (item) {
                $('#temaEdit').append("<option value='"+item.Id+"'>"+item.Name+"</option>");
            })
        }
    });
}
function updateQuestion(){
    $.ajax({
        type: 'POST',
        data:{
            funcion: 'updateQuestion',
            Statement: $('#enunciado').val(),
            Answer1: $('#respuesta1').val(),
            Answer2: $('#respuesta2').val(),
            Answer3: $('#respuesta3').val(),
            Answer4: $('#respuesta4').val(),
            CorrectAnswer:$('#respuestaCorrecta').val(),
            IdTheme:$('#temaEdit').val(),
            QuestionId:$('#questionId').val()
        },
        url: '../php/questionsAdmin.php',
        success: function(data){
            if(data){
                $('#content').load('questionLoad.html',function(){
                    loadQuestions();
                    addDoneButton("Pregunta editada correctamente");
                    $('.close').click(function(){
                        clearMessage()
                    });
                });

            }
        }
    })
}
