/**
 * Created by andre on 24.01.2017.
 */
"use strict";

var preloader = document.getElementById("escapingBall_1");
function fadeOutnojquery(el) {
    el.style.opacity = 1;
    var interhellopreloader = setInterval(function() {
        el.style.opacity = el.style.opacity - 0.05;
        if (el.style.opacity <= 0.05) {
            clearInterval(interhellopreloader);
            preloader.style.display = "none";
        }
    }, 10);
};
window.onload = function() {
    setTimeout(function() {
        fadeOutnojquery(preloader);
    }, 0);
}
;