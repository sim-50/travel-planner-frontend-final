import React, { Component } from "react";
import SearchResultHeader from "./SearchResultHeader";
import ResultDisplayPanel from "./ResultDisplayPanel";
import SavedPlanList from "./SavedPlanList";
import MapContainer from "./MapContainer";
import "../styles/SearchResult.css";
import axios from "axios";
import { BrowserRouter, Route, Router, Switch } from "react-router-dom";
import { Travel_Plan_BASE_URL } from "../constant";
import { sendRequest } from "./RouteUtils";
import { randomColor } from "randomcolor";
import history from "../history";

class SearchResult extends Component {
    state = {
        cityName: "Los Angeles",
        cityCoordinate: {},
        cityImg: "https://media.nomadicmatt.com/laguide1.jpg",
        citySearchResult: [],
        allTypes: [],
        filterTypeName: "",
        waypoints: [],
        result: [],
        isDraw: false,
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
    showOnMap = (plan) => {
        const routes = [];
        plan.map((day) =>{
            routes.push(day.route)
        });
        this.setState({
            routes: routes,
        },this.sendRequest);
    };
    //send route request
    sendRequest = () => {

        const routes = this.state.routes;
        console.log(routes);

        for(let i = 0; i < routes.length; i++) {

            sendRequest(routes[i], (response) => {
                let newResult = this.state.result;
                response.color=randomColor({
                    luminosity: 'random',
                    hue: 'random'
                 });
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

    }

    switchToTravelSchedulePanel = () => {
        this.sendRequest();

        //* switch to the travelSchedulePanel component
        const { match: { params } } = this.props;
        history.push(`/searchResult/${params.city}/travelSchedule`);
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
        console.log("page refreshed");
        const url =
            Travel_Plan_BASE_URL + `/search?city=${this.props.match.params.city}`;
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
                    citySearchResult: response.data.responseObj.results,
                    allTypes: response.data.responseObj.allTypes,
                });
            })
            .catch((error) => {
                console.log("err in fetch cityInfo -> ", error);
            });
    }
    componentDidUpdate() {
        console.log("page updated");
    }
    componentWillUnmount() {
        console.log("page deleted");
    }

