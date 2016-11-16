document.addEventListener('DOMContentLoaded', function() {

    var aElements = document.querySelectorAll("a");
    for (var i = 0; i < aElements.length; i++) {
        aElements[i].addEventListener("touchend", function() {
            window.location.href = this.getAttribute("href");
        });
    }

})

function navManager() {
    var self = this;

    self.init = function() {

    }
}
