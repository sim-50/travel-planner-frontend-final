import React, { Component } from "react";
import Main from "./components/Main";
import SearchResult from "./components/SearchResult";
import LoginForm from "./components/LoginForm";
import SavedPlans from "./components/SavedPlans";
import Registration from "./components/Registration";
import Travel_planner_logo from "./asset/image/travel_planner_logo.svg";
import User_icon from "./asset/image/user.svg";
import { Layout, Row, Col } from "antd";
import "./App.css";
import { BrowserRouter, Route, Router, Switch, Link } from "react-router-dom";
import history from './history';

const { Header, Content } = Layout;

class App extends Component {
  state={
    user: {
      //userName: "Peter"
      userName: null
    }
  }

  //* check if user loged in
  checkLoggedIn = () => {
    const { userName } = this.state.user;
    return userName ? userName : "Sign In";
  }

  render() {
    const { userName } = this.state.user;

    return (
      <BrowserRouter>
        <Router history={history}>
          <Switch>
            <Route exact path="/">
              <Layout>
                <Header className="home-header">
                  <Row className="row-class">
                    <Col span={12}>
                      <img
                        src={Travel_planner_logo}
                        className="app-logo"
                        alt="logo"
                      />
                    </Col>
                    <Col span={12} className="id-class">
                      {/* if user logged in, click the link either go to user profile or user's savedRoute page. need to be discussed */}
                      <Link to={userName === null ? `/login` : `/savedRoute`}>{this.checkLoggedIn()}</Link>
                      <img src={User_icon} className="user-icon" alt="user" />
                    </Col>
                  </Row>
                </Header>
                <Content>
                  <Main />
                </Content>
              </Layout>
            </Route>
            <Route path="/searchResult/:city" component={SearchResult} />
            <Route path='/login' component={LoginForm} />
            <Route path='/savedRoute' component={SavedPlans} />
            <Route path='/registration' component={Registration}/>
          </Switch>
        </Router>
      </BrowserRouter>
    );
  }
}

export default App;
