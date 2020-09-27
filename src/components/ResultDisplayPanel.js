import React, { Component } from 'react';
import ImgContainer from './ImgContainer';
import LocationOptionList from './LocationOptionList';
import PropTypes from 'prop-types';
<<<<<<< HEAD
import {Button} from 'antd';
=======
import {Button, Typography} from 'antd';
>>>>>>> upstream/dev
import RecommendPlanList from './RecommendPlanList';
import TravelSchedulePanel from "./TravelSchedulePanel";
import "../styles/SearchResult.css";
import { BrowserRouter, Route, Router, Switch } from "react-router-dom";
import history from "../history";

const {Text} =  Typography;

class ResultDisplayPanel extends Component {
    state = {
        showPlanList: false,
        showLocationList: true,
        showRecommendButton: true,
        showBackwardButton: false,
    }

    clickRecommendButton = () =>{
        this.setState({
            showPlanList: true,
            showLocationList: false,
            showRecommendButton:false,
            showBackwardButton: true,
        })
    }

    clickBackButton = () =>{
        this.setState({
            showPlanList: false,
            showLocationList: true,
            showRecommendButton:true,
            showBackwardButton: false,
        })
    }

    
    
    render() {
        const { cityName, cityImg, citySearchResult, selectedList, allTypes } = this.props;

        return ( 
            <BrowserRouter>
                <Router history={history}>
                    <div className="container">
                        <ImgContainer cityImg={cityImg} />
                        <Switch>
                            <Route exact path={`/searchResult/${cityName}`}>
                            {this.state.showRecommendButton &&
<<<<<<< HEAD
                                <Button className="recommend-button"type="primary" block onClick = {this.clickRecommendButton}>
                                    Have no idea about the following places? Click here to get inspiration!
                                </Button>
=======
                                <div className="recommend-div">
                                    Have no idea about the following places? <Text onClick = {this.clickRecommendButton} underline> Click here</Text> to get inspiration!
                                </div>
>>>>>>> upstream/dev
                            }
                            {this.state.showPlanList && 
                            <RecommendPlanList
                                showOnMap={this.props.showOnMap}
                                planList={this.props.planList}
<<<<<<< HEAD
=======
                               // recommendPlanList = {this.props.recommendationPlanList}
>>>>>>> upstream/dev
                            />}
                            {this.state.showLocationList &&
                                <LocationOptionList
                                    updateSelectedLocation={this.props.updateSelectedLocation} 
                                    selectedList={selectedList}
                                    citySearchResult={citySearchResult} 
                                    allTypes = {allTypes}
                                    filterByName={this.props.filterByName} 
                                    filterByType={this.props.filterByType} 
                                    sendRequest={this.props.sendRequest}
                                    updateWaypoints={this.props.updateWaypoints}
                                />
                            }
                            {this.state.showBackwardButton &&
                                <Button type="primary" className="backwardButton" onClick = {this.clickBackButton}>Back to places list</Button>
                            }
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

<<<<<<< HEAD
export default ResultDisplayPanel;

// import React, { Component } from "react";
// import ImgContainer from "./ImgContainer";
// import LocationOptionList from "./LocationOptionList";
// import TravelSchedulePanel from "./TravelSchedulePanel";
// import "../styles/SearchResult.css";
// import { BrowserRouter, Route, Router, Switch } from "react-router-dom";
// import PropTypes from "prop-types";
// import history from "../history";

// class ResultDisplayPanel extends Component {
//     render() {
//         const { cityName, cityImg, citySearchResult, selectedList, allTypes } = this.props;

//         return (
//             <BrowserRouter>
//                 <Router history={history}>
//                     <div className="container">
//                         <ImgContainer cityImg={cityImg} />
//                         <Switch>
//                             <Route exact path={`/searchResult/${cityName}`}>
//                                 <LocationOptionList
//                                     updateSelectedLocation={this.props.updateSelectedLocation}
//                                     selectedList={selectedList}
//                                     citySearchResult={citySearchResult}
//                                     allTypes={allTypes}
//                                     filterByName={this.props.filterByName}
//                                     filterByType={this.props.filterByType}
//                                     switchToTravelSchedulePanel={this.props.switchToTravelSchedulePanel}
//                                     updateWaypoints={this.props.updateWaypoints}
//                                 />
//                             </Route>

//                             <Route path={`/searchResult/${cityName}/travelSchedule`} >
//                                 <TravelSchedulePanel 
//                                     selectedList={selectedList}
//                                 />
//                             </Route>
//                         </Switch>
//                     </div>
//                 </Router>
//             </BrowserRouter>
//         );
//     }
// }

// ResultDisplayPanel.propTypes = {
//     citySearchResult: PropTypes.array.isRequired,
//     cityImg: PropTypes.string.isRequired,
//     allTypes: PropTypes.array.isRequired,
// };

// export default ResultDisplayPanel;
=======
export default ResultDisplayPanel;
>>>>>>> upstream/dev
