import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login/index.tsx";
import { SignUp } from "./pages/Signup";
import { PrivateRoute } from "./components/PrivateRoute/index.tsx";
import { ResetPassword } from "./pages/ResetPassword/index.tsx";
import { VerifyEmail } from "./pages/VerifyEmail/index.tsx";

function App() {
  return (
    <div className="bg-terciary font-inter text-white">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<Home />} />
        </Route>
        <Route path="*" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
