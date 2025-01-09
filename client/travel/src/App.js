import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp/SignUp";
import SignIn from "./components/SignIn/SignIn";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import ExploreMore from "./pages/ExploreMore/ExploreMore";

import Chats from "./pages/Chats/Chats";
import Search from "./components/Search/Search";
import Profile from "./components/Profile/Profile";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contactus" element={<Contact />} />
        <Route path="/search" element={<Search />} />
        <Route element={<SignUp />} path="/signup" />
        <Route element={<SignIn />} path="/signin" />
        <Route element={<Profile />} path="/profile" />
        <Route element={<ExploreMore />} path="/explore-place-more/:id" />
        <Route element={<Chats />} path="/explore-place-more/:id/chat" />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

// for getting coordintaes

// https://nominatim.openstreetmap.org/search?city=${locationName}&format=json

// for getting hotels detaails

// const overpassUrl = `https://overpass-api.de/api/interpreter?data=[out:json];(node["tourism"="hotel"](around:1000,${lat},${lon});way["tourism"="hotel"](around:1000,${lat},${lon});relation["tourism"="hotel"](around:1000,${lat},${lon}););out body;`;
