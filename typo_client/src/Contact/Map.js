import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import config from '../config';
 
class MapContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    };
    this.position = {lat: 50.4488284, lng: 30.455816};

    this.onMapClicked = this.onMapClicked.bind(this);
    this.onMarkerClick = this.onMarkerClick.bind(this);
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
 
  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  render() {
    return (
      <React.Fragment>
        <Map google={this.props.google} onClick={this.onMapClicked} initialCenter={this.position} zoom={14}>
          <Marker
              onClick={this.onMarkerClick}
              name={'KPI Typography'}
              position={this.position} />
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}>
              <div>
                <h1>{this.state.selectedPlace.name}</h1>
              </div>
          </InfoWindow>
        </Map>
      </React.Fragment>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: (config.mapApi)
})(MapContainer);