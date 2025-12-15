import Header from "../components/Header";
import Footer from "../components/Footer";
import "../assets/css/main.css";

import heroImg from "../assets/img/shveciya.jpg";
import img1 from "../assets/img/stockholm-1.webp";
import img2 from "../assets/img/stokgolmskii-arkhipelag-1.webp";
import cruise from "../assets/img/stockholm-cruise.webp";

function Main() {
  return (
    <>
      <Header />

      <main className="main">
        {/* hero-блок */}
        <section className="hero">
          <div className="container hero-content">
            <div className="hero-text">
              <h1>Швеция: исконная Скандинавия</h1>
              <p>
                Где влияние природы ощущается в городах, инновациях и
                повседневной жизни
              </p>
              <a href="/tour" className="btn">
                В Швецию
              </a>
            </div>

            <div className="hero-image">
              <img src={heroImg} alt="Швеция" />
            </div>
          </div>
        </section>

        {/* блок «Швеция» */}
        <section className="info">
          <div className="container">
            <h2>Швеция</h2>
            <p>
              Планируете посетить Швецию, но не знаете, с чего начать и что
              посмотреть? Мы подобрали
              <br />
              несколько регионов, вдохновляющих на путешествия. Взгляните и
              спланируйте самую приятную
              <br />
              поездку.
            </p>
          </div>
        </section>

        {/* карточки */}
        <section className="cards">
          <div className="container cards-grid">
            <div className="card">
              <img src={img1} alt="Стокгольм" />
              <h3>Стокгольм</h3>
              <p>
                В столице Швеции всегда есть чем заняться: от осмотра красот
                города, посещения музеев и семейных развлечений до шопинга и
                обедов в отличных ресторанах.
              </p>
            </div>

            <div className="card">
              <img src={img2} alt="Стокгольмский архипелаг" />
              <h3>Стокгольмский архипелаг</h3>
              <p>
                Окунитесь в магию Стокгольмского архипелага, исследуя один за
                одним острова, бродя по живописным тропам и любуясь
                потрясающими морскими видами.
              </p>
            </div>
          </div>
        </section>

        {/* блок «Как съездить в Швецию?» */}
        <section className="travel-info">
          <div className="container travel-content">
            <div className="travel-image">
              <img src={cruise} alt="Семья на борту" />
            </div>

            <div className="travel-text">
              <h2>Как съездить в Швецию?</h2>
              <p>
                Из Таллинна, Хельсинки и Турку по Балтийскому морю ходят
                лайнеры Tallink Silja Line. Поездка с потрясающими видами,
                вкусной едой и развлечениями на борту – отличное начало вашего
                приключения!
              </p>

              <div className="travel-buttons">
                <a href="/tour" className="btn primary-btn">
                  Купить билет
                </a>
                <a href="/tour" className="btn secondary-btn">
                  Расписание рейсов →
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Main;
