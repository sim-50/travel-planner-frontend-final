import React, { Component } from 'react';
import { withGoogleMap, GoogleMap,  Marker, withScriptjs } from 'react-google-maps';
import {  GoogleApiWrapper } from 'google-maps-react';

// const MyMapComponent = compose(
//     withProps({
//     containerElement :<div style={{height: window.innerHeight, width: window.innerWidth-380 }} />,
//     loadingElement : <div style={{ height: `100%` }} />,
//     mapElement:<div style={{ height: `100%` }} />
//     }),
//     withScriptjs,
//     withGoogleMap
//   )((props) =>
//     <GoogleMap
//     defaultCenter={ { lat: 34.0522342, lng: -118.2436849 } }
//     defaultZoom={ 14 }
//     >
//     {this.state.selectedPlaces.map((location,i)=>{
//         return(
//             <Marker 
//                 key={location.key}
//                 name={location.name}
//                 position={{ lat: location.position.lat, lng: location.position.lng }}
//                 onClick={this.onMarkerClick}
//             />
//         )
//     })}
    
//     </GoogleMap>
//   ))
export class MapWithReact extends Component {
    constructor(props){
        super(props);
        this.state={
            showingInfoWindow: false, //hides the infoWindow initially
            activeMarkers: {},
            selectedPlaces: this.props.selected,
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
                defaultCenter={ { lat: 34.0522342, lng: -118.2436849 } }
                defaultZoom={ 14 }
            >
                <Marker 
                    key={location.key}
                    name={location.name}
                    position={{ lat: location.position.lat, lng: location.position.lng }}
                    onClick={this.onMarkerClick}
                />
            </GoogleMap>
            )   
        ); 
        return(
        <div>
            <MapWithMarker
                containerElement={<div style={{height: window.innerHeight, width: window.innerWidth-380 }} />}
                loadingElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                
            />
        </div>
        );
    }
};
export default GoogleApiWrapper({
    apiKey: 'AIzaSyAitfwUxAM070XRx72zctpECLYsj7bj0jg'
  })(MapWithReact);