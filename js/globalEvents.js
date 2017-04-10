/**
 * Created by adria on 6/04/17.
 */

$('#addQuestion').click(function () {
    clearMessage();
    createQuestion();
})
$('#content').on('click', 'button.delete', function() {
    /*alert("hola")*/
    $( "#dialog" ).dialog({
        autoOpen: false,
        resizable: false,
        draggable: false,
        title: 'Nuevo registro',
        modal: false,
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
    $("#dialog").dialog("open");
});

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
$('.delete').click(function () {
    alert("dos");
});

