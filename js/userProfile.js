function loadProfile(){
    $.ajax({
        type: 'POST',
        data: {
            username: localStorage.username,
            token: localStorage.token
        },
        dataType: 'json',
        url: '../php/userProfile.php',
        success: function(data) {
            $('#numGames').append(data.length);
            for(var i=0;i< data.length;i++){
                $('.questions').append('<tr>' +
                    '<td>' + data[i].Fecha + '</td>' +
                    '<td>' + data[i].Edad + '</td>' +
                    '</tr>');
            }


        }
    });
}
