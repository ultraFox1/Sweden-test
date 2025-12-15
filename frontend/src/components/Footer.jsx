import "../assets/css/main.css";

function Footer() {
  return (
    <footer>
      <div className="container cards-grid_2">
        <div className="card_2">
          <h3>Контактные данные</h3>
          <h4>
            <a href="#" className="btn_1 primary-btn_1">
              Обратная связь
            </a>
          </h4>
          <h4>
            <a href="#" className="btn_1 primary-btn_1">
              Обслуживание клиентов
            </a>
          </h4>
        </div>

        <div className="card_2">
          <h3>Полезная информация</h3>
          <h4>
            <a href="#" className="btn_1 primary-btn_1">
              Условия и правила
            </a>
          </h4>
          <h4>
            <a href="#" className="btn_1 primary-btn_1">
              Полезно знать
            </a>
          </h4>
          <h4>
            <a href="#" className="btn_1 primary-btn_1">
              Политика конфиденциальности
            </a>
          </h4>
          <h4>
            <a href="#" className="btn_1 primary-btn_1">
              Политика использования файлов cookie
            </a>
          </h4>
        </div>

        <div className="card_2">
          <h3>Следите за новостями</h3>
          <h4>
            <a href="#" className="btn_1 primary-btn_1">
              YouTube
            </a>
          </h4>
          <h4>
            <a href="#" className="btn_1 primary-btn_1">
              Vk
            </a>
          </h4>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
