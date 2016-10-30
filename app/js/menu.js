function MenuManager() {
    var own = this;

    own.running = true;

    own.parent;

    own.activeItem = 0;

    own.startTouchY;
    own.endTouchY;

    own.isExistingItem = function(id) {
        return id >= 0 && id <= 3 && id != own.activeItem;
    }

    own.selectItem = function(item) {
        own.parent.find('.__menu__item').removeClass("__active");
        item.addClass("__active");
        own.activeItem = own.parent.find(item).index();
    }

    own.initDesktop = function() {
        own.parent.find('.__menu__item')
        .mouseover(function() {
            own.selectItem($(this));
        })
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
            var delta = own.endTouchY - own.startTouchY;
            if(Math.abs(delta) > 20 && own.running) {
                var position = delta < 0 ? 1 : -1;
                var itemId = own.activeItem + position;

                if(own.isExistingItem(itemId)) {
                    var item = own.parent.find('.__menu__item').eq(itemId);
                    own.selectItem(item);
                }

            }

            if(e.preventDefault) { e.preventDefault(); }
            e.returnValue = false;

            return false;
        });
    }

    own.init = function() {
        own.initDesktop();
        own.initMobile();
    }

}
