/**
 * Created by adria on 29/03/17.
 */
/*$('document').ready(function(){
    loadQuestions();
});*/

function loadQuestions() {
    console.log("Hola")
    $('#content').load('questionLoad.html');

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
                    '<td><input class="checkBox" type ="checkbox" value="'+item.Id+'"/></td>' +
                    '<td>' + item.Name + '</td>' +
                    '<td>' + item.Statement + '</td>' +
                    '</button></td>');
                });

        }
    });
}

function createQuestion() {
   $('#content').load('questionAdd.html');
}
