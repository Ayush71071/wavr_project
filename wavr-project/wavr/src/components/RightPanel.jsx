import { useDispatch, useSelector } from "react-redux";
import {
  togglePlay, nextTrack, prevTrack,
  toggleShuffle, toggleRepeat, toggleLike, setProgress,
} from "../redux/playerSlice";
import AlbumArt from "./AlbumArt";
import "./RightPanel.css";

const RightPanel = () => {
  const dispatch = useDispatch();
  const { tracks, currentIndex, isPlaying, progress, isShuffle, isRepeat, likedIds } =
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
    dispatch(setProgress(p));
  };

  const queueTracks = tracks.slice(currentIndex + 1, currentIndex + 4);

  return (
    <aside className="right-panel">
      <div className="now-playing-card">
        <p className="np-label">Now Playing</p>

        <div className="np-art-wrap">
          <AlbumArt track={track} size={180} className="np-art" style={{ borderRadius: 16 }} />
        </div>

        <div className="np-title">{track.title}</div>
        <div className="np-artist">{track.artist}</div>

        <div className="np-actions">
          <button
            className={`action-btn ${isLiked ? "liked" : ""}`}
            onClick={() => dispatch(toggleLike(track.id))}
            aria-label="Like"
          >
            {isLiked ? "❤️" : "🤍"}
          </button>
          <button className="action-btn" aria-label="Add to playlist">➕</button>
          <button className="action-btn" aria-label="Share">🔗</button>
        </div>

        <div className="np-controls">
          <button
            className={`ctrl-btn ${isShuffle ? "ctrl-active" : ""}`}
            onClick={() => dispatch(toggleShuffle())}
            aria-label="Shuffle"
          >🔀</button>
          <button className="ctrl-btn" onClick={() => dispatch(prevTrack())} aria-label="Previous">⏮</button>
          <button className="play-btn" onClick={() => dispatch(togglePlay())} aria-label={isPlaying ? "Pause" : "Play"}>
            {isPlaying ? "⏸" : "▶"}
          </button>
          <button className="ctrl-btn" onClick={() => dispatch(nextTrack())} aria-label="Next">⏭</button>
          <button
            className={`ctrl-btn ${isRepeat ? "ctrl-active" : ""}`}
            onClick={() => dispatch(toggleRepeat())}
            aria-label="Repeat"
          >🔁</button>
        </div>

        <div className="progress-section">
          <div className="progress-times">
            <span>{formatTime(progress, track.durationSec)}</span>
            <span>{track.duration}</span>
          </div>
          <div className="progress-bar" onClick={handleSeek} role="slider" aria-label="Track progress" aria-valuenow={Math.round(progress)}>
            <div className="progress-fill" style={{ width: `${progress}%` }} />
            <div className="progress-thumb" style={{ left: `calc(${progress}% - 6px)` }} />
          </div>
        </div>
      </div>

      <div className="queue-section">
        <h3 className="queue-title">Up Next</h3>
        {queueTracks.length > 0 ? (
          queueTracks.map((t) => (
            <div key={t.id} className="q-item">
              <AlbumArt track={t} size={36} />
              <div className="q-meta">
                <span className="q-title">{t.title}</span>
                <span className="q-artist">{t.artist}</span>
              </div>
              <span className="q-dur">{t.duration}</span>
            </div>
          ))
        ) : (
          <p className="queue-empty">No more tracks</p>
        )}
      </div>
    </aside>
  );
};

export default RightPanel;
