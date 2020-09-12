import React from 'react';
import Main from './components/SearchResult';
import Travel_planner_logo from './asset/image/travel_planner_logo.svg';
import User_icon from './asset/image/user.svg';
import {Layout, Row, Col} from 'antd';


const { Header, Content } = Layout;

function App() {
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
        <Main />
      </Content>
    </Layout>
  );
}

export default App;