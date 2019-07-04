import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function PhotoSlider(){
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
          <img className="slider__img" src={process.env.PUBLIC_URL + "/typo.jpg"} alt="Printing"></img>
        </div>
        <div className="slider__element">
          <img className="slider__img" src={process.env.PUBLIC_URL + "/books.jpg"} alt="Books"></img>
        </div>
        <div className="slider__element">
          <img className="slider__img" src={process.env.PUBLIC_URL + "/pencils.jpg"} alt="Pencils"></img>
        </div>
      </Slider>
    </div>
  );
};

export default PhotoSlider;