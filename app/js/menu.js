/**
 * MenuManager
 * Gestion des animations, transitions du menu
 *
 */
function MenuManager() {
    var self = this;

    self.parent;
    self.running = true;

    self.activeItem = 0;

    self.startTouchY;
    self.endTouchY;

    /**
     * isExistingItem
     * retourne true si l'item ayant pour index id
     * existe et est different de l'item actif
     *
     * @param id
     * @return bool
     */
    self.isExistingItem = function(id) {
        return id >= 0 && id <= 3 && id != self.activeItem;
    }

    /**
     * selectItem
     * change l'item actif du menu
     *
     * @param item
     */
    self.selectItem = function(item) {

        /*
         * supprime de la class active sur tous les items du menu
         */
        var items = self.parent.querySelectorAll('.menu__item');

        for (var i = 0; i < items.length; i++) {
            items[i].classList.remove("menu__item--active");
        }

        /*
         * ajout de la class active à l'item donné en param
         */
        item.classList.add("menu__item--active");

        /*
         * recupere l'index du nouveau item actif
         */
        self.activeItem = [].slice.call(item.parentNode.children).indexOf(item);
    }

    /**
     * initDesktop
     * initialisation du menu pour la version
     * la version desktop
     */
    self.initDesktop = function() {
        /*
         * event listener lorsque pass la souris sur les items
         */
        var items = self.parent.querySelectorAll('.menu__item');

        for (var i = 0; i < items.length; i++) {
            items[i].addEventListener("mouseover", function() {
                /*
                 * rend actif l'item
                 */
                self.selectItem(this);
            })
        }
    }

    /**
     * initDesktop
     * initialisation du menu pour la version
     * la version mobile
     */
    self.initMobile = function() {
        /*
         * recupere et stock la position sur Y du premier touch dans startTouchY
         */
        window.addEventListener('touchstart', function(e){
            console.log(e);
            self.startTouchY = e.touches[0].clientY
            if(e.preventDefault) { e.preventDefault(); }
            e.returnValue = false;

            return false;
        });

        /*
         * recupere et stock la position sur Y du dernier touch dans endTouchY
         */
        window.addEventListener('touchmove', function(e){
            self.endTouchY = e.touches[0].clientY;

            if(e.preventDefault) { e.preventDefault(); }
            e.returnValue = false;

            return false;
        });


        window.addEventListener('touchend', function(e) {
            /*
             * calcul du vecteur position sur Y
             */
            var delta = self.endTouchY - self.startTouchY;

            /*
             * si le vecteur est assez grand
             */
            if(Math.abs(delta) > 50 && self.running) {
                var position = delta < 0 ? 1 : -1;
                /*
                 * recupere l'item id correspondant au swipe
                 */
                var itemId = self.activeItem + position;

                /*
                 * si l'item id existe
                 */
                if(self.isExistingItem(itemId)) {
                    /*
                     * rend actif l'item
                     */
                    var item = self.parent.querySelectorAll('.menu__item')[itemId];
                    self.selectItem(item);
                }

            }

            if(e.preventDefault) { e.preventDefault(); }
            e.returnValue = false;

            return false;
        });
    }

    /**
     * initDesktop
     * initialisation du menu
     */
    self.init = function() {
        self.initDesktop();
        self.initMobile();
    }

}
