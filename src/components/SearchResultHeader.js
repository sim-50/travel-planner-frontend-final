import React, { Component } from 'react';
import { Menu, Row, Col, Divider, Button} from 'antd';
import { BarsOutlined, UserOutlined } from '@ant-design/icons';
import Travel_planner_logo from '../asset/image/travel_planner_logo.svg';
import '../styles/SearchResultHeader.css';
import history from "../history";
import User_icon from "../asset/image/user.svg";

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


    handleLogButtonClick = e => {
      this.setState({ current: e.currentTarget.id });
      // handle login and logout differently
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      if (userInfo) {
        localStorage.clear();
      }
      history.push(`/login`);
  };
    render(){
        const { current } = this.state;
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        return(
            <div>
              <Row className="row-class">
                <Col span= {8}>
                  <Menu className="nav-search" onClick={this.handleMenuClick} selectedKeys={[current]} mode="horizontal">
                      <SubMenu className="drop-down" icon={<BarsOutlined style={{fontSize: "26px", color: "#353535"}}/>}>
                          <Menu.Item key="savedRoute">Saved Routes</Menu.Item>
                          {/* <Menu.Item key="markedPoints">Marked Points History</Menu.Item>
                          <Menu.Item key="recommendation">Recommendation Routes</Menu.Item> */}
                      </SubMenu>
                    </Menu>
                </Col>
                <Col span= {8}>
                  <a href="/"><img src= {Travel_planner_logo} alt="logo" className = "logo2"/></a>
                </Col>
                <Col span= {8}  className="id-class">
                  <div>{userInfo == null ? '' : userInfo.userName}</div>
                  <Divider type="vertical"/>
                  <Button type="link" onClick={this.handleLogButtonClick} className="logButton">
                    {userInfo == null ? 'Sign In' : 'Sign Out'}</Button>
                  <img src={User_icon} className="user-icon" alt="user" />
                </Col>
              </Row>
          </div>
        );
    }
}

export default SearchResultHeader;