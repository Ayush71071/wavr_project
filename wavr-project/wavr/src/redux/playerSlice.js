import { createSlice } from "@reduxjs/toolkit";
import { TRACKS } from "../data/tracks";

const initialState = {
  tracks: TRACKS,
  currentIndex: 0,
  isPlaying: false,
  progress: 0,
  volume: 70,
  isShuffle: false,
  isRepeat: false,
  likedIds: [],
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    playTrack(state, action) {
      state.currentIndex = action.payload;
      state.isPlaying = true;
      state.progress = 0;
    },
    togglePlay(state) {
      state.isPlaying = !state.isPlaying;
    },
    nextTrack(state) {
      if (state.isShuffle) {
        let next;
        do { next = Math.floor(Math.random() * state.tracks.length); }
        while (next === state.currentIndex && state.tracks.length > 1);
        state.currentIndex = next;
      } else {
        state.currentIndex = (state.currentIndex + 1) % state.tracks.length;
      }
      state.isPlaying = true;
      state.progress = 0;
    },
    prevTrack(state) {
      if (state.progress > 5) {
        state.progress = 0;
      } else {
        state.currentIndex = (state.currentIndex - 1 + state.tracks.length) % state.tracks.length;
        state.progress = 0;
      }
      state.isPlaying = true;
    },
    setProgress(state, action) {
      state.progress = action.payload;
    },
    setVolume(state, action) {
      state.volume = action.payload;
    },
    toggleShuffle(state) {
      state.isShuffle = !state.isShuffle;
    },
    toggleRepeat(state) {
      state.isRepeat = !state.isRepeat;
    },
    toggleLike(state, action) {
      const id = action.payload;
      if (state.likedIds.includes(id)) {
        state.likedIds = state.likedIds.filter((x) => x !== id);
      } else {
        state.likedIds.push(id);
      }
    },
    tick(state) {
      if (!state.isPlaying) return;
      const dur = state.tracks[state.currentIndex].durationSec;
      const step = 100 / (dur * 5);
      state.progress = state.progress + step;
      if (state.progress >= 100) {
        if (state.isRepeat) {
          state.progress = 0;
        } else {
          state.currentIndex = (state.currentIndex + 1) % state.tracks.length;
          state.progress = 0;
        }
      }
    },
  },
});

export const {
  playTrack, togglePlay, nextTrack, prevTrack,
  setProgress, setVolume, toggleShuffle, toggleRepeat, toggleLike, tick,
} = playerSlice.actions;

export default playerSlice.reducer;
