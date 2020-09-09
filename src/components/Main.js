import React from 'react';
// import HomeBg from '../assets/images/home_pic.jpeg';
import {Row, Col, Input} from 'antd';


const  {Search} = Input;

const Main = () => {
  // function write here...


return(
    <Row className = "home-body">
      <Col span={24} className = "home-bg-col">
        <Row className = "home-detail">
          <Col span={8}></Col>
          <Col span={8} className = "home-detail-child">
              <p className = "bg-title">Hi, Let plan your next road trip efficiently! </p>
            <Search
              className = "home-search_bar"
              placeholder="Where do you want to go?"
              onSearch={value => console.log(value)}
              // style={{ width: 200 }}
            />
          </Col>
          <Col span={8}></Col>
        </Row>
    
        {/* <img src= {HomeBg} alt="welcome image" className = "home-bg"/> */}
      </Col>
    </Row>
 
  )
}


export default Main;