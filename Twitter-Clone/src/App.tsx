import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Banner from "./components/banner/Banner";
import Home from "./pages/home/Home";
import Explore from "./pages/explore/Explore";
import NoPage from "./pages/noPage/NoPage";
import Messages from "./pages/messages/Messages";
import Notifications from "./pages/notifications/Notifications";
import Lists from "./pages/lists/Lists";
import Bookmarks from "./pages/bookmarks/Bookmarks";
import Profile from "./pages/profile/profile";
import More from "./pages/more/More";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className={"base-content content-style"}>
      <Banner />
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"home"} element={<Home />} />
          <Route path="explore" element={<Explore />} />
          <Route path="Notifications" element={<Notifications />} />
          <Route path="Messages" element={<Messages />} />
          <Route path="Lists" element={<Lists />} />
          <Route path="Bookmarks" element={<Bookmarks />} />
          <Route path="Profile" element={<Profile />} />
          <Route path="More" element={<More />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
