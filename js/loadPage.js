/**
 * Created by andre on 24.01.2017.
 */
"use strict";

var minTitles = ['минута', 'минуты', 'минут'];
var secTitles = ['секунда', 'секунды', 'секунд'];

var myDate = Date.now();

var indexpage=-1; //0-index.html , 1- map.html, 2-timer.html, необходимы для нормальной работый перехода "назад"

function getSeconds() {
    var newDate = Date.now();
    var mySeconds = newDate-myDate;
    mySeconds=Math.round(mySeconds/1000)
    return mySeconds;
};

var timerId; //находится здесь чтобы потом завершить таймер

function upTimer() {

    var myTmrMin = $(".TimerMinVal");
    var myTmrSec = $(".TimerSecVal");

    var myTmrMinName = $(".timerMinName");
    var myTmrSecName = $(".timerSecName");

    changeTimerValues(myTmrMin, myTmrSec, myTmrMinName, myTmrSecName);


    timerId = setInterval(function() {
        changeTimerValues(myTmrMin, myTmrSec, myTmrMinName, myTmrSecName);

    },1000)
};

function changeTimerValues(myTmrMin,myTmrSec, myTmrMinName,myTmrSecName) {

    var valSec = getSeconds();
    var minut = Math.floor(valSec/60);
    var second = valSec-60*minut;
    myTmrMin.html(minut+"");
    myTmrSec.html(second+"");

    myTmrMinName.html(declOfNum(minut, minTitles ));
    myTmrSecName.html(declOfNum(second, secTitles ));
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
    var sstr =window.location.pathname+location.hash;
    var kksk=getNormalAdr(sstr);
    if (sstr.indexOf("#")==-1) {
        indexpage=0;
    }
    else if (sstr.indexOf("map")!=-1) {
        indexpage=1;
    }
    else {
        indexpage=2;
    }

    $('.parentContainer').load(kksk);
    activeAdder(kksk);
});


$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();

    $('a').click(function() {

        if (window.location.pathname.indexOf("timer")!=-1) {
            clearInterval(timerId);
        };

        var url = $(this).attr('href');
        var downloadA=getNormalAdr(url);




        $('.parentContainer').load(downloadA);
        // А вот так просто меняется ссылка
        if(url != window.location){
            window.history.pushState(null, null, url);
        };

        activeAdder(downloadA);
        // Предотвращаем дефолтное поведение
        return false;
    });
});

$(window).bind('popstate', function() {

    var lastPage = location.pathname+location.hash;
    var lastUrl=getNormalAdr(lastPage);

    $('.parentContainer').load(lastUrl);

    if (indexpage==2) {
        clearInterval(timerId);
    };
    activeAdder(lastUrl);

});


function getNormalAdr(mypage) {
    if (mypage.indexOf("#")==-1) {
        return "indexcash.html";
    }
    else if (mypage.indexOf("map")!=-1) {
        return "mapcash.html";
    }
    else {
        return "timercash.html";
    }
};

function activeAdder(myurl) {

    $("#firstLi").removeClass();
    $("#secondLi").removeClass();
    $("#thirdLi").removeClass();
    if (myurl.indexOf("map")!=-1) {
        $("#secondLi").addClass("active");
        indexpage=1;
    }
    else if (myurl.indexOf("timer")!=-1){
        $("#thirdLi").addClass("active");
        indexpage=2;
    }
    else {
        $("#firstLi").addClass("active");
        indexpage=0;
    }
}

function declOfNum(number, titles)
{
    var  cases = [2, 0, 1, 1, 1, 2];
    return titles[
        (number % 100 > 4 && number % 100 < 20)
            ?
            2
            :
            cases[(number % 10 < 5) ? number % 10 : 5]
        ];
}