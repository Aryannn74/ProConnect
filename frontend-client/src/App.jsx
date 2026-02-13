import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useDispatch } from "react-redux";
import { fetchUser } from "./features/user/userSlice";

import Login from "./Pages/Login.jsx";
import Feed from "./Pages/Feed.jsx";
import Messages from "./Pages/Messages.jsx";
import ChatBox from "./Pages/ChatBox.jsx";
import Connections from "./Pages/Connections.jsx";
import Discover from "./Pages/Discover.jsx";
import Profile from "./Pages/Profile.jsx";
import CreatePost from "./Pages/CreatePost.jsx";
import Layout from "./Pages/Layout.jsx";

import { Toaster } from "react-hot-toast";

const App = () => {
  const { user, isLoaded } = useUser();
  const { getToken, isSignedIn } = useAuth();
  const dispatch = useDispatch();

  // 🔥 Fetch user from backend after login
  useEffect(() => {
    const loadUser = async () => {
      if (!isSignedIn) return;

      const token = await getToken();
      if (token) {
        dispatch(fetchUser(token));
      }
    };

    loadUser();
  }, [isSignedIn, getToken, dispatch]);

  if (!isLoaded) return null;

  return (
    <>
      <Toaster />

      <Routes>
        <Route path="/" element={!user ? <Login /> : <Layout />}>
          <Route index element={<Feed />} />
          <Route path="messages" element={<Messages />} />
          <Route path="messages/:userId" element={<ChatBox />} />
          <Route path="connections" element={<Connections />} />
          <Route path="discover" element={<Discover />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profile/:profileId" element={<Profile />} />
          <Route path="create-post" element={<CreatePost />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
