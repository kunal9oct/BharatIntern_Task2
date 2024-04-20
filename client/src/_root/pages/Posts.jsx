import Loader from "../../components/shared/Loader";
import { useEffect, useState } from "react";
import PostCard from "../../components/shared/PostCard";

const Posts = () => {
  const [posts, setPosts] = useState(null);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    setLoader(true);

    const fetchAll = async () => {
      try {
        const response = await fetch(
          `http://www.localhost:5000/getPosts/${user.id}`
        );

        const result = await response.json();

        if (result.success) {
          setPosts(result.all);
          // console.log(result.all);
        }

        setLoader(false);
      } catch (error) {
        setLoader(false);
        setError(true);
        console.log(
          "status: " + error.status + " || " + "Error: " + error.message
        );
      }
    };

    fetchAll();
  }, []);

  if (error) {
    return (
      <div className="flex flex-1">
        <div className="home-container">
          <p className="body-medium text-light-1">
            Retry! Something bad happened
          </p>
        </div>
      </div>
    );
  }

  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("user"));

  //   if (!user) {
  //     navigate("/sign-in");
  //   }
  // }, []);

  return (
    <>
      <div className="flex flex-1">
        <div className="flex flex-1 py-10 px-5 md:px-8 min-[800px]:px-2 min-[900px]:px-8 lg:p-10 overflow-scroll custom-scrollbar">
          {user?.accountType === "creator" ? (
            <div className="flex flex-col gap-2 md:gap-3">
              <h2 className="h3-bold md:h2-bold text-left w-full">
                Your Posts
              </h2>
              {loader ? (
                <Loader />
              ) : posts ? (
                <div className="max-w-screen-xl py-5">
                  <div className="min-[300px]:grid max-[600px]:grid-cols-1 min-[600px]:grid-cols-2 min-[1150px]:grid-cols-3 gap-4 min-[800px]:gap-2 min-[900px]:gap-4">
                    {posts?.map((post) => (
                      <div
                        key={post.createdAt}
                        className="post-card cursor-pointer flex-1 max-[350px]:min-w-52 max-[380px]:min-w-72 max-[450px]:min-w-80 max-[600px]:min-w-96 max-[700px]:min-w-64 max-[800px]:min-w-80 max-[950px]:min-w-64 max-[1000px]:min-w-72 max-[1150px]:min-w-80 max-[1250px]:min-w-64 max-[1350px]:min-w-72 max-[1520px]:min-w-80 min-w-96"
                      >
                        <PostCard key={post.createdAt} post={post} />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <h3 className="h3-bold md:h2-bold text-left w-full">
                  Currently you have no posts.
                </h3>
              )}
            </div>
          ) : (
            <div className="max-w-5xl flex-start gap-3 justify-start w-full">
              <h2 className="h3-bold md:h2-bold text-left w-full">
                Your Account doesn't support this feature.
              </h2>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Posts;
