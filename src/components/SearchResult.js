import React, { Component } from "react";
import axios from "axios";
import MapContainer from "./MapContainer";
import ResultDisplayPanel from "./ResultDisplayPanel";
import SearchResultHeader from "./SearchResultHeader";
import "../styles/SearchResult.css";
import { Row, Col } from "antd";


class SearchResult extends Component {
    state = {
        cityName: "Los Angeles",
        cityImg: "https://media.nomadicmatt.com/laguide1.jpg",
        citySearchResult: [],
        allTypes : [],
        filterTypeName: "",
    };

    filterByName = (value) => {
        this.setState({
            citySearchResult: this.state.citySearchResult.map((res) => {
                if (
                    res.name.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
                    res.description.toLowerCase().indexOf(value.toLowerCase()) !== -1
                ) {
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
            citySearchResult: this.state.citySearchResult.map(res => {
                if (selectedRowKeys.includes(res.key)) {
                    res.checked = true;
                } else {
                    res.checked = false;
                }
                return res;
            }),
        })
    }

    componentDidMount() {
        // todo: put into const file
        const url = `http://localhost:8080/travelplanner/search?city=${this.props.match.params.city}`;
        axios
            .get(url)
            .then((response) => {
                console.log('response: ',response.data.responseObj.results);
                console.log(response.data.responseObj.allTypes);
                this.setState({
                    citySearchResult: response.data.responseObj.results,
                    allTypes : response.data.responseObj.allTypes,
                });
            })
            .catch((error) => {
                console.log("err in fetch cityInfo -> ", error);
            });
    }

    render() {
        const { cityImg, citySearchResult,allTypes } = this.state;
        

        return (
            <div className="searchResult-container">
                <SearchResultHeader />
                <div className="main">
                    <div className="left-side">
                        <ResultDisplayPanel
                            updateSelectedLocation={this.updateSelectedLocation}
                            citySearchResult={citySearchResult.filter(res => res.display === true && (res.types.includes(this.state.filterTypeName) || !this.state.filterTypeName))}
                            allTypes = {allTypes}
                            cityImg={cityImg}
                            filterByName={this.filterByName}
                            filterByType={this.filterByType}
                            selectedList={citySearchResult.filter(item => item.checked === true)}
                        />
                    </div>
                    <div className="right-side">
                        <MapContainer 
                            selected={citySearchResult.filter(item => item.checked === true)} 
                        />
                    </div>
                </div>
            </div>
            //TODO: replace the grid layout with below code
            // <Row>
            //     <Col span={18} push={6}>
            //         <MapContainer />
            //     </Col>
            //     <Col span={6} pull={18}>
            //         <SearchPanel />
            //     </Col>
            // </Row>
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