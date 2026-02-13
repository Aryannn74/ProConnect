import React, { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../features/user/userSlice";
import { useAuth } from "@clerk/clerk-react";

const ProfileModal = ({ setShowEdit }) => {
  const dispatch = useDispatch();
  const { getToken } = useAuth();
  const { value: user } = useSelector((state) => state.user);

  const [editForm, setEditForm] = useState({
    username: "",
    bio: "",
    location: "",
    profile_picture: null,
    cover_photo: null,
    full_name: "",
  });

  // 🔥 Sync form when user loads
  useEffect(() => {
    if (user) {
      setEditForm({
        username: user.username || "",
        bio: user.bio || "",
        location: user.location || "",
        profile_picture: null,
        cover_photo: null,
        full_name: user.full_name || "",
      });
    }
  }, [user]);

  if (!user) return null;

  const handleSaveProfile = async (e) => {
    e.preventDefault();

    const token = await getToken();

    const formData = new FormData();
    formData.append("username", editForm.username);
    formData.append("bio", editForm.bio);
    formData.append("location", editForm.location);
    formData.append("full_name", editForm.full_name);

    if (editForm.profile_picture) {
      formData.append("profile", editForm.profile_picture);
    }

    if (editForm.cover_photo) {
      formData.append("cover", editForm.cover_photo);
    }

    await dispatch(updateUser({ userData: formData, token }));

    setShowEdit(false);
  };

  return (
    <div className="fixed inset-0 z-110 bg-black/50 overflow-y-auto">
      <div className="max-w-2xl sm:py-6 mx-auto">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Edit Profile
          </h1>

          <form className="space-y-4" onSubmit={handleSaveProfile}>

            {/* Profile Picture */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Profile Picture
              </label>

              <input
                hidden
                type="file"
                accept="image/*"
                id="profile_picture"
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    profile_picture: e.target.files[0],
                  })
                }
              />

              <label
                htmlFor="profile_picture"
                className="cursor-pointer group relative inline-block"
              >
                <img
                  src={
                    editForm.profile_picture
                      ? URL.createObjectURL(editForm.profile_picture)
                      : user.profile_picture
                  }
                  alt=""
                  className="w-24 h-24 rounded-full object-cover"
                />

                <div className="absolute inset-0 hidden group-hover:flex bg-black/20 rounded-full items-center justify-center">
                  <Pencil className="w-5 h-5 text-white" />
                </div>
              </label>
            </div>

            {/* Cover Photo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cover Photo
              </label>

              <input
                hidden
                type="file"
                accept="image/*"
                id="cover_photo"
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    cover_photo: e.target.files[0],
                  })
                }
              />

              <label
                htmlFor="cover_photo"
                className="cursor-pointer group relative inline-block"
              >
                <img
                  src={
                    editForm.cover_photo
                      ? URL.createObjectURL(editForm.cover_photo)
                      : user.cover_photo
                  }
                  alt=""
                  className="w-80 h-40 rounded-lg object-cover"
                />

                <div className="absolute inset-0 hidden group-hover:flex bg-black/20 rounded-lg items-center justify-center">
                  <Pencil className="w-5 h-5 text-white" />
                </div>
              </label>
            </div>

            {/* Name */}
            <input
              type="text"
              className="w-full p-3 border border-gray-200 rounded-lg"
              placeholder="Full name"
              value={editForm.full_name}
              onChange={(e) =>
                setEditForm({ ...editForm, full_name: e.target.value })
              }
            />

            {/* Username */}
            <input
              type="text"
              className="w-full p-3 border border-gray-200 rounded-lg"
              placeholder="Username"
              value={editForm.username}
              onChange={(e) =>
                setEditForm({ ...editForm, username: e.target.value })
              }
            />

            {/* Bio */}
            <textarea
              rows={3}
              className="w-full p-3 border border-gray-200 rounded-lg"
              placeholder="Bio"
              value={editForm.bio}
              onChange={(e) =>
                setEditForm({ ...editForm, bio: e.target.value })
              }
            />

            {/* Location */}
            <input
              type="text"
              className="w-full p-3 border border-gray-200 rounded-lg"
              placeholder="Location"
              value={editForm.location}
              onChange={(e) =>
                setEditForm({ ...editForm, location: e.target.value })
              }
            />

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-6">
              <button
                type="button"
                onClick={() => setShowEdit(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg"
              >
                Save Changes
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
