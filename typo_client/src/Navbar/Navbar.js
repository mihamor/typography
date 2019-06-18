import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import 'react-sticky-header/styles.css';
import Sticky from 'react-stickynode';
import { connect } from 'react-redux';


class Navbar extends Component {

  constructor(props) {
    super(props);
    this.state = { location : "None" };
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if( nextProps.location && 
      nextProps.location!==prevState.location){
      return { location: nextProps.location};
   }
   else return null;
  }
 
 componentDidUpdate(prevProps, prevState) {
   if(prevProps.location !== this.props.location){
     //Perform some operation here
     this.setState({location: this.props.location});
   }
  }

  render() {
    // console.log(this.state.location);
    return (
    <div className="header">
      <PhotoSlider/>
      <Sticky innerZ={100}>
      <ul className="navbar">
        <li className="navbar__button">
          <Link className="navbar__link" to="/">Home</Link>
        </li>
        <li className="navbar__button">
          <Link className="navbar__link" to="/offers">Offers</Link>
        </li>
        <li className="navbar__button">
          <Link className="navbar__link" to="/contact">Contact</Link>
        </li>
        <li className="navbar__button">
          <Link className="navbar__link" to="/about">About</Link>
        </li>
        <li className="navbar__button-right">
          <span className="navbar__logo">KPI Typography</span>
        </li>
      </ul>
      {/* <BreadcrumbsItem to='/'>Home</BreadcrumbsItem> */}
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