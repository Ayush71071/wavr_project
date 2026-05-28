import "./AlbumArt.css";

const AlbumArt = ({ track, size = 48, className = "", style = {} }) => {
  const bg = `linear-gradient(135deg, ${track.color}44, ${track.color})`;
  return (
    <div
      className={`album-art ${className}`}
      style={{ width: size, height: size, background: bg, fontSize: size * 0.38, borderRadius: size * 0.18, ...style }}
      aria-hidden="true"
    >
      {track.emoji}
    </div>
  );
};

export default AlbumArt;
