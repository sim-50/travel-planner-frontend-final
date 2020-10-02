import React,{Component}from 'react';
import { Layout, Row, Col, Modal} from 'antd';
import {Redirect} from 'react-router-dom';
import {Link} from 'react-router-dom';
import axios from 'axios';
import '../styles/loginStyle.css';
import User_icon from "../asset/image/user.svg";
import Travel_planner_logo from "../asset/image/travel_planner_logo.svg";
import history from "../history";
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
                  <img src={User_icon} className="user-icon" alt="user"/>
                </Col>
              </Row>
          </Header>
          <Layout className = "loginarea">
            <div className ='loginBox'>
            <Link to = "/">
                <span id = "close-login">&times;</span>
            </Link>
                <h3>Log in.</h3>
                <form className = 'input' ref={fm => {this.form=fm}}>
                    <input type="text" name="username" placeholder= "Username" required={true}  id = 'input1'/>
                    <input type="password" name="password" placeholder= "Password"  id = 'input2'/>
                </form>
  
                <div className = "button">
                  <button onClick = {() => this.login()}>Log in</button>
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
 
  

  login(){
      const formData = new FormData(this.form);
      console.log('username is '+ formData.get('username'));
      // console.log('username is ' + username)
      // console.log('password is ' + password)
      // console.log(history.location.state);
      // if(history.location.state.target === "/recommendPlans"){
      //   history.push(`/searchResult/${history.location.state.cityName}/recommendPlans`)
      // }

      //axios call
      axios.post(Travel_Plan_BASE_URL + '/login', new URLSearchParams(formData))
        .then(res => {
          console.log(res);
          if(res.data.responseCode == 400){
            Modal.error({
              title: 'Wrong username or password',
              content: 'Please check your username or password and try again',
            });
          }
          else if(res.data.responseCode == 500){
            Modal.error({
              title: 'LogIn fail. Please try again later',
              content: 'Try again',
            });
          }
          else if(res.status == 200){
            Modal.success({
              content: "Congratulations! Successul Log In!",
              onOk(){
                console.log(history.location.state);
                if(history.location.state.target === "/recommendPlans"){
                  history.push(`/searchResult/${history.location.state.cityName}/recommendPlans`)
                }
              }
            })
            this.setState({
              login: true,
            })
            
            localStorage.setItem('userInfo', JSON.stringify({
              userName: formData.get('username')
            }))
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

