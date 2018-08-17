$(document).ready(function(){
    $(window).on("load", function() {
       
        $("#test").lightSlider({
            item: 2,
            // autoWidth: true,
            slideMove: 1, // slidemove will be 1 if loop is true
            // slideMargin: 100,

            vertical: true,
            // verticalHeight: "",
            
     
            addClass: '',
            mode: "slide",
            useCSS: true,
            cssEasing: 'ease', //'cubic-bezier(0.25, 0, 0.25, 1)',//
            easing: 'ease-in-out', //'for jquery animation',////
            pager: false,
            keyPress: true,
            controls: false,
    
    
            loop: true,
    
            enableTouch:true,
            enableDrag:true,
            freeMove:true,
            swipeThreshold: 40
        }); 
    });
});

