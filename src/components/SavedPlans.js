import React, { Component } from 'react';
import { Table, Space,Tabs,Button, Timeline } from 'antd';
import {Link} from 'react-router-dom';
import Modal from 'antd/lib/modal/Modal';
import MapContainer from "./MapContainer";
import { BrowserRouter, Route, Router, Switch } from "react-router-dom";
import { Travel_Plan_BASE_URL } from "../constant";
import axios from "axios";
import { sendRequest } from "./RouteUtils";
import SearchResultHeader from "./SearchResultHeader";
import backAarrow from "../asset/image/back-arrow.svg";
import history from "../history";

const { TabPane } = Tabs;
class SavedPlans extends Component {
    state = {
        cityName: "Los Angeles",
        cityCoordinate: {},
        cityImg: "https://media.nomadicmatt.com/laguide1.jpg",
        waypoints: [],
        result: [],
        isDraw: false,
        // needed by modal
        modalVisible: false,
        // needed by functions in RecommendedPlanList
        selectedPlanName: "",
        selectedPlanDetail: [],
        savedPlanList: [],
        savedRoutes: [],      //list of list
      };

    showOnMap = (plan) => {
      const routes = [];
      plan.map((day) =>{
          routes.push(day.route)
      });

      this.setState({
          savedRoutes: routes,
      },this.sendRequest);
    };
    
    color = ['#411b5e', '#0026ff', '#22bab5', '#55ff00', '#aaff00', '#ffff00', '#ffbb00', '#ff9900', '#ff5500', '#ff3300', '#bf2a2a', '#780765', '#000000'];

    //send route request
    sendRequest = () => {

        const routes = this.state.savedRoutes;

        this.setState({
          result: [],
        }, ()=> {
          for(let i = 0; i < routes.length; i++) {

            sendRequest(routes[i], (response) => {
                let newResult = this.state.result;
                // response.color=randomColor({
                //     luminosity: 'random',
                //     hue: 'random'
                //  });
                response.color=this.color[newResult.length];
                response.actualColor=response.color;
    
                newResult.push(response);
                // newResult = [response];
                this.setState(
                    { 
                        result: newResult,
                        isDraw: true,
                    });
            });
        }
        })
    }

    getSavedPlans = () =>{
      const username = JSON.parse(localStorage.getItem('userInfo')).userName;
      const url = Travel_Plan_BASE_URL + `/allplans?username=${username}`;
      console.log(url);
      axios
        .get(url)
        .then((response)=>{
          let planList = response.data.responseObj.planDataList;
          let newPlanList = [];
          // i = index of a plan
          for (let i = 0; i < planList.length; i++) {
            let key = planList[i].planId;
            let name = planList[i].planName;
            let days = planList[i].routeDataList.length;
            let planDetail = [];
            // j = index of route of a routeDataList
            for (let j = 0; j < days; j++) {
              // let day = j + 1;
              let attractions = [];
              // k = index of an attraction in routeDataList.attractionDataList
              for (let k = 0; k < planList[i].routeDataList[j].attractionDataList.length; k++) {
                let attractionItem = {
                  name: planList[i].routeDataList[j].attractionDataList[k].attractionName,
                  geometry: planList[i].routeDataList[j].attractionDataList[k].geometry,
                }
                attractions.push(attractionItem);
              }
              let routeItem = {
                day: planList[i].routeDataList[j].day,
                route: attractions,
              }
              planDetail.push(routeItem);
            }
            let plan = {
              key: key,
              name: name,
              days: days,
              planDetail: planDetail,
            }
            newPlanList.push(plan);
          }
          this.setState({
            savedPlanList: newPlanList,
          })
        })
        .catch((error)=> {
          console.log("err in fetching user plan -> ", error);
        })
    }

    deleteSavedPlans = (planId) =>{
      const username = JSON.parse(localStorage.getItem('userInfo')).userName;
      const url = Travel_Plan_BASE_URL + `/deleteplan?username=${username}&planid=${planId}`;
      axios
        .delete(url)
        .then((response)=>{
          console.log(response);
          if(response.data.responseCode == 200) {
            // delete plan from display
            let newPlanList = this.state.savedPlanList;
            newPlanList = newPlanList.filter(entry=>{
              return entry.key !== planId;
            });
            this.setState({
              savedPlanList: newPlanList,
            });
          } else if (response.data.responseCode == 500) {
            console.log("err in deleting user plan -> responseCode: 500");
          }
        })
        .catch((error)=> {
          console.log("err in deleting user plan ->", error);
        })
    }


