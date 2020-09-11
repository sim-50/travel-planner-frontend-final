import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'antd';

const ImgContainer = ({ cityImg }) => {
    return (
        <div className="ant-image" style={{display: "block"}}>
            <Image
                className="ant-image-img"
                style={{maxWidth: 350}}
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
