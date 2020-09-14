import React, { Component } from 'react';
import SearchResult from './SearchResult';
import {Row, Col, Input, Layout} from 'antd';
import PropTypes from 'prop-types';
import {
  Router,
  Route,
  Link,
  navigate
} from "@reach/router";

const {Search} = Input;

class Main extends Component {
  render() {
    const {cityImg, citySearchResult} = this.props;
    return(
      <div>
          <Router>
            <SearchResult 
            citySearchResult={citySearchResult} 
            cityImg={cityImg}
            filterByName={this.props.filterByName} 
            filterByType={this.props.filterByType}
            path = "/searchResult/:city"/>
          </Router> 
          
          <Row className = "home-body">
            <Col span={24} className = "home-bg-col">
              <Row className = "home-detail">
                <Col span={8}></Col>
                <Col span={8} className = "home-detail-child">
                    <p className = "bg-title">Hi, Let plan your next road trip efficiently! </p>
                  
                    <Search
                      className = "home-search_bar"
                      placeholder="Where do you want to go?"
                      onSearch = {(city) => {
                        navigate(`/searchResult/`+city)}}
                    /> 
                </Col>
                <Col span={8}></Col>
              </Row>
            </Col>
          </Row>
        </div>
      
    );
  }
}

Main.propTypes = {
  citySearchResult: PropTypes.array.isRequired,
  cityImg: PropTypes.string.isRequired,
}

export default Main;