import { Routes, Route } from "react-router-dom";
import { useState, createContext } from "react";
import Navbar from "./component/Navbar";
import Hero from "./component/Hero";
import Section from "./component/Section";
import AlbumDetails from "./component/AlbumDetails";
import PlaybackControl from "./component/PlaybackControl";
import { Box } from "@mui/material";
import "swiper/css";
import "swiper/css/navigation";

// Create a context for the currently playing song
export const PlaybackContext = createContext({
  currentSong: null,
  setCurrentSong: () => {},
});

// Home page component
const Home = () => {
  return (
    <>
      <Hero />
      <Section
        title={"Top Albums"}
        fetchUrl="https://qtify-backend-labs.crio.do/albums/top"
      />
      <Section
        title={"New Albums"}
        fetchUrl="https://qtify-backend-labs.crio.do/albums/new"
      />
      <Section
        title="Songs"
        fetchUrl="https://qtify-backend-labs.crio.do/songs"
        showTabs={true}
        disableCollapse={true}
        contentType="song"
      />
    </>
  );
};

function App() {
  // State to keep track of the currently playing song
  const [currentSong, setCurrentSong] = useState(null);

  return (
    <PlaybackContext.Provider value={{ currentSong, setCurrentSong }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/album/:slug" element={<AlbumDetails />} />
      </Routes>

      {/* Playback control that appears on all pages */}
      <PlaybackControl currentSong={currentSong} />

      {/* Add padding to account for the fixed playback control */}
      <Box sx={{ paddingBottom: "60px" }}></Box>
    </PlaybackContext.Provider>
  );
}

export default App;
