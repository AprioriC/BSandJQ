/**
 * Created by andre on 24.01.2017.
 */
"use strict";

var myDate = Date.now();

function getSeconds() {
    var newDate = Date.now();
    var mySeconds = newDate-myDate;
    return mySeconds;
};
var timerId;
function upTimer() {
    var myTmr = $(".mytimer");
    myTmr.html(getSeconds()+"");
    timerId = setInterval(function() {
        myTmr.html(getSeconds()+"");
    },1000)
};

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
    if (sstr.indexOf("index")!=-1)
        kksk="indexcash.html";
    else if (sstr.indexOf("map")!=-1)
        kksk="mapcash.html";
    else
        kksk = "timercash.html";

    $('.parentContainer').load(kksk);
});


$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();

    $('a').click(function() {

        if (window.location.pathname.indexOf("timer")!=-1) {
            clearInterval(timerId);
        };

        var url = $(this).attr('href');
        var a = url.split('.')[0]+"cash.html";

        $('.parentContainer').load(a);
        // А вот так просто меняется ссылка
        if(url != window.location){
            window.history.pushState(null, null, url);
        };


        $("#firstLi").removeClass();
        $("#secondLi").removeClass();
        $("#thirdLi").removeClass();

        if (url.indexOf("index")!=-1)
            $("#firstLi").addClass("active");
        else if (url.indexOf("map")!=-1)
            $("#secondLi").addClass("active");
        else
            $("#thirdLi").addClass("active");
        // Предотвращаем дефолтное поведение
        return false;
    });

});
