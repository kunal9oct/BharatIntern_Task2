import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { sidebarLinks } from "../../constants/index";
import { UserContext } from "../../store/user-context";
import Loader from "./Loader";

const LeftSidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    navigate("/sign-in");
  };

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="/assets/images/bloggram.png"
            alt="logo"
            width={190}
            height={40}
          />
        </Link>

        {!user ? (
          <div className="h-14">
            <Loader />
          </div>
        ) : (
          <Link to={"/editProfile"} className="flex gap-3 items-center">
            <img
              src={
                user.avatarImgURL ||
                (user.profileImgURL &&
                  `http://www.localhost:5000/uploads/images/${user.profileImgURL}`) ||
                "/assets/icons/profile-placeholder.svg"
              }
              alt="profile"
              className="h-14 w-14 rounded-full"
            />
            <div className="flex flex-col">
              <p className="body-bold">{user.name || "User"}</p>
              <p className="small-regular text-light-3">
                @{user.username || "username"}
              </p>
            </div>
          </Link>
        )}

        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.route;

            return (
              <li
                key={link.label}
                className={`leftsidebar-link group ${
                  isActive && "bg-primary-500"
                }`}
              >
                <NavLink
                  to={link.route}
                  className="flex gap-4 items-center p-4"
                >
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className={`group-hover:invert-white ${
                      isActive && "invert-white"
                    }`}
                  />
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>

      <button
        className="shad-button_ghost mt-6"
        onClick={(e) => handleLogout(e)}
      >
        <img
          src="/assets/icons/logout.svg"
          alt="logout"
          className="hover:invert-white"
        />
        <p className="small-medium lg:base-medium">Logout</p>
      </button>
    </nav>
  );
};

export default LeftSidebar;
