import React, { Component } from "react";
import Main from "./components/Main";
import SearchResult from "./components/SearchResult";
import Travel_planner_logo from "./asset/image/travel_planner_logo.svg";
import User_icon from "./asset/image/user.svg";
import { Layout, Row, Col } from "antd";
import "./App.css";
import { BrowserRouter, Route, Router, Switch } from "react-router-dom";
import history from './history';

const { Header, Content } = Layout;

class App extends Component {
  render() {
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
                      <span>Sign in</span>
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
          </Switch>
        </Router>
      </BrowserRouter>
    );
  }
}

export default App;
