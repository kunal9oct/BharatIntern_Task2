import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../store/user-context";

const Topbar = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    navigate("/sign-in");
  };

  return (
    <section className="topbar">
      <div className="flex-between py-4 px-5">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="/assets/images/bloggram.png"
            alt="logo"
            width={170}
            height={350}
          />
        </Link>

        <div className="flex gap-4">
          <button className="shad-button_ghost" onClick={(e) => handleLogout(e)}>
            <img src="/assets/icons/logout.svg" alt="logout" />
          </button>
          <Link to={`/editProfile`} className="flex-center gap-3">
            <img
              src={
                user.avatarImgURL ||
                (user.profileImgURL &&
                  `http://www.localhost:5000/uploads/images/${user.profileImgURL}`) ||
                "/assets/icons/profile-placeholder.svg"
              }
              alt="profile"
              className="h-8 w-8 rounded-full"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Topbar;
