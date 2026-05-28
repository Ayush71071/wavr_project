class AudioController {
  constructor() {
    this.audio = new Audio();
    this.audio.preload = "auto";
  }

  setSrc(url) {
    if (this.audio.src !== url) {
      this.audio.src = url;
      this.audio.load();
    }
  }

  play() {
    this.audio.play().catch((err) => {
      console.warn("Playback prevented or failed:", err.message);
    });
  }

  pause() {
    this.audio.pause();
  }

  setVolume(vol) {
    // vol is 0-100, HTML5 volume is 0-1
    this.audio.volume = Math.max(0, Math.min(1, vol / 100));
  }

  setCurrentTime(percent, durationSec) {
    if (this.audio.duration) {
      this.audio.currentTime = (percent / 100) * this.audio.duration;
    } else if (durationSec) {
      this.audio.currentTime = (percent / 100) * durationSec;
    }
  }
}

const audioInstance = new AudioController();
export default audioInstance;
