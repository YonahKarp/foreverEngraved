$(document).ready(function(){

   
    //contact
    var contactModal = $("#contactModal")
    $(".contactUs").click(function(){
        contactModal.addClass("show");
        $('#menu').removeClass('open');
        $('.links ul').removeClass('open');
    })

    var devContactModal = $("#devContactModal")
    $(".contactDev").click(function(){
        devContactModal.addClass("show");
        $('#menu').removeClass('open');
        $('.links ul').removeClass('open');
    })

    $(".overlay").click(function(){
        contactModal.removeClass("show");
        devContactModal.removeClass("show");

    })

    $("#contactModal .rplButton").click(function(e){
        var form = $("#contactForm")[0];
        
        if(form.checkValidity()){
            form.submit();
        }else{
            $('#contactModal input:invalid, #contactModal textarea:invalid').addClass("attention");
        }
    });

    $("#devContactModal .rplButton").click(function(e){

        var form = $("#devContactForm")[0];
        
        if(form.checkValidity()){
            form.submit();
        }else{
            $('#devContactModal input:invalid, #devContactModal textarea:invalid').addClass("attention");
        }
    });
});