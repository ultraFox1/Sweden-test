import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Main from "./pages/Main";
import Help from "./pages/Help";
import Catalog from "./pages/Catalog";
import TourPage from "./pages/TourPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cabinet from "./pages/Cabinet";
import About from "./pages/About";
import OffersPage from "./pages/OffersPage";
import PrivateRoute from "./components/PrivateRoute";


function App() {


  useEffect(() => {
    const token = localStorage.getItem("access");

    if (!token) return;

    fetch("http://127.0.0.1:8000/api/users/me/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.status === 401) {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
      }
    });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/help" element={<Help />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/tour" element={<TourPage />} />
        <Route path="/offers" element={<OffersPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />


        {/* ЗАЩИЩЁННЫЙ МАРШРУТ */}
        <Route
          path="/cabinet"
          element={
            <PrivateRoute>
              <Cabinet />
            </PrivateRoute>
          }
        />

        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
