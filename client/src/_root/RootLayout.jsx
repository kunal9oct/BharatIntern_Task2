import { Outlet, Navigate } from "react-router-dom";

import Topbar from "../components/shared/Topbar";
import Bottombar from "../components/shared/Bottombar";
import LeftSidebar from "../components/shared/LeftSidebar";

const RootLayout = () => {
  let isAuthenticated = true;
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    isAuthenticated = false;
  }

  return (
    <>
      <main className="flex h-screen">
        {isAuthenticated ? (
          <div className="w-full min-[810px]:flex">
            <Topbar />
            <LeftSidebar />

            <section className="flex flex-1 h-full">
              <Outlet />
            </section>

            <Bottombar />
          </div>
        ) : (
          <Navigate to="/sign-in" />
        )}
      </main>
    </>
  );
};

export default RootLayout;
