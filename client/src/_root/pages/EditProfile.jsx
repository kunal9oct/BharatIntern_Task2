import { Input } from "../../components/shared/Input";
import { useForm, FormProvider } from "react-hook-form";
import {
  update_name_validation,
  update_email_validation,
  update_username_validation,
  update_password_validation,
} from "../../utils/updateProfileValidation";
import { useState, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { avatars } from "../../constants";
import { UserContext } from "../../store/user-context";
import Loader from "../../components/shared/Loader";

const EditProfile = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useContext(UserContext);
  const methods = useForm();
  const [avatarURL, setAvatarURL] = useState(null);
  const [file, setFile] = useState(null);
  const [changeUI, setChangeUI] = useState(false);
  const [loader, setLoader] = useState(false);
  const [accountType, setAccountType] = useState(user?.accountType || '');

  const onSubmit = methods.handleSubmit((data) => {
    setLoader(true);
    const token = localStorage.getItem("authToken");

    const formData = new FormData();
    if (accountType) {
      formData.append("accountType", accountType);
    }

    if (data.name) {
      formData.append("name", data.name);
    }

    if (data.userName) {
      formData.append("username", data.userName);
    }

    if (data.email) {
      formData.append("email", data.email);
    }

    if (data.password) {
      formData.append("password", data.password);
    }

    if (avatarURL) {
      formData.append("avatarImgURL", avatarURL);
    }

    if (file) {
      formData.append("image", file);
    }

    if (
      !formData.has("name") &&
      !formData.has("username") &&
      !formData.has("email") &&
      !formData.has("password") &&
      !formData.has("image") &&
      !formData.has("avatarImgURL")
    ) {
      setLoader(false);
      alert("You have not changed any data");
      return;
    }

    const updatingProfile = async () => {
      try {
        const response = await fetch(
          `http://www.localhost:5000/editProfile/${user.id}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );

        const result = await response.json();

        if (result.success) {
          updateUser(result.userDetails);
          localStorage.setItem("user", JSON.stringify(result.userDetails));
          setChangeUI(false);
          methods.reset();
          navigate(-1);
        }

        if (response.status === 401) {
          alert(result.message);
        }

        if (response.status === 403) {
          alert(result.message);
        }

        if (response.status === 500) {
          alert(result.message);
        }

        setLoader(false);
      } catch (error) {
        setLoader(false);
        console.log(
          "status: " +
            error.status +
            " || " +
            "Error updating Profile: " +
            error.message
        );
        alert(
          "status: " +
            error.status +
            " || " +
            "Error updating Profile: " +
            error.message
        );
      }
    };

    updatingProfile();
  });

  const handleAvatarChange = async (imagePath) => {
    setChangeUI(true);
    setAvatarURL(imagePath);
    setFile(null);
  };

  const onDrop = useCallback(
    (acceptedFiles) => {
      setChangeUI(true);
      setAvatarURL(null);
      setFile(acceptedFiles[0]);
    },
    [file]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg", ".svg"],
    },
  });

  const buttonCSS =
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2";

  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("user"));

  //   if (!user) {
  //     navigate("/sign-in");
  //   }
  // }, []);

  return (
    <FormProvider {...methods}>
      <div className="flex flex-1">
        <div className="common-container">
          <div className="flex-start gap-3 justify-start w-full max-w-5xl">
            <img
              src="/assets/icons/edit.svg"
              width={36}
              height={36}
              alt="edit"
              className="invert-white"
            />
            <h2 className="h3-bold md:h2-bold text-left w-full">
              Edit Profile
            </h2>
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            noValidate
            autoComplete="off"
            className="flex flex-col gap-7 w-full mt-4 max-w-5xl"
          >
            <div className="space-y-2 flex">
              <div {...getRootProps()}>
                <input {...getInputProps()} className="cursor-pointer" />

                <div className="cursor-pointer flex-center gap-4">
                  <img
                    src={`${
                      (!changeUI &&
                        (user.avatarImgURL ||
                          (user.profileImgURL &&
                            `http://www.localhost:5000/uploads/images/${user.profileImgURL}`))) ||
                      avatarURL ||
                      (file && URL.createObjectURL(file)) ||
                      "/assets/icons/profile-placeholder.svg"
                    }`}
                    alt="image"
                    className="h-24 w-24 rounded-full object-cover object-top"
                  />
                  <p className="text-primary-500 small-regular md:base-semibold">
                    Change profile photo
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2 my-2">
              <span className="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 shad-form_label">
                Choose Avatar as Profile Photo
              </span>
              <div className="cursor-pointer flex flex-wrap items-center gap-4">
                {avatars.map((avatar) => (
                  <img
                    key={avatar.alt}
                    src={avatar.imgURL}
                    alt={avatar.alt}
                    className="h-24 w-24 rounded-full object-cover object-top"
                    onClick={() => handleAvatarChange(avatar.imgURL)}
                  />
                ))}
              </div>
            </div>

            <Input {...update_name_validation} />
            <Input {...update_username_validation} />
            <Input {...update_email_validation} />
            <Input {...update_password_validation} />

            <div className="flex justify-start items-center max-[420px]:flex-col max-[420px]:items-start">
              <label htmlFor="accountType">Update Account Type:</label>
              <div className="ml-20 max-[820px]:ml-14 max-[500px]:ml-6 max-[470px]:ml-3 max-[420px]:ml-0">
                <input
                  type="radio"
                  id="creator"
                  name="accountType"
                  value="creator"
                  checked={accountType === "creator"}
                  onChange={() => setAccountType("creator")}
                  className="mr-1"
                />
                <label htmlFor="creator">Creator</label>
                <input
                  type="radio"
                  id="reader"
                  name="accountType"
                  value="reader"
                  checked={accountType === "reader"}
                  onChange={() => setAccountType("reader")}
                  className="ml-20 max-[820px]:ml-12 max-[500px]:ml-6 max-[470px]:ml-3 mr-1"
                />
                <label htmlFor="reader">Reader</label>
              </div>
            </div>

            <div className="flex gap-4 items-center justify-end">
              <button
                type="button"
                className={`${buttonCSS} shad-button_dark_4`}
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={onSubmit}
                className={`${buttonCSS} shad-button_primary`}
                disabled={loader}
              >
                {loader ? <Loader /> : "Update Profile"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </FormProvider>
  );
};

export default EditProfile;
