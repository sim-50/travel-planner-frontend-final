import React, { Component } from "react";
import SearchResultHeader from "./SearchResultHeader";
import ResultDisplayPanel from "./ResultDisplayPanel";
import SavedRoute from "./SavedRoute";
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

        planList:  [],      //for recommend to store list of plans
        routes: [],      //for sendRequest to store a list of routes
        
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

    color = ['#411b5e', '#0026ff', '#22bab5', '#55ff00', '#aaff00', '#ffff00', '#ffbb00', '#ff9900', '#ff5500', '#ff3300', '#bf2a2a', '#780765', '#000000'];

    //send route request
    sendRequest = () => {

        const routes = this.state.routes;

        for(let i = 0; i < routes.length; i++) {

            sendRequest(routes[i], (response) => {
                let newResult = this.state.result;
                // response.color=randomColor({
                //     luminosity: 'random',
                //     hue: 'random'
                //  });

                response.color = this.color[newResult.length];
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
                                    <Route
                                        path={`/searchResult/savedRoute`}
                                        component={SavedRoute}
                                    />

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
