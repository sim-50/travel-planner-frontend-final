import React, { Component } from 'react';

import { UserOutlined, EyeInvisibleOutlined, EyeTwoTone, InfoCircleOutlined  } from '@ant-design/icons';
import "../styles/Registration.css";
import { Form, Button, Checkbox, Input, Space } from 'antd';

class Registration extends Component{

    
    
    state = {
        username: "", 
        password: "",
        email: "",
        enable: true,
    }

    render(){
        return (
            <div>
                <header className="header"> User Registration</header>
                <br />

                
                <Space className ="space" direction="vertical">
                    <Input size="default" 
                            placeholder="input username" 
                            prefix={<UserOutlined />} 
                            suffix = {<InfoCircleOutlined className = "suffix"/>}/>

                    <Input.Password
                            placeholder="input password"
                            
                        />

                    <Input placeholder="input email" />

                    

                </Space>
            </div>
        );
    }
}

export default Registration;