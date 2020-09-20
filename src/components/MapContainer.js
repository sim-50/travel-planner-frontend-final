import React, { Component } from 'react';
import { withGoogleMap, GoogleMap,  Marker, withScriptjs, DirectionsRenderer} from 'react-google-maps';
import {  GoogleApiWrapper } from 'google-maps-react';

const MapWithMarker = withGoogleMap((props) => (
    
    <GoogleMap
        
        defaultCenter={ { lat: 34.0522342, lng: -118.2436849 } }
        defaultZoom={ 12 }
        center={props.cityCoordinate}

    >
        {props.markers.map(location=>(
            <Marker
                key={location.key}
                name={location.name}
                position={{ lat: location.geometry.location.lat, lng: location.geometry.location.lng }}
                onClick={props.onMarkerClick}
            />
        )) }



        <DirectionsRenderer
            directions={props.responseData}
            
        />
    </GoogleMap>
)); 

export class MapContainer extends Component {
    constructor(props){
        super(props);
        this.state={
            showingInfoWindow: false, //hides the infoWindow initially
            activeMarkers: {},
            selectedPlaces: this.props.selected,
            responseData:null,
            cityCoordinate: this.props.cityCoordinate,
        }
    }
    
    onMarkerClick = (props, marker, e) =>{
        //console.log(props)
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
            //console.log("Map", this.props.responseData);
            this.setState( {
                selectedPlaces: this.props.selected,
                cityCoordinate:this.props.cityCoordinate,
                responseData: this.props.responseData,
            })
        }
    }

    render(){
        //this.props.cityCoordinate;
        //console.log(this.props.cityCoordinate);
        
        return(
        <div>
            <MapWithMarker
                //containerElement={<div style={{height: "100vh", width: "64vw"}} />}
                
                 containerElement={<div style={{height: "100vh", width: window.innerWidth-640}} />}
                // containerElement={<div style={{height: window.innerHeight-100, width: window.innerWidth-640 }} />}
                
                loadingElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                markers={this.state.selectedPlaces}
                //markers={this.props.selected}
                cityCoordinate={this.state.cityCoordinate}
                // onMarkerClick={this.onMarkerClick}
                responseData={this.state.responseData}
                
            />
        </div>
        );
    }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAitfwUxAM070XRx72zctpECLYsj7bj0jg'
})(MapContainer);