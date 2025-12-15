import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../assets/css/cabinet.css";

function Cabinet() {
  const [user, setUser] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [bookings, setBookings] = useState([]);
  
useEffect(() => {
  fetch("http://127.0.0.1:8000/api/users/me/", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      setUser(data);
      localStorage.setItem("isAdmin", data.is_staff);
    });
}, []);

  useEffect(() => {
    //  профиль
    fetch("http://127.0.0.1:8000/api/users/me/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUser(data));

    //  мои поездки
    fetch("http://127.0.0.1:8000/api/users/bookings/my/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setBookings(Array.isArray(data) ? data : []));
  }, []);

  // отмена заявки
  const cancelBooking = async (id) => {
    if (!window.confirm("Отменить заявку?")) return;

    const response = await fetch(
      `http://127.0.0.1:8000/api/users/bookings/${id}/cancel/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      }
    );

    if (response.ok) {
      setBookings((prev) =>
        prev.map((b) =>
          b.id === id ? { ...b, status: "cancelled" } : b
        )
      );
    }
  };

  // загрузка аватара
  const uploadAvatar = async () => {
    if (!avatar) return;

    const formData = new FormData();
    formData.append("avatar", avatar);

    await fetch("http://127.0.0.1:8000/api/users/avatar/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
      body: formData,
    });

    window.location.reload();
  };

  // выход
  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  if (!user) return null;

  return (
    <>
      <Header />

      <div className="cabinet-page">

        {/* ПРОФИЛЬ */}
        <div className="cabinet-card">
          <div className="cabinet-avatar">
            {user.avatar ? (
              <img
                src={`http://127.0.0.1:8000${user.avatar}`}
                alt="avatar"
              />
            ) : (
              <div className="avatar-placeholder">👤</div>
            )}
          </div>

          <h2 className="cabinet-login">{user.login}</h2>
          <p className="cabinet-email">{user.email}</p>

          <div className="cabinet-upload">
            <input
              type="file"
              onChange={(e) => setAvatar(e.target.files[0])}
            />
            <button onClick={uploadAvatar}>
              Загрузить аватар
            </button>
          </div>

          <button className="cabinet-logout" onClick={logout}>
            Выйти
          </button>
        </div>

        {/* МОИ ПОЕЗДКИ */}
        <div className="cabinet-orders">
          <h3>Мои поездки</h3>

          {bookings.length === 0 ? (
            <div className="orders-empty">
              <p>У вас пока нет поездок</p>
              <span>Забронируйте тур — он появится здесь</span>
            </div>
          ) : (
            <div className="orders-grid">
              {bookings.map((booking) => (
                <div key={booking.id} className="order-card">

                  {/* заголовок */}
                  <div className="order-header">
                    <h4>{booking.trip.title}</h4>
                  </div>

                 {/* TIMELINE СТАТУСА */}
<div className="timeline">
  <div className={`step ${booking.status !== "cancelled" ? "active" : ""}`}>
    <span>Создано</span>
  </div>

  <div
    className={`line ${
      booking.status === "confirmed" ? "active" : ""
    }`}
  ></div>

  <div
    className={`step ${
      booking.status === "confirmed" ? "active" : ""
    }`}
  >
    <span>Подтверждено</span>
  </div>

  {booking.status === "cancelled" && (
    <>
      <div className="line cancelled"></div>
      <div className="step cancelled">
        <span>Отменено</span>
      </div>
    </>
  )}
</div>


                  {/* инфо */}
                  <div className="order-info">
                    <div>
                      <span>Даты</span>
                      <b>
                        {booking.trip.date_start} — {booking.trip.date_end}
                      </b>
                    </div>

                    <div>
                      <span>Пассажиры</span>
                      <b>{booking.persons}</b>
                    </div>

                    <div>
                      <span>Цена</span>
                      <b>{booking.total_price} ₽</b>
                    </div>
                  </div>

                  {/* кнопка отмены */}
                  {booking.status === "created" && (
                    <button
                      className="order-cancel"
                      onClick={() => cancelBooking(booking.id)}
                    >
                      Отменить заявку
                    </button>
                  )}

                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      <Footer />
    </>
  );
}

export default Cabinet;
