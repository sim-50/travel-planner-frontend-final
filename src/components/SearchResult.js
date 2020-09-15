import React, { Component } from 'react';
import axios from 'axios';
import MapContainer from './MapContainer';
import ResultDisplayPanel from './ResultDisplayPanel';
import SearchResultHeader from './SearchResultHeader';
import '../styles/SearchResult.css';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';

class SearchResult extends Component {
    constructor(){
        super();
        this.state={
            selected: [],
        }
    }

    updateSelected = (selectedRowKeys,selectedRows) => {
        let { selected } = this.state;
        selected.length=0;
        this.setState({
            selected: selectedRows
        })
    }

    render() {
        const { selected } = this.state;
        const {cityImg, citySearchResult} = this.props;

        const url = `http://localhost:8080/travelplanner/search?city=Austin`;
        
        axios.get(url)
        .then(response => {
            console.log(response.data)
        })
        .catch(error => {
            console.log('err in fetch cityInfo -> ', error);
        })
        
        return (
            <div className='searchResult-container'>
                <SearchResultHeader />
                <div className='main'>
                    <div className="left-side">
                        <ResultDisplayPanel 
                        onSelectionChange={this.updateSelected}
                        citySearchResult={citySearchResult} 
                        cityImg={cityImg} 
                        filterByName={this.props.filterByName} 
                        filterByType={this.props.filterByType}
                        selectedList={selected}
                        />
                    </div>
                    <div className="right-side">
                        <MapContainer 
                        selected={selected} 
                        />
                    </div>
                </div>
            </div>
            //TODO: replace the grid layout with below code
            // <Row>
            //     <Col span={18} push={6}>
            //         <MapContainer />
            //     </Col>
            //     <Col span={6} pull={18}>
            //         <SearchPanel />
            //     </Col>
            // </Row>
        );
    }
}

SearchResult.propTypes = {
    citySearchResult: PropTypes.array.isRequired,
    cityImg: PropTypes.string.isRequired,
}

export default SearchResult;
