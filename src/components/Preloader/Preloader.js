import React from 'react';

function Preloader(props) {
  return (
    <div className="preloader">
      {props.children}
      <p className="preloader__subtitle">{props.textSubtitle}</p>
    </div>
  );
}

export default Preloader;
