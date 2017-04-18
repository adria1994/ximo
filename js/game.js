$('#btn-start-game').click(startGame);
function startGame() {
    $.ajax({
        type: 'POST',
        url: '../php/game.php',
        dataType: 'json',
        data: {
            funcion: 'create',
            username: localStorage.username,
            token: localStorage.token
        },
        success: function (data) {
            var item
            if (data.error == 0) {
                $('#content').load('./game.html', function () {
                    game(data.IdPregunta, data.Statement, data.Answer1, data.Answer2, data.Answer3, data.Answer4);
                });
            } else {
                $('#errorCreateGame').html(data.errorMessage);
            }
        }
    });
}

function game(Id, Statement, Answer1, Answer2, Answer3, Answer4) {
    $('#Statement').html(Statement);
    $('#Answer1').html(Answer1);
    $('#Answer2').html(Answer2);
    $('#Answer3').html(Answer3);
    $('#Answer4').html(Answer4);
    var click = "";
    $('#game button').click(function () {
       click = $(this).attr('id');
    }).blur();

    $('.progress-bar-fill').delay(10).queue(function () {
        $(this).css('transition','width 3s ease-in-out').css('width', '100%');
        $(this).dequeue();
    }).delay(3000).queue(function () {
        updateGame(Id, click.slice(-1));
        $(this).dequeue();
    });
}

function updateGame(IdPregunta, answer) {
    $.ajax({
        type: 'POST',
        url: '../php/game.php',
        dataType: 'json',
        data: {
            funcion: 'update',
            username: localStorage.username,
            token: localStorage.token,
            idPregunta: IdPregunta,
            answer: answer
        },
        success: function (data) {
            $('.progress-bar-fill').css('transition','none').css('width', '1%');
            if (data.error == 0) {
                if (data.finish == 0) {
                    game(data.IdPregunta, data.Statement, data.Answer1, data.Answer2, data.Answer3, data.Answer4);
                } else {
                    alert('Finish');
                    $('#content').load('./gameResults.html', function () {
                        $('#numQuestionsRight').html(data.cantidad);
                        $('#ageOfGame').html(data.edad);
                    });
                }
            } else {
                $('#errorCreateGame').html(data.errorMessage);
            }
        }
    });
}
