import React from "react";

function Navigation(props) {
    return (
        <nav className="navigation">
            {props.children}
        </nav>
    );
}


export default Navigation;