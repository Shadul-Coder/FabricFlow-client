// src/pages/Register/Register.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxios from "../../hooks/useAxios";
import Loading from "../../components/Loading/Loading";

const Register = () => {
  const axios = useAxios();
  const navigate = useNavigate();
  const { user, loading, googleSignIn, emailRegister, update } = useAuth();
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
      // Create user in Firebase
      const firebaseResult = await emailRegister(data.email, data.password);
      const currentUser = firebaseResult.user;

      // Update profile with name and photo
      await update(currentUser, data.name, data.photoURL);

      // Prepare user data for MongoDB
      const userData = {
        name: data.name,
        email: data.email,
        photoURL: data.photoURL,
        role: data.role,
        status: "pending",
        createdAt: new Date(),
      };

      // Save user to MongoDB
      const response = await axios.post("/users", userData);

      if (response.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Registration Successful!",
          text: "Your account has been created successfully.",
          showConfirmButton: false,
          timer: 2000,
        });
        navigate("/");
      }
    } catch (error) {
      console.error("Registration error:", error);

      // Handle specific Firebase errors
      let errorMessage = "Something went wrong. Please try again.";
      if (error.code === "auth/email-already-in-use") {
        errorMessage =
          "This email is already registered. Please login instead.";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "Password is too weak. Please use a stronger password.";
      } else if (error.message) {
        errorMessage = error.message;
      }

      setError("root", { type: "manual", message: errorMessage });
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
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
      <title>Register | FabricFlow</title>
      <div className="max-w-md mx-auto w-full bg-base-100 text-(--color-heading) rounded-xl shadow-2xl overflow-hidden p-8 space-y-8 border border-gray-200">
        <h2 className="text-center text-4xl font-extrabold text-(--color-heading)">
          Create Your Account
        </h2>
        <p className="text-center text-gray-600">
          Register to manage garment orders and production workflow
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Field */}
          <div>
            <label className="label">
              <span className="label-text font-medium text-(--color-heading)">
                Full Name
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="input input-bordered outline-none w-full bg-transparent border-(--color-secondary) focus:border-(--color-primary)"
              {...register("name", {
                required: "Name is required",
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: "Name can only contain letters and spaces",
                },
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
              })}
            />
            {errors.name && (
              <p className="text-error text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

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

          {/* Photo URL Field */}
          <div>
            <label className="label">
              <span className="label-text font-medium text-(--color-heading)">
                Photo URL
              </span>
            </label>
            <input
              type="url"
              placeholder="https://example.com/photo.jpg"
              className="input input-bordered outline-none w-full bg-transparent border-(--color-secondary) focus:border-(--color-primary)"
              {...register("photoURL", {
                required: "Photo URL is required",
                pattern: {
                  value: /^https:\/\/.+/,
                  message: "URL must start with https://",
                },
              })}
            />
            {errors.photoURL && (
              <p className="text-error text-sm mt-1">
                {errors.photoURL.message}
              </p>
            )}
          </div>

          {/* Role Selection */}
          <div>
            <label className="label">
              <span className="label-text font-medium text-(--color-heading)">
                Role
              </span>
            </label>
            <select
              className="select select-bordered outline-none w-full border-(--color-secondary) focus:border-(--color-primary) text-(--color-heading)"
              {...register("role", {
                required: "Please select a role",
              })}
            >
              <option value="" disabled>
                Select your role
              </option>
              <option value="buyer">Buyer</option>
              <option value="manager">Manager</option>
            </select>
            {errors.role && (
              <p className="text-error text-sm mt-1">{errors.role.message}</p>
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
                  validate: {
                    hasUppercase: (value) =>
                      /[A-Z]/.test(value) ||
                      "Must contain at least one uppercase letter",
                    hasLowercase: (value) =>
                      /[a-z]/.test(value) ||
                      "Must contain at least one lowercase letter",
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

          {/* Terms Checkbox */}
          <div className="form-control">
            <label className="label cursor-pointer justify-start gap-3">
              <input
                type="checkbox"
                className="checkbox checkbox-primary"
                {...register("terms", {
                  required: "You must accept the terms and conditions",
                })}
              />
              <span className="label-text text-(--color-heading)">
                I agree to the{" "}
                <a href="#" className="link link-primary">
                  Terms & Conditions
                </a>
              </span>
            </label>
            {errors.terms && (
              <p className="text-error text-sm mt-1">{errors.terms.message}</p>
            )}
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
              "Register"
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

        {/* Login Link */}
        <div className="text-center">
          <p className="text-(--color-heading)">
            Already have an account?{" "}
            <Link to="/login" className="link link-primary font-medium">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
