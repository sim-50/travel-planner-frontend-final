import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {
    constructor(props){
        super(props);
        this.state={
            showingInfoWindow: false, //hides the infoWindow initially
            activeMarkers:{},
            selectedPlaces:this.props.selected,
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { selectedPlaces } = this.state
        console.log('old selectedPlaces: ', selectedPlaces);
        if(prevProps.selected !== this.props.selected) {
            this.setState( {
                selectedPlaces: this.props.selected
            })
            console.log('updated selectedPlaces: ', selectedPlaces);
        }
      }
    
    onMarkerClick = (props, marker, e) =>{
        this.setState({
            selectedPlace: props,
            activeMarkers: marker,
            showingInfoWindow: true
        })
    }

    onClose = props =>{
        if(this.state.showingInfoWindow){
            this.setState({
                showingInfoWindow: false,
                activeMarkers:null
            });
        }
    }
    render() {
        return (
            <Map google={this.props.google}
            zoom={14}
            style={mapStyles}
            initialCenter={{
                lat: 34.0522342,
                lng: -118.2436849
            }}>
                {this.state.selectedPlaces.map((location,i) => {
                    console.log('show marker: ', location);
                    console.log('name: ', location.name);
                    return (
                        <Marker
                            name={location.name}
                            position={{ lat: location.position.lat, lng: location.position.lng }}
                            onClick={this.onMarkerClick}
                        />
                    );
                })}

                <InfoWindow 
                    marker={this.state.activeMarkers}
                    visible={this.state.showingInfoWindow}
                    onClose={this.onInfoWindowClose}>
                    <div>
                        <h4>{this.state.selectedPlaces.name}</h4>
                    </div>
                </InfoWindow>   
            </Map>
        );
    }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAitfwUxAM070XRx72zctpECLYsj7bj0jg'
})(MapContainer);