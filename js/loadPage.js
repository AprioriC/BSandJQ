/**
 * Created by andre on 24.01.2017.
 */
"use strict";

function fadeOutnojquery() { //функция возник при загрузке карты
    var el =document.getElementById("escapingBall_1");
    var $speech = $('.myMap');
    $speech.css("visibility", "visible");
    el.style.opacity = 1;
    var interhellopreloader = setInterval(function() {
        el.style.opacity = el.style.opacity - 0.05;
        if (el.style.opacity <= 0.05) {
            clearInterval(interhellopreloader);
            el.style.display = "none";
        }
    }, 10);
};

$(".parentContainer").ready(function() { //при первом обращении к странице загрузить содержимое
    var sstr =window.location.pathname;
    var kksk="";
    if (sstr.substring("index")!=0)
        kksk="indexcash.html";
    else if (sstr.substring("map")!=0)
        kksk="mapcash.html";
    else
        kksk = "timercash.html";

    $('.parentContainer').load(kksk);
});

$(document).ready(function() {
    $('a').click(function() {
        var url = $(this).attr('href');
        var a = url.split('.')[0]+"cash.html";

        $('.parentContainer').load(a);
        // А вот так просто меняется ссылка
        if(url != window.location){
            window.history.pushState(null, null, url+"hdfghgf");
        };
        // Предотвращаем дефолтное поведение
        return false;
    });
    // А вот так просто меняется ссылка

});
