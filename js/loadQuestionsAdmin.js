/**
 * Created by adria on 29/03/17.
 */
$('document').ready(function(){
   loadQuestions();
});

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
                   '<td> <button class="btn btn-default" class="delete" type="button">' +
                   '<i class="glyphicon glyphicon-trash icon-trash"></i>'+
                    '</button>' +
                   '<button class="btn btn-default icons" class="edit" type="button">' +
                   '<i class="glyphicon glyphicon-pencil icon-pencil "></i>'+
                   '</button></td>');
            });
            $('.delete').click(function () {
                alert("dos");
            });
            alert("dos");
        }
    });
}


function closeDialog(element){
    $(element).dialog("close");
}
function createQuestion() {
   $('#content').load('addQuestion.html');

}
