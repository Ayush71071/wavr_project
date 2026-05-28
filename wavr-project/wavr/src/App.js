import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProgress, nextTrack } from "./redux/playerSlice";
import audioInstance from "./utils/audioController";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import RightPanel from "./components/RightPanel";
import PlayerBar from "./components/PlayerBar";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const { currentIndex, isPlaying, volume, tracks } = useSelector((s) => s.player);
  const currentTrack = tracks[currentIndex];

  // Sync track URL change
  useEffect(() => {
    if (currentTrack && currentTrack.audioUrl) {
      audioInstance.setSrc(currentTrack.audioUrl);
      if (isPlaying) {
        audioInstance.play();
      }
    }
  }, [currentIndex, currentTrack]);

  // Sync play/pause state
  useEffect(() => {
    if (isPlaying) {
      audioInstance.play();
    } else {
      audioInstance.pause();
    }
  }, [isPlaying]);

  // Sync volume change
  useEffect(() => {
    audioInstance.setVolume(volume);
  }, [volume]);

  // Handle audio events
  useEffect(() => {
    const handleTimeUpdate = () => {
      const audio = audioInstance.audio;
      if (audio.duration) {
        const percent = (audio.currentTime / audio.duration) * 100;
        dispatch(setProgress(percent));
      }
    };

    const handleEnded = () => {
      dispatch(nextTrack());
    };

    audioInstance.audio.addEventListener("timeupdate", handleTimeUpdate);
    audioInstance.audio.addEventListener("ended", handleEnded);

    return () => {
      audioInstance.audio.removeEventListener("timeupdate", handleTimeUpdate);
      audioInstance.audio.removeEventListener("ended", handleEnded);
    };
  }, [dispatch]);

  return (
    <div className="app-layout">
      <Sidebar />
      <MainContent />
      <RightPanel />
      <PlayerBar />
    </div>
  );
}

export default App;
