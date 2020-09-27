import React, { Component } from 'react';
import { Table, Space,Tabs,Button, Timeline } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import MapContainer from "./MapContainer";
import { Travel_Plan_BASE_URL } from "../constant";
import axios from "axios";

const { TabPane } = Tabs;

class SavedRoute extends Component {
    state = {
        cityName: "Los Angeles",
        cityCoordinate: {lat: 40.7128, lng: -74.0060},
        waypoints: [],
        result: this.props.responseData,
        isDraw: false,
        // needed by modal
        modalVisible: false,
        // needed by functions in RecommendedPlanList
        selectedPlanName: "",
        selectedPlanDetail: [],
        planList : [
          {
            key: 0,
            name: "Life's journey after graduation",
            days: 3,
            planDetail:  [
              {
                day: 1,
                route: [
                  {
                    name: "Time Square",
                    geometry: {
                      location: {
                        lat:40.7527,
                        lng:-73.9855,
                      }
                     }
                  },
                  {
                    name: "Grand Central Terminal",
                    geometry: {
                      location: {
                        lat:40.7527,
                        lng:-73.9772,
                      }
                     }
                  },
                  {
                    name: "Central Park",
                    geometry: {
                      location: {
                          lat:40.7812,
                          lng: -73.9665,
                      }
                  }
                  },
                ]
              },
              {
                day: 2,
                route: [
                  {
                    name: "Empire State Building",
                    geometry:{
                        location:{
                          lat:40.7484,
                          lng: -73.9857,
                        }
                    }
                  },
                  {
                    name: "Chinatown",
                    geometry:{
                      location:{
                          lat:40.7158,
                          lng: -73.9970,
                      }
                  }
                  },
                ]
              },
              {
                day: 3,
                route:[
                  {
                    name: "Little Italy",
                    geometry:{
                        location:{
                          lat:40.7191,
                          lng: -73.9973,
                        }
                    }   
                  },
                  {
                    name: "Metropolitan Museum of Art",
                    geometry:{
                        location:{
                          lat:40.7794,
                          lng: -73.9632,
                        }
                    } 
                  },
                  {
                    name: "The Met Cloisters",
                    geometry:{
                        location:{
                          lat:40.8649,
                          lng: -73.9317,
                        }
                    }
                  },
                ]
              }],
          },
          {
            key: 1,
            name: "New York City Vacation Travel Guide",
            days: 5,
            planDetail:  [
              {
                day: 1,
                route: [
                  {
                      name: "Time Square",
                      geometry: {
                        location: {
                          lat:40.7527,
                         lng:-73.9855,
                        }
                       }
                    },
                    {
                      name: "Grand Central Terminal",
                      geometry: {
                        location: {
                          lat:40.7527,
                          lng:-73.9772,
                        }
                       }
                    },
                    {
                      name: "Central Park",
                      geometry: {
                        location: {
                            lat:40.7812,
                            lng: -73.9665,
                        }
                    }
                    },
                ]
              },
              {
                day: 2,
                route: [
                 {
                    name: "place1"
                  },
                 {
                    name: "place2"
                  },
                ]
              },
              {
                day: 3,
                route:[
                  {
                    name: "Little Italy",
                    lat:40.7191,
                    lng: -73.9973,
                  },
                 {
                    name: "Metropolitan Museum of Art",
                    lat:40.7794,
                    lng: -73.9632,
                  },
                  {
                    name: "The Met Cloisters",
                    lat:40.8649,
                    lng: -73.9317,
                  },
                ]
              },
              {
                day: 4,
                route: [
                 {
                    name:"place1" 
                  },
                  {
                    name:"place2" 
                  },
                 {
                    name:"place3" 
                  },
                  {
                    name:"place4" 
                  },
                ]
              },
              {
                day: 5,
                route: [
                   {
                    name:"place1" 
                  },
                 {
                    name:"place2" 
                  },
                 {
                    name:"place3" 
                  },
                ]
              }],
          },
          {
            key: 2,
            name: "Short Weekend in New York City",
            days: 3,
            planDetail:  [
              {
                day: 1,
                route: [
                 {
                    name:"place1" 
                  },
                  {
                    name:"place2" 
                  },
                  {
                    name:"place3" 
                  },
                ]
              },
              {
                day: 2,
                route: [
                   {
                    name:"place1" 
                  },
                  {
                    name:"place2" 
                  },
                 {
                    name:"place3" 
                  },
                ]
              },
              {
                day: 3,
                route:[
                   {
                    name:"place1" 
                  },
                  {
                    name:"place2" 
                  },
                  {
                    name:"place3" 
                  },
                ]
              }
            ],
          },
          {
            key: 3,
            name: "Culture trip in new york",
            days: 4,
            planDetail:[
            {
              day: 1,
              route:[
                {
                 name:"place1" 
               },
               {
                 name:"place2" 
               },
               {
                 name:"place3" 
               },
             ]
            },
            {
              day: 2,
              route:[
                {
                 name:"place1" 
               },
               {
                 name:"place2" 
               },
             ]
            },
            {
              day: 3,
              route:[
                {
                 name:"place1" 
               },
               {
                 name:"place2" 
               },
              ]
            },
            {
              day: 4,
              route:[
                {
                 name:"place1" 
               },
               {
                 name:"place2" 
               }]
            }
        ]}],
        routes: [],      //list of list
      };

    // componentDidMount() {
    //     // todo: put into const file
    //     const url =
    //         Travel_Plan_BASE_URL + `/search?city=${this.props.match.params.city}`;
    //     axios
    //         .get(url)
    //         .then((response) => {
    //             //console.log('response: ',response);
    //             //console.log('response: ',response.data.responseObj.results);
    //             //console.log(response.data.responseObj.allTypes);
    //             this.setState({
    //                 cityCoordinate: {
    //                     lat: response.data.responseObj.coordinate[0],
    //                     lng: response.data.responseObj.coordinate[1],
    //                 },
    //                 citySearchResult: response.data.responseObj.results,
    //                 allTypes: response.data.responseObj.allTypes,
    //             });
    //         })
    //         .catch((error) => {
    //             console.log("err in fetch cityInfo -> ", error);
    //         });
    // }

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
              this.props.showOnMap(record.planDetail);
            }}>Show on map</Button>
            <Button>Delete</Button>
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
        console.log(this.state.cityCoordinate);
        return (
            <div className="saved-routes">
                <div className="left-side">
                    <div className='tableContainer'>
                        <Table
                            columns={this.columns}
                            dataSource={this.state.planList}
                            pagination={{ pageSize: 5 }}
                        />
                        <Modal
                        title={this.state.selectedPlanName}
                        style={{float: "left", marginLeft:"30px", width:"500px", top:"250px"}}
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
                </div>
                <div className="right-side">
                <MapContainer
                    cityCoordinate={this.state.cityCoordinate}
                    selected={[]}
                    responseData={this.state.result}
                    sendRequest={this.props.sendRequest}
                />
                </div>
            </div>
        );
    }
}

export default SavedRoute;
