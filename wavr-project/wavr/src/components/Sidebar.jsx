import { useSelector, useDispatch } from "react-redux";
import { setActiveNav } from "../redux/uiSlice";
import { playTrack } from "../redux/playerSlice";
import { PLAYLISTS } from "../data/tracks";
import "./Sidebar.css";

const NAV_ITEMS = [
  { id: "home", icon: "🏠", label: "Home" },
  { id: "search", icon: "🔍", label: "Search" },
  { id: "library", icon: "📚", label: "Library" },
  { id: "liked", icon: "❤️", label: "Liked Songs" },
  { id: "radio", icon: "📻", label: "Radio" },
];

const Sidebar = () => {
  const dispatch = useDispatch();
  const activeNav = useSelector((s) => s.ui.activeNav);

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span className="logo-dot" />
        WAVR
      </div>

      <nav className="sidebar-nav">
        <p className="nav-section-label">Menu</p>
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activeNav === item.id ? "active" : ""}`}
            onClick={() => dispatch(setActiveNav(item.id))}
          >
            <span className="nav-icon" aria-hidden="true">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="sidebar-playlists">
        <p className="nav-section-label">Playlists</p>
        {PLAYLISTS.map((pl) => (
          <div key={pl.id} className="pl-item" onClick={() => dispatch(playTrack(pl.id - 1))}>
            <div
              className="pl-thumb"
              style={{ background: `linear-gradient(135deg, ${pl.color}, ${pl.color}cc)` }}
              aria-hidden="true"
            >
              {pl.emoji}
            </div>
            <div className="pl-meta">
              <span className="pl-name">{pl.name}</span>
              <span className="pl-count">{pl.count} tracks</span>
            </div>
          </div>
        ))}
      </div>

      <div className="sidebar-footer">
        <div className="user-row">
          <div className="user-avatar">A</div>
          <div className="user-meta">
            <span className="user-name">Ayush</span>
            <span className="user-plan">Free Plan</span>
          </div>
          <button className="settings-btn" aria-label="Settings">⚙️</button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
