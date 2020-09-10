import React, { Component } from 'react';
import { Menu } from 'antd';
import { BarsOutlined, UserOutlined } from '@ant-design/icons';
import travel_planner_logo from '../asset/image/travel_planner_logo.svg';

const { SubMenu } = Menu
class NavBarSearch extends Component{
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
            <Menu className="nav-search" onClick={this.handleClick} selectedKeys={[current]} mode="horizontal">
                <SubMenu className="drop-down" icon={<BarsOutlined style={{fontSize: "22px", color: "#353535"}}/>}>
                    <Menu.Item key="savedRoute">Saved Routes</Menu.Item>
                    <Menu.Item key="markedPoints">Marked Points History</Menu.Item>
                    <Menu.Item key="recommendation">Recommendation Routes</Menu.Item>
                </SubMenu>
                <Menu.Item className="app-logo"><a href="/">Logo</a></Menu.Item>
                <SubMenu className="user-icon" icon={<UserOutlined style={{fontSize: "22px",color: "#353535"}}/>}>
                    <Menu.Item key="logOut">Log out</Menu.Item>
                </SubMenu>
            </Menu>
        );
    }
}

export default NavBarSearch;