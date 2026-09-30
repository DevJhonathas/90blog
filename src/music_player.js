const songImage = document.getElementById("song-image");
const songName = document.getElementById("song-name");
const songArtist = document.getElementById("song-artist");
const songSlider = document.getElementById("slider-song");
const playpauseButton = document.getElementById("playpause-song");
const prevSongButton = document.getElementById("prev-song");
const nextSongButton = document.getElementById("next-song");

// Need to add fuctions for repeating and shuffling songs.
const repeatSongButton = document.getElementById("repeat-song");
const shuffleSongButton = document.getElementById("shuffle-song");
const musicplayer = document.getElementById("music-player");

const songs = [
  {
    audio: "cd5s0K9Il9Y",
  },
  {
    audio: "kbNdx0yqbZE",
  },
  {
    audio: "icBDYkfxpMs",
  },
  {
    audio: "19y8YTbvri8",
  },
  {
    audio: "3iUgKH8c7p4",
  },
];

let currentSongIndex = 0;
let player = null;
let playerReady = false;
let isSeeking = false;

const tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";

const firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubeIframeAPIReady() {
  player = new YT.Player("youtube-player", {
    width: "0",
    height: "0",

    videoId: songs[currentSongIndex].audio,

    playerVars: {
      autoplay: 0,
      controls: 0,
      playsinline: 1,
    },

    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".marquee-container");
  const content = document.querySelector(".marquee-content");
  let isPaused = false;
  let startTime = null;
  const speed = 100; // Pixels per second
  let containerWidth = container.offsetWidth;
  let contentWidth = content.offsetWidth;

  function animateMarquee(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsedTime = (timestamp - startTime) / 2000;

    if (!isPaused) {
      const distance = speed * elapsedTime;
      const position = -distance % (contentWidth + containerWidth);
      content.style.transform = `translateX(${position}px)`;
    }

    requestAnimationFrame(animateMarquee);
  }

  // Start animation
  requestAnimationFrame(animateMarquee);
  // Handle resize
  window.addEventListener("resize", () => {
    containerWidth = container.offsetWidth;
    contentWidth = content.offsetWidth;
  });

  container.addEventListener("mouseenter", () => {
    isPaused = true;
  });

  // Resume on mouse leave
  container.addEventListener("mouseleave", () => {
    isPaused = false;
  });
});

// animate(musicplayer);

// function animate(element) {
//   let elementWidth = element.offsetWidth;
//   let parentWidth = element.parentElement.offsetWidth;
//   let flag = 0;

//   setInterval(() => {
//     element.style.marginLeft = --flag + "px";

//     if (elementWidth == -flag) {
//       flag = parentWidth;
//     }
//   }, 10);
// }

songSlider.addEventListener("pointerdown", function () {
  isSeeking = true;
});

songSlider.addEventListener("input", function () {
  if (!playerReady) {
    return;
  }

  player.seekTo(Number(songSlider.value), true);
});

songSlider.addEventListener("pointerup", function () {
  isSeeking = false;
});

function onPlayerReady(event) {
  playerReady = true;

  event.target.setVolume(10);

  updateSong();
}

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.PLAYING) {
    playpauseButton.classList.remove("fa-circle-play");
    playpauseButton.classList.add("fa-circle-pause");
  } else if (
    event.data === YT.PlayerState.PAUSED ||
    event.data === YT.PlayerState.ENDED
  ) {
    playpauseButton.classList.remove("fa-circle-pause");
    playpauseButton.classList.add("fa-circle-play");
  }

  if (event.data === YT.PlayerState.ENDED) {
    if (currentSongIndex < songs.length - 1) {
      currentSongIndex++;
      updateSong();
    }
  }
}

prevSongButton.addEventListener("click", function () {
  if (!playerReady) {
    return;
  }
  currentSongIndex--;

  if (currentSongIndex < 0) {
    currentSongIndex = songs.length - 1;
  }
  updateSong();
});

nextSongButton.addEventListener("click", function () {
  if (!playerReady) {
    return;
  }

  currentSongIndex++;

  if (currentSongIndex >= songs.length) {
    currentSongIndex = 0;
  }
  updateSong();
});

playpauseButton.addEventListener("click", function () {
  if (!playerReady) {
    return;
  }

  const state = player.getPlayerState();

  if (state === YT.PlayerState.PLAYING) {
    player.pauseVideo();
  } else {
    player.playVideo();
  }
});

async function getYouTubeInfo(videoId) {
  const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;

  const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(youtubeUrl)}&format=json`;

  const response = await fetch(oembedUrl);

  if (!response.ok) {
    throw new Error("Não foi possível obter informações do YouTube.");
  }

  const data = await response.json();

  return {
    name: data.title,
    artist: data.author_name,
    image: data.thumbnail_url,
    channelUrl: data.author_url,
  };
}
async function updateSong() {
  const song = songs[currentSongIndex];

  songSlider.value = 0;

  try {
    const info = await getYouTubeInfo(song.audio);

    songImage.src = info.image;

    songName.innerText = info.name;

    songArtist.innerText = info.artist;

    if (playerReady) {
      player.loadVideoById(song.audio);
    }
  } catch (error) {
    console.error("Erro ao buscar informações do YouTube:", error);

    songName.innerText = "Unknown song";
    songArtist.innerText = "Unknown artist";

    if (playerReady) {
      player.loadVideoById(song.audio);
    }
  }
}

function moveSlider() {
  if (!playerReady || isSeeking) {
    return;
  }

  const duration = player.getDuration();

  if (duration > 0) {
    songSlider.max = duration;

    songSlider.value = player.getCurrentTime();
  }
}

setInterval(moveSlider, 1000);
