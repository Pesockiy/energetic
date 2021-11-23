// commonn 

//start animation when scrolling
if (AOS) {
    AOS.init();
};


// tabs nav

if (document.querySelector(".service__tabs-nav")) {
    let serviceTabsBlock = document.querySelector('.service__tabs');
    let tabs = serviceTabsBlock.querySelectorAll('.service__tab');
    let blocksToShow = serviceTabsBlock.querySelectorAll('.service__content-wrapper');
    let tabsWrapper = document.querySelector('.service__tabs-nav');
    let contentBody = document.querySelector('.service__content-body');

    function mobileTabs() {
        // let tabsButtons = serviceTabsBlock.querySelectorAll('.service__control-button');
        [...tabs].forEach((tab, index) => {
            blocksToShow[index].insertAdjacentElement('beforebegin', tab);
        });
    };
    function desktopTabs() {
        [...contentBody.querySelectorAll('.service__tab')].forEach((item) => {
            tabsWrapper.appendChild(item);
        });
    };
    if (window.screen.width <= 768) {
        mobileTabs()
    }
    window.addEventListener("orientationchange", function () {
        if (window.screen.width <= 768) {
            mobileTabs();

        } else {
            desktopTabs()
        }

    }, false);

    window.addEventListener('click', (event) => {
        let e = event.target;
        if (!e.classList.contains('service__tab')) return;
        event.preventDefault();
        if (e.classList.contains('active')) {
            if (window.innerWidth <= 768) {
                blocksToShow[[...tabs].indexOf(e)].classList.remove('active');
                e.classList.remove('active');
            }
        } else {
            [...tabs].forEach((elem, index) => {
                elem.classList.remove('active');
                blocksToShow[index].classList.remove('active');
            });
            // blocksToShow[[...tabs].indexOf(e)].classList.toggle('active');
            // e.classList.toggle('active');
            blocksToShow[[...tabs].indexOf(e)].classList.add('active');
            e.classList.add('active');
        };
    });
};



// sliders

if (document.querySelector('.splide--achievements') && window.screen.width <= 768) {

    if (document.querySelector('.splide--achievements')) {
        let splide = new Splide('.splide--achievements', {
            type: 'slide',
            rewind: true,
            classes: {
                arrows: 'b-arrows achievements__arrows',
                arrow: 'b-arrow',
                prev: 'b-arrow__prev achievements__prev',
                next: 'b-arrow__next achievements__next',
            },
            perPage: 1,
        }).mount();
    };
};


if (document.querySelector('.splide.splide--clients-say')) {


    if (document.querySelector('.splide.splide--clients-say')) {
        let n = 2;
        if (window.screen.width <= 768) n = 1;
        let splide = new Splide('.splide.splide--clients-say', {
            type: 'slide',
            rewind: true,
            perMove: 1,
            gap: 24,
            classes: {
                arrows: 'clients-say__arrows',
                arrow: 'b__arrow',
                prev: 'b-arrow__prev clients-say__prev',
                next: 'b-arrow__next clients-say__next',
            },
            perPage: n,
        }).mount();
        function writeIndex() {
            document.querySelector('.splide.splide--clients-say .b-count').innerHTML =
                `${splide.index + 1} / ${splide.length}`;
        };
        splide.on('mounted', writeIndex);
        splide.on('moved', writeIndex);
        splide.on('moved', writeIndex)
        splide.on('mounted', function () {
            if (document.querySelectorAll('.splide--clients-say .splide__slide').length < 3) {
                document.querySelector('.clients-say__arrows').classList.add('hide');
                [...document.querySelectorAll('.clients-say .splide__pagination')].forEach(el => el.classList.add('hide'));
            };
        });
        splide.mount();
    };
};

if (document.querySelector('.advantages .splide--advantages') && window.screen.width <= 992) {
    let n = null;
    if (window.screen.width > 768 && window.screen.width <= 992) {
        n = 2;
    } else if (window.screen.width <= 768) {
        n = 1;
    };
    if (document.querySelector('.advantages .splide--advantages')) {
        let splide = new Splide('.splide--advantages', {
            type: 'slide',
            rewind: true,
            arrows: false,
            perPage: n,
        }).mount();
    };
};

function changeCounterSlider() {

    let activeSlide = document.querySelector('.splide--top-slider .splide__slide.is-active') || document.querySelector('.splide--top-slider .splide__slide');
    let elementsToCount = [...document.querySelectorAll('.splide--top-slider .splide__slide')];

    document.querySelector('.b-count').innerHTML = `${elementsToCount.indexOf(activeSlide) + 1} / ${elementsToCount.length}`;

};

