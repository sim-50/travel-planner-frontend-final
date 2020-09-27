import React, { Component } from 'react';
import { withGoogleMap, GoogleMap,  Marker, DirectionsRenderer, Polyline, InfoWindow } from 'react-google-maps';
import {  GoogleApiWrapper } from 'google-maps-react';


const MapWithMarker = withGoogleMap((props) => (
    
    <GoogleMap
        
        defaultCenter={ { lat: 34.0522342, lng: -118.2436849 } }
        defaultZoom={ 11 }
        center={props.cityCoordinate}

    >
        {props.markers.map( location => (
            
            <Marker
            
                icon={{
                    url: 'data:image/svg+xml;utf-8, <svg t="1600837384302" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1844" width="30" height="30"><path d="M832 172.32C908.48 172.32 977.088 130.688 1024 99.2L1024 694.88C977.088 726.368 908.48 768 832 768 755.52 768 686.912 745.344 640 713.856 593.088 682.368 524.48 659.68 448 659.68 371.52 659.68 302.912 698.624 256 730.08L256 134.4C302.912 102.912 371.52 64 448 64 524.48 64 593.088 86.656 640 118.144 686.912 149.632 755.52 172.32 832 172.32ZM128 0C163.36 0 192 28.64 192 64L192 1024 64 1024 64 64C64 28.64 92.64 0 128 0Z" p-id="1845"></path></svg>'
                }}
                key={location.key}
                name={location.name}
                position={{ lat: location.geometry.location.lat, lng: location.geometry.location.lng }}
                onClick={() => {props.onMarkerClick(location);}}        //Click on marker
            />

        ))}

        {props.activeMarker !== null && (
            
            <InfoWindow 
            position={{ lat: props.activeMarker.geometry.location.lat, lng: props.activeMarker.geometry.location.lng }}
            
            onCloseClick={() => {props.onMarkerClick(props.activeMarker);}}     //Close button
            options={
                {pixelOffset: new window.google.maps.Size(0,-29)}
            }
        >
        <div>
            <h4>{props.activeMarker.name}</h4>
        </div>
    </InfoWindow>
        )}

        {props.responseData.map( route => (
            <React.Fragment>
                <DirectionsRenderer
                    directions={route}
                    options={{
                        polylineOptions: {
                            strokeOpacity: 0,
                            strokeColor: route.actualColor,
                            clickable: false,
                        },
                        preserveViewport: true
                }}
                />
                <Polyline
                    path={route.routes[0].overview_path}
                    options={{
                        strokeColor: route.actualColor,
                    }}
                    onClick={()=>{
                        props.onRouteClick(route);
                    }}
                />
            </React.Fragment>

        )) }
        
    </GoogleMap>
)); 



export class MapContainer extends Component {
    constructor(props){
        super(props);
        this.state={
            activeMarker: null,
            selectedPlaces: this.props.selected,
            responseData:[],
            cityCoordinate: this.props.cityCoordinate,
        }
    }

    onRouteClick = (route) => {
        
        let newResponseData = this.state.responseData;

        newResponseData = newResponseData.map(entry => {
            if(entry === route) {
                entry.actualColor = entry.color === entry.actualColor ? '#FF0000' : entry.color;
            }
            return entry;
        })

        this.setState({
            responseData: newResponseData
        })
        
    }

    
    onMarkerClick = (location) => {

        let newActive = this.state.activeMarker;
        if(newActive === location) {
            newActive = null;
        } else {
            newActive = location;
        }

        this.setState({
            activeMarker: newActive,
        });
    }
    

    componentDidUpdate(prevProps, prevState) {
        const { selectedPlaces } = this.state;
        if(prevProps.selected !== this.props.selected) {
            //console.log("Map", this.props.responseData);

            let newActiveMarker = this.state.activeMarker;
            
            if(!this.props.selected.some(location => location === newActiveMarker)) {
                newActiveMarker = null;
            }

            this.setState( {
                selectedPlaces: this.props.selected,
                cityCoordinate:this.props.cityCoordinate,
                responseData: this.props.responseData,
                activeMarker: newActiveMarker,
                //activeMarkers: newActiveMarkers,
            })
        }
    }

    render(){

        return(
        <div>
            <MapWithMarker
                // Map setting                
                containerElement={<div style={{height: "100vh", width: window.innerWidth-640}} />}
                loadingElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}

                // Markers and routes data
                markers={this.state.selectedPlaces}
                cityCoordinate={this.state.cityCoordinate}
                responseData={this.state.responseData}
                onRouteClick = {this.onRouteClick}

                onMarkerClick={this.onMarkerClick}

                activeMarker={this.state.activeMarker}
                showingInfoWindow={this.state.showingInfoWindow}
                selectedPlaces={this.selectedPlaces}
                
            />
        </div>
        );
    }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAitfwUxAM070XRx72zctpECLYsj7bj0jg'
})(MapContainer);