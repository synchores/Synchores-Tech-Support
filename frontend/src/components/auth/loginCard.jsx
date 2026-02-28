import React, { useState } from "react";

export default function LoginCard({ onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: [], password: [] });
  const [touched, setTouched] = useState({ email: false, password: false });

  const validate = () => {
    const newErrors = { email: [], password: [] };
    if (!email) newErrors.email.push("Email is required");
    if (!password) newErrors.password.push("Password is required");
    // Example: wrong password error (simulate)
    // if (password && password.length < 6) newErrors.password.push("Wrong Password");
    return newErrors;
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validate();
    setErrors(validation);
    setTouched({ email: true, password: true });
    // If no errors, proceed with login logic
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
        if (field === "email") setEmail(e.target.value);
        else setPassword(e.target.value);
      },
      onBlur: () => handleBlur(field),
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
        className="w-full py-2.5 bg-gray-900 text-white rounded-md font-semibold hover:bg-gray-700 transition-colors"
      >
        Login
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