if (document.querySelector('.splide--top-slider')) {

    changeCounterSlider();
    let splide = new Splide('.splide--top-slider', {
        type: 'slide',
        rewind: true,
        autoHeight: true,
        focus: 'top',
        classes: {
            arrows: 'main-banner__b-arrows',
            arrow: 'main-banner__arrows b-arrows',
            prev: 'main-banner__prev',
            next: 'main-banner__next',
        },
    }).mount();
    splide.on('mounted', changeCounterSlider);
    splide.on('moved', changeCounterSlider);
};


[...document.querySelectorAll('.btn-success')].forEach((elem) => {
    elem.addEventListener('click', (event) => {
        event.preventDefault();
        document.body.classList.add('ov-hidden');
        document.getElementById('successModal').classList.add('active');
    });
});

// block map

if (document.getElementById("mapContent")) {

    let officeTabs = document.querySelector(".map__buttons"),
        mapPopUp = document.getElementsByClassName("map__pop-up")[0],
        tabsPane = officeTabs.getElementsByTagName("div");

    if (officeTabs && mapPopUp && tabsPane) {
        for (let i = 0; i < tabsPane.length; i++) {
            tabsPane[i].addEventListener('click', function () {
                officeTabs.querySelectorAll(".map__button ")
                [0].classList.remove("map__button--active");
                tabsPane[i].classList.add("map__button--active");
                mapPopUp.getElementsByClassName("map__body--active")
                [0].classList.remove("map__body--active");
                mapPopUp.getElementsByClassName("map__body")
                [i].classList.add("map__body--active");
                initMap(i);
            });
        }
    }


    function initMap(officeNum) {

        const markerIcon = "img/contacts/img/Vector.png";
        const style = [
            {
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f5f5f5"
                    }
                ]
            },
            {
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#616161"
                    }
                ]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#f5f5f5"
                    }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#bdbdbd"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#eeeeee"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#757575"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#e5e5e5"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#9e9e9e"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#757575"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#dadada"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#616161"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#9e9e9e"
                    }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#e5e5e5"
                    }
                ]
            },
            {
                "featureType": "transit.station",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#eeeeee"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#c9c9c9"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#9e9e9e"
                    }
                ]
            }
        ]
        var options = {
            center: { lat: 50.439195, lng: 30.498895 },
            zoom: 15,
            styles: style,
            disableDefaultUI: true,
            zoomControl: true,
            zoomControlOptions: {
                position: google.maps.ControlPosition.LEFT_BOTTOM,
            }
        }
        switch (officeNum) {
            case 0:
                var map = new google.maps.Map(document.getElementById("mapContent"), options);
                new google.maps.Marker({ position: options.center, map, icon: markerIcon });
                break;
            case 1:
                options.center = { lat: 50.005087, lng: 36.235387 }
                var map = new google.maps.Map(document.getElementById("mapContent"), options);
                new google.maps.Marker({ position: options.center, map, icon: markerIcon });
                break;
            case 2:
                options.center = { lat: 48.466679032420245, lng: 35.05084168879543 }
                var map = new google.maps.Map(document.getElementById("mapContent"), options);
                new google.maps.Marker({ position: options.center, map, icon: markerIcon });
                break;
            case 3:
                options.center = { lat: 49.43431405982574, lng: 32.08669767736745 }
                var map = new google.maps.Map(document.getElementById("mapContent"), options);
                new google.maps.Marker({ position: options.center, map, icon: markerIcon });
                break;
            case 4:
                options.center = { lat: 51.506783002574856, lng: 31.331699011797824 }
                var map = new google.maps.Map(document.getElementById("mapContent"), options);
                new google.maps.Marker({ position: options.center, map, icon: markerIcon });
                break;
            case 5:
                options.center = { lat: 46.438077296659664, lng: 30.768826884675025 }
                var map = new google.maps.Map(document.getElementById("mapContent"), options);
                new google.maps.Marker({ position: options.center, map, icon: markerIcon });
                break;
            case 6:
                options.center = { lat: 50.05658053240624, lng: 19.9321721866157 }
                var map = new google.maps.Map(document.getElementById("mapContent"), options);
                new google.maps.Marker({ position: options.center, map, icon: markerIcon });
                break;
            case 7:
                options.center = { lat: 52.522868330988985, lng: 13.36802522716684 }
                var map = new google.maps.Map(document.getElementById("mapContent"), options);
                new google.maps.Marker({ position: options.center, map, icon: markerIcon });
                break;
            case 8:
                options.center = { lat: 40.76123865498767, lng: -73.97057743080022 }
                var map = new google.maps.Map(document.getElementById("mapContent"), options);
                new google.maps.Marker({ position: options.center, map, icon: markerIcon });
                break;
            default:
                var map = new google.maps.Map(document.getElementById("mapContent"), options);
                new google.maps.Marker({ position: options.center, map, icon: markerIcon });
                break;
        }
    }
};

