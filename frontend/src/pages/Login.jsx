import { useState } from "react";
import "../assets/css/auth.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const response = await fetch(
      "http://127.0.0.1:8000/api/users/login/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      setError("Неверный логин или пароль");
      return;
    }

    localStorage.setItem("access", data.access);
    localStorage.setItem("refresh", data.refresh);

    navigate("/cabinet"); 
  };

  return (
    <>
      <Header />

      <div className="auth-page">
        <div className="auth-content">
          <h1 className="auth-title">Вход в кабинет покупателя</h1>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <input
            className="auth-input"
            placeholder="Логин"
            value={login}
            onChange={e => setLogin(e.target.value)}
          />

          <input
            className="auth-input"
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <div className="auth-actions">
            <button className="auth-btn" onClick={handleLogin}>
              Войти
            </button>

            <div className="auth-links">
              <Link to="/register">Зарегистрироваться</Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Login;
