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
                game();
            } else {
                $('#errorCreateGame').html(data.errorMessage);
            }
        }
    });
}

function game() {
    updateGame();
    var bucle = setInterval(updateGame, 3000);
}

function updateGame() {
    $.ajax({
        type: 'POST',
        url: '../php/game.php',
        dataType: 'json',
        data: {
            funcion: 'update',
            username: localStorage.username,
            token: localStorage.token
        },
        success: function (data) {
            if (data.error == 0) {
                game();
            } else {
                $('#errorCreateGame').html(data.errorMessage);
            }
        }
    });
}