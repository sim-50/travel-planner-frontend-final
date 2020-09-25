import React, { Component } from 'react';
import ImgContainer from './ImgContainer';
import LocationOptionList from './LocationOptionList';
import PropTypes from 'prop-types';
import {Button, Tooltip} from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import RecommendPlanList from './RecommendPlanList';


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
        const {cityImg, citySearchResult, selectedList, allTypes } = this.props;
        return (
            <div className="container">
                <ImgContainer cityImg={cityImg}/>
                {this.state.showRecommendButton &&
                    <Button className="recommend-button"type="primary" block onClick = {this.clickRecommendButton}>
                        Have no idea about the following places? Click here to get inspiration!
                    </Button>
                }
                {this.state.showPlanList && <RecommendPlanList />}
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
                
            </div>
        );
    }
}

ResultDisplayPanel.propTypes = {
    citySearchResult: PropTypes.array.isRequired,
    cityImg: PropTypes.string.isRequired,
    allTypes: PropTypes.array.isRequired,
}

export default ResultDisplayPanel;