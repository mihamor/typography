import React, { Component } from 'react';
import Gallery from 'react-grid-gallery';
import captionStyle from './caption';
import { Parallax, Background } from 'react-parallax';
import parallax_item from './images/parallax-item.png'
import bg_parallax from './images/bg-parallax.jpg';


class Home extends Component {
  constructor(props) {
    super(props);
    this.user = props.user;
    this.state = {
      isLoggedIn: this.user ? true : false,
      images : props.images,
    };
  }

  setCustomOverlay(images){
    const newImages = images.map((image) => {
      image.customOverlay = (
        <div style={captionStyle}>
          <div>{image.caption}</div>
        </div>);
      return image;
    });
    return newImages;
  }
  
  render() {

    const images = this.setCustomOverlay(this.state.images);
    return (
    <div className="home">
      <Parallax
        blur={10}
        bgImage={bg_parallax}
        bgImageAlt="Paralax"
        strength={200}
      >
        <div className="info">
          <section className="info__section">
            <h1>
              <span className="info__highlight">
                Best typography in your university
              </span>
            </h1>
            <p className="info__par">
              <span className="info__highlight">
                Print your diplomas, reports, study attachments fast.
              </span>
            </p>
          </section>
        </div>
        <Background className="parallax__item">
          <img src={parallax_item} alt="parallax bro" />
        </Background>
      </Parallax>
      <div className="expamles">
        <section className="home__section">
          <h1 className="home__head">Expamles of our work</h1>
        </section>
        <section className="home__section">
          <div className="home_gallery clearfix">
            <Gallery images={images}  enableImageSelection={false}/>
          </div>
        </section>
      </div>
    </div>);
  }
} 

export default Home;