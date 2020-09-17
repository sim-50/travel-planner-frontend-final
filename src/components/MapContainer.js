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
            activeMarkers: {},
            selectedPlaces: this.props.selected,
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

    componentDidUpdate(prevProps, prevState) {
        const { selectedPlaces } = this.state;
        if(prevProps.selected !== this.props.selected) {
            this.setState( {
                selectedPlaces: this.props.selected
            })
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
                    return (
                        <Marker
                            key={location.key}
                            name={location.name}
                            position={{ lat: location.geometry.location.lat, lng: location.geometry.location.lng }}
                            onClick={this.onMarkerClick}
                        />
                    );
                })}
                {/* <Marker 
                    title={"The marker's title will appear as a tool tip."}
                    name={'University of Southern California'}
                    position={{lat:34.0224, lng:-118.2851 }}
                />
                <Marker
                    name={'Chinatown LA'}
                    position={{lat:34.0623, lng: -118.2383}}
                /> */}
                {/* here is a marker with click listener */}
                {/* <Marker onClick={this.onMarkerClick} name={'Current location'} /> */}
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