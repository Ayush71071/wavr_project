import { useDispatch, useSelector } from "react-redux";
import {
  togglePlay, nextTrack, prevTrack,
  toggleShuffle, toggleRepeat, toggleLike, setProgress, setVolume,
} from "../redux/playerSlice";
import AlbumArt from "./AlbumArt";
import audioInstance from "../utils/audioController";
import "./PlayerBar.css";

const PlayerBar = () => {
  const dispatch = useDispatch();
  const { tracks, currentIndex, isPlaying, progress, volume, isShuffle, isRepeat, likedIds } =
    useSelector((s) => s.player);

  const track = tracks[currentIndex];
  const isLiked = likedIds.includes(track.id);

  const formatTime = (prog, dur) => {
    const sec = Math.floor((prog / 100) * dur);
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const p = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    audioInstance.setCurrentTime(p, track.durationSec);
    dispatch(setProgress(p));
  };

  const handleVolume = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const v = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const roundedVol = Math.round(v);
    audioInstance.setVolume(roundedVol);
    dispatch(setVolume(roundedVol));
  };

  return (
    <footer className="player-bar">
      {/* Left: track info */}
      <div className="pb-info">
        <AlbumArt track={track} size={50} />
        <div className="pb-meta">
          <span className="pb-title">{track.title}</span>
          <span className="pb-artist">{track.artist}</span>
        </div>
        <button
          className={`pb-like ${isLiked ? "liked" : ""}`}
          onClick={() => dispatch(toggleLike(track.id))}
          aria-label="Like"
        >
          {isLiked ? "❤️" : "🤍"}
        </button>
      </div>

      {/* Center: controls + progress */}
      <div className="pb-center">
        <div className="pb-buttons">
          <button
            className={`pb-btn ${isShuffle ? "pb-btn-active" : ""}`}
            onClick={() => dispatch(toggleShuffle())}
            aria-label="Shuffle"
          >🔀</button>
          <button className="pb-btn" onClick={() => dispatch(prevTrack())} aria-label="Previous">⏮</button>
          <button className="pb-play-btn" onClick={() => dispatch(togglePlay())} aria-label={isPlaying ? "Pause" : "Play"}>
            {isPlaying ? "⏸" : "▶"}
          </button>
          <button className="pb-btn" onClick={() => dispatch(nextTrack())} aria-label="Next">⏭</button>
          <button
            className={`pb-btn ${isRepeat ? "pb-btn-active" : ""}`}
            onClick={() => dispatch(toggleRepeat())}
            aria-label="Repeat"
          >🔁</button>
        </div>

        <div className="pb-progress-row">
          <span className="pb-time">{formatTime(progress, track.durationSec)}</span>
          <div className="pb-bar" onClick={handleSeek} role="slider" aria-label="Progress" aria-valuenow={Math.round(progress)}>
            <div className="pb-fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="pb-time">{track.duration}</span>
        </div>
      </div>

      {/* Right: volume + extras */}
      <div className="pb-right">
        <button className="pb-btn" aria-label="Queue">📋</button>
        <button className="pb-btn" aria-label="Devices">📡</button>
        <span className="pb-vol-icon" aria-hidden="true">🔈</span>
        <div className="pb-vol-bar" onClick={handleVolume} role="slider" aria-label="Volume" aria-valuenow={volume}>
          <div className="pb-vol-fill" style={{ width: `${volume}%` }} />
        </div>
        <button className="pb-btn" aria-label="Fullscreen">⛶</button>
      </div>
    </footer>
  );
};

export default PlayerBar;