    render() {
        const { cityImg, citySearchResult, allTypes } = this.state;
        const { match: { params } } = this.props;

        return (
            <BrowserRouter>
                <Router history={history}>
                    <div className="searchResult-container">
                        <SearchResultHeader />
                        <div className="main">
                            <div className="left-side">
                                <Switch>
                                    <Route path={`/searchResult/savedRoute`}>
                                        <SavedPlanList
                                            // props needed by MapContainer
                                            // don't need this b/c we set center coordiate independently in SavedRoutes
                                            // cityCoordinate={this.state.cityCoordinate}
                                            // needed data points to show on the map, don't need them here
                                            // we request them independently in SavedRoutes
                                            // responseData={this.state.result}
                                            showOnMap={this.showOnMap}
                                        />
                                    </Route>

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
                                            updateWaypoints={this.updateWaypoints}
                                            showOnMap = {this.showOnMap}
                                            planList = {this.state.planList}
                                        />
                                    </Route>
                                </Switch>
                            </div>
                            <div className="right-side">
                                <MapContainer
                                    cityCoordinate={this.state.cityCoordinate}
                                    selected={citySearchResult.filter(
                                        (item) => item.checked === true
                                    )}
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

export default SearchResult;
// import React, { Component } from "react";
// import SearchResultHeader from "./SearchResultHeader";
// import ResultDisplayPanel from "./ResultDisplayPanel";
// import SavedRoute from "./SavedRoute";
// import MapContainer from "./MapContainer";
// import "../styles/SearchResult.css";
// import axios from "axios";
// import { BrowserRouter, Route, Router, Switch } from "react-router-dom";
// import { Travel_Plan_BASE_URL } from "../constant";
// import history from "../history";

// class SearchResult extends Component {
//     state = {
//         cityName: "Los Angeles",
//         cityCoordinate: {},
//         cityImg: "https://media.nomadicmatt.com/laguide1.jpg",
//         citySearchResult: [],
//         allTypes: [],
//         filterTypeName: "",
//         waypoints: [],
//         result: null,
//         isDraw: false,
//     };

//     updateWaypoints = (waypoint) => {
//         this.setState(
//             {
//                 waypoints: waypoint,
//             },
//             this.updateRoute
//         );
//     };

//     updateRoute = () => {
//         if (this.state.isDraw && this.state.waypoints.length >= 2) {
//             this.sendRequest();
//         }
//     };

//     //send route request
//     sendRequest = () => {
//         //console.log(this.state.waypoints);
//         const directionService = new window.google.maps.DirectionsService();
//         // const origin =  "San Antonio Winery" ;
//         // const destination = "Universal Studios Hollywood";
//         // const waypoints = [{location:"Los Angeles County Museum of Art"},{location: "The Greek Theatre"}];

//         //const origin = { lat: 34.0637293, lng: -118.223954 };
//         //const destination = {lat: 34.13811680000001,lng: -118.3533783};
//         //const waypoints = [{location:{ lat: 34.0639323, lng: -118.3592293 }},{location: {lat: 34.1195315,lng: -118.2962896}}];
//         const len = this.state.waypoints.length;
//         const origin = {
//             lat: this.state.waypoints[0].geometry.location.lat,
//             lng: this.state.waypoints[0].geometry.location.lng,
//         };
//         const destination = {
//             lat: this.state.waypoints[len - 1].geometry.location.lat,
//             lng: this.state.waypoints[len - 1].geometry.location.lng,
//         };
//         const waypoints = [];
//         if (len > 2) {
//             for (let i = 1; i < len - 1; i++) {
//                 waypoints.push({
//                     location: {
//                         lat: this.state.waypoints[i].geometry.location.lat,
//                         lng: this.state.waypoints[i].geometry.location.lng,
//                     },
//                 });
//             }
//         }

//         //console.log(waypoints);

//         let request = {
//             origin: origin,
//             destination: destination,
//             travelMode: "DRIVING",
//             waypoints: waypoints,
//         };

//         directionService.route(request, (response, status) => {
//             //console.log(response);
//             if (status === "OK") {
//                 this.setState({
//                     result: response,
//                     isDraw: true,
//                 });
//             }
//         });
//     };

//     switchToTravelSchedulePanel = () => {
//         this.sendRequest();

//         //* switch to the travelSchedulePanel component
//         const { match: { params } } = this.props;
//         history.push(`/searchResult/${params.city}/travelSchedule`);
//     }

//     filterByName = (value) => {
//         this.setState({
//             citySearchResult: this.state.citySearchResult.map((res) => {
//                 if (res.name.toLowerCase().indexOf(value.toLowerCase()) !== -1) {
//                     res.display = true;
//                 } else {
//                     res.display = false;
//                 }
//                 return res;
//             }),
//         });
//     };

//     filterByType = (type) => {
//         this.setState({
//             filterTypeName: type,
//         });
//     };

//     updateSelectedLocation = (selectedRowKeys) => {
//         this.setState({
//             citySearchResult: this.state.citySearchResult.map((res) => {
//                 if (selectedRowKeys.includes(res.key)) {
//                     res.checked = true;
//                 } else {
//                     res.checked = false;
//                 }
//                 return res;
//             }),
//         });
//     };

//     componentDidMount() {
//         // todo: put into const file
//         const url =
//             Travel_Plan_BASE_URL + `/search?city=${this.props.match.params.city}`;
//         axios
//             .get(url)
//             .then((response) => {
//                 //console.log('response: ',response);
//                 //console.log('response: ',response.data.responseObj.results);
//                 //console.log(response.data.responseObj.allTypes);
//                 this.setState({
//                     cityCoordinate: {
//                         lat: response.data.responseObj.coordinate[0],
//                         lng: response.data.responseObj.coordinate[1],
//                     },
//                     citySearchResult: response.data.responseObj.results,
//                     allTypes: response.data.responseObj.allTypes,
//                 });
//             })
//             .catch((error) => {
//                 console.log("err in fetch cityInfo -> ", error);
//             });
//     }

//     render() {
//         const { cityImg, citySearchResult, allTypes } = this.state;
//         const { match: { params } } = this.props;

//         return (
//             <BrowserRouter>
//                 <Router history={history}>
//                     <div className="searchResult-container">
//                         <SearchResultHeader />
//                         <div className="main">
//                             <div className="left-side">
//                                 <Switch>
//                                     <Route path={`/searchResult/savedRoute`}>
//                                         <SavedRoute
//                                             citySearchResult = {citySearchResult}
//                                             // props needed by MapContainer
//                                             cityCoordinate={this.state.cityCoordinate}
//                                             selected={citySearchResult.filter(
//                                                 (item) => item.checked === true
//                                             )}
//                                             responseData={this.state.result}
//                                             sendRequest={this.sendRequest}
//                                         />
//                                     </Route>


//                                     <Route path={`/searchResult/${params.city}`}>
//                                         <ResultDisplayPanel
//                                             updateSelectedLocation={this.updateSelectedLocation}
//                                             citySearchResult={citySearchResult.filter(
//                                                 (res) =>
//                                                     res.display === true &&
//                                                     (res.types.includes(this.state.filterTypeName) ||
//                                                         !this.state.filterTypeName ||
//                                                         this.state.filterTypeName === "All")
//                                             )}
//                                             allTypes={allTypes}
//                                             cityName={params.city}
//                                             cityImg={cityImg}
//                                             filterByName={this.filterByName}
//                                             filterByType={this.filterByType}
//                                             selectedList={citySearchResult.filter(
//                                                 (item) => item.checked === true
//                                             )}
//                                             switchToTravelSchedulePanel={this.switchToTravelSchedulePanel}
//                                             updateWaypoints={this.updateWaypoints}
//                                         />
//                                     </Route>
//                                 </Switch>
//                             </div>
//                             <div className="right-side">
//                                 <MapContainer
//                                     // refreshing the page means refreshing all divs, no matter whether it's currently
//                                     // displayed or not
//                                     // 就算 <MapContainer> 移到 <div className="left-side"> 里，refresh 后仍然会重新执行
//                                     // {...console.log("Map container still working")}
//                                     cityCoordinate={this.state.cityCoordinate}
//                                     selected={citySearchResult.filter(
//                                         (item) => item.checked === true
//                                     )}
//                                     responseData={this.state.result}
//                                     sendRequest={this.sendRequest}
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                 </Router>
//             </BrowserRouter>
//         );
//     }
// }

// export default SearchResult;