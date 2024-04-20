import { Input } from "../../components/shared/Input";
import { useForm, FormProvider } from "react-hook-form";
import {
  email_validation,
  password_validation,
} from "../../utils/inputValidations";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/shared/Loader";
import { UserContext } from "../../store/user-context";

const SigninForm = () => {
  const navigate = useNavigate();
  const { addUser } = useContext(UserContext);

  const methods = useForm();
  const [loader, setLoader] = useState(false);

  const onSubmit = methods.handleSubmit((data) => {
    setLoader(true);

    const signingIn = async () => {
      try {
        const response = await fetch("http://www.localhost:5000/signIn", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();
        if (result.success) {
          addUser(result.userDetails);
          localStorage.setItem("user", JSON.stringify(result.userDetails));
          localStorage.setItem("authToken", result.token);
          methods.reset();
          navigate("/");
        }

        if (response.status === 404) {
          alert(result.message);
        }

        if (response.status === 400) {
          alert(result.message);
        }

        setLoader(false);
      } catch (error) {
        setLoader(false);
        console.log(
          "status: " + error.status + " || " + "Error: " + error.message
        );
        alert("status: " + error.status + " || " + "Error: " + error.message);
      }
    };

    signingIn();
  });

  const buttonCSS =
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2";

  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("user"));

  //   if (user) {
  //     navigate("/");
  //   }
  // }, []);

  return (
    <FormProvider {...methods}>
      <div className="sm:w-420 flex-center flex-col">
        <form
          onSubmit={(e) => e.preventDefault()}
          noValidate
          autoComplete="off"
          className="flex flex-col gap-5 w-full mt-2"
        >
          <div className="flex flex-col items-center">
            <img src="/assets/images/bloggram.png" width={240} alt="logo" />

            <h2 className="h3-bold md:h2-bold pt-2 sm:pt-0 mb-1 mt-5">
              Log in to your account
            </h2>
            <p className="text-light-3 small-medium md:base-regular mt-2">
              Welcome back! Please enter your details
            </p>
          </div>

          <Input {...email_validation} />
          <Input {...password_validation} />

          <button
            onClick={onSubmit}
            className={`${buttonCSS} shad-button_primary`}
          >
            {loader ? (
              <div className="flex-center gap-2">
                <Loader />
              </div>
            ) : (
              "Log in"
            )}
          </button>

          <p className="text-small-regular text-light-2 text-center mt-2">
            Don&apos;t have an account?
            <Link
              to="/sign-up"
              className="text-primary-500 text-small-semibold ml-1"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </FormProvider>
  );
};

export default SigninForm;
