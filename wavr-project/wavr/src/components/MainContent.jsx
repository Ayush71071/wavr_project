import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { playTrack, toggleLike } from "../redux/playerSlice";
import { setSearchQuery } from "../redux/uiSlice";
import { FEATURED, TRACKS } from "../data/tracks";
import AlbumArt from "./AlbumArt";
import "./MainContent.css";

const EqBars = () => (
  <span className="eq-bars" aria-hidden="true">
    <span /><span /><span />
  </span>
);

const FeaturedCard = ({ item, onPlay }) => (
  <div className="feat-card" onClick={onPlay}>
    <div className="feat-thumb" style={{ background: item.bg }}>
      <span className="feat-emoji" aria-hidden="true">{item.emoji}</span>
      <div className="feat-play-overlay" aria-hidden="true">▶</div>
    </div>
    <div className="feat-info">
      <div className="feat-title">{item.title}</div>
      <div className="feat-sub">{item.artist}</div>
    </div>
  </div>
);

const TrackRow = ({ track, index, isActive, isPlaying, isLiked, onPlay, onLike }) => {
  const [hovered, setHovered] = useState(false);
  const progress = useSelector((s) => s.player.progress);

  const formatTime = (prog, dur) => {
    const sec = Math.floor((prog / 100) * dur);
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
  };

  return (
    <div
      className={`track-row ${isActive ? "playing" : ""} ${hovered ? "hovered" : ""}`}
      onClick={onPlay}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="col-num">
        {isActive && isPlaying ? (
          <EqBars />
        ) : hovered ? (
          <span className="row-play-icon" aria-hidden="true">▶</span>
        ) : (
          <span className="row-num">{index + 1}</span>
        )}
      </div>
      <div className="col-info">
        <AlbumArt track={track} size={42} />
        <div className="track-meta">
          <span className={`track-title ${isActive ? "active-title" : ""}`}>{track.title}</span>
          <span className="track-artist">{track.artist}</span>
        </div>
      </div>
      <div className="col-album">{track.album}</div>
      <div className="col-genre">
        <span className="genre-pill">{track.genre}</span>
      </div>
      <div className="col-dur">
        <button
          className={`like-btn ${isLiked ? "liked" : ""}`}
          onClick={(e) => { e.stopPropagation(); onLike(); }}
          aria-label={isLiked ? "Unlike" : "Like"}
        >
          {isLiked ? "❤️" : "🤍"}
        </button>
        <span className="track-dur">
          {isActive ? formatTime(progress, track.durationSec) : track.duration}
        </span>
      </div>
    </div>
  );
};

const MainContent = () => {
  const dispatch = useDispatch();
  const { currentIndex, isPlaying, likedIds } = useSelector((s) => s.player);
  const searchQuery = useSelector((s) => s.ui.searchQuery);

  const filteredTracks = TRACKS.filter(
    (t) =>
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="main-content">
      <header className="main-header">
        <h1 className="greeting-title">
          Good evening, <span className="greeting-name">Ayush</span> 👋
        </h1>
        <div className="header-right">
          <div className="search-bar">
            <span aria-hidden="true">🔍</span>
            <input
              type="text"
              placeholder="Search songs, artists..."
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              aria-label="Search"
            />
          </div>
          <div className="header-avatar" aria-label="Profile">A</div>
        </div>
      </header>

      <div className="main-scroll">
        {!searchQuery && (
          <section className="section">
            <div className="section-header">
              <h2 className="section-title">Featured Albums</h2>
              <button className="see-all">See all →</button>
            </div>
            <div className="featured-row">
              {FEATURED.map((item, i) => (
                <FeaturedCard
                  key={item.id}
                  item={item}
                  onPlay={() => dispatch(playTrack(i % TRACKS.length))}
                />
              ))}
            </div>
          </section>
        )}

        <section className="section">
          <div className="section-header">
            <h2 className="section-title">
              {searchQuery ? `Results for "${searchQuery}"` : "Trending Now"}
            </h2>
            {!searchQuery && <button className="see-all">See all →</button>}
          </div>

          <div className="tracks-table">
            <div className="tracks-head">
              <span className="col-num">#</span>
              <span className="col-info">Title</span>
              <span className="col-album">Album</span>
              <span className="col-genre">Genre</span>
              <span className="col-dur">⏱</span>
            </div>

            {filteredTracks.map((track, i) => (
              <TrackRow
                key={track.id}
                track={track}
                index={i}
                isActive={currentIndex === i}
                isPlaying={isPlaying}
                isLiked={likedIds.includes(track.id)}
                onPlay={() => dispatch(playTrack(i))}
                onLike={() => dispatch(toggleLike(track.id))}
              />
            ))}

            {filteredTracks.length === 0 && (
              <div className="no-results">No tracks found for "{searchQuery}"</div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default MainContent;
