
document.addEventListener('DOMContentLoaded', function() {
    var homeManager = new HomeManager();
    homeManager.parent = document.querySelector(".home");
    homeManager.addButton(document.querySelector(".home__container--bottom"), 1);
    homeManager.init();
})


/**
 * HomeManager
 * Gestion des animations, transitions de la page home
 *
 */
function HomeManager() {
    var self = this;
    self.view = 0;

    self.parent;
    self.height;

    self.startTouchY;
    self.endTouchY;

    self.menuManager = new MenuManager();

    /**
     * selecView
     * rend visible la vue en param
     *
     * @param view
     */
    self.selectView = function(view) {
        /*
         * si view est different de la vue actuellement visible
         */
        if(self.view != view) {
            /*
             * deplace la position du parent pour que la vue apparaisse dans le viewport
             */
            self.parent.style.top = -(view * 100) + '%';
            self.view = view;
        }
    }

    /**
     * addButton
     * permet de changer de vue en cliquant
     * sur le button renseigné en param
     *
     * @param button
     * @param view
     */
    self.addButton = function(button, view) {
        button.addEventListener("click", function() {
            self.height = window.innerHeight;
            self.selectView(view);
        })
    }

    /**
     * initDesktop
     * initialisation de la page home pour la version
     * la version desktop
     */
    self.initDesktop = function() {
        /**
         * event listener sur le scroll
         */
        self.parent.addEventListener('mousewheel', function(e) {
            self.height = window.innerHeight;
            var delta = e.deltaY;
            /**
             * si le vecteur position est assez grand
             */
            if(Math.abs(delta) > 20) {
                /**
                 * on change de vue
                 */
                self.selectView(delta > 0 ? 1 : 0);
            }

            if(e.preventDefault) { e.preventDefault(); }
            e.returnValue = false;

            return false;
        });
    }

    /**
     * initDesktop
     * initialisation de la page home pour la version
     * la version mobile
     */
    self.initMobile = function() {
        /*
         * recupere et stock la position sur Y du premier touch dans startTouchY
         */
        window.addEventListener('touchstart', function(e){
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
            self.height = window.innerHeight;

            /*
             * calcul du vecteur position sur Y
             */
            var delta = self.endTouchY - self.startTouchY;

            /*
             * stop les events de menuManager si c'est la vue 0
             * (la vue 1 correspond au menu)
             */
            self.menuManager.running = (self.view == 0) ? false : true;

            /*
             * si le vecteur est assez grand
             */
            if(Math.abs(delta) > 20 && self.menuManager.activeItem == 0) {
                /*
                 * change de vue
                 */
                self.selectView(delta < 0 ? 1 : 0);
            }

            if(e.preventDefault) { e.preventDefault(); }
            e.returnValue = false;

            return false;
        });

    }

    self.init = function() {
        self.initDesktop();
        self.initMobile();

        self.menuManager.parent = document.querySelector(".home__menu");
        self.menuManager.init();
    }


}
