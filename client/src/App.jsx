import { Routes, Route } from "react-router-dom";

import SigninForm from "./_auth/forms/SigninForm";
import SignupForm from "./_auth/forms/SignupForm";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import "./globals.css";
import Home from "./_root/pages/Home";
import Posts from "./_root/pages/Posts";
import EditProfile from "./_root/pages/EditProfile";
import CreatePost from "./_root/pages/CreatePost";
import EditPost from "./_root/pages/EditPost";
import PostPage from "./_root/pages/PostPage";

const App = () => {
  return (
    <>
      <Routes>
        {/* public routes */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
        </Route>

        {/* private routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/postPage" element={<PostPage />} />
          <Route path="/editProfile" element={<EditProfile />} />
          <Route path="/editPost/:id" element={<EditPost />} />
          <Route path="/createPost" element={<CreatePost />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
