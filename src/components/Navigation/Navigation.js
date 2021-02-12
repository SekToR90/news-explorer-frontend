import React from 'react';

function Navigation(props) {
  return <nav className={`navigation ${props.isOpen ? 'navigation_open' : 'navigation_close'}`}>{props.children}</nav>;
}

export default Navigation;
