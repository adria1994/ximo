/**
 * Created by adria on 29/03/17.
 */
$('document').ready(function(){
   loadQuestions();
});
$('#addQuestion').click(function () {
    createQuestion();
})

$('#refreshPage').click(function(){
    location.reload();

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


function closeDialog(element){
    $(element).dialog("close");
}
function createQuestion() {
   $('#content').load('addQuestion.html');

}
