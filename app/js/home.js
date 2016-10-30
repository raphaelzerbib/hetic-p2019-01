$(document).ready(function() {

    var scrollViewManager = new ScrollViewManager();
    scrollViewManager.parent = $("body");
    scrollViewManager.addButton($(".__home__container__bottom"), 1);
    scrollViewManager.init();

    /*var scrollMenuManager = new ScrollMenuManager();
    scrollMenuManager.parent = $(".__home__menu");*/
})

function ScrollViewManager() {
    var own = this;
    own.view = 0;

    own.parent;
    own.height;

    own.isChangingView = false;

    own.startTouchY;
    own.endTouchY;


    own.canChangeView  = function() {
        return own.view*own.height == own.parent.scrollTop();
    }

    own.selectView = function(view) {
        if(own.view != view && !own.isChangingView) {
            own.isChangingView = true;
            own.parent.animate({
                scrollTop: view*own.height
            }, 500, function() {
                own.view = view;
                own.isChangingView = false;
            })
        }
    }

    own.addButton = function(button, view) {
        button.bind("click", function() {
            own.height = $(window).height();
            own.selectView(view);
        })
    }

    own.initDesktop = function() {
        own.parent.bind('mousewheel', function(e) {
            own.height = $(window).height();
            if(own.canChangeView()) {
                var delta = e.originalEvent.wheelDelta;
                own.selectView(delta < 0 ? 1 : 0);
            }

            if(e.preventDefault) { e.preventDefault(); }
            e.returnValue = false;

            return false;
        });
    }

    own.initMobile = function() {
        $(window).on('touchstart', function(e){
            own.startTouchY = e.originalEvent.touches[0].clientY
            if(e.preventDefault) { e.preventDefault(); }
            e.returnValue = false;

            return false;
        });

        $(window).on('touchmove', function(e){
            own.endTouchY = e.originalEvent.touches[0].clientY;

            if(e.preventDefault) { e.preventDefault(); }
            e.returnValue = false;

            return false;
        });

        $(window).on('touchend', function(e) {
            own.height = $(window).height();
            console.log(own.startTouchY);
            console.log(own.endTouchY);
            if(own.canChangeView()) {
                var delta = own.endTouchY - own.startTouchY;
                own.selectView(delta < 0 ? 1 : 0);
            }

            if(e.preventDefault) { e.preventDefault(); }
            e.returnValue = false;

            return false;
        });

    }

    own.init = function(desktop, mobile) {
        own.initDesktop();
        own.initMobile();
    }


}
