import { useState } from "react";
import "../assets/css/auth.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Register() {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async () => {
    if (!agree) {
      setError("Необходимо согласиться с правилами");
      return;
    }

    if (password !== password2) {
      setError("Пароли не совпадают");
      return;
    }

    const response = await fetch(
      "http://127.0.0.1:8000/api/users/register/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          login,
          email,
          password,
        }),
      }
    );

    if (!response.ok) {
      setError("Ошибка регистрации");
    } else {
      alert("Регистрация успешна");
      window.location.href = "/login";
    }
  };

  return (
    <>
      <Header />

      <div className="auth-page">
        <div className="auth-content">
          <h1 className="auth-title">Регистрация</h1>
          <p>Укажите почту и логин</p>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <input
            className="auth-input"
            placeholder="Логин"
            value={login}
            onChange={e => setLogin(e.target.value)}
          />

          <input
            className="auth-input"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <input
            className="auth-input"
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <input
            className="auth-input"
            type="password"
            placeholder="Подтвердите пароль"
            value={password2}
            onChange={e => setPassword2(e.target.value)}
          />

          <div className="auth-actions">
            <button className="auth-btn" onClick={handleRegister}>
              Зарегистрироваться
            </button>

            <div className="auth-checkbox">
              <input
                type="checkbox"
                checked={agree}
                onChange={() => setAgree(!agree)}
              />
              <span>Соглашаюсь с правилами площадки</span>
            </div>
          </div>
          <br></br><br></br>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Register;
