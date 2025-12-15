import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../assets/css/offers.css";

function OffersPage() {
  const [offers, setOffers] = useState([]);

  // ===== Загрузка акций =====
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/users/offers/")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setOffers(data);
        } else {
          setOffers([]);
        }
      })
      .catch(() => setOffers([]));
  }, []);

  // ===== Бронирование по АКЦИИ =====
  const handleBooking = async (offerId) => {
    if (!offerId) {
      alert("Акция не найдена");
      return;
    }

    const token = localStorage.getItem("access");

    if (!token) {
      alert("Войдите в аккаунт для бронирования");
      return;
    }

    try {
      const res = await fetch(
        "http://127.0.0.1:8000/api/users/bookings/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            offer: offerId,  
            persons: 1,
          }),
        }
      );

      if (res.ok) {
        alert("Заявка создана ✅ Проверьте личный кабинет");
      } else if (res.status === 401) {
        alert("Войдите в аккаунт");
      } else {
        const err = await res.json();
        alert(err.error || "Ошибка бронирования");
      }
    } catch {
      alert("Ошибка сервера");
    }
  };

  return (
    <>
      <Header />

      <main className="offers-page">
        <h1>Актуальные предложения</h1>
        <p className="offers-subtitle">
          Специальные акции и выгодные поездки
        </p>

        <div className="offers-grid">
          {offers.map((offer) => (
            <div key={offer.id} className="offer-card">

              {offer.image && (
                <img
                  src={`http://127.0.0.1:8000${offer.image}`}
                  alt={offer.title}
                  className="offer-image"
                />
              )}

              <div className="offer-badge">
                −{offer.discount_percent}%
              </div>

              <h3>{offer.title}</h3>
              <p>{offer.description}</p>

              {/* ===== ЦЕНА ===== */}
              <div className="offer-info">
                <span>Цена</span>
                <div>
                  <span className="old-price">
                    {offer.trip_price} ₽
                  </span>
                  <b className="new-price">
                    {offer.final_price} ₽
                  </b>
                </div>
              </div>

              {/* ===== КНОПКА ===== */}
              <button onClick={() => handleBooking(offer.id)}>
                Забронировать
              </button>

            </div>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default OffersPage;
