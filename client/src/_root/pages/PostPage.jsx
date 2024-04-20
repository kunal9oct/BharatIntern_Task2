import { useContext } from "react";
import { UserContext } from "../../store/user-context";
import { multiFormatDateString } from "../../utils";
import { Link, useNavigate } from "react-router-dom";

const PostPage = () => {
  const { user, postData: post, addPostData } = useContext(UserContext);
  const navigate = useNavigate();

  const handlePostData = (e) => {
    e.preventDefault();
    addPostData(post);
    localStorage.setItem("postData", JSON.stringify(post));
    navigate(`/editPost/${post._id}`);
  };

  return (
    <>
      <div className="flex flex-1">
        <div className="flex flex-1 flex-col gap-2 md:gap-3 py-10 px-5 min-[810px]:px-8 lg:p-10 overflow-scroll custom-scrollbar max-w-screen-xl">
          <h2 className="h2-bold text-left w-full">Blog Page</h2>
          <div className="post-card">
            <div className="flex-between">
              <div className="flex items-center gap-3">
                <img
                  src={
                    post.avatarImgURL ||
                    (post.profileImgURL &&
                      `http://www.localhost:5000/uploads/images/${post.profileImgURL}`) ||
                    "/assets/icons/profile-placeholder.svg"
                  }
                  alt="creator"
                  className="rounded-full w-12 lg:h-12"
                />

                <div className="flex flex-col">
                  <p className="body-bold text-light-1">{post.name}</p>
                  <div className="flex items-center gap-2 text-light-3">
                    <p className="small-regular">
                      {multiFormatDateString(post.createdAt)}
                    </p>
                    {post.location && (
                      <p className="small-regular">- {post.location}</p>
                    )}
                  </div>
                </div>
              </div>

              <Link
                className={`${user.id !== post.userId && "hidden z-10"}`}
                onClick={handlePostData}
              >
                <img
                  src="/assets/icons/edit.svg"
                  alt="edit"
                  width={20}
                  height={20}
                />
              </Link>
            </div>

            <div className="font-medium leading-[140%] text-[36px] max-[1200px]:text-[32px] max-[1000px]:text-[28px] max-[900px]:text-[26px] max-[810px]:text-[32px] max-[700px]:text-[28px] max-[600px]:text-[24px] text-center py-5 mt-1">
              {post.title && (
                <p className="whitespace-pre-wrap">{post.title}</p>
              )}
            </div>

            {post.image && (
              <div>
                <img
                  src={`http://www.localhost:5000/uploads/images/${post.image}`}
                  alt="post image"
                  className="h-64 w-full min-[500px]:h-72 min-[600px]:h-80 min-[680px]:h-96 min-[1050px]:h-[500px] min-[1150px]:h-[600px] rounded-[24px] object-cover mb-0"
                />
              </div>
            )}

            <div className="small-medium lg:base-medium py-5">
              {post.rteText && (
                <div
                  id="show_text_div"
                  style={{
                    marginTop: "20px",
                    minHeight: "100px",
                  }}
                  dangerouslySetInnerHTML={{ __html: post.rteText }}
                  className="rounded-md"
                ></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostPage;
