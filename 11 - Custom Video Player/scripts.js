/*1. Get our Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

/*2. Build out Functions */
function togglePlay() {
  if(video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

// This is the above refactored (kinda hard to read)
// function togglePlay() {
//   const method = video.paused ? 'play' : 'pause';
//   video[method]();
// }

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value // this == video and we are taking the element property 'name' and making it == this.value 👍
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

/*3. hook up */
// plays video
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);
// Updates video play
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

// Skips around buttons
skipButtons.forEach(button => button.addEventListener('click', skip))

// drag time range
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

// video progress bar
video.addEventListener('timeupdate', handleProgress);

// scrub video
 let mousedown = false;
progress.addEventListener('click', scrub)
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
