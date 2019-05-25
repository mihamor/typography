import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import 'react-sticky-header/styles.css';
import Sticky from 'react-stickynode';


class Navbar extends Component {

  constructor(props) {
    super(props);
    this.state = { user: props.user, isLoggedIn: props.user ? true : false };
  }

  render() {
    return (
    <div className="header">
      <PhotoSlider/>
      <Sticky innerZ={100}>
      <ul class="navbar">
        <li className="navbar__button">
          <a className="navbar__link navbar__link_active" href="#home">Home</a>
        </li>
        <li className="navbar__button">
          <a className="navbar__link" href="#news">News</a>
        </li>
        <li className="navbar__button">
          <a className="navbar__link" href="#contact">Contact</a>
        </li>
        <li className="navbar__button">
          <a className="navbar__link" href="#about">About</a>
        </li>
        <li className="navbar__button-right">
          <span className="navbar__logo">KPI Typography</span>
        </li>
      </ul>
      </Sticky>
    </div>
    );

  }
}

const PhotoSlider = () => {
  const settings = {
    dots: false,
    arrows: false,
    autoplay: true,
    adaptiveHeight: false,
    infinite: true,
    useCSS: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <div className="slider">
      <Slider {...settings}>
        <div className="slider__element">
          <img className="slider__img" src={process.env.PUBLIC_URL + "typo.jpg"} alt="Printing"></img>
        </div>
        <div className="slider__element">
          <img className="slider__img" src={process.env.PUBLIC_URL + "books.jpg"} alt="Books"></img>
        </div>
        <div className="slider__element">
          <img className="slider__img" src={process.env.PUBLIC_URL + "pencils.jpg"} alt="Pencils"></img>
        </div>
      </Slider>
    </div>
  );
};

export default Navbar;