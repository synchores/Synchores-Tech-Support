import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LOGIN_MUTATION } from "../../services/authService";
import { useMutation } from "@apollo/client/react";

export default function LoginCard({ onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: [], password: [] });
  const [touched, setTouched] = useState({ email: false, password: false });
  const [authError, setAuthError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const [login, { loading }] = useMutation(LOGIN_MUTATION);

  const validate = () => {
    const newErrors = { email: [], password: [] };
    if (!email) newErrors.email.push("Email is required");
    if (!password) newErrors.password.push("Password is required");
    // Example: wrong password error (simulate)
    // if (password && password.length < 6) newErrors.password.push("Wrong Password");
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthError("");
    const validation = validate();
    setErrors(validation);
    setTouched({ email: true, password: true });
    // If no errors, proceed with login logic

    // Step 2: Check if there are errors
    const hasValidationErrors = Object.values(validation).some((fieldErrors) => fieldErrors.length > 0);

    if (!hasValidationErrors) {
        try {
            // Step 3: Call GraphQL mutation
            const response = await login({
                variables: {
                    emailAddress: email.trim(),     // or userName if your backend expects it
                    password: password
                }
            });

            // Step 4: Handle successful login
            const accessToken = response.data.login.accessToken;

            localStorage.setItem("accessToken", accessToken);

            const redirectTo = location.state?.from?.pathname || "/dashboard";
            navigate(redirectTo);
            
        } catch (err) {
            const errMessage = err?.graphQLErrors?.[0]?.message || err?.message || "Login failed. Please try again.";
            const isInvalidCredentials = /invalid credentials|unauthorized|wrong password|invalid/i.test(errMessage);

            setAuthError(isInvalidCredentials ? "Incorrect email or password. Please try again." : "Unable to log in right now. Please try again.");
            setErrors((prev) => ({
              ...prev,
              password: isInvalidCredentials ? ["Wrong password or email"] : prev.password,
            }));
            setTouched((prev) => ({ ...prev, password: true }));
            console.error(err.message);
        }
    }
  };

  const getInputProps = (field) => {
    const hasError = errors[field].length > 0 && touched[field];
    const singleError = hasError && errors[field].length === 1;
    return {
      className:
        "w-full py-2 px-3 border-b-2 border-t-0 bg-white/60 backdrop-blur-md text-gray-800 focus:outline-none shadow-lg transition " +
        (hasError
          ? "border-red-500 focus:ring-2 focus:ring-red-400 bg-red-50 placeholder:text-red-500 placeholder:text-xs placeholder:font-semibold"
          : "border-gray-300 focus:ring-2 focus:ring-cyan placeholder:text-gray-400"),
      style: { borderTop: "none", borderRadius: "0 0 0.5rem 0.5rem" },
      value: singleError ? "" : field === "email" ? email : password,
      placeholder: singleError ? errors[field][0] : field === "email" ? "you@company.com" : "password",
      onChange: (e) => {
        if (authError) setAuthError("");
        if (field === "email") setEmail(e.target.value);
        else setPassword(e.target.value);
      },
      type: field === "password" ? "password" : "email",
      autoComplete: field,
      readOnly: singleError,
      onFocus: singleError
        ? (e) => {
            // Clear error on focus
            if (field === "email") setEmail("");
            else setPassword("");
            setErrors((prev) => ({ ...prev, [field]: [] }));
          }
        : undefined,
    };
  };

  return (
    <form className="w-full" onSubmit={handleSubmit} autoComplete="off">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Log in</h1>

      {authError && (
        <div className="mb-4 rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm font-medium text-red-600">
          {authError}
        </div>
      )}

      <label className="block text-gray-500 text-sm mb-1">Email</label>
      <div className="relative mb-4">
        <input {...getInputProps("email")} />
        {errors.email.length > 1 && touched.email && (
          <div className="text-xs text-red-500 mt-1">
            {errors.email.slice(1).map((err, i) => (
              <div key={i}>{err}</div>
            ))}
          </div>
        )}
      </div>

      <label className="block text-gray-500 text-sm mb-1">Password</label>
      <div className="relative mb-2">
        <input {...getInputProps("password")} />
        {errors.password.length > 1 && touched.password && (
          <div className="text-xs text-red-500 mt-1">
            {errors.password.slice(1).map((err, i) => (
              <div key={i}>{err}</div>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mb-5">
        <a className="text-sm text-gray-400 hover:underline cursor-pointer">
          Forgot Password?
        </a>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2.5 rounded-md font-semibold transition-colors flex items-center justify-center gap-2 ${
          loading
            ? "bg-gray-700 text-white cursor-not-allowed"
            : "bg-gray-900 text-white hover:bg-gray-700"
        }`}
      >
        {loading ? (
          <>
            <span className="inline-block h-4 w-4 border-2 border-white/70 border-t-transparent rounded-full animate-spin" />
            Logging in...
          </>
        ) : (
          "Login"
        )}
      </button>

      <p className="mt-4 text-sm text-gray-400">
        Don't have an account?{" "}
        <button
          type="button"
          onClick={onSwitch}
          className="text-cyan font-semibold hover:underline"
        >
          Sign Up
        </button>
      </p>
    </form>
  );
}
