import React, { Component } from 'react';
import ImgContainer from './ImgContainer';
import LocationOptionList from './LocationOptionList';
import Filter from './Filter';

class SearchPanel extends Component {
    state = {
        cityName: "Los Angeles",
        cityImg: "https://media.nomadicmatt.com/laguide1.jpg",
        timeline: [
            {
                id: 1,
                name: "Santa Monica",
                arrivedTime: "09:10:11"
            },
            {
                id: 2,
                name: "Long Beach",
                arrivedTime: "12:10:11"
            },
            {
                id: 3,
                name: "LA Downtown",
                arrivedTime: "15:10:11"
            },
            {
                id: 4,
                name: "Farmer Market",
                arrivedTime: "17:10:11"
            },
            {
                id: 5,
                name: "Los Angeles is often characterized by the presence of low-rise buildings. Outside of a few centers such as Downtown, Warner Center, Century City, Koreatown, Miracle Mile, Hollywood, and Westwood, skyscrapers and high-rise buildings are not common.",
                arrivedTime: "17:10:11"
            },
        ]
    }
    render() {
        const { cityImg, timeline } = this.state;
        return (
            <div className="container">
                <ImgContainer cityImg={cityImg}/>
                <Filter />
                <LocationOptionList timeline={timeline} />
            </div>
        );
    }
}

export default SearchPanel;