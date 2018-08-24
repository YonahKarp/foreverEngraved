$(document).ready(function(){


    $(window).on("load", function() {

        $("#bottomSlide").lightSlider({ //#sculptures
            item: 6,
            autoWidth: true,
            easing: 'ease-in-out',
            pager: false,
            controls: false,
            loop: true
        }); 

        $("#sideSlide").lightSlider({
            item: 2,
            // autoWidth: true,
            slideMove: 1, // slidemove will be 1 if loop is true
            // slideMargin: 100,
            vThumbWidth: 200,
            vHeightTotal: "100%",
            verticalHeight: 600,

            vertical: true,
            
            easing: 'ease-in-out', //'for jquery animation',////
            pager: false,
            controls: false,
    
            loop: true,
    
            enableTouch:true,
            enableDrag:true,
            freeMove:true,
            swipeThreshold: 40,

            responsive : [
                {   breakpoint:1100,
                    settings: {item: 3}
                }
            ]
        }); 
    });

    // $(".fixedFooter").hover(function(e){
    //     var origin = e.clientX + "px " + "bottom" ;
    //     e.currentTarget.style.transformOrgin = origin;
    //     e.currentTarget.style.WebkitTransformOrigin = origin;
    //     e.currentTarget.style.msTransformOrigin = origin;
    // }, function(){})

    //collapsed links
    var menu = $('#menu');
    var links = $('.links ul');

    menu.click(function(){
        if($(this).hasClass('open')){
            menu.removeClass('open');
            links.removeClass('open');
        }else{
            menu.addClass('open');
            links.addClass('open')
        }
    });
})