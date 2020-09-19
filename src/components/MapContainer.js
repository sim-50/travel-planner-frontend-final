import React, { Component } from 'react';
import { withGoogleMap, GoogleMap,  Marker, withScriptjs, DirectionsRenderer} from 'react-google-maps';
import {  GoogleApiWrapper } from 'google-maps-react';

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
            responseData:this.props.responseData,
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

    render(){
        
        const MapWithMarker = withGoogleMap((props) => (
            <GoogleMap
                // defaultCenter={ { lat: 34.0522342, lng: -118.2436849 } }
                defaultCenter={ { lat: 34.0522342, lng: -118.2436849 } }
                defaultZoom={ 12 }
            >
                {this.state.selectedPlaces.map((location) => {
                    return (
                        <Marker
                            key={location.key}
                            name={location.name}
                            position={{ lat: location.geometry.location.lat, lng: location.geometry.location.lng }}
                            //onClick={this.onMarkerClick}
                        />
                    );
                })}

                <DirectionsRenderer
                    directions={this.props.responseData}
                />
            </GoogleMap>
        )); 
        return(
        <div>
            <MapWithMarker
                //containerElement={<div style={{height: window.innerHeight, width: window.innerWidth-380 }} />}
                containerElement={<div style={{height: window.innerHeight, width: window.innerWidth-380 }} />}
                loadingElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        </div>
        );
    }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAitfwUxAM070XRx72zctpECLYsj7bj0jg'
})(MapContainer);