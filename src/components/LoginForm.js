import React,{Component}from 'react';
import { Layout, Row, Col} from 'antd';
import {Redirect} from 'react-router-dom';
import {Link} from 'react-router-dom';
import axios from 'axios';
import '../styles/loginStyle.css';
import User_icon from "../asset/image/user.svg";
import Travel_planner_logo from "../asset/image/travel_planner_logo.svg";
import Modal from 'antd/lib/modal/Modal';
import { Travel_Plan_BASE_URL } from '../constant';

const { Header} = Layout;

class LoginForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      login: false
    }
  }
  
  render(){
    // console.log(this.state.login)
      return(
        <Layout className = 'loginWrapper'>
           <Header className="home-header">
              <Row className="row-class main-header">
                <Col span={12}>
                <Link to = "/">
                  <img
                    src={Travel_planner_logo}
                    className="app-logo"
                    alt="logo"
                  />
                </Link>
                </Col>
               
               
                <Col span={12} className="id-class"> 
                  {
                    this.state.login ? <span>Sign out</span> : <span>Sign in</span>
                  }
                  <img src={User_icon} className="user-icon" alt="user" />
                </Col>
              </Row>
          </Header>
          <Layout className = "loginarea">
            <div className ='loginBox'>
                <h3>Log in.</h3>
                <form className = 'input'>
                    <input type="text" placeholder= "Username" required="true"  id = 'input1' ref = {(input) => {this.username = input}}/>
                    <input type="password" placeholder= "Password"  id = 'input2' ref = {(input) => {this.password = input}}/>
                </form>
  
              <div className = "button">
                <button onClick = {() => this.login(this.username, this.password)}>Log in</button>
              </div>

        
                <p className= 'signupLink'>Don't have an account? 
                <Link to = "/Registration">
                  <span>Sign up</span>
                </Link>
                </p>
            </div>
          </Layout>
        </Layout>
      )
    }
 
  

  login(username,password){
      username = username.value;
      password = password.value;
      console.log('username is ' + username)
      console.log('password is ' + password)

      //axios call
      axios.get(Travel_Plan_BASE_URL + '/login?' + 'username=' + username + '&password=' + password)
        .then(res => {
          // console.log(res.data)
          // const result = res.data.data
          //   if(result){
          //     this.setState({ 
          //       login: true
          //   })
          // }
          if(res.data.responseCode == 200){
              Modal.success({
                content: "Congratulations! Successul Log In!"
            })
            this.setState({
              login: true,
            })
          }
          if(res.data.responseCode == 400){
            Modal.error({
              title: 'Wrong username or password',
              content: 'Please check your username or password and try again',
            });
          }
          if(res.data.responseCode == 500){
            Modal.error({
              title: 'LogIn fail. Please try again later',
              content: 'Try again',
            });
          }
            
        }).catch((error) => {
          Modal.error({
            title: 'LogIn fail. Please try again later',
            content: 'Try again',
          });
        })      
    }
  }

export default LoginForm;

