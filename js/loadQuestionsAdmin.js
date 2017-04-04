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
    $('#content').load('loadQuestions.html');
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
    });
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
                if(checkQuestions()){
                    $('#errorForm').removeClass('alert alert-danger').empty();
                    recordQuestion();
                    clearForm();
                }else{
                    $('#errorForm').addClass('alert alert-danger').html('Los campos no pueden estar vacios');


                }

            }



        }
    ]
});


function closeDialog(element){
    $(element).dialog("close");
}
function createQuestion() {
   /* $('#questionForm').dialog('option', 'title', 'Alta pregunta');
    $('#questionForm').dialog("open");*/
   console.log("hola");
   $('#content').load('addQuestion.html');

}