    componentDidMount() {
      // todo: put into const file
      // const url =
      //     Travel_Plan_BASE_URL + `/search?city=${this.props.match.params.city}`;
      const url =
          Travel_Plan_BASE_URL + `/search?city=Boston`;
      axios
          .get(url)
          .then((response) => {
              //console.log('response: ',response);
              //console.log('response: ',response.data.responseObj.results);
              //console.log(response.data.responseObj.allTypes);
              this.setState({
                  cityCoordinate: {
                      lat: response.data.responseObj.coordinate[0],
                      lng: response.data.responseObj.coordinate[1],
                  },
                  // citySearchResult: response.data.responseObj.results,
                  // allTypes: response.data.responseObj.allTypes,
              });
              this.getSavedPlans();
          })
          .catch((error) => {
              console.log("err in fetch cityInfo -> ", error);
          });
  }

    columns= [
      {
        title: 'Name',
        dataIndex: 'name',
        width: '40%',
      },
      {
        title: 'Days',
        dataIndex: 'days',
        width: '5%',
        sorter: (a, b) => a.days - b.days,
      },
      {
        title: 'Actions',
        key: 'action',
        width: '55%',
        render: (record) => (
          <Space size="middle">
            <Button onClick={() => {
              this.setModalVisible(true);
              this.setPlanDetail(record.planDetail);
              this.setPlanName(record.name);
            }}>
              Details
            </Button>
            <Button onClick={()=>{
              this.showOnMap(record.planDetail);
            }}>Show on map</Button>
            <Button onClick={()=>{
              this.deleteSavedPlans(record.key);
            }}>Delete</Button>
          </Space>
        )
      },
    ];
    // 原来：
    // setModalVisible(modalVisible) {
    setModalVisible = (modalVisible) =>{
      this.setState({ modalVisible });
    }

    setPlanDetail = (routes) =>{
      this.setState( {selectedPlanDetail: routes });
    }

    setPlanName = (planName) =>{
      this.setState({selectedPlanName: planName});
    }

    render() {
        return (
          <BrowserRouter>
            <Router history={history}>
                <div className="searchResult-container">
                  <SearchResultHeader />
                  <div className="main">
                    <div className="left-side">    
                      <div className='tableContainer'>
                          <Table
                              columns={this.columns}
                              dataSource={this.state.savedPlanList}
                              pagination={{ pageSize: 5 }}
                          />
                          <Modal
                          className = "jsj"
                          title={this.state.selectedPlanName}
                          style={{float: "left", marginLeft:"3%", top:"30%"}}
                          visible={this.state.modalVisible}
                          onOk={() => this.setModalVisible(false)}
                          onCancel={() => this.setModalVisible(false)}
                          >
                  
                            <Tabs defaultActiveKey="1" tabPosition="top" onChange={(key) =>{console.log(key)}} style={{ height: "70%" }}>
                              {this.state.selectedPlanDetail.map(i => (
                                <TabPane tab={`Day ${i.day}`} key={i.day}>
                                  <Timeline>
                                    {
                                      i.route.map(j =>(
                                        <Timeline.Item>{j.name}</Timeline.Item>
                                      ))
                                    }
                                  </Timeline>
                                </TabPane>
                              ))}
                            </Tabs>
                          </Modal>
                      </div>   
                        <span className = "backg" onClick={() => history.goBack()}>
                          <img src={backAarrow} alt=""/>
                          <p>Back to result page</p>
                        </span>
                    </div>
          
                    <div className="right-side">
                      <MapContainer
                        cityCoordinate={this.state.cityCoordinate}
                        selected={[]}
                        responseData={this.state.result}
                      />
                    </div>
                  </div>
                </div>
             </Router>
          </BrowserRouter>
        );
    }
}

export default SavedPlans;
