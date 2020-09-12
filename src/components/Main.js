import React from 'react';
import SearchResult from './SearchResult';
import {Row, Col, Input, Layout} from 'antd';
import {
  Router,
  Route,
  Link,
  navigate
} from "@reach/router";

const {Search} = Input;

const Main = () => {  
  return(
    <div>
        <Router>
          <SearchResult path = "/searchResult"/>
        </Router> 
        
        <Row className = "home-body">
          <Col span={24} className = "home-bg-col">
            <Row className = "home-detail">
              <Col span={8}></Col>
              <Col span={8} className = "home-detail-child">
                  <p className = "bg-title">Hi, Let plan your next road trip efficiently! </p >
                
                  <Search
                    className = "home-search_bar"
                    placeholder="Where do you want to go?"
                    onSearch = {() => navigate(`/searchResult`)}
                  /> 
              </Col>
              <Col span={8}></Col>
            </Row>
          </Col>
        </Row>
      </div>
    
  )
}

export default Main;