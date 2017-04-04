$('#email').keyup(function() {
    checkEmail();
});
$('#name').keyup(function() {
    checkUser();
});
$('#password').keyup(function() {
    checkPassword();
});
$('#password-confirm').keyup(function() {
    checkPasswordMatch();
});
$('#bornDate').on('keyup change',function () {
    checkDate();
})


function checkEmail(){
    var email = $('#email').val();
    if(email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-ZñÑ]{2,3}$/)){
        $('#email').addClass('ui-state-success');
        $('.emailErrors').removeClass('ui-state-error').empty();
    }else{
        $('#email').addClass('ui-state-error');
        $('.emailErrors').addClass('ui-state-error').html('El email esta mal formado. No puede contener caracteres extraños.');
    }
}
function checkUser(){
    var user = $('#name').val();
    if(user.length > 5){
        $('#name').removeClass('ui-state-error');
        $('.nameErrors').removeClass('ui-state-error').empty();
    }else{
        $('#name').addClass('ui-state-error');
        $('.nameErrors').addClass('ui-state-error').html('El nombre debe tener almenos 6 letras.');
    }

}

function checkPassword(){
    var password = $('#password').val();
    if(password.match(/^(?=.*\d)(?=.*[a-z])[0-9a-zA-ZñÑ]{6,}$/)){
        $('#password').removeClass('ui-state-error');
        $('.passwordErrors').removeClass('ui-state-error').empty();
    }else{
        $('#password').addClass('ui-state-error');
        $('.passwordErrors').addClass('ui-state-error').html('La contraseña debe tener 6 letras 1 un numero. No puede contener caracteres extraños.');
    }
}
function checkDate(){
    var limitDate = moment();
    var date = $('#bornDate').val()
    if(!moment(limitDate.subtract(16,'years')).isSameOrAfter(date)){ //si es falso es que la fecha es anterior a 16 años
        $('#bornDate').addClass('ui-state-error');
        $('.dateErrors').addClass('ui-state-error').html('Para poder loguearte tienes que ser mayor de 16 años.');
    }else{
        $('#bornDate').removeClass('ui-state-error');
        $('.dateErrors').removeClass('ui-state-error').empty();
    }

}

function checkPasswordMatch(){
    var password = $('#password').val();
    var passwordConfirm = $('#password-confirm').val();
    if(password == passwordConfirm){
        $('#password').removeClass('ui-state-error');
        $('#password-confirm').removeClass('ui-state-error');
        $('.passwordErrors').removeClass('ui-state-error').empty();
        $('.passwordConfirmErrors').removeClass('ui-state-error').empty();

    }else{
        $('#password').addClass('ui-state-error');
        $('#password-confirm').addClass('ui-state-error');
        $('.passwordErrors').addClass('ui-state-error').html('Las contraseñas no coinciden.');
        $('.passwordConfirmErrors').addClass('ui-state-error').html('Las contraseñas no coinciden.');
    }
}

