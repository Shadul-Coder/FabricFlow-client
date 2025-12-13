import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import Loading from "../../components/Loading/Loading";
import useAxios from "../../hooks/useAxios";

const Login = () => {
  const axios = useAxios();
  const navigate = useNavigate();
  const { user, loading, googleSignIn, emailSignIn } = useAuth();
  const [showPass, setShowPass] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  // Redirect if user already logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  if (loading) {
    return <Loading />;
  }

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await emailSignIn(data.email, data.password);
      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);

      let errorMessage = "Invalid email or password. Please try again.";
      if (error.code === "auth/user-not-found") {
        errorMessage =
          "No account found with this email. Please register first.";
      } else if (error.code === "auth/wrong-password") {
        errorMessage = "Incorrect password. Please try again.";
      } else if (error.code === "auth/too-many-requests") {
        errorMessage = "Too many failed attempts. Please try again later.";
      } else if (error.message) {
        errorMessage = error.message;
      }

      setError("root", { type: "manual", message: errorMessage });
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await googleSignIn();
      const user = result.user;

      // Prepare user data for MongoDB
      const userData = {
        name: user.displayName || "Google User",
        email: user.email,
        photoURL: user.photoURL,
        role: "buyer", // Default role for Google sign-in
        status: "pending",
        createdAt: new Date(),
      };

      // Save user to MongoDB - server will handle duplicate check
      try {
        await axios.post("/users", userData);
      } catch (error) {
        // Silently handle duplicate user error
        if (!error.response?.data?.message?.includes("User already exists")) {
          throw error;
        }
      }

      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Google Login Failed",
        text: error.message,
      });
    }
  };
  return (
    <div className="max-w-7xl mx-auto w-[95%] py-9 sm:py-13 lg:w-[97%]">
      <title>Login | FabricFlow</title>
      <div className="max-w-md mx-auto w-full bg-base-100 text-(--color-heading) rounded-xl shadow-2xl overflow-hidden p-8 space-y-8 border border-gray-200">
        <h2 className="text-center text-4xl font-extrabold text-(--color-heading)">
          Welcome Back
        </h2>
        <p className="text-center text-gray-600">
          Sign in to access your garment production dashboard
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Field */}
          <div>
            <label className="label">
              <span className="label-text font-medium text-(--color-heading)">
                Email
              </span>
            </label>
            <input
              type="email"
              placeholder="your@gmail.com"
              className="input input-bordered outline-none w-full bg-transparent border-(--color-secondary) focus:border-(--color-primary)"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-error text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="label">
              <span className="label-text font-medium text-(--color-heading)">
                Password
              </span>
            </label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Enter your password"
                className="input input-bordered outline-none w-full bg-transparent border-(--color-secondary) focus:border-(--color-primary) pr-10"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-(--color-heading) hover:text-(--color-primary)"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-error text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="cursor-pointer label">
              <input
                type="checkbox"
                className="checkbox checkbox-primary"
                {...register("remember")}
              />
              <span className="label-text text-(--color-heading) ml-2">
                Remember me
              </span>
            </label>
            <Link to="#" className="text-sm link link-primary">
              Forgot password?
            </Link>
          </div>

          {/* Root Error */}
          {errors.root && (
            <div className="alert alert-error">
              <span>{errors.root.message}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-full bg-(--color-primary) border-(--color-primary) hover:bg-opacity-90"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="divider text-(--color-heading)">OR</div>

        {/* Google Sign In */}
        <button
          onClick={handleGoogleSignIn}
          className="btn btn-outline w-full gap-2 border-(--color-heading) text-(--color-heading) hover:bg-(--color-secondary)"
          type="button"
        >
          <FcGoogle className="text-xl" />
          Continue with Google
        </button>

        {/* Register Link */}
        <div className="text-center">
          <p className="text-(--color-heading)">
            Don't have an account?{" "}
            <Link to="/register" className="link link-primary font-medium">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
