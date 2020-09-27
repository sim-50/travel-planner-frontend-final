import React, {Component} from 'react';
import { Menu, Col, Row, SubMenu } from 'antd';
import Travel_planner_logo from '../asset/image/travel_planner_logo.svg';
import User_logo from '../asset/image/user.svg';
import "../styles/Registration.css";

// git resubmit

class RegistrationHeader extends Component{

    render(){
        return (
            <div className="deletePadding">
              <Row>
                  <Col span={3}> <a href="/"><img src= {Travel_planner_logo} alt="logo" className = "logo2"/></a></Col>
                  <Col span={19}></Col>
                  <Col span={1}>Sign In</Col>
                  <Col span={1}><a href="/"><img src= {User_logo} alt="logo" className = "logoRight"/></a></Col>
              </Row>
          </div>
        )
    }
}

export default RegistrationHeader;