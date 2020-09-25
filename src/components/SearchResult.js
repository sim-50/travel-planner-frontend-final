import React, { Component } from "react";
import SearchResultHeader from "./SearchResultHeader";
import ResultDisplayPanel from "./ResultDisplayPanel";
import SavedRoute from "./SavedRoute";
import MapContainer from "./MapContainer";
import "../styles/SearchResult.css";
import axios from "axios";
import { BrowserRouter, Route, Router, Switch } from "react-router-dom";
import { Travel_Plan_BASE_URL } from "../constant";
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
        result: null,
        isDraw: false,
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
        if (this.state.isDraw && this.state.waypoints.length >= 2) {
            this.sendRequest();
        }
    };

    //send route request
    sendRequest = () => {
        //console.log(this.state.waypoints);
        const directionService = new window.google.maps.DirectionsService();
        // const origin =  "San Antonio Winery" ;
        // const destination = "Universal Studios Hollywood";
        // const waypoints = [{location:"Los Angeles County Museum of Art"},{location: "The Greek Theatre"}];

        //const origin = { lat: 34.0637293, lng: -118.223954 };
        //const destination = {lat: 34.13811680000001,lng: -118.3533783};
        //const waypoints = [{location:{ lat: 34.0639323, lng: -118.3592293 }},{location: {lat: 34.1195315,lng: -118.2962896}}];
        const len = this.state.waypoints.length;
        const origin = {
            lat: this.state.waypoints[0].geometry.location.lat,
            lng: this.state.waypoints[0].geometry.location.lng,
        };
        const destination = {
            lat: this.state.waypoints[len - 1].geometry.location.lat,
            lng: this.state.waypoints[len - 1].geometry.location.lng,
        };
        const waypoints = [];
        if (len > 2) {
            for (let i = 1; i < len - 1; i++) {
                waypoints.push({
                    location: {
                        lat: this.state.waypoints[i].geometry.location.lat,
                        lng: this.state.waypoints[i].geometry.location.lng,
                    },
                });
            }
        }

        //console.log(waypoints);

        let request = {
            origin: origin,
            destination: destination,
            travelMode: "DRIVING",
            waypoints: waypoints,
        };

        directionService.route(request, (response, status) => {
            //console.log(response);
            if (status === "OK") {
                this.setState({
                    result: response,
                    isDraw: true,
                });
            }
        });
    };

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
                                    sendRequest={this.sendRequest}
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
