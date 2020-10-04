import React, { Component } from 'react';
import { withGoogleMap, GoogleMap,  Marker, DirectionsRenderer, Polyline, InfoWindow } from 'react-google-maps';
import {  GoogleApiWrapper } from 'google-maps-react';


const MapWithMarker = withGoogleMap((props) => (
    
    <GoogleMap
        
        defaultCenter={ { lat: 34.0522342, lng: -118.2436849 } }
        defaultZoom={ 12 }
        center={props.cityCoordinate}
        zoom={props.zoom}

    >
        {props.markers.map( location => (
            
            <Marker
                icon={{
                    path: 'M864 113.92C614.72-28.8 480 256 230.08 113.92l128 475.84c249.6 142.72 384-142.72 634.56 0zM123.2 38.72A50.24 50.24 0 0 0 49.6 96l240.32 896 96-25.92-240.32-896a50.24 50.24 0 0 0-22.4-31.36z',
                    fillColor: '#e24f3d',
                    fillOpacity: 1.0,
                    strokeWeight: 0,
                    scale: 0.028,
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
            <React.Fragment key={route.key}>
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
            zoom: this.props.zoom
        }
    }

    onRouteClick = (route) => {
        
        let newResponseData = this.state.responseData;
        let highlight = this.state.highlight;

        // newResponseData = newResponseData.map(entry => {
        //     if(entry === route) {
        //         entry.actualColor = entry.color === entry.actualColor ? '#FF0000' : entry.color;
        //     }
        //     return entry;
        // })

        if(highlight === null) {
            highlight = route;
            newResponseData = newResponseData.map(entry => {
                if(entry !== route) {
                    entry.actualColor = '#b2b2b2';
                }
                return entry;
            })
        }else if(highlight !== null && route === highlight) {
            highlight = null;
            newResponseData = newResponseData.map(entry => {
                
                entry.actualColor = entry.color;
                
                return entry;
            })
        }else if(highlight !== null && route !== highlight) {
            highlight = route;
            newResponseData = newResponseData.map(entry => {
                if(entry === route) {
                    entry.actualColor = entry.color;
                } else {
                    entry.actualColor = '#b2b2b2';
                }
                return entry;
            })
        }

        this.setState({
            highlight: highlight,
            responseData: newResponseData,
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

    // onClose = (location) => {

    //     let newActiveMarkers = this.state.activeMarkers;

    //     newActiveMarkers = newActiveMarkers.filter(entry => {
    //         return entry !== location;
    //     });

    //     this.setState({
    //         activeMarkers: newActiveMarkers,
    //     });

    // }
    

    // onClose = props =>{
    //     if(this.state.showingInfoWindow){
    //         this.setState({
    //             showingInfoWindow: false,
    //             activeMarkers:null
    //         });
    //     }
    // }

    componentDidUpdate(prevProps, prevState) {
        // const { selectedPlaces } = this.state;
        if(prevProps.selected !== this.props.selected) {
            //console.log("Map", this.props.responseData);

            let newActiveMarker = this.state.activeMarker;
            
            if(!this.props.selected.some(location => location === newActiveMarker)) {
                newActiveMarker = null;
            }

            this.setState( {
                selectedPlaces: this.props.selected,
                cityCoordinate:this.props.cityCoordinate,
                zoom: this.props.zoom,
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
<<<<<<< HEAD
                // Map setting
                containerElement={<div style={{height: "100vh", width: "100%"}} />}
=======
                // Map setting                
                containerElement={<div style={{height: "115vh", width: "100%"}} />}
>>>>>>> upstream/dev
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
                zoom={this.state.zoom}
                
            />
        </div>
        );
    }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAitfwUxAM070XRx72zctpECLYsj7bj0jg'
})(MapContainer);