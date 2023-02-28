import errorImg from '../assets/img/error.gif';

const Found404 = () => {
  return (
    <div className="error__body">
      <h2>Сталася помилка<icon>😕</icon></h2>
      <p>Нажаль, не вдалося отримати піци. Спробуйте пізніше</p>
      <img src={errorImg} alt="error__img" />
    </div>
  )
}

export default Found404;
