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

            $.ajax({
                url: 'https://formspree.io/artbytsipora@gmail.com',
                type: 'post',
                data: $("#contactForm").serialize(),
                success: function(){
                    $(".form").html("<p class='font20'>Thank you for you email. We'll get back to you as soon as we can</p>")
               }
            });
        }else{
            $('input:invalid, textarea:invalid').addClass("attention");
        }
    });
});