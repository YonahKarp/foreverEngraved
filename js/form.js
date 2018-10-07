$(document).ready(function(){

   
    var contactModal = $("#contactModal")
    $(".contactUs").click(function(){
        contactModal.addClass("show");
        $('#menu').removeClass('open');
        $('.links ul').removeClass('open');
    })

    $(".overlay").click(function(){
        contactModal.removeClass("show");
    })

    $(".rplButton").click(function(e){

        var form = document.forms[0];
        
        if(form.checkValidity()){
            form.submit();
        }else{
            $('input:invalid, textarea:invalid').addClass("attention");
        }
    });
});