import React from 'react';
import NewsCardList from "../NewsCardList/NewsCardList";



function Maim(props) {


    return (
        <main className="main">
            <NewsCardList loggedIn={props.loggedIn}/>
        </main>
    );
}

export default Maim;