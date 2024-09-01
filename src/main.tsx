import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { TaskProvider } from "./contexts/TaskContext.tsx";
import { UserProvider } from "./contexts/UserContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <TaskProvider>
        <UserProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
        </UserProvider>
      </TaskProvider>
    </BrowserRouter>
  </StrictMode>
);
