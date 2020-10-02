import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Menu, Row, Col, Divider, Button} from 'antd';
import { BarsOutlined, UserOutlined } from '@ant-design/icons';
import backSearch from '../asset/image/seach.svg';
import Travel_planner_logo from '../asset/image/travel_planner_logo.svg';
import '../styles/SearchResultHeader.css';
import history from "../history";
import User_icon from "../asset/image/user.svg";

const { SubMenu } = Menu;
class SearchResultHeader extends Component{
    state = {
        current: 'searchResult',
        userName: null,
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


    handleLogButtonClick = e => {
      this.setState({ current: e.currentTarget.id });
      // handle login and logout differently
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      if (userInfo) {
        localStorage.clear();
      }
      history.push(`/login`);
  };

  componentDidMount() {
    this.setState({
      userName: JSON.parse(localStorage.getItem("userName")).userName
    })
  }

    render(){
        const { current } = this.state;
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
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
                <Col span= {8}  className="id-class">
                  <div>{this.state.userName === null ? '' : this.state.userName}</div>
                  <Divider type="vertical"/>
                  <Button type="link" onClick={this.handleLogButtonClick} className="logButton">
                    {this.state.userName === null ? 'Sign In' : 'Sign Out'}</Button>
                  <img src={User_icon} className="user-icon" alt="user" />
                </Col>
              </Row>
          </div>
        );
    }
}

export default SearchResultHeader;