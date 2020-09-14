import React, { Component } from 'react';
import MapContainer from './MapContainer';
import ResultDisplayPanel from './ResultDisplayPanel';
import SearchResultHeader from './SearchResultHeader';
import '../styles/SearchResult.css';
import { Row, Col } from 'antd';

class SearchResult extends Component {
    constructor(){
        super();
        this.state={
            selected: [],
            // resultCityList:[]
        }
    }

    fetchAttractions=()=>{
        //TODO
        // set resultCityList
    }

    addOrRemove = (selectedRowKeys,selectedRows) => {
        let { selected: selected } = this.state;
        selected.length=0;
        this.setState({
            selected: selectedRows
        })
        console.log('selectedRows: ', selectedRows);
        console.log('updated selected: ', this.state.selected);
    }

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
            <div className='searchResult-container'>
                <SearchResultHeader />
                <div className='main'>
                    <div className="left-side">
                        <ResultDisplayPanel 
                            resultCityList={resultCityList}
                            onSelectionChange={this.addOrRemove}/>
                    </div>
                    <div className="right-side">
                        <MapContainer 
                            selected={this.state.selected}/>
                    </div>
                </div>
            </div>
        );
    }
}

const resultCityList=[{
    key: '1',
    name: 'LA Staple Center',
    type: 'museum',
    description: 'New York No. 1 Lake Park',
    position:{lat:34.0430219, lng: -118.2694428},
},
{
    key: '2',
    name: 'University of Southern California',
    type: 'University',
    description: 'University',
    position:{lat:34.0236816, lng: -118.3013553},
},
{
    key: '3',
    name: 'Joe Black',
    type: 'restaurant',
    description: 'Sidney No. 1 Lake Park',
    position:{lat:34.0623, lng: -118.2383},
},
{
    key: '4',
    name: 'Universal Park',
    type: 'park',
    description: 'Sidney No. 1 Lake Park',
    position:{lat:34.0623, lng: -118.2383},
},
{
    key: '5',
    name: 'Chinatown LA',
    type: 'park',
    description: 'Sidney No. 1 Lake Park',
    position:{lat:34.0623, lng: -118.2383},
},]
//  const selected=[]
export default SearchResult;
