import { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Filter from "bad-words";
import RTE from "../../components/shared/RTE";
import FileUploader from "../../components/shared/FileUploader";
import { UserContext } from "../../store/user-context";
import Loader from "../../components/shared/Loader";

const EditPost = () => {
  const { user, postData } = useContext(UserContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const data = JSON.parse(localStorage.getItem("postData"));

  const [title, setTitle] = useState(postData.title || data?.title || "");
  const [rteText, setRteText] = useState(
    postData.rteText || data?.rteText || null
  );
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(
    postData.location || data?.location || "dummy"
  );
  const [loader, setLoader] = useState(false);

  const handleCancel = (e) => {
    e.preventDefault();
    localStorage.removeItem("postData");
    navigate(-1);
  };

  // Filter out abusive and bad words
  const filter = new Filter();

  function filterAbusiveWords(text) {
    return filter.clean(text);
  }

  const onSubmit = async () => {
    setLoader(true);

    const token = localStorage.getItem("authToken");

    const formData = new FormData();
    if (user.id) {
      formData.append("userId", user.id);
    }

    if (title) {
      const filteredTitle = filterAbusiveWords(title);
      formData.append("title", filteredTitle);
    }

    if (location) {
      const filteredLocation = filterAbusiveWords(location);
      formData.append("location", filteredLocation);
    }

    if (rteText) {
      formData.append("rteText", rteText);
    }

    if (image) {
      formData.append("image", image);
    }

    if (!formData.has("title")) {
      setLoader(false);
      alert("You have not given title.");
      return;
    }

    if (!formData.has("rteText")) {
      setLoader(false);
      alert("You have not written any blog.");
      return;
    }

    const editPost = async () => {
      try {
        const response = await fetch(
          `http://www.localhost:5000/editPost/${id}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );

        const result = await response.json();

        if (result.success) {
          navigate("/");
        }

        if (response.status === 401) {
          alert(result.message);
        }

        if (response.status === 403) {
          alert(result.message);
        }

        setLoader(false);
      } catch (error) {
        setLoader(false);
        console.log(
          "status: " +
            error.status +
            " || " +
            "Error creating Post: " +
            error.message
        );
        alert(
          "status: " +
            error.status +
            " || " +
            "Error creating Post: " +
            error.message
        );
      }
    };

    editPost();
  };

  const buttonCSS =
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2";

  const inputCSS =
    "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <div className="flex flex-1">
      <div className="common-container">
        {user?.accountType === "creator" ? (
          <>
            <div className="max-w-5xl flex-start gap-3 justify-start w-full">
              <img
                src="/assets/icons/add-post.svg"
                alt="add"
                width={36}
                height={36}
              />
              <h2 className="h3-bold md:h2-bold text-left w-full">Edit Post</h2>
            </div>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-9 w-full max-w-5xl"
            >
              <div className="space-y-2">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 shad-form_label"
                  htmlFor="addLocation"
                >
                  Add Title
                </label>

                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={`${inputCSS} shad-textarea`}
                />
              </div>

              <div className="space-y-2">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 shad-form_label"
                  htmlFor="caption"
                >
                  Add Blog
                </label>

                <RTE
                  id="askQuestion"
                  setRteText={setRteText}
                  postDataRTE={postData.rteText}
                />
              </div>

              <div className="space-y-2">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 shad-form_label"
                  htmlFor="addPhoto"
                >
                  Add Photos
                </label>
                <FileUploader
                  id="addPhoto"
                  setImage={setImage}
                  imgSrc={`http://www.localhost:5000/uploads/images/${postData.image}`}
                />
              </div>

              <div className="space-y-2">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 shad-form_label"
                  htmlFor="addLocation"
                >
                  Add Location
                </label>

                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className={`${inputCSS} shad-textarea`}
                />
              </div>

              <div className="flex gap-4 items-center justify-end">
                <button
                  type="button"
                  className={`${buttonCSS} shad-button_dark_4`}
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={onSubmit}
                  className={`${buttonCSS} shad-button_primary`}
                  disabled={loader}
                >
                  {loader ? <Loader /> : "Edit Post"}
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="max-w-5xl flex-start gap-3 justify-start w-full">
            <h2 className="h3-bold md:h2-bold text-left w-full">
              Your Account doesn't support this feature.
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditPost;
