import React, { Component } from 'react';
import { Menu, Row, Col} from 'antd';
import { BarsOutlined, UserOutlined } from '@ant-design/icons';
import Travel_planner_logo from '../asset/image/travel_planner_logo.svg';
import '../styles/SearchResultHeader.css';

const { SubMenu } = Menu;
class SearchResultHeader extends Component{
    state = {
        current: 'searchPage',
    };
    //This click function still need to learn in the future
    handleClick = e => {
        console.log('click ', e);
        this.setState({ current: e.key });
    };

    render(){
        const { current } = this.state;
        return(
            <div>
              <Row>
                <Col span= {8}>
                  <Menu className="nav-search" onClick={this.handleClick} selectedKeys={[current]} mode="horizontal">
                      <SubMenu className="drop-down" icon={<BarsOutlined style={{fontSize: "26px", color: "#353535"}}/>}>
                          <Menu.Item key="savedRoute">Saved Routes</Menu.Item>
                          <Menu.Item key="markedPoints">Marked Points History</Menu.Item>
                          <Menu.Item key="recommendation">Recommendation Routes</Menu.Item>
                      </SubMenu>
                    </Menu>
                </Col>
                <Col span= {8}>
                  <a href="/"><img src= {Travel_planner_logo} alt="logo" className = "logo2"/></a>
                </Col>
                <Col span= {8}>
                <Menu className="nav-search" onClick={this.handleClick} selectedKeys={[current]} mode="horizontal">
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