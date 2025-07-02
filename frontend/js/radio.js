let firstTime = true;

$(function () {
    var state = true;
    function toggleCd() {
        var efeitocd = "drop";
        var efeitodesc = "fold";
        var time = 300;
        var optionsCd = { direction: "up" };
        var optionsDesc = {};
        if ($("#cd").is(":visible")) {
            $("#cd").hide(efeitocd, optionsCd, time);
            setTimeout(function () {
                $("#music_description").show(efeitodesc, optionsDesc, time);
                $("#expand_history").animate({ left: '90%' }, 500);
            }, 400);
            optionsCd = { direction: "down" };
        }
        else {
            $("#music_description").hide(efeitodesc, optionsDesc, time);
            setTimeout(function () {
                $("#cd").show(efeitocd, optionsCd, time);
                $("#expand_history").animate({ left: '3%' }, 500);

            }, 400);
            optionsCd = { direction: "up" };
        }
    };


    $("#expand_history").on("click", function () {
        toggleCd();
    });

    function toggleLyrics() {
        var time = 300;
        var efeitoPlayer = "fold";
        var optionsPlayer = { direction: "top" };
        if (state) {
            $(".content_music_info").hide(efeitoPlayer, optionsPlayer, time);
            setTimeout(function () {
                $(".content_music_letra").animate({ height: '100%' }, time);
            }, 400);
        } else {
            $(".content_music_letra").animate({ height: '60%', }, time);
            setTimeout(function () {
                $(".content_music_info").show(efeitoPlayer, optionsPlayer, time);
            }, 400);
        }
        state = !state;
    }
    $("#expand_lyrics").on("click", function () {
        toggleLyrics();
    });
    let active = "#mainPage";
    function toggleMainPage(idtoShow, btn_activated, time_trans) {
        var efeito = "fade";
        var time = 400;
        var time_TS = time_trans;
        var options = {};
        let blocks = ["#mainPage", "#content", "#content_analytics", "#add_music"];

        if (idtoShow != active) {
            for (let i = 0; i < blocks.length; i++) {
                $(blocks[i]).hide(efeito, options, time);
            }
            setTimeout(function () {
                $(idtoShow).show(efeito, options, time);
                active = idtoShow;
                if (idtoShow != "#mainPage") {
                    $("#return_logo").show(efeito, options, time);
                    $("#content_logo").show(efeito, options, time);

                } else {
                    $("#return_logo").hide(efeito, options, time);
                    $("#content_logo").hide(efeito, options, time);

                }
                const rightNavElements = document.querySelectorAll('.right_nav svg');

                rightNavElements.forEach(svg => {
                    if (svg.id === btn_activated) {
                        svg.setAttribute('fill', 'grey');
                        svg.style.cursor = 'not-allowed';
                    } else {
                        svg.setAttribute('fill', 'white');
                        svg.style.cursor = 'pointer'; 
                    }
                });
            }, time_TS);
        } else {

        }
    }
    function presentationAnimation() {
        $("body").animate({'background-color': 'black'}, 100);
        const efeito = "fade";
        const time = 300; 
        const options = {};
    
        $("#mainPage").hide(efeito, options, time, function () {
            // Mostra a presentation1 após a mainPage desaparecer
            $("#presentation1").show(efeito, options, time + 100, function () {
                // Esconde a presentation1 após ela ser exibida
                setTimeout(() => {
                    $("#presentation1").hide(efeito, options, time, function () {
                        // Mostra a presentation2 após a presentation1 desaparecer
                        $("#presentation2").show(efeito, options, time + 100, function () {
                            // Esconde a presentation2 após ela ser exibida
                            setTimeout(() => {
                                $("#presentation2").hide(efeito, options, time, function () {
                                    // Mostra o player (content) após a presentation2 desaparecer
                                    toggleMainPage("#content", null, 500);
                                });
                            }, 1000); // Tempo que a presentation2 ficará visível
                        });
                    });
                }, 1000); // Tempo que a presentation1 ficará visível
            });
        });
    }
    $("#content_logo").on("click", function () {
        toggleMainPage("#content", "content_logo", 300);
    })
    $("#add_logo").on("click", function () {
        toggleMainPage("#add_music", "add_logo", 300);
    })
    $("#start").on("click", function () {
        if (firstTime) {
            presentationAnimation();
            firstTime = false;
        }else{
            toggleMainPage("#content", null, 500);
        }
    });
    $("#return_logo").on("click", function () {
        //$("body").animate({'background-color': '#1C1C1C'}, 1000);
        document.body.style.background = '#1C1C1C';
        toggleMainPage("#mainPage", null, 400);

    });
    $("#analytics_logo").on("click", function () {
        loadAndRenderPlaylist();
        toggleMainPage("#content_analytics", "analytics_logo", 300);
    });

});

function scrollPageTitle() {
    const baseTitle = document.title + " ";
    let scrollIndex = 0;

    setInterval(() => {
        document.title = baseTitle.slice(scrollIndex) + baseTitle.slice(0, scrollIndex);
        scrollIndex = (scrollIndex + 1) % baseTitle.length;
    }, 200);
}





