/**
 * Created by adria on 4/04/17.
 */
$('#deleteUser').click(function() {
    if($('.checkBox:checked').val() == undefined){
        if(!$('#message').hasClass("alert alert-danger")) {
            $('#message').addClass("alert alert-danger").append("<a class='close'>×</a> <p>Tienes que seleccionar alguna pregunta</p>");
        }
    }else{
        $('#message').removeClass("alert alert-danger").empty();
        if(confirm("Estas seguro de que quieres eliminar la pregunta?")){
            $.ajax({
                type: 'POST',
                data:{
                    funcion: 'deleteQuestion',
                    Id: $('.checkBox:checked').val(),
                },
                url: '../php/questionsAdmin.php',
                success: function(data){

                    if(data){
                        $('#content').load('loadQuestions.html',function(){
                            loadQuestions();
                            addDoneButton("Pregunta eliminada correctamente");
                        });
                    }else{
                        alert("algo no ha ido bien");
                    }
                }
            })
        }
    }
    $('.close').click(function(){
       clearMessage();
    });

});

