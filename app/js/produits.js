/**
 * ProductsManager
 * Gestion des animations, transitions de la page produits
 *
 */
function ProductsManager() {
    var self = this;

    self.item = 0;
    self.view = 0;

    self.itemsData = [];
    self.itemsFilter = "sugar";
    self.itemsParent;

    self.viewsParent;

    self.startTouchY;
    self.endTouchY;

    /**
     * getItemsData
     * retourne les donnees des items filtrés 
     *
     * @param filter
     */
    self.getItemsData = function(filter) {
        var filterItemsData = [];

        for (var itemData in self.itemsData) {
            if(itemData.type == filter) {
                filterItemsData.push(itemData);
            }
        }

        return filterItemsData;
    }

    /**
     * selectItem
     * rend visible l'item en param
     *
     * @param view
     */
    self.selectItem = function(item) {
        /*
         * si item est different de l'item actuellement visible
         */
        if(self.item != item) {
            /*
             * deplace la position du parent pour que la vue apparaisse dans le viewport
             */
            self.itemsParent.style.left = -(item * 100) + '%';
            self.item = item;
        }
    }

    /**
     * selectView
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
            self.viewsParent.style.top = -(view * 100) + '%';
            self.view = view;
        }
    }


    /**
     * filterItems
     * filtre les items
     *
     * @param filter
     */
    self.filterItems = function(filter) {
        self.itemsParent.classList.remove("sugarFilter")
                                  .remove("saltFilter")
                                  .add(filter+"Filter");

        self.itemsFilter = filter;
    }

    /**
     * addButtonFilter
     * permet d'appliquer un filter sur les differents items
     * sur le button renseigné en param
     *
     * @param button
     * @param filter
     */
    self.addButtonFilter = function(button, filter) {
        button.addEventListener("click", function() {
            self.filterItems(filter);
        })
    }

    /**
     * addButtonSelect
     * permet de changer de vue/item en cliquant
     * sur le button renseigné en param
     *
     * @param button
     * @param isView
     * @param id
     */
    self.addButtonSelect = function(button, isView, id) {
        button.addEventListener("click", function() {
            if(isView) {
                self.selectView(id);
            }
            else {
                self.selectItem(id);
            }
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

    }


}
