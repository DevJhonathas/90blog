let player;

const playlist = [
  {
    title: "Kyoko Kirigiri - Danganronpa Execution - Thick of it",
    videoId: "cd5s0K9Il9Y",
    // albumCover: "/src/img/albumCovers",
  },
  {
    title: "DECO*27 - Monitoring feat. Hatsune Miku",
    videoId: "kbNdx0yqbZE",
    // albumCover: "/src/img/albumCovers",
  },
  {
    title: "rusino - Looping the Rooms (ループザルーム) feat. Hatsune Miku",
    videoId: "icBDYkfxpMs",
    // albumCover: "/src/img/albumCovers",
  },
  {
    title: "Mesmerizer / Hatsune Miku＆Kasane Teto",
    videoId: "19y8YTbvri8",
    // albumCover: "/src/img/albumCovers",
  },
  {
    title: "いますぐ輪廻（Retry Now）/ NAKISO feat. Hatsune Miku",
    videoId: "3iUgKH8c7p4",
    // albumCover: "/src/img/albumCovers",
  },
  {
    title: "[MV] ABM - '次元通信' (Signaling) Hatsune Miku & Kasane Teto",
    videoId: "PqpCRSOUuIE",
    // albumCover: "/src/img/albumCovers",
  },
  {
    title:
      "バゥムクゥヘン・エンドロゥル / 雨良 feat.初音ミクVS重音テトVS亞北ネル(Baumkuchen End Credits / Amala ft.Miku vs Teto vs Neru)",
    videoId: "Dz5rALpx06M",
    // albumCover: "/src/img/albumCovers",
  },
  {
    title: "Tetoris / Kasane Teto",
    videoId: "Soy4jGPHr3g",
    // albumCover: "/src/img/albumCovers",
  },
];

const playlistPlayer = document.getElementById("playlistPlayer");
const trackTitle = document.getElementById("trackTitle");
const playlistContainer = document.getElementById("playlistContainer");
let currentTrack = 0;

// Create playlist items
playlist.forEach((track, index) => {
  const item = document.createElement("div");
  item.className = "playlist-item";
  item.textContent = track.title;
  item.addEventListener("click", () => {
    playTrack(index);
  });
  playlistContainer.appendChild(item);
});

function playTrack(index) {
  currentTrack = index;
  playlistPlayer.src = playlist[index].src;
  playlistPlayer.play();

  // Update UI
  trackTitle.textContent = `Now Playing: ${playlist[index].title}`;
  document.querySelectorAll(".playlist-item").forEach((item, i) => {
    item.classList.toggle("active", i === index);
  });

  playBtn2.textContent = "Pause";
  playBtn2.innerHTML = " Pause";
}

function togglePlayPause() {
  if (playlistPlayer.paused) {
    playlistPlayer.play();
    playBtn2.textContent = "Pause";
    playBtn2.innerHTML = " Pause";
  } else {
    playlistPlayer.pause();
    playBtn2.textContent = "Play";
    playBtn2.innerHTML = " Play";
  }
}

function nextTrack() {
  currentTrack = (currentTrack + 1) % playlist.length;
  playTrack(currentTrack);
}

function prevTrack() {
  currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
  playTrack(currentTrack);
}

// Initialize
playTrack(0);

function onYouTubeIframeAPIReady() {
  player = new YT.Player("youtube-player", {
    width: "200",
    height: "200",
    videoId: "cd5s0K9Il9Y",
    playerVars: {
      autoplay: 1,
      controls: 0,
      loop: 1,
      playlist: "cd5s0K9Il9Y",
    },
    events: {
      onReady: function (event) {
        event.target.setVolume(10);
        event.target.playVideo();
      },
    },
  });
}
