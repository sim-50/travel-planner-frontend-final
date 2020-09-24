import React, { Component } from 'react';
import ImgContainer from './ImgContainer';
import LocationOptionList from './LocationOptionList';
import PropTypes from 'prop-types';
import {Button} from 'antd';

class ResultDisplayPanel extends Component {
    render() {
        const {cityImg, citySearchResult, selectedList, allTypes } = this.props;
        return (
            <div className="container">
                <ImgContainer cityImg={cityImg}/>
                <Button type="primary" block>
                    Have no idea about your journey? Check out recommended travel plan on us! 
                </Button>
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