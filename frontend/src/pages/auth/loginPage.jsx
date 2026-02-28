import React, { useState } from "react";
import LoginCard from "../../components/auth/loginCard";
import SignupCard from "../../components/auth/signupCard";

export default function AuthWrapper() {
  const [mode, setMode] = useState("login");
  const [showWelcomeMobile, setShowWelcomeMobile] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-bgDark px-4">
      <div className="w-full max-w-3xl rounded-xl shadow-2xl overflow-hidden
                      flex flex-col lg:flex-row bg-white">
        {/* Form panel (left on lg, top on mobile) */}
        <div className="lg:w-2/5 w-full p-6 lg:p-8 flex flex-col justify-center">
          {/* Mobile: small toggle to reveal welcome text */}
          <div className="lg:hidden mb-4 flex items-center justify-between">

            <button
              onClick={() => setShowWelcomeMobile((s) => !s)}
              className="text-sm text-textHiglight"
              aria-expanded={showWelcomeMobile}
            >
              {showWelcomeMobile ? "Hide info" : "About Synchores"}
            </button>
          </div>

          <div className="w-full" aria-live="polite">
            {mode === "login" ? (
              <LoginCard onSwitch={() => setMode("signup")} />
            ) : (
              <SignupCard onSwitch={() => setMode("login")} />
            )}
          </div>

          {/* Optional: mobile welcome collapsed below form */}
          {showWelcomeMobile && (
            <div className="mt-6 bg-primary p-4 rounded-md text-left">
              <h3 className="text-lg font-semibold text-white">
                Welcome to <span className="text-cyan">Synchores I.T Solutions</span>
              </h3>
              <p className="text-textSecondary text-sm mt-2">
                Lorem ipsum contents here must be one sentence short to describe synchores
              </p>
            </div>
          )}
        </div>

        {/* Welcome panel (right on lg, hidden on mobile) */}
        <div className="hidden lg:flex lg:w-3/5 bg-primary flex-col items-start justify-center p-10 text-left">
          <h2 className="text-3xl font-bold mb-3 text-white">
            Welcome to <span className="text-cyan">Synchores I.T Solutions</span>
          </h2>
          <p className="text-textSecondary max-w-md text-sm leading-relaxed">
            Lorem ipsum contents here must be one sentence short to describe synchores
          </p>
        </div>
      </div>
    </div>
  );
}
