function ScrollMenuManager() {
    var own = this;

    own.canChangeItem = true;
    own.activeItem = 0;
    own.parent;

    own.isItemExists = function(item) {
        return item >= 0 && item <= 3 && item != own.activeItem;
    }

    own.selectItem = function(item) {
        if(own.isItemExists(item) && own.canChangeItem) {
            own.canChangeItem = false;
            own.parent.find(".__menu__item").removeClass("__active");
            own.parent.find(".__menu__item").eq(item).addClass("__active");
            own.activeItem = item;
        }
    }
}
