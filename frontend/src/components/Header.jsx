import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../assets/css/main.css";
import logo from "../assets/img/logo.webp";
import userIcon from "../assets/img/user-icon.png";

function Header() {
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  //  Проверка: администратор или нет
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;

      if (current > lastScrollY.current && current > 80) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      lastScrollY.current = current;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`header ${hidden ? "header-hidden" : ""}`}>
      
      {/* ===== Верхняя полоса ===== */}
      <div className="navbar_up">
        <ul>
          <li>
            <Link to="/about" className="btn_1 primary-btn_1">
              О нас
            </Link>
          </li>
          <li>
            <Link to="/help" className="btn_1 primary-btn_1">
              delovoyVopros@mail.ru
            </Link>
          </li>
          <li>
            <Link to="/help" className="btn_1 primary-btn_1">
              +7 906 399-96-68
            </Link>
          </li>
        </ul>
      </div>

      {/* ===== Основная навигация ===== */}
      <div className="container_header">
        <nav className="navbar">
          <ul>
            {/* Логотип */}
            <li className="li2">
              <Link to="/" className="btn_1 primary-btn_1">
                <img
                  src={logo}
                  alt="Shweden Tour"
                  className="logo-img"
                />
              </Link>
            </li>

            <li>
              <Link to="/catalog" className="btn_1 primary-btn_1">
                Отели
              </Link>
            </li>

            <li>
              <Link to="/tour" className="btn_1 primary-btn_1">
                Поездки
              </Link>
            </li>

            <li>
              <Link to="/offers" className="btn_1 primary-btn_1">
                Предложения
              </Link>
            </li>

            {/* Иконка пользователя */}
            <li className="li1">
              <Link to="/cabinet" className="btn_1 primary-btn_1">
                <img
                  src={userIcon}
                  alt="Личный кабинет"
                  className="user-icon"
                />
              </Link>
            </li>

            <li>
              <Link to="/cabinet" className="btn_1 primary-btn_1">
                Личный кабинет
              </Link>
            </li>

            {/* КНОПКА АДМИНКИ (ТОЛЬКО ДЛЯ АДМИНА) */}
            {isAdmin && (
              <li>
                <a
                  href="http://127.0.0.1:8000/admin/"
                  className="btn_1 primary-btn_1"
                  target="_blank"
                  rel="noreferrer"
                >
                  Админка
                </a>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
