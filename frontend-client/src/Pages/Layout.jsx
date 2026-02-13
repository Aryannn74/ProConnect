import React, { useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import { Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Loading from "../components/Loading.jsx";
import { useSelector } from "react-redux";

const Layout = () => {
  const { value: user, loading } = useSelector((state) => state.user);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // 🔥 Wait until user is fully loaded
  if (loading || !user) {
    return <Loading />;
  }

  return (
    <div className="w-full flex h-screen">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex-1 bg-slate-50 overflow-y-auto">
        <Outlet />
      </div>

      {sidebarOpen ? (
        <X
          className="absolute top-3 right-3 p-2 z-100 bg-white rounded-md shadow w-10 h-10 text-gray-600 sm:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      ) : (
        <Menu
          className="absolute top-3 right-3 p-2 z-100 bg-white rounded-md shadow w-10 h-10 text-gray-600 sm:hidden"
          onClick={() => setSidebarOpen(true)}
        />
      )}
    </div>
  );
};

export default Layout;
