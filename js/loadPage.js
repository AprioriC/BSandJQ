/**
 * Created by andre on 24.01.2017.
 */
"use strict";
$("body").ready(function() {
  alert("fuck!!");
});


$(document).ready(function() {
    $('a').click(function() {

        var url = $(this).attr('href');
        var a = url.split('.')[0]+"cash.html";

        $(".myMap").ready( function() {
                var $speech = $('.myMap');
                var preloader = document.getElementById("escapingBall_1");
                $speech.css("visibility", "visible")
                fadeOutnojquery(preloader);
            });

        $('body').load(a);
        // А вот так просто меняется ссылка
        if(url != window.location){
            window.history.pushState(null, null, url+"hgfd");
        };

        if (a.indexOf("map")!=-1) {

        var fadeOutnojquery = function(el) {
            el.style.opacity = 1;
            var interhellopreloader = setInterval(function() {
                el.style.opacity = el.style.opacity - 0.05;
                if (el.style.opacity <= 0.05) {
                    clearInterval(interhellopreloader);
                    el.style.display = "none";
                }
            }, 10);
        };
        };


        // Предотвращаем дефолтное поведение
        return false;
    });
});
