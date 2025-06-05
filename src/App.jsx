import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

import Home from "./pages/Home.jsx";
import HowToPlay from "./pages/HowToPlay.jsx";
import Login from "./pages/Login.jsx";
import RequestPasswordReset from "./pages/RequestPasswordReset.jsx";

const Channels = lazy(() => import("./pages/Channels.jsx"));
const EmailVerification = lazy(() => import("./pages/EmailVerification.jsx"));
const ResetPassword = lazy(() => import("./pages/ResetPassword.jsx"));
const EmailVerificationRequest = lazy(
  () => import("./pages/EmailVerificationRequest.jsx")
);

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/how-to-play" element={<HowToPlay />} />
        <Route path="/chats" element={<Channels />} />
        <Route path="/verification/:token" element={<EmailVerification />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/register" element={<EmailVerificationRequest />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/request-password-reset"
          element={<RequestPasswordReset />}
        />
      </Routes>
    </Suspense>
  );
}

export default App;
