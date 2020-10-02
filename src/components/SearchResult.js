import React, { Component } from "react";
import SearchResultHeader from "./SearchResultHeader";
import ResultDisplayPanel from "./ResultDisplayPanel";
import MapContainer from "./MapContainer";
import "../styles/SearchResult.css";
import axios from "axios";
import { BrowserRouter, Route, Router } from "react-router-dom";
import { Travel_Plan_BASE_URL } from "../constant";
import { sendRequest } from "./RouteUtils";
import history from "../history";
import uuid from "react-uuid";




class SearchResult extends Component {
    state = {
        cityName: "New York",
        cityCoordinate: null,
        cityImg: "https://media.nomadicmatt.com/laguide1.jpg",
        citySearchResult: [],
        allTypes: [],
        filterTypeName: "",
        waypoints: [],
        result: [],
        isDraw: false,
        recommendPlanList: [],
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
        savedPlanList : [
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
    };


    //TODO: axios call for getRecommendationPlansByUserId()
    getRecommendPlans = (username, cityname) =>{
      username = localStorage.getItem('user');
      cityname = this.props.match.params.city;
      //how to define cityid? Make a change in back end URL from cityid to cityname
      const url = Travel_Plan_BASE_URL + `/recommendedplans?username=${username}&cityname=${cityname}`;
      axios
        .get(url)
        .then((response)=>{
          const planList = [];
          //response data format ?? still need to modified from backend
          response.map(i =>{
            planList.push(i);
          })
          this.setState({
            planList: planList,
          })
        })
        .catch((error)=> {
          console.log("err in fetch cityInfo -> ", error);

        })
    }

    updateWaypoints = (waypoint) => {
        this.setState(
            {
                waypoints: waypoint,
            },
            this.updateRoute
        );
    };

    updateRoute = () => {
        // if(this.state.isDraw && this.state.waypoints.length >= 2) {
        //     this.sendRequest();
        // } else {
        //     const newResult = this.state.result;
        //     newResult.pop();
        //     this.setState({
        //         result: newResult,
        //         //isDraw: false,
        //     })
        // }
    };
    showOnMap = (plan) => {
        const routes = [];
        plan.map((day) =>{
            routes.push(day.route)
        });

        this.setState({
            routes: routes,
        },this.sendRequest);
    };
    
    color = ['#411b5e', '#0026ff', '#22bab5', '#55ff00', '#aaff00', '#ffff00', '#ffbb00', '#ff9900', '#ff5500', '#ff3300', '#bf2a2a', '#780765', '#000000'];

    //send route request
    sendRequest = () => {

        const routes = this.state.routes;

        this.setState({
          result: [],
        }, ()=> {
          for(let i = 0; i < routes.length; i++) {
            if(routes[i].length < 2) {
              continue;
            }
            sendRequest(routes[i], (response) => {
                let newResult = this.state.result;
                // response.color=randomColor({
                //     luminosity: 'random',
                //     hue: 'random'
                //  });
                response.color=this.color[i];
                response.actualColor=response.color;
                response.key=i+1;
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

    switchToTravelSchedulePanel = () => {
        //this.sendRequest();

        //* switch to the travelSchedulePanel component
        const { match: { params } } = this.props;
        history.push(`/searchResult/${params.city}/travelSchedule`);
    }

    switchToRecommendedPlans = () =>{
      const { match: { params } } = this.props;
      const cityName = params.city;
      if(localStorage.getItem("userInfo") != null){
        history.push(`/searchResult/${params.city}/recommendPlans`);
      } else{
        history.push({
          pathname: "/login",
          state: {
            target: "/recommendPlans",
            cityName: cityName,
          }
        });
      }  
    }

    backToSearchResult = () =>{
      const { match: { params } } = this.props;
      history.push(`/searchResult/${params.city}`);
    }
    
    submitPlanFromTravelSchedule = (plan) => {
      // console.log(plan);
      const routes = [];

      plan.map((day) => {
          const route = [];
          day.map((attraction) => {
            route.push(this.state.citySearchResult[parseInt(attraction)]);
          });
          routes.push(route)
      });

      this.setState({
          routes: routes,
      }, this.sendRequest);
    }

    savePlanFromTravelSchedule = (planName, plan) => {

      const routes = [];

      plan.map((day) => {
          const route = [];
          day.map((attraction) => {
            route.push(this.state.citySearchResult[parseInt(attraction)]);
          });
          routes.push(route)
      });

      this.setState({
          routes: routes,
      }, () => {

      //format routeDataList
      let routeDataList = [];
      for(let i = 0; i < this.state.routes.length; i++) {
        let attractionDataList = [];
        for(let j = 0; j < this.state.routes[i].length; j++) {
          let attraction = this.state.routes[i][j];
          let newAttraction = {
            attactionId: 0,
            attractionName: attraction.name,
            geometry: attraction.geometry,
            type: attraction.types.join(","),
            rating: attraction.rating
          }
          attractionDataList.push(newAttraction);
        };
        let routeObject = {
          routeId: 0,
          day: i+1,
          attractionDataList: attractionDataList
        };
        routeDataList.push(routeObject);
      }

      //construct payload
      const plan = {
        //username: String,
        planDataList: [{
          planId: 0,
          cityId: 0,
          planName: planName,
          city: this.state.cityName,
          routeDataList: routeDataList,
        }]
      }

      // console.log(plan);

      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      if(userInfo) {
        const url = Travel_Plan_BASE_URL + `/addplan`;
        plan.username = userInfo.userName;
        
        axios
        .post(url, plan)
        .then((response) => {
          if(response.status === 200) {
            history.push(`/savedRoute`);
          }
        })
        .catch((error) => {
          console.log("err in fetch cityInfo -> ", error);
        });
        
      } else {
  
        const planId = uuid();
        localStorage.setItem(planId, JSON.stringify(plan));

        history.push({
          pathname: `/login`,
          state: {
            planId: planId,
            target: "/travelSchedule"
          }
        });

      }

      });
    
    }

    filterByName = (value) => {
        this.setState({
            citySearchResult: this.state.citySearchResult.map((res) => {
                if (res.name.toLowerCase().indexOf(value.toLowerCase()) !== -1) {
                    res.display = true;
                } else {
                    res.display = false;
                }
                return res;
            }),
        });
    };

    filterByType = (type) => {
        this.setState({
            filterTypeName: type,
        });
    };

    updateSelectedLocation = (selectedRowKeys) => {
        this.setState({
            citySearchResult: this.state.citySearchResult.map((res) => {
                if (selectedRowKeys.includes(res.key)) {
                    res.checked = true;
                } else {
                    res.checked = false;
                }
                return res;
            }),
        });
    };

    componentDidMount() {
        // todo: put into const file
        //console.log("page refreshed");
        const url =
            Travel_Plan_BASE_URL + `/search?city=${this.props.match.params.city}`;
        axios
            .get(url)
            .then((response) => {
                console.log('response: ',response);
                //console.log('response: ',response.data.responseObj.results);
                //console.log(response.data.responseObj.allTypes);
                this.setState({
                    cityCoordinate: {
                        lat: response.data.responseObj.coordinate[0],
                        lng: response.data.responseObj.coordinate[1],
                    },
                    citySearchResult: response.data.responseObj.results,
                    allTypes: response.data.responseObj.allTypes,
                });
            })
            .catch((error) => {
                console.log("err in fetch cityInfo -> ", error);
            });
    }

    render() {
        const { cityImg, citySearchResult, allTypes } = this.state;
        const { match: { params } } = this.props;


        return (
            <BrowserRouter>
                <Router history={history}>
                    <div className="searchResult-container">
                        <SearchResultHeader 
                        cityName = {this.props.match.params.city}/>
                        <div className="main">
                            <div className="left-side">                               
                                    <Route path={`/searchResult/${params.city}`}>
                                        <ResultDisplayPanel
                                            updateSelectedLocation={this.updateSelectedLocation}
                                            citySearchResult={citySearchResult.filter(
                                                (res) =>
                                                    res.display === true &&
                                                    (res.types.includes(this.state.filterTypeName) ||
                                                        !this.state.filterTypeName ||
                                                        this.state.filterTypeName === "All")
                                            )}
                                            allTypes={allTypes}
                                            cityName={params.city}
                                            cityImg={cityImg}
                                            filterByName={this.filterByName}
                                            filterByType={this.filterByType}
                                            selectedList={citySearchResult.filter(
                                                (item) => item.checked === true
                                            )}
                                            switchToTravelSchedulePanel={this.switchToTravelSchedulePanel}
                                            switchToRecommendedPlans={this.switchToRecommendedPlans}
                                            backToSearchResult={this.backToSearchResult}
                                            updateWaypoints={this.updateWaypoints}
                                            showOnMap = {this.showOnMap}
                                            planList = {this.state.planList}
                                            savePlanFromTravelSchedule = {this.savePlanFromTravelSchedule}
                                            //recommendPlanList = {this.getRecommendPlans}
                                            submitPlanFromTravelSchedule = {this.submitPlanFromTravelSchedule}                                        />
                                    </Route>
                            </div>
                            <div className="right-side">
                                  <Route path={`/searchResult/${params.city}`}>
                                    <MapContainer
                                        cityCoordinate={this.state.cityCoordinate}
                                        selected={citySearchResult.filter(
                                            (item) => item.checked === true
                                        )}
                                        responseData={this.state.result}
                                    />
                                  </Route>
                            </div>
                        </div>
                    </div>
                </Router>
            </BrowserRouter>
        );
    }
}

export default SearchResult;

// {
//     key: "1",
//     name: "LA Staple Center",
//     type: "museum",
//     description: "New York No. 1 Lake Park",
//     display: true,
//     checked: false,
//     position: { lat: 34.0430219, lng: -118.2694428 },
// },
// {
//     key: "2",
//     name: "Jim Green",
//     type: "bar",
//     description: "London No. 1 Lake Park",
//     display: true,
//     checked: false,
// },
// {
//     key: "3",
//     name: "Joe Black",
//     type: "restaurant",
//     description: "Sidney No. 1 Lake Park",
//     display: true,
//     checked: false,
// },
// {
//     key: "4",
//     name: "Universal Park",
//     type: "park",
//     description: "Sidney No. 1 Lake Park",
//     display: true,
//     checked: false,
// },
// {
//     key: "5",
//     name: "University of Southern California",
//     type: "university",
//     description: "University",
//     display: true,
//     checked: false,
//     position: { lat: 34.0236816, lng: -118.3013553 },
// },
// {
//     key: "6",
//     name: "Chinatown LA",
//     type: "park",
//     description: "Chinatown",
//     display: true,
//     checked: false,
//     position: { lat: 34.0623, lng: -118.2383 },
// },
