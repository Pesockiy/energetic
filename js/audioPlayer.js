
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
      } else if(audio.currentTime === audio.duration) {
        progress.classList.remove('active');
      }
    }

    // set current track
    function changeCounter() {
      let counter = audioPlayer.querySelector('.block-count');
      counter.innerHTML = `${currentTrackIdx + 1}/${data.length}`;
    };
    setNameAndPosition();
    changeCounter();
  };
};