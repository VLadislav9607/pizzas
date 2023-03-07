import React from 'react';
import errorImg from '../assets/img/error.gif';

const Found404: React.FC = () => {
  return (
    <div className="error__body">
      <h2>Сталася помилка<span>😕</span></h2>
      <p>Нажаль, не вдалося отримати піци. Спробуйте пізніше</p>
      <img src={errorImg} alt="error__img" />
    </div>
  )
}

export default Found404;
