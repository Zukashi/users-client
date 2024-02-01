
import { Routes} from "react-router";
import {Route} from "react-router-dom";
import LoginPage from "./pages/LoginPage.tsx";
import AccountPage from "./pages/AccountPage.tsx";
import RegistrationPage from "./pages/RegistrationPage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
function App() {

  return (
    <>
        <ToastContainer/>
      <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegistrationPage />} />
              <Route path="/account" element={<ProtectedRoute><AccountPage /></ProtectedRoute>} />
              <Route path="*" element={<NotFoundPage />} />

      </Routes>
    </>
  )
}

export default App
