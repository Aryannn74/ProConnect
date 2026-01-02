// import react, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useUser, useAuth } from "@clerk/clerk-react";
import { Toaster } from "react-hot-toast";
import Login from "./Pages/Login.jsx";
import Feed from "./Pages/Feed.jsx";
import Messages from "./Pages/Messages.jsx";
import ChatBox from "./Pages/ChatBox.jsx";
import Connections from "./Pages/Connections.jsx";
import Discover from "./Pages/Discover.jsx";
import Profile from "./Pages/Profile.jsx";
import CreatePost from "./Pages/CreatePost.jsx";
import Layout from "./Pages/Layout.jsx";
// import Loading from "./components/Loading";
import { useDispatch } from "react-redux";
import { fetchUser } from "./features/user/userSlice.js";
import { useEffect } from "react";

const App = () => {
  const { user } = useUser();
  const { getToken } = useAuth();

  const dispatch = useDispatch;

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const token = await getToken();
        dispatch(fetchUser(token));
      }
    };

    fetchData();
  }, [user, getToken, dispatch]);

  // if (!isLoaded) return <Loading />;

  return (
    <>
      <Toaster />
      <Routes>
        {/* Public route */}
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />

        {/* Protected routes */}
        {user && (
          <Route path="/" element={<Layout />}>
            <Route index element={<Feed />} />
            <Route path="messages" element={<Messages />} />
            <Route path="messages/:userId" element={<ChatBox />} />
            <Route path="connections" element={<Connections />} />
            <Route path="discover" element={<Discover />} />
            <Route path="profile" element={<Profile />} />
            <Route path="profile/:profileId" element={<Profile />} />
            <Route path="create-post" element={<CreatePost />} />
            <Route
              path="*"
              element={<div className="text-center mt-10">Page Not Found</div>}
            />
          </Route>
        )}

        {/* Redirect unknown paths */}
        <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
      </Routes>
    </>
  );
};

export default App;
