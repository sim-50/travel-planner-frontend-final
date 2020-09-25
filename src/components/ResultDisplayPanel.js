import React, { Component } from "react";
import ImgContainer from "./ImgContainer";
import LocationOptionList from "./LocationOptionList";
import TravelSchedulePanel from "./TravelSchedulePanel";
import "../styles/SearchResult.css";
import { BrowserRouter, Route, Router, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import history from "../history";

class ResultDisplayPanel extends Component {
    render() {
        const { cityName, cityImg, citySearchResult, selectedList, allTypes } = this.props;

        return (
            <BrowserRouter>
                <Router history={history}>
                    <div className="container">
                        <ImgContainer cityImg={cityImg} />
                        <Switch>
                            <Route exact path={`/searchResult/${cityName}`}>
                                <LocationOptionList
                                    updateSelectedLocation={this.props.updateSelectedLocation}
                                    selectedList={selectedList}
                                    citySearchResult={citySearchResult}
                                    allTypes={allTypes}
                                    filterByName={this.props.filterByName}
                                    filterByType={this.props.filterByType}
                                    switchToTravelSchedulePanel={this.props.switchToTravelSchedulePanel}
                                    updateWaypoints={this.props.updateWaypoints}
                                />
                            </Route>

                            <Route path={`/searchResult/${cityName}/travelSchedule`} >
                                <TravelSchedulePanel 
                                    selectedList={selectedList}
                                />
                            </Route>
                        </Switch>
                    </div>
                </Router>
            </BrowserRouter>
        );
    }
}

ResultDisplayPanel.propTypes = {
    citySearchResult: PropTypes.array.isRequired,
    cityImg: PropTypes.string.isRequired,
    allTypes: PropTypes.array.isRequired,
};

export default ResultDisplayPanel;
