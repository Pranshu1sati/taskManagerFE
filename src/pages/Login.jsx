import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Textbox from "../components/Textbox";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  useLoginMutation,
  useRegisterMutation,
} from "../redux/slices/api/authApiSlice";
import { setCredentials } from "../redux/slices/authSlice";
import Loading from "../components/Loader";
import { toast } from "sonner";

const Login = () => {
  const { user } = useSelector((state) => state.auth);
  const [isRegistering, setIsRegistering] = useState(false); // Toggle between login and register forms

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [registerUser, { isLoading: isRegisteringLoading }] =
    useRegisterMutation();

  const submitLoginHandler = async (data) => {
    try {
      const result = await login(data).unwrap();
      dispatch(setCredentials(result));
      navigate("/");
    } catch (error) {
      toast.error(error?.data?.message || error?.message);
    }
  };

  const submitRegisterHandler = async (data) => {
    try {
      const result = await registerUser({ ...data, isAdmin: true }).unwrap();
      toast.success("Registration successful. You can now log in!");
      setIsRegistering(false); // Switch to login form after successful registration
    } catch (error) {
      toast.error(error?.data?.message || error?.message);
    }
  };

  useEffect(() => {
    if (user) navigate("/tasks");
  }, [user, navigate]);

  return (
    <div className="w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6]">
      <div className="w-full md:w-auto flex gap-0 md:gap-40 flex-col md:flex-row items-center justify-center">
        {/* Left side */}
        <div className="h-full w-full lg:w-2/3 flex flex-col items-center justify-center">
          <div className="w-full md:max-w-lg 2xl:max-w-3xl flex flex-col items-center justify-center gap-5 md:gap-y-10 2xl:-mt-20">
            <span className="flex gap-1 py-1 px-3 border rounded-full text-sm md:text-base bordergray-300 text-gray-600">
              Manage all your tasks in one place!
            </span>
            <p className="flex flex-col gap-0 md:gap-4 text-4xl md:text-6xl 2xl:text-7xl font-black text-center text-blue-700">
              <span>Cloud-Mate</span>
              <span>Task Manager</span>
            </p>
          </div>
        </div>

        {/* Right side */}
        <div className="w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center">
          {isRegistering ? (
            // Registration Form
            <form
              onSubmit={handleSubmit(submitRegisterHandler)}
              className="form-container w-full md:w-[400px] flex flex-col gap-y-2 bg-white px-10 pt-14 pb-14"
            >
              <p className="text-blue-600 text-3xl font-bold text-center">
                Register
              </p>
              <p className="text-center text-base text-gray-700">
                Create a new account.
              </p>

              <div className="flex flex-col gap-y-2">
                <Textbox
                  placeholder="Full Name"
                  type="text"
                  name="name"
                  label="Full Name"
                  className="w-full rounded-full"
                  register={register("name", {
                    required: "Full Name is required!",
                  })}
                  error={errors.fullName ? errors.fullName.message : ""}
                />

                <Textbox
                  placeholder="Title"
                  type="text"
                  name="title"
                  label="Title"
                  className="w-full rounded-full"
                  register={register("title", {
                    required: "Title is required!",
                  })}
                  error={errors.title ? errors.title.message : ""}
                />

                <Textbox
                  placeholder="email@example.com"
                  type="email"
                  name="email"
                  label="Email Address"
                  className="w-full rounded-full"
                  register={register("email", {
                    required: "Email Address is required!",
                  })}
                  error={errors.email ? errors.email.message : ""}
                />

                <Textbox
                  placeholder="Your password"
                  type="password"
                  name="password"
                  label="Password"
                  className="w-full rounded-full"
                  register={register("password", {
                    required: "Password is required!",
                  })}
                  error={errors.password ? errors.password.message : ""}
                />

                <Textbox
                  placeholder="Role"
                  type="text"
                  name="role"
                  label="Role"
                  className="w-full rounded-full"
                  register={register("role", {
                    required: "Role is required!",
                  })}
                  error={errors.role ? errors.role.message : ""}
                />

                {isRegisteringLoading ? (
                  <Loading />
                ) : (
                  <Button
                    type="submit"
                    label="Register"
                    className="w-full h-10 bg-blue-700 text-white rounded-full"
                  />
                )}
              </div>

              <div className="text-center text-sm text-gray-500">
                Already have an account?{" "}
                <span
                  onClick={() => setIsRegistering(false)}
                  className="text-blue-600 cursor-pointer"
                >
                  Login here
                </span>
              </div>
            </form>
          ) : (
            // Login Form
            <form
              onSubmit={handleSubmit(submitLoginHandler)}
              className="form-container w-full md:w-[400px] flex flex-col gap-y-8 bg-white px-10 pt-14 pb-14"
            >
              <p className="text-blue-600 text-3xl font-bold text-center">
                Welcome back!
              </p>
              <p className="text-center text-base text-gray-700">
                Keep your credentials safe.
              </p>

              <div className="flex flex-col gap-y-5">
                <Textbox
                  placeholder="email@example.com"
                  type="email"
                  name="email"
                  label="Email Address"
                  className="w-full rounded-full"
                  register={register("email", {
                    required: "Email Address is required!",
                  })}
                  error={errors.email ? errors.email.message : ""}
                />
                <Textbox
                  placeholder="your password"
                  type="password"
                  name="password"
                  label="Password"
                  className="w-full rounded-full"
                  register={register("password", {
                    required: "Password is required!",
                  })}
                  error={errors.password ? errors.password.message : ""}
                />

                {isLoading ? (
                  <Loading />
                ) : (
                  <Button
                    type="submit"
                    label="Submit"
                    className="w-full h-10 bg-blue-700 text-white rounded-full"
                  />
                )}
              </div>

              <div className="text-center text-sm text-gray-500">
                Don't have an account?{" "}
                <span
                  onClick={() => setIsRegistering(true)}
                  className="text-blue-600 cursor-pointer"
                >
                  Register here
                </span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
