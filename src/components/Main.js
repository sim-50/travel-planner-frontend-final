import React, { Component } from 'react';
import {Row, Col, Input} from 'antd';
import history from '../history';

const {Search} = Input;

class Main extends Component {
  render() {
    return(
      <div>
          <Row className = "home-body">
            <Col span={24} className = "home-bg-col">
              <Row className = "home-detail">
                <Col span={8}></Col>
                <Col span={8} className = "home-detail-child">
                    <p className = "bg-title">Hi! Let's plan your next road trip efficiently! </p>
                    <Search
                      className = "home-search_bar"
                      placeholder="Where do you want to go?"
                      onSearch = { (city) => {
                        history.push(`/searchResult/${city}`);
                      }}
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

export default Main;