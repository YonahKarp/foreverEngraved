$(document).ready(function(){


    $(window).on("load", function() {
        $("#currentImgs").lightSlider({
            item: 1,
            // autoWidth: true,
            slideMargin: 60,
     
            cssEasing: 'ease', //'cubic-bezier(0.25, 0, 0.25, 1)',//
            easing: 'ease-in-out', //'for jquery animation',////
     
            speed: 1200, //ms'
            loop: true,
            slideEndAnimation: false,
            pause: 3000,
     
            pager: true,
            currentPagerPosition: 'middle',

            gallery: true,	
            galleryMargin: 5,
            thumbMargin: 10,
            thumbItem: 5
        }); 

        $("#sculptures").lightSlider({
            item: 6,
            autoWidth: true,
     
            cssEasing: 'ease', //'cubic-bezier(0.25, 0, 0.25, 1)',//
            easing: 'ease-in-out', //'for jquery animation',////
            pager: false,
            controls: false,

            loop: true,
     
            responsive : [
                // {
                //     breakpoint:600,
                //     settings: {
                //        vertical: true,
                //        item: 2,
                //        autoWidth: false,
                //     //    verticalHeight: 200,
                //        adaptiveHeight: true,
                //     //    vThumbWidth: 100



                //       }
                // }
            ]
        }); 

        $("#sideSlide").lightSlider({
            item: 4,
            // autoWidth: true,
            slideMove: 1, // slidemove will be 1 if loop is true
            // slideMargin: 100,
            vThumbWidth: 200,
            verticalHeight: 600,

            vertical: true,
            
            easing: 'ease-in-out', //'for jquery animation',////
            pager: false,
            controls: false,
    
            loop: true,
    
            enableTouch:true,
            enableDrag:true,
            freeMove:true,
            swipeThreshold: 40
        }); 
    });

    $(".fixedFooter").hover(function(e){
        var origin = e.clientX + "px " + "bottom" ;
        e.currentTarget.style.transformOrgin = origin;
        e.currentTarget.style.WebkitTransformOrigin = origin;
        e.currentTarget.style.msTransformOrigin = origin;
    }, function(){})

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