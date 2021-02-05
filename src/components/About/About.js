import React from 'react';

function About() {
  return (
    <section className="about-me">
      <div className="about-me__photo" />
      <div className="about-me__text-container">
        <h2 className="about-me__title">Об авторе</h2>
        <p className="about-me__subtitle">
          Это блок с описанием автора проекта. Здесь следует указать, как вас зовут, чем вы занимаетесь, какими
          технологиями разработки владеете.
        </p>
        <p className="about-me__subtitle">
          Также можно рассказать о процессе обучения в Практикуме, чему вы тут научились, и чем можете помочь
          потенциальным заказчикам.
        </p>
      </div>
    </section>
  );
}

export default About;
