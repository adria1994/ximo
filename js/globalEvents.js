/**
 * Created by adria on 6/04/17.
 */

$('#addQuestion').click(function () {
    clearMessage();
    createQuestion();
})

$('#refreshPage').click(function(){
    location.reload();

});
$('.close').click(function(){
    clearMessage()
});
$('#cancel').click(function(){
    $('#content').load('#loadQuestions');
})
function clearMessage() {
    $('#message').removeClass('alert alert-success').empty();
}


$('#editUser').click(function(){
    editQuestion();
})

