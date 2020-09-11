import React, { Component } from 'react';
import MapContainer from './MapContainer';

class Main extends Component {

    render() {
        return (
            <div className='main'>
                <div className="left-side">
                    Search Panel
                </div>
                <div className="right-side">
                    <MapContainer />
                </div>
            </div>
        );
    }
}
export default Main;
