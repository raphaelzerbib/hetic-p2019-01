$(document).ready(function() {
    var homeManager = new HomeManager();
    homeManager.parent = $("body");
    homeManager.addButton($(".home__container--bottom"), 1);
    homeManager.init();
})

function HomeManager() {
    var own = this;
    own.view = 0;

    own.parent;
    own.height;

    own.isChangingView = false;

    own.startTouchY;
    own.endTouchY;

    own.menuManager = new MenuManager();

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
            var delta = e.originalEvent.wheelDelta;

            if(own.canChangeView() && Math.abs(delta) > 20) {
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

            var delta = own.endTouchY - own.startTouchY;

            own.menuManager.running = (own.view == 0) ? false : true;

            if(own.canChangeView() && Math.abs(delta) > 20 && own.menuManager.activeItem == 0) {
                own.selectView(delta < 0 ? 1 : 0);
            }

            if(e.preventDefault) { e.preventDefault(); }
            e.returnValue = false;

            return false;
        });

    }

    own.init = function() {
        own.initDesktop();
        own.initMobile();

        own.menuManager.parent = $(".home__menu");
        own.menuManager.init();
    }


}
