import React, { Component } from 'react';
import axios from 'axios';
import MapContainer from './MapContainer';
import ResultDisplayPanel from './ResultDisplayPanel';
import SearchResultHeader from './SearchResultHeader';
import '../styles/SearchResult.css';
import { Row, Col } from 'antd';

class SearchResult extends Component {
    render() {
        const url = `http://localhost:8080/travelplanner/search?city=Austin`;
        
        axios.get(url)
        .then(response => {
            console.log(response.data)
        })
        .catch(error => {
            console.log('err in fetch cityInfo -> ', error);
        })
        

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
            <div className='searchResult-container'>
                <SearchResultHeader />
                <div className='main'>
                    <div className="left-side">
                        <ResultDisplayPanel />
                    </div>
                    <div className="right-side">
                        <MapContainer />
                    </div>
                </div>
            </div>
        );
    }
}
export default SearchResult;
