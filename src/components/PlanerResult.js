import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Timeline, Radio } from 'antd';

const PlanerResult = ({ timeline }) => {
    const [mode, setMode] = useState('left');
    
    const onChange = e => {
        setMode(e.target.value);
    };
    
    return (
    <div className="container" style={{maxWidth:350}}>
        <Radio.Group
            onChange={onChange}
            value={mode}
            style={{
                marginBottom: 20,
            }}
        >
            <Radio value="left">Left</Radio>
            <Radio value="right">Right</Radio>
            <Radio value="alternate">Alternate</Radio>
        </Radio.Group>

        <Timeline mode={mode}>
            <Timeline.Item label={timeline[0].arrivedTime}>{timeline[0].name}</Timeline.Item>
            <Timeline.Item label={timeline[1].arrivedTime}>{timeline[1].name}</Timeline.Item>
            <Timeline.Item label={timeline[2].arrivedTime}>{timeline[2].name}</Timeline.Item>
            <Timeline.Item label={timeline[3].arrivedTime}>{timeline[3].name}</Timeline.Item>
            <Timeline.Item label={timeline[4].arrivedTime}>{timeline[4].name}</Timeline.Item>
        </Timeline>
    </div>
    );
}

PlanerResult.propTypes = {
    timeline: PropTypes.array.isRequired,
}

export default PlanerResult;
