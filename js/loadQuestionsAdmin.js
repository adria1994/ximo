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
                   '<td></td>'+
                   '<td> <button class="btn btn-info icons"> <i class="fa fa-trash" aria-hidden="true"></i></button>' +
                   '<button class="btn btn-info icons">  <i class="fa fa-pencil" aria-hidden="true"></i></a> </td>' +
                   '</tr>');
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
                recordQuestion();
            }

        }
    ]
});
function recordQuestion(){
    console.log('recordquestion');
    $.ajax({
        type: 'POST',
        data:{
            funcion: 'insertQuestion',
            Id: 'default',
            Statement:$('#enunciado').val(),
            Answer1:$('#respuesta1').val(),
            Answer2:$('#respuesta2').val(),
            Answer3:$('#respuesta3').val(),
            Answer4:$('#respuesta4').val(),
            CorrectAnswer:$('#respuesCorrecta').val(),
            IdTheme:$('#tema').val()
        },
        url: '../php/questionsAdmin.php'
    })
}
function createQuestion() {
    $('#questionForm').dialog('option', 'title', 'Alta pregunta');
    $('#questionForm').dialog("open");

}
