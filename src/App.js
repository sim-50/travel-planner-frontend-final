import React, { Component } from 'react';
import Main from './components/Main';
import Travel_planner_logo from './asset/image/travel_planner_logo.svg';
import User_icon from './asset/image/user.svg';
import {Layout, Row, Col} from 'antd';
import './App.css';

const { Header, Content } = Layout;

class App extends Component {
  state = {
    cityName: "Los Angeles",
    cityImg: "https://media.nomadicmatt.com/laguide1.jpg",
    citySearchResult: [
      {
          key: '1',
          name: 'LA Staple Center',
          type: 'museum',
          description: 'New York No. 1 Lake Park',
          display: true,
          position:{lat:34.0430219, lng: -118.2694428},
      },
      {
          key: '2',
          name: 'Jim Green',
          type: 'bar',
          description: 'London No. 1 Lake Park',
          display: true,
          position:{lat: 51.5287714,lng: -0.2420238},
      },
      {
          key: '3',
          name: 'Joe Black',
          type: 'restaurant',
          description: 'Sidney No. 1 Lake Park',
          display: true,
          position:{lat: -33.8779024,lng: 151.2086193},
      },
      {
          key: '4',
          name: 'Universal Park',
          type: 'park',
          description: 'Sidney No. 1 Lake Park',
          display: true,
          position:{lat: -33.8473552,lng: 150.6511089},
      },
      {
        key: '5',
        name: 'University of Southern California',
        type: 'university',
        description: 'University',
        display: true,
        position:{lat:34.0236816, lng: -118.3013553},
      },
      {
        key: '6',
        name: 'Chinatown LA',
        type: 'park',
        description: 'Chinatown',
        display: true,
        position:{lat:34.0623, lng: -118.2383},
      },
    ],
    filterTypeName: '',
  }

  filterByName = (value) => {
    console.log(value);
    this.setState({
      citySearchResult: this.state.citySearchResult.map(res => {
        if (res.name.toLowerCase().indexOf(value.toLowerCase()) !== -1 || res.description.toLowerCase().indexOf(value.toLowerCase()) !== -1) {
          res.display = true;
        } else {
          res.display = false;
        }
        return res;
      })
    });
  }

  filterByType = (type) => {
    this.setState({
      filterTypeName: type
    });
  }

  render() {  
    const {cityImg, citySearchResult} = this.state;  
    return (
      <Layout>
        <Header className = "home-header">
          <Row className = "row-class">
            <Col span= {12}><img src= {Travel_planner_logo} className= "app-logo" alt="logo"/></Col>
            <Col span= {12} className = "id-class">
              <span>Sign in</span>
              <img src= {User_icon} className= "user-icon" alt="user"/>
            </Col>
          </Row>
        </Header>
        <Content>
          <Main 
          citySearchResult={citySearchResult.filter(res => res.display === true && (res.type === this.state.filterTypeName || !this.state.filterTypeName))} 
          cityImg={cityImg} 
          filterByName={this.filterByName} 
          filterByType={this.filterByType} 
          />
        </Content>
      </Layout>
    );
  }
}

export default App;