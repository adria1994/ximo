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
            console.log(data);
        }
    });
}