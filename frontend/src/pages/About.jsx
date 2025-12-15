import Header from "../components/Header";
import Footer from "../components/Footer";

function About() {
  return (
    <>
      <Header />

      <main className="main">
        <div className="page">
          <h1>О сервисе Shweden Tour</h1>
          <p>
            Shweden Tour — это учебный проект туристического сервиса по поездкам в Швецию.
            На сайте вы можете посмотреть направления, подобрать поездку и получить
            информацию об условиях путешествия.
          </p>
          <p>
            Мы вдохновлялись реальными скандинавскими маршрутами: Стокгольм, архипелаг,
            круизы по Балтике и многое другое.
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default About;
