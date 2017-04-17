$('#email').keyup(function() {
    changeCheckEmail();
});
$('#name').keyup(function() {
    changeCheckUser();
});
$('#password').keyup(function() {
    changeCheckPassword();
});
$('#password-confirm, #password').keyup(function() {
    changeCheckPasswordMatch();
});
$('#bornDate').on('keyup change',function () {
    changeCheckDate();
});


function changeCheckEmail(){
    if(checkEmail()){
        $('#email').addClass('ui-state-success').removeClass('ui-state-error');
        $('.emailErrors').removeClass('ui-state-error').empty();
    }else{
        $('#email').addClass('ui-state-error');
        $('.emailErrors').addClass('ui-state-error').html('El email esta mal formado. No puede contener caracteres extraños.');
    }
}
function changeCheckUser(){
    if(checkUser()){
        $('#name').removeClass('ui-state-error');
        $('.nameErrors').removeClass('ui-state-error').empty();
    }else{
        $('#name').addClass('ui-state-error');
        $('.nameErrors').addClass('ui-state-error').html('El nombre debe tener almenos 6 letras.');
    }

}

function changeCheckPassword(){
    if(checkPassword()){
        $('#password').removeClass('ui-state-error');
        $('.passwordErrors').removeClass('ui-state-error').empty();
    }else{
        $('#password').addClass('ui-state-error');
        $('.passwordErrors').addClass('ui-state-error').html('La contraseña debe tener 6 letras 1 un numero. No puede contener caracteres extraños.');
    }
}
function changeCheckDate(){
    if(checkDate()) {
        $('#bornDate').removeClass('ui-state-error');
        $('.dateErrors').removeClass('ui-state-error').empty();
    }else{
        $('#bornDate').addClass('ui-state-error');
        $('.dateErrors').addClass('ui-state-error').html('Para poder loguearte tienes que ser mayor de 16 años.');
    }

}
function changeCheckPasswordMatch(){
    if(checkPasswordMatch()){
        $('#password-confirm').removeClass('ui-state-error');
        $('.passwordConfirmErrors').removeClass('ui-state-error').empty();
    }else{
        $('#password-confirm').addClass('ui-state-error');
        $('.passwordConfirmErrors').addClass('ui-state-error').html('Las contraseñas no coinciden.');
    }
}

function checkEmail(){
    var email = $('#email').val();
    if (email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-ZñÑ]{2,3}$/)) return true;
    else return false;
}
function checkUser(){
    var user = $('#name').val();
    return user.length > 5;
}
function checkPassword(){
    var password = $('#password').val();
    return !!password.match(/^(?=.*\d)(?=.*[a-z])[0-9a-zA-ZñÑ]{6,}$/);
}
function checkDate(){
    var limitDate = moment();
    var date = $('#bornDate').val();
    return (moment(limitDate.subtract(16,'years')).isSameOrAfter(date));
}
function checkPasswordMatch(){
    var password = $('#password').val();
    var passwordConfirm = $('#password-confirm').val();
    return password == passwordConfirm;
}
