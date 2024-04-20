import { Link, useNavigate } from "react-router-dom";
import { convert } from "html-to-text";
import { multiFormatDateString } from "../../utils/index";
import { useContext } from "react";
import { UserContext } from "../../store/user-context";

const PostCard = ({ post }) => {
  const navigate = useNavigate();
  const { user, addPostData } = useContext(UserContext);
  let blogText = "";

  const convertToPlainText = () => {
    const plainText = convert(post.rteText, {
      wordwrap: 130,
    });

    const words = plainText.split(" ");
    const first25Words = words.slice(0, 15).join(" ");
    blogText = first25Words;
  };

  convertToPlainText();

  const handlePostData = (e) => {
    e.preventDefault();
    addPostData(post);
    localStorage.setItem("postData", JSON.stringify(post));
    navigate(`/editPost/${post._id}`);
  };

  const handlePostPage = () => {
    addPostData(post);
    localStorage.setItem("postData", JSON.stringify(post));
    navigate(`/postPage`);
  };

  const buttonCSS =
    "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2";

  return (
    <>
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
            className="rounded-full w-12 min-[1250px]:h-12 max-[350px]:w-14 max-[350px]:h-14 max-[600px]:w-12 max-[600px]:h-12 max-[700px]:w-14 max-[700px]:h-14 max-[800px]:w-12 max-[800px]:h-12 max-[950px]:w-14 max-[950px]:h-14 max-[1150px]:w-12 max-[1150px]:h-12 max-[1250px]:w-14 max-[1250px]:h-14"
          />

          <div className="flex flex-col">
            <p className="base-medium lg:body-bold text-light-1">{post.name}</p>
            <div className="flex items-center gap-2 text-light-3 max-[350px]:flex-col max-[350px]:gap-0 max-[350px]:items-start max-[600px]:flex-row max-[600px]:gap-2 max-[600px]:items-center max-[700px]:flex-col max-[700px]:gap-0 max-[700px]:items-start max-[800px]:flex-row max-[800px]:gap-2 max-[800px]:items-center max-[950px]:flex-col max-[950px]:gap-0 max-[950px]:items-start max-[1150px]:flex-row max-[1150px]:gap-2 max-[1150px]:items-center max-[1250px]:flex-col max-[1250px]:gap-0 max-[1250px]:items-start ">
              <p className="subtle-semibold lg:small-regular whitespace-nowrap overflow-hidden text-ellipsis max-w-20">
                {multiFormatDateString(post.createdAt)}
              </p>
              {post.location && (
                <p className="subtle-semibold lg:small-regular whitespace-nowrap overflow-hidden text-ellipsis max-w-28">
                  {post.location && `- ${post.location}`}
                </p>
              )}
            </div>
          </div>
        </div>

        <Link
          className={`${user.id !== post.userId && "hidden z-50"}`}
          onClick={handlePostData}
        >
          <img src="/assets/icons/edit.svg" alt="edit" width={20} height={20} />
        </Link>
      </div>

      <div className="font-medium leading-[140%] text-[24px] py-5">
        {post.title && <p>{post.title}</p>}
      </div>

      {post.image && (
        <div>
          <img
            src={`http://www.localhost:5000/uploads/images/${post.image}`}
            alt="post image"
            className="post-card_img"
          />
        </div>
      )}

      {post.rteText && (
        <div className="small-medium lg:base-medium py-5">
          <p className="text-justify">{blogText}...</p>
        </div>
      )}

      <button
        type="submit"
        onClick={handlePostPage}
        className={`${buttonCSS} shad-button_primary mt-3 ml-1 rounded-lg`}
      >
        Read More
      </button>
    </>
  );
};

export default PostCard;
