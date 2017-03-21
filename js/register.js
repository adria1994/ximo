$('#cityBorn').change(function () {
    var val = $(this).children(":selected").text()
    $.ajax({
        type: 'post',
        url: 'getCity.php',
        data: {
            funcion: getCity,
        },
        success: function (response) {

        }
    });
});
