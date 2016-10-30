$(document).ready(function() {
    var scrollViewManager = new ScrollViewManager();

    $('body').bind('mousewheel', function(e) {

        if(!scrollViewManager.isScrollingView) {
            var delta = e.originalEvent.wheelDelta;
            scrollViewManager.selectView(delta > 0 ? 0: 1);
        }

        if(e.preventDefault) { e.preventDefault(); }
        e.returnValue = false;

        return false;
    });

    $(".__home__container__bottom").bind("click", function() {

    })
})


function ScrollViewManager() {
    var own = this;

    own.isScrollingView = false;
    own.parent = $(window);

    this.selectView = function(view) {
        var height = own.parent.height();
        if(view*height != $("body").scrollTop()) {
            own.isScrollingView = true;
            $("body").animate({
                scrollTop: view*height
            }, 500, function() {
                own.isScrollingView = false;
            })
        }
    }
}