function setTop() {
    let header = document.querySelector('header');
    let headerHeight = header.offsetHeight;
    // document.querySelector('.wrapper').style.top = headerHeight + 43 + 'px';
    window.addEventListener('scroll', () => {
        if (window.pageYOffset <= 1) {
            header.classList.remove('fixed');
        } else {
            header.classList.add('fixed');
        }
    });
};
setTop();
window.addEventListener('scroll', setTop);


// json player inite
if (document.getElementById('my-player')) {
    let animation = bodymovin.loadAnimation({
        // animationData: { /* ... */ },
        container: document.getElementById('my-player'), // required
        path: './locator_json_2.json', // required
        renderer: 'svg', // required
        loop: true, // optional
        autoplay: true, // optional
        name: "Demo Animation", // optional
    });
};


// phone mask
if (document.querySelectorAll('input[type="tel"]')) {
    window.addEventListener("DOMContentLoaded", function () {
        [].forEach.call(document.querySelectorAll('input[type="tel"]'), function (input) {

            // check page language
            // change checking language for other
            let matrix;
            switch (navigator.language || navigator.userLanguage) {
                // case 'uk-UA':
                //     matrix = "+380 (__) ___ __ __";
                //     input.placeholder = "+380";

                //     break;
                // case 'ru-RU':
                //     matrix = "+7 (___) ___ __ __";
                //     input.placeholder = "+7";
                //     break;

                // case 'en-US':
                //     // chagge mask for necessary country
                //     matrix = " (__) ___ __ __";
                //     input.placeholder = "";

                //     break;
                default:
                    matrix = "+380 (__) ___ __ __";
                    input.placeholder = "+380";
                    break;
            }

            let keyCode;
            function mask(event) {
                event.keyCode && (keyCode = event.keyCode);
                let pos = this.selectionStart;
                if (pos < 3) event.preventDefault();


                // let matrix = "+380 (__) ___ __ __",
                let i = 0,
                    def = matrix.replace(/\D/g, ""),
                    val = this.value.replace(/\D/g, ""),
                    new_value = matrix.replace(/[_\d]/g, function (a) {
                        return i < val.length ? val.charAt(i++) || def.charAt(i) : a
                    });
                i = new_value.indexOf("_");
                if (i != -1) {
                    i < 5 && (i = 3);
                    new_value = new_value.slice(0, i)
                }
                let reg = matrix.substr(0, this.value.length).replace(/_+/g,
                    function (a) {
                        return "\\d{1," + a.length + "}"
                    }).replace(/[+()]/g, "\\$&");
                reg = new RegExp("^" + reg + "$");
                if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
                if (event.type == "blur" && this.value.length < 5) this.value = ""
            }

            input.addEventListener("input", mask, false);
            input.addEventListener("focus", mask, false);
            input.addEventListener("blur", mask, false);
            input.addEventListener("keydown", mask, false)

        });

    });
};


if (document.querySelector('.policy__nav')) {

    let policyNavBtns = document.querySelectorAll('.policy__nav-item');
    window.addEventListener('click', (event) => {
        let e = event.target;
        if (!e.classList.contains('policy__nav-link')) return;
        event.preventDefault();

        [...policyNavBtns].forEach(el => {
            el.classList.remove('active');
        });
        e.closest('.policy__nav-item').classList.add('active');
        document.querySelector('.policy__nav-list').style.top = document.querySelector('header').offsetHeight + 30 + 'px';
        window.scroll({ top: document.querySelector(`${e.hash}`).offsetTop - document.querySelector('header').offsetHeight, behavior: 'smooth' });
    });
};

if (document.querySelectorAll('.btn-get-relation')) {
    let btnsModal = document.querySelectorAll('.btn-get-relation');
    [...btnsModal].forEach(element => {
        element.addEventListener('click', (event) => {
            event.preventDefault();
            document.body.classList.add('ov-hidden');
            if (document.getElementById('consultationModal')) {
                document.getElementById('consultationModal').classList.add('active');
                document.getElementById('consultationModal').querySelector('.modal__close-btn').onclick = function () {
                    document.body.classList.remove('ov-hidden');
                    document.getElementById('consultationModal').classList.remove('active');
                };
            };

        });
    });

}

