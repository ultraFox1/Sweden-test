import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../assets/css/catalog.css";


const hotels = [
  {
    id: 1,
    name: "Hotel C Stockholm",
    description: "Современный отель в центре Стокгольма",
    fullDescription:
      "Рядом с вокзалом, ресторан, бар, фитнес-зал, бесплатный Wi-Fi.",
    price: "12 500 ₽ / ночь",
    rating: "9.1",
    image: "/hotels/Hotel_C_Stockholm_original.webp",
  },
  {
    id: 2,
    name: "Scandinavian Comfort",
    description: "Уютный отель в скандинавском стиле",
    fullDescription:
      "Панорамные окна, завтрак включён, парковка.",
    price: "9 800 ₽ / ночь",
    rating: "8.7",
    image: "/hotels/0c7bef6d.avif",
  },
    {
    id: 3,
    name: "Scandinavian Comfort +",
    description: "Отель в скандинавском стиле",
    fullDescription:
      "Панорамные окна, завтрак включён, шведский стол, парковка.",
    price: "10 800 ₽ / ночь",
    rating: "8.9",
    image: "/hotels/foto1.png",
  },
];

function Catalog() {
  const [selectedHotel, setSelectedHotel] = useState(null);

  return (
    <>
      <Header />

      <main className="catalog-page">
        <h1>Отели</h1>

        <div className="hotels-grid">
          {hotels.map((hotel) => (
            <div
              key={hotel.id}
              className="hotel-card"
              onClick={() => setSelectedHotel(hotel)}
            >
              <img src={hotel.image} alt={hotel.name} />
              <h3>{hotel.name}</h3>
              <p>{hotel.description}</p>
              <span className="price">{hotel.price}</span>
            </div>
          ))}
        </div>
      </main>
<section className="why-us">
  <h2>Почему выбирают нас</h2>

  <div className="why-us-grid">
    <div className="why-card">
      <span className="why-icon">🏨</span>
      <h3>Проверенные отели</h3>
      <p>Мы сотрудничаем только с надежными отелями</p>
    </div>

    <div className="why-card">
      <span className="why-icon">💰</span>
      <h3>Лучшие цены</h3>
      <p>Без скрытых комиссий и переплат</p>
    </div>

    <div className="why-card">
      <span className="why-icon">🕒</span>
      <h3>Поддержка 24/7</h3>
      <p>Всегда на связи</p>
    </div>

    <div className="why-card">
      <span className="why-icon">✈️</span>
      <h3>Всё в одном месте</h3>
      <p>Поездки, отели и акции</p>
    </div>
  </div>
</section>

      {/* МОДАЛЬНОЕ ОКНО */}
      {selectedHotel && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedHotel(null)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelectedHotel(null)}
            >
              ✖
            </button>

            <img
              src={selectedHotel.image}
              alt={selectedHotel.name}
            />

            <h2>{selectedHotel.name}</h2>
            <div className="rating">⭐ {selectedHotel.rating}</div>

            <p>{selectedHotel.fullDescription}</p>

            <div className="modal-price">
              {selectedHotel.price}
            </div>

            <button className="modal-book-btn">
              Забронировать
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default Catalog;
