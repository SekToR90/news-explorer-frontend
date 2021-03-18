import React from 'react';

function About() {
  return (
    <section className="about-me">
      <div className="about-me__photo" />
      <div className="about-me__text-container">
        <h2 className="about-me__title">Об авторе</h2>
        <p className="about-me__subtitle">
          Привет. Меня зовут Никита, я начинающий front-end разработчик. Мне всегда нравилась работа, где можно сразу
          увидеть результат своего труда. Именно поэтому я решил развиваться в направлении веб-разработки, где у меня
          есть возможность не только делать проекты которые нужны людям, но так же улучшать уже имеющиеся, добавляя им
          новый функционал.
        </p>
        <p className="about-me__subtitle">
          Недавно я закончил курсы web-разработки в Яндекс.Практикуме. Знаю React, HTML5, CSS. Умею работать в Git.
          Совершенствую свои навыки английского на курсах и изучаю TypeScript. В свободное время занимаюсь 3D графикой.
        </p>
      </div>
    </section>
  );
}

export default About;
