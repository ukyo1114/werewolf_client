import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

import Home from "./pages/Home/Home.jsx";
import HowToPlay from "./pages/HowToPlay.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register.jsx";
import RequestPasswordReconfig from "./pages/PasswordReconfigure/RequestPasswordReconfig.jsx";

const Channels = lazy(() => import("./pages/Channels.jsx"));
const ResetPassword = lazy(() => import("./pages/ResetPassword.jsx"));
const SendRegistrationEmail = lazy(
  () => import("./pages/SendRegistrationEmail/SendRegistrationEmail.jsx")
);

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/how-to-play" element={<HowToPlay />} />
        <Route path="/chats" element={<Channels />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route
          path="/send-registration-email"
          element={<SendRegistrationEmail />}
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/request-password-reconfig"
          element={<RequestPasswordReconfig />}
        />
        <Route path="/register/:token" element={<Register />} />
      </Routes>
    </Suspense>
  );
}

export default App;
