/**
 * Created by andre on 24.01.2017.
 */
"use strict";
function fadeOutnojquery(el) {
    el.style.opacity = 1;
    var interhellopreloader = setInterval(function() {
        el.style.opacity = el.style.opacity - 0.05;
        if (el.style.opacity <= 0.05) {
            clearInterval(interhellopreloader);
            el.style.display = "none";
        }
    }, 10);
};
$(".myMap").ready(function() {
        var $speech = $('.myMap');

        var preloader = document.getElementById("escapingBall_1");
        $speech.css("visibility", "visible")
        fadeOutnojquery(preloader);
});
