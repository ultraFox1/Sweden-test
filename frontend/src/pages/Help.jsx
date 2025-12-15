import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../assets/css/main.css";
import "../assets/css/help.css";

function Help() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      "http://127.0.0.1:8000/api/users/feedback/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    );

    if (response.ok) {
      alert("Сообщение успешно отправлено");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } else {
      alert("Ошибка при отправке");
    }
  };

  return (
    <>
      <Header />

      <main className="main">
        <div className="help-wrapper">
          <div className="help-form-container">
            <h1 className="help-title">Форма связи</h1>

            <form className="help-form" onSubmit={handleSubmit}>
              <div className="help-group">
                <input
                  type="text"
                  className="help-input"
                  placeholder="Ваше имя"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="help-group">
                <input
                  type="email"
                  className="help-input"
                  placeholder="Введите email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="help-group">
                <input
                  type="tel"
                  className="help-input"
                  placeholder="Введите телефон"
                  name="phone"
                  required
                  pattern="^8\d{10}$|^7\d{10}$"
                  title="В формате: 88000000000 или 78000000000"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="help-group">
                <textarea
                  className="help-textarea"
                  placeholder="Сообщение"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="help-submit">
                Отправить
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Help;
