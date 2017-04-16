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
            if (data.error == 0) {
                $('#content').load('./game.html', function () {
                    game(data.Statement, data.Answer1, data.Answer2, data.Answer3, data.Answer4);
                });
            } else {
                $('#errorCreateGame').html(data.errorMessage);
            }
        }
    });
}

function game(Statement, Answer1, Answer2, Answer3, Answer4) {
    $('#Statement').html(Statement);
    $('#Answer1').html(Answer1);
    $('#Answer2').html(Answer2);
    $('#Answer3').html(Answer3);
    $('#Answer4').html(Answer4);
    // TODO Buscar callback del delay
    $('.progress-bar-fill').delay(1000).queue(function () {
        $(this).css('width', '100%')
    });
    updateGame();
}

function updateGame() {
    $.ajax({
        type: 'POST',
        url: '../php/game.php',
        dataType: 'json',
        data: {
            // TODO Mandar todos los datos
            funcion: 'update',
            username: localStorage.username,
            token: localStorage.token
        },
        success: function (data) {
            if (data.error == 0) {
                if (data.finish == 0) {
                    game();
                }
            } else {
                $('#errorCreateGame').html(data.errorMessage);
            }
        }
    });
}