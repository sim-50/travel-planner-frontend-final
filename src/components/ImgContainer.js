import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'antd';
import '../styles/SearchResult.css';

const ImgContainer = ({ cityImg }) => {
    return (
        <div className="ant-image" style={{display: "block"}}>
            <Image
                src={cityImg}
                alt="City Image Missing"
            />
        </div>
    );
}

ImgContainer.propTypes = {
    cityImg: PropTypes.string.isRequired,
}

export default ImgContainer;
