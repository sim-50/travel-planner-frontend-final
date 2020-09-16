import React, { Component } from 'react';
import ImgContainer from './ImgContainer';
import LocationOptionList from './LocationOptionList';
import PropTypes from 'prop-types';

class ResultDisplayPanel extends Component {
    render() {
        const {cityImg, citySearchResult} = this.props;
        return (
            <div className="container">
                <ImgContainer cityImg={cityImg}/>
                <LocationOptionList
                onSelectionChange={this.props.onSelectionChange} 
                selectedList={this.props.selectedList}
                citySearchResult={citySearchResult} 
                filterByName={this.props.filterByName} 
                filterByType={this.props.filterByType} 
                />
            </div>
        );
    }
}

ResultDisplayPanel.propTypes = {
    citySearchResult: PropTypes.array.isRequired,
    cityImg: PropTypes.string.isRequired,
}

export default ResultDisplayPanel;