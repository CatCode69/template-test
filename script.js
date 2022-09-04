const music = document.querySelector("audio");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const playBtn = document.getElementById("play");
const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const musicCurTime = document.getElementById("current-time");
const musicDuration = document.getElementById("duration");
const musicProgress = document.getElementById("progress");

// Music
const songs = [
  {
    name: "jacinto-1",
    displayName: "Electric Chill Machine",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-2",
    displayName: "Seven Nation Army (Remix)",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-3",
    displayName: "Goodnight, Disco Queen",
    artist: "Jacinto Design",
  },
  {
    name: "metric-1",
    displayName: "Front Row (Remix)",
    artist: "Meric/Jacinto Design",
  },
];

// Check if Playing
let isPlaying = false;

// Play
function playSong() {
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  isPlaying = true;
  music.play();
}

// Pause
function pauseSong() {
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  isPlaying = false;
  music.pause();
}

// Play or Pause Event Listener
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));

// Progress Bar
function secToMinConvert(sec) {
  const timeString =
    `${Math.floor(sec / 60)}`.padStart(2, 0) +
    ":" +
    `${Math.round(sec % 60)}`.padStart(2, 0);
  return timeString;
}

function updateProgressBar() {
  musicDuration.textContent = secToMinConvert(music.duration);
  musicCurTime.textContent = "00:00";
  musicProgress.style.width = "0%";

  const changeProgressBarWidth = () => {
    if (isPlaying) {
      musicCurTime.textContent = secToMinConvert(music.currentTime);
      musicProgress.style.width = `${
        (music.currentTime / music.duration) * 100
      }%`;
      if (music.ended) {
        musicProgress.style.width = "0%";
        musicCurTime.textContent = "00:00";
        pauseSong();
        // clearInterval(progressChangerInterval);
      }
    }
  };
  const progressChangerInterval = setInterval(changeProgressBarWidth, 1000);

  changeProgressBarWidth();
}

// Update DOM
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
  music.onloadedmetadata = updateProgressBar;
}

// On Load - Select First Song
loadSong(songs[0]);

// Song Next & Prev
function nextSong(e) {
  pauseSong();
  const currIndex = songs.findIndex(
    (item) => item.displayName === title.textContent
  );
  if (currIndex >= 0 && currIndex <= songs.length - 2) {
    loadSong(songs[currIndex + 1]);
    playSong();
  } else {
    loadSong(songs[0]);
    playSong();
  }
}

function prevSong() {
  pauseSong();
  const currIndex = songs.findIndex(
    (item) => item.displayName === title.textContent
  );
  if (currIndex >= 1 && currIndex <= songs.length) {
    loadSong(songs[currIndex - 1]);
    playSong();
  } else {
    loadSong(songs[songs.length - 1]);
    playSong();
  }
}

// Event Listeners
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);
musicProgress.parentElement.addEventListener(
  "click",
  (e) => {
    const containerWidth = Number.parseFloat(
      getComputedStyle(e.currentTarget).width
    );
    const point = e.offsetX;
    musicProgress.style.width = `${(point / containerWidth) * 100}%`;
    music.currentTime = (music.duration * point) / containerWidth;
    musicCurTime.textContent = secToMinConvert(music.currentTime);
  },
  false
);

// Tst
const progressCircle = document.getElementById("progress-circle");
progressCircle.addEventListener("drag", (e) => {
  e.preventDefault();
  console.log(e);
  e.target.hidden = true;
});
