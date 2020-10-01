import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Menu, Row, Col} from 'antd';
import { BarsOutlined, UserOutlined } from '@ant-design/icons';
import backSearch from '../asset/image/seach.svg';
import Travel_planner_logo from '../asset/image/travel_planner_logo.svg';
import '../styles/SearchResultHeader.css';
import history from "../history";

const { SubMenu } = Menu;
class SearchResultHeader extends Component{
    state = {
        current: 'searchResult',
    };
    
    handleMenuClick = e => {
        console.log(`/${e.key}`);
        this.setState({ current: e.key });
        if (e.key === "logOut") {
          history.push(`/login`);
        } else {
          history.push(`/${e.key}`);
        }
    };

    render(){
        const { current } = this.state;
        return(
            <div>
              <Row className = "header-row">
                <Col span= {8} className = "header-col">
                  <Menu className="nav-search" onClick={this.handleMenuClick} selectedKeys={[current]} mode="horizontal">
                      <SubMenu className="drop-down humIcon" icon={<BarsOutlined style={{fontSize: "26px", color: "#353535"}}/>}>
                          <Menu.Item key="savedRoute">Saved Routes</Menu.Item>
                          {/* <Menu.Item key="markedPoints">Marked Points History</Menu.Item>
                          <Menu.Item key="recommendation">Recommendation Routes</Menu.Item> */}
                      </SubMenu>
                    </Menu>
                    <Link to = "/">
                    <div className = "backSearch">
                      <span><img src= {backSearch} alt="back" /></span>
                      <p>Back to search</p>
                    </div>
                    </Link>
                </Col>
                <Col span= {8}>
                  <a href="/"><img src= {Travel_planner_logo} alt="logo" className = "logo2"/></a>
                </Col>
                <Col span= {8}>
                <Menu className="nav-search" onClick={this.handleMenuClick} selectedKeys={[current]} mode="horizontal">
                  <SubMenu 
                    className="user-icon" 
                    icon={<UserOutlined 
                    style={{fontSize: "26px",color: "#353535"}}/>}>
                      <Menu.Item key="logOut">Log out</Menu.Item>
                  </SubMenu>
                  </Menu>
                </Col>
              </Row>
          </div>
        );
    }
}

export default SearchResultHeader;