if (document.querySelectorAll('.btn-get-relation')) {
    let btnsModalSuccess = document.querySelectorAll('.btn-success');
    [...btnsModalSuccess].forEach(element => {
        element.addEventListener('click', (event) => {
            event.preventDefault();
            if (document.getElementById('consultationModal')) {
                document.getElementById('consultationModal').classList.remove('active');
                if (document.querySelector('.nav__mobile.active')) {
                    document.querySelector('.nav__mobile').classList.remove('active');
                    document.querySelector('.burger-btn').classList.remove('active');

                };
            }
            document.getElementById('successModal').classList.add('active');
            document.body.classList.remove('ov-hidden');
            [...document.querySelectorAll('#successModal .modal__close-btn')]
                .forEach(elem => {
                    elem.addEventListener('click', function (e) {
                        document.getElementById('successModal').classList.remove('active');
                        document.body.classList.remove('ov-hidden');

                    });
                });

            if (document.getElementById('successModal').classList.contains('active')) {
                document.body.classList.add('ov-hidden');

            }
        });
    });
}



// audio player
if (document.querySelector('.audio-player')) {
    initAudioPlayer([
        // test audio
        {
            track: "media/call Yevhen.wav",
            operator: "img/specialist1.webp",
            location: "Галузь: медицина",
            name: 'Євген Шевченко',
            position: 'Спеціаліст з обслуговування',
        },
        {
            track: "media/call Olena.wav",
            operator: "img/specialist2.webp",
            location: "Галузь: фінанси",
            name: 'Олена Данилюк',
            position: 'Спеціаліст з обслуговування',
        }
    ]);

    function initAudioPlayer(data) {
        const audioPlayer = document.querySelector(".audio-player");
        const timeline = audioPlayer.querySelector(".progress__timeline");
        const progress = audioPlayer.querySelector(".progress__progress");
        const prevBtn = audioPlayer.querySelector(".audio-player__button_prev");
        const playBtn = audioPlayer.querySelector(".audio-player__button_play");
        const nextBtn = audioPlayer.querySelector(".audio-player__button_next");
        const serviceLocation = audioPlayer.querySelector(".audio-player__location");
        const operator = audioPlayer.querySelector(".audio-player__img");

        const audio = new Audio();
        const lastTrackIdx = data.length - 1;

        let currentTrackIdx = 0;

        window.onload = setParams;

        function setParams() {
            audio.src = data[currentTrackIdx].track;
            serviceLocation.textContent = data[currentTrackIdx].location;
            operator.src = data[currentTrackIdx].operator;
        }

        audio.addEventListener("loadeddata", () => {
            const duration = audioPlayer.querySelector(".progress__duration");

            duration.textContent = getTimeCodeFromNum(audio.duration);
        });

        timeline.addEventListener("click", (e) => {
            const timelineWidth = window.getComputedStyle(timeline).width;
            const timeToSeek = (e.offsetX / parseInt(timelineWidth)) * audio.duration;

            audio.currentTime = timeToSeek;
        });

        //check audio percentage and update time accordingly

        audio.addEventListener("timeupdate", function () {
            checkEndAudio();
            setProgressLine();

            const time = audioPlayer.querySelector(".progress__time");
            progress.style.width = (audio.currentTime / audio.duration) * 100 + "%";
            time.textContent = getTimeCodeFromNum(audio.currentTime);
        });

        function getTimeCodeFromNum(num) {
            let min = Math.floor(num / 60);
            let sec = Math.floor(num % 60);

            min = min < 10 ? `0${min}` : min;
            sec = sec < 10 ? `0${sec}` : sec;

            return `${min}:${sec}`;
        };

        //toggle between playing and pausing on button click

        playBtn.addEventListener("click", () => {
            if (audio.paused) {
                playBtn.classList.add("audio-player__button_pause");
                audio.play();
            } else {
                playBtn.classList.remove("audio-player__button_pause");
                audio.pause();
            };
        });


        if (audio.currentTime === audio.duration) {
            playBtn.classList.remove("audio-player__button_pause");
        }

        //toggle between previous and next track

        nextBtn.addEventListener("click", () => {
            currentTrackIdx++;
            if (currentTrackIdx > lastTrackIdx) {
                currentTrackIdx = 0;
            };
            setNameAndPosition();
            changeCounter();
            setParams();
            setProgressLine();
            audio.play();
            playBtn.classList.add("audio-player__button_pause");
        });

        prevBtn.addEventListener("click", () => {
            currentTrackIdx--;

            if (currentTrackIdx < 0) {
                currentTrackIdx = lastTrackIdx;
            };
            setNameAndPosition();
            changeCounter();
            setParams();
            setProgressLine();
            audio.play();
            playBtn.classList.add("audio-player__button_pause");
        });


        // customs
        // set name and pos
        function setNameAndPosition() {
            let name = audioPlayer.querySelector('.planch__ttl');
            let post = audioPlayer.querySelector('.planch__text');
            name.innerHTML = data[currentTrackIdx].name;
            post.innerHTML = data[currentTrackIdx].position;
        }
        // check and removing class 'pause' from play button
        function checkEndAudio() {
            if (audio.currentTime === audio.duration) {
                playBtn.classList.remove("audio-player__button_pause");
            }
        }

        // set / unset playing track line

        function setProgressLine() {
            if (audio.currentTime !== audio.duration) {
                progress.classList.add('active');
            } else if (audio.currentTime === audio.duration) {
                progress.classList.remove('active');
            }
        }

        // set current track
        function changeCounter() {
            let counter = audioPlayer.querySelector('.b-count');
            counter.innerHTML = `${currentTrackIdx + 1}/${data.length}`;
        };
        setNameAndPosition();
        changeCounter();
    };
};

