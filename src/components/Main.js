import React, { Component } from 'react';
import MapContainer from './MapContainer';
import SearchPanel from './SearchPanel';
import '../styles/Main.css';
import { Row, Col } from 'antd';

class Main extends Component {
    render() {
        return (
            //TODO: replace the grid layout with below code
            // <Row>
            //     <Col span={18} push={6}>
            //         <MapContainer />
            //     </Col>
            //     <Col span={6} pull={18}>
            //         <SearchPanel />
            //     </Col>
            // </Row>

            <div className='main'>
                <div className="left-side">
                    <SearchPanel />
                </div>
                <div className="right-side">
                    <MapContainer />
                </div>
            </div>
        );
    }
}
export default Main;
