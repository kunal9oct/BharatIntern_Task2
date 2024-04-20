import { Outlet, Navigate } from "react-router-dom";
import EarthCanvas from "../components/EarthCanvas/EarthCanvas";
import StarsCanvas from "../components/Stars/StarsCanvas";

export default function AuthLayout() {
  let isAuthenticated = false;
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    isAuthenticated = true;
  }

  return (
    <>
      <div className="flex h-screen bg-dark-1 text-white min-h-screen font-inter box-border list-none p-0 m-0 scroll-smooth overflow-y-auto z-0 relative">
        {isAuthenticated ? (
          <Navigate to="/" />
        ) : (
          <>
            <section className="flex flex-1 justify-center items-center flex-col py-10 max-[900px]:w-full max-[1200px]:w-1/2">
              <Outlet />
            </section>

            <div className="min-[900px]:flex-1 xl:h-auto hidden min-[900px]:block max-[1200px]:w-1/2">
              <EarthCanvas />
            </div>
            <StarsCanvas />
          </>
        )}
      </div>
    </>
  );
}