if (document.querySelector('.section.more-asks .container')) {

    const container = document.querySelector('section.more-asks .container'),
        items = container.querySelectorAll('.common-accordion'),
        questions = container.querySelectorAll('.common-accordion__header');

    if (container) {
        function toggleAccordion() {
            const thisItem = this.parentNode;
            items.forEach(item => {
                if (thisItem == item) {
                    thisItem.classList.toggle('collapsed');
                    return;
                }
                item.classList.remove('collapsed');
            })
        }
        questions.forEach(question => question.addEventListener('click', toggleAccordion));
    }
}


if (document.getElementById('errorModal')) {
    document.getElementById('errorModal').classList.add('active');
    document.body.classList.add('ov-hidden');

    document.querySelector('#errorModal .modal__close-btn').addEventListener('click', (e) => {
        e.target.closest('#errorModal').classList.remove('active');
        document.body.classList.remove('ov-hidden');
    })
    document.querySelector('.main-btn--rel').addEventListener('click', () => {
        window.location.reload();
    });
};


if (document.querySelector('.accordion')) {
    let accordion = document.querySelector('.accordion');
    let tabs = accordion.querySelectorAll('.accordion__tab');
    let accordionContents = accordion.querySelectorAll('.accordion__content');

    let resetClass = (collection, className = 'active') => {
        collection.forEach(elem => {
            // console.log(elem)
            elem.classList.remove(`${className}`);
        });
    }

    // let setActiveTab = (event) => {
    //     resetClass(tabs);
    //     resetClass(accordionContents);
    //     this.classList.add('active');
    //     accordionContents[index].classList.add('active')
    // };

    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            resetClass(tabs);
            resetClass(accordionContents);
            tab.classList.add('active');
            if (!(tab.nextElementSibling == null) && !tab.nextElementSibling.matches('.accordion__content')) {
                accordionContents[index].classList.add('active');
            } else if (tab.nextElementSibling == null) {
                accordionContents[index].classList.add('active');
            }

            if (!(tab.nextElementSibling == null) && tab.nextElementSibling.matches('.accordion__content')) {

                tab.nextElementSibling.classList.add('active');
                let deskTabs = [...tabs].splice(0, tabs.length / 2);
                deskTabs[index - tabs.length / 2].classList.add('active');

            };
        });
    });
};
// mobile nav
if (document.querySelector('.header')) {

    let body = document.body;
    let btnBurger = body.querySelector('.burger-btn');
    let mobileNav = body.querySelector('.header__nav');

    btnBurger.addEventListener('click', () => {
        btnBurger.classList.toggle('active');
        mobileNav.classList.toggle('active');
        if (btnBurger.classList.contains('active')) {
            body.classList.add('ov-hidden');
        } else body.classList.remove('ov-hidden');

    });
};

window.onresize = () => {
    if(window.innerWidth >= 1040) {
        document.body.classList.remove('ov-hidden')
    }
}



