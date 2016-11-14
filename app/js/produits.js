document.addEventListener('DOMContentLoaded', function() {
    var productsManager = new ProductsManager();
    productsManager.itemsParent = document.querySelector(".produits__itemsContainer");
    productsManager.viewsParent = document.querySelector(".produits");
    productsManager.addButtonSelect(document.querySelector(".produits__button"), true, 1);
    productsManager.addButtonFilter(document.querySelector(".produits__filter.salt"), "salt", function() {
        var filters = document.querySelectorAll(".produits__filter");
        [].forEach.call(filters, function(filter) {
            filter.style.color = "white";
        });
        document.querySelector(".produits__filter.salt").style.color = "#5B3E26";
    })
    productsManager.addButtonFilter(document.querySelector(".produits__filter.sugar"), "sugar", function() {
        var filters = document.querySelectorAll(".produits__filter");
        [].forEach.call(filters, function(filter) {
            filter.style.color = "white";
        });
        document.querySelector(".produits__filter.sugar").style.color = "#5B3E26";
    })

    productsManager.init();
})


/**
 * ProductsManager
 * Gestion des animations, transitions de la page produits
 *
 */
function ProductsManager() {
    var self = this;

    self.item = 0;
    self.view = 0;

    self.itemsData = [{"type": "sugar", "color": "#efddad", "colorDark":"#d3b47d"},
        {"type": "sugar", "color": "#efddad", "colorDark":"#d3b47d"},
        {"type": "sugar", "color": "#efddad", "colorDark":"#d3b47d"},
        {"type": "sugar", "color": "#efddad", "colorDark":"#d3b47d"},
        {"type": "salt", "color": "#efddad", "colorDark":"#d3b47d"},
        {"type": "salt", "color": "#efddad", "colorDark":"#d3b47d"},
        {"type": "salt", "color": "#efddad", "colorDark":"#d3b47d"},
        {"type": "salt", "color": "#efddad", "colorDark":"#d3b47d"}];
    self.itemsFilter = "sugar";
    self.itemsParent;
    self.itemsIsAnimate = false;

    self.viewsParent;

    self.startTouch = {x: 0, y: 0};
    self.endTouch = {x: 0, y: 0};

    /**
     * getItemsData
     * retourne les donnees des items filtrés
     *
     * @param filter
     */
    self.getItemsData = function(filter) {
        return self.itemsData.filter(function(itemData) {
            return itemData.type == self.itemsFilter;
        })
    }

    /**
     * selectItem
     * rend visible l'item en param
     *
     * @param view
     */
    self.selectItem = function(item) {
        var itemsData = self.getItemsData(self.itemsFilter);
        /*
         * si item est different de l'item actuellement visible
         */
        if(self.item != item && item < itemsData.length && item >= 0 && !self.itemsIsAnimate) {
            self.itemsIsAnimate = true;
            var itemData = itemsData[item];
            /*
             * deplace la position du parent pour que la vue apparaisse dans le viewport
             */
            self.itemsParent.style.left = -(item * 100) + '%';
            self.viewsParent.querySelector(".produits__container").style.backgroundImage = 'linear-gradient(-13deg, '+itemData.colorDark+' 50%, '+itemData.color+' 50%)';
            self.viewsParent.style.backgroundColor = itemData.colorDark;
            console.log('ok');
            self.item = item;

            setTimeout(function() {
                self.itemsIsAnimate = false;
            }, 500)
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
        console.log(self.itemsParent);
        self.itemsParent.classList.remove("sugarFilter");
        self.itemsParent.classList.remove("saltFilter");
        self.itemsParent.classList.add(filter+"Filter");

        self.itemsFilter = filter;
        self.selectItem(0);
    }

    /**
     * addButtonFilter
     * permet d'appliquer un filter sur les differents items
     * sur le button renseigné en param
     *
     * @param button
     * @param filter
     */
    self.addButtonFilter = function(button, filter, callback) {
        button.addEventListener("click", function() {
            self.filterItems(filter);
            callback();
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

    self.detectGesture = function(delta) {
        /**
         * si le vecteur position est assez grand
         */
        if(Math.abs(delta.x) > 20 && Math.abs(delta.x) > Math.abs(delta.y)) {
            if(self.view == 0) {
                /**
                 * on change d'item
                 */
                var item = self.item + (delta.x > 0 ? +1 : -1);
                self.selectItem(item);
            }
        }
        else if(Math.abs(delta.y) > 20 && Math.abs(delta.y) > Math.abs(delta.x)) {
            /**
             * on change de vue
             */
            self.selectView(delta.y > 0 ? 1 : 0);
        }
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
        window.addEventListener('mousewheel', function(e) {
            var delta = {x: e.deltaX, y: e.deltaY};

            self.detectGesture(delta);

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
         * recupere et stock la position du premier touch dans startTouch
         */
        window.addEventListener('touchstart', function(e){
            self.startTouch = {x: e.touches[0].clientX, y: e.touches[0].clientY};
            if(e.preventDefault) { e.preventDefault(); }
            e.returnValue = false;

            return false;
        });

        /*
         * recupere et stock la position du dernier touch dans endTouch
         */
        window.addEventListener('touchmove', function(e){
            self.endTouch = {x: e.touches[0].clientX, y: e.touches[0].clientY};

            if(e.preventDefault) { e.preventDefault(); }
            e.returnValue = false;

            return false;
        });

        window.addEventListener('touchend', function(e) {

            /*
             * calcul du vecteur position sur Y
             */
            var delta = {x: self.startTouch.x - self.endTouch.x, y: self.startTouch.y - self.endTouch.y};

            self.detectGesture(delta);

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
