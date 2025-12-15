import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../assets/css/tour.css";

// Откуда (РФ)
const fromCities = [
  "Москва",
  "Санкт-Петербург",
  "Казань",
  "Екатеринбург",
  "Новосибирск",
];

function TourPage() {
  const [fromCity, setFromCity] = useState("");
  const [trips, setTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [persons, setPersons] = useState(1);
  const [message, setMessage] = useState("");

  // 🔹 загрузка туров из БД
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/users/trips/")
      .then((res) => res.json())
      .then((data) => setTrips(Array.isArray(data) ? data : []))
      .catch(() => setTrips([]));
  }, []);

const handleBooking = async () => {
  if (!fromCity || !selectedTrip) {
    setMessage("Заполните все поля");
    return;
  }

  try {
    const response = await fetch(
      "http://127.0.0.1:8000/api/users/bookings/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
        body: JSON.stringify({
          trip: selectedTrip.id,
          persons: Number(persons),
        }),
      }
    );

    if (!response.ok) {
      const err = await response.json();
      console.error(err);
      setMessage("Ошибка при бронировании");
      return;
    }

    setMessage("Заявка успешно создана ✅");
    setFromCity("");
    setSelectedTrip(null);
    setPersons(1);
  } catch (e) {
    console.error(e);
    setMessage("Ошибка соединения с сервером");
  }
};


  return (
    <>
      <Header />

      <main className="main">
        <div className="tour-search">
          <h1>Поездки из России в Швецию</h1>

          <div className="tour-form">
            {/* ОТКУДА */}
            <select
              value={fromCity}
              onChange={(e) => setFromCity(e.target.value)}
            >
              <option value="">Откуда</option>
              {fromCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>

            {/* ПОЕЗДКИ ИЗ БД */}
            <select
              value={selectedTrip?.id || ""}
              onChange={(e) =>
                setSelectedTrip(
                  trips.find((t) => t.id === Number(e.target.value)) || null
                )
              }
            >
              <option value="">Выберите поездку</option>
              {trips.map((trip) => (
                <option key={trip.id} value={trip.id}>
                  {trip.title} · {trip.date_start} — {trip.date_end} ·{" "}
                  {trip.price} ₽
                </option>
              ))}
            </select>

            {/* ПАССАЖИРЫ */}
            <input
              type="number"
              min="1"
              value={persons}
              onChange={(e) => setPersons(e.target.value)}
              className="persons-input"
            />

            {/* КНОПКА */}
            <button onClick={handleBooking}>
              Забронировать
            </button>
          </div>

          {message && <p className="tour-message">{message}</p>}
        </div>
        <section className="booking-steps">
  <h2>Как проходит бронирование</h2>

  <div className="steps-grid">
    <div className="step-card">
      <span className="step-number">1</span>
      <h4>Выбор поездки</h4>
      <p>Выберите маршрут, даты и количество пассажиров</p>
    </div>

    <div className="step-card">
      <span className="step-number">2</span>
      <h4>Заявка</h4>
      <p>Мы получаем заявку и связываемся с вами</p>
    </div>

    <div className="step-card">
      <span className="step-number">3</span>
      <h4>Подтверждение</h4>
      <p>Подтверждаем поездку и оформляем документы</p>
    </div>
  </div>
</section>

      </main>

      <Footer />
    </>
  );
}

export default TourPage;
