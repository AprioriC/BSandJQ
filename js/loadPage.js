/**
 * Created by andre on 24.01.2017.
 */
"use strict";

var myDate = Date.now();

//значения indexpage 0-index.html , 1- map.html, 2-timer.html,
//необходимы для завершения таймера при переходе назад
var indexpage = -1;

function getSeconds() {
    var newDate = Date.now();
    var mySeconds = newDate - myDate;
    mySeconds = Math.round(mySeconds / 1000)
    return mySeconds;
};

//таймер
var timerId;


function upTimer() {
    //выполняется при переходе на страницу таймера
    var myTmrMin = $(".TimerMinVal");
    var myTmrSec = $(".TimerSecVal");

    var myTmrMinName = $(".timerMinName");
    var myTmrSecName = $(".timerSecName");

    var secondsContainer = $(".seconds-container");
    var minutesContainer = $(".minutes-container");

    changeTimerValues(myTmrMin, myTmrSec, myTmrMinName, myTmrSecName, minutesContainer, secondsContainer);

    timerId = setInterval(function () {
        changeTimerValues(myTmrMin, myTmrSec, myTmrMinName, myTmrSecName, minutesContainer, secondsContainer);
    }, 1000)
};

function changeTimerValues(myTmrMin, myTmrSec, myTmrMinName, myTmrSecName, minutesContainer, secondsContainer) {
    //изменение тайсера
    var valSec = getSeconds();
    var minut = valSec / 60;
    var second = valSec - 60 * Math.floor(minut);
    myTmrMin.html(checkNum(Math.floor(minut)) + "");
    myTmrSec.html(checkNum(second) + "");
    var secGradus = (second / 60) * 360;
    var minGradus = ((minut % 60) / 60) * 360;
    secondsContainer.css("transform", "rotateZ(" + secGradus + "deg)");
    minutesContainer.css("transform", "rotateZ(" + minGradus + "deg)");


    //myTmrMinName.html(declOfNum(minut, minTitles ));
    // myTmrSecName.html(declOfNum(second, secTitles ));
};
function checkNum(number) {
    return number < 10 ? "0" + number : number;
};

function fadeOutnojquery() {
    //функция возник при загрузке карты
    //удаляет preloader
    var el = document.getElementById("escapingBall_1");

    $(".circle").css("animation", "holyCircle 4s");

    var map = document.getElementsByClassName("myMap")[0];
    var $speech = $('.myMap');
    el.style.opacity = 1;
    var interhellopreloader = setInterval(function () {
        el.style.opacity = el.style.opacity - 0.05;
        if (el.style.opacity <= 0.05) {
            clearInterval(interhellopreloader);
            el.style.display = "none";
            map.style.opacity=0;
            $speech.css("visibility", "visible");


            var mapload = setInterval(function () {
                map.style.opacity = Number(map.style.opacity) + 0.05;
                if (map.style.opacity>=0.9) {
                    map.style.opacity=1;
                    clearInterval(mapload);
                }
            }, 25);
        }

    }, 45);

};

$(".parentContainer").ready(function () {
    //при первом обращении к сайту загружает содержимое в контейнер
    var sstr = window.location.pathname + location.hash;
    var kksk = getNormalAdr(sstr);

    $('.parentContainer').load(kksk);
    activeAdder(kksk);
});


$(document).ready(function () {


    //инициализация всплывающих тултипов
    $('[data-toggle="tooltip"]').tooltip();

    //при клике по ссылке загрузить в контейнер html код
    $('a').click(function () {

        if (window.location.pathname.indexOf("timer") != -1) {
            clearInterval(timerId);
        }
        ;

        var url = $(this).attr('href');
        var downloadA = getNormalAdr(url);

        $('.parentContainer').load(downloadA);
        // А вот так просто меняется ссылка
        if (url != window.location) {
            window.history.pushState(null, null, url);
        }
        ;

        activeAdder(downloadA);
        // Предотвращаем дефолтное поведение
        return false;
    });
});

$(window).bind('popstate', function () {
    //для нормальной работы перехода назад в браузере
    var lastPage = location.pathname + location.hash;
    var lastUrl = getNormalAdr(lastPage);

    $('.parentContainer').load(lastUrl);

    if (indexpage == 2) {
        clearInterval(timerId);
    }
    ;

    activeAdder(lastUrl);

});


function getNormalAdr(mypage) {
    //преобразует ссылку из <a> в ссылку на необходимый html код
    if (mypage.indexOf("#") == -1) {
        return "indexcash.html";
    }
    else if (mypage.indexOf("map") != -1) {
        return "mapcash.html";
    }
    else {
        return "timercash.html";
    }
};

function activeAdder(myurl) {
    //выделяет ссылку на текущую страницу
    //в качестве аргумента - ссылка на html код (ссылка из <a> тоже подойдет, но не рекомендуется)
    $("#firstLi").removeClass();
    $("#secondLi").removeClass();
    $("#thirdLi").removeClass();
    if (myurl.indexOf("map") != -1) {
        $("#secondLi").addClass("active");
    }
    else if (myurl.indexOf("timer") != -1) {
        $("#thirdLi").addClass("active");
    }
    else {
        $("#firstLi").addClass("active");
    }

    //обновляем индекс страницыи заголовок
    updateindex(myurl);
}

function updateindex(myurl) {
    //обновление индекса страницы
    //и обновление заголовка
    if (myurl.indexOf("map") != -1) {
        indexpage = 1;
        $('title').html("Карта");
    }
    else if (myurl.indexOf("timer") != -1) {
        indexpage = 2;
        $('title').html("Таймер");
    }
    else {
        indexpage = 0;
        $('title').html("Резюме");
    }
}
