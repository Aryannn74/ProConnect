import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "../components/Loading.jsx";
import UserProfileInfo from "../components/UserProfileInfo.jsx";
import PostCard from "../components/PostCard.jsx";
import ProfileModal from "../components/ProfileModal.jsx";
import api from "../api/axios";
import { useAuth } from "@clerk/clerk-react";

const Profile = () => {
  const { profileId } = useParams();
  const { value: loggedInUser } = useSelector((state) => state.user);
  const { getToken } = useAuth();

  const [profileUser, setProfileUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("posts");
  const [showEdit, setShowEdit] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = await getToken();

        const { data } = await api.post(
          "/api/user/profiles",
          { profileId: profileId || loggedInUser?._id },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (data.success) {
          setProfileUser(data.profile);
          setPosts(data.posts);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (loggedInUser) {
      fetchProfile();
    }
  }, [profileId, loggedInUser]);

  if (loading || !profileUser) return <Loading />;

  return (
    <div className="relative h-full overflow-y-scroll bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow overflow-hidden">

          {/* Cover */}
          <div className="h-40 md:h-56 bg-gray-200">
            {profileUser.cover_photo && (
              <img
                src={profileUser.cover_photo}
                alt="cover"
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* User Info */}
          <UserProfileInfo
            user={profileUser}
            posts={posts}
            profileId={profileId}
            setShowEdit={setShowEdit}
          />
        </div>

        {/* Tabs */}
        <div className="mt-6">
          <div className="bg-white shadow p-1 flex max-w-md mx-auto rounded-xl">
            {["posts", "media"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition ${
                  activeTab === tab
                    ? "bg-indigo-600 text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Posts */}
          {activeTab === "posts" && (
            <div className="mt-6 flex flex-col items-center gap-6">
              {posts.length === 0 ? (
                <p className="text-gray-500">No posts yet</p>
              ) : (
                posts.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {showEdit && (
        <ProfileModal setShowEdit={setShowEdit} />
      )}
    </div>
  );
};

export default Profile;
