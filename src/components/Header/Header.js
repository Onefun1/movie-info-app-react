import React from "react";

import "./Header.css";
import "../../../node_modules/@fortawesome/fontawesome-free/css/all.css";
import "../../../node_modules/animate.css/animate.css";

export default function Header() {
  return (
    <div className="header">
      <div className="header__logo">
        <i className="animated infinite pulse fas fa-film">{""}</i>
      </div>
      <div className="header__title">
        <span className="animated fadeInDown delay-2s">MOVIE LIBRARY</span>
      </div>
      <div className="header__authorization">
        {" "}
        <i className="animated infinite pulse fas fa-film">{""}</i>
      </div>
    </div>
  );
}
