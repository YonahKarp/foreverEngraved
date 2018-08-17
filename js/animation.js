$(document).ready(function(){
    var section = $(".section"),
        lastTime = new Date().getTime();

    var title = $("#title");

    title.addClass("animate");

    //section.addClass("beforeAnimated");

    //setTimeout(checkForAnimation(section),1)

    if(location.hash)
        $(location.hash).parent().removeClass('beforeAnimated')
        
    $(window).scroll(function(){
        var newTime = new Date().getTime()
        if(lastTime+150 < newTime){
            lastTime = newTime;    
            checkForAnimation(section)
        }

    })

    function checkForAnimation(els){
        els.each(function(i, e){
            var position = e.getBoundingClientRect();
            if(position.y - window.innerHeight < 0){
                e.classList.remove('beforeAnimated')
            }
        });
    }

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